---
description: Connect and Sign using MetaMask SDK, either with Wagmi or Vanilla JavaScript.
---

# Connect and Sign

With MetaMask SDK, you can combine **connecting** to MetaMask and **signing** data in two ways:

1. [**Using Wagmi (two-step approach)**](#use-wagmi-two-step) - You'll need to connect to the wallet first, then sign in a separate step.

2. [**Using Vanilla JavaScript (one-step approach)**](#use-vanilla-javascript-one-step) - Use the SDK's `connectAndSign` method to connect and Sign in a single user interaction.

## Use Wagmi (two-step)

Wagmi doesn't provide a one-step "connect and Sign" method, so you'll:

1. **Connect** to the user's wallet.  
2. **Sign** your message after connecting.

The following is an example of connecting and signing using React, Wagmi, and MetaMask SDK:

```js
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { useSignMessage } from "wagmi"

function ConnectAndSignWagmi() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const { signMessage } = useSignMessage({
    message: "Hello from Wagmi!",
    onSuccess(data) {
      console.log("Signature:", data)
    },
  })

  if (!isConnected) {
    return (
      <div>
        {connectors.map((connector) => (
          <button key={connector.uid} onClick={() => connect({ connector })}>
            Connect with {connector.name}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div>
      <p>Connected: {address}</p>
      <button onClick={() => signMessage()}>Sign Message</button>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}

export default ConnectAndSignWagmi
```

## Use Vanilla JavaScript (one-step)

If you're not using Wagmi, you can access MetaMask SDK: connectAndSign method,
which requests wallet access and signs the message in a single prompt.
For example:

```js
import { MetaMaskSDK } from "@metamask/sdk"

const MMSDK = new MetaMaskSDK()
const provider = MMSDK.getProvider()

async function handleConnectAndSign() {
  try {
    const signature = await MMSDK.connectAndSign({ msg: "Hello in one go!" })
    console.log("Signature:", signature)
  } catch (err) {
    console.error("Error with connectAndSign:", err)
  }
}

document
  .getElementById("connectSignBtn")
  .addEventListener("click", handleConnectAndSign)
```

The following HTML displays a **Connect & Sign** button:

```html
<button id="connectSignBtn">Connect & Sign</button>
```

:::tip
This one-step flow is unique to MetaMask SDK's `connectAndSign` method.
It's not part of Wagmi or other wallet libraries.
:::
