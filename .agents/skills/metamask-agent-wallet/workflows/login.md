# Login Workflow

Use this workflow when the user needs to log in to the CLI.

Reference command syntax in `references/auth.md`.

## Flow

1. Ask the user which login method they want: Google, Email, or QR.
2. Execute login.
3. Verify with token.

## Login

QR login (`mm-dev login qr`) does not support `--no-wait`. If the user wants QR, they must complete the login flow themselves.

```bash
mm-dev login google --no-wait
mm-dev login email --no-wait
```

Use `--no-wait` for non-interactive environments. The command prints a sign-in URL.

## Verify

Once the user completes sign-in, verify with:

```bash
mm-dev login --token "<TOKEN>"
```

## Confirm

```bash
mm-dev auth status
```
