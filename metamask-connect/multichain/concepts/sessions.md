---
sidebar_label: Sessions
description: Learn how CAIP-25 sessions work in MetaMask Connect Multichain to group authorized scopes and accounts into a single connection.
keywords: [multichain, caip, caip-25, session, sessionScopes, connection, persistence, disconnect, getSession]
---

# Sessions (CAIP-25)

A session is a single authorized connection that bundles approved [scopes](./scopes.md) and
[accounts](./accounts.md), as defined in
[CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md). If the wallet returns
a `sessionId`, the dapp and wallet can reference that session directly. If the wallet does not
return a `sessionId`, the wallet must track the session state internally. For more information about
the session lifecycle, see [CAIP-316](https://standards.chainagnostic.org/CAIPs/caip-316).

You read the session with [`getSession`](../reference/methods.md#getsession), and you end or change it with [`disconnect`](../reference/methods.md#disconnect). That way your dapp always has a single place to see what MetaMask approved, and the connection can persist across reloads and tabs.

## Format

As defined by [CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md), when a user approves a connection, MetaMask creates a session that includes:

- **`sessionScopes`**: The chains the user approved, each with its associated accounts.
- **Persistence**: Sessions survive page reloads and new tabs.
- **Lifecycle**: Use [`getSession`](../reference/methods.md#getsession) to retrieve session data and [`disconnect`](../reference/methods.md#disconnect) to end or modify the session.

```javascript
const session = await client.getSession()

const ethAccounts = session.sessionScopes['eip155:1']?.accounts || []
const solAccounts = session.sessionScopes['solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp']?.accounts || []
```

## Next steps

- [Scopes](./scopes.md): Understand CAIP-2 chain identifiers used in sessions.
- [Accounts](./accounts.md): Learn how CAIP-10 account IDs identify accounts across chains.
