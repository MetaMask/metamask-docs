---
description: Learn how to configure the bundler client.
---

# Configure the bundler

The MetaMask Delegation Toolkit uses Viem's Account Abstraction API to configure custom bundlers and paymasters.
This provides a robust and flexible foundation for creating and managing [MetaMask Smart Accounts](../../concepts/smart-accounts.md).
See Viem's [account abstraction documentation](https://viem.sh/account-abstraction) for more information on the API's features, methods, and best practices.

## Prerequisites

[Install and set up the Delegation Toolkit.](../../get-started/install.md)

## Configure Viem bundler and paymaster clients

To use the bundler and paymaster clients with the toolkit, create instances of these clients and configure them as follows:

```typescript
import {
  createPaymasterClient,
  createBundlerClient,
} from "viem/account-abstraction";
import { http } from "viem";
import { sepolia as chain } from "viem/chains"; 

// Replace these URLs with your actual bundler and paymaster endpoints.
const bundlerUrl = "https://your-bundler-url.com";
const paymasterUrl = "https://your-paymaster-url.com";

// The paymaster is optional.
const paymasterClient = createPaymasterClient({
  transport: http(paymasterUrl),
});

const bundlerClient = createBundlerClient({
  transport: http(bundlerUrl),
  paymaster: paymasterClient,
  chain,
});
```

Replace the bundler and paymaster URLs with your bundler and paymaster endpoints.
For example, you can use endpoints from [Pimlico](https://docs.pimlico.io/references/bundler), [Infura](/services), or [ZeroDev](https://docs.zerodev.app/meta-infra/intro).

:::note
Providing a paymaster is optional when configuring your bundler client. However, if you choose not to use a paymaster, the smart contract account must have sufficient funds to pay for gas fees directly.
:::
