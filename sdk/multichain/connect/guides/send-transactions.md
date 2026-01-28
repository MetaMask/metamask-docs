---
sidebar_label: Send transactions
---

# Send EVM and Solana transactions

Handle EVM and Solana transactions in your JavaScript dapp.
With MetaMask Connect, you can:

- Send transactions on EVM networks and Solana in sequence, without having to switch networks.
- Track transaction status in real time.
- Estimate gas costs.
- Handle transaction errors.
- Manage complex transaction patterns.

## Initialize MetaMask Connect

```javascript
import { createMultichainClient } from '@metamask/connect-multichain';

const multichainClient = createMultichainClient({
  dapp: {
    name: "Metamask Connect Multichain Example",
    url: window.location.href,
    iconUrl: "https://mydapp.com/icon.png" // Optional
  },
  api: {
    supportedNetworks: {
      'eip155:1': 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY', // Ethereum Mainnet
      'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'https://api.mainnet.solana.com', // Solana Mainnet
    },
  },
})

await multichainClient.connect()
```

## Send an EVM transaction

```javascript
const provider = multichainClient.getProvider();

await provider.request({
  chain: 'eip155:1',
  method: 'eth_sendTransaction',
  params: [...]
});
```

## Send a Solana transaction

```javascript
const provider = multichainClient.getProvider();

await provider.request({
  chain: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
  method: 'solana_sendRawTransaction',
  params: [...],
});
```