---
description: Manage files using IPFS.
sidebar_position: 3
---

# Manage files

Upload and pin files across the IPFS network using Infura's API endpoints, custom tools, and libraries.

:::info

Infura doesn't currently support remote pinning services on IPFS Desktop.

:::

### Upload a file with the IPFS API

```bash
curl -X POST -F file=@myfile \
  -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>" \
  "https://ipfs.infura.io:5001/api/v0/add"

> {
  "Name": "ipfs_file_docs_getting_started_demo.txt",
  "Hash": "QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn",
  "Size": "44"
}
```

When you upload a file using the `/api/v0/add` endpoint, the file is automatically pinned, and it isn't necessary to `pin` again.

### Upload a file with the Infura UI

Upload one or more files using the Infura UI. Uploaded files are automatically pinned and automatically appear in your project's dashboard explorer. Unpin it at any time using the unpin button in the UI. To upload content:

1. In the IPFS dashboard for your project, select **UPLOAD CONTENT**.

2. Drag and drop, or select one or more files to upload, and click **UPLOAD**.

Your uploaded files will display in the dashboard.

### Upload a file with `ipfs-upload-client`

Infura's [ipfs-upload-client](https://github.com/INFURA/ipfs-upload-client) is a command line tool for uploading files and directories to IPFS. Install the tool using the following steps:

1. Clone the ipfs-upload-client repository:

   ```
   git clone https://github.com/INFURA/ipfs-upload-client.git
   ```

2. Change to the `ipfs-upload-client` directory:

   ```
   cd ipfs-upload-client
   ```

3. Compile the source code to create a binary in the project folder:

   ```
   go build
   ```

Upload your files and directories to IPFS using the following syntax:

```
./ipfs-upload-client --id <YOUR-API-KEY> --secret <YOUR-API-KEY-SECRET> </path/to/data>
```

By default, the tool also pins your uploaded file. You can override this default by setting `--pin false`. Read more
about using the tool in [this blog post](https://blog.infura.io/ipfs-file-upload-client-tool/).

#### Command flags

```bash
  --id       API key
  --secret   API key secret
  --url      The API URL (default "https://ipfs.infura.io:5001", set with --url <CUSTOM_URL>)
  --pin      Whether or not to pin the data (default true, set to false with --pin=false)
```

### Pin a file

IPFS pinning allows you to retain and persist data on IPFS nodes. Pinning assures that data is accessible indefinitely, and
not removed during the [IPFS garbage collection process](https://docs.ipfs.io/concepts/persistence/#garbage-collection).

```bash
curl -X POST -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>" \
  "https://ipfs.infura.io:5001/api/v0/pin/add?arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn"
```

A pinned file will appear in your project's dashboard explorer. You can [unpin](manage-files.md#unpin-a-file) it at any
time using the unpin button in the UI or with the API endpoint.

### Unpin a file

Unpin a file using the Infura UI or IPFS API.

To unpin a file in the Infura UI, select the file in the IPFS dashboard for your project and select the **UNPIN** link.

Alternatively, use the IPFS API to unpin content.

```bash
curl -X POST -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>" \
  "https://ipfs.infura.io:5001/api/v0/pin/rm?arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn"
```

### Read a file

```bash
curl -X POST -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>" \
  "https://ipfs.infura.io:5001/api/v0/cat?arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn"

> Infura IPFS - Getting started demo.
```
