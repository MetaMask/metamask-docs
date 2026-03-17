---
title: "Sign-In with Ethereum (SIWE) - MetaMask Connect"
sidebar_label: Sign in with Ethereum
description: Implement Sign-In with Ethereum (SIWE) using ERC-4361 to authenticate users with their MetaMask wallet and prevent phishing attacks.
keywords: [sign in with ethereum, ERC-4361, SIWE, authentication, domain binding, phishing prevention, ethereum login, metamask]
---

# Sign in with Ethereum

Set up [Sign-In with Ethereum (SIWE)](https://docs.siwe.xyz/) to let users
sign in to your dapp by authenticating with their MetaMask wallet.

MetaMask supports the SIWE standard message format as specified in [ERC-4361](https://eips.ethereum.org/EIPS/eip-4361).
When your dapp prompts a user to sign a message that follows the SIWE format,
MetaMask parses the message and gives the user a friendly interface prompting them to sign in to
your dapp:

<p align="center">
    <img height="500" src={require("../../_assets/siwe.png").default} alt="Sign-in with Ethereum request" class="appScreen" />
</p>

## Domain binding

MetaMask supports domain binding with SIWE to help prevent phishing attacks.
When a site asks a user to sign a SIWE message, but the domain in the message doesn't match the site
the user is on, MetaMask displays a warning in the sign-in interface.
The user must explicitly select to proceed, accepting the risk of a phishing attack.

:::caution important
MetaMask displays a prominent warning for mismatched domains, but does **not** block users from
bypassing the warning and accepting the sign-in request.
This avoids breaking existing dapps that may have use cases for mismatched domains.
:::

<div class="imgRow">
    <div class="imgCol">
        <img src={require("../../_assets/siwe-bad-domain.png").default} alt="MetaMask Sign-In with Ethereum domain mismatch warning" class="appScreen" />
    </div>
    <div class="imgCol">
        <img src={require("../../_assets/siwe-bad-domain-2.png").default} alt="MetaMask Sign-In with Ethereum domain mismatch detailed warning popup" class="appScreen" />
    </div>
</div>

## Example

The following is an example of setting up SIWE with MetaMask using
[`personal_sign`](../../reference/json-rpc-api/index.md):

```javascript title="index.js"
import { createEVMClient } from '@metamask/connect-evm'

const evmClient = await createEVMClient({
  dapp: {
    name: 'MetaMask Connect EVM Example',
    url: window.location.href,
    iconUrl: 'https://mydapp.com/icon.png', // Optional
  },
  api: {
    supportedNetworks: {
      '0x1': 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
      '0xaa36a7': 'https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY',
    },
  },
})
const provider = evmClient.getProvider()

let accounts = []

const siweSign = async siweMessage => {
  try {
    const from = accounts[0]
    const msg = `0x${Buffer.from(siweMessage, 'utf8').toString('hex')}`
    const sign = await provider.request({
      method: 'personal_sign',
      params: [msg, from],
    })
    siweResult.innerHTML = sign
  } catch (err) {
    console.error(err)
    siweResult.innerHTML = `Error: ${err.message}`
  }
}

siwe.onclick = async () => {
  const result = await evmClient.connect()
  accounts = result.accounts
  const domain = window.location.host
  const from = accounts[0]
  const siweMessage = `${domain} wants you to sign in with your Ethereum account:\n${from}\n\nI accept the MetaMask Terms of Service: https://community.metamask.io/tos\n\nURI: https://${domain}\nVersion: 1\nChain ID: 1\nNonce: 32891757\nIssued At: 2021-09-30T16:25:24.000Z`
  siweSign(siweMessage)
}
```

The following HTML displays the SIWE button:

```html title="index.html"
<h4>Sign-In with Ethereum</h4>
<button type="button" id="siwe">Sign-In with Ethereum</button>
<p class="alert">Result:<span id="siweResult"></span></p>
```

See the [live example](https://metamask.github.io/test-dapp/#siwe) and
[test dapp source code](https://github.com/MetaMask/test-dapp) for more information.

## Next steps

- [Sign data with personal_sign and eth_signTypedData_v4](./index.md)
- [Manage user accounts](../manage-user-accounts.md)
- [Ethereum provider API events and methods](../../reference/provider-api.md)
