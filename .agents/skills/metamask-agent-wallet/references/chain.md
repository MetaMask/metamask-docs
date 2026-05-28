# Chain Commands

Use `chains` commands to discover supported blockchain networks.

## `chains list` Command

List all supported blockchain networks across all namespaces.

### Syntax

```bash
mm-dev chains list [--toon]
```

### Supported Flags

This command does not support additional flags beyond output format options.

### Example

```bash
mm-dev chains list
mm-dev chains list --toon
```

## Supported Namespaces

| Namespace | Notes                                                                    |
| --------- | ------------------------------------------------------------------------ |
| `eip155`  | Major EVM chains, such as Ethereum, Polygon, Arbitrum, Optimism, and BSC |
| `solana`  | Solana chains                                                            |
