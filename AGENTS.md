# MetaMask developer documentation

This repository contains the source for [docs.metamask.io](https://docs.metamask.io), the MetaMask
developer documentation site. It is built with Docusaurus and covers multiple products aimed at
dapp developers and wallet extension builders.

## Products

| Product             | Path                        | Sidebar file            | Description                                                                         |
| ------------------- | --------------------------- | ----------------------- | ----------------------------------------------------------------------------------- |
| MetaMask Connect    | `metamask-connect/`         | `mm-connect-sidebar.js` | Connect dapps to MetaMask extension and mobile, across EVM, Solana, and multichain. |
| Embedded Wallets    | `embedded-wallets/`         | `ew-sidebar.js`         | Embed wallet functionality directly into applications.                              |
| Smart Accounts Kit  | `smart-accounts-kit/`       | `gator-sidebar.js`      | Create smart accounts with delegated permissions, and request advanced permissions. |
| Services            | `services/`                 | `services-sidebar.js`   | Ease dapp development using Infura and related infrastructure APIs.                 |
| Snaps               | `snaps/`                    | `snaps-sidebar.js`      | Extend MetaMask by creating custom mini-apps.                                       |
| Developer dashboard | `developer-tools/dashboard` | `dashboard-sidebar.js`  | Manage Infura API keys, monitor usage, and access account info.                     |

## Editorial standards

Follow these guides when writing or editing documentation:

- [Consensys documentation style guide](https://docs-template.consensys.net/contribute/style-guide)
- [Consensys Markdown formatting guide](https://docs-template.consensys.net/contribute/format-markdown)
- [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/)
- [Diataxis framework](https://diataxis.fr/) for content structure

The rules under `.cursor/rules/` cover the most actionable parts of these references.
See [CONTRIBUTING.md](CONTRIBUTING.md) for the full contribution workflow.

## Critical rules

1. **Do not invent API behavior.** Never state as fact any API parameter, return value, or behavior
   that you have not verified against the codebase or published reference. If you are uncertain,
   flag it for review.
2. **Respect product boundaries.** Each product has its own documentation tree and sidebar. Do not
   move content across product boundaries without explicit approval from the documentation team.
3. **Use the canonical terminology.** See `.cursor/rules/terminology.mdc` for the required spelling
   and casing of product and industry terms.
4. **Verify before publishing.** Preview changes locally with `npm start` before requesting review.
5. **Pass the CI linter.** PRs are checked by a
   [Vale-based linter](https://github.com/Consensys/github-actions/tree/main/docs-spelling-check)
   that enforces Microsoft style and Consensys terminology. Fix warnings before requesting review.

## AI guidance

Detailed editorial, formatting, and product-specific rules are in `.cursor/rules/`. These rules
apply automatically when you edit files matching their glob patterns.

Agent skills live under `.cursor/skills/<skill-name>/SKILL.md`. This repo includes **author-page**
(scaffold and draft new pages) and **style-review** (editorial compliance before PR). Cursor loads
these when the task matches each skill's description.
