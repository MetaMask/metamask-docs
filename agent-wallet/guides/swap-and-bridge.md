---
description: Swap or bridge tokens with mm swap quote and mm swap execute.
keywords: [MetaMask, Agent Wallet, swap, bridge, mm]
---

# Swap and bridge tokens

Get a quote, review the route, and execute a same-chain swap or cross-chain bridge.

## Ask your agent

```text
You (to your agent): "Swap 0.1 ETH to USDC on Base"
```

For a cross-chain bridge:

```text
You (to your agent): "Bridge 10 USDC from Base to Arbitrum"
```

Your agent fetches a quote, shows you the route and output, then executes after you confirm.

## Prerequisites

- [Quickstart](../quickstart.md) completed
- Sufficient balance of the source token on the source chain

## Same-chain swap

1. Request a quote:

   ```bash
   mm swap quote --from <TOKEN> --to <TOKEN> --amount <AMOUNT> --from-chain <CHAIN_ID> [--slippage <PERCENT>]
   ```

2. Review the quoted output, fees, and route in the command output. Note the `quoteId`.

3. Execute the swap:

   ```bash
   mm swap execute --quote-id <QUOTE_ID>
   ```

4. Optionally check status:

   ```bash
   mm swap status --quote-id <QUOTE_ID>
   ```

## Cross-chain bridge

Include `--to-chain` when requesting a quote:

```bash
mm swap quote --from USDC --to USDC --amount 10 --from-chain 8453 --to-chain 42161
mm swap execute --quote-id <QUOTE_ID>
```

## Common pitfalls

:::caution Verify the quote step succeeded
If `mm swap quote` returns an error or no quote ID, do not call `mm swap execute` with a fabricated
or expired quote ID. The execute step fails and no transaction is submitted, even when partial
output is printed.
:::

## Related commands

See [`mm swap`](../reference/commands.md#mm-swap) in the commands reference.
