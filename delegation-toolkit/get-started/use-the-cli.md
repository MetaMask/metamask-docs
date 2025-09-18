---
description: Get started with the MetaMask Delegation Toolkit using the `@metamask/create-gator-app` CLI.
sidebar_label: Use the CLI
keywords: [CLI, delegation, smart accounts, template]
---

# Use the Delegation Toolkit CLI

Use the `@metamask/create-gator-app` interactive CLI to bootstrap a project with the MetaMask Delegation Toolkit in under two minutes. 
The CLI automatically installs the required dependencies and sets up a project structure using a selected template,
allowing you to focus on building your dapp.

## Run the CLI

Run the following command to automatically install the `@metamask/create-gator-app` package:

```bash
npx @metamask/create-gator-app@latest
```

Upon installation, you'll be asked the following prompts:

```bash
? What is your project named? (my-gator-app)
? Pick a framework: (Use arrow keys) 
❯ nextjs
  vite-react
? Pick a template: (Use arrow keys)
❯ MetaMask Smart Accounts Starter
  MetaMask Smart Accounts & Delegation Starter
  Experimental: ERC7715 Permissions starter
? Pick a package manager: (Use arrow keys)
❯ npm 
  yarn 
  pnpm 
```

Once you've answered the prompts with the required configuration and selected a template, the CLI will create the 
project using the specified name and settings.
See the following section to learn more about available CLI configurations. 

## Options

The CLI provides the following options to display CLI details, and further customize the template configuration.

| Option              | Description                                                                                                                                                 |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `-v` or `--version` | Check the current version of the `@metamask/create-gator-app` CLI.                                                                                                    |
| `-h` or `--help`    | Display the available options.                                                                                                                              |
| `--skip-install`    | Skip the installation of dependencies.                                                                                                                      |
| `--add-web3auth` | Add [MetaMask Embedded Wallets (previously Web3Auth)](/embedded-wallets) as a signer for the delegator account.<br/>Supported templates:<br/>- MetaMask Smart Accounts Starter<br/>- MetaMask Smart Accounts & Delegation Starter |
| `--add-llm-rules`   | Add LLM rules for your IDE. Supported in the Experimental: ERC7715 Permissions Starter template.                                                                 |

## Examples

### MetaMask Embedded Wallets configuration

To create a project that uses [MetaMask Embedded Wallets](/embedded-wallets) as the signer for your delegator 
account, use the `--add-web3auth` option with `@metamask/create-gator-app`:

```bash
npx @metamask/create-gator-app --add-web3auth
```

You'll be prompted to provide additional Web3Auth configuration details:

```bash
? Which Web3Auth network do you want to use? (Use arrow keys)
❯ Sapphire Devnet 
  Sapphire Mainnet 
```

### LLM rules

To create a project with LLM rules tailored to your preferred IDE, use the `--add-llm-rules` option with `@metamask/create-gator-app`:

```bash
npx @metamask/create-gator-app --add-llm-rules
```

You'll be prompted to select your IDE.
Currently, only Cursor and Windsurf are supported.

```bash
? Which IDE's LLM rules would you like to copy? (Use arrow keys)
  Cursor 
  Windsurf 
❯ Both 
```

## Supported templates

| Template                                           | Next.js | Vite React |
|----------------------------------------------------|---------|------------|
| MetaMask Smart Accounts Starter                    | ✅       | ✅         |
| MetaMask Smart Accounts &amp; Delegation Starter   | ✅       | ✅         | 
| Experimental: ERC7715 Permissions starter          | ✅       |            |
