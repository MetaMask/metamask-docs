---
description: Use Jest for end-to-end Snap testing.
sidebar_position: 6
---

# Test a Snap

You can test your Snap [locally](#test-locally), in the [Snaps sandbox](#test-in-a-sandbox), and [end-to-end using Jest](#test-end-to-end).

## Test locally

1. Host your Snap locally:

   ```bash
   yarn start
   ```
   
2. Install your Snap in Flask.

3. Test your Snap by calling its API methods from a dapp.

## Test in the sandbox

Use the Snaps sandbox to test and debug your Snap in an easy-to-use interface.

1. Run the [`sandbox`](../reference/cli.md#sandbox) subcommand to start the sandbox server:

   ```bash
   yarn mm-snap sandbox
   ```

   Navigate to the `localhost` URL displayed in the terminal.

2. Install your Snap in Flask.

3. Test your Snap by calling its API methods from the sandbox interface.

## Test end-to-end

Follow these steps to test your Snap end-to-end in a Jest environment.

### 1. Install `@metamask/snaps-jest`

Install the [`@metamask/snaps-jest`](https://github.com/MetaMask/snaps/tree/main/packages/snaps-jest) package into your Snap project using [Yarn](https://yarnpkg.com/)
or [npm](https://www.npmjs.com/):

```bash
yarn add -D @metamask/snaps-jest
```

or

```bash
npm i @metamask/snaps-jest
```

### 2. Configure `@metamask/snaps-jest`

The easiest way to configure this package is to add it to your Jest configuration as a preset.
In the `jest.config.js` file, add the following:

```js title="jest.config.js"
module.exports = {
  preset: "@metamask/snaps-jest",
}
```

This automatically configures Jest to use the `@metamask/snaps-jest` environment, and to use the
`@metamask/snaps-jest` matchers.
You can then run the `jest` command as usual.

:::note
`@metamask/snaps-jest` assumes the Snap is built in the directory you run Jest from.
If you use a different directory, you can specify the path using the
[`server.root`](../reference/cli/options.md#serverroot) option, or by running your own HTTP server.
It's currently not possible to use `@metamask/snaps-jest` with a Snap that is not built.
:::

If you don't use the package as a preset, you can alternatively add the `@metamask/snaps-jest`
environment and matchers to your Jest configuration manually:

```js title="jest.config.js"
module.exports = {
  testEnvironment: "@metamask/snaps-jest",
  setupFilesAfterEnv: ["@metamask/snaps-jest/dist/cjs/setup.js"],
}
```

You can pass any [Jest options](../reference/jest.md#options) to the test environment by adding a
`testEnvironmentOptions` property to your Jest configuration.
For example:

```js title="jest.config.js"
module.exports = {
  preset: "@metamask/snaps-jest",
  testEnvironmentOptions: {
    // Options go here.
  },
}
```

All options are optional.

### 3. Use `@metamask/snaps-jest`

Use the package by calling any of the [API methods](../reference/jest.md#api-methods).
For example, you can:

- [Install a Snap.](../reference/jest.md#installsnap)
- [Send a transaction to the Snap.](../reference/jest.md#ontransaction)
- [Run a cron job in the Snap.](../reference/jest.md#oncronjob)
- [Interact with user interfaces.](../reference/jest.md#getinterface)

You can also use [Jest matchers](../reference/jest.md#jest-matchers) to assert that a response from
a Snap matches an expected value.
