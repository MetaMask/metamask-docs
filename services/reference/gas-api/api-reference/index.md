---
description: Reference content for the Gas API.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# API reference

This section provides reference information for the various Gas REST APIs.
Use the APIs to:

- [Get EIP-1559 gas prices.](./gasprices-type2.md)
- [Get the base fee history (in Gwei).](./basefeehistory.md)
- [Get the base fee percentile (in Gwei).](./basefeepercentile.md)
- [Get the busy threshold for a network.](./busythreshold.md)

## Supported API request formats

You can call the Gas APIs in two ways:

- **Using the API key only** - Add your [API key](../../../../developer-tools/dashboard/get-started/create-api)
    as a path option.
- **Using the API key and API key secret** - Use basic authentication and specify the API key
    and [API key secret](../../../../developer-tools/dashboard/how-to/secure-an-api/api-key-secret/).

<Tabs>
  <TabItem value="API key only" label="Use an API key only" default>

```bash
curl -X "GET" "https://gas.api.infura.io/v3/<API_KEY>/networks/1/suggestedGasFees"
```

  </TabItem>
  <TabItem value="API key and API key secret" label="Use an API key and API key secret" >

  ```bash
curl -X "GET" -u <API_KEY>:<API_KEY_SECRET> "https://gas.api.infura.io/networks/1/suggestedGasFees"
```
 
  </TabItem>
</Tabs>
