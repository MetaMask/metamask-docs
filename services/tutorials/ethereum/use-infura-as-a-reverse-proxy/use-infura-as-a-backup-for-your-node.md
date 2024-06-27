---
description: Use Caddy to set Infura as a backup for your node.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Use Infura as a backup for your node

In this tutorial, you'll use [Caddy](https://caddyserver.com/) to set up a reverse proxy with two upstreams, one from your own node, and one from Infura as a backup.

## Prerequisites

- An [Ethereum project](../../../get-started/infura.md) on Infura
- [Node.js installed](https://nodejs.org/en/download/)
- [Homebrew](https://brew.sh/) installed

## Steps

### 1. Create a project directory

Create a new directory for your project. You can do this from the command line:

```bash
mkdir reverseProxy
```

Change into the new directory:

```bash
cd reverseProxy
```

### 2. Install Caddy

Install Caddy in the project directory using Homebrew:

```bash
brew install caddy
```

### 3. Create a Node.js stub

You may be running your own Ethereum node, but for the sake of this tutorial, you can substitute a node with a Node.js stub. Create a file named `main.js` in the project directory with the following content:

```javascript
const https = require("https");
const fs = require("fs");
const options = {
  key: fs.readFileSync("<PATH_TO_CERTIFICATE_KEY_FILE>.pem"),
  cert: fs.readFileSync("<PATH_TO_CERTIFICATE_FILE>.pem"),
};

const hostname = "127.0.0.1";
const port = 9000;

const server = https.createServer(options, function (req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  setTimeout(() => {
    res.end("Reverse proxy success!\n");
  }, 1000);
});

server.listen(port, hostname, () => {
  console.log(`Server running at https://${hostname}:${port}/`);
});
```

This sets up a backend HTTPS service running on `127.0.0.1:9000` (`localhost:9000`) and displays a success message if the proxy works.

:::warning

When creating a reverse proxy with multiple upstreams, Caddy requires _all_ upstream endpoints to be HTTP or HTTPS. In this tutorial, because the backup Infura endpoint is HTTPS, you must create a TLS certificate for your localhost (if you're not already using your own private HTTPS node).

:::

You can [install and use mkcert](https://web.dev/how-to-use-local-https/#setup) to generate a certificate key file and certificate file for your stub:

```bash
brew install mkcert
mkcert -install
mkcert localhost
```

Replace `<PATH_TO_CERTIFICATE_KEY_FILE>` and `<PATH_TO_CERTIFICATE_FILE>` in `main.js` with the generated files.

### 4. Run the Node.js stub

In a new terminal window, from your project directory, start the Node.js stub and leave that connection open:

```bash
node main.js
```

### 5. Create the reverse proxy

To create the reverse proxy, create a text file named `Caddyfile` with the following content:

```
localhost:3000

reverse_proxy https://localhost:9000 https://goerli.infura.io {
   header_up Host {/v3/<YOUR_API_KEY>}
}
```

Ensure you replace `<YOUR_API_KEY>` with the API key for your Ethereum project.

In this example, the reverse proxy retrieves information from `localhost:9000`, and redirects it to `localhost:3000`. If `localhost:9000` stops responding, Caddy will move on to retrieve information from the Infura Goerli endpoint. Using `header_up Host` allows you to include your API key to both the Goerli and localhost endpoints.

### 6. Run the reverse proxy

In a new terminal window, from your project directory, run the reverse proxy using Caddy:

```bash
caddy run
```

### 7. Make a request

In a new terminal window, make a curl request to `localhost`. The following example executes a `web3_clientVersion` request:

<Tabs>
  <TabItem value="Example CURL request" label="Example CURL request" default>

```bash
curl http://localhost:3000/v3/<YOUR_API_KEY> \
<strong>  -X POST \
</strong>  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"web3_clientVersion","params": [],"id":1}'</code></pre>
```

  </TabItem>
  <TabItem value="Example result" label="Example result" >

```
Reverse proxy success!
```

  </TabItem>
</Tabs>

The success message from `main.js` should display, because you've asked the reverse proxy to go to `localhost:9000` first.

If you close the Node.js server and send the request again, you should get the result from the Infura Goerli node:

<Tabs>
  <TabItem value="Example CURL request" label="Example CURL request" default>

```bash
curl http://localhost:3000/v3/<YOUR_API_KEY> \
<strong>  -X POST \
</strong>  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"web3_clientVersion","params": [],"id":1}'</code></pre>
```

  </TabItem>
  <TabItem value="Example result" label="Example result" >

```javascript
{"jsonrpc":"2.0","id":1,"result":"Geth/v1.10.8-omnibus-aef5bfb3/linux-amd64/go1.16.7"}
```

  </TabItem>
</Tabs>

The reverse proxy ignores the localhost node, since it's not functioning, and defaults to the backup Infura Goerli node!
