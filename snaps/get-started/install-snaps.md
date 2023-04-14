---
description: Install Snaps dependencies.
---

# Install Snaps

To use Snaps, you must install [MetaMask Flask](#install-metamask-flask) and the [Snaps CLI](#install-the-snaps-cli).

You can then [get started quickly using the Snaps template](quickstart.md).

## Prerequisites

- Up-to-date Chromium or Firefox browser
- [Node.js](https://nodejs.org/) version 16 or later
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [Yarn](https://yarnpkg.com/)

## Install MetaMask Flask

[MetaMask Flask](https://metamask.io/flask/) is a canary distribution for developers that provides
access to upcoming MetaMask features.
Snaps is the first feature rolled out in the Flask environment.

[Install Flask](https://chrome.google.com/webstore/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk)
in a new browser profile, or disable any existing installed versions of MetaMask before installing
Flask.

:::caution
Running multiple instances of MetaMask in the same browser profile breaks dapp interactions.
:::

## Install the Snaps CLI

The [Snaps CLI](../reference/cli/index.md) provides commands for initiating a snap project and building,
executing, and serving your snap for local development.

In a terminal window, install the CLI globally using npm or Yarn:

```bash
npm install -g @metamask/snaps-cli
or
yarn global add @metamask/snaps-cli
```

Verify the installation and display usage instructions:

```bash
mm-snap --help
```
