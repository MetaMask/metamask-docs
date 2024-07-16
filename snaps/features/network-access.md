---
description: Access the internet using the fetch function.
sidebar_position: 8
---

# Network access

You can access the internet from a Snap using the global `fetch` API.

## Steps

### 1. Request permission to access the internet

Request the [`endowment:network-access`](../reference/permissions.md#endowmentnetwork-access) permission,
which exposes the global `fetch` API to the Snaps execution environment.
Add the following to your Snap's manifest file:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:network-access": {}
}
```

### 2. Use the `fetch` function

You can now use the `fetch` function to access the internet.
The following example fetches a JSON file from the provided URL.

```ts title="index.ts"
async function getJson(url: string) {
  const response = await fetch(url)
  return await response.json()
}
```

:::info Same-origin policy and CORS
`fetch` requests in a Snap are bound by the browser's
[same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#cross-origin_network_access).
Since Snap code is executed in an iframe with the `sandbox` property, the browser sends an `Origin`
header with the value `null` with outgoing requests.
For the Snap to be able to read the response, the server must send an
[`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) CORS header
with the value `*` or `null` in the response.
Otherwise, you might need to
[set up a proxy](https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141#43881141).
:::

:::caution
`XMLHttpRequest` isn't available in Snaps, and you should replace it with `fetch`.
If your dependencies use `XMLHttpRequest`, you can
[patch it away](../how-to/debug-a-snap/common-issues.md#patch-the-use-of-xmlhttprequest).
:::

## Example

See the [`@metamask/network-access-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/network-access)
package for a full example of accessing the internet from a Snap.
This example exposes a [custom JSON-RPC API](../learn/about-snaps/apis.md#custom-json-rpc-apis) for
dapps to call the `fetch` function from a Snap.
