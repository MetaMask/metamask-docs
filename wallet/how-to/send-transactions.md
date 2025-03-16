---
description: Send transactions using eth_sendTransaction.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Send transactions

You can send a transaction in MetaMask using the
[`eth_sendTransaction`](/wallet/reference/json-rpc-methods/eth_sendtransaction)
RPC method.

For example, the following JavaScript gets the user's accounts and sends a transaction when they
select each button:

```javascript title="index.js"
const ethereumButton = document.querySelector(".enableEthereumButton");
const sendEthButton = document.querySelector(".sendEthButton");

let accounts = [];

sendEthButton.addEventListener("click", () => {
  provider // Or window.ethereum if you don't support EIP-6963.
    .request({
      method: "eth_sendTransaction",
      params: [
        {
          from: accounts[0], // The user's active address.
          to: "0x0000000000000000000000000000000000000000", // Address of the recipient. Not used in contract creation transactions.
          value: "0x0", // Value transferred, in wei. Only required to send ether to the recipient from the initiating external account.
          gasLimit: "0x5028", // Customizable by the user during MetaMask confirmation.
          maxPriorityFeePerGas: "0x3b9aca00", // Customizable by the user during MetaMask confirmation.
          maxFeePerGas: "0x2540be400", // Customizable by the user during MetaMask confirmation.
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error(error));
});

ethereumButton.addEventListener("click", () => {
  getAccount();
});

async function getAccount() {
  accounts = await provider // Or window.ethereum if you don't support EIP-6963.
    .request({ method: "eth_requestAccounts" });
}
```

The following HTML displays the buttons:

```html title="index.html"
<button class="enableEthereumButton btn">Enable Ethereum</button>
<button class="sendEthButton btn">Send ETH</button>
```

## Transaction parameters

The transaction parameters depend on the [transaction type](/services/concepts/transaction-types).
The following are examples of transaction objects for each type:

<Tabs>
<TabItem value="Legacy transaction">

```js
{
  nonce: "0x0", // Number of transactions made by the sender before this one.
  gasPrice: "0x09184e72a000", // Gas price, in wei, provided by the sender.
  gasLimit: "0x2710", // Maximum gas provided by the sender.
  to: "0x0000000000000000000000000000000000000000", // Address of the recipient. Not used in contract creation transactions.
  value: "0x0", // Value transferred, in wei.
  data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Used for defining contract creation and interaction.
  v: "0x1", // ECDSA recovery ID.
  r: "0xa07fd6c16e169f0e54b394235b3a8201101bb9d0eba9c8ae52dbdf556a363388", // ECDSA signature r.
  s: "0x36f5da9310b87fefbe9260c3c05ec6cbefc426f1ff3b3a41ea21b5533a787dfc", // ECDSA signature s.
}
```

</TabItem>
<TabItem value="Access list transaction">

```js
{
  nonce: "0x0", // Number of transactions made by the sender before this one.
  gasPrice: "0x09184e72a000", // Gas price, in wei, provided by the sender.
  gasLimit: "0x2710", // Maximum gas provided by the sender.
  to: "0x0000000000000000000000000000000000000000", // Address of the recipient. Not used in contract creation transactions.
  value: "0x0", // Value transferred, in wei.
  data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Used for defining contract creation and interaction.
  v: "0x1", // ECDSA recovery ID.
  r: "0xa07fd6c16e169f0e54b394235b3a8201101bb9d0eba9c8ae52dbdf556a363388", // ECDSA signature r.
  s: "0x36f5da9310b87fefbe9260c3c05ec6cbefc426f1ff3b3a41ea21b5533a787dfc", // ECDSA signature s.
  chainId: "0x1", // Chain ID of the transaction.
  accessList: [ // List of addresses and storage keys the transaction plans to access.
    {
      "address": "0xa02457e5dfd32bda5fc7e1f1b008aa5979568150",
      "storageKeys": ["0x0000000000000000000000000000000000000000000000000000000000000081"]
    }
  ],
  yParity: "0x1" // Parity of the y-value of a secp256k1 signature.
}
```

</TabItem>
<TabItem value="EIP-1559 transaction">

```js
{
  nonce: "0x0", // Number of transactions made by the sender before this one.
  gasLimit: "0x2710", // Maximum gas provided by the sender.
  maxPriorityFeePerGas: "0x0", // Maximum fee, in wei, the sender is willing to pay per gas above the base fee.
  maxFeePerGas: "0x6f4d3132b", // Maximum total fee (base fee + priority fee), in wei, the sender is willing to pay per gas.
  to: "0x0000000000000000000000000000000000000000", // Address of the recipient. Not used in contract creation transactions.
  value: "0x0", // Value transferred, in wei.
  data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Used for defining contract creation and interaction.
  v: "0x1", // ECDSA recovery ID.
  r: "0xa07fd6c16e169f0e54b394235b3a8201101bb9d0eba9c8ae52dbdf556a363388", // ECDSA signature r.
  s: "0x36f5da9310b87fefbe9260c3c05ec6cbefc426f1ff3b3a41ea21b5533a787dfc", // ECDSA signature s.
  chainId: "0x1", // Chain ID of the transaction.
  accessList: [], // List of addresses and storage keys the transaction plans to access.
  yParity: "0x1" // Parity of the y-value of a secp256k1 signature.
}
```

</TabItem>
</Tabs>

### Nonce

:::note
MetaMask ignores this field.
:::

In Ethereum, every transaction has a nonce, so each transaction can only be processed by the
blockchain once.
To be a valid transaction, either:

- The nonce must be `0`.
- A transaction with a nonce of the previous number, from the same account, must have been processed.

This means that transactions are always processed in order for a given account.

Nonces are easy to mess up, especially when a user is interacting with multiple applications with
pending transactions using the same account, potentially across multiple devices.
Because of this, MetaMask doesn't allow dapp developers to customize nonces.
Instead, MetaMask
[assists the user in managing their transaction queue themselves](https://support.metamask.io/manage-crypto/transactions/how-to-speed-up-or-cancel-a-pending-transaction/).

### Gas price

`gasPrice` is an optional parameter.
It is used in [legacy transactions](/services/concepts/transaction-types/#legacy-transactions) and specifies the gas price the sender is willing to pay for the transaction.
MetaMask automatically configures gas settings, but [users can also customize these settings](https://support.metamask.io/configure/transactions/how-to-customize-gas-settings/).

### Gas limit

`gasLimit` is an optional parameter.
It specifies the maximum amount of gas units the sender is willing to pay for the transaction.
MetaMask automatically sets this parameter, but [users can also customize their gas settings](https://support.metamask.io/configure/transactions/how-to-customize-gas-settings/).

### Max priority fee per gas

`maxPriorityFeePerGas` is an optional parameter.
It is used in [EIP-1559 transactions](/services/concepts/transaction-types/#eip-1559-transactions) and specifies the maximum fee the sender is willing to pay per gas above the base fee, in order to get their transaction prioritized.
MetaMask automatically sets this parameter, but [users can also customize their gas settings](https://support.metamask.io/configure/transactions/how-to-customize-gas-settings/).

### Max fee per gas

`maxFeePerGas` is an optional parameter.
It is used in [EIP-1559 transactions](/services/concepts/transaction-types/#eip-1559-transactions) and specifies the maximum total fee (base fee + priority fee) the sender is willing to pay per gas.
MetaMask automatically sets this parameter, but [users can also customize their gas settings](https://support.metamask.io/configure/transactions/how-to-customize-gas-settings/).

### To

The `to` parameter is a hex-encoded Ethereum address.
It's required for transactions with a recipient (all transactions except for contract creation).

Contract creation occurs when there is no `to` value but there is a `data` value.

### Value

The `value` parameter is a hex-encoded value of the network's native currency to send.
On Mainnet, this is [ether](https://www.ethereum.org/eth), which is denominated in wei.

These numbers are often far higher precision than native JavaScript numbers, and can cause
unpredictable behavior if not anticipated.
We recommend using [BN.js](https://github.com/indutny/bn.js/) when manipulating
values intended for Ethereum.

### Data

The `data` parameter is required for smart contract creation.

This field is also used for specifying contract methods and their parameters.
See the [Solidity ABI spec](https://solidity.readthedocs.io/en/develop/abi-spec.html) for more
information on how the data is encoded.

### Chain ID

:::note
MetaMask ignores this field.
:::

The chain ID is derived from the user's current selected network.
Use [`eth_chainId`](/wallet/reference/json-rpc-methods/eth_chainid) to get the user's chain ID.
If you need the network version, use [`net_version`](https://ethereum.org/en/developers/docs/apis/json-rpc/#net_version).

In the future, MetaMask might allow connecting to multiple networks at the same time, at which point
this parameter will become important, so it might be useful to be in the habit of including it now.
