---
description: Get started with the Smart Accounts Kit using Scaffold-ETH 2.
sidebar_label: Use Scaffold-ETH 2
keywords: [scaffold-eth, delegation, smart accounts, template]
---

# Use smart accounts with Scaffold-ETH 2

Use the Smart Accounts Kit extension for [Scaffold-ETH 2](https://docs.scaffoldeth.io/) to bootstrap a project in under two minutes.
This extension demonstrates the end-to-end flow for initializing a MetaMask smart account, creating and signing a delegation, and redeeming the delegation.

## Run the extension

1. Run the following command to install the Smart Accounts Kit extension:

    ```bash
    npx create-eth@latest -e metamask/gator-extension
    ```

2. Upon installation, you'll be asked the following prompts:

    ```bash
    ? Your project name: (my-dapp-example)
    ? What solidity framework do you want to use?
    ❯ hardhat
      foundry
      none
    ```

    Once you've answered the prompts, the extension will create the project using the specified settings.

3. Navigate into the project's `nextjs` package:

    ```bash
    cd my-dapp-example/packages/nextjs
    ```

4. Create a `.env.local` file:

    ```bash
    cp .env.example .env.local
    ```

    Fill in the `NEXT_PUBLIC_PIMLICO_API_KEY` environment variable with your [Pimlico API key](https://docs.pimlico.io/guides/create-api-key#create-api-key).

5. In root of your project, start the development server:

    ```bash
    yarn start
    ```

    Navigate to the project in your browser:

    <p align="center">
    <img src={require("../assets/scaffold-eth.png").default} alt="Scaffold-ETH 2 Smart Accounts Kit" class="appScreen" />
    </p>

6. Connect your MetaMask wallet on the Sepolia testnet.
   In the **MetaMask Smart Accounts & Delegation** section, follow the prompts to deploy a delegator account, create a delegate wallet, create a delegation, and redeem a delegation.
   You can view the completed transaction on Etherscan.
