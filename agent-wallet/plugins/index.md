---
title: Plugins overview
sidebar_label: Overview
description: Extend MetaMask Agent Wallet with plugins that add custom commands.
keywords: [MetaMask, Agent Wallet, plugin, extend, capabilities]
---

# Plugins overview

Plugins extend MetaMask Agent Wallet with custom commands.
A plugin is an npm package that adds native commands, discoverable in `mm help` and the REPL.
For example, a plugin can add `mm ens resolve` to resolve ENS names, or `mm x402` to pay for
paywalled APIs.

:::note Beta Notice

Plugins are a beta feature and are off by default.
Installing and running plugins are both blocked until you enable the feature.
:::

## What plugins can do

Plugins run inside Agent Wallet and use a curated context the host provides.
Each command declares the capabilities it needs, and you consent to them at install time.

| Capability       | Grants                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------- |
| `wallet-read`    | Read services such as balances, prices, and tokens, plus an authenticated EVM RPC client |
| `wallet-submit`  | Signing and transaction submission, still policy-gated by Agent Wallet                   |
| `network-manage` | Reserved for future network management                                                   |

A command with no capabilities can still run pure logic and prompt for inputs.
The session, CLI token, and Secret Recovery Phrase are host-only and never exposed to plugins.
See the [plugins reference](../reference/plugins.md) for the full list of what each capability
unlocks.

## Trust model

Plugins run in-process and unsandboxed.
Install-time consent plus MetaMask backend policy signing are the real trust boundaries.
Only install plugins from publishers you trust.

Installs from npm are consent-gated and fail closed if the package can't be verified.
Plugin lifecycle scripts such as `postinstall` never run.

## Get started

- [Install a plugin](install-a-plugin.md) to add commands published by others.
- [Build a plugin](build-a-plugin.md) to create your own, starting from the official template.
