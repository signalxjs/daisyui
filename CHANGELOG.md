# Changelog

All notable changes to `@sigx/daisyui` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). While SignalX is on a `0.x` line, breaking changes may land in minor releases — they will always be called out here.

## [Unreleased]

## [0.9.0] - 2026-07-18

### Changed

- **BREAKING (packaging):** Retargeted the SignalX core peer range to the `0.12.x` line: the `sigx`, `@sigx/reactivity`, `@sigx/runtime-core` and `@sigx/runtime-dom` peers move from `>=0.10.0 <0.11.0` to `>=0.12.0 <0.13.0` (dev/build deps — including `@sigx/vite` — bumped to `^0.12.0` to match), skipping the 0.11.x line. Consumers must now be on the SignalX core `0.12.x` line — `sigx` and all `@sigx/*` core packages — across their dependency tree. Package managers that enforce peer ranges (e.g. pnpm with its default `strict-peer-dependencies`) refuse to install an out-of-range core; others surface it as a peer-dependency warning.

  `@sigx/daisyui`'s own API is unchanged and it needs no code changes to run on core 0.12: the 0.10→0.12 core changes are additive for a DOM component library (0.11's namespace-agnostic renderer only affects custom renderers; this library uses the DOM renderer). See the [SignalX changelog](https://github.com/signalxjs/core/blob/main/CHANGELOG.md) for the full history.

- **Internal:** the sigx core versions this repo builds against now live in a single pnpm `catalog:` block in `pnpm-workspace.yaml`; the package's peer and dev dependency sections reference them as `"catalog:"`, which `pnpm pack` rewrites to the concrete `^0.12.0` range in the published manifest. A future core bump is a one-line edit to the catalog. No effect on the published package shape.

## [0.8.0] — 2026-07-16

### Changed

- **BREAKING (packaging):** Retargeted the SignalX core peer range to the `0.10.x` line: the `sigx`, `@sigx/reactivity`, `@sigx/runtime-core` and `@sigx/runtime-dom` peers move from `>=0.7.0 <0.8.0` to `>=0.10.0 <0.11.0` (dev/build deps bumped to `^0.10.0` to match), skipping the 0.8.x and 0.9.x lines. Consumers must now be on the SignalX core `0.10.x` line — `sigx` and all `@sigx/*` core packages — across their dependency tree. Package managers that enforce peer ranges (e.g. pnpm with its default `strict-peer-dependencies`) refuse to install an out-of-range core; others surface it as a peer-dependency warning.

  `@sigx/daisyui`'s own API is unchanged, but core 0.9.0 removed the old async and error primitives outright with no compat shims — `useAsync`, `throwOnError`, `<Suspense>`, `<ErrorBoundary>`, the throw-a-promise protocol and `app.config.errorHandler`. This library never used any of them, so upgrading it needs no code changes; an app that uses them directly must migrate to `useData` / `errorScope` / `<Defer>` / `app.onError` as part of moving its core to 0.10.x. See the [SignalX changelog](https://github.com/signalxjs/core/blob/main/CHANGELOG.md) for the full migration.

## [0.7.0] — 2026-06-15

### Changed

- **BREAKING (packaging):** Retargeted the SignalX core peer range to the `0.7.x` line: the `sigx`, `@sigx/reactivity`, `@sigx/runtime-core` and `@sigx/runtime-dom` peers move from `>=0.6.0 <0.7.0` to `>=0.7.0 <0.8.0` (dev/build deps bumped to `^0.7.0` to match). Consumers must now be on the SignalX core `0.7.x` line — `sigx` and all `@sigx/*` core packages — across their dependency tree. Package managers that enforce peer ranges (e.g. pnpm with its default `strict-peer-dependencies`) refuse to install an out-of-range core; others surface it as a peer-dependency warning.

## [0.6.0] — 2026-06-12

### Changed

- **BREAKING (packaging):** `@sigx/reactivity`, `@sigx/runtime-core` and `@sigx/runtime-dom` moved from `dependencies` to `peerDependencies` (`>=0.6.0 <0.7.0`), and the `sigx` peer range tightened from `>=0.4.3` to `>=0.6.0 <0.7.0`. Hard-pinned 0.x core dependencies could not overlap with the ranges pinned by other `@sigx` packages (e.g. `sigx@0.6.0` pins `^0.6.0`), so consumers ended up with **multiple copies of the reactivity engine** — signals owned by one copy were invisible to effects owned by another, producing silently dead UI. As peers, the core packages now always resolve to the app's single copy, and an out-of-range `sigx` fails installation loudly instead of silently misbehaving. Requires `sigx` 0.6.x.

### Fixed

- `Modal`: register `onMounted`/`onUnmounted` through the component's setup context instead of the module-level hook imports. The module-level hooks resolve the current instance through shared module state, which breaks when a setup function is re-run outside a mount (e.g. `@sigx/vite`'s HMR update path) — logging `onUnmounted called outside of component setup` and leaking Modal's document `keydown` listener. The context-bound hooks always target the right instance.

## [0.4.3] — 2026-06-05

### Added

- Theme radius tokens `box` / `field` / `selector` for the `rounded` prop (resolve to `--radius-box` / `--radius-field` / `--radius-selector`).
- Typed container styling props (`background` / `rounded` / `width` / `padding`) on `Card`, `Stack`, `Join`, `Stats`, `Navbar`, `Footer`, `Flex`, `Hero`, `Drawer`, `Dropdown`, the `Tabs` content panel, and `Menu`.
- `Menu.Item` gains `href` (renders a real `<a href>` with `menu-active` applied automatically) and `asChild` (render your own `<a>` / `<button>` / router `<Link>` without nesting interactive elements).
- Overhauled `ThemeConfigurator`: fills its container, daisyUI-style radius controls (preset rows + slider), and a live demo built from the library's own components so radius/colors visibly apply.

### Fixed

- `Checkbox`: guard the `indeterminate` ref against `null`. sigx calls a `ref` callback with `null` on unmount, so `null.indeterminate = …` threw and aborted reconciliation, leaving stale DOM when navigating away from any page containing a checkbox.
- `Modal`: `backdrop={false}` now opens the dialog non-modally (`show()`) so the rest of the page stays interactive; Esc-to-close is preserved via a key handler.
- `Tabs`: the content panel honours `background` / `rounded` / `padding` / `width`.
- `Menu`: model-driven active state, badge alignment, and sidebar layout.

## [0.4.2] — 2026-05-12

### Changed

- Maintenance release. No functional changes; republished to align with the rest of the SignalX ecosystem after the `@sigx/router 0.4.5` + `@sigx/ssg 0.4.5` cycle.

## [0.4.1] — 2026-05-12

### Changed

- Bump `@sigx/reactivity`, `@sigx/runtime-core`, `@sigx/runtime-dom` to `^0.4.3` and the `sigx` peer to `>=0.4.3` to pick up the upstream fix shipped in `sigx@0.4.3`.

## [0.4.0] — 2026-05-12

Initial release of `@sigx/daisyui` from the dedicated [`signalxjs/daisyui`](https://github.com/signalxjs/daisyui) repository.

### Changed

- Moved out of the previous incubation monorepo into its own repo under the [`signalxjs`](https://github.com/signalxjs) GitHub organization.
- `@sigx/reactivity`, `@sigx/runtime-core`, `@sigx/runtime-dom` and `sigx` are now consumed from npm (`^0.4.0`) instead of via workspace links.
- Version aligned with the rest of the SignalX ecosystem (`0.4.x`).

[Unreleased]: https://github.com/signalxjs/daisyui/compare/v0.8.0...HEAD
[0.8.0]: https://github.com/signalxjs/daisyui/releases/tag/v0.8.0
[0.7.0]: https://github.com/signalxjs/daisyui/releases/tag/v0.7.0
[0.6.0]: https://github.com/signalxjs/daisyui/releases/tag/v0.6.0
[0.4.3]: https://github.com/signalxjs/daisyui/releases/tag/v0.4.3
[0.4.2]: https://github.com/signalxjs/daisyui/releases/tag/v0.4.2
[0.4.1]: https://github.com/signalxjs/daisyui/releases/tag/v0.4.1
[0.4.0]: https://github.com/signalxjs/daisyui/releases/tag/v0.4.0
