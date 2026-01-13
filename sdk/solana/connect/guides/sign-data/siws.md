---
description: Enable your users to Sign in with Solana.
---

# Sign in with Solana

You can set up [Sign-In with Solana (SIWS)](https://docs.siws.xyz/) to enable users to easily
sign in to your dapp by authenticating with their MetaMask wallet.

<p align="center">
    <img height="500" src={require("../../_assets/siwe.png").default} alt="Sign-in with Ethereum request" class="appScreen" />
</p>

## Domain binding

MetaMask supports domain binding with SIWS to help prevent phishing attacks.
When a site asks a user to sign a SIWS message, but the domain in the message doesn't match the site
the user is on, MetaMask displays a warning in the sign-in interface.
The user must explicitly select to proceed, accepting the risk of a phishing attack.

:::caution important
MetaMask displays a prominent warning for mismatched domains, but does **not** block users from
bypassing the warning and accepting the sign-in request.
This is to not break existing dapps that may have use cases for mismatched domains.
:::

<div class="imgRow">
    <div class="imgCol">
        <img src={require("../../_assets/siwe-bad-domain.png").default} alt="Sign-in bad domain" class="appScreen" />
    </div>
    <div class="imgCol">
        <img src={require("../../_assets/siwe-bad-domain-2.png").default} alt="Sign-in bad domain pop-up" class="appScreen" />
    </div>
</div>

## Example

<!-- TODO: Add link to solana_signMessage JSON-RPC method -->

The following is an example of setting up SIWS with MetaMask using
[`solana_signMessage`](#):

```javascript title="index.js"
import { createSolanaClient } from '@metamask/connect/solana'

const solanaClient = createSolanaClient()
const provider = solanaClient.getProvider()

const siwsSign = async siwsMessage => {
  try {
    const from = accounts[0]
    const sign = await provider.request({
      method: 'solana_signMessage',
      params: {
        message: siwsMessage,
      },
    })
    siwsResult.innerHTML = sign
  } catch (err) {
    console.error(err)
    siwsResult.innerHTML = `Error: ${err.message}`
  }
}

siws.onclick = async () => {
  const domain = window.location.host
  const siwsMessage = `${domain} wants you to sign in with your Solana account:\n${from}\n\nI accept the MetaMask Terms of Service: https://community.metamask.io/tos\n\nURI: https://${domain}\nVersion: 1\nChain ID: 5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp\nNonce: 32891757\nIssued At: 2021-09-30T16:25:24.000Z`
  siwsSign(siwsMessage)
}
```

The following HTML displays the SIWS button:

```html title="index.html"
<h4>Sign-In with Solana</h4>
<button type="button" id="siws">Sign-In with Solana</button>
<p class="alert">Result:<span id="siwsResult"></span></p>
```

<!-- TODO: Add link to live example -->

See the [live example](#) and
[test dapp source code](#) for more information.
