import { defineConfig } from 'vitest/config';

export default defineConfig({
    // Vite 8 uses Oxc for JSX transforms
    oxc: {
        jsx: {
            runtime: 'automatic',
            importSource: 'sigx'
        }
    },
    test: {
        environment: 'happy-dom',
        include: [
            'packages/**/__tests__/**/*.test.{ts,tsx}',
            'packages/**/src/**/*.test.{ts,tsx}'
        ],
        globals: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['packages/*/src/**/*.{ts,tsx}'],
            exclude: ['**/*.d.ts', '**/index.ts']
        }
    }
});
