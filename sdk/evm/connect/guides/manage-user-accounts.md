---
description: Authenticate users with the SDK in your Wagmi or Vanilla JavaScript dapp.
keywords: [SDK, Wagmi, JavaScript, authenticate, connect, sign, accounts, wallet, dapp]
toc_max_heading_level: 3
---

# Manage user accounts

Connect and manage user wallet sessions in your [Wagmi](#use-wagmi) or
[Vanilla JavaScript](#use-vanilla-javascript) dapp.
With the SDK, you can:

- **Connect users' wallets** to your dapp.
- **Access user accounts** (addresses).
- [**Connect and sign**](#connect-and-sign) in a single user interaction.
- **Handle connection states** (connected/disconnected).
- **Listen for account changes** in real time.
- **Manage wallet sessions** (connect/disconnect).
- **Support multiple wallet types** (extension, mobile app).

<p align="center">
  <a href="https://metamask-sdk-examples.vercel.app/" target="_blank">
    <img src={require("../_assets/connect.gif").default} alt="Connect to MetaMask" width="450px" />
  </a>
</p>

## Use Wagmi

Wagmi provides a simple, hook-based approach for handling wallet connections.
For example:

```tsx title="Handle wallet connections"
import { useAccount, useConnect, useDisconnect } from "wagmi"

function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div>
        <div>Connected to {address}</div>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={isPending}
        >
          {isPending ? "Connecting..." : `Connect ${connector.name}`}
        </button>
      ))}
    </div>
  )
}
```

Wagmi provides a dedicated hook for handling account lifecycle events:

```tsx
import { useAccountEffect } from "wagmi"

function WatchAccount() {
  useAccountEffect({
    onConnect(data) {
      console.log("Connected!", {
        address: data.address,
        chainId: data.chainId,
        isReconnected: data.isReconnected
      })
    },
    onDisconnect() {
      console.log("Disconnected!")
    }
  })
  
  return <div>Watching for account changes...</div>
}
```

## Use Vanilla JavaScript

You can implement user authentication directly in Vanilla JavaScript, using the
[`eth_requestAccounts`](/wallet/reference/json-rpc-methods/eth_requestaccounts) RPC method
and [`accountsChanged`](/wallet/reference/provider-api/#accountschanged) provider event.
For example:

```javascript
import { MetaMaskSDK } from "@metamask/sdk";

// Initialize SDK
const MMSDK = new MetaMaskSDK();
const provider = MMSDK.getProvider();

// Connect wallet
async function connectWallet() {
  try {
    // Disable button while request is pending
    document.getElementById("connectBtn").disabled = true;
    
    const accounts = await provider.request({ 
      method: "eth_requestAccounts" 
    });
    
    const account = accounts[0];
    console.log("Connected:", account);
    
    // Update UI
    document.getElementById("status").textContent = `Connected: ${account}`;
    document.getElementById("connectBtn").style.display = "none";
    document.getElementById("disconnectBtn").style.display = "block";
  } catch (err) {
    if (err.code === 4001) {
      console.log("User rejected connection");
    } else {
      console.error(err);
    }
  } finally {
    document.getElementById("connectBtn").disabled = false;
  }
}

// Disconnect wallet
async function disconnectWallet() {
  try {
    await MMSDK.terminate()
  } catch (err) {
    console.error("Error with disconnecting:", err)
  }
}

// Handle account changes
provider.on("accountsChanged", (accounts) => {
  if (accounts.length === 0) {
    // User disconnected
    document.getElementById("status").textContent = "Not connected";
    document.getElementById("connectBtn").style.display = "block";
    document.getElementById("disconnectBtn").style.display = "none";
  } else {
    // Account changed
    document.getElementById("status").textContent = `Connected: ${accounts[0]}`;
  }
});
```

Display connect and disconnect buttons in HTML:

```html
<div>
  <div id="status">Not connected</div>
  <button id="connectBtn" onclick="connectWallet()">Connect MetaMask</button>
  <button id="disconnectBtn" style="display: none" onclick="disconnectWallet()">
    Disconnect
  </button>
</div>
```

### Connect and sign

If you're not using Wagmi, you can access MetaMask SDK's [`connectAndSign`](../reference/sdk-methods.md#connectandsign) method,
which requests wallet access and signs the message in a single user interaction.
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

## Best practices

Follow these best practices when authenticating users.

#### User interaction

- Only trigger connection requests in response to user actions (like selecting a button).
- Never auto-connect on page load.
- Provide clear feedback during connection states.

#### Error handling

- Handle [common errors](#common-errors) like user rejection (code `4001`).
- Provide clear error messages to users.
- Fall back gracefully when MetaMask is not installed.

#### Account changes

- Always listen for account changes.
- Update your UI when accounts change.
- Handle disconnection events.

#### Chain support

- Listen for network/chain changes.
- Verify the current chain meets your requirements.
- Provide clear messaging when users need to switch networks.

Learn how to [manage networks](manage-networks.md).

## Common errors

The following table lists common authentication errors and their codes:

| Error code | Description | Solution |
|------------|-------------|----------|
| `4001`   | User rejected request   | Show a message asking the user to approve the connection. |
| `-32002` | Request already pending | Disable the connect button while the request is pending. |
| `-32603` | Internal JSON-RPC error | Check if MetaMask is properly installed. |

## Next steps

See the following guides to add more functionality to your dapp:

- [Manage networks](manage-networks.md)
- [Handle transactions](handle-transactions.md)
- [Interact with smart contracts](interact-with-contracts.md)
