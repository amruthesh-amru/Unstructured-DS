# Unstructured DS

A comprehensive React design system with 1000+ icons, components, and design tokens. Built with TypeScript and optimized for modern React applications.

## Features

- 🎨 **1000+ Icons** - Beautiful, customizable SVG icons organized by category
- 🧩 **React Components** - Reusable UI components built with TypeScript
- 🎯 **Design Tokens** - Comprehensive design system tokens (colors, spacing, typography)
- 📦 **Tree-shakeable** - Import only what you need for optimal bundle size
- 🎨 **Customizable** - Icons use `currentColor` for easy styling
- 📱 **TypeScript** - Full TypeScript support with type definitions
- ⚡ **Modern** - Built with Vite and optimized for performance

## Installation

```bash
npm install unstructured-ds
```

## Quick Start

### Icons

Import icons from specific categories or the main icons export:

```jsx
import { IconArchiveFilled } from "unstructured-ds/icons/Archive";
// or
import { IconArchiveFilled } from "unstructured-ds/icons";

// Import styles (optional, for default sizing)
import "unstructured-ds/styles";

function App() {
  return (
    <div>
      <IconArchiveFilled />
      <IconArchiveFilled className="text-red-500" />
      <IconArchiveFilled width="32" height="32" />
    </div>
  );
}
```

### Components

```jsx
import { Button } from "unstructured-ds/components";
import "unstructured-ds/styles";

function App() {
  return <Button variant="primary">Click me</Button>;
}
```

### Design Tokens

```jsx
import 'unstructured-ds/styles'

// Use CSS variables in your styles
.my-component {
  background-color: var(--brand-9);
  color: var(--text-text-default);
  padding: var(--units-16);
  border-radius: var(--border-radius-8);
}
```

## Icon Usage

### Basic Usage

```jsx
import { IconArchiveFilled } from "unstructured-ds/icons";

<IconArchiveFilled />;
```

### Styling Icons

Icons use `currentColor`, so they inherit text color and can be styled with CSS:

```jsx
// Using Tailwind CSS
<IconArchiveFilled className="text-red-500" />
<IconArchiveFilled className="text-blue-600" />

// Using inline styles
<IconArchiveFilled style={{ color: '#ff5b00' }} />

// Using CSS variables (design tokens)
<IconArchiveFilled style={{ color: 'var(--icon-icon-brand-default)' }} />
```

### Custom Sizing

Icons default to `1.5rem` (24px). Override with props or CSS:

```jsx
// Using props
<IconArchiveFilled width="32" height="32" />
<IconArchiveFilled width="2rem" height="2rem" />

// Using CSS
.icon-large {
  width: 2rem;
  height: 2rem;
}
```

### Icon Categories

Icons are organized into categories. Import from specific categories for better tree-shaking:

```jsx
// Import from specific category
import { IconArchiveFilled } from "unstructured-ds/icons/Archive";
import { IconArrowUpFilled } from "unstructured-ds/icons/Arrow";
import { IconHomeFilled } from "unstructured-ds/icons/Essential";

// Or import from main icons export
import {
  IconArchiveFilled,
  IconArrowUpFilled,
  IconHomeFilled,
} from "unstructured-ds/icons";
```

### Available Categories

- Archive
- Arrow
- Astrology
- Brands
- Building
- Business
- Call
- Communication
- Content
- Crypto Currency
- Delivery
- Design Tool
- Essential
- Feedback
- Files
- Gadgets
- Grid
- Learning
- Location
- Media
- Money
- Notifications
- Programing
- Search
- Security
- Settings
- Shop
- Text Styles
- Time
- Transport
- Weather

## Components

### Button

```jsx
import { Button } from 'unstructured-ds/components'

<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
```

## Design Tokens

Import the stylesheet to access design tokens:

```jsx
import "unstructured-ds/styles";
```

### Available Token Categories

- **Colors**: Brand, Green, Red, Yellow, Orange, Grey
- **Spacing**: Units (0-250)
- **Typography**: Font sizes, weights, line heights
- **Borders**: Border radius, stroke colors
- **Surfaces**: Background colors for different states
- **Icons**: Icon-specific color tokens

### Using Design Tokens

```css
.my-component {
  /* Colors */
  background: var(--brand-9);
  color: var(--text-text-default);

  /* Spacing */
  padding: calc(var(--units-16) * 1px);
  margin: calc(var(--units-8) * 1px);

  /* Typography */
  font-size: var(--font-size-m);
  font-weight: var(--font-weight-700);

  /* Borders */
  border-radius: calc(var(--border-radius-8) * 1px);
  border: 1px solid var(--border-stroke-default);
}
```

## Setting Default Icon Color

To change the default color for all icons globally, add this to your CSS:

```css
.unstructured-icon {
  color: var(--icon-icon-default); /* or any color you prefer */
}
```

Icons will use this default color, but can still be overridden with classes or inline styles.

## TypeScript Support

Full TypeScript support is included. All components and icons have type definitions:

```tsx
import type { ButtonProps } from "unstructured-ds/components";
import type { SVGProps } from "react";
import { IconArchiveFilled } from "unstructured-ds/icons";

const MyIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <IconArchiveFilled {...props} />
);
```

## Tree-shaking

The package is optimized for tree-shaking. Import only what you need:

```jsx
// ✅ Good - only imports what you use
import { IconArchiveFilled } from "unstructured-ds/icons/Archive";

// ❌ Avoid - imports all icons
import * as Icons from "unstructured-ds/icons";
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- React 18+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © 2025 Unstructured DS Contributors

## Links

- [npm package](https://www.npmjs.com/package/unstructured-ds)
- [GitHub repository](https://github.com/amruthesh-amru/unstructured-ds)
