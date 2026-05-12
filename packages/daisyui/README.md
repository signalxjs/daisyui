# @sigx/daisyui

Beautiful, accessible UI components for SignalX with full theme support, powered by [DaisyUI](https://daisyui.com/) and [Tailwind CSS](https://tailwindcss.com/).

## Features

- 🎨 **30+ DaisyUI themes** - Light, dark, and everything in between
- ⚡ **Full SignalX reactivity** - Components built with SignalX primitives
- 🔧 **Easy theme switching** - Built-in ThemeProvider and utilities
- 📦 **Tree-shakeable** - Import only what you need
- 🎯 **Type-safe** - Full TypeScript support with comprehensive types
- ♿ **Accessible** - Built on DaisyUI's accessible components

## Installation

```bash
npm install @sigx/daisyui sigx daisyui tailwindcss
```

## Quick Start

### 1. Set up your CSS (Tailwind CSS v4)

In your main CSS file, add the `@source` directive to tell Tailwind where to find component class names:

```css
@import "tailwindcss";
@plugin "daisyui";

/* Tell Tailwind v4 to scan @sigx/daisyui for class names */
@source "../node_modules/@sigx/daisyui";
```

> **Note**: The path is relative to your CSS file. Adjust based on your project structure.

### 2. Set up Vite

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { sigxPlugin } from '@sigx/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [sigxPlugin(), tailwindcss()],
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'sigx'
  }
});
```

### 3. Use components in your app

```tsx
import { component, defineApp } from 'sigx';
import { 
  ThemeProvider, 
  Button, 
  Card, 
  Card.Body, 
  CardTitle,
  ThemeSelector 
} from '@sigx/daisyui';

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
              <Button variant="primary" onClick={() => count.value++}>
                Increment
              </Button>
              <Button variant="error" onClick={() => count.value--}>
                Decrement
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </ThemeProvider>
  );
});

defineApp(App).mount('#app');
```

## Theme Support

### Using ThemeProvider

Wrap your app with `ThemeProvider` for automatic theme management:

```tsx
import { ThemeProvider } from '@sigx/daisyui';

<ThemeProvider defaultTheme="cupcake" darkMode>
  <App />
</ThemeProvider>
```

### Theme utilities

```tsx
import { 
  setTheme, 
  getCurrentTheme, 
  toggleDarkMode,
  initializeTheme 
} from '@sigx/daisyui';

// Set theme programmatically
setTheme('cyberpunk');

// Get current theme
const theme = getCurrentTheme(); // 'cyberpunk'

// Toggle between light and dark
toggleDarkMode();

// Initialize theme from localStorage or system preference
initializeTheme({ defaultTheme: 'light', darkMode: true });
```

### Theme components

```tsx
import { ThemeSelector, ThemeToggle } from '@sigx/daisyui';

// Dropdown to select from all themes
<ThemeSelector />

// Dropdown with specific themes only
<ThemeSelector themes={['light', 'dark', 'cupcake', 'cyberpunk']} />

// Light/dark toggle button
<ThemeToggle />
```

## Available Themes

All 32 DaisyUI themes are supported:

**Light themes:** light, cupcake, bumblebee, emerald, corporate, retro, cyberpunk, valentine, garden, lofi, pastel, fantasy, wireframe, cmyk, autumn, acid, lemonade, winter, nord

**Dark themes:** dark, synthwave, halloween, forest, aqua, black, luxury, dracula, business, night, coffee, dim, sunset

## Components

### Buttons
- `Button` - Primary button component with variants
- `ButtonGroup` - Group buttons together

### Forms
- `Input` - Text input with sync binding
- `Textarea` - Multi-line text input
- `Select` - Dropdown select
- `FormField` - Form field wrapper with label/error
- `Toggle` - Toggle switch
- `Checkbox` - Checkbox input
- `Radio` - Radio button
- `Range` - Range slider

### Layout
- `Container` - Centered container with max-width
- `Card`, `Card.Body`, `CardTitle`, `Card.Actions` - Card components
- `Stack`, `HStack`, `VStack` - Flexbox layouts
- `Divider` - Content divider

### Feedback
- `Modal`, `ModalHeader`, `ModalBody`, `ModalActions` - Modal dialog
- `Badge` - Status badges
- `Loading` - Loading indicators
- `Alert` - Alert messages
- `Progress` - Progress bars
- `Tooltip` - Tooltips

### Navigation
- `Tabs` - Tab navigation
- `Menu` - Menu list
- `Dropdown` - Dropdown menu
- `Drawer` - Side drawer
- `Breadcrumbs` - Breadcrumb navigation
- `Navbar` - Navigation bar
- `Pagination` - Page navigation

### Data Display
- `Table`, `Thead`, `Tbody`, `Tr`, `Th`, `Td` - Table components
- `Avatar` - User avatar
- `Stat`, `Stats` - Statistics display

## Tree-shaking

Import components individually for smaller bundles:

```tsx
// Import only what you need
import { Button } from '@sigx/daisyui/buttons';
import { Card } from '@sigx/daisyui/layout';
import { ThemeProvider } from '@sigx/daisyui/theme';
```

Verify tree-shaking in this monorepo with:

```bash
pnpm verify:tree-shaking
```

This runs the consumer fixture at `examples/web/tree-shaking`, builds a **narrow** and **broad** scenario, and checks that broad-only imports (`sigx/hydration`, `@sigx/daisyui/theme`) are excluded from the narrow build.

## Two-way Binding

Form components support SignalX's model binding:

```tsx
import { signal } from 'sigx';
import { Input, Toggle } from '@sigx/daisyui';

const App = component(({ signal }) => {
  const form = signal({ name: '', enabled: false });

  return () => (
    <div>
      <Input model={() => form.name} placeholder="Enter name" variant="bordered" />
      <Toggle model={() => form.enabled} label="Enable feature" color="primary" />
      
      <p>Name: {form.name}</p>
      <p>Enabled: {form.enabled ? 'Yes' : 'No'}</p>
    </div>
  );
});
```

## License

MIT
