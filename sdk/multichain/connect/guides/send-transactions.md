---
sidebar_label: Send transactions
---

# Send EVM and Solana transactions

Handle EVM and Solana transactions in your JavaScript dapp.
With MM Connect, you can:

- Send transactions on EVM networks and Solana in sequence, without having to switch networks.
- Track transaction status in real time.
- Estimate gas costs.
- Handle transaction errors.
- Manage complex transaction patterns.

## Send an EVM transaction

```javascript
import { createMultichainClient } from '@metamask/connect/multichain';

const multichainClient = createMultichainClient();
const provider = multichainClient.getProvider();

await provider.request({
  chain: 'eip155:1',
  method: 'eth_sendTransaction',
  params: [...]
});
```

## Send a Solana transaction

```javascript
import { createMultichainClient } from '@metamask/connect/multichain';

const multichainClient = createMultichainClient();
const provider = multichainClient.getProvider();
```