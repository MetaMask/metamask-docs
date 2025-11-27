---
description: Manage networks with MM Connect in your Wagmi dapp.
keywords: [SDK, Wagmi, JavaScript, detect, switch, add, network, networks, dapp]
toc_max_heading_level: 2
---

# Manage networks

Manage networks in your Wagmi dapp.
With MM Connect, you can:

- **Detect the current network** and monitor network changes.
- **Switch between networks** programmatically.
- **Add new networks** to MetaMask.
- **Handle common network-related errors**.

## Detect and switch networks

Wagmi provides intuitive hooks for several network-related operations.
The following are examples of using these hooks.

Detect the current network:

```tsx
import { useChainId, useChains } from 'wagmi'

function NetworkStatus() {
  const chainId = useChainId()
  const chains = useChains()

  const currentChain = chains.find(c => c.id === chainId)

  if (!currentChain) {
    return <div>Not connected to any network</div>
  }

  return (
    <div>
      <div>Connected to {currentChain.name}</div>
      <div>Chain ID: {chainId}</div>
      <div>Supported chains: {chains.map(c => c.name).join(', ')}</div>
    </div>
  )
}
```

Switch networks:

```tsx
import { useSwitchChain } from 'wagmi'

function NetworkSwitcher() {
  const { chains, switchChain } = useSwitchChain()

  return (
    <div>
      {chains.map(chain => (
        <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
          Switch to {chain.name}
        </button>
      ))}
    </div>
  )
}
```

Handle network changes:

```tsx
import { useChainId } from 'wagmi'
import { useEffect } from 'react'

function NetworkWatcher() {
  const chainId = useChainId()

  useEffect(() => {
    console.log('Chain ID changed:', chainId)
  }, [chainId])

  return null
}
```

## Best practices

Follow these best practices when managing networks.

#### Error handling

- Implement error handling for network switching operations.
- Provide **clear feedback messages** to users when network operations fail.
- Handle cases where networks need to be **added before switching**.

#### User experience

- Display **loading states** during network switches.
- Show **clear network status information** at all times.
- Consider **warning users** before initiating network switches.
- Use an **RPC provider** that supports your target networks.

## Common errors

The following table lists common network management errors and their codes:

| Error code | Description             | Solution                                                                                         |
| ---------- | ----------------------- | ------------------------------------------------------------------------------------------------ |
| `4902`     | Network not added       | Use [`wallet_addEthereumChain`](../../reference/json-rpc-api/index.md) to add the network first. |
| `4001`     | User rejected request   | Show a message asking the user to approve the network switch.                                    |
| `-32002`   | Request already pending | Disable the switch network button while the request is pending.                                  |

## Next steps

See the following guides to add more functionality to your dapp:

- [Manage user accounts](manage-user-accounts.md)
- [Send transactions](send-transactions.md)
- [Interact with smart contracts](interact-with-contracts.md)
