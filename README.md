# MetaMask Docs

This is the MetaMask documentation repo. It's built on [Docusaurus](https://docusaurus.io/), a static site generator purpose-built for technical documentation.

## Features

Our instance of Docusaurus uses multiple of its powerful features, including:

* [Multi-instance](https://docusaurus.io/docs/docs-multi-instance): we have two instances of docs, one for the API & SDK, and one for Snaps
* [Versioning](https://docusaurus.io/docs/versioning): the Snaps documentation is exposed in two versions, "current" and "next". This allows us to send developers to either of these two versions based on whether they're using a nightly build of Flask, or the officially published extension
* [MDX](https://docusaurus.io/docs/markdown-features/react#importing-markdown)
* [Custom Sidebars](https://docusaurus.io/docs/sidebar): normally sidebars are auto-generated based on the docs directory structure. Having a custom sidebar allows us to define the order and inclusion of documentation items, with any hierarchy we want. The current proposed hierarchy is here: https://docs.google.com/spreadsheets/d/1fr1qnP830Zrdbzq0rPvoTVQsYBwL2Sq-wEJjL4tGfM8/edit

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
Rather than implementing our own live code blocks, we use the [`remark-codesandbox`](https://github.com/kevin940726/remark-codesandbox/) Remark plugin. This allows us to define a code block that will be loaded live in a CodeSandbox iframe, by adding a meta to the codeblock, like ```javascript codesandbox=vanilla

This allows us to keep our code blocks versioned and in our codebase, while giving us the full power of CodeSandbox to showcase any example we want, with any dependency we want.

The plugin allows for simple codeblocks where the content of the block replaces the CodeSandbox entry point, or more complex examples that can be loaded directly from the filesystem, by using `codesandbox=file:./example-folder`, as detailed in the plugin's documentation.