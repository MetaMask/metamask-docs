---
description: Use Caddy to set up a reverse proxy.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SectionNetworks from '@site/src/components/Sections/SectionNetworks.jsx';

# Set up a simple reverse proxy

In this tutorial, you'll use [Caddy](https://caddyserver.com/) to set up a reverse proxy to route data from Infura to your own node.

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

### 3. Create the reverse proxy

To create the reverse proxy, create a text file named `Caddyfile` with the following content:

```
localhost

reverse_proxy https://goerli.infura.io {
header_up Host
}
```

Ensure you replace `<YOUR_API_KEY>` with the API key for your Ethereum project.

In this example, the reverse proxy retrieves information from the Infura Goerli endpoint, and redirects it to `localhost`. Using `header_up Host` allows you to include your API key to both the Goerli and localhost endpoints.

### 4. Run the reverse proxy

In a new terminal window, from your project directory, run the reverse proxy using Caddy:

```bash
caddy run
```

### 5. Make a request

In a new terminal window, make a curl request to `localhost`. The following example executes a `web3_clientVersion` request:

<Tabs>
  <TabItem value="Example curl HTTPS request" label="Example curl HTTPS request" default>

```bash
curl https://localhost/v3/<YOUR_API_KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"web3_clientVersion","params": [],"id":1}'
```

  </TabItem>
  <TabItem value="Example JS result" label="Example JS result" >

```javascript
{"jsonrpc":"2.0","id":1,"result":"Geth/v1.10.8-omnibus-aef5bfb3/linux-amd64/go1.16.7"}
```

  </TabItem>
</Tabs>

To ensure that the reverse proxy is working, execute the same request, replacing `localhost` with `goerli.infura.io`. You should get the same result:

<Tabs>
  <TabItem value="Example curl HTTPS request" label="Example curl HTTPS request" default>

```bash
curl https://goerli.infura.io/v3/<YOUR_API_KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"web3_clientVersion","params": [],"id":1}'
```

  </TabItem>
  <TabItem value="Example JS result" label="Example JS result" >

```javascript
{"jsonrpc":"2.0","id":1,"result":"Geth/v1.10.8-omnibus-aef5bfb3/linux-amd64/go1.16.7"}
```

  </TabItem>
</Tabs>
