---
description: Learn about account abstraction, the delegator account flow, and account types.
sidebar_position: 1
---

# Delegator accounts

The MetaMask Delegation Toolkit enables you to create and manage *delegator accounts*.
Delegator accounts are [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) smart contract accounts (SCAs)
that support programmable account behavior and advanced features such as multi-signature approvals,
automated transaction batching, and custom security policies.
Unlike traditional wallets, which rely on private keys for every transaction, MetaMask delegator
accounts use smart contracts to govern account logic.

## Account abstraction (ERC-4337)

Account abstraction, specified by [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337), is a
mechanism that enables users to manage SCAs containing arbitrary verification logic.
ERC-4337 enables SCAs to be used as primary accounts in place of traditional private key-based
accounts, or externally owned accounts (EOAs).

ERC-4337 introduces the following concepts:

- **User operation** - A package of instructions signed by a user, specifying executions for
  the SCA to perform.
  User operations are collected and submitted to the network by bundlers.

- **Bundler** - A service that collects multiple user operations, packages them into a single transaction,
  and submits them to the network, optimizing gas costs and transaction efficiency.

- **Entry point contract** - A contract that validates and processes bundled user operations, ensuring they
  adhere to the required rules and security checks.

- **Paymasters** - Entities that handle the payment of gas fees on behalf of users, often integrated
  into SCAs to facilitate gas abstraction.

## Delegator account flow

The MetaMask delegator account flow is as follows:

1. **Account setup** - A user creates an SCA by deploying a smart contract, and initializing it with
   ownership and security settings.
   The user can customize the SCA in the following ways:

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

## Delegator account types

The MetaMask Delegation Toolkit supports two types of delegator accounts, each offering unique features and use cases.
See [Configure accounts and signers](../how-to/configure-delegator-accounts-signers.md) to learn how to use these different account types.

### Hybrid Delegator

The Hybrid Delegator is a flexible implementation that supports both an externally owned account (EOA) "owner" and any number of P256 (passkey) signers.
You can configure any of these signers as the signatory, and use them to sign on behalf of the delegator.

This type is referenced in the toolkit as `Implementation.Hybrid`.

### Multisig Delegator

The Multisig Delegator is an implementation that supports multiple signers with a configurable threshold for valid signatures, allowing for enhanced security and flexibility in account management. The signatory must have at least as many signers include as the threshold is configured for the account.

This type is referenced in the Toolkit as `Implementation.Multisig`.
