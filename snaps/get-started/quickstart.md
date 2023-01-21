# Snaps quickstart

Get started with Snaps using
[our template](https://github.com/MetaMask/template-snap-monorepo) built with TypeScript and React.
Create the repository [via GitHub](https://github.com/MetaMask/template-snap-monorepo/generate) and
[clone it](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
down to your local machine using e.g. the command line.

:::note
Snaps should work with the latest LTS version of Node.js, but we recommend using the version
specified in the template's `.nvmrc` file.
If you use [nvm](https://github.com/nvm-sh/nvm) you can switch easily with calling `nvm use` at the
root of the project.
:::

From the root of the repo, install the dependencies:

```shell
yarn
```

Start the development server:

```shell
yarn start
```

You should now be serving both (1) the front-end and (2) the snap locally.
Time to check it out in action at [`http://localhost:8000/`](http://localhost:8000/).

### Connect to the snap

Once you have the development environment running, you can **connect** and **install** the snap.

1. Select the **Connect** button and the MetaMask Flask extension should pop up and require you to
   approve the template snap's permissions.
1. Once connected, try out the **Send message** button to display a custom message within a
   confirmation screen in MetaMask.

You've now successfully connected, installed, and interacted with your snap.

### Start building

Customize your snap by editing and expanding `index.ts` in the `packages/snap/src` folder.

Initially it contains an example request that utilizes the `snap_confirm` method to display a custom
confirmation screen:

```ts
import { OnRpcRequestHandler } from '@metamask/snap-types';
import { getMessage } from './message';

export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: getMessage(origin),
            description:
              'This custom confirmation is just for display purposes.',
            textAreaContent:
              'Edit the source code to make your snap do what you want.',
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
};
```

Modify the text in the `description` or `textAreaContent` field and click the **Reconnect** button
to reinstall the snap.

:::tip Local snap re-installation
MetaMask automatically re-installs locally hosted snaps whenever it receives a connection request
for them.
:::

The next time you select the **Send message** button, you see the updated text in the confirmation screen.
_This flow will be improved in the next update to the template-snap-monorepo._
