---
description: Get started with Infura; create your Infura API key and send requests to the Ethereum network.
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Get started with Infura

## 1. Sign up to Infura

Infura is a MetaMask service that offers a comprehensive set of services to facilitate dapp and
[Snap development](/snaps/). Sign up for an account on the
[MetaMask Developer website](https://developer.metamask.io/register).

To activate your account, verify your email address by clicking the link sent to your inbox.

:::important API key restrictions

Based on your plan, Infura allows for the following number of API keys:

- Free plan - Allows one API key.
- Developer plan - Allows up to five API keys.
- Team plans and higher - No limit on the number of API keys.

For more information refer to the [Infura pricing information](https://www.infura.io/pricing).

:::

## 2. View your API key

After verification, you'll be directed to the [MetaMask Developer dashboard](/developer-tools/dashboard)
where you can view or configure your API key. Infura automatically generates the **My First Key** API key.

Select **My First Key** or the **Configure** link to view your API key settings.


<div class="left-align-container">
  <div class="img-large">
    <img
      src={require('../images/first-api-key.png').default}
    />
  </div>
</div>

In the **All Endpoints** tab that displays, all network endpoints are enabled by default, and you can
view your API key.

## 3. Send requests

Use the API key when sending requests. The following examples interact with the Ethereum network by
sending requests using HTTP.

:::info

- All requests are `POST` requests.
- Replace `<YOUR-API-KEY>` with your own unique API key.
- We recommend using Postman if you're a Windows user.

:::

Use a tool such as the [Client Uniform Resource Locator (curl)](../concepts/curl.md) or [Postman](https://www.postman.com/downloads/) to make requests.

<details>
<summary>Supported API methods</summary>
<div>
  View the supported API methods for each network in the **Reference** section in the left sidebar.
  The following methods are not supported on any network by Infura:

  - `eth_coinbase`
  - `eth_sendTransaction`
  - `eth_sign`

  Infura doesn't store the user's private key required to sign transactions.
  You can use [`web3.eth.sendTransaction`](https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#sendtransaction),
  which signs the transaction locally using the private key of the account, and sends the transaction via [`web3.eth.sendSignedTransaction`](https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#sendsignedtransaction),
  which is a wrapper for [`eth_sendRawTransaction`](../reference/ethereum/json-rpc-methods/eth_sendrawtransaction.mdx).
</div>
</details>

### 3.1 Get the current block number

Retrieve the current block number.

<Tabs>
  <TabItem value="curl" label="curl" default>

```bash
curl https://mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}'
```

  </TabItem>
  <TabItem value="Postman" label="Postman" >

```bash
URL: https://mainnet.infura.io/v3/<YOUR-API-KEY>
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
  <TabItem value="curl" label="curl" default>

```bash
curl https://mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "eth_getBalance", "params": ["0x00000000219ab540356cBB839Cbe05303d7705Fa", "latest"], "id": 1}'
```

  </TabItem>
  <TabItem value="Postman" label="Postman" >

```bash
URL: https://mainnet.infura.io/v3/<YOUR-API-KEY>
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

This result is the hexadecimal value of the contract in wei (the smallest denomination of Ether).

The decimal conversion of the result is `11392978000069000000000069` wei, which equals `11392978.000069000000000069` Ether.

## 4. Secure your API key

[Configure security settings](/developer-tools/dashboard/how-to/secure-an-api/api-key) by selecting **Configure**.
This is optional.

For example, you can force API requests to include the API key secret and/or
[JSON Web Tokens (JWTs)](../how-to/json-web-token-jwt.md).

<div className="left-align-container">
  <div className="img-large">
    <img
      src={require("../images/settings-tab.png").default}
      alt="Settings Tab"
    />
  </div>
</div>

## 5. View your project stats

The dashboard displays an overview of your daily request health and credit usage.
Select **View Stats** or **Stats** (in the left navigation) to monitor your project request stats.

<div class="left-align-container">
  <div class="img-large">
    <img
      src={require('../images/analytics.png').default}
    />
  </div>
</div>

From the Stats page of the dashboard, view real-time statistics about your API usage.
Optimize your app and better understand your users by
[reviewing your API request stats](/developer-tools/dashboard/how-to/dashboard-stats).

## 6. View your credit usage

The dashboard provides an overview of your daily credit usage. Select **View Usage**
for a [wider view of your credit usage](/developer-tools/dashboard/how-to/credit-usage).

<div class="left-align-container">
  <div class="img-large">
    <img
      src={require('../images/view-usage.png').default}
    />
  </div>
</div>

## 7. Manage your account

Find additional settings in the **Settings** menu in the left navigation to manage your account.
You can do the following:

- [Set notifications for daily limits](../how-to/avoid-rate-limiting.md#tips-to-avoid-rate-limiting)
  from the **Account** option.
- Manage your billing information in the **Billing** option.
