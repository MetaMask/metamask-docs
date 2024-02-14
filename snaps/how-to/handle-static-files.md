---
description: Include and retrieve static files in the Snap bundle.
sidebar_position: 11
---

# Handle static files

The Snaps platform provides a static file API that is useful to load Wasm modules, ZK circuits, or anything else that needs to be lazily loaded.

To handle static files in your Snap bundle, you have to:

1. Specify them in the Snap's manifest
2. Use [`snap_getFile`](../reference/snaps-api.md#snap_getfile) to retrieve the file contents

## Specify static files in the Snap's manifest

Static files should be specified as an array in the `source.files` field of the manifest. File paths are relative to the Snap package root, i.e. one level above the `src` directory:

```json title="snap.manifest.json"
{
  "source": {
    "shasum": "xxx",
    "location": {
      // ...
    },
    "files": [
      "./files/myfile.bin"
    ]
  }
}
```

## Load files using `snap_getFile`

In your Snap code, load static files using the [`snap_getFile` RPC method](../reference/snaps-api.md#snap_getfile). This method will return a string in the encoding specified, defaulting to `base64` if no encoding is specified:

```javascript title="snap/src/index.js"
const contents = await snap.request({
  method: 'snap_getFile',
  params: {
    path: './files/myfile.bin',
    encoding: 'hex',
  },
});

// `0x...`
console.log(contents);
```