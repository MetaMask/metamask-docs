---
description: Trade Polymarket prediction markets with mm predict commands.
keywords: [MetaMask, Agent Wallet, predict, Polymarket, mm]
---

# Trade prediction markets

Search markets, fund your predict deposit wallet, and place orders on Polymarket through
`mm predict`.

## Prerequisites

- [Quickstart](../get-started/quickstart.md) completed
- USDC on Base (or the chain required by your predict setup) for deposits

## First-time setup

1. Run one-time setup:

   ```bash
   mm predict setup
   ```

2. Fund the predict deposit wallet:

   ```bash
   mm predict deposit --amount <AMOUNT>
   ```

3. Confirm balance:

   ```bash
   mm predict balance
   ```

## Search and place an order

1. Search markets:

   ```bash
   mm predict markets search "<QUERY>" --limit 5
   ```

2. Preview a quote:

   ```bash
   mm predict quote --token-id <TOKEN_ID> --side buy --size <SIZE> [--limit-price <PRICE>]
   ```

3. Place the order:

   ```bash
   mm predict place --token-id <TOKEN_ID> --side buy --size <SIZE> [--limit-price <PRICE>]
   ```

4. View open orders and positions:

   ```bash
   mm predict orders
   mm predict positions
   ```

## Common pitfalls

:::caution One-time setup is required
Polymarket trading routes through a dedicated predict deposit wallet. Run `mm predict setup`
followed by `mm predict deposit --amount <N>` before placing your first order. Skipping setup can
produce `JsonRpcError: execution reverted` on deposit.
:::

## Related commands

See [`mm predict`](../reference/commands.md#mm-predict) in the commands reference.
