---
description: Check wallet balances, token prices, and discover tokens with mm.
keywords: [MetaMask, Agent Wallet, balance, price, market data, mm]
---

# Check balances and prices

Query wallet balances, spot prices, and token metadata without submitting transactions.

## Wallet balance

```bash
mm wallet balance
mm wallet balance --chain 8453
mm wallet balance --token USDC
```

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
