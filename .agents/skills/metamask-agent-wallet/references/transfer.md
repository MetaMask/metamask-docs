# Transfer Commands

Use `transfer` to send native token or ERC-20 tokens from the active wallet.

## `transfer` Command

Transfer native currency or ERC-20 tokens to a recipient address.

### Syntax

```bash
mm-dev transfer --to <address> --amount <value> --chain-id <id> --token <symbol-or-address> [--wait] [--password <password>]
```

### Supported Flags

| Name         | Required | Description                                                                            |
| ------------ | -------- | -------------------------------------------------------------------------------------- |
| `--to`       | Yes      | Recipient hex address (e.g. 0x742d...f2bD18). ENS is not supported.                    |
| `--amount`   | Yes      | Human-readable amount to transfer (e.g. 0.5, 100)                                      |
| `--chain-id` | Yes      | EVM chain ID as a positive integer (e.g. 1, 137)                                       |
| `--token`    | Yes      | Token symbol or ERC-20 contract address (e.g. ETH, USDC, 0xa0b8...)                    |
| `--wait`     | No       | Block until the transfer completes (server-wallet mode only; BYOK returns immediately) |
| `--password` | No       | Password to unlock the BYOK mnemonic (BYOK mode only) [env: `MM_PASSWORD`]             |

### Example

```bash
mm-dev transfer --to 0x742d...f2bD18 --amount 0.5 --chain-id 1 --token ETH
mm-dev transfer --to 0x742d...f2bD18 --amount 100 --chain-id 137 --token USDC
mm-dev transfer --to 0x742d...f2bD18 --amount 1.0 --chain-id 1 --token ETH --toon
```

## Notes

- If the chain is not mentioned by the user, ask for the chain.
- Use `mm-dev chains list` to discover supported chain IDs.
- In server-wallet mode, transfer returns a `pollingId` when `--wait` is omitted. See `references/polling.md` to track requests.
