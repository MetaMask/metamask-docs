---
description: Trade perpetual futures on Hyperliquid with mm perps commands.
keywords: [MetaMask, Agent Wallet, perps, Hyperliquid, mm]
---

# Trade perpetuals

Open, modify, and close perpetual positions on Hyperliquid through the `mm perps` commands.

## Prerequisites

- [Quickstart](../get-started/quickstart.md) completed
- USDC on a supported source chain for the initial deposit

## First-time setup

1. List venues:

   ```bash
   mm perps list-venues
   ```

2. Deposit USDC into the venue before your first trade:

   ```bash
   mm perps deposit --venue hyperliquid --amount <AMOUNT>
   ```

3. Confirm your perps balance:

   ```bash
   mm perps balance --venue hyperliquid
   ```

## Open a position

1. List markets:

   ```bash
   mm perps markets --venue hyperliquid
   ```

2. Get a quote:

   ```bash
   mm perps quote --venue hyperliquid --symbol <SYMBOL> --side long --size <SIZE> --leverage <N>
   ```

3. Open the position:

   ```bash
   mm perps open --venue hyperliquid --symbol <SYMBOL> --side long --size <SIZE> --leverage <N>
   ```

## Close or modify a position

```bash
mm perps close --venue hyperliquid --symbol <SYMBOL>
mm perps modify --venue hyperliquid --symbol <SYMBOL> --leverage <N>
```

## Common pitfalls

:::caution Deposit before you trade
The Hyperliquid sub-account is empty on first use. Running `mm perps open` before depositing can
fail with:

`PerpsRuntimeError: User or API Wallet does not exist`

Deposit USDC with `mm perps deposit --amount <N>` before opening your first position.
:::

## Related commands

See [`mm perps`](../reference/commands.md#mm-perps) in the commands reference.
