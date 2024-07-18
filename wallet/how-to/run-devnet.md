---
description: Configure and connect to a Ganache development network.
sidebar_position: 9
---

# Run a development network

You can run a personal Ethereum development network using [Hardhat](https://hardhat.org/hardhat-network/docs/overview#hardhat-network),
which allows you to develop a dapp in a secure test environment.

:::note
When using a local development blockchain such as Hardhat Network or
[anvil](https://book.getfoundry.sh/anvil/#overview-of-anvil), your node must calculate gas to make
transactions on MetaMask.
:::

## Connect to Hardhat Network

Follow these steps to connect MetaMask to Hardhat Network.

1. [Set up a Hardhat project.](https://hardhat.org/hardhat-runner/docs/guides/project-setup)

2. Create a new
   [MetaMask seed phrase](<https://support.metamask.io/hc/en-us/articles/360060826432-What-is-a-Secret-Recovery-Phrase-and-how-to-keep-your-crypto-wallet-secure#:~:text=Your%20Secret%20Recovery%20Phrase%20(SRP,are%20connected%20to%20that%20phrase.)>)
   specifically for development.

   :::caution important
   Your seed phrase controls all your accounts, so we recommend keeping at least one seed phrase for
   development, separate from any used to store real value.
   You can manage multiple seed phrases by using multiple browser profiles, each with its own
   MetaMask installation.
   :::

3. In your `hardhat.config.js` file, specify a
   [`networks` configuration](https://hardhat.org/hardhat-runner/docs/config#networks-configuration)
   with a `hardhat` network.
   In this `networks.hardhat` configuration:

   - Specify your MetaMask seed phrase in the
     [`accounts.mnemonic`](https://hardhat.org/hardhat-network/docs/reference#accounts) field.

     :::tip
     Alternatively, to prevent committing your seed phrase, we recommend adding your seed phrase to a
     [`.env` file](https://docs.infura.io/tutorials/developer-tools/javascript-dotenv) and using the
     `process.env` global variable in `hardhat.config.js`.
     :::

   - Specify the [chain ID `1337`](https://hardhat.org/hardhat-network/docs/metamask-issue) in the
     [`chainId`](https://hardhat.org/hardhat-network/docs/reference#chainid) field.

   For example:

   ```js title="hardhat.config.js"
   module.exports = {
     networks: {
       hardhat: {
         accounts: {
           mnemonic: process.env.SEED_PHRASE,
         },
         chainId: 1337,
       },
     },
   }
   ```

   Hardhat automatically gives each of your first 20 accounts 10000 test ether (you can modify
   these numbers in the [`accounts`](https://hardhat.org/hardhat-network/docs/reference#accounts)
   configuration), which makes it easy to start development.

4. Run `npx hardhat node` to run Hardhat Network and expose a JSON-RPC interface.

5. You can now connect MetaMask to your Hardhat Network RPC URL, `http://127.0.0.1:8545/`.
   In the MetaMask extension:

   1. In the upper left corner, select the network you're currently connected to.

   2. Select **Add network**.

   3. Select **Add a network manually**.

   4. Enter your Hardhat Network RPC URL, `http://127.0.0.1:8545/` (or `http://localhost:8545`).

   5. Enter your Hardhat Network chain ID, `1337` (or `0x539` in hexadecimal format).

   :::tip
   Alternatively, you can add Hardhat Network to MetaMask using
   [`wallet_addEthereumChain`](/wallet/reference/wallet_addethereumchain/?AddEthereumChainParameter[rpcUrls][0]=http://127.0.0.1:8545&AddEthereumChainParameter[chainId]=0x539&AddEthereumChainParameter[chainName]=Hardhat&AddEthereumChainParameter[nativeCurrency][name]=testEth&AddEthereumChainParameter[nativeCurrency][symbol]=testEth&AddEthereumChainParameter[nativeCurrency][decimals]=18)
   in the interactive API playground.
   :::

## Reset your local nonce calculation

If you restart your development network, you can accidentally confuse MetaMask
because it calculates the next [nonce](send-transactions.md#nonce) based on both the
network state _and_ the known sent transactions.

To clear MetaMask's transaction queue and reset its nonce calculation, go to **Settings > Advanced**
and select **Reset account**.

## Next steps

Once you have your development environment set up and development network running, you can
[connect your dapp to MetaMask](../how-to/connect/index.md) by detecting MetaMask in the user's
browser and accessing their accounts.

For an end-to-end example, you can also follow the
[Create a simple React dapp](../tutorials/react-dapp-local-state.md) tutorial.
