tab---
description: Configuration options reference for MetaMask SDK.
keywords: [SDK, configure, configuration, option, options, dapp]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# SDK options

MetaMask SDK takes the following configuration options.

### `checkInstallationImmediately`

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

### `checkInstallationOnAllCalls`

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

### `communicationServerUrl`

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

### `dappMetadata`

<Tabs>
<TabItem value="Syntax">

```javascript
dappMetadata: {
  name: <string>,
  url: <string>,
  iconUrl: <string>,
}
```

</TabItem>
<TabItem value="Example">

```javascript
dappMetadata: {
  name: "My Dapp",
  url: "https://mydapp.com",
  iconUrl: "https://mydapp.com/icon.png",
}
```

</TabItem>
</Tabs>

Metadata about the dapp using the SDK.
The metadata options are:

- `name` - Name of the dapp
- `url` - URL of the dapp
- `iconUrl` - URL of the dapp's icon

:::tip important
Setting `dappMetaData` creates a clear and trustworthy user experience when connecting your dapp to the
MetaMask mobile app.
MetaMask displays this metadata in the connection modal to help users identify and verify the
connection request.
:::

### `enableAnalytics`

<Tabs>
<TabItem value="Syntax">

```javascript
enableAnalytics: <boolean>
```

</TabItem>
<TabItem value="Example">

```javascript
enableAnalytics: true
```

</TabItem>
</Tabs>

Enables or disables sending anonymous analytics to MetaMask to help improve the SDK.
The default is `true`.

### `extensionOnly`

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
The default is `true`.

### `infuraAPIKey`

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

The [Infura API key](/developer-tools/dashboard/get-started/create-api) to
use for RPC requests.
Configure this option to make read-only RPC requests from your dapp.

:::caution important
Use [Infura allowlists](/developer-tools/dashboard/how-to/secure-an-api/use-an-allowlist)
to protect against other people submitting requests to your API key.
You can restrict interactions to specific addresses, origins, user agents, and request methods.
We recommend using all allowlist options to maximize the security of your API key and dapp.
:::

### `headless`

<Tabs>
<TabItem value="Syntax">

```javascript
headless: <boolean>
```

</TabItem>
<TabItem value="Example">

```javascript
headless: true
```

</TabItem>
</Tabs>

Enables or disables headless mode.
Setting this to `true` allows you to display custom modals.
The default is `false`.

### `openDeeplink`

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

A function that is called to open a deeplink to the MetaMask mobile app.

### `readonlyRPCMap`

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

A map of RPC URLs to use for read-only RPC requests.

### `shouldShimWeb3`

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
