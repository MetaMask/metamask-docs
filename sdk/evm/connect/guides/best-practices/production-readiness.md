---
description: MetaMask-specific production readiness checklist for dapps using MM Connect.
keywords: [SDK, production, readiness, checklist, compatibility, errors, dapp]
toc_max_heading_level: 2
---

# Production readiness

When using MM Connect, ensure your dapp is production ready by focusing on these key areas unique to MetaMask:

- [Wallet connection and mobile compatibility](#wallet-connection-and-mobile-compatibility)
- [Reliable RPC endpoints](#reliable-rpc-endpoints)
- [Error handling and recovery](#error-handling-and-recovery)

## Wallet connection and mobile compatibility

- **Cross-platform testing** - Verify that your dapp's wallet connection flow works seamlessly on desktop (via the MetaMask browser extension) and mobile devices (via QR codes or deeplinks).

- **Responsive UI** - Ensure that touch interactions and responsive layouts are optimized for mobile users.

## Reliable RPC endpoints

- **Custom RPC setup** - Use production-grade RPC endpoints and custom API keys by signing up on [MetaMask Developer](https://developer.metamask.io/).
  This improves reliability over public nodes.

- **Configuration** - Configure your Wagmi (or MM Connect) setup with your custom RPC URL using environment variables.
For example:

  ```tsx title="Configure custom RPC endpoint"
  import { http, createConfig } from "wagmi";
  import { mainnet } from "wagmi/chains";
  import { metaMask } from "wagmi/connectors";

  export const config = createConfig({
    chains: [mainnet],
    connectors: [metaMask()],
    transports: {
      [mainnet.id]: http(process.env.NEXT_PUBLIC_METAMASK_RPC_URL),
    },
  });
  ```

## Error handling and recovery

- **Clear feedback** - Display user friendly messages when wallet connection or transaction errors occur (for example, network switch failures or user rejections).

- **Event management** - If you're using Vanilla JavaScript, handle MetaMask events such as [`chainChanged`](../../reference/provider-api.md#chainchanged)
  and [`accountsChanged`](../../reference/provider-api.md#accountschanged) to promptly update the UI and internal state.
  If you're using Wagmi, you generally don't need to handle MetaMask events, because the hooks will handle the events for you.
