# Sending Transactions

Transactions are a formal action on a blockchain. They are always initiated in MetaMask with a call to the `eth_sendTransaction` method. They can involve a simple sending of ether, may result in sending tokens, creating a new smart contract, or changing state on the blockchain in any number of ways. They are always initiated by a signature from an _external account_, or a simple key pair.

In MetaMask, using the `ethereum.request` method directly, sending a transaction will involve composing an options object like this:

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

<SendTransaction />

:::: tabs :options="{ useUrlFragment: false }"

::: tab HTML

```html
<button class="enableEthereumButton btn">Enable Ethereum</button>
<button class="sendEthButton btn">Send Eth</button>
```

:::

::: tab JavaScript

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

:::

::::

## Transaction Parameters

Many transaction parameters are handled for you by MetaMask, but it's good to know what all the parameters do.

### Nonce [ignored]

This field is ignored by MetaMask.

In Ethereum every transaction has a nonce. This is so that each transaction can only be processed by the blockchain once. Additionally, to be a valid transaction, the nonce must either be `0`, or a transaction with the previous number must have already been processed.

That means that transactions are always processed in order for a given account, and so incrementing nonces is a very sensitive matter that is easy to mess up, especially when a user is interacting with multiple applications with pending transactions using the same account, potentially across multiple devices.

For these reasons, MetaMask currently does not provide application developers any way to customize the nonce of transactions it suggests. Instead, MetaMask [assists the user in managing their transaction queue themselves](https://metamask.zendesk.com/hc/en-us/articles/360015489251).

### Gas Price [optional]

Optional parameter - best used on private blockchains.

In Ethereum, every transaction specifies a price for the gas that it will consume. To maximize their profit, block producers will pick pending transactions with higher gas prices first when creating the next block. This means that a high gas price will usually cause your transaction to be processed faster, at the cost of greater transaction fees. Note that this may not be true for e.g. Layer 2 networks, which may have a constant gas price or no gas price at all.

In other words, while you can ignore this parameter on MetaMask's default networks, you may want to include it in situations where your application knows more about the target network than we do. On our default networks, MetaMask allows users to choose between "slow," "medium," and "fast" options for their gas price. To learn how to use advanced gas controls [visit here](https://metamask.zendesk.com/hc/en-us/articles/360022895972).

### Gas Limit [optional]

Optional parameter. Rarely useful to Dapp developers.

Gas limit is a highly optional parameter, and we automatically calculate a reasonable price for it. You will probably know that your smart contract benefits from a custom gas limit if it ever does for some reason.

### To [semi-optional]

A hex-encoded Ethereum address. Required for transactions with a recipient (all transactions except for contract creation).

Contract creation occurs when there is no `to` value but there is a `data` value.

### Value [optional]

Hex-encoded value of the network's native currency to send. On the Main Ethereum network, this is [ether](https://www.ethereum.org/eth), which is denominated in _wei_, which is `1e-18` ether.

Please note that these numbers often used in Ethereum are far higher precision than native JavaScript numbers, and can cause unpredictable behavior if not anticipated. For this reason, we highly recommend using [BN.js](https://github.com/indutny/bn.js/) when manipulating values intended for the blockchain.

### Data [semi-optional]

Required for smart contract creation.

This field is also used for specifying contract methods and their parameters. You can learn more about how that data is encoded on [the solidity ABI spec](https://solidity.readthedocs.io/en/develop/abi-spec.html).

### Chain ID [currently ignored]

Chain ID is currently derived by the user's current selected network at `ethereum.networkVersion`. In the future we will probably allow a way to connect to multiple networks at once, at which point this parameter will become important, so it may be useful to be in the habit of including now.
