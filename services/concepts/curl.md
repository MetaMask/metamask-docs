---
description: Learning about curl
sidebar_position: 5
---

# curl

The [Client Uniform Resource Locator (curl)](https://curl.se/) command line tool sends API requests via URLs and returns responses.

Requests to Infura APIs commonly use curl.

:::info

We recommend the resource [_Everything curl_](https://everything.curl.dev).

:::

### Install curl

Your operating system may include curl, or you may need to [download and install it](https://everything.curl.dev/install).

### curl commands

Many Infura requests take the form:

```bash
curl https://mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "eth_blockNumber", "params": [], "id": 1}'
```

The code snippet above is an API call to Infura's Ethereum mainnet endpoint.

It requests the latest block number using the method `eth_blockNumber`.

### curl analysis

Let's step through each line of the code snippet to understand what's happening.

The first line uses the `curl` command to send a request to the URL `https://mainnet.infura.io/v3/<YOUR-API-KEY>`.

#### curl command

```bash
curl https://mainnet.infura.io/v3/<YOUR-API-KEY> \
```

:::info

Replace `<YOUR-API-KEY>` with a specific [API key](../../../developer-tools/dashboard/get-started/create-api/).

:::

#### `-X` flag

The `-X` flag specifies a common [HTTP method](https://www.w3schools.com/tags/ref_httpmethods.asp).

```bash
-X POST \
```

#### `-H` flag

The `-H` or `--header` flag specifies [header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) information.

The example specifies the `Content-Type` to be `application/json` which means the requested resource is a JavaScript Object Notation (JSON) object.

```bash
-H "Content-Type: application/json" \
```

#### `-d` flag

The `-d` or `--data` flag specifies more information sent along with the curl request.

In the example, the data object is a list of key value pairs in JSON format. This follows the [JSON RPC 2.0 specification](https://www.jsonrpc.org/specification) which requires the four specific keys seen here.

The `method`, `params`, and `id` values are modifiable.

The `jsonrpc` value is required by the specification.

```bash
-d '{"jsonrpc": "2.0", "method": "eth_blockNumber", "params": [], "id": 1}'
```

#### Running curl

Enter curl code in a terminal window, or a command line tool from your computer's operating system and click return.

#### Output

curl returns a response object if the request is successful.

```bash
{"jsonrpc": "2.0", "id": 3, "result": "0xe0a763"}
```
