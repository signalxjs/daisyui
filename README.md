# @sigx/daisyui

[![npm](https://img.shields.io/npm/v/@sigx/daisyui.svg?label=%40sigx%2Fdaisyui&color=blue)](https://www.npmjs.com/package/@sigx/daisyui)
[![license](https://img.shields.io/npm/l/@sigx/daisyui.svg)](./LICENSE)
[![ci](https://github.com/signalxjs/daisyui/actions/workflows/ci.yml/badge.svg)](https://github.com/signalxjs/daisyui/actions/workflows/ci.yml)

Beautiful, accessible UI components for [SignalX](https://sigx.dev/core/), powered by [DaisyUI](https://daisyui.com/) and [Tailwind CSS](https://tailwindcss.com/).

> 🚧 Early public release (`0.4.x`). API is small and stabilising — feedback welcome.

## 📚 Documentation

Full guides, theme reference, component catalog and live examples → **<https://sigx.dev/daisyui/>**

## Why @sigx/daisyui

Every DaisyUI component, rebuilt with native SignalX reactivity — fine-grained,
tree-shakeable, and fully type-safe. Drop in `ThemeProvider` and switch between
all 32 DaisyUI themes at runtime, bind form inputs straight to your signals, and
import only the components you use via subpath exports for the smallest possible
bundle.

```tsx
import { component, defineApp } from "sigx";
import { ThemeProvider, Button, Card } from "@sigx/daisyui";

const App = component(({ signal }) => {
  const count = signal(0);

  return () => (
    <ThemeProvider defaultTheme="cupcake" darkMode>
      <Card>
        <Card.Body center>
          <Card.Title>Counter: {count.value}</Card.Title>
          <Button variant="primary" onClick={() => count.value++}>Increment</Button>
        </Card.Body>
      </Card>
    </ThemeProvider>
  );
});

defineApp(App).mount("#app");
```

Install:

```bash
pnpm add @sigx/daisyui sigx daisyui tailwindcss
```

Setup, theming, the full component list and two-way binding are all covered in
the [documentation](https://sigx.dev/daisyui/).

## Part of SignalX

- [SignalX core](https://sigx.dev/core/) — reactivity, runtime-core, DOM renderer, SSR, Vite plugin
- [`@sigx/router`](https://sigx.dev/router/) — router
- [`@sigx/cli`](https://sigx.dev/cli/) — `sigx` CLI and `create-sigx`

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md). Releases: [`RELEASING.md`](./RELEASING.md).

## License

[MIT](./LICENSE) © Andreas Ekdahl
