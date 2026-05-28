---
description: Choose between server-wallet and BYOK, and between Guard Mode and Beast Mode.
keywords: [MetaMask, Agent Wallet, server-wallet, BYOK, Guard Mode, Beast Mode]
---

# Choose your wallet mode

MetaMask Agent Wallet supports two wallet modes and two trading modes. Most users should start with
a server-wallet and Guard Mode.

## Wallet modes

### Server-wallet (recommended)

Keys are held in a Cubist TEE-backed environment. MetaMask manages key material; you retain
self-custody and can export your secret recovery phrase when supported by your account.

Initialize:

```bash
mm init --wallet server-wallet --mode guard
```

Server-wallet mode uses an asynchronous signing model. Long-running operations return a
`pollingId` unless you pass `--wait`.

### BYOK (bring your own key)

You supply a BIP-39 mnemonic. Useful when you need local key control or an existing seed phrase.

Never pass `--mnemonic` on the command line. Set the `MM_MNEMONIC` environment variable instead:

```bash
export MM_MNEMONIC="word1 word2 ..."
mm init --wallet byok
```

Optionally encrypt the mnemonic at rest with `MM_PASSWORD` or `mm wallet password set`.

## Trading modes (server-wallet only)

| Mode       | CLI flag       | Behavior                                                                                                            |
| ---------- | -------------- | ------------------------------------------------------------------------------------------------------------------- |
| Guard Mode | `--mode guard` | Default. Daily spend limits, protocol allowlists, and 2FA when a transaction violates policy.                       |
| Beast Mode | `--mode beast` | Opt-in. Fewer policy interruptions for scripted workflows. 2FA still triggers on malicious or flagged transactions. |

Switch modes by re-running `mm init` with a different `--mode` value, or update policies in the
MetaMask developer dashboard when available.

## View current settings

```bash
mm init show
```

## Next steps

- [Quickstart](quickstart.md)
- [Security](../concepts/security.md)
