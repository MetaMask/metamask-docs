---
description: MetaMask + Dynamic SDK Integration
toc_max_heading_level: 2
---

# MetaMask + Dynamic SDK Integration

Get started with MetaMask SDK and Dynamic SDK integration in a Next.js dapp.
This project demonstrates how to combine both SDKs to create a seamless wallet connection experience
for both desktop and mobile users.

Features include:

- **Dual SDK Integration** - Seamlessly combine MetaMask and Dynamic SDKs
- **Wallet Connection** - Connect to MetaMask wallet with enhanced features
- **Mobile Experience** - Optimized for both desktop and mobile users
- **TypeScript Support** - Full type safety and modern development experience
- **Next.js Integration** - Built with Next.js 14 and App Router

## Project Structure

```
├── app/
│   ├── providers.tsx      # Main providers configuration
│   └── layout.tsx         # Root layout with providers
├── components/
│   ├── Navbar.tsx         # Navigation with wallet connection
│   └── Hero.tsx           # Hero section with wallet status
├── wagmi.config.ts        # Wagmi configuration
├── next.config.ts         # Next.js configuration
└── package.json           # Project dependencies
```

## Set up the project

You can either clone the repository or set up the project manually:

### Option 1: Clone the repository

```bash
git clone https://github.com/MetaMask/metamask-dynamic
cd metamask-dynamic
pnpm install
```

### Option 2: Manual setup

### 1. Install dependencies

Install the required dependencies:

```bash
pnpm i @metamask/sdk @dynamic-labs/sdk-react-core @dynamic-labs/ethereum @dynamic-labs/wagmi-connector wagmi viem @tanstack/react-query
```

### 2. Configure providers

Set up your providers in `app/providers.tsx`:

```typescript
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { MetaMaskSDK } from "@metamask/sdk";

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);
  const [sdkInitialized, setSdkInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const MMSDK = new MetaMaskSDK({
      dappMetadata: {
        name: "MetaMask Dynamic Integration",
        url: window.location.host,
      },
      injectProvider: true,
      communicationServerUrl: "https://metamask-sdk-socket.metamask.io",
    });

    const ethereum = MMSDK.getProvider();
    if (ethereum) {
      window.ethereum = ethereum;
      setSdkInitialized(true);
    }

    setMounted(true);
  }, []);

  return (
    <DynamicContextProvider
      settings={{
        mobileExperience: "redirect",
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID!,
        walletConnectors: [EthereumWalletConnectors],
        appName: "MetaMask Dynamic Integration",
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
```

### 3. Configure Next.js

Update your `next.config.ts`:

```typescript
const nextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.1.152:3000/",
    "192.168.1.152:3000",
    "192.168.1.152",
  ],
};
```

### 4. Set up environment variables

Create a `.env.local` file:

```
NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=your_dynamic_environment_id
```

## Usage

### Connect Wallet

Use the Dynamic Widget in your components:

```typescript
"use client";

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export const Navbar = () => {
  return (
    <nav>
      <DynamicWidget />
    </nav>
  );
};
```

### Check Wallet Status

Use the `useAccount` hook from Wagmi:

```typescript
"use client";

import { useAccount } from "wagmi";

export const Hero = () => {
  const { address, isConnected } = useAccount();

  return (
    <div>
      {isConnected ? (
        <p>Connected: {address}</p>
      ) : (
        <p>Not connected</p>
      )}
    </div>
  );
};
```

## Production Deployment

For production deployments:

1. Update your `next.config.ts` with production domains
2. Set up proper environment variables
3. Configure your Dynamic SDK environment ID
4. Ensure MetaMask SDK is properly initialized

## Troubleshooting

Common issues and solutions:

1. **SDK Initialization Error**
   - Ensure MetaMask is installed
   - Check environment variables
   - Verify network connectivity

2. **TypeScript Errors**
   - Update type definitions
   - Check SDK versions compatibility

3. **Mobile Experience Issues**
   - Test on actual mobile devices
   - Verify redirect URLs
   - Check MetaMask Mobile installation

## Additional Resources

- [MetaMask SDK Documentation](https://docs.metamask.io/guide/sdk.html)
- [Dynamic SDK Documentation](https://docs.dynamic.xyz/)
- [Wagmi Documentation](https://wagmi.sh/)
- [Next.js Documentation](https://nextjs.org/docs)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 