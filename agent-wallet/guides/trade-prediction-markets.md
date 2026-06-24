---
description: Trade Polymarket prediction markets with mm predict commands.
keywords: [MetaMask, Agent Wallet, predict, Polymarket, mm]
---

# Trade prediction markets

<!-- vale off -->

Search markets, fund your predict deposit wallet, and place orders on Polymarket through
`mm predict`.

## Ask your agent

```text
You (to your agent): "Bet 10 USDT on YES for BTC 5-min price up"
```

```text
You (to your agent): "Show my open prediction market positions"
```

```text
You (to your agent): "Redeem my winning Polymarket positions"
```

Your agent runs one-time setup if needed, shows current odds, confirms your bet, then places the
order.

## Prerequisites

- [Quickstart](../quickstart.md) completed
- Polygon USDC.e in your owner EOA for `mm predict deposit` (converts to pUSD in the predict
  deposit wallet)

## First-time setup

1. Run one-time setup:

   ```bash
   mm predict setup --wait
   ```

   If the command returns a job ID instead of completing immediately, track it with
   `mm predict watch <JOB_ID> --wait`.

2. Fund the predict deposit wallet:

   ```bash
   mm predict deposit --amount <AMOUNT> --wait
   ```

3. Confirm balance:

   ```bash
   mm predict balance --sync
   ```

## Search and place an order

1. Search markets:

   ```bash
   mm predict markets search "<QUERY>" --limit 5
   ```

   Browse by event, series, or tag:

   ```bash
   mm predict events list --tag-slug politics --active
   mm predict series list --recurrence weekly
   mm predict tags list
   ```

2. Preview a quote:

   ```bash
   mm predict quote --token-id <TOKEN_ID> --side buy --size <SIZE> [--limit-price <PRICE>]
   ```

3. Inspect a market to get outcome token IDs:

   ```bash
   mm predict markets get <MARKET_SLUG_OR_ID>
   ```

4. Place the order:

   ```bash
   mm predict place --token-id <TOKEN_ID> --side buy --size <SIZE> --price <PRICE> [--order-type GTC|GTD|FOK|FAK]
   ```

   `--limit-price` applies to `mm predict quote` only. `mm predict place` requires `--price`
   (worst fill price per share, between 0 and 1).

5. View open orders and positions:

   ```bash
   mm predict orders
   mm predict positions
   mm predict portfolio
   ```

## Redeem winnings

List redeemable winning positions:

```bash
mm predict redeem list
```

Redeem one condition or all winning positions:

```bash
mm predict redeem <CONDITION_ID> --wait
mm predict redeem --all --wait
```

## Common pitfalls

:::caution One-time setup is required
Polymarket trading routes through a dedicated predict deposit wallet. Run `mm predict setup`
followed by `mm predict deposit --amount <N>` before placing your first order. Skipping setup can
produce `JsonRpcError: execution reverted` on deposit.
:::

## Related commands

See [`mm predict`](../reference/commands.md#mm-predict) in the commands reference.

<!-- vale on -->
