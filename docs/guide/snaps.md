# Introduction

::: tip Snaps is pre-release software.
To try Snaps, install [MetaMask Flask](https://metamask.io/flask).
:::

## Extend the functionality of MetaMask

Snaps is a system that allows anyone to safely extend the capabilities of MetaMask. A _snap_ is a program that we run in an isolated environment that can customize the wallet experience.

For example, a snap can add new APIs to MetaMask, add support for different blockchain protocols, or modify existing functionality using internal APIs. Snaps is a new way to create web3 end user experiences, by modifying MetaMask in ways that were impossible before.

### JSON-RPC API

Snaps are run in an isolated environment where they have access to a limited set of capabilities, determined by the permissions they were granted by the user during installation.
As with MetaMask’s [Ethereum Provider RPC API](./rpc-api.html), snaps communicate with MetaMask using JSON-RPC.

New JSON-RPC methods for snaps have been added to our JSON-RPC API, which are documented as part of the [Snaps JSON-RPC API](./snaps-rpc-api.html).
These new methods are what allow snaps to modify the functionality of MetaMask.
In addition, they also allow websites to install and communicate with individual snaps.

### Execution environment

Snaps are untrusted JavaScript programs that execute safely inside the MetaMask application. To isolate snaps from the rest of the application and to provide a “fully virtualizable” execution environment, MetaMask uses [Secure EcmaScript (SES)](https://github.com/endojs/endo/tree/master/packages/ses), a subset of JavaScript developed by [Agoric](https://agoric.com/).

Among other things, SES allows us to restrict access to global JavaScript APIs and to isolate untrusted code from other parts of the application. SES does this at the cost of some performance and incompatibility with some JavaScript practices, such as modifying prototypes of intrinsic objects (e.g. the `Promise` constructor).

## Features

At present, snaps can (1) create new RPC methods for websites to call, (2) call many of the same RPC methods that websites can call, and (3) access a limited set of snap-exclusive RPC methods.

<img src="../assets/flask.png" alt="Live in MetaMask Flask" style="width: 171px; position: relative; top: 20px;" />

#### Display a custom confirmation screen in MetaMask &bull; [Learn more](./snaps-rpc-api.html#snap-confirm)

Show a MetaMask popup with custom text and buttons to approve or reject an action. This can be used to create requests, confirmations, and opt-in flows for a snap.

<img src="../assets/flask.png" alt="Live in MetaMask Flask" style="width: 171px; position: relative; top: 20px;" />

#### Notify users in MetaMask &bull; [Learn more](./snaps-rpc-api.html#snap-notify)

MetaMask Flask introduces a generic notifications interface that can be utilized by any snap with the notifications permission. A short notification text can be triggered by a snap for actionable or time-sensitive information.

<img src="../assets/flask.png" alt="Live in MetaMask Flask" style="width: 171px; position: relative;top: 20px;" />

#### Store and manage data on your device &bull; [Learn more](./snaps-rpc-api.html#snap-managestate)

Store, update, and retrieve data securely, with encryption by default.

<img src="../assets/flask.png" alt="Live in MetaMask Flask" style="width: 171px; position: relative;top: 20px;" />

#### Control non-EVM accounts and assets in MetaMask &bull; [Learn more](./snaps-rpc-api.html#snap-getbip44entropy)

Derive BIP-32 and BIP-44 keypairs based on the Secret Recovery Phrase without exposing it. With the power to manage keys, you can build snaps to support a variety of blockchain protocols.

<img src="../assets/flask.png" alt="Live in MetaMask Flask" style="width: 171px; position: relative;top: 20px;" />

#### Populate MetaMask's pre-transaction window with custom transaction insights &bull; [Learn more](./snaps-exports.html#ontransaction)

Bring your insights, anti-phishing, and security solutions to the MetaMask UI with the transaction insights API.

<img src="../assets/flask.png" alt="Live in MetaMask Flask" style="width: 171px; position: relative;top: 20px;" />

#### Schedule actions with cron jobs &bull; [Learn more](./snaps-exports.html#oncronjob)

Perform actions that run periodically at fixed times, dates, or intervals.

<img src="../assets/soon.png" alt="Coming soon" style="width: 106px; position: relative; top: 20px;" />

#### Custom UI in MetaMask using a defined set of components

Display custom UI within MetaMask using a set of pre-defined components, including Markdown, form controls, and images. This custom UI can include actionable controls for dynamic interfaces that respond to user input.

### Propose a feature

Create a feature proposal with your ideas in our [GitHub discussion board](https://github.com/MetaMask/snaps-monorepo/discussions).

## Getting started

Let's extend the functionality of MetaMask and build the wallet experience of the future.

### Prerequisites

- Up-to-date Chromium or Firefox browser
- [Node.js](https://nodejs.org/)
- MetaMask Flask

  To interact with (your) snaps, you will need to install [MetaMask Flask](https://metamask.io/flask/), a canary distribution for developers that provides access to upcoming features.

  ::: warning
  Make sure to install Flask in a new browser profile or disable any existing installed versions of MetaMask. Running multiple instances of MetaMask in the same browser profile will break dapp interactions.
  :::

### Quick start using our template

Get started with Snaps using [our template](https://github.com/MetaMask/template-snap-monorepo) built with TypeScript and React. Create the repository [via GitHub](https://github.com/MetaMask/template-snap-monorepo/generate) and [clone it](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) down to your local machine using e.g. the command line.

> NB: Snaps should work with the latest LTS version of Node.js, but we recommend using the version specified in the template's `.nvmrc` file. If you use [nvm](https://github.com/nvm-sh/nvm) you can switch easily with calling `nvm use` at the root of the project.

From the root of the repo, install the dependencies:

```shell
yarn
```

Start the development server:

```shell
yarn start
```

You should now be serving both (1) the front-end and (2) the snap locally. Time to check it out in action at [`http://localhost:8000/`](http://localhost:8000/).

### Connecting to the snap

Once you have the [development environment](./snaps.html#quick-start-using-our-template) running, you should be able to **connect** and **install** the snap.

1. Click the **Connect** button and the MetaMask Flask extension should pop up and require you to approve the template snap's permissions.

2. Once connected, try out the **Send message** button to display a custom message within a confirmation screen in MetaMask.

You've now successfully connected, installed, and interacted with your snap.

### Let's start building

Customize your snap by editing and expanding `index.ts` in the `packages/snap/src` folder.

Initially it contains an example request that utilizes the `snap_confirm` method to display a custom confirmation screen:

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

Modify the text in the `description` or `textAreaContent` field and click the **Reconnect** button to reinstall the snap.

::: tip Local Snap Reinstallation
MetaMask automatically reinstalls locally hosted snaps whenever it receives a connection request for them.
:::

The next time you click the **Send message** button, you will see the updated text in the confirmation screen. _This flow will be improved in the next update to the template-snap-monorepo._

## Next up

If you're interested in building your own snap, next up is the [Snaps development guide](./snaps-development-guide.html).

## Need help?

If you have questions, proposals, or need help with anything related to Snaps, you're always welcome to ask our team and community on [GitHub discussions](https://github.com/MetaMask/snaps-monorepo/discussions).
