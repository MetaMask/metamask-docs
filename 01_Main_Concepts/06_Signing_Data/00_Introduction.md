# Signing Data with MetaMask

If you'd like to jump to some working signature examples, [you can visit this repository](https://github.com/danfinlay/js-eth-personal-sign-examples).

If you'd like to read our JavaScript implementations of these methods, they are all available in the npm package [eth-sig-util](https://github.com/MetaMask/eth-sig-util).

## A Brief History

There are currently five signing methods in MetaMask, and you might wonder the history of these methods. Studying the history of these methods has some lessons in it for the emergent lessons of decentralized standards emergence. Our current five methods are:

- `eth_sign`
- `personal_sign`
- `signTypedData` (currently identical to `signTypedData_v1`)
- `signTypedData_v1`
- `signTypedData_v3`

There are likely to be many more over time. When MetMask first started, the Provider API wasn't designed to be exposed to untrusted websites, and so some considerations weren't taken as seriously as they were later.

In particular, the method `eth_sign` is an open-ended signing method that allows signing an arbitrary hash, which means it can be used to sign transactions, or any other data, making it a dangerous phishing risk.

For this reason, we make this method show the most frightening possible message to the user, and generally discourage using this method in production. However, some applications (usually admin panels internal to teams) use this method for the sake of its ease of use, and so we have continued to support it for the sake of not breaking the workflows of active projects.

Eventually, the [`personal_sign` spec](https://github.com/ethereum/go-ethereum/pull/2940) was proposed, which added a prefix to the data so it could not impersonate transactions. We also made this method able to display human readable text when UTF-8 encoded, making it a popular choice for site logins.

However, the text-prefix made those signatures expensive to verify on-chain, and so with the help of the [0xProtocol](https://0xproject.com/) team and [SpankChain](https://spankchain.com/), the [EIP 712](https://eips.ethereum.org/EIPS/eip-712) spec was written.

The strange part of EIP 712, and this decentralized standards ecosystem, is that the proposal changed several times while retaining the same EIP. This means what we initially implemented as `signTypedData` was the earliest proposed version, while other groups implemented later versions under the same method name.

To avoid compatibility issues between clients, we recommend using the hard-versioned method names `signTypedData_v1` and `signTypedData_v2`.

In the future, it may help to have method names include a hash of their exact proposal, since in a decentralized ecosystem, there is no absolute source of truth of wha ta given name should map to. Instead, we are forced to invent new patterns of collaboration, where we can drive forward and innovate, while simultaneously avoiding creating a brittle ecosystem by changing our meanings out from under the words.

I hope this has been a useful introduction to the history of our signing methods!

