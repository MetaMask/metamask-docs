# Authentication Commands

Use these commands to initialize wallet mode, sign in, inspect authentication status, and clear local session state.

## `init` Command

Initialize the project by selecting wallet mode and trading mode.

### Syntax

```bash
mm-dev init [--wallet <mode>] [--mode <mode>] [--mnemonic <phrase>] [--password <password>]
```

### Supported Flags

| Name         | Required | Description                                                                                                                                                                                                                |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--wallet`   | No       | Wallet mode: `server-wallet` or `byok`                                                                                                                                                                                     |
| `--mode`     | No       | Trading mode: `guard` or `beast` (server-wallet only)                                                                                                                                                                      |
| `--mnemonic` | No       | BIP-39 mnemonic phrase for BYOK wallet. Never pass inline — set `MM_MNEMONIC` env var instead.                                                                                                                             |
| `--password` | No       | Password to encrypt the BYOK mnemonic at rest. Never pass inline — set `MM_PASSWORD` env var instead. If omitted in interactive mode, the CLI prompts. If omitted in non-interactive mode, mnemonic is stored unencrypted. |

### Example

```bash
mm-dev init
mm-dev init --wallet server-wallet --mode beast
export MM_MNEMONIC="word1 word2 ..."
mm-dev init --wallet byok

export MM_MNEMONIC="word1 word2 ..."
export MM_PASSWORD="mypassword"
mm-dev init --wallet byok
```

## `init show` Command

Display the current initialization settings (wallet mode, trading mode, policies).

### Syntax

```bash
mm-dev init show
```

### Supported Flags

This command does not support additional flags beyond output format options.

### Example

```bash
mm-dev init show
```

## `login` Command

Sign in to the CLI. Defaults to QR / browser flow.

### Syntax

```bash
mm-dev login [qr | google | email] [--token <token>] [--timeout <seconds>] [--no-wait]
```

### Supported Flags

| Name        | Required | Description                                                                                                                                          |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--token`   | No       | Pre-minted CLI token in `cliToken:cliRefreshToken` format [env: `MM_CLI_TOKEN`]                                                                      |
| `--timeout` | No       | Seconds to wait for QR or browser callback                                                                                                           |
| `--no-wait` | No       | Print the sign-in URL and exit without waiting (for non-interactive/CI use). Not supported with QR login. Complete later with `mm-dev login --token` |

### Example

```bash
mm-dev login --no-wait
mm-dev login qr
mm-dev login google --no-wait
mm-dev login email --no-wait
mm-dev login --token "cliToken:cliRefreshToken"
```

### Note

Use `--no-wait` for non-interactive mode except QR flow. It prints the sign-in URL and exits immediately; complete authentication later with `mm-dev login --token`.

## `auth status` Command

Show the current authentication status.

### Syntax

```bash
mm-dev auth status [--toon]
```

### Supported Flags

This command does not support additional flags beyond output format options.

### Example

```bash
mm-dev auth status
mm-dev auth status --toon
```

## `logout` Command

Sign out and clear auth credentials while keeping settings.

### Syntax

```bash
mm-dev logout
```

### Supported Flags

This command does not support flags.

### Example

```bash
mm-dev logout
```

## `reset` Command

Clear the local CLI session entirely.

### Syntax

```bash
mm-dev reset
```

### Supported Flags

This command does not support flags.

### Example

```bash
mm-dev reset
```

## `wallet password set` Command

Set a password to encrypt the BYOK mnemonic at rest. Only available in BYOK mode when the mnemonic is currently unencrypted.

### Syntax

```bash
mm-dev wallet password set [--new <password>]
```

### Supported Flags

| Name    | Required | Description                                              |
| ------- | -------- | -------------------------------------------------------- |
| `--new` | No       | New password. If omitted, the CLI prompts interactively. |

### Example

```bash
mm-dev wallet password set
mm-dev wallet password set --new "mypassword"
```

## `wallet password change` Command

Change the BYOK mnemonic encryption password. Only available when the mnemonic is currently encrypted.

### Syntax

```bash
mm-dev wallet password change [--current <password>] [--new <password>]
```

### Supported Flags

| Name        | Required | Description                                                  |
| ----------- | -------- | ------------------------------------------------------------ |
| `--current` | No       | Current password. If omitted, the CLI prompts interactively. |
| `--new`     | No       | New password. If omitted, the CLI prompts interactively.     |

### Example

```bash
mm-dev wallet password change
mm-dev wallet password change --current "oldpassword" --new "newpassword"
```

## `wallet password remove` Command

Remove the BYOK mnemonic encryption password, storing the mnemonic as plaintext. Only available when the mnemonic is currently encrypted.

### Syntax

```bash
mm-dev wallet password remove [--current <password>]
```

### Supported Flags

| Name        | Required | Description                                                  |
| ----------- | -------- | ------------------------------------------------------------ |
| `--current` | No       | Current password. If omitted, the CLI prompts interactively. |

### Example

```bash
mm-dev wallet password remove
mm-dev wallet password remove --current "mypassword"
```

## Wallet Modes

| Mode            | Behavior                                                                                                                                                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `server-wallet` | Keys hosted by MetaMask infrastructure. Signing and transaction operations may return async job handles.                                                                                                                                |
| `byok`          | Bring your own local mnemonic. Operation results are returned immediately. If the mnemonic is encrypted with a password, the CLI requires `--password` or interactive prompt to unlock before any operation that needs the private key. |
