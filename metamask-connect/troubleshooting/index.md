---
title: Troubleshooting - MetaMask Connect
description: Solve common polyfill and bundler issues when using MetaMask Connect packages in React Native.
sidebar_label: Overview
keywords: [MetaMask, Connect, polyfill, bundler, troubleshooting, Metro, React Native]
---

# Troubleshooting

MetaMask Connect packages (`@metamask/connect-multichain`, `@metamask/connect-evm`, `@metamask/connect-solana`) work out of the box in modern browsers and Vite/Webpack-based setups without needing Node.js polyfills. The SDK handles its transport and crypto needs internally using browser-native APIs.

**React Native** is the exception. The React Native runtime lacks certain Web and Node.js APIs (`Buffer`, `crypto.getRandomValues`, `stream`, `Event`, `CustomEvent`), so polyfills and Metro configuration are required.

See the [React Native Metro polyfill guide](metro-polyfill-issues.md) for step-by-step setup instructions and common error solutions.
