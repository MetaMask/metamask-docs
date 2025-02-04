import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# `block_stat`

## `/api/v0/block/stat`

Print information of a raw IPFS block.

### Request

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
curl "https://ipfs.infura.io:5001/api/v0/block/stat?arg=<key>" \
  -X POST \
  -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
curl "https://ipfs.infura.io:5001/api/v0/block/stat?arg=QmfQ5QAjvg4GtA3wg3adpnDJug8ktA1BxurVqBD8rtgVjM" \
  -X POST \
  -u "PROJECT_ID:PROJECT_SECRET"
```

  </TabItem>
</Tabs>

#### Request parameters

- `arg` _\[Required]_ - The base58 multihash of an existing block to stat.

### Response

On success, the call to this endpoint will return with 200 and the following body:

#### Body

```js
{
  "Key": "QmfQ5QAjvg4GtA3wg3adpnDJug8ktA1BxurVqBD8rtgVjM",
  "Size": 18
}
```

#### Result fields

- `Key` - The base58 multihash string of the block.
- `Size` - An integer representing the size in bytes.
