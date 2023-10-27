---
description: Get started quickly using the Snaps template.
sidebar_position: 2
---

# Snaps quickstart

Get started with Snaps using the [`@metamask/create-snap` CLI](https://github.com/MetaMask/snaps/tree/main/packages/create-snap).
With the CLI, you can initialize a Snap monorepo project built with TypeScript and React.

## Prerequisites

- [MetaMask Flask installed](install-flask.md)

  :::tip
  MetaMask Snaps works with the latest LTS version of Node.js, but we recommend using the version specified in
  the template's [`.nvmrc`](https://github.com/MetaMask/template-snap-monorepo/blob/main/.nvmrc) file.
  :::

- A text editor (for example, [VS Code](https://code.visualstudio.com/))
- [Yarn](https://yarnpkg.com/) version 3

## Create the project

Create a new Snap project using the [`@metamask/create-snap` CLI](https://github.com/MetaMask/snaps/tree/main/packages/create-snap) by running:

```bash
yarn create @metamask/snap your-snap-name
```

or

```bash
npm create @metamask/snap your-snap-name
```

See the section [Snaps anatomy](../concepts/anatomy.md) to learn about the anatomy of your Snap project files.

## Start the Snap

From the root of the newly created project, install the project dependencies using Yarn:

```shell
yarn install
```

Start the development server:

```shell
yarn start
```

You are now serving the Snap at [`http://localhost:8080`](http://localhost:8080/) and its front-end at [`http://localhost:8000`](http://localhost:8000/).

## Connect to the Snap

On the front-end, select the **Connect** button and the MetaMask Flask extension pops up and
requires you to approve the Snap's permissions.

Once connected, select the **Send message** button to display a custom message within a confirmation
screen in MetaMask Flask.

## Customize the Snap

Open the project in a text editor.
You can customize your Snap by editing `index.ts` in the `packages/snap/src` folder.

`index.ts` contains an example request that uses the
[`snap_dialog`](../reference/rpc-api.md#snapdialog) method to display a custom confirmation screen:

```ts
import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { getMessage } from './message';

export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'Confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the Snap source code to make it do something, if you want to!',
            ),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};
```

Edit the text in any `text()` component and select the **Reconnect** button
on the front-end to re-install the Snap.

:::note
MetaMask Flask automatically re-installs locally hosted Snaps whenever it receives a connection request
for them.
:::

The next time you select the **Send message** button, you see the updated text in the confirmation screen.

You've now successfully connected, installed, interacted with, and customized your Snap!
Learn more about [developing a Snap](../how-to/develop-a-snap.md).
