import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# add

## /api/v0/add

Add a file or directory to IPFS.

### REQUEST

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```bash
curl "https://ipfs.infura.io:5001/api/v0/add?recursive=false&quiet=<value>&quieter=<value>&silent=<value>&progress=<value>&trickle=<value>&only-hash=<value>&wrap-with-directory=<value>&hidden=<value>&chunker=<value>&pin=true&raw-leaves=<value>&nocopy=<value>&fscache=<value>&cid-version=0&hash=sha2-256" \
    -X POST \
    -u "<API_KEY>:<API_KEY_SECRET>" \
    -H "Content-Type: multipart/form-data" \
    -F file=@"<file>"
```

  </TabItem>
  <TabItem value="Example" label="Example" >

```bash
curl "https://ipfs.infura.io:5001/api/v0/add?pin=false" \
    -X POST \
    -u "PROJECT_ID:PROJECT_SECRET" \
    -H "Content-Type: multipart/form-data" \
    -F file=@"/sample-result.json"
```

  </TabItem>
</Tabs>

#### REQUEST PARAMS

- `file` _\[Required]_ - The path to a file to be added to IPFS.
- `quiet` _\[Optional]_ - Write minimal output.
- `quieter` _\[Optional]_ - Write only final hash.
- `silent` _\[Optional]_ - Write no output.
- `progress` _\[Optional]_ - Stream progress data.
- `trickle` _\[Optional]_ - Use trickle-dag format for dag `generation`.
- `only-hash` _\[Optional]_ - Only chunk and hash - do not write to disk.
- `wrap-with-directory` _\[Optional]_ - Wrap files with a directory object.
- `pin` _\[Optional]_ - Pin this object when adding. The default is `true`.
- `raw-leaves` _\[Optional]_ - Use raw blocks for leaf nodes. (Experimental)
- `nocopy` _\[Optional]_ - Add the file using filestore. (Experimental)
- `fscache` _\[Optional]_ - Check the filestore for pre-existing blocks. (Experimental)
- `cid-version` _\[Optional]_: Cid version. Non-zero value changes the default of `raw-leaves` to `true`. The default is `0`. (Experimental)
- `hash` _\[Optional]_: Hash function to use. Sets `cid-version` to `1` if used. The default is `sha2-256`. (Experimental)

### RESPONSE

On success, the call to this endpoint will return with 200 and the following body:

#### BODY

```json
{
  "Name": "sample-result.json",
  "Hash": "QmSTkR1kkqMuGEeBS49dxVJjgHRMH6cUYa7D3tcHDQ3ea3",
  "Size": "2120"
}
```

#### RESULT FIELDS

- `Name` - Name of the object.
- `Hash` - Hash of the uploaded object.
- `Size` - Integer indication size in bytes.
