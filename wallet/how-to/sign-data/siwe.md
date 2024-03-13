---
description: Enable your users to sign in with Ethereum.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sign in with Ethereum

You can set up [Sign-In with Ethereum (SIWE)](https://docs.login.xyz/) to enable users to easily
sign in to your dapp by authenticating with their MetaMask wallet.

MetaMask supports the SIWE standard message format as specified in [ERC-4361](https://eips.ethereum.org/EIPS/eip-4361).
When your dapp prompts a user to sign a message that follows the SIWE format,
MetaMask parses the message and gives the user a friendly interface prompting them to sign in to
your dapp:

<p align="center">
    <img src={require("../../assets/siwe.png").default} alt="Sign-in with Ethereum request" style={{border: '1px solid gray'}} />
</p>

## Domain binding

MetaMask supports domain binding with SIWE to help prevent phishing attacks.
When a site asks a user to sign a SIWE message, but the domain in the message doesn't match the site
the user is on, MetaMask displays a warning in the sign-in interface.
The user must explicitly select to proceed, accepting the risk of a phishing attack.

:::caution important
MetaMask displays a prominent warning for mismatched domains, but does **not** block users from
bypassing the warning and accepting the sign-in request.
This is to not break existing dapps that may have use cases for mismatched domains.
:::

<div class="row">
    <div class="column">
        <img src={require("../../assets/siwe-bad-domain.png").default} alt="Sign-in bad domain" style={{border: '1px solid black'}} />
    </div>
    <div class="column">
        <img src={require("../../assets/siwe-bad-domain-2.png").default} alt="Sign-in bad domain pop-up" style={{border: '1px solid black'}} />
    </div>
</div>

## Example

The following is an example of setting up SIWE with MetaMask using
[`personal_sign`](/wallet/reference/personal_sign).
See the [live example](https://metamask.github.io/test-dapp/#siwe) and
[test dapp source code](https://github.com/MetaMask/test-dapp).

<Tabs>
<TabItem value="JavaScript">

```javascript
const siweSign = async (siweMessage) => {
    try {
        const from = accounts[0];
        const msg = `0x${Buffer.from(siweMessage, "utf8").toString("hex")}`;
        const sign = await ethereum.request({
            method: "personal_sign",
            params: [msg, from],
        });
        siweResult.innerHTML = sign;
    } catch (err) {
        console.error(err);
        siweResult.innerHTML = `Error: ${err.message}`;
    }
};

siwe.onclick = async () => {
    const domain = window.location.host;
    const from = accounts[0];
    const siweMessage = `${domain} wants you to sign in with your Ethereum account:\n${from}\n\nI accept the MetaMask Terms of Service: https://community.metamask.io/tos\n\nURI: https://${domain}\nVersion: 1\nChain ID: 1\nNonce: 32891757\nIssued At: 2021-09-30T16:25:24.000Z`;
    siweSign(siweMessage);
};
```

</TabItem>
<TabItem value="HTML">

```html
<h4>Sign-In with Ethereum</h4>
<button type="button" id="siwe">Sign-In with Ethereum</button>
<p class="alert">Result:<span id="siweResult"></span></p>
```

</TabItem>
</Tabs>
