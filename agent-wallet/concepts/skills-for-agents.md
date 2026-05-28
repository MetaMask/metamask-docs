---
description: Use MetaMask Agent Wallet with any CLI-capable autonomous agent.
keywords: [MetaMask, Agent Wallet, AI agents, skills, OpenClaw, Cursor]
---

# Skills for agents

Human developers use this documentation. Autonomous agents typically read the
[Quickstart](../get-started/quickstart.md) once, then rely on agent skills for command routing during
ongoing work.

## CLI-agnostic integration

Any agent that can run shell commands can use MetaMask Agent Wallet. Install `@metamask/agentic-cli`,
sign in with `mm login`, initialize with `mm init`, and invoke `mm` subcommands from your agent loop.

Examples of compatible agent environments include OpenClaw, Codex, Claude Code, Hermes Agent, and
Cursor.

## Agent skills

Agent skills teach an AI agent how to route user intent to the correct `mm` commands, validate
inputs, and follow safety patterns (confirmation before transfers, quote-before-execute for swaps,
and similar rules).

Skills complement this documentation — they do not replace it for human readers. Do not duplicate
skill file contents in documentation pages.

When a public skill distribution path is available, install instructions will be linked from this
page. Until then, follow your organization's agent skill onboarding process.

## Recommended agent flow

1. Read [Quickstart](../get-started/quickstart.md).
2. Run `mm auth status` before every operation.
3. Load agent skills for command routing and multi-step workflows.
4. Use [`mm --help`](../reference/commands.md) to confirm flags before constructing commands.

## Next steps

- [Commands reference](../reference/commands.md)
- [Troubleshooting](../troubleshooting.md)
