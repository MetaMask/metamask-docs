---
description: Supply and withdraw from yield vaults using `mm earn` commands.
keywords: [MetaMask, Agent Wallet, earn, yield, DeFi, vaults, mm]
---

# Earn with yield vaults

Browse yield vaults, supply tokens, and withdraw positions using the `mm earn` commands.
Agent Wallet routes supply and withdraw operations through LiFi for cross-chain support.

## Ask your agent

```text
You (to your agent): "Show me the best yield vaults for USDC on Base"
```

```text
You (to your agent): "Supply 100 USDC to a vault on Base"
```

```text
You (to your agent): "Withdraw all my USDC from the Aave vault on Base"
```

Your agent lists available vaults, compares APYs and TVL, confirms your choice, then executes.

## Prerequisites

- [Quickstart](../quickstart.md) completed
- Sufficient token balance on the source chain

## Browse vaults

List available yield vaults with APY and TVL data:

```bash
mm earn markets [--chain <chain-id>] [--protocol <protocol>] [--min-tvl <amount>]
```

Filter by chain, protocol, or minimum TVL to find the best opportunities.

## Check your positions

View your current yield positions:

```bash
mm earn positions
```

## Supply to a vault

Supply tokens to a yield vault:

```bash
mm earn supply --token <TOKEN> --amount <AMOUNT> [--chain <chain-id>] [--from-chain <chain-id>]
```

| Flag           | Required | Description                           |
| -------------- | -------- | ------------------------------------- |
| `--token`      | Yes      | Token symbol or contract address      |
| `--amount`     | Yes      | Human-readable amount to supply       |
| `--chain`      | No       | Destination chain for the vault       |
| `--from-chain` | No       | Source chain if supplying cross-chain |

The CLI automatically handles ERC-20 approval when the vault's allowance is insufficient.

## Withdraw from a vault

Withdraw tokens from a yield vault:

```bash
mm earn withdraw --token <TOKEN> --amount <AMOUNT> [--chain <chain-id>]
```

Use `--amount all` to withdraw your full position.
For Aave rebasing aTokens, `--amount all` applies a small dust buffer to avoid revert from interest
accrual between the query and the transaction.

## Cross-chain supply

Supply from a different chain than the vault's chain by passing `--from-chain`:

```bash
mm earn supply --token USDC --amount 100 --chain 8453 --from-chain 1
```

This bridges and supplies in a single operation.

## Common pitfalls

:::caution Approval required
When supplying for the first time, the CLI sends an ERC-20 approval transaction before the supply
transaction. In server-wallet mode, this may require 2FA approval depending on your trading mode.
:::

:::note Withdraw reverts
If a full withdrawal reverts, retry with a slightly smaller amount. Rebasing tokens (like Aave
aTokens) accrue interest between the balance query and transaction execution.
:::

## Related commands

- [`mm earn`](../reference/commands.md#mm-earn) in the commands reference
- [Check balances and prices](check-balances-and-prices.md)
