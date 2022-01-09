# Snaps Tutorial

Snaps is a plugin system for MetaMask. That's right, plugins for a plugin. Before you say, "Wow that's meta," think again—it's right there in the name.

Snaps is a way to make MetaMask more extensible for developers, giving them the opportunity to build specifically what they need for their dapp. MetaMask is the first wallet to provide the flexibility of extensibility to developers, paving the way to scale the number of features and personalization to your wallet and your dapp.

Snaps allows developers to build and plug in their own APIs to MetaMask. No longer do you have to rely on MetaMask to roll out features and updates. The rate of innovation, and MetaMask's flexibility, are limited only by your imagination and your capacity to build.

## Overview

Broadly speaking, MetaMask Snaps consists of two things: (1) a way to safely execute untrusted JavaScript inside the MetaMask application, and (2) APIs for websites and MetaMask to communicate with individual snaps. As with MetaMask’s [Ethereum JavaScript provider API](https://docs.metamask.io/guide/ethereum-provider.html), communication occurs via JSON-RPC requests and responses.

### Current Functionality

At present, snaps can make JSON-RPC requests of MetaMask, and websites can make JSON-RPC requests of MetaMask and snaps running inside MetaMask. In this way, snaps can expand MetaMask’s RPC API and change the behavior of the MetaMask application at runtime. Over time, MetaMask will use this to support different blockchains and other decentralized protocols, novel kinds of cryptography, novel kinds of crypto assets, and countless other features.

For the prototype Snaps system, snaps cannot modify the MetaMask UI (with [one exception]()), but can extend the MetaMask RPC API, and exchange arbitrary messages with websites visited by the user. Therefore, the user interface for any snap must exist entirely in the website during the prototype stage.

### Execution Environment

As stated, snaps are untrusted JavaScript programs, but execute safely inside the MetaMask application. To isolate snaps from the rest of the application, and to provide a “fully virtualizable” execution environment, MetaMask uses [Secure EcmaScript (SES)](https://github.com/endojs/endo/tree/master/packages/ses), a subset of JavaScript developed by [Agoric](https://agoric.com/). Among other things, SES allows us to restrict access to global JavaScript APIs and to isolate untrusted code from other parts of the application. SES does this at the cost of some performance, and incompatibility with some JavaScript practices, such as modifying prototypes of intrinsic objects, e.g. the Promise constructor.

## Sample Snap Tutorial

There are a number of simple snaps available for you to learn from and begin to get an idea of what your own snap needs. The following tutorial will walk you through a Hello World snap.

### Prerequisites

- Linux, macOS, or Windows
- A Chromium browser
- git
- Node.js `^12.11.0`
- [nvm](https://github.com/nvm-sh/nvm) (recommended)
- yarn v1

### Getting Flask Running in Your Local Environment

[Flask](https://chrome.google.com/webstore/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk) is a distribution channel for under-development, experimental MetaMask features, and Snaps is the first feature to be released through Flask.
In this tutorial, we're going to build the latest version of Flask and load it as an extension into the Chromium-based browser of your choice.

> Flask will also be available on Firefox in the near future.

Before continuing, please disable any existing MetaMask installations in your current browser profile, and [install Flask from the Chrome Web Store](https://chrome.google.com/webstore/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk).
After installing, proceed through the onboarding flow.
As always with web3 development, whatever seed phrase you use, we **strongly recommend** that you can afford to lose whatever assets it controls.

### Serving a Snap to Your Local Environment

Now that you have Flask in your browser, it's time to install your first snap!

- Create a repository for your snap from the MetaMask [snap template repository](https://github.com/MetaMask/snap-template)
- `git clone` your repository to your device
- `cd` into the repo, and run `nvm use` to make sure you're using a compatible version of Node.js
- Run `yarn install`
- Run `yarn build`
- Run `yarn serve`

You should now have one terminal window open, serving the example snap. Time to see the functionality in action!

### Interacting with the Snap

Open up a browser window, and navigate to `http://localhost:8080`.

You should see a simple message, explaining the functionality of the snap, and two buttons. Start by clicking the `Connect` button; your Flask extension should pop up, and require you to click through two notifications.

Once you've connected to Flask, smash that `Send Hello` button, and watch that Snap say hello!

## Where to Go from Here

Of course this is just the starting point, as all "Hello, world!" exercises are. There are other [example snaps available](https://github.com/MetaMask/snaps-skunkworks/tree/main/packages/snap-examples), and chances are, by the time you're reading this, someone else has already begun developing something interesting that may give you further insight, as well.
