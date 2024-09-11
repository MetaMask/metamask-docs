---
title: 'Swizzling Documentation'
description: 'Detailed summary of the components swizzled by wrapping and ejecting, including implementation details and styling changes.'
---

# Swizzling Documentation

This document outlines the components that have been swizzled in this project. The swizzling process is separated into two main categories: Wrapping and Ejecting.

## Wrapping

The following components have been swizzled by wrapping:

### 1. Admonition/Type/Layout (Safe)

Purpose: To add the cut-off-corners style to the Info boxes, enhancing the visual design of admonitions.

Implementation Details:

1. The original `Layout` component is wrapped with a custom `LayoutWrapper` function.
2. A new `CutOffCorners` component is used to create the cut-off corner effect.
3. The wrapper function renders the original `Layout` component inside the `CutOffCorners` component.

Styling Changes:

- Custom styles for this component are added in `src/scss/theme/_admonition-type.scss`.
- These styles define the appearance of the cut-off corners and any additional styling for the admonition boxes.

### 2. DocCardList (Safe)

Purpose: To enhance the overview page cards with custom styling, interactive elements, and maintain design consistency with the custom CardList component.

Implementation Details:

1. The original `DocCardList` component is wrapped and significantly modified.
2. Custom components are integrated:
   - `CutOffCorners`: Applies the cut-off corner effect to each card.
   - `Button`: Adds a customizable button to each card for navigation.
3. State management is implemented using React hooks:
   - `useState`: Manages the active card state and theme.
   - `useEffect`: Updates the theme based on the current color mode.
4. Conditional rendering is used to display either the current sidebar category or the provided items.
5. The `useColorMode` hook from Docusaurus is utilized to adapt the component's appearance based on the current theme (light/dark).
6. Each card is wrapped in an `article` element with mouse event handlers for interactivity.

Styling and Interactivity:

- SCSS modules (`styles.module.scss`) are used for component-specific styling.
- Cards have an "active" state triggered by mouse events for hover effects.
- The button's appearance changes based on the current theme and whether the link is internal or external.
- Custom CSS variables are applied to the button for hover effects, ensuring consistency with the overall design.

Integration with Docusaurus:

- Utilizes Docusaurus theme hooks and utilities:
  - `isInternalUrl` to determine the appropriate icon for links.

Design Consistency:

- The modifications aim to maintain visual and functional consistency with a custom `CardList` component and its `CardListItem` children.
- The use of `CutOffCorners` and custom button styles ensures that the DocCardList aligns with the overall design language of the site.

### 3. TOCItems (Safe)

Purpose: To add a "Table of content:" label above the table of contents, improving navigation clarity and enhancing the user interface.

Implementation Details:

1. The original `Tree` component from `@theme-original/TOCItems/Tree` is wrapped with a custom `TreeWrapper` function.
2. A new `<span>` element is added before the original `Tree` component, containing the text "Table of content:".
3. The wrapper preserves all original props and passes them to the `Tree` component.

Styling Changes:

- A separate SCSS module (`styles.module.scss`) is used for component-specific styling.
- Subtitle Styling:
  1. Responsive: Hidden on mobile, visible on tablet and above.
  2. Typography: Uses custom type-label-eyebrow class.
  3. Spacing: 1.3rem bottom margin for separation.
  4. Theme Support: Adapts color for dark mode visibility.

## Ejecting

### 1. NotFound (Safe)

Purpose: To customize the 404 Not Found page, enhancing its visual appearance and maintaining consistency with the overall site design.

Implementation Details:

1. The `NotFound` component was ejected, allowing for direct modification of its code.
2. The basic structure of the component remains similar to the original, but with several key changes:
   - The main container now includes an additional class from the SCSS module (`styles.notFound`).
   - The title (`h1`) now uses the `Heading` component from the theme and includes custom classes.
   - Paragraphs now have additional classes for styling.

Changes:

- A new SCSS module (`styles.module.scss`) was created for component-specific styling:

  1. Layout: Custom padding and spacing using CSS variables.
  2. Typography: Custom classes for title (type-heading-m) and paragraphs (type-paragraph-l).
  3. Colors: Adaptive text colors for light/dark modes using CSS variables.

- Component code changes:
  1. Use of theme's `Heading` component instead of direct `h1` tag.
  2. Implementation of dark mode color adjustments.
