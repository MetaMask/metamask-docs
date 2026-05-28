# Transaction Commands

Use `wallet send-transaction` to send raw EVM transactions with the active wallet.

## `wallet send-transaction` Command

Send a raw EVM transaction using the active wallet.

### Syntax

```bash
mm-dev wallet send-transaction --chain-id <id> --payload '<JSON>' [--wait] [--password <password>]
```

### Supported Flags

| Name         | Required | Description                                                                                        |
| ------------ | -------- | -------------------------------------------------------------------------------------------------- |
| `--chain-id` | Yes      | EVM chain ID as a positive integer (e.g. 1, 137)                                                   |
| `--payload`  | Yes      | Transaction as a JSON string with at least a `to` address (e.g. `'{"to":"0x...","value":"0x0"}'}`) |
| `--wait`     | No       | Block until the transaction completes (server-wallet mode only; BYOK returns immediately)          |
| `--password` | No       | Password to unlock the BYOK mnemonic (BYOK mode only) [env: `MM_PASSWORD`]                         |

### Example

```bash
mm-dev wallet send-transaction --chain-id 1 --payload '{"to":"0x742d...","value":"1000000000000000000","data":"0x"}'
mm-dev wallet send-transaction --chain-id 1 --payload '{"to":"0x...","value":"0","data":"0xabcdef"}' --wait
mm-dev wallet send-transaction --chain-id 1 --payload '...' --toon
```

## Transaction Payload

The `--payload` flag takes a JSON string with transaction fields:

```json
{
  "to": "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18",
  "value": "1000000000000000000",
  "data": "0x"
}
```

Optional fields: `gasLimit`, `gasPrice`, `maxFeePerGas`, `maxPriorityFeePerGas`.

## Notes

- If the chain is not mentioned by the user, ask for the chain.
- In server-wallet mode, send-transaction returns a `pollingId` when `--wait` is omitted. See `references/polling.md` to track requests.
