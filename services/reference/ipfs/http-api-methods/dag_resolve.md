import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# `dag_resolve`

## `/api/v0/dag/resolve`

Resolve IPLD block.

### Request

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
curl "https://ipfs.infura.io:5001/api/v0/dag/resolve?arg=<key>" \
  -X POST \
  -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
curl "https://ipfs.infura.io:5001/api/v0/dag/resolve?arg=QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy" \
  -X POST \
  -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>"
```

  </TabItem>
</Tabs>

#### Request parameters

- `arg` _[Required]_ - The IPFS object hash; the path to resolve.

### Response

On success, the call to this endpoint will return with 200 and the following body:

#### Body

```js
{
  "Cid": {
    "/": "QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy"
  },
  "RemPath": ""
}
```

#### Result fields

- `Cid` - [Content ID](https://github.com/multiformats/cid).
- `RemPath`
