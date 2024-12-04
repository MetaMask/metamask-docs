import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# `pin_update`

## `/api/v0/pin/update`

Update a recursive pin.

### Request

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
curl "https://ipfs.infura.io:5001/api/v0/pin/update?arg=<from-path>&arg=<to-path>&unpin=true" \
  -X POST \
  -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
curl "https://ipfs.infura.io:5001/api/v0/pin/update?arg=QmfQ5QAjvg4GtA3wg3adpnDJug8ktA1BxurVqBD8rtgVjM&arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn" \
  -X POST \
  -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>"
```

  </TabItem>
</Tabs>

#### Request parameters

- `arg` _\[Required]_ - Path to old object.
- `arg` _\[Required]_ - Path to a new object to be pinned.
- `unpin` _\[Optional]_ - Remove the old pin. The default is `true.`

### Response

On success, the call to this endpoint returns with 200 and the following body:

#### Body

```
{
  "Pins": [
    "string"
  ]
}
```
