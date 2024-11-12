import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# `pin_add`

## `/api/v0/pin/add`

Pin objects to local storage.

### Request

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
curl "https://ipfs.infura.io:5001/api/v0/pin/add?arg=<ipfs-path>&recursive=true&progress=<value>" \
  -X POST \
  -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
curl "https://ipfs.infura.io:5001/api/v0/pin/add?arg=QmfQ5QAjvg4GtA3wg3adpnDJug8ktA1BxurVqBD8rtgVjM" \
  -X POST \
  -u "PROJECT_ID:PROJECT_SECRET"
```

  </TabItem>
</Tabs>

#### Request parameters

- `arg` _\[Required]_ - Path to objects to be pinned.
- `recursive` _\[Optional]_ - Recursively pin the object linked to by the specified objects. The default is `true`.
- `progress` _\[Optional]_ - Show progress.

### Response

On success, the call to this endpoint returns with 200 and the following body:

#### Body

```json
{
  "Pins": ["QmSTkR1kkqMuGEeBS49dxVJjgHRMH6cUYa7D3tcHDQ3ea3"]
}
```

#### Result fields

- `Pins` - An array of Pin hashes.
