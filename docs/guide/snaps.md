# Introduction

::: tip Developer Preview Software
Snaps is pre-release software. To try Snaps, install [MetaMask Flask](https://metamask.io/flask).
:::

If you have questions about anything related to Snaps, you're always welcome to ask our team and community on [GitHub discussions](https://github.com/MetaMask/snaps-skunkworks/discussions).

## What is MetaMask Snaps?

Snaps is a system that allows anyone to safely extend the capabilities of MetaMask. A _snap_ is a program that we run in an isolated environment that can customize the wallet experience. 

For example, a snap can add new APIs to MetaMask, add support for different blockchain protocols, or modify existing functionality using internal APIs. Snaps is a new way to create web3 end user experiences, by modifying MetaMask in ways that were impossible before.

Snaps are run in an isolated environment where they have access to a limited set of capabilities, determined by the permissions they were granted by the user during installation. As with MetaMask’s [Ethereum Provider RPC API](./rpc-api.html), snaps communicate with MetaMask using JSON-RPC.

New RPC methods have been added to our Ethereum Provider JSON-RPC API as well, which are documented as part of the [Snaps RPC API](./snaps-rpc-api.html).
These new methods are what allow snaps to modify the functionality of MetaMask.
In addition, they also allow websites to install and communicate with individual snaps.

### Execution environment

Snaps are untrusted JavaScript programs but execute safely inside the MetaMask application. To isolate snaps from the rest of the application and to provide a “fully virtualizable” execution environment, MetaMask uses [Secure EcmaScript (SES)](https://github.com/endojs/endo/tree/master/packages/ses), a subset of JavaScript developed by [Agoric](https://agoric.com/).

Among other things, SES allows us to restrict access to global JavaScript APIs and to isolate untrusted code from other parts of the application. SES does this at the cost of some performance and incompatibility with some JavaScript practices, such as modifying prototypes of intrinsic objects (e.g. the `Promise` constructor).

## Snaps features
At present, snaps can; 
- create new RPC methods for websites to call
- call many of the same RPC methods that websites can call
- access a limited set of snap-exclusive RPC methods. 

At the moment, snaps cannot modify the MetaMask UI directly. If a snap needs a UI, that UI must exist entirely on the website(s) that communicate with the snap(s).

For detailed integration specifications, see the [Snaps RPC API documentation](./snaps-rpc-api.html). Over time, MetaMask will expose more internal functionality as RPC methods—granting more capabilities to snaps.

### Current functionality
Lorem ipsum

### Coming soon
Lorem ipsum

### Propose a feature
Lorem ipsum

## Getting started

### Prerequisites
- [Node.js 16.0](https://nodejs.org/) or later.

### Install MetaMask Flask

To interact with (your) Snaps, you will need to install [MetaMask Flask](https://metamask.io/flask/), a canary distribution for developers that provides access to upcoming features. 

Make sure to install Flask in a new browser profile or disable any existing installed versions of MetaMask. Running multiple instances of MetaMask in the same browser profile will break dapp interactions.

### Quick start using our template
Get started using our template built with TypeScript and React. Clone the repository via the command line or [via GitHub](https://github.com/MetaMask/template-snap-monorepo/generate).
```shell
git clone git@github.com:MetaMask/template-snap-monorepo.git    
```


`cd` into the cloned repository and setup the development environment: 
```shell
yarn install && yarn start
```

### Get started by editing `index.js` in the `snap` folder
Lorem ipsum add your APIs and features to MetaMask.


## Next up
If you're interested in building your own snap, next up is the [Snaps development guide](./snaps-development-guide.html).

You can also look at some of the existing snaps being developed right now. Each one is fully functional and open-source:
  - [BitcoinSnap for Bitcoin support](https://github.com/KeystoneHQ/btcsnap)
  - [Filsnap for Filecoin support](https://github.com/Chainsafe/filsnap/)
  - [Password Manager Snap](https://github.com/ritave/snap-passwordManager)

## GitHub discussion board
If you have questions, proposals, or need help—join our [discussion board](https://github.com/MetaMask/snaps-skunkworks/discussions).
