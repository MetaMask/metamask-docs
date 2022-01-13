# Snaps Tutorial

## What is Snaps?

Snaps are a new evolution of MetaMask's functionality. Using MetaMask Flask in conjunction with the Snaps API, developers can bring their own code to the wallet in a custom-made code laboratory. MetaMask is the first wallet to provide this openness and flexibility to developers, paving the way to scale the number of features and personalization available to the wallet and your Dapp.

Snaps allows developers to build and plug in their own APIs to MetaMask. You no longer have to rely on MetaMask to roll out features and updates. The rate of innovation, and MetaMask's flexibility, are limited only by your imagination and your capacity to build.

## MetaMask Snaps: Overview

MetaMask Snaps consists of two things: (1) a way to run untrusted JavaScript inside the MetaMask application, and (2) APIs for websites and MetaMask to communicate with individual snaps. As with MetaMask’s [Ethereum JavaScript provider API](https://docs.metamask.io/guide/ethereum-provider.html), communication occurs via JSON-RPC requests and responses.

### Current functionality

At present, snaps can make JSON-RPC requests of MetaMask, and websites can make JSON-RPC requests of MetaMask as well as snaps running inside MetaMask. In this way, snaps can expand MetaMask’s RPC API and change the behavior of the MetaMask application at runtime. Over time, MetaMask will use this to support different blockchains and other decentralized protocols, novel kinds of cryptography or crypto assets, and countless other features.

For the prototype Snaps system, snaps cannot modify the MetaMask UI, but they can extend the MetaMask RPC API and exchange arbitrary messages with websites visited by the user. Therefore, the user interface for any snap must exist entirely in the website during the prototype stage.

### Execution Environment

As stated, snaps are untrusted JavaScript programs but execute safely inside the MetaMask application. To isolate snaps from the rest of the application and to provide a “fully virtualizable” execution environment, MetaMask uses [Secure EcmaScript (SES)](https://github.com/endojs/endo/tree/master/packages/ses), a subset of JavaScript developed by [Agoric](https://agoric.com/). Among other things, SES allows us to restrict access to global JavaScript APIs and to isolate untrusted code from different parts of the application. SES does this at the cost of some performance and incompatibility with some JavaScript practices, such as modifying prototypes of intrinsic objects, e.g., the Promise constructor.

## Sample snap tutorial

There are a number of simple snaps available for you to learn from and begin to get an idea of what your own snap needs. The following tutorial will walk you through a Hello World snap.

### Prerequisites

* nodejs `^14.15`
* nvm (recommended)
* git
* yarn v1 
* macOS, Linux, or Windows Subsystem Linux
  
### Getting Flask running in your local environment

Flask, as described [here](LINK TO FLASK PAGE REQUIRED HERE), is a distribution channel for developmental, experimental, kooky stuff for MetaMask, and Snaps is the first feature to be released through it. 

* Start by downloading [Flask](LINK HERE) and adding it to Chrome
  
At this point, you should see Flask added to your browser as an extension. If you currently have another build of MetaMask installed in your browser, disable it (but make sure you have your Secret Recovery Phrase backed up!).

### Serving a snap to your local environment

Now that you have Flask in your browser, it's time to find something to plug into it. If you don't want to download any code for the moment, check out the example snap [deployed here](https://metamask.github.io/snap-template/) and follow the instructions below under 'Interacting with the Snap'.

If you're ready to jump in and see how a Snap looks on the backend, follow the steps below!

Open up a new terminal window, and do the following:

* clone the snaps monorepo [here](https://github.com/MetaMask/snaps-skunkworks)
* `cd` into the repo, and run `nvm use 14.15` to make sure you're using the right version of nodejs
* navigate to the "Hello, World!" snap: `cd packages/example-snap`
* install [@metamask/snaps-cli](https://npmjs.com/package/@metamask/snaps-cli) package locally: `yarn add snaps-cli`
* run `yarn mm-snap serve`

Your terminal window should now be serving the example Snap locally. Time to see the functionality in action!

### Interacting with the snap

If you're serving the snap locally, open up a browser window, and navigate to `http://localhost:8080`.

You should see a simple message, explaining the functionality of the snap, and two buttons. Start by clicking the `Connect` button; your Flask extension should pop up, and require you to click through two notifications.

Once you've connected to Flask, smash that `Send Hello` button, and watch that Snap say hello!

## Where to go from here

Of course this is just the starting point, as all Hello World exercises are. There are other example snaps available in this repo, and chances are, by the time you're reading this, someone else has already begun developing something interesting that may give you further insight, as well.
