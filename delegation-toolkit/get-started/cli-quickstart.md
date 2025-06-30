---
description: Get started with the MetaMask Delegation Toolkit using the `create-gator-app` CLI.
sidebar_position: 5
sidebar_label: CLI quickstart
---

# Delegation Toolkit CLI quickstart

Use the `create-gator-app` interactive CLI to bootstrap a project with the MetaMask Delegation Toolkit in under two minutes. 
The CLI automatically installs the required dependencies and sets up a project structure using a selected template,
allowing you to focus on building your dapp.

## Run the CLI

Run the following command to automatically install the `create-gator-app` package:

```bash
npx create-gator-app@latest
```

Upon installation, you'll be asked the following prompts:

```bash
? What is your project named? (my-gator-app)
? Pick a framework: (Use arrow keys) 
❯ nextjs
  vite-react
? Pick a template: (Use arrow keys)
❯ Basic Delegator app with NextJS 
  Experimental: Basic Gator app to try out ERC7715 Permissions
? Pick a package manager: (Use arrow keys)
❯ npm 
  yarn 
  pnpm 
```

Once you've answered the prompts with the required configuration and selected a template, the CLI will create the project using the specified name and settings.
See the following section to learn more about available CLI configurations. 

## Options

The CLI provides the following options to display CLI details, and further customize the template configuration.

| Option              | Description                                                                                                                                                 |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `-v` or `--version` | Check the current version of the `create-gator-app` CLI.                                                                                                    |
| `-h` or `--help`    | Display the available options.                                                                                                                              |
| `--skip-install`    | Skip the installation of dependencies.                                                                                                                      |
| `--add-web3auth`    | Add Web3Auth Embedded Wallet as a signer for the delegator account. <br/>Supported templates: <ul><li>Next.js starter</li><li> Vite React starter</li></ul> |
| `--add-llm-rules`   | Add LLM rules for your IDE. Supported templates: <ul><li>Next.js ERC-7715 starter</li></ul>                                                                 |

## Examples

### Web3Auth configuration

To create a project that uses [Web3Auth](https://web3auth.io/docs/) Embedded Wallet as the signer for your delegator account, use the `--add-web3auth` option with `create-gator-app`:

```bash
npx create-gator-app --add-web3auth
```

You'll be prompted to provide additional Web3Auth configuration details:

```bash
? Which Web3Auth network do you want to use? (Use arrow keys)
❯ Sapphire Devnet 
  Sapphire Mainnet 
```

### LLM rules

To create a project with LLM rules tailored to your preferred IDE, use the `--add-llm-rules` option with `create-gator-app`:

```bash
npx create-gator-app --add-llm-rules
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
| Basic dapp with delegation and redeem flow         | ✅       | ✅          |
| Experimental: Basic dapp with ERC-7715 permissions | ✅       |            | 
