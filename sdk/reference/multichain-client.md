---
description: Multichain Package
---

# Multichain Package

A low-level TypeScript client for interacting with MetaMask's CAIP-25 compliant Multichain API. This package provides a standardized way to interact with multiple blockchain networks simultaneously through MetaMask.

:::warning
This package is currently in beta and subject to change.
:::

## Conceptual Overview

### Purpose and Scope

The MetaMask Multichain package simplifies interactions with multiple blockchain networks by providing:
- A unified client for managing multichain sessions
- Automatic transport handling (Chrome extension, injected provider)
- Type-safe method invocations across different networks

### Relationship with Wallet API

This package is built on top of MetaMask Wallet's [Multichain API](/wallet/concepts/multichain-api). While the Wallet API defines the protocol for multichain interactions, this package provides:
- A higher-level abstraction for managing sessions
- Automatic handling of different connection mechanisms
- TypeScript types for better development experience

## Technical Reference

### Installation

```bash
npm install @metamask/sdk-multichain
```

### Client Configuration

Create a MetaMask Multichain client with optional configuration:

```typescript
import { MultichainClient } from '@metamask/sdk-multichain';

const client = new MultichainClient();
```

### Methods

#### Connect & Disconnect
Establish connection with MetaMask:

```typescript
const connected = await client.connect({ 
  extensionId: 'your-extension-id'  // Required for Chrome extension
});
```

Disconnect from MetaMask:

```typescript
await client.disconnect();
```

#### Create Session
Create a multichain session with specified permissions:

```typescript
const session = await client.createSession({
  requiredScopes: {
    'eip155:1': {  // Ethereum Mainnet
      methods: ['eth_sendTransaction', 'personal_sign'],
      notifications: ['accountsChanged', 'chainChanged'],
    },
    'eip155:137': {  // Polygon
      methods: ['eth_getBalance', 'eth_blockNumber'],
      notifications: ['accountsChanged', 'chainChanged'],
    }
  }
});
```

#### Invoke Methods
Call methods on specific networks:

```typescript
// Sign a message on Ethereum
const signature = await client.invokeMethod({
  scope: 'eip155:1',
  request: {
    method: 'personal_sign',
    params: [message, address]
  }
});

// Get balance on Polygon
const balance = await client.invokeMethod({
  scope: 'eip155:137',
  request: {
    method: 'eth_getBalance',
    params: [address, 'latest']
  }
});
```

### Events

Listen for session and network events:

```typescript
// Session state changes
client.addListener('sessionChanged', (event) => {
  console.log('Session event:', event.type);  // 'created', 'updated', or 'revoked'
  console.log('Session data:', event.session);
});

// Chain-specific notifications
client.addListener('notification', (notification) => {
  if (notification?.method === 'wallet_sessionChanged') {
    console.log('Session updated:', notification.params);
  }
});
```

### Examples

For more examples, check out the [multichain + react + vite app](https://github.com/MetaMask/sdk-examples/tree/main/react-vite-app).
