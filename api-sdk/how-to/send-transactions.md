import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Send transactions

Transactions are a formal action on a blockchain.
They're always initiated in MetaMask with a call to the `eth_sendTransaction` method.
They can involve a simple sending of ether, sending tokens, creating a new smart contract, or
changing state on the blockchain in any number of ways.
They're always initiated by a signature from an _external account_, or a simple key pair.

In MetaMask, using the `ethereum.request` method directly, sending a transaction involves
composing an options object like this:

```javascript
const transactionParameters = {
  nonce: '0x00', // ignored by MetaMask
  gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
  gas: '0x2710', // customizable by user during MetaMask confirmation.
  to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
  from: ethereum.selectedAddress, // must match user's active address.
  value: '0x00', // Only required to send ether to the recipient from the initiating external account.
  data:
    '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
  chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
};

// txHash is a hex string
// As with any RPC call, it may throw an error
const txHash = await ethereum.request({
  method: 'eth_sendTransaction',
  params: [transactionParameters],
});
```

## Example

<Tabs>
<TabItem value="html" label="HTML" default>

```html
<button class="enableEthereumButton btn">Enable Ethereum</button>
<button class="sendEthButton btn">Send Eth</button>
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const ethereumButton = document.querySelector('.enableEthereumButton');
const sendEthButton = document.querySelector('.sendEthButton');

let accounts = [];

//Sending Ethereum to an address
sendEthButton.addEventListener('click', () => {
  ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
          value: '0x29a2241af62c0000',
          gasPrice: '0x09184e72a000',
          gas: '0x2710',
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
});

ethereumButton.addEventListener('click', () => {
  getAccount();
});

async function getAccount() {
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
}
```

</TabItem>
</Tabs>

## Transaction parameters

Many transaction parameters are handled by MetaMask, but it's good to know what all the parameters do.

### Nonce

MetaMask ignores this field.

In Ethereum every transaction has a nonce.
This is so that each transaction can only be processed by the blockchain once.
Additionally, to be a valid transaction, the nonce must either be `0`, or a transaction with the
previous number must have already been processed.

That means that transactions are always processed in order for a given account, and so incrementing
nonces is very sensitive and easy to mess up, especially when a user is interacting with multiple
applications with pending transactions using the same account, potentially across multiple devices.

For these reasons, MetaMask currently doesn't provide application developers any way to customize
the nonce of transactions it suggests.
Instead, MetaMask
[assists the user in managing their transaction queue themselves](https://metamask.zendesk.com/hc/en-us/articles/360015489251).

### Gas price

Gas price is an optional parameter, and best used on private blockchains.

In Ethereum, every transaction specifies a price for the gas that it consumes.
To maximize their profit, block producers pick pending transactions with higher gas prices first
when creating the next block.
This means that a high gas price usually causes your transaction to be processed faster, at the cost
of greater transaction fees.
Note that this may not be true for, for example, Layer 2 networks, which may have a constant gas
price or no gas price at all.

In other words, while you can ignore this parameter on MetaMask's default networks, you may want to
include it in situations where your application knows more about the target network than we do.
On our default networks, MetaMask allows users to choose between slow, medium, and fast options for
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
On mainnet, this is [ether](https://www.ethereum.org/eth), which is denominated in wei.

Please note that these numbers often used in Ethereum are far higher precision than native
JavaScript numbers, and can cause unpredictable behavior if not anticipated.
For this reason, we recommend using [BN.js](https://github.com/indutny/bn.js/) when manipulating
values intended for the blockchain.

### Data

The `data` parameter is required for smart contract creation.

This field is also used for specifying contract methods and their parameters.
See the [solidity ABI spec](https://solidity.readthedocs.io/en/develop/abi-spec.html) for more
information on how the data is encoded.

### Chain ID

MetaMask currently ignores this field.
The chain ID is derived from the user's current selected network at `ethereum.networkVersion`.

In the future, we might allow a way to connect to multiple networks at once, at which point this
parameter will become important, so it may be useful to be in the habit of including it now.
