---
description: Register a contract's method names with users.
---

# Display a contract's method names

MetaMask uses the [Ethereum Signature Database](https://www.4byte.directory/) to display
method names on the confirmation screen.
For many common method names, such as token methods, this allows MetaMask to look up the method
names by their [method signature](https://solidity.readthedocs.io/en/v0.4.21/abi-spec.html).
However, sometimes you're using a method that isn't in that database, and MetaMask simply
displays **Contract Interaction** to the user.

To register your contract's method names so they show in the MetaMask interface,
[submit each method's signature to the Ethereum Signature Database](https://www.4byte.directory/submit/).
