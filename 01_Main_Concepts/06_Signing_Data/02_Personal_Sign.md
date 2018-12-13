# Personal Sign

We introduced the `personal_sign` method in March 2017 with [this blog post](https://medium.com/metamask/the-new-secure-way-to-sign-data-in-your-browser-6af9dd2a1527).

It was designed to [alleviate security concerns](https://github.com/ethereum/go-ethereum/pull/2940) from `[eth_sign](./Eth_Sign)`, by only allowing the signing of a hash prefixed by a pre-defined string (`"\x19Ethereum Signed Message:\n"`).

The method signature is `personal_sign(hash, address)`.

You can [read our implementation here](https://github.com/MetaMask/eth-sig-util/blob/master/index.js#L193-L199), or read [a working client-side example](https://github.com/danfinlay/js-eth-personal-sign-examples/blob/master/index.js#L103-L161) here, or [read a guide to verifying these signatures in solidity](https://blog.ricmoo.com/verifying-messages-in-solidity-50a94f82b2ca).

