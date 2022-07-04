# Introduction

::: tip Developer Preview Software
Snaps is pre-release software. To try Snaps, install [MetaMask Flask](https://metamask.io/flask).
:::

## What is Snaps?

Snaps is a system that allows anyone to safely expand the capabilities of MetaMask.
A "snap" is a program that we run in an isolated environment that can customize the wallet experience.
For example, a snap can add new APIs to MetaMask, add support for different blockchain protocols, or modify existing functionality using internal APIs.
Snaps is a new way to create web3 end user experiences, by modifying MetaMask in ways that were impossible before.

Snaps are run in an isolated environment where they have access to a limited set of capabilities, determined by the permissions they were granted by the user during installation. As with MetaMask’s [Ethereum Provider RPC API](./rpc-api.html), snaps communicate with MetaMask using JSON-RPC.

New RPC methods have been added to our Ethereum Provider JSON-RPC API as well, which are documented as part of the [Snaps RPC API](./snaps-rpc-api.html).
These new methods are what allow snaps to modify the functionality of MetaMask.
In addition, they also allow websites to install and communicate with individual snaps.

### Current Functionality

At present, snaps can create new RPC methods for websites to call, can call many of the same RPC methods that websites can call, and access a limited set of snap-exclusive RPC methods. See the [Snaps RPC API documentation](./snaps-rpc-api.html) for more details. Over time, MetaMask will expose more internal functionality as RPC methods, granting more capabilities to snaps.

At the moment, snaps cannot modify the MetaMask UI directly. If a snap needs a UI, that UI must exist entirely on a website that can communicate with the snap.

### Execution Environment

Snaps are untrusted JavaScript programs but execute safely inside the MetaMask application. To isolate snaps from the rest of the application and to provide a “fully virtualizable” execution environment, MetaMask uses [Secure EcmaScript (SES)](https://github.com/endojs/endo/tree/master/packages/ses), a subset of JavaScript developed by [Agoric](https://agoric.com/).
Among other things, SES allows us to restrict access to global JavaScript APIs and to isolate untrusted code from other parts of the application. SES does this at the cost of some performance and incompatibility with some JavaScript practices, such as modifying prototypes of intrinsic objects (e.g. the `Promise` constructor).

## Getting Started

There are many simple snaps available for you to learn from and begin to understand what your own snap needs. The following tutorial will walk you through a "Hello, World!" snap.

### Prerequisites

- Node.js
  - We recommend using [nvm](https://github.com/nvm-sh/nvm). If you don't want to use nvm, your local Node version needs to be greater than or equal to the one listed [here](https://github.com/MetaMask/template-snap/blob/main/.nvmrc).
- git
- [yarn v1](https://classic.yarnpkg.com)
- Up-to-date Chromium or Firefox browser

### Installing MetaMask Flask

[MetaMask Flask](https://metamask.io/flask) is a separate extension for developers that provides access to additional unstable APIs. The goal of Flask is to maximize developer control, so that we can learn the full extent of what developers want to do with MetaMask and incorporate those lessons into the stable MetaMask distribution. Snaps is the first feature to be released on Flask.

- First, in a Firefox or Chromium browser, create a new browser profile or disable any existing installed versions of MetaMask.
  - Running multiple instances of MetaMask in the same browser profile will break dapp interactions.
- Next, download [Flask](https://metamask.io/flask) and add it your chosen browser.

### Serving a Snap to Your Local Environment

With Flask in your browser, it's time to plug something into it. If you don't want to download any code for the moment, check out the example snap [deployed here](https://metamask.github.io/template-snap/) and follow the instructions below under 'Interacting with the Snap'.

If you're ready to jump in and see how a Snap looks under the hood, follow the steps below!

Open up a new terminal window, and do the following:

- Clone the [template snap](https://github.com/MetaMask/template-snap) repo.
- `cd` into the repo, and run `nvm use`.
  - This will install and/or use the recommended NVM version from `.nvmrc`.
- Run `yarn install && yarn build:clean && yarn serve`.
  1. This first runs the commands needed to install dependencies.
  1. If there is a `dist/` folder, it is then cleaned before the build command is run.
  1. Finally, the dapp is served on `http://localhost:8080`.

Your terminal window should now be serving the example snap locally. Time to see the functionality in action!

### Interacting with the Snap

If you're serving the snap locally, open up a browser window and navigate to `http://localhost:8080`.

You should see a simple message explaining the functionality of the snap and two buttons. Start by clicking the `Connect` button; your Flask extension should pop up and require you to click through two notifications.

Once you've connected to Flask, smash that `Send Hello` button, and watch the snap display your "hello" message!

## Where to Go from Here

- If you're interested in developing your own snap, your next destination is probably [the Snaps development guide](./snaps-development-guide.html).
- You can also try the following example snaps. Each one is fully functional and open-source:
  - [Filsnap for Filecoin support](https://github.com/Chainsafe/filsnap/)
  - [BitcoinSnap for Bitcoin support](https://github.com/KeystoneHQ/btcsnap)
  - [Password Manager Snap](https://github.com/ritave/snap-passwordManager)
- If you have questions or need help, join our [discussion board](https://github.com/MetaMask/snaps-skunkworks/discussions).
