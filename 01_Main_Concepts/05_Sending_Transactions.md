# Sending Transactions

Transactions are a formal action on a blockchain. They are always initiated in MetaMask with a call to the `eth_sendTransaction` method. They can involve a simple sending of ether, may result in sending tokens, creating a new smart contract, or changing state on the blockchain in any number of ways. They are always initiated by a signature from an _external account_, or a simple key pair.

In MetaMask, using the `ethereum.sendAsync` method directly, sending a transaction will involve composing an options object like this:

```javascript
const transactionParameters = {
  nonce: '0x00', // ignored by MetaMask
  gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
  gasLimit: '0x2710',  // customizable by user during MetaMask confirmation.
  to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
  from: web3.eth.accounts[0], // must match user's active address.
  value: '0x00', // Only required to send ether to the recipient from the initiating external account.
  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
  chainId: 3 // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
}

ethereum.sendAsync({
  method: 'eth_sendTransaction',
  params: [transactionParameters],
  from: ethereum.selectedAddress,
}, callback)
```

## Transaction Parameters

Many transaction parameters are handled for you by MetaMask, but it's good to know what all the parameters do.

### Nonce [ignored]

This field is ignored by MetaMask.

In Ethereum every transaction has a nonce. This is so that each transaction can only be processed by the blockchain once. Additionally, to be a valid transaction, the nonce must either be `0`, or a transaction with the previous number must have already been processed.

That means that transactions are always processed in order for a given account, and so incrementing nonces is a very sensitive matter that is easy to mess up, especially when a user is interacting with multiple applications with pending transactions using the same account, potentially across multiple devices.

For these reasons, MetaMask currently does not provide application developers any way to customize the nonce of transactions it suggests, and instead assists the user in managing their transaction queue themselves.

### Gas Price [optional]

Optional parameter - best used on private blockchains.

In Ethereum, the pool of pending transactions offer their gas price as a sort of auction bid to the validators to include this transaction in a block in exchange for a transaction fee. That means high gas prices can mean faster processing, but also more expensive transactions.

MetaMask helps users select a competitive gas price on the Ethereum Main Network and popular test networks. We make requests to an API maintained by our friends at MyCrypto and allow users to choose between "slow," "medium," and "fast" options for their gas price. 

We cannot know about the gas market on all blockchains because it requires some deep analysis. For this reason, while you can safely ignore this parameter on our main hosted networks, you may want to suggest a gas price in situations where your application knows more about the target network than we do.

### Gas Limit [optional]

Optional parameter. Rarely useful to Dapp developers.

Gas limit is a highly optional parameter, and we automatically calculate a reasonable price for it. You will probably know that your smart contract benefits from a custom gas limit if it ever does for some reason.

### To [semi-optional]

A hex-encoded Ethereum address. Required for transactions with a recipient (all transactions except for contract creation).

Contract creation occurs when there is no `to` value but there is a `data` value.

### Value [optional]

Hex-encoded value of the network's native currency to send. On the Main Ethereum network, this is [ether](https://www.ethereum.org/ether), which is denominated in _wei_, which is `1e-18` ether.

Please note that these numbers often used in Ethereum are far higher precision than native JavaScript numbers, and can cause unpredictable behavior if not anticipated. For this reason, we highly recommend using [BN.js](https://github.com/indutny/bn.js/) when manipulating values intended for the blockchain.

### Data [semi-optional]

Required for smart contract creation.

This field is also used for specifying contract methods and their parameters. You can learn more about how that data is encoded on [the solidity ABI spec](https://solidity.readthedocs.io/en/develop/abi-spec.html).

### Chain ID [currently ignored]

Chain ID is currently derived by the user's current selected network at `ethereum.networkVersion`. In the future we will probably allow a way to connect to multiple networks at once, at which point this parameter will become important, so it may be useful to be in the habit of including now.

