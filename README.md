# @sigx/daisyui

[![npm](https://img.shields.io/npm/v/@sigx/daisyui.svg?label=%40sigx%2Fdaisyui&color=blue)](https://www.npmjs.com/package/@sigx/daisyui)
[![license](https://img.shields.io/npm/l/@sigx/daisyui.svg)](./LICENSE)
[![ci](https://github.com/signalxjs/daisyui/actions/workflows/ci.yml/badge.svg)](https://github.com/signalxjs/daisyui/actions/workflows/ci.yml)

Beautiful, accessible UI components for [SignalX](https://github.com/signalxjs/core), powered by [DaisyUI](https://daisyui.com/) and [Tailwind CSS](https://tailwindcss.com/).

> 🚧 Early public release (`0.4.x`). API is small and stabilising — feedback welcome.

## Features

- 🎨 **30+ DaisyUI themes** — light, dark, and everything in between
- ⚡ **Full SignalX reactivity** — components built with SignalX primitives
- 🔧 **Easy theme switching** — built-in `ThemeProvider` and utilities
- 📦 **Tree-shakeable** — subpath exports let you import only what you need
- 🎯 **Type-safe** — full TypeScript types
- ♿ **Accessible** — built on DaisyUI's accessible components

## Install

```bash
pnpm add @sigx/daisyui sigx daisyui tailwindcss
```

## Quick start

### 1. Set up your CSS (Tailwind CSS v4)

In your main CSS file, add the `@source` directive so Tailwind v4 scans
`@sigx/daisyui` for class names:

```css
@import "tailwindcss";
@plugin "daisyui";

@source "../node_modules/@sigx/daisyui";
```

> The path is relative to your CSS file — adjust to your project layout.

### 2. Set up Vite

```ts
// vite.config.ts
import { defineConfig } from "vite";
import sigx from "@sigx/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [sigx(), tailwindcss()],
});
```

### 3. Set up `tsconfig.json`

```jsonc
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@sigx/runtime-core"
  }
}
```

### 4. Use components

```tsx
import { component, defineApp } from "sigx";
import { ThemeProvider, Button, Card, CardTitle, ThemeSelector } from "@sigx/daisyui";

const App = component(({ signal }) => {
  const count = signal(0);

  return () => (
    <ThemeProvider defaultTheme="cupcake" darkMode>
      <div class="p-8">
        <ThemeSelector class="mb-4" />

        <Card>
          <Card.Body center>
            <CardTitle>Counter: {count.value}</CardTitle>
            <div class="flex gap-2">
              <Button variant="primary" onClick={() => count.value++}>Increment</Button>
              <Button variant="error" onClick={() => count.value--}>Decrement</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </ThemeProvider>
  );
});

defineApp(App).mount("#app");
```

## Theme support

### `ThemeProvider`

```tsx
import { ThemeProvider } from "@sigx/daisyui";

<ThemeProvider defaultTheme="cupcake" darkMode>
  <App />
</ThemeProvider>
```

### Imperative API

```tsx
import {
  setTheme,
  getCurrentTheme,
  toggleDarkMode,
  initializeTheme,
} from "@sigx/daisyui";

setTheme("cyberpunk");
getCurrentTheme();      // "cyberpunk"
toggleDarkMode();
initializeTheme({ defaultTheme: "light", darkMode: true });
```

### Theme components

```tsx
import { ThemeSelector, ThemeToggle } from "@sigx/daisyui";

<ThemeSelector />
<ThemeSelector themes={["light", "dark", "cupcake", "cyberpunk"]} />
<ThemeToggle />
```

All 32 DaisyUI themes are supported.

**Light:** light, cupcake, bumblebee, emerald, corporate, retro, cyberpunk, valentine, garden, lofi, pastel, fantasy, wireframe, cmyk, autumn, acid, lemonade, winter, nord
**Dark:** dark, synthwave, halloween, forest, aqua, black, luxury, dracula, business, night, coffee, dim, sunset

## Components

### Buttons
`Button`, `ButtonGroup`

### Forms
`Input`, `Textarea`, `Select`, `FormField`, `Toggle`, `Checkbox`, `Radio`, `Range`, `Fieldset`, `Label`

### Layout
`Container`, `Card` (+ `Card.Body`, `CardTitle`, `Card.Actions`), `Stack`, `Flex`, `Row`, `Col`, `Divider`, `Hero`, `Footer`, `Join`, `Link`, `Chat`, `Artboard`, `Mockup` (browser/code/phone/window), `Carousel`, `Mask`

### Feedback
`Modal`, `Badge`, `Loading`, `Alert`, `Progress`, `Tooltip`, `Accordion`, `FileInput`, `Rating`, `Skeleton`, `Steps`, `Timeline`, `Toast`, `Kbd`, `RadialProgress`, `Countdown`, `Diff`, `Swap`, `Indicator`, `Status`

### Navigation
`Tabs`, `Menu`, `Dropdown`, `Drawer`, `Breadcrumbs`, `Navbar`, `Pagination`

### Data
`Table` (+ `Thead`, `Tbody`, `Tr`, `Th`, `Td`), `Avatar`, `Stats`, `Stat`

### Typography
`Text`, `Heading`

### Shared
`Icon`

## Tree-shaking

Import from subpath exports for smaller bundles:

```tsx
import { Button } from "@sigx/daisyui/buttons";
import { Card } from "@sigx/daisyui/layout";
import { ThemeProvider } from "@sigx/daisyui/theme";
```

## Two-way binding

Form components work with SignalX's `model={() => state.x}` binding:

```tsx
import { component } from "sigx";
import { Input, Toggle } from "@sigx/daisyui";

const Form = component(({ signal }) => {
  const form = signal({ name: "", enabled: false });

  return () => (
    <div>
      <Input model={() => form.name} placeholder="Enter name" variant="bordered" />
      <Toggle model={() => form.enabled} label="Enable feature" color="primary" />
    </div>
  );
});
```

## Related repos

- [`signalxjs/core`](https://github.com/signalxjs/core) — reactivity, runtime-core, DOM renderer, SSR, Vite plugin
- [`signalxjs/router`](https://github.com/signalxjs/router) — router
- [`signalxjs/cli`](https://github.com/signalxjs/cli) — `sigx` CLI and `create-sigx`

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md). Releases: [`RELEASING.md`](./RELEASING.md).

## License

[MIT](./LICENSE) © Andreas Ekdahl
