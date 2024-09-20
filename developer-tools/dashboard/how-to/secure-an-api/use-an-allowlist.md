---
description: Use an allowlist to restrict access to your API key.
---

# Allowlists

Allowlists protect your API key from undesirable activity by restricting access to specific
addresses, HTTP headers `User-Agent` and `Origin`, and API request methods.

For example, if your dapp operates solely on the client side, your API key could be exposed to client-side
risks, where malicious actors could access it through browser inspection tools or network monitoring.

:::tip
Infura supports [overriding your allowlist](#override-your-allowlist-settings) settings
when you include an [API key secret](api-key-secret.md) in requests. This allows you to apply the principle of
least privilege on the client side while allowing unrestricted access on the server side.
:::

Add the restriction details in the **ALLOWLISTS** section of your API key's **Settings** tab.

<div class="left-align-container">
  <div class="img-medium">
    <img
      src={require("../../../images/allowlist.png").default}
    />
  </div>
</div>

#### Allowlist behavior

- If an API key has no allowlists, all requests are accepted.
- As soon as an API key has an allowlist definition, all requests must pass it.
- Each API key has a maximum of 30 allowlist entries per type.
- Each allowlist type is "AND"ed together.
- Multiple entries of the same type are "OR"ed.

## Contract addresses

If your application only queries data from specific Ethereum smart contracts or addresses, add those addresses to the **CONTRACT ADDRESSES** allowlist.

Any requests which query addresses that are not in the allowlist are rejected.

The following RPC methods take an Ethereum address parameter and are compatible with this type of allowlisting.

- `eth_call`
- `eth_estimateGas`
- `eth_getLogs`
- `eth_getBalance`
- `eth_getCode`
- `eth_getStorageAt`
- `eth_getTransactionCount`

#### Example request

To allow a specific Ethereum address, click **ADD** and input it into the **CONTRACT ADDRESSES** allowlist.

<div class="left-align-container">
  <div class="img-medium">
    <img
      src={require("../../../images/address-allowlist.png").default}
    />
  </div>
</div>

Test with a method from the list.

```bash
curl https://mainnet.infura.io/v3/<YOUR-API-KEY> \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{"jsonrpc": "2.0", "method": "eth_getBalance", "params": ["0xfe05a3e72235c9f92fd9f2282f41a8154d6d342b", "latest"], "id": 1}'
```

Result:

```bash
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x0"
}
```

## User agents

To limit access to your application to specific user agents, add them to the **USER AGENTS** allowlist.

:::info

Find out more about the HTTP Header [User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent).

:::

When you add a User-Agent to an allowlist, any API requests originating from other platforms are rejected.

:::info

The **USER AGENTS** allowlist uses partial string matching. If the allowlisted string is present in the
request's full User-Agent, it is registered as a match.

:::

#### Example request

For example, to allow requests from Android phones alone, select **ADD** and input `Android` into
the **USER AGENTS** allowlist.

<div class="left-align-container">
  <div class="img-medium">
    <img
      src={require("../../../images/user-agents.png").default}
    />
  </div>
</div>

Test with a simple call from a desktop terminal.

```bash
curl https://mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "eth_accounts", "params": [], "id": 1}'
```

Result:

```bash
{
  "jsonrpc": "2.0",
  "error": {
    "code": -32002,
    "message": "rejected due to project ID settings"
  }
}
```

## Origins

To limit access to your application to specific URLs, add them to the **ORIGINS** allowlist.

:::info

Find out more about the HTTP Header [Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin).

:::

When you add an origin to an allowlist, any API requests originating from other origins are rejected.

Origin allowlists support wildcard subdomain patterns.

For example, allowlist entry `https://*.example.com` matches `https://your-app.example.com` ,
`https://our-app.example.com`, and `https://their-app.example.com`, etc.

The origin scheme (HTTPS in the example above) is optional. However, if you include it, it must match.

:::info

An entry with _only_ a scheme allows requests coming from that scheme alone.

:::

#### Example request

To limit requests to your hosted web3 application, click **ADD** and input `mydapp.example.com` into the **ORIGINS** allowlist.

Any requests that do not include `Origin: mydapp.example.com` are rejected.

## API request method

To limit the methods allowed, add them to the **API REQUEST METHOD** allowlist.

If the list is not empty, any method calls not specified in the list are rejected.

Use the dropdown list to select a method.

<div class="left-align-container">
  <div class="img-medium">
    <img
      src={require("../../../images/api-request-method.png").default}
    />
  </div>
</div>

## Override your allowlist settings

:::note For customers on the Developer tier or higher only
This functionality is only available to customers on the Developer tier or higher. You'll need to
[upgrade your plan](../upgrade-your-plan.md) if you're currently on the free Core tier.
:::

The **OVERIDE ALLOWLIST** switch lets you overide your allowlist settings when a request includes an
[API key secret](api-key-secret.md). This means requests will be accepted even if an IP address or
URL isn't on your allowlist, provided they include both the API key and the API key secret.

<div class="left-align-container">
  <div class="img-medium">
    <img
      src={require("../../../images/allowlist-toggle.png").default}
    />
  </div>
</div>

This feature provides the following benefits:

- **Principle of least privilege on the client side** - On the client side of your dapp, you may wish
  to limit the actions possible with your API key to only those necessary for the application's
  functionality. Allowlists ensure the API key is used solely for authorized locations, smart contract
  addresses, or methods.

- **No restrictions server side** - On the server side, where the API key secret can be stored
  securely, you might need to carry out a broader range of actions without the constraints of
  allowlists. Using the API key secret allows you to circumvent these restrictions, giving your
  server-side application unrestricted use of the API key.

## Best practices

- Ensure the API key secret is not exposed publicly, and include it in your requests.
- Use all allowlist options wherever possible.
- Create a new API key for each application. This allows you to allowlist the contract addresses relevant to that application.
- Avoid committing your project keys to a repo by using a package like [dotenv](https://www.npmjs.com/package/dotenv).

:::info

If your dapp runs on the client side only, your API key will be exposed within client-side code. Consider
[creating a server component to secure your keys](https://thegraph.com/docs/en/cookbook/how-to-secure-api-keys-using-nextjs-server-components/).

:::
