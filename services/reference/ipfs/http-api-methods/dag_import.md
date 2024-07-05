import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# dag_import

## /api/v0/dag/import

Imports all blocks present in supplied [Content Address aRchive (CAR) files](https://ipld.io/specs/transport/car/). The command recursively pins the root specified in the `.car` file headers, unless `pin-roots` is set to `false`.

:::warning

You can't pin multiple DAG roots using this endpoint. For example, if supplying multiple `.car` files in the same request. If you try, you'll receive the `only one dag root can be pinned per request` error.

:::

### REQUEST

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
curl "https://ipfs.infura.io:5001/api/v0/dag/import?pin-roots=false&#x26;allow-big-block=false" \
  -X POST \
  -u "PROJECT_ID:PROJECT_SECRET" \
  -H "Content-Type: multipart/form-data" \
  -F file=@"<file>"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
curl "https://ipfs.infura.io:5001/api/v0/dag/import?pin-roots=true&silent=<value>&stats=<value>&allow-big-block=false" \
  -X POST \
  -u "PROJECT_ID:PROJECT_SECRET" \
  -H "Content-Type: multipart/form-data" \
  -F file=@"/sample.car"
```

  </TabItem>
</Tabs>

#### REQUEST PARAMS

- `file` : _string_ - path to the `.car` file.
- `pin-roots:` _boolean_ - pin the root listed in the .car headers after importing. The default is `true`. Only one DAG root can be pinned per request.
- `silent` : _boolean -_ no output.
- `stats`: _boolean -_ output statistics.
- `allow-big-block`: _boolean_ - disable the block size check and allow the creation of blocks bigger than 1 MiB. The default is `false`. Bigger blocks won't be transferable over the standard bitswap.

### RESPONSE

On success, the call to this endpoint returns a `200` response with the following body:

#### BODY

```json
{
  "Root": {
    "Cid": {
      "/": "<cid-string>"
    },
    "PinErrorMsg": "<string>"
  },
  "Stats": {
    "BlockBytesCount": "<uint64>",
    "BlockCount": "<uint64>"
  }
}
```
