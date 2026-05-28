# Troubleshooting Workflow

Use this workflow when a command fails, hangs, prompts unexpectedly, or behaves differently in a terminal.

## Universal Triage

Run or suggest these in order:

```bash
mm-dev --version
mm-dev auth status
mm-dev <failing-command> --help
```

If `auth status` reports anything other than authenticated, fix authentication before debugging downstream wallet, signing, swap, perps, or predict commands.

## Common Symptoms

| Symptom                                              | Likely cause                                                 | Next step                                                                             |
| ---------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `mm-dev: command not found`                          | Binary not installed or not on `PATH`                        | Check install and PATH                                                                |
| Async command returns a polling id and appears stuck | Request was dispatched without `--wait`                      | Use `mm-dev wallet requests list` or `mm-dev wallet requests watch --polling-id <id>` |
| Auth errors after previously working                 | Expired token or wrong environment                           | Check `mm-dev auth status` and environment/session file                               |
| `CHAIN_ID_MISMATCH` on typed data                    | Payload `domain.chainId` differs from `--chain-id`           | Align the two chain IDs                                                               |
| `MNEMONIC_LOCKED` or `WRONG_PASSWORD`                | BYOK mnemonic is encrypted and password was wrong or missing | Set the correct `MM_PASSWORD` environment variable and re-run                         |
| `ALREADY_ENCRYPTED` on `wallet password set`         | Mnemonic already has a password                              | Use `mm-dev wallet password change` instead                                           |
| `NOT_ENCRYPTED` on `wallet password change/remove`   | Mnemonic is not encrypted                                    | Use `mm-dev wallet password set` instead                                              |

## Verbose Logging

Use `--verbose` when a command appears to hang or hides progress:

```bash
mm-dev wallet balance --json --verbose
```

Structured logs and progress lines go to stderr; command results remain on stdout.

## Error Codes

For raw error-code meanings, load `../references/errors.md`. Relay CLI errors verbatim before explaining them.

## Reset Last

Use `mm-dev reset` only after checking version, auth status, current environment, and the failing command's help output. Reset clears local session state and should not be the first troubleshooting step. Always ask the user for explicit confirmation before running reset.
