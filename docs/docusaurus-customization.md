---
title: 'Implementing and Customizing SCSS and Components in Docusaurus'
description: 'A comprehensive guide on setting up and customizing SCSS and custom React components in a Docusaurus project, including initial setup, webpack configuration, and component migration.'
---

# Implementing and Customizing SCSS in Docusaurus

## 1. Initial Setup

### Installing and Registering SASS Plugin

1. Install the SASS plugin:

   ```
   npm install --save-dev docusaurus-plugin-sass
   ```

2. Register the plugin in `docusaurus.config.js`:
   ```javascript
   plugins: [
     'docusaurus-plugin-sass',
   ],
   ```

### Updating CSS to SCSS in docusaurus.config.js

Update the `theme` configuration:

```javascript
theme: {
  customCss: require.resolve("./src/scss/custom.scss"),
},
```

Then update relevant import statements in the project.

## 2. Dependency Resolution

### Resolving AJV Dependency Issue

If you encounter this error:

```
[ERROR] Error: Cannot find module 'ajv/dist/compile/codegen'
```

Install the AJV dependency:

```
npm install --save ajv
```

## 3. Asset Management

Add font files to the `static` folder in the project root.

## 4. SCSS Implementation

### Duplicating SCSS from MetaMask Website

1. Copy SCSS files from the MetaMask website into the `scss` folder in the `src` directory.
2. Import `app.scss` into `custom.scss`:
   ```scss
   @import './app.scss';
   ```

### Overriding Classic Theme CSS Variables

In `custom.scss`, override CSS variables defined by the classic theme with variables from `app.scss`.

### Creating a Theme Folder for Custom Styles

Inside the `scss` folder, create a `theme` directory to house custom styles. Import these styles into `custom.scss` to override the Docusaurus theme's default styles without altering the SCSS files migrated from the main website.

## 5. Webpack Configuration

### Creating a Webpack Config Plugin for Global SCSS Mixins

Create `src/plugins/mm-scss-utils.js` to enable global access to SCSS mixins without the need to import them in every component or SCSS file.

Register the plugin in `docusaurus.config.js`:

```javascript
plugins: [
  'docusaurus-plugin-sass',
  "./src/plugins/mm-scss-utils",
],
```

This configuration allows:

- Using SCSS mixins globally without explicit imports in each file.
- Setting up a global import for utility functions defined in `src/scss/utils`.
- Ensuring all SCSS files have access to the same set of base styles and functions.

## 6. Additional SCSS Customizations

### Further Customization of app.scss

In `_breakpoint.scss`, change the value of the `$desktop` breakpoint from 1025px to 997px to follow the Docusaurus global breakpoints.

### Further Customization of custom.scss

1. Continue overriding CSS variables defined by the classic theme.
2. Add font properties to headings using `@extend` and typescale classes:

   ```scss
   h1 {
     @extend .type-heading-xl;
   }

   h2 {
     @extend .type-heading-l;
   }
   // ... and so on for other headings
   ```

The primary reason for using `@extend` is flexibility for future updates. The typography classes are taken directly from the main MetaMask website, which is expected to undergo customization in the coming months.

## 7. Issues Left

Is there a way to enable source maps for SCSS files, particularly in development mode? The issue is open at https://github.com/rlamana/docusaurus-plugin-sass/issues/35

## Migrating Components from the main website

### Button

#### 1. Migrating Icons and Logos

- Source: `/src/assets` (Next.js)
- Destination: `/static/img` (Docusaurus)
- Action: Move all icon and logo files from the assets folder in the Next.js project to the img folder in the Docusaurus project.

#### 2. Migrating the Spinner Component

- Source: `/src/lib/components/elements/spinner` (Next.js)
- Destination: `/src/components/elements/spinner` (Docusaurus)
- Actions:
  - Copy the Spinner component from the Next.js project to the Docusaurus project.
  - Update the icon path within the Spinner component:
    ```javascript
    // Before
    import SpinnerIcon from '@/assets/icons/spinner.svg'
    // After
    import SpinnerIcon from '@site/static/img/icons/spinner.svg'
    ```

#### 3. Migrating Utility Files

- Source: `/src/lib/utils` (Next.js)
- Destination: `/src/utils` (Docusaurus)
- Files:
  - `component-map.js`
  - `icon-map.js`
  - `logo-map.js`
- Action: Move the utility files and update the paths in `icon-map.js` and `logo-map.js`:
  ```javascript
  // Before
  import IconAppStore from '@/assets/icons/app-store.svg'
  // After
  import IconAppStore from '@site/static/img/icons/app-store.svg'
  ```

#### 4. Updating component-map.js

- Source: `/src/lib/utils/component-map.js` (Next.js)
- Destination: `/src/utils/component-map.js` (Docusaurus)
- Action: Update the import statement and the NextLink component:

  ```javascript
  // Before
  import NextLink from 'next/link'
  // After
  import Link from '@docusaurus/Link'

  // Modify the linkComponentMap object
  // Before
  <NextLink href={href} target={target} className={className} {...props} ref={ref}>
  // After
  <Link to={href} target={target} className={className} {...props} ref={ref}>
  ```

#### 5. Migrating and Updating the Button Component

- Source: `/src/lib/components/elements/buttons/button` (Next.js)
- Destination: `/src/components/elements/buttons/button` (Docusaurus)
- Action: Migrate the button component and update import paths:
  ```javascript
  // Before
  import Spinner from '@/components/elements/spinner'
  import { linkComponentMap } from '@/utils/component-map'
  import { buttonIconMap } from '@/utils/icon-map'
  import { logoMap } from '@/utils/logo-map'
  // After
  import Spinner from '@site/src/components/elements/spinner'
  import { linkComponentMap } from '@site/src/utils/component-map'
  import { buttonIconMap } from '@site/src/utils/icon-map'
  import { logoMap } from '@site/src/utils/logo-map'
  ```

#### 6. Additional customization

- Add missing GitHub icon in button component:
  ```javascript
  // In /src/utils/icon-map.js
  ['github']: { component: IconGitHub }
  ```
- GitHub Icon pixel issue: add dynamic class into renderIcon classnames:
  ```javascript
  icon === 'github' && styles['icon--adjust']
  ```
- Styles: add style for 'icon--adjust' in the button styles:
  ```css
  margin-bottom: 0.1rem;
  ```

### CutOffCorners

- Source: `/src/lib/components/elements/spinner` (Next.js)
- Destination: `/src/components/elements/spinner` (Docusaurus)
- Action: Copy the Spinner component from the Next.js project and place it in the corresponding directory within the Docusaurus project.
