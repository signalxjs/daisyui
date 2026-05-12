# Changelog

All notable changes to `@sigx/daisyui` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). While SignalX is on a `0.x` line, breaking changes may land in minor releases — they will always be called out here.

## [Unreleased]

## [0.4.1] — 2026-05-12

### Changed

- Bump `@sigx/reactivity`, `@sigx/runtime-core`, `@sigx/runtime-dom` to `^0.4.3` and the `sigx` peer to `>=0.4.3` to pick up the upstream fix shipped in `sigx@0.4.3`.

## [0.4.0] — 2026-05-12

Initial release of `@sigx/daisyui` from the dedicated [`signalxjs/daisyui`](https://github.com/signalxjs/daisyui) repository.

### Changed

- Moved out of the previous incubation monorepo into its own repo under the [`signalxjs`](https://github.com/signalxjs) GitHub organization.
- `@sigx/reactivity`, `@sigx/runtime-core`, `@sigx/runtime-dom` and `sigx` are now consumed from npm (`^0.4.0`) instead of via workspace links.
- Version aligned with the rest of the SignalX ecosystem (`0.4.x`).

[Unreleased]: https://github.com/signalxjs/daisyui/compare/v0.4.1...HEAD
[0.4.1]: https://github.com/signalxjs/daisyui/releases/tag/v0.4.1
[0.4.0]: https://github.com/signalxjs/daisyui/releases/tag/v0.4.0
