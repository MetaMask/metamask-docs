import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# block_get

## /api/v0/block/get

Get a raw IPFS block.

### REQUEST

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
curl "https://ipfs.infura.io:5001/api/v0/block/get?arg=<key>" \
    -X POST \
    -u "<API_KEY>:<API_KEY_SECRET>"
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


#### REQUEST PARAMS

- `arg` _\[Required]_ - The base58 multihash of an existing block to get.

### RESPONSE

On success, the call to this endpoint will return with 200 and the following body:

#### BODY

```
This endpoint returns a `text/plain` response body.
```
