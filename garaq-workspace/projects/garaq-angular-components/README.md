# Garaq Angular Components

A modern Angular 21+ UI component library built with signal-based inputs, CSS custom properties, and full Tailwind CSS compatibility.

## Installation

```bash
npm install garaq-angular-components
```

### Requirements

- Angular 21+
- TypeScript 5.9+

## Quick Start

Import any component directly into your standalone component:

```typescript
import { Component } from '@angular/core';
import { ButtonComponent, InputComponent, CardComponent } from 'garaq-angular-components';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, InputComponent, CardComponent],
  template: `
    <gc-card variant="elevated">
      <h2 gcCardHeader>Login</h2>
      <gc-input inputLabel="Email" placeholder="you@example.com" type="email" />
      <gc-input inputLabel="Password" type="password" />
      <div gcCardFooter>
        <gc-button>Sign in</gc-button>
      </div>
    </gc-card>
  `,
})
export class LoginComponent {}
```

## Components

### General

| Component | Selector | Description |
|-----------|----------|-------------|
| **Button** | `gc-button` | Button with variants: `default`, `outline`, `secondary`, `ghost`, `link`, `shadow` |
| **Badge** | `gc-badge` | Small label with the same variant system as Button |
| **Avatar** | `gc-avatar` | User avatar with image support and automatic initial fallback |
| **Spinner** | `gc-spinner` | Loading indicator with `spin`, `pulse`, `bounce` animations |
| **Tooltip** | `gc-tooltip` | Tooltip overlay with `top`, `bottom`, `left`, `right` placement |
| **Separator** | `gc-separator` | Horizontal/vertical divider with optional label |

### Forms

| Component | Selector | Description |
|-----------|----------|-------------|
| **Input** | `gc-input` | Text input with label, description, prefix/suffix slots, and character limit |
| **Textarea** | `gc-textarea` | Multi-line input with auto-label, description, and character limit |
| **Select** | `gc-select` | Dropdown select with keyboard navigation and rich options |
| **Combobox** | `gc-combobox` | Searchable dropdown with single/multiple selection modes |
| **Checkbox** | `gc-checkbox` | Checkbox with label, description, and content projection |
| **Switch** | `gc-switch-button` | Toggle switch with label and description |
| **Radio** | `gc-radio-button` | Radio button with native group exclusion via `name` |

### Feedback

| Component | Selector | Description |
|-----------|----------|-------------|
| **Alert** | `gc-alert` | Alert banner with `info`, `success`, `warning`, `error` variants |
| **Toast** | `gc-toast` | Toast notification (standalone or via `ToastService`) |
| **Dialog** | `gc-dialog` | Modal dialog built on the native `<dialog>` element |

### Layout

| Component | Selector | Description |
|-----------|----------|-------------|
| **Card** | `gc-card` | Container with `default`, `elevated`, `ghost`, `outline` variants |
| **Tabs** | `gc-tabs` | Tabbed interface with keyboard navigation and disabled tabs |
| **Shimmer** | `gc-shimmer` | Animated skeleton placeholder for loading states |

## Theming

Every component supports custom colors via simple inputs:

```html
<!-- Via inputs (recommended) -->
<gc-button background="#7c3aed" color="#ffffff">Purple</gc-button>
<gc-input color="#16a34a" inputLabel="Green focus" />
<gc-checkbox color="#ec4899" label="Pink" checked />

<!-- Via CSS custom properties (advanced) -->
<gc-button style="--gc-btn-primary: #7c3aed">Purple</gc-button>
```

### Tailwind CSS Compatibility

Components work with Tailwind classes out of the box:

```html
<gc-button class="w-full">Full width</gc-button>
<gc-shimmer class="h-12 w-48" />
<gc-card class="max-w-md mx-auto">Centered card</gc-card>
```

## Component Examples

### Input with Prefix/Suffix

```html
<gc-input inputLabel="Website" placeholder="my-site.com">
  <span gcPrefix>https://</span>
</gc-input>

<gc-input inputLabel="Price" placeholder="0.00">
  <span gcPrefix>$</span>
  <span gcSuffix>USD</span>
</gc-input>
```

### Card with Slots

```html
<gc-card variant="elevated">
  <img gcCardMedia src="hero.jpg" />
  <div gcCardHeader>
    <h3>Title</h3>
    <gc-badge background="#16a34a">New</gc-badge>
  </div>
  <p>Card body content.</p>
  <div gcCardFooter>
    <gc-button size="sm">Action</gc-button>
  </div>
</gc-card>
```

### Combobox (Multiple Selection)

```typescript
frameworks: GcComboboxOption[] = [
  { label: 'Angular', value: 'angular', description: 'Platform for web apps' },
  { label: 'React', value: 'react', description: 'UI library by Meta' },
  { label: 'Vue', value: 'vue', description: 'Progressive framework' },
];
selected = signal<string[]>([]);
```

```html
<gc-combobox
  mode="multiple"
  inputLabel="Frameworks"
  [options]="frameworks"
  [values]="selected()"
  (valuesChange)="selected.set($event)"
/>
```

### Toast Service

```typescript
import { ToastService } from 'garaq-angular-components';

export class MyComponent {
  private toast = inject(ToastService);

  save() {
    this.toast.show('Saved successfully!', 'success');
  }
}
```

```html
<!-- Add once in your app root -->
<gc-toast-container />
```

### Dialog

```typescript
dialogOpen = signal(false);
```

```html
<gc-button (click)="dialogOpen.set(true)">Open</gc-button>

<gc-dialog
  title="Confirm"
  [open]="dialogOpen()"
  (openChange)="dialogOpen.set($event)"
>
  <p>Are you sure?</p>
  <div gcDialogFooter class="flex justify-end gap-3">
    <gc-button variant="outline" (click)="dialogOpen.set(false)">Cancel</gc-button>
    <gc-button (click)="dialogOpen.set(false)">Confirm</gc-button>
  </div>
</gc-dialog>
```

## CSS Custom Properties

Each component exposes CSS variables for advanced theming:

```css
/* Global theme override */
gc-button {
  --gc-btn-primary: #7c3aed;
  --gc-btn-primary-fg: #ffffff;
}

gc-input {
  --gc-input-focus: #16a34a;
  --gc-input-radius: 0.75rem;
}

gc-card {
  --gc-card-bg: #1e293b;
  --gc-card-color: #f8fafc;
  --gc-card-radius: 1rem;
}
```

## Accessibility

All components follow WCAG AA standards:

- Proper ARIA attributes on interactive elements
- Full keyboard navigation support
- Visible focus indicators
- `prefers-reduced-motion` respected for animations
- Native HTML elements used where possible (`<dialog>`, `<input>`, `<button>`)

## License

[MIT](./LICENSE)
