---
sidebar_label: Sessions
description: Learn how CAIP-25 sessions work in MetaMask Connect Multichain to group authorized scopes and accounts into a single connection.
keywords:
  [
    multichain,
    caip,
    caip-25,
    session,
    sessionScopes,
    connection,
    persistence,
    disconnect,
    getSession,
  ]
---

# Sessions (CAIP-25)

A session is an authorized connection between your dapp and MetaMask that can span multiple blockchain ecosystems and chains, as defined in
[CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md).
When a user approves a connection, MetaMask creates a session including the approved [scopes](./scopes.md) and [accounts](./accounts.md).

MetaMask Connect Multichain provides the method [`getSession`](../reference/methods.md#getsession) to get information about the current session,
and the method [`disconnect`](../reference/methods.md#disconnect) to end or update the session.
For more information about the session lifecycle, see [CAIP-316](https://standards.chainagnostic.org/CAIPs/caip-316).

A session is persistent, meaning it survives across page reloads and new tabs.

A session includes `sessionScopes`, which contains the chains the user approved, each with its associated accounts.
The following example extracts the approved Ethereum Mainnet and Solana Mainnet accounts from `sessionScopes`:

```javascript
const session = await client.provider.getSession()

const ethAccounts = session.sessionScopes['eip155:1']?.accounts || []
const solAccounts = session.sessionScopes['solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp']?.accounts || []
```

:::note
MetaMask doesn't support session IDs.
:::

## Next steps

- [Scopes](./scopes.md): Understand CAIP-2 chain identifiers used in sessions.
- [Accounts](./accounts.md): Learn how CAIP-10 account IDs identify accounts across chains.
