---
description: Configure and connect to a Ganache development network.
sidebar_position: 2
---

# Run a development network

You can run a personal Ethereum development network using [Hardhat](https://hardhat.org/),
which allows you to develop a dapp in a secure test environment.

:::note
When using a local development blockchain such as Hardhat or
[anvil](https://book.getfoundry.sh/anvil/#overview-of-anvil), your node must calculate gas to make
transactions on MetaMask.
:::

## Connect to Hardhat

Follow the [Hardhat Quick Start](https://hardhat.org/hardhat-runner/docs/getting-started#quick-start)
to set up a Hardhat development network.

In your `hardhat.config.js` file, specify your
[MetaMask seed phrase](https://support.metamask.io/hc/en-us/articles/360015290032-How-to-reveal-your-Secret-Recovery-Phrase)
in the [`accounts`](https://hardhat.org/hardhat-network/docs/reference#accounts) field of the
`networks.hardhat` configuration:

```js title="hardhat.config.js"
module.exports = {
  networks: {
    hardhat: {
      accounts: {
        mnemonic: "<your MetaMask seed phrase>",
      },
    },
  },
};
```

Hardhat automatically gives each of your first 20 accounts 10000 test ether (you can modify
these numbers in the [`accounts`](https://hardhat.org/hardhat-network/docs/reference#accounts)
configuration), which makes it easy to start development.

:::caution important
Your seed phrase controls all your accounts, so we recommend keeping at least one seed phrase for
development, separate from any used to store real value.
You can manage multiple seed phrases by using multiple browser profiles, each with its own
MetaMask installation.
:::

To run a Hardhat development network and expose a JSON-RPC interface, run `npx hardhat node`.
You can now connect MetaMask to your development network RPC URL, `http://127.0.0.1:8545/`.

In the MetaMask extension:

1. In the upper left corner, select the network you're currently connected to.
1. Select **Add network**.
1. Select **Add a network manually**.
1. Enter the RPC URL of your Hardhat network, `http://127.0.0.1:8545/`.
1. Enter MetaMask's default chain ID for Hardhat, `31337`.

## Reset your local nonce calculation

If you restart your development network, you can accidentally confuse MetaMask
because it calculates the next [nonce](../send-transactions.md#nonce) based on both the
network state *and* the known sent transactions.

To clear MetaMask's transaction queue and reset its nonce calculation, go to **Settings > Advanced**
and select **Reset account**.

## Next steps

Once you have your development environment set up and development network running, you can
[connect to MetaMask](/wallet/how-to/connect) by setting up MetaMask SDK, detecting MetaMask, detecting a user's
network, and accessing a user's accounts.

For an end-to-end example, you can also follow the
[Create a simple React dapp](../../tutorials/react-dapp-local-state.md) tutorial.
