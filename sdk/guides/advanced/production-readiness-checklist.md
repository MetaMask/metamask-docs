---
description: Production readiness checklist for MetaMask SDK dApps focusing on MetaMask-specific wallet connection, reliable RPC endpoint configuration, and error handling.
toc_max_heading_level: 2
---

# Production Readiness

Ensure your MetaMask SDK–powered dapp is production-ready by focusing on these key areas unique to MetaMask:

- **Wallet Connection &amp; Mobile Compatibility** – Validate seamless wallet connection on both desktop and mobile environments.
- **Reliable RPC Endpoints** – Configure your dapp with dedicated, production-grade RPC URLs (including custom API keys) from the [MetaMask Developer](https://developer.metamask.io/) platform.
- **Error Handling &amp; Recovery** – Provide clear, actionable error messages for connection and transaction issues.

## Wallet Connection &amp; Mobile Compatibility

- **Cross-Platform Testing:**  
  Verify that your dapp's wallet connection flow works flawlessly on **desktop** (via the MetaMask extension) and **mobile** devices (via QR codes or deep links).  
- **Responsive UI:**  
  Ensure that touch interactions and responsive layouts are optimized for mobile users as well.

## Reliable RPC Endpoints

- **Custom RPC Setup:**  
  Use production-grade RPC endpoints by signing up on the [MetaMask Developer platform](https://developer.metamask.io/). This improves reliability over public nodes.
- **Configuration Example:**  
  Configure your Wagmi (or MetaMask SDK) setup with your custom RPC URL using environment variables:

```tsx title="Configure Custom RPC Endpoint"
import { http, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_METAMASK_RPC_URL),
  },
});
```


## Error Handling & Recovery

- **Clear Feedback:**  
  Display user-friendly messages when wallet connection or transaction errors occur (e.g. network switch failures or user rejections).
- **Event Management:**  
  Handle MetaMask events such as `chainChanged` and `accountsChanged` to promptly update the UI and internal state. If you are using Wagmi, for the most part, you don't need to worry about this as the hooks will handle the events for you.
