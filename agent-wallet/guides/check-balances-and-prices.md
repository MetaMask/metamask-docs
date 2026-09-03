---
description: Check wallet balances, spot prices, token metadata, and transaction history with mm.
keywords: [MetaMask, Agent Wallet, balance, price, transaction history, market data, mm]
---

# Check balances and prices

Query wallet balances, spot prices, and token metadata without submitting transactions.

## Ask your agent

```text
You (to your agent): "What's my USDC balance?"
```

```text
You (to your agent): "What's the current price of ETH?"
```

```text
You (to your agent): "Show me trending tokens"
```

Read-only queries like these do not require confirmation before your agent runs them.

## Commands

1. Confirm your wallet address:

   ```bash
   mm wallet address
   ```

2. Query balances, prices, or token lists using the commands in the following sections.

## Wallet balance

```bash
mm wallet balance
mm wallet balance --chain-ids 8453
mm wallet balance --token USDC
```

If `--token` with a symbol returns no balance or an error, pass the ERC-20 contract address for that
chain. Run `mm token list search <symbol> --chain-ids <chain-id>` to look up the address.

## Spot prices

```bash
mm price spot --asset-ids <ASSET_IDS> --vs USD
mm price currencies
mm price networks
```

Use `mm token assets` to resolve asset identifiers for tokens you care about.

## Token discovery

```bash
mm token list popular --chain-id ethereum
mm token list search uniswap --chain-ids ethereum
mm token list trending --chain-id base
mm token networks
```

## Supported chains

```bash
mm chains list
```

## Transaction history

List recent transactions for your wallets:

```bash
mm tx history
mm tx history --chain-ids 1,8453 --limit 20
mm tx history --type out
```

## Related commands

See [Commands reference](../reference/commands.md) for `mm wallet balance`, `mm price`, `mm token`,
and [`mm tx history`](../reference/commands.md#mm-tx-history).
