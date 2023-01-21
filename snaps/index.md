---
title: Introduction
---

# Extend the functionality of MetaMask using Snaps

:::tip Snaps is pre-release software.
To try Snaps, install [MetaMask Flask](https://metamask.io/flask).
:::

Snaps is a system that allows anyone to safely extend the capabilities of MetaMask.
A _snap_ is a program that we run in an isolated environment that can customize the wallet experience.

For example, a snap can add new APIs to MetaMask, add support for different blockchain protocols, or
modify existing functionality using internal APIs.
Snaps is a new way to create web3 end user experiences, by modifying MetaMask in ways that were
impossible before.

### JSON-RPC API

Snaps are run in an isolated environment where they have access to a limited set of capabilities,
determined by the permissions they were granted by the user during installation.
As with MetaMask’s [Ethereum Provider RPC API](../api-sdk/reference/provider-api.md), snaps
communicate with MetaMask using JSON-RPC.

New JSON-RPC methods for snaps have been added to our JSON-RPC API, which are documented as part of
the [Snaps JSON-RPC API](./snaps-rpc-api.html).
These new methods are what allow snaps to modify the functionality of MetaMask.
In addition, they also allow websites to install and communicate with individual snaps.

### Execution environment

Snaps are untrusted JavaScript programs that execute safely inside the MetaMask application.
To isolate snaps from the rest of the application and to provide a “fully virtualizable” execution
environment, MetaMask uses [Secure EcmaScript (SES)](https://github.com/endojs/endo/tree/master/packages/ses),
a subset of JavaScript developed by [Agoric](https://agoric.com/).

Among other things, SES allows us to restrict access to global JavaScript APIs and to isolate
untrusted code from other parts of the application. SES does this at the cost of some performance
and incompatibility with some JavaScript practices, such as modifying prototypes of intrinsic
objects (e.g. the `Promise` constructor).

## Features

At present, snaps can (1) create new RPC methods for websites to call, (2) call many of the same RPC
methods that websites can call, and (3) access a limited set of snap-exclusive RPC methods.

#### Display a custom confirmation screen in MetaMask &bull; [Learn more](./snaps-rpc-api.html#snap-confirm)

Show a MetaMask popup with custom text and buttons to approve or reject an action.
This can be used to create requests, confirmations, and opt-in flows for a snap.

#### Notify users in MetaMask &bull; [Learn more](./snaps-rpc-api.html#snap-notify)

MetaMask Flask introduces a generic notifications interface that can be used by any snap with the
notifications permission.
A short notification text can be triggered by a snap for actionable or time-sensitive information.

#### Store and manage data on your device &bull; [Learn more](./snaps-rpc-api.html#snap-managestate)

Store, update, and retrieve data securely, with encryption by default.

#### Control non-EVM accounts and assets in MetaMask &bull; [Learn more](./snaps-rpc-api.html#snap-getbip44entropy)

Derive BIP-32 and BIP-44 key pairs based on the Secret Recovery Phrase without exposing it.
With the power to manage keys, you can build snaps to support a variety of blockchain protocols.

#### Populate MetaMask's pre-transaction window with custom transaction insights

Bring your insights, anti-phishing, and security solutions to the MetaMask UI with the transaction
insights API.

#### Custom UI in MetaMask using a defined set of components

Display custom UI within MetaMask using a set of pre-defined components, including Markdown, form
controls, and images.
This custom UI can include actionable controls for dynamic interfaces that respond to user input.

#### Schedule actions with cron jobs

Perform actions that run periodically at fixed times, dates, or intervals.

### Propose a feature

Create a feature proposal with your ideas in our
[GitHub discussion board](https://github.com/MetaMask/snaps-skunkworks/discussions).

## Next up

If you're interested in building your own snap, next up is the
[Snaps development guide](./snaps-development-guide.html).

You can also look at some of the existing snaps being developed right now.
Each one is fully functional and open-source:

- [StarkNet](https://github.com/ConsenSys/starknet-snap)
- [FilSnap for Filecoin](https://github.com/Chainsafe/filsnap/)
- [Password Manager Snap](https://github.com/ritave/snap-passwordManager)

## GitHub discussion board

If you have questions, proposals, or need help with anything related to Snaps, you're always welcome
to ask our team and community on [GitHub discussions](https://github.com/MetaMask/snaps-skunkworks/discussions).
