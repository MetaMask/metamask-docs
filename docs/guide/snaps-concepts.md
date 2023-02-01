# Concepts

[[toc]]

## Accounts and Key Management

Snaps contain functionality that allows you to manage users' private keys, with their approval. This capability comes with great responsiblity on the part of the developer: misplaced or stolen private keys will lead to a complete loss of funds for the users of the Snap. Our team has developed some guidelines to help you assess the feasibility and sanity of your Snap project.

### Key Management Guidelines

The general guideline for responsible key management is:

> Don't create a situation where your user can lose money

In practice, here are some examples that would break the above policy:

1. Allowing extraction of private keys outside the snap in any way, especially through RPC or network connections
2. Arbitrary code execution with access to private keys
3. Not informing the user properly or not getting informed consent before doing a destructive operation, for example a transaction
4. Asking for consent but ignoring the decison
5. A bug that leads to any of the above

And here are some examples of abiding by the above policy:

1. Manipulation of the private keys, their storage in snaps' persistent storage, without them ever leaving the Snaps SES sandbox
2. Arbitrary code execution without access to destructive operations nor private keys
3. Doing destructive operations, one, multiple, or even creating an allowance without further confirmations, with prior informing the user of what's going to happen in an a way that a layman can understand and asking for consent

### How to derive keys

To derive a user's private keys, you need to:

1. Figure out whether you'll be using the BIP-32 or BIP-44 specifications to derive the user's private keys. BIP-44 is more strict in the structure and shape of the derivation paths, while BIP-32 allows for more flexibility.
2. Find out the derivation path that you need to use. For example, if you're trying to derive the same keys that MetaMask derives for user accounts, the path is of the form `m/44'/60'/0'/0/{account_index}`.
3. Add the required permission to your manifest file
4. Write code in your Snap to derive the keys

### Figuring out whether to use BIP-32 or BIP-44

### Finding out the derivation path

### Adding permissions to the manifest file

### Example of private key derivation