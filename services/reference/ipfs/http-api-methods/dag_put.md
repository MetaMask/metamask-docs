import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# `dag_put`

## `/api/v0/dag/put`

Add a DAG node to IPFS.

### Request

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
curl "https://ipfs.infura.io:5001/api/v0/dag/put?store-codec=dag-cbor&#x26;input-codec=dag-json&#x26;pin=&#x3C;value>&#x26;hash=sha2-256" \
  -X POST \
  -u "&#x3C;API_KEY>:&#x3C;API_KEY_SECRET>" \
  -H "Content-Type: multipart/form-data" \
  -F file=@"&#x3C;file>"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
curl "https://ipfs.infura.io:5001/api/v0/dag/put" \
  -X POST \
  -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>" \
  -H "Content-Type: multipart/form-data" \
  -F file=@"/sample-result.json"
```

  </TabItem>
</Tabs>

#### Request parameters

- `store-codec` _\[Optional]_: Codec that the stored object will be encoded with. The default is `dag-cbor`.
- `input-codec` _\[Optional]_: Codec that the input object is encoded in. The default is `dag-json`.
- `pin` _\[Optional]_: Set to `true` to pin this object when adding.
- `hash` _\[Optional]_: Hash function to use. The default is `sha2-256`.

### Response

On success, the call to this endpoint will return with 200 and the following body:

#### Body

```json
{
  "Cid": {
    "/": "<cid-string>"
  }
}
```

#### Result fields

- `Cid` - [Content ID](https://github.com/multiformats/cid).
