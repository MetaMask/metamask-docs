---
title: Troubleshooting - MetaMask Connect
description: Solve common bundler polyfill issues when using MetaMask Connect packages with different build tools.
sidebar_label: Overview
keywords: [MetaMask, Connect, polyfill, bundler, troubleshooting, Vite, Metro, Webpack, React Native]
---

# Troubleshooting

MetaMask Connect packages (`@metamask/connect-multichain`, `@metamask/connect-evm`, `@metamask/connect-solana`) and their transitive dependencies may reference Node.js built-in modules or globals that are not available in all JavaScript environments.

The following guides help you resolve bundler-specific polyfill issues:

| Bundler | When to use |
| ------- | ----------- |
| [Vite](vite-polyfill-issues.md) | Vite-based React, Vue, or vanilla JS projects |
| [React Native Metro](metro-polyfill-issues.md) | React Native (bare) and Expo projects |
| [Webpack 5](webpack-polyfill-issues.md) | Create React App, Angular, Vue CLI, and Gatsby projects |

:::tip
If your bundler is not listed here, the general approach is the same: identify missing Node.js modules in build errors, install polyfill packages (or stub them with empty modules), and configure your bundler's module resolution to map the missing modules.
:::
