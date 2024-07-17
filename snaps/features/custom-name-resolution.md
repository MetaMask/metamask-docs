---
description: Resolve names to addresses and vice versa.
sidebar_position: 3
sidebar_custom_props:
  flask_only: true
---

# Custom name resolution

:::flaskOnly
:::

You can implement custom domain resolution and reverse resolution using the following steps.

## Steps

### 1. Request permission to provide name resolution

Request the [`endowment:name-lookup`](../reference/permissions.md#endowmentname-lookup) permission.

For example, to resolve Ethereum Mainnet domains, add the following to your Snap's manifest file:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:name-lookup": {
    "chains": ["eip155:1"]
  }
}
```

### 2. Implement custom name resolution

Expose an [`onNameLookup`](../reference/entry-points.md#onnamelookup) entry point, which receives a
`chainId` and either a `domain` or an `address`.
The following example implements a very basic resolution from Unstoppable Domains domain names to
Ethereum addresses in `onNameLookup`:

```typescript title="index.ts"
import type { OnNameLookupHandler } from "@metamask/snaps-types"

const UNSTOPPABLE_API_KEY = "xxx"

export const onNameLookup: OnNameLookupHandler = async (request) => {
  const { chainId, domain } = request

  if (domain && chainId === "eip155:1") {
    const response = await fetch(
      `https://api.unstoppabledomains.com/resolve/domains/${domain}`,
      {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${UNSTOPPABLE_API_KEY}`,
        },
      }
    )
    const data = await response.json()
    const resolvedAddress = data.records["crypto.ETH.address"]
    if (address) {
      return {
        resolvedAddresses: [
          { resolvedAddress, protocol: "Unstoppable Domains" },
        ],
      }
    }
  }

  return null
}
```

## Example

See the [`@metamask/name-lookup-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/name-lookup)
package for a full example of implementing custom name resolution.
