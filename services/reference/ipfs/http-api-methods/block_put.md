import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# block_put

## /api/v0/block/put

Store input as an IPFS block.

### REQUEST

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
curl "https://ipfs.infura.io:5001/api/v0/block/put?format=v0&mhtype=sha2-256&mhlen=-1" \
  -X POST \
  -u "<API_KEY>:<API_KEY_SECRET>" \
  -H "Content-Type: multipart/form-data" \
  -F file=@"<file>"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
curl "https://ipfs.infura.io:5001/api/v0/block/put" \
  -X POST \
  -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>" \
  -H "Content-Type: multipart/form-data" \
  -F file=@"/purpink.jpeg"
```

  </TabItem>
</Tabs>

#### REQUEST PARAMS

- `file` _\[Required]_ - The path to a file to be added to IPFS.
- `format` _\[Optional]_ - Content ID format for blocks to be created with. The default is `v0`.
- `mhtype` _\[Optional]_ - Multihash hash function. The default is `sha2-256`.
- `mhlen` _\[Optional]_ - Multihash hash length. The default is `-1`.

### RESPONSE

On success, the call to this endpoint will return with 200 and the following body:

#### BODY

```json
{
  "Key": "QmaYL7E4gDTPNfLxrCEEEcNJgcHBJ55NxxTnxpDKWqMtJ3",
  "Size": 2392
}
```

#### RESULT FIELDS

- `Key` - Key of the block.
- `Size` - Integer indication size in bytes.
