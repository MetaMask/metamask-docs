---
description: Get started with Infura; create your Infura API key and send requests to the Ethereum network.
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Get started with Infura

## 1. Sign up to Infura

Sign up for an account on the [Infura website](https://app.infura.io/register), enter your details, and select
**CREATE A FREE ACCOUNT**.

To activate your account, verify your email address by clicking the link sent to your inbox.

:::important API key restrictions

Based on your plan, Infura allows for the following amount of API keys:

- Free plan - Allows one API key.
- Developer plan - Allows up to five API keys.
- Team plans and higher - No limit on the number of API keys.

For more information refer to the [Infura pricing information](https://www.infura.io/pricing).

:::

## 2. Configure your API key

After verification, you'll be directed to the [Infura dashboard](../../../developer-tools/dashboard) to configure your
auto-generated API key.

Infura will automatically generate the **My First Key** API key.


<div class="left-align-container">
  <div class="img-large">
    <img
      src={require('../images/first-api-key.png').default}
    />
  </div>
</div>

In the API key page that displays, select **My First Key** to access your API key settings. In the **All Endpoints** tab, select
the networks that you want to connect to, and select **Save Changes**.

In the following example, Ethereum mainnet and Linea mainnet networks are selected.

<div class="left-align-container">
  <div class="img-large">
    <img
      src={require('../images/api-key-page.png').default}
    />
  </div>
</div>

## 3. Send requests

Use the API key when sending requests. The following examples interact with the Ethereum network by sending requests using HTTP:

:::info

- All requests are `POST` requests.
- Replace `YOUR-API-KEY` with your own unique API key.

:::

Use a tool such as the [Client Uniform Resource Locator (curl)](../concepts/curl.md) or [Postman](https://www.postman.com/downloads/) to make requests. 

:::info

We recommend using Postman if you're a Windows user.

:::

### 3.1 Get the current block number

Retrieve the current block number.

<Tabs>
  <TabItem value="cURL" label="cURL" default>

```bash
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}'
```

  </TabItem>
  <TabItem value="Postman" label="Postman" >

```bash
URL: https://mainnet.infura.io/v3/YOUR-API-KEY
Request_Type: POST
Body:
{
  "jsonrpc": "2.0",
  "method": "eth_blockNumber",
  "params": [],
  "id": 1
}
```

  </TabItem>
</Tabs>

You'll receive a response similar to:

```bash
{"jsonrpc": "2.0", "id": 1, "result": "0xde5fba"}
```

The data returned is in hexadecimal, prefixed with `0x`. If you [convert](https://www.rapidtables.com/convert/number/hex-to-decimal.html) `de5fba` to decimal, the resulting number is 14573498, representing the current block number at the time the query was made.

### 3.2 View the Ether balance of a specified contract

Check the balance of an Ethereum smart contract.

The example code checks the latest balance of the Ethereum Proof of Stake (PoS) contract.

<Tabs>
  <TabItem value="cURL" label="cURL" default>

```bash
curl https://mainnet.infura.io/v3/API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "eth_getBalance", "params": ["0x00000000219ab540356cBB839Cbe05303d7705Fa", "latest"], "id": 1}'
```

  </TabItem>
  <TabItem value="Postman" label="Postman" >

```bash
URL: https://mainnet.infura.io/v3/YOUR-PROJECT-ID
Request_Type: POST
Body:
{
  "jsonrpc": "2.0",
  "method": "eth_getBalance",
  "params": [
    "0x00000000219ab540356cBB839Cbe05303d7705Fa",
    "latest"
  ],
  "id": 1
}
```

  </TabItem>
</Tabs>

You'll receive a result similar to:

```bash
{"jsonrpc": "2.0", "id": 1, "result": "0x96c8e932f1e499c855045"}
```

This result is the hexadecimal value of the contract in Wei (the smallest denomination of Ether).

The decimal conversion of the result is `11392978000069000000000069` Wei, which equals `11392978.000069000000000069` Ether.

## 4. Secure your API key

Configure security settings in the **Settings** tab. This is optional.

Force API requests to include the API key secret and/or [JSON Web Tokens (JWTs)](../how-to/json-web-token-jwt.md).

<div className="left-align-container">
  <div className="img-large">
    <img
      src={require("../images/settings-tab.png").default}
      alt="Settings Tab"
    />
  </div>
</div>

Use an allowlist to restrict API key access. See to the [allowlist documentation](../../../developer-tools/dashboard/how-to/secure-an-api/use-an-allowlist) for configuration instructions and best practices.

<div class="left-align-container">
  <div class="img-large">
    <img
      src={require("../images/allowlist.png").default}
    />
  </div>
</div>

## 5. View your project stats

From the Stats page of the Infura dashboard, you can view real-time statistics about your API usage.
Optimize your app and better understand your users by
[reviewing your API request stats](../../../developer-tools/dashboard/how-to/dashboard-stats) regularly.

<div class="left-align-container">
  <div class="img-large">
    <img
      src={require("../images/dashboard_stats.png").default}
    />
  </div>
</div>

## 6. Manage your account

Find additional settings in **Settings** to manage your account. You can do the following:

- [Set notifications for daily limits](../how-to/avoid-rate-limiting.md#tips-to-avoid-rate-limiting)
  from the **Account** option.
- Manage your billing information in the **Billing** option.
- Manage [shared API keys](../../../developer-tools/dashboard/how-to/project-sharing) in the **Key Sharing** option.

<div class="left-align-container">
  <div class="img-large">
    <img
      src={require("../images/settings.png").default}
    />
  </div>
</div>
