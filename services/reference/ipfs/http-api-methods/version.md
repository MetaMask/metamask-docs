import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# version

## /api/v0/pin/version

Show IPFS version information.

### REQUEST

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
curl "https://ipfs.infura.io:5001/api/v0/version?number=<value>&commit=<value>&repo=<value>&all=<value>" \
  -X POST \
  -u "<API_KEY>:<API_KEY_SECRET>"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
curl "https://ipfs.infura.io:5001/api/v0/version" \
  -X POST \
  -u "PROJECT_ID:PROJECT_SECRET"
```

  </TabItem>
</Tabs>

#### REQUEST PARAMS

- `number` _[Optional]_ - Only show the version number.
- `commit` _[Optional]_ - Show the commit hash.
- `repo` _[Optional]_ - Show repo version.
- `all` _[Optional]_ - Show all version information.

### RESPONSE

On success, the call to this endpoint returns with 200 and the following body:

#### BODY

```
{
  "Commit": "string",
  "Golang": "string",
  "Repo": "string",
  "System": "string",
  "Version": "string"
}
```
