# Snaps Tutorial

## What is Snaps?

In short: Snaps is a plugin system for MetaMask. That's right, plugins for a plugin. Before you say, "Wow that's meta," think again--it's right there in the name.

Snaps is a way to make MetaMask more extensible for developers, giving them the opportunity to build specifically what they need for their Dapp. MetaMask is the first wallet to provide the flexibility of extensibility to developers, paving the way to scale the number of features and personalization to your wallet and your Dapp.

Snaps allows developers to build and plug in their own APIs to MetaMask. No longer do you have to rely on MetaMask to roll out features and updates. The rate of innovation, and MetaMask's flexibility, are limited only by your imagination and your capacity to build. 

## MetaMask Snaps: Overview

Broadly speaking, MetaMask Snaps consists of two things: (1) a way to run untrusted JavaScript inside the MetaMask application, and (2) APIs for websites and MetaMask to communicate with individual snaps. As with MetaMask’s [Ethereum JavaScript provider API](https://docs.metamask.io/guide/ethereum-provider.html), communication occurs via JSON-RPC requests and responses.

### Current functionality

At present, snaps can make JSON-RPC requests of MetaMask, and websites can make JSON-RPC requests of MetaMask and snaps running inside MetaMask. In this way, snaps can expand MetaMask’s RPC API and change the behavior of the MetaMask application at runtime. Over time, MetaMask will use this to support different blockchains and other decentralized protocols, novel kinds of cryptography, novel kinds of crypto assets, and a countless number of other features.

For the prototype Snaps system, snaps cannot modify the MetaMask UI, but can extend the MetaMask RPC API, and exchange arbitrary messages with websites visited by the user. Therefore, the user interface for any snap must exist entirely in the website during the prototype stage.

### Execution Environment

As stated, snaps are untrusted JavaScript programs, but execute safely inside the MetaMask application. To isolate snaps from the rest of the application, and to provide a “fully virtualizable” execution environment, MetaMask uses [Secure EcmaScript (SES)](https://github.com/endojs/endo/tree/master/packages/ses), a subset of JavaScript developed by [Agoric](https://agoric.com/). Among other things, SES allows us to restrict access to global JavaScript APIs and to isolate untrusted code from other parts of the application. SES does this at the cost of some performance, and incompatibility with some JavaScript practices, such as modifying prototypes of intrinsic objects, e.g. the Promise constructor.

## Sample snap tutorial

There are a number of simple snaps available for you to learn from and begin to get an idea of what your own snap needs. The following tutorial will walk you through a Hello World snap.

### Prerequisites

* nodejs `^12.11.0`
* nvm (recommended)
* git
* yarn v1
* macOS, Linux, or Windows Subsystem Linux
  
### Getting Flask running in your local environment

Flask, as described [here](LINK TO FLASK PAGE REQUIRED HERE), is a distribution channel for under development, experimental, kooky stuff for MetaMask, and Snaps is the first feature to be released through Flask. Essentially what we're going to do here is build the latest version of Flask and load it as an extension into the Chromium-based browser of your choice. (Note: the following instructions assume usage of Chrome)

* clone the latest version of Flask from [this](https://github.com/MetaMask/metamask-extension/tree/snaps) repo
* `cd` into the repo, and execute `yarn setup` and then `yarn start`
* in Chrome, click on the plugins puzzle piece, and then 'Manage Extensions'
* make sure 'Developer Mode' is enabled on the far right, then click 'Load unpacked' on the far left
* navigate to your Flask repo, and then `./dist/chrome` and click 'Select Folder'
  
At this point, you should see Flask added to your browser as an extension. If you currently have another build of MetaMask installed in your browser, it's probably best to disable the extension (but make sure you have your Secret Recovery Phrase backed up!)

### Serving a snap to your local environment

Now that you have Flask in your browser, it's time to find something to plug into it.

The terminal window you used to get Flask running is hopefully still running Flask, so open up a new Terminal window, and do the following:

* clone the snaps monorepo [here](https://github.com/MetaMask/snaps-skunkworks)
* `cd` into the repo, and run `nvm use` to make sure you're using the right version of nodejs
* run `yarn setup`
* navigate to the `snaps-cli` package: `cd packages/snaps-cli`
* run `yarn build` and `yarn link`
* navigate back to the monorepo root directory: `cd ../..`
* navigate to the "Hello, World!" snap: `cd packages/snap-examples/examples/hello-snaps`
* run `mm-snap build` and then `mm-snap serve`

You should now have two terminal windows open, one running Flask, and the other one serving the Hello Snap. Time to see the functionality in action!

### Interacting with the snap

Open up a browser window, and navigate to `http://localhost:8081`.

You should see a simple message, explaining the functionality of the snap, and two buttons. Start by clicking the `Connect` button; your Flask extension should pop up, and require you to click through two notifications.

Once you've connected to Flask, smash that `Send Hello` button, and watch that Snap say hello!

## Where to go from here

Of course this is just the starting point, as all Hello World exercises are. There are other example snaps available in this repo, and chances are, by the time you're reading this, someone else has already begun developing something interesting that may give you further insight, as well.
