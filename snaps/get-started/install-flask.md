---
description: Install MetaMask Flask to start building your own Snaps.
sidebar_position: 1
---

# Install MetaMask Flask

To get started building your own Snaps, install the MetaMask Flask browser extension on
[Google Chrome](https://chromewebstore.google.com/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk)
or
[Mozilla Firefox](https://addons.mozilla.org/en-US/firefox/addon/metamask-flask/).

Install Flask in a new browser profile, or disable any existing installed versions of MetaMask
before installing Flask.
Running multiple instances of MetaMask in the same browser profile can break dapp interactions.

:::caution Developers only
MetaMask Flask is an experimental tool only for developers.
If you are not a developer, you should not install MetaMask Flask.
:::

:::danger Do not import accounts with funds to Flask
We do not recommend importing your Secret Recovery Phrase from MetaMask stable to MetaMask Flask.
If you import accounts with funds into Flask, you do so at your own risk.
:::

## About MetaMask Flask

MetaMask Flask is an experimental playground that provides developers access to upcoming MetaMask features.
While a small set of audited Snaps are allowlisted in the stable version of the MetaMask browser extension, MetaMask Flask is intended for developers building and testing Snaps locally or from npm.
Also, new Snaps API features are enabled in Flask for testing and developer feedback before they're enabled in MetaMask stable.
These features appear in the documentation with the **Flask** or **FLASK ONLY** tag.
You can also view Flask-specific features by looking for the **\[FLASK\]** label in the
[MetaMask Extension changelog](https://github.com/MetaMask/metamask-extension/blob/develop/CHANGELOG.md).
