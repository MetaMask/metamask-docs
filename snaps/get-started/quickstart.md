---
description: Get started quickly using the create-snap starter kit.
sidebar_position: 2
---

import YoutubeEmbed from '@site/src/components/YoutubeEmbed'

# Snaps quickstart

Get started creating your own Snap.
Use the [`@metamask/create-snap`](https://github.com/MetaMask/snaps/tree/main/packages/create-snap)
starter kit to initialize a Snap monorepo project built with TypeScript and React.
See the following video demo:

<YoutubeEmbed url="https://www.youtube.com/embed/qZRAryYwgdg?si=CeImIULgH3iD-FF0" />

## Prerequisites

- [MetaMask Flask installed](install-flask.md)
- A text editor (for example, [VS Code](https://code.visualstudio.com/))
- [Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 18.16 or later
- [Yarn](https://yarnpkg.com/)

## Create the project

Create a new Snap project using the [`@metamask/create-snap`](https://github.com/MetaMask/snaps/tree/main/packages/create-snap)
starter kit by running:

```bash
yarn create @metamask/snap your-snap-name
```

or

```bash
npx @metamask/create-snap your-snap-name
```

or

```bash
npm create @metamask/snap your-snap-name
```

See [Snaps files](../learn/about-snaps/files.md) to learn about your Snap project files.

## Start the Snap

From the root of the newly created project, install the project dependencies using Yarn:

```shell
yarn install
```

Start the development server:

```shell
yarn start
```

You are now serving the Snap at [`http://localhost:8080`](http://localhost:8080/) and its front-end dapp at [`http://localhost:8000`](http://localhost:8000/).

## Connect to the Snap

On the front-end dapp, select the **Connect** button and the MetaMask Flask extension pops up and
requires you to approve the Snap's permissions.

Once connected, select the **Send message** button to display a custom message within a confirmation
screen in MetaMask Flask.

## Customize the Snap

Open the project in a text editor.
You can customize your Snap by editing `index.ts` in the `packages/snap/src` folder.

`index.ts` contains an example request that uses the
[`snap_dialog`](../reference/snaps-api.md#snapdialog) method to display a custom confirmation screen:

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

## Next steps

- To learn more about the Snaps system, review [fundamental Snaps concepts](/snaps/learn/about-snaps)
  and try the [Snaps tutorials](/snaps/learn/tutorials).
- To implement specific features and use cases, see the [Snaps feature guides](/snaps/features).
- To follow best practices for developing a Snap, see the [Snaps how-to guides](/snaps/how-to).
