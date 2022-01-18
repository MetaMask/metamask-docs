# Snaps Introduction

::: tip Only Available in MetaMask Flask
Snaps is only available in [MetaMask Flask](https://metamask.io/flask).
:::

## What is Snaps?

Snaps is a system that allows safely expanding the capabilities MetaMask. A "snap" is a program that we run in an isolated environment that can customize the wallet experience in some way. For example, a snap can add new APIs to MetaMask, add new features, or modify existing functionality using internal APIs. Snaps makes extending MetaMask easier and safer, for both users and developers.

## MetaMask Snaps: Overview

Broadly speaking, MetaMask Snaps is a system that allows running untrusted programs inside MetaMask and granting them specific capabilities. Snaps are run in an isolated environment where they have access to a limited set of capabilities, determined by the permissions they were granted by the user during installation. As with MetaMask’s [Ethereum Provider RPC API](./rpc-api.html), snaps communicate with MetaMask using a JSON-RPC API.

New RPC methods have been added to our Ethereum Provider RPC API as well, which are documented as part of the [Snaps RPC API](./snaps-rpc-api.html). These methods allow websites to request that snaps be installed, and to communicate with individual snaps.

### Current Functionality

At present, snaps can create new RPC methods for websites to call, they can call many of the same RPC methods that websites can call, and they have access to a limited set of snap-exclusive RPC methods. See the [Snaps RPC API documentation](./snaps-rpc-api.html) for more details. Over time, MetaMask will expose more internal functionality as RPC methods, granting more capabililities to snaps.

At the moment, snaps cannot modify the MetaMask UI directly. If a snap needs a UI, that UI must exist entirely on a website that can communicate with the snap.

### Execution Environment

Snaps are untrusted JavaScript programs but execute safely inside the MetaMask application. To isolate snaps from the rest of the application and to provide a “fully virtualizable” execution environment, MetaMask uses [Secure EcmaScript (SES)](https://github.com/endojs/endo/tree/master/packages/ses), a subset of JavaScript developed by [Agoric](https://agoric.com/). Among other things, SES allows us to restrict access to global JavaScript APIs and to isolate untrusted code from other parts of the application. SES does this at the cost of some performance and incompatibility with some JavaScript practices, such as modifying prototypes of intrinsic objects (e.g. the `Promise` constructor).

## Sample Snap Tutorial

There are many simple snaps available for you to learn from and begin to understand what your own snap needs. The following tutorial will walk you through a Hello World snap.

### Prerequisites

- nodejs `^14.15`
- nvm (recommended)
- git
- yarn v1
- macOS, Linux, or Windows Subsystem Linux

### Getting Flask running in your local environment

[MetaMask Flask](https://metamask.io/flask) is a separate extension for developers that provides access to additional unstable APIs. The goal of Flask is to maximize developer control, so that we can learn the full extent of what developers want to do with MetaMask and incorporate those lessons into the main MetaMask distribution. Snaps is the first feature to be released on Flask.

- Start by downloading [Flask](https://metamask.io/flask) and adding it to one of the available browsers of choice

After adding Flask as a browser extension, if you currently have another build of MetaMask installed in your browser, disable it (ensure you have your Secret Recovery Phrase backed up!).

### Serving a Snap to Your Local Environment

With Flask in your browser, it's time to plug something into it. If you don't want to download any code for the moment, check out the example snap [deployed here](https://metamask.github.io/template-snap/) and follow the instructions below under 'Interacting with the Snap'.

If you're ready to jump in and see how a Snap looks on the backend, follow the steps below!

Open up a new terminal window, and do the following:

- clone the snaps monorepo [here](https://github.com/MetaMask/snaps-skunkworks)
- `cd` into the repo, and then run `nvm use 14.15` to switch to our recommended version of Node.js
- navigate to the "Hello, World!" snap: `cd packages/example-snap`
- install [@metamask/snaps-cli](https://npmjs.com/package/@metamask/snaps-cli) package locally: `yarn add snaps-cli`
- run `yarn mm-snap serve`

Your terminal window should now be serving the example snap locally. Time to see the functionality in action!

### Interacting with the Snap

If you're serving the snap locally, open up a browser window, and navigate to `http://localhost:8080`.

You should see a simple message explaining the functionality of the snap, and two buttons. Start by clicking the `Connect` button; your Flask extension should pop up and require you to click through two notifications.

Once you've connected to Flask, smash that `Send Hello` button, and watch the snap display your "hello" message!

## Where to Go from Here

Of course, this is just the starting point, as all Hello World exercises are. There are other example snaps available in this repo, and chances are, by the time you're reading this, someone else has already begun developing something interesting that may give you further insight, as well.
