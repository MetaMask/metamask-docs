# MetaMask SDK JavaScript options

The JavaScript version of the MetaMask SDK takes several options.
For example:

```javascript
const options = {
  injectProvider: false,
  communicationLayerPreference: 'webrtc',
};

const MMSDK = new MetaMaskSDK(options);
```

The following table shows the full list of options:

| Option name                    |                      Type                      | Default value | Description                                                                                                                                                                                                                                |
| ------------------------------ | :--------------------------------------------: | :-----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dappMetadata`                 | `{name: "My Dapp", url: "https://mydapp.com"}` |  `undefined`  | Only required for non-web dapps (for example, React Native and Unity).                                                                                                                                                                     |
| `injectProvider`               |                   `boolean`                    |    `true`     | Doesn't inject in NodeJS or React Native since the window object is unavailable.                                                                                                                                                           |
| `forceInjectProvider`          |                   `boolean`                    |    `false`    | Forces injection even if another provider is already present on the window object.                                                                                                                                                         |
| `forceDeleteProvider`          |                   `boolean`                    |    `false`    | Forces deletion of a provider that exists on a window.                                                                                                                                                                                     |
| `checkInstallationImmediately` |                   `boolean`                    |    `false`    | The SDK checks if MetaMask is installed when a call to `eth_requestAccounts` is made. When `true`, it checks before any call is made.                                                                                                      |
| `checkInstallationOnAllCalls`  |                   `boolean`                    |    `false`    | Normally checked when a call to `eth_requestAccounts` is made. When `true`, it checks on all calls.                                                                                                                                        |
| `shouldShimWeb3`               |                   `boolean`                    |    `true`     | Set as `true` if `window.web3` should be shimmed for legacy compatibility purposes. See [more information](../how-to/migrate-api.md#replace-windowweb3)                                                                                    |
| `preferDesktop`                |                   `boolean`                    |    `false`    | For a web dapp running on a desktop browser without a MetaMask extension, the SDK gives the option to connect with a MetaMask Mobile wallet via a QR code. When `true`, the SDK guides the user to install the MetaMask extension instead. |
| `openDeeplink`                 |        `(deeplinkUrl: string) => void`         |  `undefined`  | Platforms open deeplinks differently. For example, web: `window.open` versus React Native: `Linking.open`. This function retrieves the deeplink URL and allows developers to customize how it opens.                                       |
| `getUniversalLink`             |                 `() => string`                 |  `undefined`  | Get the universal link that is presented on the QR Code (web) and deeplinks (mobile). This makes it easier to enable users to connect with backend code.                                                                                   |
| `communicationLayerPreference` |             `"socket" or "webrtc"`             |   `socket`    | Defines the communication library that the dapp and MetaMask wallet use to communicate with each other. Waku or another similar decentralized communication layer solution coming soon.                                                    |
| `webRTCLib`                    |                  `WebRTC Lib`                  |  `undefined`  | Not installed on the SDK by default. Check the React Native section to see how to install it.                                                                                                                                              |
| `WalletConnectInstance`        |              `WalletConnect Lib`               |  `undefined`  | Another way of connecting a dapp to MetaMask. Not installed by default. Check [here](https://docs.walletconnect.com/) on how to install it.                                                                                                |
| `forceRestartWalletConnect`    |                   `boolean`                    |    `false`    | Set `forceRestartWalletConnect` to `true` to kill the previous WalletConnect session and start another one.                                                                                                                                |
| `transports`                   |           `['websocket', 'polling']`           |  `undefined`  | Used to set the preference on socket.io transports to 'use'. Check the socket.io [documentation](https://socket.io/docs/v4/) for more details.                                                                                             |
| `timer`                        |               `BackgroundTimer`                |  `undefined`  | Used by React Native apps to keep the app alive while in the background using `react-native-background-timer`                                                                                                                              |
| `enableDebug`                  |                   `boolean`                    |    `true`     | Enables/disables the sending of debugging information to the `socket.io` server. The default is `true` for the beta version of the SDK. The default is `false` in production versions.                                                     |

:::tip
If your project is a web app and `injectProvider` is `true`, then the `ethereum` object should be
available in `window.ethereum`.
:::
