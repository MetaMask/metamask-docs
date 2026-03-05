---
sidebar_label: Create a multichain dapp
description: Build a React dapp that connects to Ethereum, Linea, Base, and Solana using the Multichain API.
keywords: [tutorial, multichain, react, vite, evm, solana, caip, metamask, connect]
---

# Create a multichain dapp

In this tutorial, you’ll build a React dapp that connects to four networks (Ethereum, Linea, Base, and Solana) by using the MetaMask Connect Multichain SDK.
By the end, your dapp will handle wallet login and logout, read balances across all four chains, sign messages, and send transactions on all four chains. You'll learn how to do the following:

- Set up a multichain session with a single connection prompt.
- Read account balances across EVM networks and Solana.
- Sign messages in both ecosystems.
- Send transactions on EVM and Solana.

## What is the Multichain API?

The [Multichain API](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md) is a wallet
communication standard built on [CAIP](https://github.com/ChainAgnostic/CAIPs) (Chain Agnostic
Improvement Proposals).
Instead of connecting to one chain at a time, the Multichain API lets your dapp request access to
multiple chains across different ecosystems in a single session.

Three CAIP concepts matter for this tutorial:

| Concept        | Standard                                                                     | What it means                                            | Example                   |
| -------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------- |
| **Scope**      | [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md)   | A chain identifier in `namespace:reference` format       | `eip155:1` (Ethereum)     |
| **Account ID** | [CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-10.md) | A chain-specific account — `namespace:reference:address` | `eip155:1:0xabc...`       |
| **Session**    | [CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md) | An authorized connection containing multiple scopes      | One session for ETH + SOL |

This tutorial uses the following scopes:

| Chain            | Scope (CAIP-2)                            |
| ---------------- | ----------------------------------------- |
| Ethereum Mainnet | `eip155:1`                                |
| Linea Mainnet    | `eip155:59144`                            |
| Base Mainnet     | `eip155:8453`                             |
| Solana Mainnet   | `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp` |

:::note
Bitcoin and Tron support is coming soon.
The Multichain API is designed to be ecosystem-agnostic, so new chains can be added without changing
your integration pattern.
:::

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/).
- [MetaMask](https://metamask.io/download) installed in your browser.
- An [Infura API key](/developer-tools/dashboard/get-started/create-api) from the [MetaMask Developer dashboard](https://developer.metamask.io).

## Steps

### 1. Scaffold the project

Create a new React + TypeScript project with Vite:

```bash
npm create vite@latest multichain-dapp -- --template react-ts
cd multichain-dapp
```

Install the MetaMask Connect multichain client and Solana Kit:

```bash npm2yarn
npm install @metamask/connect-multichain @solana/kit
```

`@solana/kit` is needed to query Solana balances directly, since
[`invokeMethod`](../reference/api.md#wallet_invokemethod) doesn't currently support `getBalance` for
Solana.

### 2. Initialize the multichain client

Create a file `src/multichain.ts` to set up the client as a reusable singleton:

```typescript title="src/multichain.ts"
import { createMultichainClient } from '@metamask/connect-multichain'

export const SCOPES = {
  ETHEREUM: 'eip155:1',
  LINEA: 'eip155:59144',
  BASE: 'eip155:8453',
  SOLANA: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
} as const

let client: Awaited<ReturnType<typeof createMultichainClient>> | null = null

export async function getClient() {
  if (!client) {
    client = await createMultichainClient({
      dapp: {
        name: 'Multichain Tutorial Dapp',
        url: window.location.href,
      },
      api: {
        supportedNetworks: {
          [SCOPES.ETHEREUM]: 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
          [SCOPES.LINEA]: 'https://linea-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
          [SCOPES.BASE]: 'https://base-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
          [SCOPES.SOLANA]: 'https://solana-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
        },
      },
    })
  }
  return client
}
```

`createMultichainClient` takes two configuration objects:

- **`dapp`** — Your dapp's identity.
  MetaMask shows the `name` and `url` during the connection prompt so users know who is requesting
  access.
- **`api.supportedNetworks`** — A map of [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md)
  scope IDs to RPC endpoint URLs.
  Each entry tells the client which chains your dapp supports and where to send RPC requests.

### 3. Connect (sign-in)

Call `connect()` with the scopes you want.
The user sees a single approval prompt for all four chains:

```typescript
import { getClient, SCOPES } from './multichain'

const client = await getClient()

await client.connect([SCOPES.ETHEREUM, SCOPES.LINEA, SCOPES.BASE, SCOPES.SOLANA], [])
```

The second argument is an optional array of [CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-10.md)
account preferences.
Pass an empty array to let the user choose their own accounts.

After connecting, retrieve the session to see which accounts the user authorized:

```typescript
const session = await client.getSession()

const ethAccounts = session.sessionScopes[SCOPES.ETHEREUM]?.accounts || []
const lineaAccounts = session.sessionScopes[SCOPES.LINEA]?.accounts || []
const baseAccounts = session.sessionScopes[SCOPES.BASE]?.accounts || []
const solAccounts = session.sessionScopes[SCOPES.SOLANA]?.accounts || []
```

Each account is a CAIP-10 string like `eip155:1:0xabc123...` or `solana:5eykt...:83ast...`.
To extract the raw address, split on `:` and take everything after the second colon:

```typescript
function extractAddress(caip10Account: string): string {
  return caip10Account.split(':').slice(2).join(':')
}

const ethAddress = extractAddress(ethAccounts[0])
// "0xabc123..."
```

### 4. Disconnect (sign-out)

To end the session and clear all authorizations:

```typescript
await client.disconnect()
```

This revokes the active session
([`wallet_revokeSession`](../reference/api.md#wallet_revokesession)).
The user will need to approve a new connection prompt to use your dapp again.

### 5. Fetch balances

#### EVM balances

Use [`invokeMethod`](../reference/api.md#wallet_invokemethod) with `eth_getBalance` to query the
balance on any EVM chain in the session.
The result is a hex-encoded wei value:

```typescript
async function getEvmBalance(scope: string, accounts: string[]): Promise<string> {
  if (accounts.length === 0) return '0'

  const address = extractAddress(accounts[0])
  const balanceHex = await client.invokeMethod({
    scope,
    request: {
      method: 'eth_getBalance',
      params: [address, 'latest'],
    },
  })

  const wei = BigInt(balanceHex as string)
  const eth = Number(wei) / 1e18
  return eth.toFixed(6)
}

const ethBalance = await getEvmBalance(SCOPES.ETHEREUM, ethAccounts)
const lineaBalance = await getEvmBalance(SCOPES.LINEA, lineaAccounts)
const baseBalance = await getEvmBalance(SCOPES.BASE, baseAccounts)
```

The same function works for all three EVM chains — only the `scope` changes.

#### Solana balance

:::note
`invokeMethod` doesn't currently support `getBalance` for Solana.
If this is something you'd like to see,
[raise a feature request](https://builder.metamask.io/c/feature-request/10) on the MetaMask
Builder Hub.
:::

Use `@solana/kit` to query the Solana RPC directly:

```typescript
import { address, createSolanaRpc } from '@solana/kit'

async function getSolBalance(accounts: string[]): Promise<string> {
  if (accounts.length === 0) return '0'

  const solAddress = extractAddress(accounts[0])
  const rpc = createSolanaRpc('https://solana-mainnet.infura.io/v3/YOUR_INFURA_API_KEY')
  const { value } = await rpc.getBalance(address(solAddress)).send()

  const sol = Number(value) / 1e9
  return sol.toFixed(6)
}

const solBalance = await getSolBalance(solAccounts)
```

### 6. Sign a message

#### EVM (`personal_sign`)

To sign a message on an EVM chain, hex-encode the message and use `personal_sign`:

```typescript
function toHex(str: string): string {
  return (
    '0x' + Array.from(new TextEncoder().encode(str), b => b.toString(16).padStart(2, '0')).join('')
  )
}

const evmAddress = extractAddress(ethAccounts[0])
const signature = await client.invokeMethod({
  scope: SCOPES.ETHEREUM,
  request: {
    method: 'personal_sign',
    params: [toHex('Hello from my multichain dapp!'), evmAddress],
  },
})
console.log('EVM signature:', signature)
```

#### Solana (`solana_signMessage`)

```typescript
const solAddress = extractAddress(solAccounts[0])
const signature = await client.invokeMethod({
  scope: SCOPES.SOLANA,
  request: {
    method: 'solana_signMessage',
    params: {
      message: btoa('Hello from my multichain dapp!'),
      pubkey: solAddress,
    },
  },
})
console.log('SOL signature:', signature)
```

### 7. Send a transaction

#### EVM transaction

Use `eth_sendTransaction` to send a transaction on any EVM scope:

```typescript
const fromAddress = extractAddress(ethAccounts[0])

const txHash = await client.invokeMethod({
  scope: SCOPES.ETHEREUM,
  request: {
    method: 'eth_sendTransaction',
    params: [
      {
        from: fromAddress,
        to: '0x0000000000000000000000000000000000000000',
        value: '0x0',
      },
    ],
  },
})
console.log('EVM tx hash:', txHash)
```

To send on a different chain, change the `scope` — for example, `SCOPES.LINEA` or `SCOPES.BASE`.
The same address format and RPC method works across all EVM chains.

#### Solana transaction

Use `solana_signAndSendTransaction` with a base64-encoded transaction:

```typescript
const result = await client.invokeMethod({
  scope: SCOPES.SOLANA,
  request: {
    method: 'solana_signAndSendTransaction',
    params: {
      transaction: '<base64-encoded-transaction>',
    },
  },
})
console.log('SOL tx signature:', result)
```

Building a Solana transaction requires assembling instructions, setting a fee payer, and fetching a
recent blockhash using `@solana/kit`.
See the [Send transactions](../guides/send-transactions.md) guide for a complete example.

## Full example

Below is the complete source for the two main files.
After scaffolding the project (Step 1), replace the contents of these files, run `npm run dev`, and
open the app in your browser.

### `src/multichain.ts`

```typescript title="src/multichain.ts"
import { createMultichainClient } from '@metamask/connect-multichain'

export const SCOPES = {
  ETHEREUM: 'eip155:1',
  LINEA: 'eip155:59144',
  BASE: 'eip155:8453',
  SOLANA: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
} as const

export const SCOPE_LABELS: Record<string, string> = {
  [SCOPES.ETHEREUM]: 'Ethereum',
  [SCOPES.LINEA]: 'Linea',
  [SCOPES.BASE]: 'Base',
  [SCOPES.SOLANA]: 'Solana',
}

let client: Awaited<ReturnType<typeof createMultichainClient>> | null = null

export async function getClient() {
  if (!client) {
    client = await createMultichainClient({
      dapp: {
        name: 'Multichain Tutorial Dapp',
        url: window.location.href,
      },
      api: {
        supportedNetworks: {
          [SCOPES.ETHEREUM]: 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
          [SCOPES.LINEA]: 'https://linea-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
          [SCOPES.BASE]: 'https://base-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
          [SCOPES.SOLANA]: 'https://solana-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
        },
      },
    })
  }
  return client
}

export function extractAddress(caip10Account: string): string {
  return caip10Account.split(':').slice(2).join(':')
}

export function toHex(str: string): string {
  return (
    '0x' + Array.from(new TextEncoder().encode(str), b => b.toString(16).padStart(2, '0')).join('')
  )
}
```

### `src/App.tsx`

```tsx title="src/App.tsx"
import { useState } from 'react'
import { address, createSolanaRpc } from '@solana/kit'
import { getClient, SCOPES, SCOPE_LABELS, extractAddress, toHex } from './multichain'

type ChainAccounts = Record<string, string[]>

export default function App() {
  const [connected, setConnected] = useState(false)
  const [accounts, setAccounts] = useState<ChainAccounts>({})
  const [balances, setBalances] = useState<Record<string, string>>({})
  const [log, setLog] = useState<string[]>([])

  const addLog = (entry: string) =>
    setLog(prev => [`[${new Date().toLocaleTimeString()}] ${entry}`, ...prev])

  // --- Connect / Disconnect ---

  const handleConnect = async () => {
    try {
      const client = await getClient()
      await client.connect([SCOPES.ETHEREUM, SCOPES.LINEA, SCOPES.BASE, SCOPES.SOLANA], [])
      const session = await client.getSession()
      const accts: ChainAccounts = {}
      for (const scope of Object.values(SCOPES)) {
        accts[scope] = session.sessionScopes[scope]?.accounts || []
      }
      setAccounts(accts)
      setConnected(true)
      addLog('Connected to all chains.')
    } catch (err: unknown) {
      addLog(`Connection failed: ${(err as Error).message}`)
    }
  }

  const handleDisconnect = async () => {
    try {
      const client = await getClient()
      await client.disconnect()
      setConnected(false)
      setAccounts({})
      setBalances({})
      addLog('Disconnected.')
    } catch (err: unknown) {
      addLog(`Disconnect failed: ${(err as Error).message}`)
    }
  }

  // --- Balances ---

  const fetchBalances = async () => {
    const client = await getClient()
    const result: Record<string, string> = {}

    for (const scope of [SCOPES.ETHEREUM, SCOPES.LINEA, SCOPES.BASE] as const) {
      const accts = accounts[scope] || []
      if (accts.length > 0) {
        try {
          const addr = extractAddress(accts[0])
          const hex = (await client.invokeMethod({
            scope,
            request: { method: 'eth_getBalance', params: [addr, 'latest'] },
          })) as string
          result[scope] = (Number(BigInt(hex)) / 1e18).toFixed(6)
        } catch (err: unknown) {
          result[scope] = `Error: ${(err as Error).message}`
        }
      }
    }

    const solAccts = accounts[SCOPES.SOLANA] || []
    if (solAccts.length > 0) {
      try {
        const solAddr = extractAddress(solAccts[0])
        const rpc = createSolanaRpc('https://solana-mainnet.infura.io/v3/YOUR_INFURA_API_KEY')
        const { value } = await rpc.getBalance(address(solAddr)).send()
        result[SCOPES.SOLANA] = (Number(value) / 1e9).toFixed(6)
      } catch (err: unknown) {
        result[SCOPES.SOLANA] = `Error: ${(err as Error).message}`
      }
    }

    setBalances(result)
    addLog('Balances fetched.')
  }

  // --- Sign message ---

  const signEvmMessage = async () => {
    try {
      const client = await getClient()
      const addr = extractAddress(accounts[SCOPES.ETHEREUM]?.[0] || '')
      const sig = await client.invokeMethod({
        scope: SCOPES.ETHEREUM,
        request: {
          method: 'personal_sign',
          params: [toHex('Hello from my multichain dapp!'), addr],
        },
      })
      addLog(`EVM signature: ${sig}`)
    } catch (err: unknown) {
      addLog(`EVM sign failed: ${(err as Error).message}`)
    }
  }

  const signSolMessage = async () => {
    try {
      const client = await getClient()
      const solAddress = extractAddress(accounts[SCOPES.SOLANA]?.[0] || '')
      const sig = await client.invokeMethod({
        scope: SCOPES.SOLANA,
        request: {
          method: 'solana_signMessage',
          params: {
            message: btoa('Hello from my multichain dapp!'),
            pubkey: solAddress,
          },
        },
      })
      addLog(`SOL signature: ${JSON.stringify(sig)}`)
    } catch (err: unknown) {
      addLog(`SOL sign failed: ${(err as Error).message}`)
    }
  }

  // --- Send transaction ---

  const sendEvmTransaction = async () => {
    try {
      const client = await getClient()
      const addr = extractAddress(accounts[SCOPES.ETHEREUM]?.[0] || '')
      const txHash = await client.invokeMethod({
        scope: SCOPES.ETHEREUM,
        request: {
          method: 'eth_sendTransaction',
          params: [{ from: addr, to: addr, value: '0x0' }],
        },
      })
      addLog(`EVM tx hash: ${txHash}`)
    } catch (err: unknown) {
      addLog(`EVM tx failed: ${(err as Error).message}`)
    }
  }

  // --- Render ---

  return (
    <div
      style={{ maxWidth: 720, margin: '0 auto', padding: 32, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Multichain Dapp</h1>

      {!connected ? (
        <button onClick={handleConnect}>Connect Wallet</button>
      ) : (
        <>
          <button onClick={handleDisconnect}>Disconnect</button>
          <h2>Accounts</h2>
          {Object.entries(accounts).map(([scope, accts]) => (
            <p key={scope}>
              <strong>{SCOPE_LABELS[scope] || scope}:</strong>{' '}
              <code>{accts.length > 0 ? extractAddress(accts[0]) : 'none'}</code>
            </p>
          ))}
          <h2>Balances</h2>
          <button onClick={fetchBalances}>Fetch Balances</button>
          {Object.entries(balances).map(([scope, bal]) => (
            <p key={scope}>
              <strong>{SCOPE_LABELS[scope] || scope}:</strong> {bal}
            </p>
          ))}
          <h2>Sign Message</h2>
          <button onClick={signEvmMessage}>Sign (EVM)</button>{' '}
          <button onClick={signSolMessage}>Sign (Solana)</button>
          <h2>Send Transaction</h2>
          <button onClick={sendEvmTransaction}>Send 0 ETH to Self</button>
        </>
      )}

      <h2>Log</h2>
      <pre
        style={{
          background: '#1a1a1a',
          color: '#e0e0e0',
          padding: 16,
          borderRadius: 8,
          maxHeight: 300,
          overflow: 'auto',
          fontSize: 13,
        }}>
        {log.length > 0 ? log.join('\n') : 'No activity yet.'}
      </pre>
    </div>
  )
}
```

## Best practices

- **Handle user rejection.**
  Users can decline the connection prompt or any signing request.
  Always wrap SDK calls in `try/catch` and show a meaningful message when the user cancels.

- **Request only the scopes you need.**
  Don't request access to chains your dapp doesn't use.
  A shorter list of scopes makes the approval prompt clearer and builds trust.

- **Use CAIP-2 constants.**
  Define scope IDs in one place (as shown in `src/multichain.ts`) instead of scattering string
  literals across your codebase.

- **Leverage session persistence.**
  Sessions survive page reloads and new tabs.
  Check for an existing session on startup with `getSession()` before prompting the user to connect
  again.

- **Show chain context clearly.**
  When displaying accounts, balances, or transaction prompts, always label which chain the action
  applies to.
  Users managing multiple chains need clear visual cues to avoid sending assets on the wrong
  network.

- **Degrade gracefully.**
  If the user declines access to some scopes, your dapp should still work for the chains they did
  approve.
  Check `session.sessionScopes` for each scope before calling `invokeMethod`.

## Next steps

- [Multichain SDK methods](../reference/methods.md) for all available methods and events.
- [Multichain API reference](../reference/api.md) for all available methods and events.
- [Sign transactions](../guides/sign-transactions.md) for more signing patterns
  including Solana signing construction.
- [Send transactions](../guides/send-transactions.md) for more transaction patterns
  including Solana transfer construction.
