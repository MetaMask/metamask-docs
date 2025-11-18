---
description: Authenticate users with MM Connect in your Wagmi dapp.
keywords: [SDK, Wagmi, JavaScript, authenticate, connect, sign, accounts, wallet, dapp]
toc_max_heading_level: 3
---

# Manage user accounts

Connect and manage user wallet sessions in your Wagmi dapp.
With MM Connect, you can:

- **Connect users' wallets** to your dapp.
- **Access user accounts** (addresses).
- **Handle connection states** (connected/disconnected).
- **Listen for account changes** in real time.
- **Manage wallet sessions** (connect/disconnect).
- **Support multiple wallet types** (extension, mobile app).

<p align="center">
  <a href="https://metamask-sdk-examples.vercel.app/" target="_blank">
    <img src={require("../../_assets/connect.gif").default} alt="Connect to MetaMask" width="450px" />
  </a>
</p>

## Connect wallet

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
- [Send transactions](send-transactions.md)
- [Interact with smart contracts](interact-with-contracts.md)
