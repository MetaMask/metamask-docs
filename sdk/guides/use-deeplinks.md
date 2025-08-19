---
description: Use deeplinks to connect to users' MetaMask mobile wallets.
keywords: [SDK, deeplink, deeplinks, mobile, dapp]
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Use deeplinks

You can use deeplinks to directly route your users to specific, pre-configured functions inside the MetaMask mobile app.
For example, you can create a deeplink that lets users make one-click payments with a preset token, recipient, and amount.
You can also convert deeplinks to QR codes, so users can scan them with a mobile device.

If a user doesn't have the mobile app installed, deeplinks route the user to a landing page where they can download the app.

This page highlights deeplinks available for the MetaMask mobile app.

## Open a dapp inside the in-app browser

<Tabs>
<TabItem value="Deeplink">

```text
https://metamask.app.link/dapp/{dappUrl}
```

</TabItem>
<TabItem value="Example">

```text
https://metamask.app.link/dapp/app.uniswap.org
```

</TabItem>
</Tabs>


This deeplink takes the user directly to the dapp URL in the MetaMask mobile in-app browser.

The example navigates to `app.uniswap.org` in the in-app browser.

### Path parameters

- `dappUrl` - Dapp URL.

## Send native currency

<Tabs>
<TabItem value="Deeplink">

```text
https://metamask.app.link/send/{recipient}@{chainId}
```

</TabItem>
<TabItem value="Example">

```text
https://metamask.app.link/send/0x0000000@137?value=1e16
```

</TabItem>
</Tabs>

This deeplink starts the process of sending a transaction in the native currency.
If the chain ID is specified, the MetaMask mobile app automatically switches to the correct network.

The example displays the confirmation screen to send 0.01 POL (`1e16` wei) in Polygon (chain ID `137`) to the recipient address `0x0000000`.

### Path parameters

- `recipient` - Address of the recipient.
- `chainId` - (Optional) Chain ID of the network to use.

### Query string parameters

- `value` - Amount to be transferred, in the native currency's smallest unit.

## Send an ERC-20 token

<Tabs>
<TabItem value="Deeplink">

```text
https://metamask.app.link/send/{contractAddress}@{chainId}/transfer
```

</TabItem>
<TabItem value="Example">

```text
https://metamask.app.link/send/0x176211869cA2b568f2A7D4EE941E073a821EE1ff@59144/transfer?address=0x0000000&uint256=1e6
```

</TabItem>
</Tabs>

This deeplink starts the process of sending a transaction in an ERC-20 token.
If the chain ID is specified, the MetaMask mobile app automatically switches to the correct network.

The example displays the confirmation screen to send 1 USDC (`1e6` units, contract address `0x176211869cA2b568f2A7D4EE941E073a821EE1ff`) on Linea (chain ID `59144`) to recipient address `0x0000000`.

### Path parameters

- `contractAddress` - Contract address of the ERC-20 token.
- `chainId` - (Optional) Chain ID of the network to use.

### Query string parameters

- `address` - Address of the recipient.
- `uint256` - Amount to be transferred, in the token's smallest unit.

## Start the on-ramp process

<Tabs>
<TabItem value="Deeplink">

```text
https://metamask.app.link/buy
```

</TabItem>
<TabItem value="Example">

```text
https://metamask.app.link/buy?chainId=59144&address=0x176211869cA2b568f2A7D4EE941E073a821EE1ff&amount=100
```

</TabItem>
</Tabs>

This deeplink starts the on-ramp process to buy native currency or ERC-20 tokens.
If the chain ID is specified, the MetaMask mobile app automatically switches to the correct network.

The example starts the on-ramp process to buy $100 (`amount=100`) of USDC (contract address `0x176211869cA2b568f2A7D4EE941E073a821EE1ff`) on Linea (chain ID `59144`).
The fiat currency depends on the onboarding status of the user and the region they select.

:::note
You can use the `/buy` or `/buy-crypto` path for this deeplink.
:::

### Query string parameters

- `chainId` - (Optional) Chain ID of the network to use.
- `address` - (Optional) Contract address of the ERC-20 token.
  If omitted, the native currency is used.
- `amount` - (Optional) Amount to buy, in the user's fiat currency.

## Start the off-ramp process

<Tabs>
<TabItem value="Deeplink">

```text
https://metamask.app.link/sell
```

</TabItem>
<TabItem value="Example">

```text
https://metamask.app.link/sell?chainId=59144&amount=125
```

</TabItem>
</Tabs>

This deeplink starts the off-ramp process to sell native currency.
If the chain ID is specified, the MetaMask mobile app automatically switches to the correct network.

The example starts the off-ramp process to sell 125 ETH (`amount=125`) on Linea (chain ID `59144`).

:::note
You can use the `/sell` or `/sell-crypto` path for this deeplink.
:::

### Query string parameters

- `chainId` - (Optional) Chain ID of the network to use.
- `amount` - (Optional) Amount to sell, in the native currency.
