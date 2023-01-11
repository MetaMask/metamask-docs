---
title: React Native
---

# Use MetaMask SDK with React Native

You can import the MetaMask SDK into your React Native app to enable your users to easily connect
with their MetaMask Mobile wallet.
The SDK will automatically deeplink your users into their MetaMask Mobile wallet and once users
accept the connection, they will be redirected back automatically to your app.
This will happen for all actions that need user approval.

## Install the SDK

### 1. Install [rn-nodeify](https://github.com/tradle/rn-nodeify)

```bash
yarn add --dev rn-nodeify
or
npm i --dev rn-nodeify
```

### 2. Install rn-nodeify libraries

```bash
yarn add react-native-crypto
yarn add react-native-randombytes
yarn add crypto
yarn add process
yarn add stream
yarn add events
```

### 3. Insert rn-nodeify post install script into `package.json` -> `"scripts"`

```bash
"postinstall": "rn-nodeify --install 'crypto,process,stream,events' --hack"
```

### 4. Import rn-nodeify shim.js

rn-nodeify will create a shim.js file in your project root directory. You should import it in the root file of your application.

```bash
import './shim'
```

### 5. Install react-native-background-timer

```bash
yarn add react-native-background-timer

cd ios && pod install && cd ..
```

### 6. Install the MetaMask SDK

```bash
yarn add @metamask/sdk
```

### 7. Run postinstall

Make sure you run the postinstall script after everything is installed

```bash
yarn postinstall
```

### 8. Install pods

Finally, install the necessary pods that came with the libraries.

```bash
cd ios && pod install && cd ..
```

Now you should be able to use the MetaMask SDK!

## Use the SDK

```javascript
import MetaMaskSDK from '@metamask/sdk';
import { Linking } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const MMSDK = new MetaMaskSDK({
  openDeeplink: (link) => {
    Linking.openURL(link); // Use React Native Linking method or your favourite way of opening deeplinks
  },
  timer: BackgroundTimer, // To keep the app alive once it goes to background
  dappMetadata: {
    name: 'My App', // The name of your application
    url: 'https://myapp.com', // The url of your website
  },
});

const ethereum = MMSDK.getProvider();

const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
```

For a list of possible `options` check [here](/metamask-sdk-js/metamask-sdk-js-options.html)

It's now possible to use [EthersJS](https://docs.ethers.io/v5/getting-started/) with your React Native app!

```javascript
const provider = new ethers.providers.Web3Provider(ethereum);

// Get the balance of an account (by address or ENS name, if supported by network)
const balance = await provider.getBalance(ethereum.selectedAddress);

// Often you need to format the output to something more user-friendly,
// such as in ether (instead of wei)
const balanceInETH = ethers.utils.formatEther(balance);
// '0.182826475815887608'
```

:::tip
You should always call `eth_requestAccounts` first--that is what prompts the deeplinking into MetaMask Mobile for connection!

For other possible methods, check [the Ethereum Provider API](/ethereum-provider.html)
:::

That's it!

NOTE: We are working on creating a `metamask-react-native-sdk` package that will install all of this automatically which will make the installation much easier for React Native apps.

## Examples

View the [React Native app](https://recordit.co/FClppLgWzT) recording.

View the [React Native example](https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/downloads/reactNativeApp_v0.1.0.zip).
Install the example using `yarn setup` and run the example using `yarn ios` or `yarn android`.
