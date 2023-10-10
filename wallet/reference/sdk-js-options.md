---
description: MetaMask JavaScript SDK options
sidebar_position: 1
---

# JavaScript SDK options

The [JavaScript version of MetaMask SDK](../how-to/connect/set-up-sdk/javascript/index.md) takes the
following options.

### checkInstallationImmediately

<!--tabs-->

# Syntax

```javascript
checkInstallationImmediately: <boolean>
```

# Example

```javascript
checkInstallationImmediately: true
```

<!--/tabs-->

Enables or disables checking if MetaMask is installed on the user's browser immediately.
If `true`, upon page load the SDK checks for installation and sends a connection request, prompting
the user to install MetaMask if it's not already installed.
If `false`, the SDK waits for the connect method to be called to check for installation.

The default is `false`.

### checkInstallationOnAllCalls

<!--tabs-->

# Syntax

```javascript
checkInstallationImmediately: <boolean>
```

# Example

```javascript
checkInstallationImmediately: true
```

<!--/tabs-->

Enables or disables checking if MetaMask is installed on the user's browser before each RPC request.
The default is `false`.

### communicationLayerPreference

<!--tabs-->

# Syntax

```javascript
communicationLayerPreference: <type>
```

# Example

```javascript
communicationLayerPreference: SOCKET
```

<!--/tabs-->

The preferred communication layer to use for the SDK.
The default is `SOCKET`.

### communicationServerUrl

<!--tabs-->

# Syntax

```javascript
communicationServerUrl: <string>
```

# Example

```javascript
communicationServerUrl: 'https://metamask-sdk-socket.metafi.codefi.network/'
```

<!--/tabs-->

The URL of the communication server to use for the SDK.

### dappMetadata

<!--tabs-->

# Syntax

```javascript
dappMetadata: {
  name: <string>,
  url: <string>,
  base64Icon: <string> // base64-encoded icon
}
```

# Example

```javascript
dappMetadata: {
  name: 'My Dapp',
  url: 'https://mydapp.com',
  base64Icon: 'data:image/png;base64,...',
}
```

<!--/tabs-->

Metadata about the dapp using the SDK.

:::caution important
Setting `dappMetaData` is important to create a clear and trustworthy user experience when
connecting your dapp to MetaMask Mobile.
MetaMask Mobile displays this metadata in the connection modal to help users identify and verify the
connection request.
:::

### defaultReadOnlyChainId

<!--tabs-->

# Syntax

```javascript
defaultReadOnlyChainId: <number or hexadecimal string>
```

# Example

```javascript
defaultReadOnlyChainId: '0x1'
```

<!--/tabs-->

Enables sending read-only RPC requests before the user has connected to the wallet.
The value is automatically updated to the wallet chain ID once connected.

### enableDebug

<!--tabs-->

# Syntax

```javascript
enableDebug: <boolean>
```

# Example

```javascript
enableDebug: false
```

<!--/tabs-->

Enables or disables sending anonymous analytics to MetaMask to help improve the SDK.
The default is `true`.

### extensionOnly

<!--tabs-->

# Syntax

```javascript
extensionOnly: <boolean>
```

# Example

```javascript
extensionOnly: true
```

<!--/tabs-->

Enables or disables directly using the MetaMask browser extension if it's detected.
The default is `false`.

### forceDeleteProvider

<!--tabs-->

# Syntax

```javascript
forceDeleteProvider: <boolean>
```

# Example

```javascript
forceDeleteProvider: true
```

<!--/tabs-->

Enables or disables force deleting the provider from the global `window` object.
The default is `false`.

### forceInjectProvider

<!--tabs-->

# Syntax

```javascript
forceInjectProvider: <boolean>
```

# Example

```javascript
forceInjectProvider: true
```

<!--/tabs-->

Enables or disables force injecting the provider into the global `window` object.
The default is `false`.

### infuraAPIKey

<!--tabs-->

# Syntax

```javascript
infuraAPIKey: <string>
```

# Example

```javascript
infuraAPIKey: process.env.INFURA_API_KEY
```

<!--/tabs-->

The [Infura API key](https://docs.infura.io/networks/ethereum/how-to/secure-a-project/project-id) to
use for RPC requests.
Configure this option to [use Infura APIs from your dapp](../how-to/use-3rd-party-integrations/js-infura-api.md).

:::tip
To prevent committing your Infura API key, we recommend adding your key to a
[`.env` file](https://docs.infura.io/tutorials/developer-tools/javascript-dotenv) and using the
`process.env` global variable when specifying this option.
:::

### injectProvider

<!--tabs-->

# Syntax

```javascript
injectProvider: <boolean>
```

# Example

```javascript
injectProvider: false
```

<!--/tabs-->

Enables or disables injecting the provider into the global `window` object.
The default is `true`.

:::tip
If your project is a web dapp and `injectProvider` is `true`, then the `ethereum` object is
available in `window.ethereum`.
:::

### logging

<!--tabs-->

# Syntax

```javascript
logging: {
  developerMode: <boolean>,
  sdk: <boolean>,
}
```

# Example

```javascript
logging: {
  developerMode: false,
  sdk: false,
}
```

<!--/tabs-->

Options for customizing the logging behavior of the SDK.

### modals

<!--tabs-->

# Syntax

```javascript
modals: <object>
```

# Example

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

<!--/tabs-->

An object that allows you to customize the logic and UI of the displayed modals.
This is useful if your dapp requires a custom way to handle connection/reconnection scenarios.

### openDeeplink

<!--tabs-->

# Syntax

```javascript
openDeeplink: <function>
```

# Example

```javascript
openDeeplink: (link: string) => {
  if (canOpenLink) {
    Linking.openURL(link);
  }
},
```

<!--/tabs-->

A function that is called to open a deeplink to the MetaMask Mobile app.

### preferDesktop

<!--tabs-->

# Syntax

```javascript
preferDesktop: <boolean>
```

# Example

```javascript
preferDesktop: true
```

<!--/tabs-->

Enables or disables preferring the MetaMask browser extension over MetaMask Mobile.

### readonlyRPCMap

<!--tabs-->

# Syntax

```javascript
readonlyRPCMap: <map>
```

# Example

```javascript
readonlyRPCMap: {
  '0x539': 'http://localhost:8545',
}
```

<!--/tabs-->

A map of RPC URLs to use for [read-only JSON-RPC requests](../how-to/use-3rd-party-integrations/js-infura-api.md).

### shouldShimWeb3

<!--tabs-->

# Syntax

```javascript
shouldShimWeb3: <boolean>
```

# Example

```javascript
shouldShimWeb3: false
```

<!--/tabs-->

Enables or disables shimming the `window.web3` object with the provider returned by the SDK (useful
for compatibility with older browsers).
The default is `true`.

### storage

<!--tabs-->

# Syntax

```javascript
storage: {
  enabled: <boolean>,
  debug: <boolean>,
  duration: <number>,
  storageManager: <storage manager> // Allows user to customize the storage manager
}
```

# Example

```javascript
storage: {
  enabled: true,
  debug: true,
  duration: 10,
  storageManager: StorageManager
}
```

<!--/tabs-->

Options for customizing the storage manager used by the SDK.

### timer

<!--tabs-->

# Example

```javascript
timer: BackgroundTimer
```

<!--/tabs-->

Used by React Native dapps to keep the dapp alive while using
[`react-native-background-timer`](https://github.com/ocetnik/react-native-background-timer).

### transports

<!--tabs-->

# Syntax

```javascript
transports: <array of strings>
```

# Example

```javascript
transports: ['websocket', 'polling']
```

<!--/tabs-->

Sets the preference on [socket.io](https://socket.io/docs/v4/) transports.

### ui

<!--tabs-->

# Syntax

```javascript
ui: {
  installer: <function>,
  confirm: <function>,
}
```

# Example

```javascript
ui: {
  installer: ,
  confirm: ,
}
```

<!--/tabs-->

Options for customizing the SDK UI.

### useDeeplink

<!--tabs-->

# Syntax

```javascript
useDeeplink: <boolean>
```

# Example

```javascript
useDeeplink: true
```

<!--/tabs-->

Enables or disables using deeplinks to connect with MetaMask Mobile.
If `false`, the SDK uses universal links instead.
The default is `false`.

### wakeLockType

<!--tabs-->

# Syntax

```javascript
wakeLockType: <type>
```

# Example

```javascript
wakeLockType: Temporary
```

<!--/tabs-->

The type of wake lock to use when the SDK is running in the background.
Options are `Disabled`, `Temporary`, and `UntilResponse`.
