---
description: Learn about the Snaps Keyring API.
---

# Keyring API

The Keyring API brings deeper integration for custom EVM accounts inside MetaMask. Before the Keyring API, custom EVM accounts such as ERC-4337, MPC accounts, etc. needed to be shown separately, in a companion Dapp. Now these custom accounts can live alongside regular MetaMask accounts in the UI. Dapps can connect to them using `eth_requestAccounts`, and seamlessly interact with them using `eth_sendTransaction`, `personal_sign`, etc.

Find out more about [how to implement custom EVM accounts using the Keyring API](../how-to/integrate-custom-evm-accounts.md).