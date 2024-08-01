---
description: Use JSON Web Tokens to secure data exchange.
sidebar_position: 8
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Use JSON Web Token (JWT)

JSON Web Token (JWT) is an internet standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that defines a process for secure data exchange between two parties.

Infura projects can use [JSON Web Tokens](https://jwt.io) to authorize users and external parties.

:::warning

Infura supports using JWTs for Web3 networks.

:::

## Use JWTs with Infura projects

Only authenticated users can access Infura projects by including JWTs in request headers.

#### Workflow

1. Infura security settings enforce authorized access with JWTs.
2. A user logs into the project application and receives a JWT.
3. Each request the user makes to Infura with the application's API key includes the JWT in the header.
4. The JWT is verified and the request is successful, or the request is rejected if the JWT is invalid.

:::info

JWTs may also include allowlists that enforce further restrictions.

:::

## Set up a project to use JWTs

### Generate keys

You can generate your private and public key pair using a tool such as [OpenSSL](https://www.openssl.org). Infura supports the [RS256](https://datatracker.ietf.org/doc/html/rfc7518#section-3.3) and [ES256](https://datatracker.ietf.org/doc/html/rfc7518#section-3.4) cryptographic algorithms.

:::warning

Ensure your private key stays private!

:::

The following example creates the key pairs using `openssl`:

<Tabs>
  <TabItem value="RSA key pair" label="RSA key pair" default>

```bash
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -outform PEM -pubout -out public.pembas
```

  </TabItem>
  <TabItem value="EC (256) key pair" label="EC (256) key pair" >

```bash
openssl ecparam -name prime256v1 -genkey -noout -out private.pem
openssl ec -in private.pem -pubout -out public.pembash
```

  </TabItem>
</Tabs>

### Upload the public key

Upload the contents of the public key file that you [generated earlier](json-web-token-jwt.md#generate-keys):

1. Go to the **SECURITY** section in your project settings.

  ![Security settings](../images/security-page.png)

  :::info

  You must implement separate security settings for each project.

  :::

2. (Optional) Check the **Require JWT for all requests** box to enforce JWT on all requests.

  :::info

  Use allowlists to specify a subset of requests that must use JWTs.

  :::

3. Give the public key a name.

4. Paste the public key into the **JWT PUBLIC KEY** input box. It looks something like this:

  ```
  -----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr7VlNytvNFt9wVkjJ8vG
  L4F0+id4kS1CpG7UMh1kghrLg9KMb8gauy7Bxk6PRz5Ckv1FnG4FL+Z3Cdzwd6c8
  jJlzJxbRTYvNi3elqAyItE3tRl6CatRur49t9nGepgFOrwmPP5We52G5O0BsW6Mx
  w/neqQH+Y/bXqs0PG/0ZbpTyr044Lh+p9grSuPIogIGIY5JM4AI+fpdH6hVnA7od
  PkinkWhQqAW+F8jngwZK+JCFS1GAeobTZVbvsiHZQGuP/T7hqE8z5Q8HYO4ymnkI
  MPH6zSKhSxsQRs/kWU5lXqY67ORC3DIMA+I/AJujLuoqC+YaMP0fO81XjrwXPf2j
  4wIDAQAB
  -----END PUBLIC KEY-----
  ```

5. Click **ADD** to add the key to the settings. After the key is added, the security settings look like the following:

  ![JWT set up](../images/jwt-set-up.png)

6. The key has a **NAME**, **ID**, **FINGERPRINT**. These are used for creating and verifying JWTs. You'll need the **ID** to [generate the JWT](json-web-token-jwt.md#generate-a-jwt).

  :::info

  For key rotation, upload up to three keys for each project.

  :::

## Send requests with JWTs

If JWTs are required for all requests, the following fails with an `invalid JWT` error.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}' \
  "https://optimism-sepolia.infura.io/v3/<API-KEY>"
```

To get the request to pass, generate a JWT, and add it to the request.

### Generate a JWT

The following example uses the [jwt.io](https://jwt.io) site to generate the JWT:

- Use a supported algorithm (`RS256` or `ES256`) and declare it in the `alg` header field.
- Specify `JWT` in the `typ` header field.
- Include the JWT `ID` in the `kid` header field.
- Have an unexpired `exp` timestamp in the payload data.

:::info

To generate a timestamp for testing, use an [online timestamp converter tool](https://www.freeformatter.com/epoch-timestamp-to-date-converter.html).

:::

- Specify `infura.io` in the `aud` field.
- Add the public key and private key created earlier into the **Verify Signature** section.

To see how this works, go to a site like [jwt.io](https://jwt.io) and enter the data.

![Generate a JWT online](../images/jwt.png)

Copy the encoded token as part of the `-H "Authorization: Bearer` entry:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQyZjUxODRlMzE1ZTQwZDRiNzkzMjU3Nzg2OTEwOTNhIn0.eyJleHAiOjE4OTM0NTI0MDAsImF1ZCI6ImluZnVyYS5pbyJ9.rIBKHmxDsSEiiqEcbWPWkN6F28R95a0beGdnVgVQnnD7ESOKGosr2t9iQ7QyGvNO8-74gaPy_DqVn4sy1FvnullrWQc8Tmf5PrrX2ULiGfSUATvr-JPOga-KAgS6ftcStoACNmcN7QI-n7Gv7NqZC3zWMGzK_1SvYcSodXzoWwtkWmrMW9uPiu4MvROQH0sK7MJ4WHBIHii-x4wogH4PHEdGi_vFZohq2bRaaDKXBeJK7Tkke2whcydTHGuiAPQvRiHu5_wVptgDbTbKIQ28ZFQ4LpYStXE9Bck4JoVDeRQezWJN8Dx9ThU7j1xhWQqxQFWw3SPHry-cIejAWEfDTQ" \
  --data '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}' \
  "https://mainnet.infura.io/v3/<API-KEY>"
```

```bash
{"jsonrpc": "2.0", "id": 1, "result": "0x1cc23d4"}
```

### Set up allowlists

Allowlists restrict specific activity to users without JWTs. For example, in a system with proxy contracts, allowlists can restrict a user to sending requests to their own proxy only.

:::info

JWT allowlists override all other security settings for requests.

:::

A JWT with allowlists must have all of the above settings, plus properly formatted allowlists.

Set allowlists with one or more of the following keys:

- `methods`
- `addresses`
- `origins`
- `user_agents`

The following example JWT definition allows only `eth_getBalance` requests, on a single specified address, coming from any HTTP origin, and any user agent.

**Header**:

```json
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "<YOUR JWT ID>"
}
```

**Payload:**

```json
{
  "exp": 1893452400, // a long way off
  "aud": "infura.io",
  "methods": ["eth_getBalance"],
  "addresses": ["0x1937c5c515057553ccbd46d5866455ce66290284"]
}
```

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQyZjUxODRlMzE1ZTQwZDRiNzkzMjU3Nzg2OTEwOTNhIn0.eyJleHAiOjE4OTM0NTI0MDAsImF1ZCI6ImluZnVyYS5pbyIsImFkZHJlc3NlcyI6WyIweDE5MzdjNWM1MTUwNTc1NTNjY2JkNDZkNTg2NjQ1NWNlNjYyOTAyODQiXSwibWV0aG9kcyI6WyJldGhfZ2V0QmFsYW5jZSJdfQ.SwonSCVgybdT_GPQXe5SfhujmyzG-qpgH6zzVEzLZbZpZKsVQzOzFu3X1zHydvITzl3WhKXq5q8acHdMEO8y2TpUeyeLB25A-bnSZj8YlxacQvsnSNzm4ySJrTglmjD9rsr6JzKfgub03RuHuz0AWWO4omD6UrPcfcpxUF9YXEcT98SIsodPP_41WPrRvBuo8kLhmByr2Qs-XQRCDzxHxHb5jXI5RzoxLeEjTU_3GfWqgqgh4XHogcK43_VFGz9gv8QEoUiPnySafV6H80WXo12XwTeF-lr2cy_q79ZOvSp0WC4_j8dQMhNwj2dhZv1VPsViZMeHjBAJwK5mzIxBlQ" \
  --data '{"jsonrpc": "2.0", "id": 1, "method": "eth_getBalance", "params": [ "0x1937c5c515057553ccbd46d5866455ce66290284", "latest"]}' \
  "https://mainnet.infura.io/v3/<API-KEY>"
```

```bash
{"jsonrpc": "2.0", "id": 1, "result": "0x1a66d865b7f200"}%
```

## Verify JWTs

To identify the public key you have used to create a JWT, verify it with the `FINGERPRINT`.

Take the private key, output it in `DER` encoding; take the `SHA256` of that, and `base64` encode the result.

<Tabs>
  <TabItem value="RSA key" label="RSA key" default>

```bash
openssl rsa -in private.pem -pubout -outform DER | openssl sha256 -binary | openssl base64
```

  </TabItem>
  <TabItem value="EC (256) key" label="EC (256) key" default>

```bash
openssl ec -in private.pem -pubout -outform DER | openssl sha256 -binary | openssl base64
```

  </TabItem>
</Tabs>
