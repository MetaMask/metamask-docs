---
description: Learn about MetaMask Smart Accounts.
sidebar_position: 1
---

# MetaMask Smart Accounts

The MetaMask Delegation Toolkit enables you to create and manage MetaMask Smart Accounts.
Smart Accounts are [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) smart contract accounts
that support programmable account behavior and advanced features such as multi-signature approvals,
automated transaction batching, and custom security policies.
Unlike traditional wallets, which rely on private keys for every transaction, MetaMask Smart Accounts use smart contracts to govern account logic.

Smart Accounts are referenced in the toolkit as `MetaMaskSmartAccount`.

## Account abstraction (ERC-4337)

Account abstraction, specified by [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337), is a
mechanism that enables users to manage smart contract accounts containing arbitrary verification logic.
ERC-4337 enables smart contracts to be used as primary accounts in place of traditional private key-based
accounts, or externally owned accounts (EOAs).

ERC-4337 introduces the following concepts:

- **User operation** - A package of instructions signed by a user, specifying executions for
  the Smart Account to perform.
  User operations are collected and submitted to the network by bundlers.

- **Bundler** - A service that collects multiple user operations, packages them into a single transaction,
  and submits them to the network, optimizing gas costs and transaction efficiency.

- **Entry point contract** - A contract that validates and processes bundled user operations, ensuring they
  adhere to the required rules and security checks.

- **Paymasters** - Entities that handle the payment of gas fees on behalf of users, often integrated
  into Smart Accounts to facilitate gas abstraction.

## Smart Account implementation types

The MetaMask Delegation Toolkit supports three types of Smart Accounts, each offering unique features and use cases.

See [Configure accounts and signers](../how-to/create-smart-account/configure-accounts-signers.md) to learn how to use these different account types.

### Hybrid Smart Account

The Hybrid Smart Account is a flexible implementation that supports both an externally owned account (EOA) "owner" and any number of P256 (passkey) signers.
You can configure any of these signers as the signatory, and use them to sign any data, including user operations, on behalf of the Smart Account.

This type is referenced in the toolkit as `Implementation.Hybrid`.

### Multisig Smart Account

The Multisig Smart Account is an implementation that supports multiple signers with a configurable threshold for valid signatures, allowing for enhanced security and flexibility in account management.
The signatory must have at least as many signers include as the threshold is configured for the account.

This type is referenced in the toolkit as `Implementation.Multisig`.

### Stateless 7702 Smart Account

The Stateless 7702 Smart Account implementation represents an externally owned account (EOA) upgraded to
support Smart Account functionality as defined by [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702). This implementation enables EOAs to perform Smart Account operations, including the creation and management of delegations.

This type is referenced in the toolkit as `Implementation.Stateless7702`.

## Smart Account flow

The MetaMask Smart Account flow is as follows:

1. **Account setup** - A user creates a Smart Account by deploying a smart contract, and initializing it with
   ownership and security settings.
   The user can customize the Smart Account in the following ways:

    - **Account logic** - They can configure custom logic for actions such as multi-signature
      approvals, spending limits, and automated transaction batching.

    - **Security and recovery** - They can configure advanced security features such as two-factor
      authentication and mechanisms for account recovery involving trusted parties.

    - **Gas management** - They can configure flexible gas payment options, including alternative
      tokens or third-party sponsorship.

2. **User operation creation** - For actions such as sending transactions, a user operation is created with
   necessary details and signed by the configured signatory.

3. **Bundlers and mempool** - The signed user operation is submitted to a special mempool, where bundlers
   collect and package multiple user operations into a single transaction to save on gas costs.

4. **Validation and execution** - The bundled transaction goes to an entry point contract, which
   validates each user operation and executes them if they meet the smart contract's rules.

## Delegator accounts

Delegator accounts are a type of Smart Account that allows users to grant permission to other Smart Accounts or EOAs
to perform specific executions on their behalf, under defined rules and restrictions.
Learn more about [delegation](delegation.md).
