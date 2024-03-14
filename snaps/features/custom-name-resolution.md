---
description: Resolve names to addresses and vice versa.
sidebar_position: 6
sidebar_custom_props:
  flask_only: true
---

# Custom name resolution

The Snaps platform allows developers to implement custom domain resolution and reverse resolution.
The steps to implement this are:

1. Request [permission to provide name resolution](../reference/permissions.md#endowmentname-lookup).
2. Implement an [`onNameLookup` entry point](../reference/entry-points.md#onnamelookup).

## Request permission to provide name resolution

Like all other permissions and endowments, the permission to provide name resolution must be declared in the Snap manifest.
The permission is called `endowment:name-lookup`. It takes some [optional parameters](../reference/permissions.md#endowmentname-lookup) which help reduce its scope.

As an example, to resolve Ethereum mainnet domains, add the following to the Snap's manifest:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:name-lookup": {
    "chains": ["eip155:1"]
  }
}
```

## Implement custom name resolution

To implement custom name resolution, your Snap must export an `onNameLookup` entry point. This entry point receives a `chainId`, and either a `domain` or an `address`.
The example below implements a very basic resolution from Unstoppable Domains domain names to Ethereum addresses in `onNameLookup`:

```typescript title="snap/src/index.ts"
import type { OnNameLookupHandler } from '@metamask/snaps-types';

const UNSTOPPABLE_API_KEY = 'xxx';

export const onNameLookup: OnNameLookupHandler = async (request) => {
  const { chainId, domain } = request;

  if (domain && chainId === 'eip155:1') {
    const response = await fetch(`https://api.unstoppabledomains.com/resolve/domains/${domain}`, {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${UNSTOPPABLE_API_KEY}`
      },
    });
    const data = await response.json();
    const resolvedAddress = data.records['crypto.ETH.address'];
    if (address) {
      return {
        resolvedAddresses: [{ resolvedAddress, protocol: 'Unstoppable Domains' }],
      };
    }
  }

  return null;
};
```

## Example

See the [`@metamask/name-lookup-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/name-lookup)
package for a full example of implementing custom name resolution.
