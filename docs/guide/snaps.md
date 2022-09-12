# MetaMask Snaps

::: tip Snaps is pre-release software.
To try Snaps, install [MetaMask Flask](https://metamask.io/flask).
:::

## Extend the functionality of MetaMask

Snaps is a system that allows anyone to safely extend the capabilities of MetaMask. A _snap_ is a program that we run in an isolated environment that can customize the wallet experience. 

For example, a snap can add new APIs to MetaMask, add support for different blockchain protocols, or modify existing functionality using internal APIs. Snaps is a new way to create web3 end user experiences, by modifying MetaMask in ways that were impossible before.

### JSON-RPC API

Snaps are run in an isolated environment where they have access to a limited set of capabilities, determined by the permissions they were granted by the user during installation. 
As with MetaMask’s [Ethereum Provider RPC API](./rpc-api.html), snaps communicate with MetaMask using JSON-RPC.

New RPC methods have been added to our JSON-RPC API as well, which are documented as part of the [Snaps JSON RPC API](./snaps-rpc-api.html). 
These new methods are what allow snaps to modify the functionality of MetaMask. 
In addition, they also allow websites to install and communicate with individual snaps.

### Execution environment

Snaps are untrusted JavaScript programs but execute safely inside the MetaMask application. To isolate snaps from the rest of the application and to provide a “fully virtualizable” execution environment, MetaMask uses [Secure EcmaScript (SES)](https://github.com/endojs/endo/tree/master/packages/ses), a subset of JavaScript developed by [Agoric](https://agoric.com/).

Among other things, SES allows us to restrict access to global JavaScript APIs and to isolate untrusted code from other parts of the application. SES does this at the cost of some performance and incompatibility with some JavaScript practices, such as modifying prototypes of intrinsic objects (e.g. the `Promise` constructor).

## Features
At present, snaps can (1) create new RPC methods for websites to call, (2) call many of the same RPC methods that websites can call, (3) access a limited set of snap-exclusive RPC methods. 

For detailed integration specifications, see the [Snaps RPC API documentation](./snaps-rpc-api.html). Over time, MetaMask will expose more internal functionality as RPC methods—granting more capabilities to snaps.

### Currently

<img src="../assets/flask.png" alt="Live in MetaMask Flask" style="width: 171px; position: relative; top: 20px;" />

#### Display a custom confirmation screen in MetaMask • [Documentation](./snaps-rpc-api.html)
Modernipsum dolor sit amet caravaggisti post-painterly abstraction, relational art neue slowenische kunst romanticism tonalism die brücke, futurism neoclassicism stuckism installation art. 

<img src="../assets/flask.png" alt="Live in MetaMask Flask" style="width: 171px; position: relative; top: 20px;" />

#### Notify users in MetaMask
Modernipsum dolor sit amet caravaggisti post-painterly abstraction, relational art neue slowenische kunst romanticism tonalism die brücke, futurism neoclassicism stuckism installation art. 

<img src="../assets/flask.png" alt="Live in MetaMask Flask" style="width: 171px; position: relative;top: 20px;" />

#### Store and manage data on your disk
Modernipsum dolor sit amet caravaggisti post-painterly abstraction, relational art neue slowenische kunst romanticism tonalism die brücke, futurism neoclassicism stuckism installation art. 

<img src="../assets/flask.png" alt="Live in MetaMask Flask" style="width: 171px; position: relative;top: 20px;" />

#### Control BIP-44 accounts and assets
Modernipsum dolor sit amet caravaggisti post-painterly abstraction, relational art neue slowenische kunst romanticism tonalism die brücke, futurism neoclassicism stuckism installation art.

<img src="../assets/flask.png" alt="Live in MetaMask Flask" style="width: 171px; position: relative;top: 20px;" />

#### Control BIP-32 accounts and assets
Modernipsum dolor sit amet caravaggisti post-painterly abstraction, relational art neue slowenische kunst romanticism tonalism die brücke, futurism neoclassicism stuckism installation art.

### Coming soon

<img src="../assets/soon.png" alt="Coming soon" style="width: 106px; position: relative; top: 20px;" />

#### Populate MetaMask's confirmation screens with transaction insights
Modernipsum dolor sit amet caravaggisti post-painterly abstraction, relational art neue slowenische kunst romanticism tonalism die brücke, futurism neoclassicism stuckism installation art.

<img src="../assets/soon.png" alt="Coming soon" style="width: 106px; position: relative; top: 20px;" />

#### Custom UI in MetaMask using a defined set of components

Modernipsum dolor sit amet caravaggisti post-painterly abstraction, relational art neue slowenische kunst romanticism tonalism die brücke, futurism neoclassicism stuckism installation art.


### Propose a feature
Create a feature proposal with your ideas in our [GitHub discussion board](https://github.com/MetaMask/snaps-skunkworks/discussions).



## Getting started

Let's extend the functionality of MetaMask and build the wallet experience of the future. 

### Prerequisites
- Up-to-date Chromium or Firefox browser
- [Node.js 16.0](https://nodejs.org/) (we recommend using [nvm](https://github.com/nvm-sh/nvm))

### Quick start using our template
Get started with Snaps using [our template](https://github.com/MetaMask/template-snap-monorepo) built with TypeScript and React. Create the repository [via GitHub](https://github.com/MetaMask/template-snap-monorepo/generate) and [clone it](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) down to your local machine using e.g. the command line.

To ensure the correct Node version, `cd` into your cloned repository and run:
```shell
nvm use
```

Setup the development environment: 
```shell
yarn install && yarn start
```

You should now be serving both (1) the front-end and (2) the snap locally. Time to check it out in action at `http://localhost:3000/`.

Next step is to [install MetaMask Flask](https://metamask.io/flask/).

### Install MetaMask Flask

To interact with (your) Snaps, you will need to install [MetaMask Flask](https://metamask.io/flask/), a canary distribution for developers that provides access to upcoming features. 

Make sure to install Flask in a new browser profile or disable any existing installed versions of MetaMask. Running multiple instances of MetaMask in the same browser profile will break dapp interactions.

### Connecting to the snap
Once you have [MetaMask Flask](https://metamask.io/flask/) installed (in a new browser profile *without normal MetaMask*) and the [development environment](./snaps.html#quick-start-using-our-template) running, you should be able to **connect** and **install** the snap.

1. Click the **Connect-button** and the MetaMask Flask extension should pop up and require you to approve the template's permissions.

2. Once connected, try out the **Send message-button** to display a custom message within a confirmation screen in MetaMask.

And voilà, you've successfully connected and interacted with your snap.

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

Currently, snaps cannot modify the MetaMask UI directly. If a snap needs a UI, that UI must exist entirely on the website(s) that communicate with the snap(s).

Discover the [features](#features) you can utilize when building your snap, see what's [coming soon](#coming-soon), and read detailed documentation about our [JSON-RPC API](./snaps-rpc-api.html).

## Next up
If you're interested in building your own snap, next up is the [Snaps development guide](./snaps-development-guide.html).

You can also look at some of the existing snaps being developed right now. Each one is fully functional and open-source:
  - [BitcoinSnap for Bitcoin support](https://github.com/KeystoneHQ/btcsnap)
  - [Filsnap for Filecoin support](https://github.com/Chainsafe/filsnap/)
  - [Password Manager Snap](https://github.com/ritave/snap-passwordManager)

## GitHub discussion board

If you have questions, proposals, or need help with anything related to Snaps, you're always welcome to ask our team and community on [GitHub discussions](https://github.com/MetaMask/snaps-skunkworks/discussions).
