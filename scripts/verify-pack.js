#!/usr/bin/env node

/**
 * @sigx/daisyui - Pre-publish pack smoke test
 *
 * Catches packaging bugs that lint/typecheck/test miss:
 *   - missing files in `files` array
 *   - broken `exports` map (subpath exports for tree-shaking)
 *   - unresolved `workspace:^` ranges
 *   - dist/ produced by stale builds
 *
 * What it does:
 *   1. Build the publishable package.
 *   2. `pnpm pack` it into a temp dir.
 *   3. Spin up a minimal scratch project with a `file:` dep on the tarball.
 *   4. Typecheck a small TSX program that imports both the main entry and a
 *      subpath entry to prove the published shape works.
 *
 * Usage:
 *   node scripts/verify-pack.js
 *
 * No flags. Exits non-zero on any failure.
 */

import { execSync } from 'child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const PACKAGES = [
    'packages/daisyui',
];

const sandbox = join(tmpdir(), `sigx-daisyui-verify-pack-${Date.now()}`);
const tarballDir = join(sandbox, 'tarballs');
const appDir = join(sandbox, 'app');

function run(cmd, opts = {}) {
    console.log(`$ ${cmd}${opts.cwd ? `  (in ${opts.cwd})` : ''}`);
    execSync(cmd, { stdio: 'inherit', ...opts });
}

function step(label) {
    console.log(`\n▶  ${label}`);
}

function readJson(path) {
    return JSON.parse(readFileSync(path, 'utf-8'));
}

function packPackage(pkgPath) {
    const pkgFullPath = join(rootDir, pkgPath);
    const pkgJson = readJson(join(pkgFullPath, 'package.json'));
    run('pnpm pack --pack-destination ' + JSON.stringify(tarballDir), { cwd: pkgFullPath });
    const tarballs = readdirSync(tarballDir).filter((f) => f.endsWith('.tgz'));
    const safeName = pkgJson.name.replace('@', '').replace('/', '-');
    const match = tarballs.find((f) => f.startsWith(safeName));
    if (!match) {
        throw new Error(`Could not find tarball for ${pkgJson.name} in ${tarballDir}`);
    }
    return { name: pkgJson.name, version: pkgJson.version, tarball: join(tarballDir, match) };
}

function main() {
    step(`Sandbox: ${sandbox}`);
    mkdirSync(tarballDir, { recursive: true });
    mkdirSync(appDir, { recursive: true });

    step('Build all packages');
    run('pnpm run build', { cwd: rootDir });

    step('Pack each publishable package');
    const packed = PACKAGES.map(packPackage);
    for (const p of packed) {
        console.log(`   📦 ${p.name}@${p.version}  →  ${p.tarball}`);
    }

    step('Create scratch app');
    const rootPkg = readJson(join(rootDir, 'package.json'));
    const daisyuiPkg = readJson(join(rootDir, 'packages/daisyui/package.json'));
    const deps = {
        ...Object.fromEntries(
            packed.map((p) => [p.name, `file:${p.tarball.replace(/\\/g, '/')}`])
        ),
        // The peer deps daisyui & tailwindcss aren't needed for typechecking,
        // but sigx and the @sigx/* core peers must resolve — the scratch app
        // plays the consumer, so it installs them itself. Use the same ranges
        // that @sigx/daisyui declares so npm sees a consistent graph.
        sigx: daisyuiPkg.peerDependencies.sigx,
        '@sigx/reactivity': daisyuiPkg.peerDependencies['@sigx/reactivity'],
        '@sigx/runtime-core': daisyuiPkg.peerDependencies['@sigx/runtime-core'],
        '@sigx/runtime-dom': daisyuiPkg.peerDependencies['@sigx/runtime-dom'],
    };
    const appPkg = {
        name: 'sigx-daisyui-pack-smoke',
        version: '0.0.0',
        private: true,
        type: 'module',
        scripts: { build: 'tsc -p .' },
        dependencies: deps,
        devDependencies: {
            typescript: rootPkg.devDependencies.typescript,
        },
    };
    writeFileSync(join(appDir, 'package.json'), JSON.stringify(appPkg, null, 2));

    writeFileSync(
        join(appDir, 'tsconfig.json'),
        JSON.stringify(
            {
                compilerOptions: {
                    target: 'ES2022',
                    module: 'ESNext',
                    moduleResolution: 'Bundler',
                    jsx: 'react-jsx',
                    jsxImportSource: '@sigx/runtime-core',
                    strict: true,
                    esModuleInterop: true,
                    skipLibCheck: true,
                    noEmit: true,
                },
                include: ['src'],
            },
            null,
            2
        )
    );

    mkdirSync(join(appDir, 'src'), { recursive: true });

    // Exercise the public surface: main entry + a couple of subpath exports.
    writeFileSync(
        join(appDir, 'src', 'main.tsx'),
        [
            "import { Button, Card, ThemeProvider } from '@sigx/daisyui';",
            "import { component } from 'sigx';",
            '',
            'const App = component(() => () => (',
            '    <ThemeProvider defaultTheme="cupcake">',
            '        <Card>',
            '            <Button variant="primary">Click me</Button>',
            '        </Card>',
            '    </ThemeProvider>',
            '));',
            '',
            'export type _R = typeof App;',
            '',
        ].join('\n')
    );

    // Subpath exports (tree-shaking targets) must resolve from the published shape.
    writeFileSync(
        join(appDir, 'src', 'subpath-check.ts'),
        [
            "import { Button } from '@sigx/daisyui/buttons';",
            "import { Card } from '@sigx/daisyui/layout';",
            "import { ThemeProvider } from '@sigx/daisyui/theme';",
            'export type _C = [typeof Button, typeof Card, typeof ThemeProvider];',
            '',
        ].join('\n')
    );

    step('Install scratch app (npm — to avoid pnpm workspace hoisting interference)');
    run('npm install --no-audit --no-fund --loglevel=error', { cwd: appDir });

    step('Typecheck scratch app against the packed tarball');
    run('npm run build', { cwd: appDir });

    step('✅ Pack smoke test passed');
}

try {
    main();
} catch (err) {
    console.error('\n❌ Pack smoke test failed:', err.message);
    console.error(`   Sandbox preserved for inspection: ${sandbox}`);
    process.exitCode = 1;
    process.exit(1);
}

try {
    rmSync(sandbox, { recursive: true, force: true });
} catch {
    // ignore
}
