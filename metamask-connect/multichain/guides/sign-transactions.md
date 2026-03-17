---
title: "Sign Messages Across Chains - MetaMask Connect Multichain"
sidebar_label: Sign messages
description: Sign messages and typed data on both EVM and Solana chains from a single MetaMask Connect Multichain session using invokeMethod.
keywords: [multichain, evm, solana, sign, personal_sign, signTypedData, signMessage, invokeMethod, multichain signing, cross-chain signature]
---

# Sign messages on EVM and Solana

This guide shows you how to sign messages and typed data on both EVM networks and Solana from a single multichain session — no network switching required.

All signing methods route to the MetaMask wallet and require user approval.

## Prerequisites

- A multichain client initialized and connected as shown in the [quickstart](../quickstart/javascript.md).

## Initialize and connect

Set up the multichain client and connect to both ecosystems:

```javascript
import { createMultichainClient, getInfuraRpcUrls } from '@metamask/connect-multichain'

const client = await createMultichainClient({
  dapp: {
    name: 'Multichain Demo',
    url: window.location.href,
  },
  api: {
    supportedNetworks: {
      ...getInfuraRpcUrls('YOUR_INFURA_API_KEY'),
    },
  },
})

await client.connect(
  ['eip155:1', 'eip155:137', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'], // Ethereum, Polygon, Solana
  []
)
```

## Sign an EVM message (`personal_sign`)

Use [`invokeMethod`](../reference/methods.md#invokemethod) with `personal_sign` to sign a plaintext message.
The message must be hex-encoded, and the params order is `[message, account]`:

```javascript
const message = 'Hello MetaMask!'
const hexMessage =
  '0x' +
  Array.from(new TextEncoder().encode(message))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

const signature = await client.invokeMethod({
  scope: 'eip155:1', // Ethereum Mainnet
  request: {
    method: 'personal_sign',
    params: [hexMessage, '0xYourAddress'],
  },
})
console.log('Signature:', signature)
```

Target a different chain by changing the `scope` — for example, `eip155:137` for Polygon.

## Sign EVM typed data (`eth_signTypedData_v4`)

Use `eth_signTypedData_v4` to sign [EIP-712](https://eips.ethereum.org/EIPS/eip-712) structured data.
The params order is `[account, typedDataJSON]` — the typed data must be passed as a JSON string, not an object:

```javascript
const typedData = {
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'string' },
      { name: 'to', type: 'string' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  domain: {
    name: 'My DApp',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  message: {
    from: 'Alice',
    to: 'Bob',
    contents: 'Hello!',
  },
}

const signature = await client.invokeMethod({
  scope: 'eip155:1', // Ethereum Mainnet
  request: {
    method: 'eth_signTypedData_v4',
    params: ['0xYourAddress', JSON.stringify(typedData)],
  },
})
console.log('Typed data signature:', signature)
```

:::note
The `EIP712Domain` type must be declared in `types` even though `primaryType` is never `EIP712Domain`.
Chain IDs in the typed data `domain.chainId` are integers (for example, `1`), not hex strings.
:::

## Sign a Solana message (`solana_signMessage`)

Use `invokeMethod` with `solana_signMessage` to sign an arbitrary message on Solana.
The message must be base64-encoded:

```javascript
const message = btoa('Hello from Solana!')

const result = await client.invokeMethod({
  scope: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp', // Solana Mainnet
  request: {
    method: 'solana_signMessage',
    params: {
      message,
      pubkey: 'YourSolanaPublicKeyBase58',
    },
  },
})
console.log('Signature:', result.signature)
```

## Error handling

| Error code | Description               | Action                                                     |
| ---------- | ------------------------- | ---------------------------------------------------------- |
| `4001`     | User rejected the request | Show a retry option. Do not treat as an application error. |
| `-32002`   | Request already pending   | Wait for the user to respond in MetaMask before retrying.  |

```javascript
try {
  const signature = await client.invokeMethod({
    scope: 'eip155:1',
    request: {
      method: 'personal_sign',
      params: [hexMessage, '0xYourAddress'],
    },
  })
} catch (err) {
  if (err.code === 4001) {
    console.log('User rejected the signature request')
    return
  }
  if (err.code === -32002) {
    console.log('A signing request is already pending')
    return
  }
  throw err
}
```

## Next steps

- [Send EVM and Solana transactions](send-transactions.md)
- [Multichain SDK methods reference](../reference/methods.md)
