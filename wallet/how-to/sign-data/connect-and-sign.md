---
description: Use MetaMask SDK to connect and sign in a single interaction.
tags:
  - JavaScript SDK
  - iOS SDK
---

# Connect and sign

You can connect to MetaMask and sign data in a single interaction from your JavaScript, iOS,
Android, or Unity dapp using [MetaMask SDK](../../connect/metamask-sdk/index.md).

The SDK's `connectAndSign` method provides a streamlined approach for dapps to interact with MetaMask.
This method combines the [`eth_requestAccounts`] and [`personal_sign`] RPC methods, executing them sequentially.
`connectAndSign` takes one parameter, the message string to be signed, and passes the message and
the output of [`eth_requestAccounts`] directly to [`personal_sign`].

This method enhances dapp user experience, especially on mobile platforms, by allowing users to
connect to MetaMask and sign a message in a single interaction, requiring only one switch between
the mobile dapp and MetaMask Mobile.
This is useful for various purposes such as authentication and transaction verification.

<p align="center">
  <video width="350" controls>
    <source src="/connect-and-sign.mp4" type="video/mp4" />
  </video>
</p>

The following instructions describe how to connect and sign in JavaScript.
You can also see the [Unity instructions](../../how-to/use-unity-sdk/connect-and-sign.md).

## Prerequisites

- [MetaMask SDK set up](../../connect/metamask-sdk/javascript/index.md) in your JavaScript dapp.

- MetaMask Mobile version 7.10 or later.
  Your users must have an updated version of MetaMask Mobile for this feature to work correctly.
  For older versions of MetaMask, this function may not work as expected.

## Use the `connectAndSign` method

Use the `connectAndSign` method as follows:

```javascript
const connectAndSign = async () => {
  try {
    const signResult = await sdk?.connectAndSign({
      msg: "Connect + Sign message",
    })
    setResponse(signResult)
  } catch (err) {
    console.warn("failed to connect..", err)
  }
}
```

To invoke `connectAndSign`:

1. Ensure the `MetaMaskSDK` instance (`sdk` in this context) is properly initialized and available.
2. Call `connectAndSign` with the message to be signed.
3. Handle the promise to process the response or catch any errors.

## Examples

The following is an example of using the `connectAndSign` method in a React dapp, integrating it
into a functional component:

```javascript
import React, { useState } from "react"
import { useSDK } from "@metamask/sdk-react"

function MyComponent() {
  const { sdk } = useSDK()
  const [signedMessage, setSignedMessage] = useState("")

  const handleConnectAndSign = async () => {
    try {
      const message = "Your message here"
      const signature = await sdk.connectAndSign({ msg: message })
      setSignedMessage(signature)
    } catch (error) {
      console.error("Error in signing:", error)
    }
  }

  return (
    <div>
      <button onClick={handleConnectAndSign}>Connect and Sign</button>
      {signedMessage && <p>Signed Message: {signedMessage}</p>}
    </div>
  )
}
```

For a comprehensive React example, see the
[`App.tsx`](https://github.com/MetaMask/metamask-sdk/blob/main/packages/examples/create-react-app/src/App.tsx)
file of the example React dapp.

For examples of using the `connectAndSign` function in Next.js and Vue.js, see the
[example Next.js dapp](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/nextjs-demo)
and [example Vue.js dapp](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/vuejs)
in the JavaScript SDK GitHub repository.

<!--links-->

[`eth_requestAccounts`]: /wallet/reference/json-rpc-methods/eth_requestAccounts
[`personal_sign`]: /wallet/reference/json-rpc-methods/personal_sign
