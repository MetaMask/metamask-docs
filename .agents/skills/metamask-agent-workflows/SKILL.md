---
name: metamask-agent-workflows
description: Use when the user needs to perform multi-step operations with the MetaMask Agentic CLI such as onboarding, login, swapping tokens, bridging across chains, opening/closing/modifying perpetual positions, prediction market trading, or troubleshooting CLI issues.
license: MIT
metadata:
  author: metamask
  version: '1.0.0'
---

# MetaMask Agent Workflows

Repeatable multi-step patterns for the `mm-dev` CLI. Load a workflow file when the user's request is a pattern, not a single command.

## Workflow Routing

| Pattern                                  | Workflow                                                       |
| ---------------------------------------- | -------------------------------------------------------------- |
| First time setup and onboarding          | [onboarding.md](workflows/onboarding.md)                       |
| Login flow                               | [login.md](workflows/login.md)                                 |
| Troubleshooting decision tree            | [troubleshooting.md](workflows/troubleshooting.md)             |
| Swap quote-review-execute flow           | [swap.md](workflows/swap.md)                                   |
| Bridge quote-review-execute flow         | [bridge.md](workflows/bridge.md)                               |
| Open a perpetual position flow           | [perps-open-position.md](workflows/perps-open-position.md)     |
| Close a perpetual position flow          | [perps-close-position.md](workflows/perps-close-position.md)   |
| Modify a perpetual position flow         | [perps-modify-position.md](workflows/perps-modify-position.md) |
| Predict setup-fund-quote-place flow      | [predict-trading.md](workflows/predict-trading.md)             |
| Token discovery, prices, and market data | [market-data.md](workflows/market-data.md)                     |

Always use `--toon` for command output unless the user explicitly requests a different format.

## Preflight

Always run preflight before any CLI operation.

```bash
mm-dev auth status
```

If the user is not authenticated, follow `workflows/onboarding.md` for first time setup, or `workflows/login.md` for login.

## Command Discovery

Before constructing any command, run `mm-dev <command> --help` to confirm the exact flags, syntax, and defaults. Do not guess flags from memory.

## Output Rules

- Route silently. Do not announce which workflow you are loading.
- Surface errors from commands verbatim. Do not mask or reword them.
- If a command fails, check `mm-dev <command> --help` and guide from there.
