# @sigx/daisyui

Beautiful, accessible UI components for [SignalX](https://sigx.dev/core/) with full theme support, powered by [DaisyUI](https://daisyui.com/) and [Tailwind CSS](https://tailwindcss.com/).

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
import { ThemeProvider, Button, Card, CardTitle } from "@sigx/daisyui";

const App = component(({ signal }) => {
  const count = signal(0);

  return () => (
    <ThemeProvider defaultTheme="cupcake" darkMode>
      <Card>
        <Card.Body center>
          <CardTitle>Counter: {count.value}</CardTitle>
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
npm install @sigx/daisyui sigx daisyui tailwindcss
```

Setup, theming, the full component list and two-way binding are all covered in
the [documentation](https://sigx.dev/daisyui/).

## License

MIT
