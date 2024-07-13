import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# dag_resolve

## /api/v0/dag/resolve

Resolve IPLD block.

### REQUEST

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
curl "https://ipfs.infura.io:5001/api/v0/dag/resolve?arg=<key>" \
  -X POST \
  -u "<API_KEY>:<API_KEY_SECRET>"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
curl "https://ipfs.infura.io:5001/api/v0/dag/resolve?arg=QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy" \
  -X POST \
  -u "PROJECT_ID:PROJECT_SECRET"
```

  </TabItem>
</Tabs>

#### REQUEST PARAMS

- `arg` _\[Required]_ - The IPFS object hash; the path to resolve.

### RESPONSE

On success, the call to this endpoint will return with 200 and the following body:

#### BODY

```js
{
  Cid: {
      /: "QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy"
  },
  RemPath: ""
}
```

#### RESULT FIELDS

- `Cid` - [Content ID](https://github.com/multiformats/cid).
- `RemPath`
