# Changelog

All notable changes to `@sigx/daisyui` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). While SignalX is on a `0.x` line, breaking changes may land in minor releases — they will always be called out here.

## [Unreleased]

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

[Unreleased]: https://github.com/signalxjs/daisyui/compare/v0.4.2...HEAD
[0.4.2]: https://github.com/signalxjs/daisyui/releases/tag/v0.4.2
[0.4.1]: https://github.com/signalxjs/daisyui/releases/tag/v0.4.1
[0.4.0]: https://github.com/signalxjs/daisyui/releases/tag/v0.4.0
