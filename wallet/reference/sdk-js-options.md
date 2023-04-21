---
description: MetaMask JavaScript SDK options
---

# MetaMask JavaScript SDK options

The JavaScript version of [MetaMask SDK](../how-to/use-sdk/index.md) takes several options.
For example, you can specify options as follows:

```javascript
const options = {
  injectProvider: false,
  communicationLayerPreference: 'webrtc',
};

const MMSDK = new MetaMaskSDK(options);
```

The following table shows the full list of options:

| Option name                    |                      Type                      | Default value | Description                                                                                                                                                                                                                                |
|--------------------------------|:----------------------------------------------:|:-------------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dappMetadata`                 | `{name: "My Dapp", url: "https://mydapp.com"}` |  `undefined`  | Only required for non-web dapps (for example, React Native and Unity).                                                                                                                                                                     |
| `injectProvider`               |                   `boolean`                    |    `true`     | Doesn't inject in Node.js or React Native since the window object is unavailable.                                                                                                                                                          |
| `forceInjectProvider`          |                   `boolean`                    |    `false`    | Forces injection even if another provider is already present on the window object.                                                                                                                                                         |
| `forceDeleteProvider`          |                   `boolean`                    |    `false`    | Forces deletion of a provider that exists on a window.                                                                                                                                                                                     |
| `checkInstallationImmediately` |                   `boolean`                    |    `false`    | The SDK checks if MetaMask is installed when a call to `eth_requestAccounts` is made. When `true`, it checks before any call is made.                                                                                                      |
| `checkInstallationOnAllCalls`  |                   `boolean`                    |    `false`    | Normally checked when a call to `eth_requestAccounts` is made. When `true`, it checks on all calls.                                                                                                                                        |
| `shouldShimWeb3`               |                   `boolean`                    |    `true`     | Set as `true` if `window.web3` should be shimmed for [legacy compatibility purposes](../how-to/migrate-api.md#replace-windowweb3).                                                                                                         |
| `preferDesktop`                |                   `boolean`                    |    `false`    | For a web dapp running on a desktop browser without a MetaMask extension, the SDK gives the option to connect with a MetaMask Mobile wallet via a QR code. When `true`, the SDK guides the user to install the MetaMask extension instead. |
| `openDeeplink`                 |        `(deeplinkUrl: string) => void`         |  `undefined`  | Platforms open deeplinks differently. For example, web: `window.open` versus React Native: `Linking.open`. This function retrieves the deeplink URL and allows developers to customize how it opens.                                       |
| `getUniversalLink`             |                 `() => string`                 |  `undefined`  | Get the universal link that is presented on the QR Code (web) and deeplinks (mobile). This makes it easier to enable users to connect with backend code.                                                                                   |
| `communicationLayerPreference` |             `"socket" or "webrtc"`             |   `socket`    | Defines the communication library that the dapp and MetaMask wallet use to communicate with each other. Waku or another similar decentralized communication layer solution coming soon.                                                    |
| `webRTCLib`                    |                  `WebRTC Lib`                  |  `undefined`  | Not installed on the SDK by default.                                                                                                                                                                                                       |
| `WalletConnectInstance`        |              `WalletConnect Lib`               |  `undefined`  | Connect a dapp to MetaMask using [WalletConnect](https://docs.walletconnect.com/). Not installed by default.                                                                                                                               |
| `forceRestartWalletConnect`    |                   `boolean`                    |    `false`    | Set `forceRestartWalletConnect` to `true` to kill the previous WalletConnect session and start another one.                                                                                                                                |
| `transports`                   |           `['websocket', 'polling']`           |  `undefined`  | Used to set the preference on [socket.io](https://socket.io/docs/v4/) transports to `use`.                                                                                                                                                 |
| `timer`                        |               `BackgroundTimer`                |  `undefined`  | Used by React Native dapps to keep the dapp alive while using `react-native-background-timer` in the background                                                                                                                            |
| `enableDebug`                  |                   `boolean`                    |    `true`     | Enables/disables the sending of debugging information to the socket.io server. The default is `true` for the beta version of the SDK. The default is `false` in production versions.                                                       |

:::tip
If your project is a web dapp and `injectProvider` is `true`, then the `ethereum` object should be
available in `window.ethereum`.
:::
