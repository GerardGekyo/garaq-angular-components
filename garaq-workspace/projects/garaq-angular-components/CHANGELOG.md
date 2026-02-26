# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2026-02-26

### Added

#### General Components
- **Button** (`gc-button`) — variants: `default`, `outline`, `secondary`, `ghost`, `link`, `shadow`; sizes: `xs`, `sm`, `default`, `lg`; supports `background`, `color`, `disabled`
- **Badge** (`gc-badge`) — inline status label with variant and color support
- **Avatar** (`gc-avatar`) — user avatar with image, fallback initials, and size variants
- **Spinner** (`gc-spinner`) — animated loading indicator with size and color control
- **Tooltip** (`gc-tooltip`) — accessible hover/focus tooltip with configurable placement
- **Separator** (`gc-separator`) — horizontal or vertical visual divider

#### Form Components
- **Input** (`gc-input`) — text input with label, description, prefix/suffix slots (`[gcPrefix]`, `[gcSuffix]`), invalid state, and focus ring
- **Textarea** (`gc-textarea`) — multiline input with label, description, and resize control
- **Checkbox** (`gc-checkbox`) — accessible checkbox with label, description, and indeterminate state
- **Switch Button** (`gc-switch-button`) — toggle switch with sizes `sm`, `default`, `lg`; emits `checkedChange`
- **Radio Button** (`gc-radio-button`) — radio input with native `name` grouping, sizes `sm`, `default`, `lg`; emits value via `checkedChange`
- **Select** (`gc-select`) — dropdown selector with keyboard navigation (Arrow, Enter, Escape, Home, End), label, description, and prefix slot
- **Combobox** (`gc-combobox`) — searchable select with `single` and `multiple` modes; multi-select renders removable chips; full keyboard support

#### Feedback Components
- **Alert** (`gc-alert`) — contextual message with variants: `info`, `success`, `warning`, `error`
- **Dialog** (`gc-dialog`) — accessible modal dialog with overlay, focus trap, and close on Escape
- **Toast** (`gc-toast`) + `ToastService` — programmatic notification system with auto-dismiss and position control

#### Layout Components
- **Card** (`gc-card`) — content container with variants: `default`, `elevated`, `ghost`, `outline`; padding sizes `none`, `sm`, `default`, `lg`; slots for `[gcCardMedia]`, `[gcCardHeader]`, body, and `[gcCardFooter]`
- **Tabs** (`gc-tabs`) — tabbed navigation with keyboard support
- **Shimmer** (`gc-shimmer`) — skeleton loading placeholder with shapes `rectangle`, `circle`, `pill`; respects `prefers-reduced-motion`

### Architecture
- All components are standalone (Angular 21+, no `NgModule` required)
- Signal-based inputs (`input()`, `output()`) throughout
- CSS custom properties as design tokens — overridable globally or per-instance
- Simple theming inputs (`color`, `background`, `borderColor`, `radius`) as an alternative to raw CSS variables
- Tailwind CSS v4 compatible — host element classes apply without conflict
- `sideEffects: false` for full tree-shaking support
- WCAG AA accessibility baseline across all interactive components
