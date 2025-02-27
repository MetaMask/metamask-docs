import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# `version`

## `/api/v0/pin/version`

Show IPFS version information.

### Request

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
curl "https://ipfs.infura.io:5001/api/v0/version?number=<value>&commit=<value>&repo=<value>&all=<value>" \
  -X POST \
  -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
curl "https://ipfs.infura.io:5001/api/v0/version" \
  -X POST \
  -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>"
```

  </TabItem>
</Tabs>

#### Request parameters

- `number` _[Optional]_ - Only show the version number.
- `commit` _[Optional]_ - Show the commit hash.
- `repo` _[Optional]_ - Show repo version.
- `all` _[Optional]_ - Show all version information.

### Response

On success, the call to this endpoint returns with 200 and the following body:

#### Body

```
{
  "Commit": "string",
  "Golang": "string",
  "Repo": "string",
  "System": "string",
  "Version": "string"
}
```
