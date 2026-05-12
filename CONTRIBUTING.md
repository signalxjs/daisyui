# Contributing to @sigx/daisyui

Thanks for your interest! This repo holds the DaisyUI component library for SignalX. The framework core (reactivity, runtime, DOM, SSR, Vite plugin) lives in [`signalxjs/core`](https://github.com/signalxjs/core).

## Prerequisites

- **Node.js** `^20.19.0` or `>=22.12.0`
- **pnpm** `>=10`

## Getting started

```bash
git clone https://github.com/signalxjs/daisyui.git
cd daisyui
pnpm install
pnpm build
```

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm build` | Builds `@sigx/daisyui` (vite library build + `.d.ts` emit). |
| `pnpm typecheck` | Runs `tsgo --noEmit` across sources and tests. |
| `pnpm lint` | Runs `oxlint` on `packages/daisyui/src`. |
| `pnpm test` | Runs `vitest run`. |
| `pnpm verify:pack` | Packs `@sigx/daisyui` and inspects what would ship to npm. |

## Pre-push checklist

```bash
pnpm lint && pnpm typecheck && pnpm build && pnpm test && pnpm verify:pack
```

## Working against a sibling `signalxjs/core` checkout

While SignalX is pre-1.0, this repo sometimes needs to be tested against an unreleased `signalxjs/core` build. Use pnpm overrides in your **local** root `package.json` (don't commit them):

```jsonc
{
  "pnpm": {
    "overrides": {
      "sigx":               "link:../../core/packages/sigx",
      "@sigx/reactivity":   "link:../../core/packages/reactivity",
      "@sigx/runtime-core": "link:../../core/packages/runtime-core",
      "@sigx/runtime-dom":  "link:../../core/packages/runtime-dom",
      "@sigx/vite":         "link:../../core/packages/vite"
    }
  }
}
```

Run `pnpm install` to relink. Remove the overrides before committing release commits.

## Releasing

See [`RELEASING.md`](./RELEASING.md).

## Code style

- 4-space indentation.
- ESM-only (`"type": "module"`).
- No `default` exports for library APIs — named exports only.
- Public APIs must have explicit types.

## Filing issues / PRs

- Issues: <https://github.com/signalxjs/daisyui/issues>

## License

By contributing, you agree your contributions are licensed under the [MIT License](./LICENSE).
