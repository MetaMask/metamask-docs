---
description: Send native tokens or ERC-20 tokens on a single EVM chain with mm transfer.
keywords: [MetaMask, Agent Wallet, transfer, send tokens, mm]
---

# Send tokens

Transfer native currency or ERC-20 tokens to a recipient on one EVM chain.

## Prerequisites

- [Quickstart](../get-started/quickstart.md) completed
- Sufficient balance on the source chain for the transfer amount and gas

## Steps

1. Confirm your wallet address:

   ```bash
   mm wallet address
   ```

2. Check your balance on the target chain:

   ```bash
   mm wallet balance --chain <chain-id>
   ```

3. Send the transfer:

   ```bash
   mm transfer --to <ADDRESS> --amount <AMOUNT> --token <TOKEN> --chain-id <CHAIN_ID> --wait
   ```

   - `--to` — recipient hex address (`0x…`). ENS names are not supported.
   - `--amount` — human-readable amount (for example, `0.5`).
   - `--token` — `native`, a symbol such as `USDC`, or an ERC-20 contract address.
   - `--chain-id` — EVM chain ID (for example, `8453` for Base). Run `mm chains list` for options.

4. Confirm the transaction hash in the command output.

## Common pitfalls

:::note Per-chain balances
`mm transfer` spends from the chain you specify with `--chain-id`. To send on a chain where you do
not currently hold a balance, bridge first with `mm swap execute`, then transfer.
:::

## Related commands

See [`mm transfer`](../reference/commands.md#mm-transfer) in the commands reference.
