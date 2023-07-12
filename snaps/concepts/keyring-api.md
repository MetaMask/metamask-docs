---
description: Learn about the Snaps Keyring API.
---

# Keyring API

## Introduction

The Keyring API brings deeper integration for custom EVM accounts in the MetaMask UI. Before the Keyring API, custom EVM accounts such as ERC-4337, MPC accounts, etc. needed to be shown separately, in a companion Dapp. Now these custom accounts can live alongside regular MetaMask accounts in the UI.

## How it works...

- A new snap method, `snap_manageAccounts`, allows your snap to create/update/delete your snap's custom accounts straight into the MetaMask UI, by responding to RPC requests.
- Your snap creates a class that implements the [`Keyring`](../reference/keyring-api/modules.md#keyring) interface.