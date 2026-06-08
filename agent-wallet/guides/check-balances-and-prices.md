---
description: Check wallet balances, token prices, and discover tokens with mm.
keywords: [MetaMask, Agent Wallet, balance, price, market data, mm]
---

# Check balances and prices

Query wallet balances, spot prices, and token metadata without submitting transactions.

## Ask your agent

```text
You (to your agent): "What's my USDC balance on Base?"
```

```text
You (to your agent): "What's the current price of ETH?"
```

```text
You (to your agent): "Show me trending tokens on Base"
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
mm wallet balance --chain 8453
mm wallet balance --token USDC
```

If `--token` with a symbol returns no balance or an error, pass the ERC-20 contract address for that
chain. Run `mm token list search --query <symbol> --chain <chain-id>` to look up the address.

## Spot prices

```bash
mm price spot --asset-ids <ASSET_IDS> --vs USD
mm price currencies
mm price networks
```

Use `mm token assets` to resolve asset identifiers for tokens you care about.

## Token discovery

```bash
mm token list popular --chain ethereum
mm token list search --query uniswap --chain ethereum
mm token list trending --chain base
mm token networks
```

## Supported chains

```bash
mm chains list
```

## Related commands

See [Commands reference](../reference/commands.md) for `mm wallet balance`, `mm price`, and
`mm token`.
