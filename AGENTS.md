# MetaMask Developer Documentation

This repository contains the source for [docs.metamask.io](https://docs.metamask.io), the MetaMask
developer documentation site. It is built with Docusaurus and covers multiple products aimed at
dapp developers and wallet extension builders.

## Products

| Product              | Path                    | Sidebar file             | Description                                           |
|----------------------|-------------------------|--------------------------|-------------------------------------------------------|
| MetaMask Connect     | `metamask-connect/`     | `mm-connect-sidebar.js`  | Connect dapps to MetaMask across EVM, Solana, and multichain. |
| Embedded Wallets     | `embedded-wallets/`     | `ew-sidebar.js`          | Embed wallet functionality directly into applications. |
| Smart Accounts Kit   | `smart-accounts-kit/`   | `gator-sidebar.js`       | Smart account creation, delegation, and advanced permissions. |
| Services             | `services/`             | `services-sidebar.js`    | Infura and related infrastructure APIs.                |
| Snaps                | `snaps/`                | `snaps-sidebar.js`       | Extend MetaMask with custom Snaps.                     |
| Developer Tools      | `developer-tools/`      | `dashboard-sidebar.js`   | Dashboard and developer tooling.                       |

## Editorial standards

Follow these guides when writing or editing documentation:

- [Consensys documentation style guide](https://docs-template.consensys.net/contribute/style-guide)
- [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/)
- [Diataxis framework](https://diataxis.fr/) for content structure

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
