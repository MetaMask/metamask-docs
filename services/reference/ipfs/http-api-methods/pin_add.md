import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# pin_add

## /api/v0/pin/add

Pin objects to local storage.

### REQUEST

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
curl "https://ipfs.infura.io:5001/api/v0/pin/add?arg=<ipfs-path>&recursive=true&progress=<value>" \
  -X POST \
  -u "<API_KEY>:<API_KEY_SECRET>"
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

#### REQUEST PARAMS

- `arg` _\[Required]_ - Path to object(s) to be pinned.
- `recursive` _\[Optional]_ - Recursively pin the object linked to by the specified object(s). The default is `true`.
- `progress` _\[Optional]_ - Show progress.

### RESPONSE

On success, the call to this endpoint returns with 200 and the following body:

#### BODY

```json
{
  "Pins": ["QmSTkR1kkqMuGEeBS49dxVJjgHRMH6cUYa7D3tcHDQ3ea3"]
}
```

#### RESULT FIELDS

- `Pins` - An array of Pin hashes.
