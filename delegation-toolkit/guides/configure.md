---
description: Learn how to configure the MetaMask Delegation Toolkit using Viem.
sidebar_position: 1
sidebar_label: Configure the toolkit
---

# Configure the Delegation Toolkit

The MetaMask Delegation Toolkit enables you to easily integrate [MetaMask Smart Accounts](../concepts/smart-accounts.md) into your dapp,
enabling a more flexible, secure, and frictionless experience for your users.

The toolkit is highly configurable, allowing you to tailor it to your project's specific needs. It includes support for custom signers, multiple signatory schemes, custom paymasters and bundlers, and more.

:::note
The MetaMask Delegation Toolkit provides custom middleware for [Pimlico's](https://docs.pimlico.io/) gas fee resolver, paymaster, and bundler. Additional options will be made available soon.
:::

## Prerequisites

- [Install and set up the Delegation Toolkit](../get-started/install.md).
- Optionally, complete the [smart account quickstart](../get-started/quickstart.md) or [delegation quickstart](../get-started/delegation-quickstart.md) to
  familiarize yourself with the toolkit's capabilities.

## Viem's Account Abstraction API

The toolkit uses Viem's Account Abstraction API. This provides a robust and flexible foundation for creating and managing smart contract accounts.
See Viem's [Smart Account documentation](https://viem.sh/account-abstraction/accounts/smart) for more information on the API's features, methods, and best practices.


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

:::note
Providing a paymaster is optional when configuring your bundler client. However, if you choose not to use a paymaster, the smart contract account must have sufficient funds to pay for gas fees directly.
:::

