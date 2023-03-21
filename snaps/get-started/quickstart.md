---
description: Get started quickly using the Snaps template.
---

# Snaps quickstart

Get started with Snaps using the
[Snaps template](https://github.com/MetaMask/template-snap-monorepo) built with TypeScript and React.

## Prerequisites

- [Snaps installed](install-snaps.md)

  :::note
  Snaps works with the latest LTS version of Node.js, but we recommend using the version specified in
  the template's [`.nvmrc`](https://github.com/MetaMask/template-snap-monorepo/blob/main/.nvmrc) file.
  :::

- A text editor (for example, [VS Code](https://code.visualstudio.com/))

## Create the project

Use the Snaps template by
[creating a new repository from the template](https://github.com/MetaMask/template-snap-monorepo/generate).

[Clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
using the command line:

```bash
git clone git@github.com:<your-username>/template-snap-monorepo.git
```

You can learn about the [anatomy of your snap project files](../concepts/anatomy.md).

## Start the snap

From the root of the repository, install the project dependencies using Yarn:

```shell
yarn
```

Start the development server:

```shell
yarn start
```

You're now serving the snap and its front-end at [`http://localhost:8000`](http://localhost:8000/).

## Connect to the snap

On the front-end, select the **Connect** button and the MetaMask Flask extension pops up and
requires you to approve the snap's permissions.

Once connected, select the **Send message** button to display a custom message within a confirmation
screen in MetaMask.

## Customize the snap

Open the project in a text editor.
You can customize your snap by editing `index.ts` in the `packages/snap/src` folder.

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
              'But you can edit the snap source code to make it do something, if you want to!',
            ),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};
```

Edit the text in the `description` or `textAreaContent` field and select the **Reconnect** button
on the front-end to re-install the snap.

:::note
MetaMask automatically re-installs locally hosted snaps whenever it receives a connection request
for them.
:::

The next time you select the **Send message** button, you see the updated text in the confirmation screen.

You've now successfully connected, installed, interacted with, and customized your snap!
Learn more about [developing a snap](../how-to/develop-a-snap.md).
