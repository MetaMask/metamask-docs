---
description: Connect and sign using MetaMask SDK, either with Wagmi (two-step) or Vanilla JavaScript (single-step).
---

# Connect and Sign

MetaMask SDK can be used in **two primary ways**:

1. **With Wagmi (two-step approach).**  
   You’ll need to **connect** the wallet first, then **sign** in a separate step.
2. **With Vanilla JavaScript (single-step approach).**  
   You can use the SDK’s `connectAndSign` method to combine both steps into a single user interaction.

Below are quick examples for each approach. Choose the one that matches your stack.

## Wagmi (two-step)

Wagmi doesn’t provide a single-step “connect and sign” method, so you’ll do:

1. **Connect** the user’s wallet.  
2. **Sign** your message after connecting.

Example (React + Wagmi + MetaMask SDK):

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

## Vanilla JavaScript (single-step)

If you’re **not** using Wagmi, you can access the MetaMask SDK’s unique `connectAndSign` method,
which requests wallet access and signs the message in a single prompt.

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

```html
<button id="connectSignBtn">Connect & Sign</button>
```

**Key difference**: This single-step flow is unique to the MetaMask SDK’s `connectAndSign`—it’s
not part of Wagmi or other wallet libraries.