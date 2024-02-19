---
description: Send transactions using eth_sendTransaction.
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Send transactions

You can send a transaction in MetaMask using the
[`eth_sendTransaction`](/wallet/reference/eth_sendTransaction)
RPC method.

For example, the following JavaScript gets the user's accounts and sends a transaction when they
select each button, and the following HTML displays the buttons.

<Tabs>
<TabItem value="JavaScript">

```javascript
const ethereumButton = document.querySelector(".enableEthereumButton");
const sendEthButton = document.querySelector(".sendEthButton");

let accounts = [];

// Send Ethereum to an address
sendEthButton.addEventListener("click", () => {
    ethereum
        .request({
            method: "eth_sendTransaction",
            // The following sends an EIP-1559 transaction. Legacy transactions are also supported.
            params: [
                {
                    // The user's active address.
                    from: accounts[0],
                    // Required except during contract publications.
                    to: <recipient address>,
                    // Only required to send ether to the recipient from the initiating external account.
                    value: <value in wei to send>,
                    // Customizable by the user during MetaMask confirmation.
                    gasLimit: '0x5028',
                    // Customizable by the user during MetaMask confirmation.
                    maxPriorityFeePerGas: '0x3b9aca00',
                    // Customizable by the user during MetaMask confirmation.
                    maxFeePerGas: '0x2540be400',
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
    accounts = await ethereum.request({ method: "eth_requestAccounts" });
}
```

</TabItem>
<TabItem value="HTML">

```html
<button class="enableEthereumButton btn">Enable Ethereum</button>
<button class="sendEthButton btn">Send ETH</button>
```

</TabItem>
</Tabs>

## Transaction parameters

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
[assists the user in managing their transaction queue themselves](https://metamask.zendesk.com/hc/en-us/articles/360015489251).

### Gas price

Gas price is an optional parameter, and best used on private blockchains.

In Ethereum, every transaction specifies a price for the gas it consumes.
To maximize their profit, block producers pick pending transactions with higher gas prices first
when creating the next block.
This means that a high gas price usually causes your transaction to be processed faster, at the cost
of greater transaction fees.

Some networks, such as Layer 2 networks, might have a constant gas price or no gas price.
So while you can ignore this parameter on MetaMask's default networks, you might include it when
your dapp knows more about the target network than MetaMask does.
On the default networks, MetaMask allows users to choose between slow, medium, and fast options for
their gas price.

Read about [how to use advanced gas controls](https://metamask.zendesk.com/hc/en-us/articles/360022895972).

### Gas limit

Gas limit is an optional parameter, since MetaMask automatically calculates a reasonable gas price.

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
Use [`eth_chainId`](/wallet/reference/eth_chainid) to get the user's chain ID.
If you need the network version, use [`net_version`](https://ethereum.org/en/developers/docs/apis/json-rpc/#net_version).

In the future, MetaMask might allow connecting to multiple networks at the same time, at which point
this parameter will become important, so it might be useful to be in the habit of including it now.
