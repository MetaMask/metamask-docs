# Register a contract's methods names

MetaMask uses the Parity on-chain registry of function signatures to display method names on the
confirm screen.
For many common method names, such as token methods, this allows MetaMask to successfully look up
the method names by their [method signature](https://solidity.readthedocs.io/en/v0.4.21/abi-spec.html).
However, sometimes you're using a method that isn't in that on-chain registry, and MetaMask simply
displays **Contract Interaction** to the user.

To add your contract's function names to this registry so it shows in the MetaMask interface, follow
these steps:

1. Go to the
    [Mainnet Parity signature registration contract on Etherscan](https://etherscan.io/address/0x44691b39d1a75dc4e0a0346cbb15e310e6ed1e86#writeContract).
1. Connect MetaMask.
1. Use Etherscan's write contract feature to input the string value (without quotes or spaces) to
    the register function.
    For example:

    `getOwners()`

    `execTransaction(address,uint256,bytes,uint8,uint256,uint256,uint256,address,address,bytes)`

1. Select **write**.
1. Approve the transaction in MetaMask (you only pay gas).

## Verify

`ethers.utils.keccak256('getOwners()') => 0xa0e67e2bdc0a6d8a09ccd6c353c9df590807ad66ff5e6630c4f31a86dfa84821`

Input the first 10 characters, `0xa0e67e2b`, into
[this demo app](https://jennypollack.github.io/function_signature_registry/) that checks the
on-chain registry (Mainnet or Rinkeby only).

### Use Remix

1. Paste the contract code from
    [bokky's blog post](https://www.bokconsulting.com.au/blog/a-quick-look-at-paritys-signature-registry-contract/)
    into [Remix](https://remix.ethereum.org).
1. Set the correct compiler version based on the contract.
1. Use Remix's write functionality to add to the registry.
1. You can look at the `FUNCTIONHASHES` section on Remix by loading the signature registry contract,
   and selecting **details** on the compile tab.

### Use `eth-method-registry`

You can also use the
[signature registry](https://rinkeby.etherscan.io/address/0x0c0831fb1ec7442485fb41a033ba188389a990b4)
deployed on Rinkeby.

[`eth-method-registry`](https://github.com/MetaMask/eth-method-registry) is used to lookup methods
in MetaMask.

:::note
MetaMask reads from the mainnet `eth-method-registry` endpoint, regardless of the user's network.
:::

For more details, see [this StackExchange answer](https://ethereum.stackexchange.com/questions/59678/metamask-shows-unknown-function-when-calling-method-send-function).
