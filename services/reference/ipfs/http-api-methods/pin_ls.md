import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# pin_ls

## /api/v0/pin/ls

Lists objects pinned to local storage.

### REQUEST

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
curl "https://ipfs.infura.io:5001/api/v0/pin/ls?arg=<ipfs-path>&type=all&quiet=<value>&stream=<value>" \
    -X POST \
    -u "<API_KEY>:<API_KEY_SECRET>"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
curl "https://ipfs.infura.io:5001/api/v0/pin/ls?arg=QmfQ5QAjvg4GtA3wg3adpnDJug8ktA1BxurVqBD8rtgVjM" \
    -X POST \
    -u "<API_KEY>:<API_KEY_SECRET>"
```

  </TabItem>
</Tabs>

#### REQUEST PARAMS

- `arg` _[Optional]_ - Path to object(s) to be listed.
- `type` _[Optional]_ - The type of pinned keys to list. Can be `direct`, `indirect`, `recursive`, or `all`. The default is `all`.
- `quiet` _[Optional]_ - Write just hashes of objects.
- `stream` _[Optional]_ - Enable streaming of pins as they are discovered.

### RESPONSE

On success, the call to this endpoint returns with 200 and the following body:

#### BODY

```
{
  "PinLsList": {
    "Keys": {
      "<string>": {
        "Type": "string"
      }
    }
  },
  "PinLsObject": {
    "Cid": "string",
    "Type": "string"
  }
}
```
