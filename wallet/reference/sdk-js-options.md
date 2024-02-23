---
description: See the JavaScript SDK options reference.
sidebar_position: 1
tags:
  - JavaScript SDK
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# JavaScript SDK options

The [JavaScript version of MetaMask SDK](../how-to/use-sdk/javascript/index.md) takes the
following options.

### checkInstallationImmediately

<Tabs>
<TabItem value="Syntax">

```javascript
checkInstallationImmediately: <boolean>
```

</TabItem>
<TabItem value="Example">

```javascript
checkInstallationImmediately: true
```

</TabItem>
</Tabs>

Enables or disables immediately checking if MetaMask is installed on the user's browser.
If `true`, the SDK checks for installation upon page load and sends a connection request, prompting
the user to install MetaMask if it's not already installed.
If `false`, the SDK waits for the connect method to be called to check for installation.

The default is `false`.

### checkInstallationOnAllCalls

<Tabs>
<TabItem value="Syntax">

```javascript
checkInstallationOnAllCalls: <boolean>
```

</TabItem>
<TabItem value="Example">

```javascript
checkInstallationOnAllCalls: true
```

</TabItem>
</Tabs>

Enables or disables checking if MetaMask is installed on the user's browser before each RPC request.
The default is `false`.

### communicationLayerPreference

<Tabs>
<TabItem value="Syntax">

```javascript
communicationLayerPreference: <type>
```

</TabItem>
<TabItem value="Example">

```javascript
communicationLayerPreference: SOCKET
```

</TabItem>
</Tabs>

The preferred communication layer to use.
The default and only option is `SOCKET` for [Socket.IO](https://socket.io/docs/v4/).

### communicationServerUrl

<Tabs>
<TabItem value="Syntax">

```javascript
communicationServerUrl: <string>
```

</TabItem>
<TabItem value="Example">

```javascript
communicationServerUrl: "https://metamask-sdk-socket.metafi.codefi.network/"
```

</TabItem>
</Tabs>

The URL of the communication server to use.
This option is mainly used for debugging and testing the SDK.

### dappMetadata

<Tabs>
<TabItem value="Syntax">

```javascript
dappMetadata: {
    name: <string>,
    url: <string>,
    base64Icon: <string>,
}
```

</TabItem>
<TabItem value="Example">

```javascript
dappMetadata: {
    name: "My Dapp",
    url: "https://mydapp.com",
    base64Icon: "data:image/png;base64,...",
}
```

</TabItem>
</Tabs>

Metadata about the dapp using the SDK.
The metadata options are:

- `name` - Name of the dapp
- `url` - URL of the dapp
- `base64Icon` - A base64-encoded icon

:::tip important
Setting `dappMetaData` creates a clear and trustworthy user experience when connecting your dapp to
MetaMask Mobile.
MetaMask Mobile displays this metadata in the connection modal to help users identify and verify the
connection request.
:::

### defaultReadOnlyChainId

<Tabs>
<TabItem value="Syntax">

```javascript
defaultReadOnlyChainId: <number or hexadecimal string>
```

</TabItem>
<TabItem value="Example">

```javascript
defaultReadOnlyChainId: "0x1"
```

</TabItem>
</Tabs>

Enables sending [read-only RPC requests](../how-to/make-read-only-requests.md) to
this chain ID before the user connects to MetaMask.
The value is automatically updated to the chain ID used in MetaMask once connected.

### enableDebug

<Tabs>
<TabItem value="Syntax">

```javascript
enableDebug: <boolean>
```

</TabItem>
<TabItem value="Example">

```javascript
enableDebug: false
```

</TabItem>
</Tabs>

Enables or disables sending anonymous analytics to MetaMask to help improve the SDK.
The default is `true`.

### extensionOnly

<Tabs>
<TabItem value="Syntax">

```javascript
extensionOnly: <boolean>
```

</TabItem>
<TabItem value="Example">

```javascript
extensionOnly: true
```

</TabItem>
</Tabs>

Enables or disables automatically using the MetaMask browser extension if it's detected.
The default is `false`.

### infuraAPIKey

<Tabs>
<TabItem value="Syntax">

```javascript
infuraAPIKey: <string>
```

</TabItem>
<TabItem value="Example">

```javascript
infuraAPIKey: process.env.INFURA_API_KEY
```

</TabItem>
</Tabs>

The [Infura API key](https://docs.infura.io/networks/ethereum/how-to/secure-a-project/project-id) to
use for RPC requests.
Configure this option to [make read-only RPC requests from your dapp](../how-to/make-read-only-requests.md).

:::caution important
Use [Infura allowlists](https://docs.infura.io/networks/ethereum/how-to/secure-a-project/use-an-allowlist)
to protect against other people submitting requests to your API key.
You can restrict interactions to specific addresses, origins, user agents, and request methods.
We recommend using all allowlist options to maximize the security of your API key and dapp.
:::

### modals

<Tabs>
<TabItem value="Syntax">

```javascript
modals: <object>
```

</TabItem>
<TabItem value="Example">

```javascript
modals: {
    onPendingModalDisconnect: () => {
        // Custom logic for pending modal disconnect
    },
    install: (params) => {
        // Custom install modal logic
        const { link, debug, installer, terminate, connectWithExtension } = params;
        return {
            mount: (link) => { /* custom mount logic */ },
            unmount: (shouldTerminate) => { /* custom unmount logic */ },
        };
    },
    otp: ({ debug, onDisconnect }) => {
        // Custom OTP modal logic
        return {
            mount: () => { /* custom mount logic */ },
            updateOTPValue: (otpValue) => { /* custom OTP value update logic */ },
            unmount: () => { /* custom unmount logic */ },
        };
    },
}
```

</TabItem>
</Tabs>

An object that allows you to [customize the logic and UI of the displayed modals](../how-to/display/custom-modals.md).
This is useful if your dapp requires a custom way to handle connection and reconnection scenarios.

### openDeeplink

<Tabs>
<TabItem value="Syntax">

```javascript
openDeeplink: <function>
```

</TabItem>
<TabItem value="Example">

```javascript
openDeeplink: (link: string) => {
    if (canOpenLink) {
        Linking.openURL(link);
    }
}
```

</TabItem>
</Tabs>

A function that is called to open a deeplink to the MetaMask Mobile app.

### preferDesktop

<Tabs>
<TabItem value="Syntax">

```javascript
preferDesktop: <boolean>
```

</TabItem>
<TabItem value="Example">

```javascript
preferDesktop: true
```

</TabItem>
</Tabs>

Enables or disables preferring the MetaMask browser extension over MetaMask Mobile.
The default is `false`.

### readonlyRPCMap

<Tabs>
<TabItem value="Syntax">

```javascript
readonlyRPCMap: <map>
```

</TabItem>
<TabItem value="Example">

```javascript
readonlyRPCMap: {
    "0x539": "http://localhost:8545",
}
```

</TabItem>
</Tabs>

A map of RPC URLs to use for [read-only RPC requests](../how-to/make-read-only-requests.md).

### shouldShimWeb3

<Tabs>
<TabItem value="Syntax">

```javascript
shouldShimWeb3: <boolean>
```

</TabItem>
<TabItem value="Example">

```javascript
shouldShimWeb3: false
```

</TabItem>
</Tabs>

Enables or disables shimming the `window.web3` object with the Ethereum provider returned by the SDK
(useful for compatibility with older browsers).
The default is `true`.

### timer

<Tabs>
<TabItem value="Example">

```javascript
timer: BackgroundTimer
```

</TabItem>
</Tabs>

Used by React Native dapps to keep the dapp alive while using
[`react-native-background-timer`](https://github.com/ocetnik/react-native-background-timer).

### transports

<Tabs>
<TabItem value="Syntax">

```javascript
transports: <array of strings>
```

</TabItem>
<TabItem value="Example">

```javascript
transports: ["websocket", "polling"]
```

</TabItem>
</Tabs>

Sets the preference on [Socket.IO](https://socket.io/docs/v4/) transports.

### ui

<Tabs>
<TabItem value="Syntax">

```javascript
ui: {
    installer: <function>,
    confirm: <function>,
}
```

</TabItem>
</Tabs>

Options for customizing the SDK UI.

### useDeeplink

<Tabs>
<TabItem value="Syntax">

```javascript
useDeeplink: <boolean>
```

</TabItem>
<TabItem value="Example">

```javascript
useDeeplink: true
```

</TabItem>
</Tabs>

Enables or disables using deeplinks to connect with MetaMask Mobile.
If `false`, the SDK uses universal links instead.
The default is `false`.

### wakeLockType

<Tabs>
<TabItem value="Syntax">

```javascript
wakeLockType: <type>
```

</TabItem>
<TabItem value="Example">

```javascript
wakeLockType: Temporary
```

</TabItem>
</Tabs>

The type of wake lock to use when the SDK is running in the background.
Options are `Disabled`, `Temporary`, and `UntilResponse`.
