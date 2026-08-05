---
description: Pay for HTTP 402 paywalled APIs with the metamask-agent-wallet skill x402 helper script.
keywords: [MetaMask, Agent Wallet, x402, HTTP 402, EIP-3009, paywalled API]
---

# Pay for paywalled APIs (x402)

Pay for HTTP resources that return `402 Payment Required` using the [x402 protocol](https://www.x402.org/).
Your agent uses a Python helper script bundled with the `metamask-agent-wallet` skill.
The script signs an EIP-3009 authorization through `mm wallet sign-typed-data`, so the private key
stays in the wallet.

## Ask your agent

```text
You (to your agent): "Fetch the premium data from https://api.example.com/premium and pay if it returns 402."
```

Your agent inspects the payment requirement, shows you the asset, amount, network, and recipient,
then pays only after you approve.

## Prerequisites

- [Quickstart](../quickstart.md) completed
- Python 3 available in your environment
- Sufficient token balance on the network the server requires

## How x402 works

1. The client requests a resource. The server replies with `402 Payment Required` and one or more
   payment options (scheme, network, amount, asset, `payTo`, validity window).
2. The client signs an EIP-3009 `TransferWithAuthorization` for one option. This is a gasless,
   off-chain authorization that permits a pull of exactly the amount to `payTo`.
3. The client retries with the payment header. The server's facilitator settles on-chain and returns
   the resource plus a settlement header (transaction hash).

The helper script supports the `exact` scheme on EVM networks (`eip155:*`) using EIP-3009, for
protocol v1 and v2.

## Steps

The helper is `scripts/x402_pay.py` inside the installed skill directory.
It is not an `mm` subcommand.
Use the full path to the script because the shell working directory is not stable between commands.
It always prints JSON and does not accept `--format` or `--toon`.

Let `SKILL_DIR` be the directory that contains the skill's `SKILL.md` file (for example, the
`metamask-agent-wallet` folder under your agent's skills install path).

### 1. Inspect the payment requirement

Run the inspect subcommand to read the server's offer without spending:

```bash
python3 "$SKILL_DIR/scripts/x402_pay.py" inspect <url>
```

The output includes the asset, human-readable amount, network, `payTo` address, and resource URL.
Show this to the user before paying.

For a non-GET resource, pass `--method` and `--data` (and `--content-type` when needed).
The same request is replayed with the payment attached.

### 2. Pay after approval

Run the pay subcommand only after the user approves the payment details.
The `--confirm` flag is required:

```bash
python3 "$SKILL_DIR/scripts/x402_pay.py" pay <url> --confirm
```

When the `402` response offers more than one eligible option, disambiguate with `--asset <contract>`
or `--network <network>`.

On success, the script prints the settlement transaction and the resource body.

## Supported and unsupported offers

Supported:

- The `exact` scheme on EVM networks that `mm chains list` includes
- EIP-3009 `transferWithAuthorization` (protocol v1 and v2)

Not supported:

- Permit2 asset transfer methods (`extra.assetTransferMethod: "permit2"`)
- Other schemes such as `upto`
- Non-EVM networks (for example, Solana)
- Offers that omit the EIP-712 domain `name` and `version` in `extra`

## Wallet mode notes

**Server wallet**: Signing runs synchronously via `--wait`.
Guard Mode permits EIP-712 signing.
The x402 authorization window is short.
If manual 2FA approval is slow, the authorization can expire.
Rerun `pay` to sign again with fresh values.

**Bring your own wallet**: Signing returns immediately.
Set `MM_PASSWORD` when your mnemonic is encrypted so signing is non-interactive.

## Idempotency

The script is stateless.
Each `pay` run makes a new payment.
The EIP-3009 nonce prevents the same signed authorization from settling twice, but rerunning `pay`
for the same resource authorizes a new debit.
Guard repeated calls at the caller.

## Next steps

- [Sign messages and transactions](sign-messages-and-transactions.md)
- [Troubleshooting](../troubleshooting.md#x402-payments)
- [Commands reference](../reference/commands.md)
