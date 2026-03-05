# UI Architecture Guide

This guide defines the architectural patterns and standards for building user interfaces in the **table-reserve.com** Smart Booking System.

## 📐 General Principles

1.  **Component Driven**: Build UI as a collection of reusable, atomic components following [shadcn/ui](https://ui.shadcn.com/) patterns.
2.  **Strict Typing**: All components and their props must be strictly typed. Avoid `any`. Use `import type` for type-only imports.
3.  **Consistency**: Use the established design system (Tailwind CSS 4 + shadcn/ui).
4.  **Ukrainian UI**: All user-facing text **MUST** be in Ukrainian. Avoid hardcoded strings where possible; prefer localization keys (TBD).
5.  **Performance**: Prioritize Server Components for static content and use `'use client'` only for interactive parts.

## 🏗️ Structure & Layers (FSD)

We follow **Feature-Sliced Design (FSD)**:

- **`src/shared/ui/`**: Base UI components (buttons, inputs, cards). Pure and project-agnostic.
- **`src/entities/*/ui/`**: UI representing business entities (User avatar, Restaurant card).
- **`src/features/*/ui/`**: Interactive UI for specific user actions (Auth form, Booking wizard).
- **`src/widgets/*/ui/`**: Complex composite UI blocks (Header, Sidebar, Booking calendar).
- **`src/views/*/ui/`**: Page-level compositions.

## ⚛️ Component Patterns

### Functional Declarations

Use `function` declarations instead of arrow functions for components:

```tsx
"use client";

import type { ComponentProps } from "./types";
import { cn } from "@/shared/lib/utils";

export function MyComponent({ className, children }: ComponentProps) {
  return <div className={cn("base-class", className)}>{children}</div>;
}
```

### Prop Naming

- Use `className` for root element styling.
- Use descriptive names for specific functional props (e.g., `onConfirm`, `isLoading`).

### Component Organization

Each non-trivial component should live in its own directory:

```
my-component/
├── index.ts          # Barrel export
├── ui/               # UI implementation
│   └── my-component.tsx
├── lib/              # Hooks/utils specific to this component
│   └── use-my-logic.ts
└── types.ts          # Type definitions
```

## 🎨 Styling (Tailwind CSS 4)

- **Utility-First**: Use Tailwind classes for all styling.
- **No Custom CSS**: Avoid `globals.css` unless absolutely necessary for theme/third-party overrides.
- **Dynamic Classes**: Use the `cn()` utility for merging classes.
- **Variables**: Use Tailwind variables (v4 style) if custom values are needed.

## 📱 Responsiveness

- **Mobile-First**: Always start with mobile styles and add breakpoints (`sm:`, `md:`, `lg:`, `xl:`) as needed.
- **Standard Breakpoints**: Follow Tailwind's default breakpoints.

## 🇺🇦 Localization

- **Language**: Ukrainian (uk-UA).
- **Typography**: Ensure fonts support Cyrillic characters correctly.
- **Formatting**: Use Ukrainian standards for dates, numbers, and currency (UAH).

## 🧪 Verification Checklist

- [ ] Does it work on mobile?
- [ ] Is it strictly typed?
- [ ] Is all text in Ukrainian?
- [ ] Does it follow FSD boundaries?
- [ ] Are accessibility attributes (ARIA) present for interactive elements?
