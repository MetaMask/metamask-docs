---
sidebar_label: Use with OpenClaw
description: Use the MetaMask Smart Accounts Kit skill with OpenClaw to build and deploy applications with smart accounts support.
keywords: [openclaw, skill, delegation, smart accounts, ai, metamask smart accounts kit]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Use the Smart Accounts Kit with OpenClaw

Use the MetaMask Smart Accounts Kit [OpenClaw skills](https://docs.openclaw.ai/tools/skills) to interact with the Smart Accounts Kit using natural language prompts.

[OpenClaw](https://openclaw.ai/) is an open-source platform for AI agents that enables you to build, deploy, and
manage AI assistants with access to various tools and skills. The Smart Accounts Kit provides the below two skills.

## Gator CLI skill

This skill enables your agent to grant, redeem, inspect and revoke ERC-7710 delegations using the [@metamask/gator-cli](https://www.npmjs.com/package/@metamask/gator-cli) package.

:::warning Alpha version

This CLI is in alpha version, and stores agent's private key in a local 
JSON file (~/.gator-cli/). Please proceed with caution, and do not use 
it with accounts holding significant funds.

:::

### Install

<Tabs>
  <TabItem value="clawhub-ap" label="ClawHub">

```bash
clawhub install gator-cli
```

  </TabItem>
  <TabItem value="prompt-ap" label="OpenClaw prompt">

```txt
Install the skill from https://github.com/MetaMask/openclaw-skills/blob/main/metamask/gator-cli/SKILL.md
```

  </TabItem>
</Tabs>

### Reference

The skill provides access to the following commands:

| Command   | Description                                       |
|-----------|---------------------------------------------------|
| `init`    | Generate a private key and save config.           |
| `create`  | Upgrade an EOA to an EIP-7702 smart account.      |
| `show`    | Display the EOA address.                          |
| `status`  | Check config and on chain account status.         |
| `balance` | Show native or ERC-20 balance.                    |
| `grant`   | Create, sign, and store a delegation.             |
| `redeem`  | Redeem a delegation using an action type.         |
| `revoke`  | Revoke a delegation on chain.                     |
| `inspect` | View delegations for your account.                |

## Smart Accounts Kit skill

This skill helps your agent learn about the Smart Accounts Kit and its capabilities, and integrate them into your applications.

### Install

<Tabs>
  <TabItem value="clawhub" label="ClawHub">

```bash
clawhub install smart-accounts-kit
```

  </TabItem>
  <TabItem value="git" label="Git">

```bash
cd ~/.openclaw/workspace/skills
git clone https://github.com/smartgator/smart-accounts-kit-skills.git
```

  </TabItem>
  <TabItem value="prompt" label="OpenClaw prompt">

```txt
Install the skill from https://github.com/smartgator/smart-accounts-kit-skills.git
```

  </TabItem>
</Tabs>

### Reference

The skill provides access to the following capabilities:

| Capability | Description |
|------------|-------------|
| [`Smart accounts`](https://github.com/smartgator/smart-accounts-kit-skills/blob/main/references/smart-accounts.md) | Helps you integrate MetaMask smart accounts to support batch transactions, multi-sig signatures, and gas sponsorship. |
| [`Delegation`](https://github.com/smartgator/smart-accounts-kit-skills/blob/main/references/delegations.md) | Helps you integrate delegations with scopes and caveats. |
| [`Advanced Permissions`](https://github.com/smartgator/smart-accounts-kit-skills/blob/main/references/advanced-permissions.md) | Helps you integrate Advanced Permissions. |
