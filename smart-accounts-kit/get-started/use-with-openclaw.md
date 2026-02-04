---
sidebar_label: Use with OpenClaw
description: Use the MetaMask Smart Accounts Kit skill with OpenClaw to build and deploy applications with smart accounts support.
keywords: [openclaw, skill, delegation, smart accounts, ai, metamask smart accounts kit]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Use the Smart Accounts Kit with OpenClaw

Use the MetaMask Smart Accounts Kit [OpenClaw skill](https://docs.openclaw.ai/tools/skills) to interact with the Smart Accounts Kit using natural language prompts. 

OpenClaw is an open-source platform for AI agents that enables you to build, deploy, and manage AI assistants with access to various tools and skills. The skill enables you to create smart accounts, delegations, and request advanced permissions through an AI assistant.

## Install the skill

<Tabs>
  <TabItem value="git">

```bash
    cd ~/.openclaw/workspace/skills
    git clone https://github.com/smartgator/smart-accounts-kit-skills.git
```

  </TabItem>
  <TabItem value="OpenClaw prompt">

```txt
Install the skill from https://github.com/smartgator/smart-accounts-kit-skills.git
```

  </TabItem>
</Tabs>

## Skill reference

The skill helps your agent learn about the Smart Accounts Kit and its capabilities, and integrate them into your applications. The skill provides access to the following capabilities:

| Capability | Description |
|------------|-------------|
| [`Smart accounts`](https://github.com/smartgator/smart-accounts-kit-skills/blob/main/references/smart-accounts.md) | Helps you integrate MetaMask smart accounts to support batch transactions, multi-sig signatures, and gas sponsorship.|
| [`Delegation`](https://github.com/smartgator/smart-accounts-kit-skills/blob/main/references/delegations.md) | Helps you integrate delegations with scopes and caveats. |
| [`Advanced Permissions`](https://github.com/smartgator/smart-accounts-kit-skills/blob/main/references/advanced-permissions.md) | Helps you integrate Advanced Permissions. |
