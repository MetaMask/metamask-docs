# SubNavBar Component

A horizontal sub-navigation component that appears below the main navbar for specific URL patterns in the MetaMask documentation site.

## Features

- **Conditional Rendering**: Only shows for configured URL patterns
- **Responsive Design**: Adapts to different screen sizes with horizontal scrolling on mobile
- **Active State**: Highlights the current page link
- **External Links**: Support for external links with visual indicators
- **Dark Mode**: Full support for Docusaurus dark/light theme switching
- **TypeScript**: Fully typed with comprehensive interfaces

## Usage

### 1. Component Structure

```tsx
import SubNavBar from '@site/src/components/SubNavBar'
import { getSubNavConfigForPath } from '@site/src/components/SubNavBar/configs'

// Get config for current path
const subNavConfig = getSubNavConfigForPath(location.pathname)

// Render conditionally
{
  subNavConfig && <SubNavBar config={subNavConfig} />
}
```

### 2. Configuration

The component uses configuration objects to define navigation links for different URL patterns:

```typescript
export interface SubNavBarConfig {
  pathPattern: string | string[] // URL patterns to match
  links: SubNavLink[] // Navigation links to show
}

export interface SubNavLink {
  key: string // Unique identifier
  label: string // Display text
  path: string // URL path
  external?: boolean // Whether link is external
}
```

### 3. Adding New Sections

To add a SubNavBar to a new section:

1. **Create a configuration** in `src/components/SubNavBar/configs.ts`:

```typescript
export const YOUR_SECTION_SUBNAV_CONFIG: SubNavBarConfig = {
  pathPattern: '/your-section',
  links: [
    {
      key: 'overview',
      label: 'Overview',
      path: '/your-section/',
    },
    {
      key: 'guide',
      label: 'Guide',
      path: '/your-section/guide/',
    },
    // Add external links
    {
      key: 'github',
      label: 'GitHub',
      path: 'https://github.com/your-repo',
      external: true,
    },
  ],
}
```

2. **Add to the exports** in the same file:

```typescript
export const ALL_SUBNAV_CONFIGS = [
  // ... existing configs
  YOUR_SECTION_SUBNAV_CONFIG,
]
```

That's it! The SubNavBar will automatically appear on pages matching your path pattern.

## Current Configured Sections

- **Embedded Wallets** (`/embedded-wallets`) - Shows platform-specific navigation (JS, React, Android, iOS, etc.)
- **SDK** (`/sdk`) - Shows SDK documentation sections
- **Wallet API** (`/wallet`) - Shows Wallet API sections
- **Snaps** (`/snaps`) - Shows Snaps development sections
- **Services** (`/services`) - Shows Infura services sections
- **Delegation Toolkit** (`/delegation-toolkit`) - Shows delegation toolkit sections

## Styling

The component uses CSS modules with full dark mode support:

- Sticky positioning below the main navbar
- Horizontal scrolling on mobile devices
- Active state highlighting with primary color
- Hover effects and transitions
- Responsive typography and spacing

## Integration

The SubNavBar is automatically integrated into the main Layout component (`src/theme/Layout/index.tsx`) and will render conditionally based on the current URL path.

## Path Matching

The component supports flexible path matching:

- Single pattern: `pathPattern: '/embedded-wallets'`
- Multiple patterns: `pathPattern: ['/embedded-wallets', '/ew']`
- Matches all sub-paths starting with the pattern

## Active Link Detection

Links are marked as active when:

1. The current path exactly matches the link path
2. The current path starts with the link path (for nested routes)
3. Root path (`/`) requires exact match to avoid false positives
