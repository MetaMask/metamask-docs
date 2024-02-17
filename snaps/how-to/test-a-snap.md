---
description: Use Jest for end-to-end Snap testing.
sidebar_position: 6
---

# Test a Snap

You can test your Snap by hosting it locally using `yarn start`, installing it in Flask, and calling
its API methods from a dapp.

For end-to-end Snap testing in a Jest environment, use the
[`@metamask/snaps-jest`](https://github.com/MetaMask/snaps/tree/main/packages/snaps-jest) package
as follows.

## Steps

### 1. Install @metamask/snaps-jest

Install the `@metamask/snaps-jest` package into your Snap project using [Yarn](https://yarnpkg.com/)
or [npm](https://www.npmjs.com/):

```bash
yarn add -D @metamask/snaps-jest
```

or

```bash
npm i @metamask/snaps-jest
```

### 2. Configure @metamask/snaps-jest

The easiest way to configure this package is to add it to your Jest configuration as a preset.
In the `jest.config.js` file, add the following:

```js title="jest.config.js"
module.exports = {
  preset: '@metamask/snaps-jest',
};
```

This automatically configures Jest to use the `@metamask/snaps-jest` environment, and to use the
`@metamask/snaps-jest` matchers.
You can then run the `jest` command as usual.

:::note
`@metamask/snaps-jest` assumes the Snap is built in the directory you run Jest from.
If you use a different directory, you can specify the path using the
[`root`](../reference/cli/options.md#r-root) option, or by running your own HTTP server.
It's currently not possible to use `@metamask/snaps-jest` with a Snap that is not built.
:::

If you don't use the package as a preset, you can alternatively add the `@metamask/snaps-jest`
environment and matchers to your Jest configuration manually:

```js title="jest.config.js"
module.exports = {
  testEnvironment: '@metamask/snaps-jest',
  setupFilesAfterEnv: ['@metamask/snaps-jest/dist/cjs/setup.js'],
};
```

You can pass any [Jest options](../reference/jest.md#options) to the test environment by adding a
`testEnvironmentOptions` property to your Jest configuration.
For example:

```js title="jest.config.js"
module.exports = {
  preset: '@metamask/snaps-jest',
  testEnvironmentOptions: {
    // Options go here
  },
};
```

All options are optional.

### 3. Use @metamask/snaps-jest

Use the package by calling any of the [API methods](../reference/jest.md#api-methods).
You can:

- [Install a Snap.](../reference/jest.md#installsnap)
- [Send a transaction to the Snap.](../reference/jest.md#sendtransaction)
- [Run a cronjob in the Snap.](../reference/jest.md#runcronjob)
- [Interact with user interfaces.](../reference/jest.md#getinterface)
- [Mock the response of a network request.](../reference/jest.md#mock)
- [Close the testing page.](../reference/jest.md#close)

You can also use [Jest matchers](../reference/jest.md#jest-matchers) to assert that a response from
a Snap matches an expected value.
