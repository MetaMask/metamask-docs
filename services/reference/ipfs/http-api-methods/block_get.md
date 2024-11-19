import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# `block_get`

## `/api/v0/block/get`

Get a raw IPFS block.

### Request

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
curl "https://ipfs.infura.io:5001/api/v0/block/get?arg=<key>" \
  -X POST \
  -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
curl "https://ipfs.infura.io:5001/api/v0/block/get?arg=QmaYL7E4gDTPNfLxrCEEEcNJgcHBJ55NxxTnxpDKWqMtJ3" \
  -X POST \
  -u "PROJECT_ID:PROJECT_SECRET"
```

  </TabItem>
</Tabs>

#### Request parameters

- `arg` _\[Required]_ - The base58 multihash of an existing block to get.

### Response

On success, the call to this endpoint will return with 200 and the following body:

#### Body

```
This endpoint returns a `text/plain` response body.
```
