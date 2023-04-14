---
description: Configure and connect a Ganache development network.
---

# Run a development network

You can run a personal Ethereum development network using [Ganache](https://www.trufflesuite.com/ganache),
which allows you to develop a dapp in a secure test environment.
Follow the [Ganache quickstart](https://trufflesuite.com/docs/ganache/quickstart/) to set
up a development network.

When you create a Ganache workspace, enter your MetaMask seed phrase into
the **Account & Keys** setting.
Ganache automatically gives each of your first 10 accounts 100 test ether (you can configure
these numbers in **Accounts & Keys**), which makes it easy to start development.

:::caution important
Your seed phrase controls all your accounts, so we recommend keeping at least one seed phrase for
development, separate from any used to store real value.
You can manage multiple seed phrases by using multiple browser profiles, each with its own
MetaMask installation.
:::

In the **Server** setting of your workspace, find the hostname and port of your Ganache
network, which comprises the RPC URL of your network:

```text
http://<hostname>:<port>
```

In the MetaMask extension, connect to your Ganache network:

1. Select the network you're currently connected to.
1. Select **Add network**.
1. Select **Add a network manually**.
1. Enter the RPC URL of your network.
1. Enter MetaMask's default [chain ID](detect-network.md#chain-ids) for Ganache, `1337`.

## Reset your local nonce calculation

If you restart your development network, you can accidentally confuse MetaMask
because it calculates the next [nonce](../how-to/send-transactions.md#nonce) based on both the
network state *and* the known sent transactions.

To clear MetaMask's transaction queue and reset its nonce calculation, go to **Settings > Advanced**
and select **Reset account**.
