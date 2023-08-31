---
description: Install Snaps dependencies.
sidebar_position: 1
---

# Install Snaps

To get started building your own snaps, you must [install the MetaMask Flask browser extension](#install-the-metamask-flask-browser-extension).

## Prerequisites

- Up-to-date Chromium or Firefox browser
- [Node.js](https://nodejs.org/) version 16 or later
- [Yarn](https://yarnpkg.com/) version 3

## Install the MetaMask Flask browser extension

[MetaMask Flask](https://metamask.io/flask/) is an experimental playground that provides developers 
access to upcoming MetaMask features. It is available as a browser extension.

While a small set of audited snaps are allowlisted in the stable version of the MetaMask browser extension, MetaMask Flask is intended for developers building and testing snaps locally or from npm. Also, new Snaps API features are enabled in Flask for testing and developer feedback before they're enabled in MetaMask stable.

:::caution Install in a new browser profile
Install the [Metamask Flask browser extension](https://chrome.google.com/webstore/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk) in a new browser profile, or disable any existing installed versions of MetaMask before installing
Flask. Running multiple instances of MetaMask in the same browser profile breaks dapp interactions.
:::
