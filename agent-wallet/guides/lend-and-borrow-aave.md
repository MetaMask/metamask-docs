---
description: Supply, borrow, and manage Aave V3 positions using mm wallet commands and the Aave GraphQL API.
keywords: [MetaMask, Agent Wallet, Aave, DeFi, lending, borrowing, mm]
---

# Lend and borrow with Aave V3

Supply assets, borrow against collateral, and manage Aave V3 positions through your agent.
Agent Wallet has no dedicated `mm aave` command.
Your agent uses `mm wallet` commands together with the [Aave V3 GraphQL API](https://api.v3.aave.com/graphql)
to build and submit transactions.

Install the `metamask-agent-wallet` skill for multi-step Aave workflow templates.

## Ask your agent

```text
You (to your agent): "Supply 100 USDC to Aave on Base"
```

```text
You (to your agent): "What's my Aave health factor on Ethereum?"
```

```text
You (to your agent): "Borrow 0.5 ETH against my USDC collateral on Arbitrum"
```

Your agent resolves chain and token addresses, queries the Aave API for transaction payloads,
confirms with you, then submits transactions with `mm wallet send-transaction`.

## Prerequisites

- [Quickstart](../quickstart.md) completed
- Sufficient token and native-gas balances on the target chain
- For borrows: supplied collateral with collateral enabled on at least one asset

## Supported chains

| Chain     | Chain ID | Pool address                                 |
| --------- | -------- | -------------------------------------------- |
| Ethereum  | 1        | `0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2` |
| Polygon   | 137      | `0x794a61358D6845594F94dc1DB02A252b5b4814aD` |
| Arbitrum  | 42161    | `0x794a61358D6845594F94dc1DB02A252b5b4814aD` |
| Optimism  | 10       | `0x794a61358D6845594F94dc1DB02A252b5b4814aD` |
| Avalanche | 43114    | `0x794a61358D6845594F94dc1DB02A252b5b4814aD` |
| Base      | 8453     | `0x794a61358D6845594F94dc1DB02A252b5b4814aD` |

Resolve token contract addresses with `mm token list search --query <SYMBOL> --chain <CHAIN_ID>`.

## Common pattern

Each Aave operation follows the same steps:

1. Get your wallet address: `mm wallet address`
2. Check balances or positions on the target chain
3. Query the Aave V3 GraphQL API for the operation (supply, withdraw, borrow, repay, or collateral
   toggle)
4. Handle the response:
   - **`TransactionRequest`**: confirm with the user, then send with `mm wallet send-transaction`
   - **`ApprovalRequired`**: send the approval transaction first, then retry the original operation
   - **`InsufficientBalanceError`**: fund the wallet or bridge tokens to the target chain
5. Use `--wait` on server-wallet mode and include a descriptive `--intent` when supported

Example transaction submission:

```bash
mm wallet send-transaction --chain-id <CHAIN_ID> --payload '{"to":"<TO>","value":"0x0","data":"<DATA>"}' --wait
```

For ERC-20 operations, the transaction `value` is typically `"0x0"`.
For native token supplies, convert the amount to hex wei in the payload.

Before signing unfamiliar calldata, run `mm decode --payload <0x-calldata>` and confirm the decoded
intent.

## Supply assets

1. Confirm you hold enough of the supply token and native gas on the chain:

   ```bash
   mm wallet balance --chain <CHAIN_ID>
   ```

2. Query the Aave API for a supply execution plan (replace placeholders with your values):

   ```bash
   curl -s -X POST https://api.v3.aave.com/graphql \
     -H 'Content-Type: application/json' \
     -d '{
       "query": "{ supply(request: { market: \"<POOL_ADDRESS>\", amount: { erc20: { currency: \"<ASSET_ADDRESS>\", value: \"<AMOUNT>\" } }, sender: \"<WALLET_ADDRESS>\", chainId: <CHAIN_ID> }) { __typename ... on TransactionRequest { to from data value chainId } ... on ApprovalRequired { approval { to from data value chainId } originalTransaction { to from data value chainId } } } }"
     }'
   ```

3. If the response is `ApprovalRequired`, send the approval transaction, then retry supply.
4. Confirm recipient, amount, token, and chain before executing.

## Withdraw assets

1. Query your positions (see [Check positions](#check-positions)).
2. Before a full withdrawal, confirm no outstanding debt remains.
   Full collateral withdrawal reverts if any debt exists.
3. Query the Aave API for a withdraw execution plan and submit the transaction after confirmation.

For partial withdrawals with outstanding borrows, preview the health factor impact through the Aave
API `healthFactorPreview` query before proceeding.

## Borrow assets

1. Confirm supplied collateral with collateral enabled.
2. Check available borrow capacity and that `borrowCapReached` is not `true` for the target asset.
3. Preview health factor impact with the Aave `healthFactorPreview` query.
4. Query the borrow execution plan and submit after confirmation.

## Repay debt

1. Query outstanding borrows from your positions.
2. Query the Aave API for a repay execution plan.
3. Handle `ApprovalRequired` if the debt asset is an ERC-20, then submit the repay transaction.

## Toggle collateral

Enable or disable an asset as collateral for borrowing.
When disabling collateral with outstanding borrows, preview the health factor impact.
Do not disable collateral if the health factor would drop below 1.0.

## Check positions

Query supply and borrow positions in one request:

```bash
curl -s -X POST https://api.v3.aave.com/graphql \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "{ userSupplies(request: { markets: [{ address: \"<POOL_ADDRESS>\", chainId: <CHAIN_ID> }], user: \"<WALLET_ADDRESS>\" }) { currency { symbol decimals } balance { amount { value } usd } apy { formatted } isCollateral } userBorrows(request: { markets: [{ address: \"<POOL_ADDRESS>\", chainId: <CHAIN_ID> }], user: \"<WALLET_ADDRESS>\" }) { currency { symbol decimals } debt { amount { value } usd } apy { formatted } } }"
  }'
```

Present supply balances, borrow balances, collateral status, and APY rates to the user.

## Discover markets

List available reserves, supply APY, borrow APY, and liquidity on a chain:

```bash
curl -s -X POST https://api.v3.aave.com/graphql \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "{ markets(request: { chainIds: [<CHAIN_ID>] }) { reserves { underlyingToken { symbol decimals } supplyInfo { apy { formatted } } borrowInfo { apy { formatted } availableLiquidity { amount { value } usd } borrowCapReached } isFrozen isPaused } } }"
  }'
```

Skip reserves where `isFrozen` or `isPaused` is `true`.

## Common pitfalls

:::caution Confirm before submitting
Always confirm operation type, token, amount, chain, and health factor impact (for borrows and
collateral changes) before calling `mm wallet send-transaction`.
:::

:::caution Guard Mode allowlists
Aave pool contracts must be permitted by your server-wallet policy in Guard Mode.
Transactions to untrusted contracts require 2-factor authentication approval.
:::

## Related commands

- [`mm wallet send-transaction`](../reference/commands.md#mm-wallet-send-transaction)
- [`mm decode`](../reference/commands.md#mm-decode)
- [Check balances and prices](check-balances-and-prices.md)
