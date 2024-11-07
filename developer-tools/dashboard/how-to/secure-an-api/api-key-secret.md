---
description: Authenticate all requests to Infura with an API key secret.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# API key secret

For enhanced security, you can require an API key secret for all requests to Infura. The API key
secret serves as a password accompanying the API key (which serves as a username). This two-factor
approach strengthens the authentication process, ensuring that only requests from authorized sources
are accepted.

## When to use an API key secret

Use an API key secret if your dapp includes server-side components. Storing and using the API key
secret only on the server side prevents exposure to client-side risks, such as malicious actors
gaining access through browser inspection tools or network monitoring.

If your dapp operates solely on the client side without a server, use only the API key.
The API key is exposed in client-side code, so you should secure it using [allowlists](use-an-allowlist.md).

:::tip
For customers on the Developer tier or higher, Infura supports [overriding your allowlist](use-an-allowlist.md#override-your-allowlist-settings)
when you specify an API key secret. This allows you to apply the principle of least privilege on the
client side while allowing unrestricted access on the server side.
:::

## Enable the API key secret for requests

In the API key's **Settings** tab, select **Require API Key secret for all requests**.

<div class="left-align-container">
  <div class="img-large">
    <img
      src={require("../../../images/security-page.png").default}
    />
  </div>
</div>

## Call APIs using an API key secret

<Tabs>
  <TabItem value="HTTPS" label="HTTPS" default>

```bash
curl --user :<YOUR-API-KEY-SECRET> \
  https://mainnet.infura.io/v3/<YOUR-API-KEY> \
  -d '{"jsonrpc": "2.0", "method": "eth_blockNumber", "params": [], "id": 1}'
```

  </TabItem>
  <TabItem value="WebSocket" label="WebSocket" >

```bash
wscat -c wss://mainnet.infura.io/ws/v3/<YOUR-API-KEY> --auth ":<YOUR-API-KEY-SECRET>"
> {"jsonrpc": "2.0", "method": "eth_blockNumber", "params": [], "id": 1}
```

  </TabItem>
</Tabs>
