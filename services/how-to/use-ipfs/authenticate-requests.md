---
description: Authenticate your requests to the IPFS network.
sidebar_position: 2
---

# Authenticate requests

To connect to IPFS, Infura requires the use of Basic authentication in the
[Authorization HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization). Basic authentication
involves sending a base64-encoded string that contains your username and password.

:::info

To access the IPFS network through Infura, you'll need to add a billing card to your account, even if you're using a free account. Refer
to the [billing details](access-ipfs-content/dedicated-gateways.md#stats-and-billing) for more information.

:::

The format for the Authorization header is as follows:

```
Authorization: Basic <base64(USERNAME:PASSWORD)>
```

Username is the `API_KEY` and password is the `API_KEY_SECRET.` Find your authorization credentials in the API key's settings
page after you [register your Infura account](https://infura.io/register) and
[create an API key](/developer-tools/dashboard/get-started/create-api) that includes the IPFS network.

For example, to authenticate and upload a file to IPFS using curl, you would use the following command:

```bash
curl -X POST -F file=@myfile -u "<YOUR-API-KEY>:<YOUR-API-KEY-SECRET>" "https://ipfs.infura.io:5001/api/v0/add"
```

curl automatically generates the authorization header and encodes your credentials.
