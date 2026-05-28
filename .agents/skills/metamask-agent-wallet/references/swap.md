# Swap & Bridge Commands

Use the `swap` commands to perform same-chain token swaps or cross-chain bridges. When `--from-chain` and `--to-chain` differ, the CLI automatically routes through a bridge.

## `swap quote` Command

Get a swap or bridge quote showing expected output, fees, and route.

### Syntax

```bash
mm-dev swap quote --from <token> --to <token> --amount <amount> --from-chain <chain-id> [--to-chain <chain-id>] [--slippage <percent>]
```

### Supported Flags

| Name           | Required | Description                                                               |
| -------------- | -------- | ------------------------------------------------------------------------- |
| `--from`       | Yes      | Source token symbol (e.g. ETH, POL, USDC)                                 |
| `--to`         | Yes      | Destination token symbol (e.g. USDC, USDT)                                |
| `--amount`     | Yes      | Human-readable amount to swap (e.g. 0.5, 100)                             |
| `--from-chain` | Yes      | Source EVM chain ID (e.g. 1 for Ethereum, 137 for Polygon)                |
| `--to-chain`   | No       | Destination EVM chain ID; defaults to `--from-chain` for same-chain swaps |
| `--slippage`   | No       | Maximum slippage as a percentage, 0-100 (defaults to 0.5)                 |

### Example

```bash
mm-dev swap quote --from ETH --to USDC --amount 0.5 --from-chain 1
mm-dev swap quote --from USDC --to USDT --amount 100 --from-chain 137
mm-dev swap quote --from ETH --to USDC --amount 1 --from-chain 1 --to-chain 137
mm-dev swap quote --from ETH --to USDC --amount 0.5 --from-chain 1 --slippage 1
```

## `swap execute` Command

Execute a swap or bridge, either by referencing a previous quote ID or by providing parameters for an automatic re-quote and execute.

### Syntax

```bash
mm-dev swap execute --quote-id <id> [--password <password>]
mm-dev swap execute --from <token> --to <token> --amount <amount> --from-chain <chain-id> [--to-chain <chain-id>] [--slippage <percent>] [--password <password>]
```

### Supported Flags

| Name           | Required                         | Description                                                                                                                |
| -------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--quote-id`   | Yes (unless re-quote args given) | Quote ID returned by `mm-dev swap quote`. If omitted, provide `--from`, `--to`, `--amount`, and `--from-chain` to re-quote |
| `--from`       | Yes (unless `--quote-id`)        | Source token symbol                                                                                                        |
| `--to`         | Yes (unless `--quote-id`)        | Destination token symbol                                                                                                   |
| `--amount`     | Yes (unless `--quote-id`)        | Amount to swap                                                                                                             |
| `--from-chain` | Yes (unless `--quote-id`)        | Source EVM chain ID                                                                                                        |
| `--to-chain`   | No                               | Destination EVM chain ID; defaults to `--from-chain` for same-chain swaps                                                  |
| `--slippage`   | No                               | Maximum slippage as a percentage, 0-100 (defaults to 0.5)                                                                  |
| `--password`   | No                               | Password to unlock the BYOK mnemonic (BYOK mode only) [env: `MM_PASSWORD`]                                                 |

### Validation Rules

- Either `--quote-id` OR the full set of re-quote flags (`--from`, `--to`, `--amount`, `--from-chain`) must be provided.
- When `--quote-id` is given, re-quote flags are ignored.

### Example

```bash
mm-dev swap execute --quote-id <quote-id>
mm-dev swap execute --from ETH --to USDC --amount 0.5 --from-chain 1
mm-dev swap execute --from USDC --to USDT --amount 100 --from-chain 137 --to-chain 137 --slippage 1
```

## `swap status` Command

Check the status of a previously executed swap or bridge by its quote ID.

### Syntax

```bash
mm-dev swap status --quote-id <id> [--tx-hash <hash>]
```

### Supported Flags

| Name         | Required | Description                                                     |
| ------------ | -------- | --------------------------------------------------------------- |
| `--quote-id` | Yes      | Quote ID returned by `mm-dev swap quote`                        |
| `--tx-hash`  | No       | Source transaction hash; overrides the stored hash from execute |

### Example

```bash
mm-dev swap status --quote-id <quote-id>
mm-dev swap status --quote-id <quote-id> --tx-hash 0xabc...123
```

## Notes

- If the chain is not mentioned by the user, ask for the chain.
- Use `mm-dev chains list` to discover supported chain IDs.
- Same-chain swap: omit `--to-chain` (it defaults to `--from-chain`).
- Cross-chain bridge: set `--to-chain` to a different chain than `--from-chain`. The CLI automatically routes through a bridge.
- The typical flow is: `mm-dev swap quote` to preview, then `mm-dev swap execute --quote-id <id>` to submit.
- You can skip the quote step by passing all swap parameters directly to `mm-dev swap execute`.
- Use `mm-dev swap status --quote-id <id>` to track progress after execution.
- If the user asks to "bridge" tokens, use the `swap` commands with different `--from-chain` and `--to-chain` values.
- After execution, track swap progress with `mm-dev swap status --quote-id <id>`.
