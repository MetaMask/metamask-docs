# MetaMask Docs

This is the MetaMask documentation repo. It's built on [Docusaurus](https://docusaurus.io/), a static site generator purpose-built for technical documentation.

## Features

Our instance of Docusaurus uses multiple of its powerful features, including:

* [Multi-instance](https://docusaurus.io/docs/docs-multi-instance): we have two instances of docs, one for the API & SDK, and one for Snaps
* [Versioning](https://docusaurus.io/docs/versioning): the Snaps documentation is exposed in two versions, "current" and "next". This allows us to send developers to either of these two versions based on whether they're using a nightly build of Flask, or the officially published extension
* [MDX](https://docusaurus.io/docs/markdown-features/react#importing-markdown)
* [Custom Sidebars](https://docusaurus.io/docs/sidebar): normally sidebars are auto-generated based on the docs directory structure. Having a custom sidebar allows us to define the order and inclusion of documentation items, with any hierarchy we want. The current proposed hierarchy is here: https://docs.google.com/spreadsheets/d/1fr1qnP830Zrdbzq0rPvoTVQsYBwL2Sq-wEJjL4tGfM8/edit

## Getting Started
All the documentation is in the form of Markdown files located in the `docs` directory. To add a new document:

1. Create the `.md` file in an appropriate location in the `docs` directory, and add your content
2. Edit the `sidebars.js` file to add the document to its appropriate place in the sidebar.

## Migrating documentation from the `MetaMask/metamask-docs` repo
For the most part, Markdown files in the `MetaMask/metamask-docs` repo can be copied directly. However, a few things are to be noted:

* The new documents won't appear in the sidebar automatically. An entry has to be added in the `sidebars.js` file to make that happen
* Any custom Vue component will need to be migrated to React
* You'll need to migrate the admonitions
  * `::: admonition` becomes `:::admonition` (without the space)
  * Available admonitions are: `note`, `tip`, `info`, `caution`, `danger`. Any others will have to be adjusted to the available ones
  * The `:::: tabs` and `::: tab` admonitions will have to be migrated to [MDX Tabs](https://docusaurus.io/docs/markdown-features/tabs)
* Embedded code will have to be migrated to [Live Code Blocks](#live-code-blocks).

### Setup

- Install [Node.js](https://nodejs.org) version 16
  - If you are using [nvm](https://github.com/creationix/nvm#installation) (recommended) running `nvm use` will automatically choose the right node version for you.
- Install [Yarn v3](https://yarnpkg.com/getting-started/install)
- Run `yarn install` to install dependencies and run any required post-install scripts

## Running locally

`yarn start`


## MDX

### Tabs
Tabs are documented here: https://docusaurus.io/docs/markdown-features/tabs

#### Markdown in Tabs
One thing that's not documented is how to properly do Markdown inside tabs. For example, to properly embed a list inside a tab item, one has to skip lines around the JSX tags, and un-indent the list. Otherwise, the 4 spaces will be mistaken as the start of a pre-formatted block:

```jsx
<Tabs>
  <TabItem value="apple" label="Apple" default>

- This is a markdown apple 🍎
- This is **meow**


  </TabItem> {/* notice **two** skipped lines above*/}
  <TabItem value="orange" label="Orange">
    This is an orange 🍊
  </TabItem>
  <TabItem value="banana" label="Banana">
    This is a banana 🍌
  </TabItem>
</Tabs>
```

### Live Code Blocks

Rather than implementing our own live code blocks, we use the [`remark-codesandbox`](https://github.com/kevin940726/remark-codesandbox/) Remark plugin. This allows us to define a code block that will be loaded live in a CodeSandbox iframe, by adding a meta to the codeblock, like ` ```javascript codesandbox=vanilla`

This allows us to keep our code blocks versioned and in our codebase, while giving us the full power of CodeSandbox to showcase any example we want, with any dependency we want.

The plugin allows for simple codeblocks where the content of the block replaces the CodeSandbox entry point, or more complex examples that can be loaded directly from the filesystem, by using `codesandbox=file:./example-folder`, as detailed in the plugin's documentation.

## Styling

In this repository, we use design tokens [implemented here](https://github.com/MetaMask/design-tokens). These design tokens are available as CSS variables, which makes it easy for developers to use them in their code.

By using design tokens, we ensure consistency in the design of the Metamask user interface across different platforms and devices. To use the design tokens in your code, simply reference the CSS variables in your styles.

For example, to use the primary color of the Metamask design, you would use the following CSS code:

```css
color: var(--color-text-default);
```

You can refer to all design tokens in the [design-tokens](https://github.com/MetaMask/design-tokens/blob/main/src/css/design-tokens.css) repository.
