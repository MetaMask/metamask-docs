# Eth Sign

The Eth Sign method is the oldest signing method in Ethereum, and can sign any binary data, making it a dangerous method that can potentially sign transactions or even [leak its private key](https://en.wikipedia.org/wiki/Chosen-ciphertext_attack).

You can read [our implementation here](https://github.com/MetaMask/eth-simple-keyring/blob/master/index.js#L61-L68).

Since this method is insecure, it should only be used for internal experiments or your own contracts that you interact with directly.

When prompted for this type of signature, users are shown an aggressive warning that inclines them to re-evaluate their trust of the site suggesting the signature.

You can read the [eth_sign API documentation here](https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sign).

