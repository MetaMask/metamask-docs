---
description: IPFS quickstart guide
sidebar_position: 2
---

import Banner from '@site/src/components/Banner'

# Quickstart

This quickstart guide will help you set up and make calls on the IPFS network using the Infura endpoints.

:::caution Restricted access

New IPFS key creation is disabled for all users. Only IPFS keys that were active in late 2024 continue
to have access to the IPFS network.

:::

## Prerequisites

Before you begin, ensure you have a valid [API key](../../../../developer-tools/dashboard/get-started/create-api) and
[API key secret](../../../../developer-tools/dashboard/how-to/secure-an-api/api-key-secret/).

## Make calls

### curl

curl generates the auth header and encodes your credentials behind the scenes.

Include the `-u` flag with the authentication information.

```bash
curl -X POST -F file=@myfile -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>" "https://ipfs.infura.io:5001/api/v0/add"
```

### JavaScript

Wrap JavaScript calls to IPFS with the Infura `Authorization` header.

```javascript
xhr.setRequestHeader("Authorization", "Basic " + btoa(<YOUR-API-KEY> + ":" + <YOUR-API-KEY-SECRET>));
```

### Node.js

Replace `<YOUR-API-KEY>` and `<YOUR-API-KEY-SECRET>` in the Node.js example code below.

Save the following script to a file, for example, `index.js`.

```javascript title="index.js"
const https = require("https")

const projectId = "<YOUR-API-KEY>"
const projectSecret = "<YOUR-API-KEY-SECRET>"

const options = {
  host: "ipfs.infura.io",
  port: 5001,
  path: "/api/v0/pin/add?arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn",
  method: "POST",
  auth: projectId + ":" + projectSecret,
}

let req = https.request(options, (res) => {
  let body = ""
  res.on("data", function (chunk) {
    body += chunk
  })
  res.on("end", function () {
    console.log(body)
  })
})
req.end()
```

In a terminal window, run the script using `node index.js`.
This outputs something like the following:

```
{"Pins":["QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn"]}
```

### Python

Replace `<YOUR-API-KEY>` and `<YOUR-API-KEY-SECRET>` in the Python example code below.

Save the following script to a file, for example, `index.py`.

```python title="index.py"
import requests

projectId = "<YOUR-API-KEY>"
projectSecret = "<YOUR-API-KEY-SECRET>"
endpoint = "https://ipfs.infura.io:5001"

### CREATE AN ARRAY OF TEST FILES ###
files = {
  "file": "myNFT.png"
}

### ADD FILE TO IPFS AND SAVE THE HASH ###
response1 = requests.post(endpoint + "/api/v0/add", files=files, auth=(projectId, projectSecret))
print(response1)
hash = response1.text.split(",")[1].split(":")[1].replace('"','')
print(hash)

### READ FILE WITH HASH ###
params = {
  "arg": hash
}
response2 = requests.post(endpoint + "/api/v0/cat", params=params, auth=(projectId, projectSecret))
print(response2)
print(response2.text)

### REMOVE OBJECT WITH PIN/RM ###
response3 = requests.post(endpoint + "/api/v0/pin/rm", params=params, auth=(projectId, projectSecret))
print(response3.json())
```

Run the script using `python index.py`.
This outputs something like the following:

```bash
<Response [200]>
QmWtBbpKST49AQFLx8HAdwwjUu7HBP2wrtAH1x8df5qrVm
<Response [200]>
myNFT.png
{"Pins": ["QmWtBbpKST49AQFLx8HAdwwjUu7HBP2wrtAH1x8df5qrVm"]}
```

### `kubo-rpc-client`

Use the official [`kubo-rpc-client`](https://github.com/ipfs/js-kubo-rpc-client) JavaScript client library.

Install the library with `npm install --save kubo-rpc-client`.

Save the following script to a file, for example, `index.mjs`.

```javascript title="index.mjs"
import { create } from "kubo-rpc-client"

const projectId = "<YOUR-API-KEY>";
const projectSecret = "<YOUR-API-KEY-SECRET>";
const auth = 
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

client.pin.add("QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn").then((res) => {
  console.log(res);
});
```

Run the script using `node index.mjs`.
This outputs something like the following:

```bash
CID(QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn)
```

### `go-ipfs-api`

- Use the official IPFS [`go-ipfs-api`](https://github.com/ipfs/go-ipfs-api) GoLang API.
- Install with `go get -u github.com/ipfs/go-ipfs-api`.
- Create a go module with `go mod init infura`.
- Save the following script to a file, for example, `index.go`, and include the Infura `auth` header with the `http.RoundTripper` wrapper.

```go
package main

import (
  "fmt"
  "net/http"
  "os"
  "strings"

  ipfsApi "github.com/ipfs/go-ipfs-api" // v0.2.0
)

func main() {
  projectId := "<YOUR-API-KEY>"
  projectSecret := "<YOUR-API-KEY-SECRET>"

  shell := ipfsApi.NewShellWithClient("https://ipfs.infura.io:5001", NewClient(projectId, projectSecret))
  cid, err := shell.Add(strings.NewReader("Infura IPFS - Getting started demo."))
  if err != nil {
    fmt.Println(err)
    os.Exit(1)
  }

  fmt.Printf("Data successfully stored in IPFS: %v\n", cid)
}

// NewClient creates an http.Client that automatically performs basic auth on each request.
func NewClient(projectId, projectSecret string) *http.Client {
  return &http.Client{
    Transport: authTransport{
      RoundTripper:  http.DefaultTransport,
      ProjectId:     projectId,
      ProjectSecret: projectSecret,
    },
  }
}

// authTransport decorates each request with a basic auth header.
type authTransport struct {
  http.RoundTripper
  ProjectId     string
  ProjectSecret string
}

func (t authTransport) RoundTrip(r *http.Request) (*http.Response, error) {
  r.SetBasicAuth(t.ProjectId, t.ProjectSecret)
  return t.RoundTripper.RoundTrip(r)
}
```

Run the script using `go run index.go`.
This outputs something like the following:

```bash
CID(QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn)
```

## `go-ipfs-http-client`

- Use the official IPFS [`go-ipfs-http-client`](https://github.com/ipfs/go-ipfs-http-client) GoLang API.
- Install with `go get github.com/ipfs/go-ipfs-http-client`.
- Create a go module with `go mod init infura`.
- Save the following script to a file, for example, `index.go`, and include the Infura `auth` header with the `http.RoundTripper` wrapper.

```go
package main

import (
  "context"
  "encoding/base64"
  "fmt"
  "net/http"
  "os"
  "strings"

  ipfsFiles "github.com/ipfs/go-ipfs-files" // v0.0.8
  ipfsApi "github.com/ipfs/go-ipfs-http-client" // v0.1.0
)

func main() {
  projectId := "<YOUR-API-KEY>"
  projectSecret := "<YOUR-API-KEY-SECRET>"

  httpClient := &http.Client{}
  httpApi, err := ipfsApi.NewURLApiWithClient("https://ipfs.infura.io:5001", httpClient)
  if err != nil {
    fmt.Println(err)
    os.Exit(1)
  }
  httpApi.Headers.Add("Authorization", "Basic " + basicAuth(projectId, projectSecret))

  content := strings.NewReader("Infura IPFS - Getting started demo.")
  p, err := httpApi.Unixfs().Add(context.Background(), ipfsFiles.NewReaderFile(content))
  if err != nil {
    fmt.Println(err)
    os.Exit(1)
  }

  fmt.Printf("Data successfully stored in IPFS: %v\n", p.Cid().String())
}

func basicAuth(projectId, projectSecret string) string {
  auth := projectId + ":" + projectSecret
  return base64.StdEncoding.EncodeToString([]byte(auth))
}
```

Run the script using `go run index.go`.
This outputs something like the following:

```bash
Data successfully stored in IPFS: QmTHr95iiwSTA2USxx4g5kKnhqsNRixqohhwxjvdXmSrWn
```

## Next steps

Now that you have successfully made a call to the IPFS network, you can explore more functionalities and APIs provided
by Infura. Here are some suggestions:

- **Explore other IPFS APIs**: Infura supports a wide range of APIs. You can find more information in the
  [HTTP API methods documentation](../http-api-methods/).

- **Try out different networks**: Infura supports multiple networks including Arbitrum, Linea, Polygon, Optimism, and more.

- **Monitor your usage**: Monitor your usage on the [MetaMask Developer dashboard](../../../../developer-tools/dashboard/) to ensure you're not hitting your rate limits.

Remember, the Infura community is here to help. If you have any questions or run into any issues, check out the
[Infura community](https://community.infura.io/) for help and answers to common questions.
