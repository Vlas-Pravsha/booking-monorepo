# AGENTS.md - Coding Agent Guidelines

## Project Overview

This is a Next.js 16 SaaS booking system for restaurant table reservations using the T3 Stack. The codebase follows a Feature-Sliced Design architecture pattern.

## Build/Lint/Test Commands

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Production build
pnpm start        # Start production server
pnpm preview      # Build and start production server

pnpm lint         # Run ESLint
pnpm lint:fix     # Run ESLint with auto-fix
pnpm typecheck    # Run TypeScript type checking
pnpm check        # Run both lint and typecheck

pnpm format:check # Check formatting with Prettier
pnpm format:write # Format files with Prettier
```

**No test framework is currently configured.** When tests are added, update this file.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript 5.8 (strict mode enabled)
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **State**: Redux Toolkit + TanStack React Query
- **Validation**: Zod schemas with @t3-oss/env-nextjs
- **Package Manager**: pnpm 9.15.3
- **Linting**: ESLint 9 with @antfu/eslint-config
- **Formatting**: Prettier with prettier-plugin-tailwindcss

## Project Structure

```
src/
├── app/              # Next.js App Router (layouts, pages, providers, store)
│   ├── (marketing)/  # Route group for marketing pages
│   ├── (admin)/      # Route group for admin pages
│   ├── [domain]/     # Dynamic route for tenant domains
│   ├── providers/    # React Query & Redux providers
│   └── store.ts      # Redux store configuration
├── entities/         # Business domain entities (user, booking, etc.)
├── features/         # Feature slices (auth, booking flow, etc.)
├── views/            # Page-level components (composed of widgets/features)
├── shared/           # Shared utilities, UI components, config
│   ├── config/       # Environment variables, app config
│   ├── lib/          # Utilities, hooks
│   └── ui/           # Reusable UI components (shadcn/ui)
└── widgets/          # Composite UI blocks (header, footer, etc.)
```

## Code Style Guidelines

### Imports

- Use `import type` for type-only imports
- Order: type imports first, then regular imports
- Use path alias `@/*` for imports from `src/`:
  ```typescript
  import type { ButtonProps } from "@/shared/ui/button";
  import { cn } from "@/shared/lib/utils";
  ```

### Formatting (Prettier)

- **No semicolons**
- **Single quotes** for JS/TS strings
- **Double quotes** for JSX attributes
- **Trailing commas** everywhere
- **2-space indentation**
- **Print width**: 80 characters

### TypeScript

- Strict mode enabled with `noUncheckedIndexedAccess`
- Use `verbatimModuleSyntax` for explicit type imports
- Prefer interfaces for component props
- Use `React.ReactNode` for children types
- Export types alongside implementations when needed

### React Components

- Use function declarations, not arrow functions
- Add `'use client'` directive at the very top for client components
- Use named exports (avoid default exports for components)
- Pattern for component files:

  ```tsx
  "use client";

  import type { SomeType } from "library";
  import { something } from "library";
  import * as React from "react";

  import { cn } from "@/shared/lib/utils";

  export interface ComponentNameProps {
    prop: string;
  }

  export function ComponentName({ prop }: ComponentNameProps) {
    return <div>{prop}</div>;
  }
  ```

### File Organization

- Barrel exports in `index.ts` files for each module:
  ```typescript
  export * from "./button";
  export { HomePage } from "./ui/home-page";
  ```
- UI components in `ui/` subdirectory
- Hooks in `lib/hooks/` subdirectory
- Config in `config/` subdirectory

### Naming Conventions

- **Components**: PascalCase (`HomePage`, `Button`)
- **Files**: kebab-case (`home-page.tsx`, `react-query-provider.tsx`)
- **Directories**: kebab-case (`admin-dashboard/`)
- **Hooks**: `use` prefix (`useAppDispatch`, `useAppSelector`)
- **Constants**: SCREAMING_SNAKE_CASE for true constants
- **Types/Interfaces**: PascalCase with descriptive names

### Error Handling

- Use Zod for runtime validation
- Environment variables validated via `@t3-oss/env-nextjs`
- React Query handles async error states
- **Note**: Only the centralized API client (`src/shared/api`) should be used for requests. **Server Actions (use server) are forbidden.**

### Tailwind CSS

- Use Tailwind classes directly in JSX
- Use `cn()` utility for conditional class merging
- Follow prettier-plugin-tailwindcss for class ordering
- shadcn/ui components in `src/shared/ui/`

## Pre-commit Hooks

Husky runs lint-staged on commit:

- JS/TS files: Prettier format + ESLint fix
- JSON/MD/CSS files: Prettier format

## Important Notes

- Run `pnpm check` after making changes to verify code quality
- Comments in code should be avoided unless explicitly requested
- Use Ukrainian language for UI text (this is a Ukrainian market product)
- shadcn/ui components configured with aliases pointing to `src/shared/`
