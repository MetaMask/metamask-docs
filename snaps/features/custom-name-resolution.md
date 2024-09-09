---
description: Resolve names to addresses and vice versa.
sidebar_position: 3
---

# Custom name resolution

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

If you're only targeting specific TLDs or schemes, you can use the `matchers` property to reduce
overhead by specifying the TLDs and schemes you support. To target specific TLDs (for example, `my-domain.crypto`),
use the `tlds` property. To target specific schemes (for example, `farcaster:my-user`), use the `schemes` property.
At least one of these properties must be specified if `matchers` is specified.

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:name-lookup": {
    "chains": ["eip155:1"],
    "matchers": { "tlds": ["crypto"], "schemes": ["farcaster"] }
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
          { resolvedAddress, protocol: "Unstoppable Domains", domainName: domain },
        ],
      }
    }
  }

  return null
}
```

:::note
The response from the `onNameLookup` handler includes a `domainName` property. This can
be used to do fuzzy matching on domain names, by returning the domain that was resolved rather than
the one that was passed in.
:::

## Example

See the [`@metamask/name-lookup-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/name-lookup)
package for a full example of implementing custom name resolution.
