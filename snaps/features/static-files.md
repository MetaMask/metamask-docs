---
description: Include and retrieve static files in the Snap bundle.
sidebar_position: 12
---

# Static files

You can handle static files in your Snap bundle using the
[`snap_getFile`](../reference/snaps-api.md#snap_getfile) API method.
This is useful to load Wasm modules, ZK circuits, or any other files that must be lazily loaded.

## Steps

### 1. Specify static files in the Snap's manifest file

Specify static files as an array in the `source.files` field of your Snap's
[manifest file](../learn/about-snaps/files.md#manifest-file).
File paths are relative to the Snap package root, that is, one level above the `src` directory.
For example:

```json title="snap.manifest.json"
"source": {
  "shasum": "xxx",
  "location": {
    // ...
  },
  "files": [
    "./files/myfile.bin"
  ]
}
```

### 2. Load static files using `snap_getFile`

In your Snap code, load static files using [`snap_getFile`](../reference/snaps-api.md#snap_getfile).
This method returns a string in the encoding specified, with a default of Base64 if no encoding is specified.
For example:

```javascript title="index.js"
const contents = await snap.request({
  method: "snap_getFile",
  params: {
    path: "./files/myfile.bin",
    encoding: "hex",
  },
});

// "0x..."
console.log(contents);
```

## Example

See the [`@metamask/get-file-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/get-file)
package for a full example of handling static files.
