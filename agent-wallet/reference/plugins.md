---
description: MetaMask Agent Wallet plugin reference including the manifest schema, capability types, data access categories, and the plugin SDK surface.
keywords: [MetaMask, Agent Wallet, plugin, manifest, capabilities, reference, PluginCommand]
---

# Plugins

Reference for MetaMask Agent Wallet plugin authors.
See the [plugins overview](../plugins/index.md) for concepts and the
[build a plugin](../plugins/build-a-plugin.md) guide.

## Plugin manifest

Every plugin declares an `mm` block in its `package.json`.
Agent Wallet validates the manifest at install time and shows its contents on the consent screen.

The package must also declare the `oclif-plugin` keyword, a `@metamask/agent-wallet`
peer dependency, an `oclif` block pointing at the compiled commands, and a generated
`oclif.manifest.json` shipped in the package.

Packages that declare `oclif.hooks` or `oclif.plugins` are rejected because hooks run outside the
plugin boundary.

```json
"mm": {
  "schemaVersion": 1,
  "minCliVersion": "^6.2.0",
  "capabilities": [],
  "commands": [
    {
      "id": "hello:balance",
      "capabilities": ["wallet-read"],
      "dataAccess": ["balances"],
      "targetChains": "any"
    }
  ]
}
```

| Field                     | Required | Description                                                                                                              |
| ------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `schemaVersion`           | Yes      | Manifest schema version. Must be `1`.                                                                                    |
| `minCliVersion`           | Yes      | Semver range of Agent Wallet versions the plugin supports. The plugin system shipped in 6.2.0, so use `^6.2.0` or later. |
| `capabilities`            | No       | Plugin-wide capabilities merged into every command. Keep this empty to avoid over-granting.                              |
| `commands`                | Yes      | One entry per command. At least one command is required.                                                                 |
| `commands[].id`           | Yes      | Command id matching the command's `pluginCommandId`, such as `hello:balance`.                                            |
| `commands[].capabilities` | No       | Capabilities this command needs. Defaults to none.                                                                       |
| `commands[].dataAccess`   | No       | Data categories the command reads, shown on the consent screen. Defaults to none.                                        |
| `commands[].targetChains` | No       | `"any"` or a list of EVM chain ids the command targets. Defaults to `"any"`.                                             |

## Capability types

Capabilities gate what a command can reach on the plugin context.
Users consent to them at install time.

The capabilities `mnemonic-read` and `config-write` are reserved.
Manifests that declare them are rejected.

A command that uses a gated member without declaring the matching capability fails at runtime with
`PERMISSION_DENIED`.

| Capability       | Grants                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `wallet-read`    | Read services and the authenticated per-chain EVM RPC client. See the table below.           |
| `wallet-submit`  | `ctx.walletExecutor` for signing and transaction submission, still policy-gated by MetaMask. |
| `network-manage` | `ctx.networkRegistry`. Reserved for future network management.                               |

## Plugin context

Commands access the host through `this.ctx`, a curated context the host restricts per command
based on its granted capabilities.

The session, CLI token, and mnemonic store are host-only.
Accessing them from a plugin always fails with `PERMISSION_DENIED`.

| Context member                    | Requires         | Description                                                         |
| --------------------------------- | ---------------- | ------------------------------------------------------------------- |
| `logger`, `args`, `flags`, `argv` | None             | Always available.                                                   |
| `accountService`                  | `wallet-read`    | Account and balance queries.                                        |
| `authService`                     | `wallet-read`    | Authentication state queries.                                       |
| `priceService`                    | `wallet-read`    | Spot and historical prices.                                         |
| `tokenService`                    | `wallet-read`    | Token metadata and discovery.                                       |
| `walletStateManager`              | `wallet-read`    | Local wallet state snapshot, including wallets and the selection.   |
| `feesService`                     | `wallet-read`    | Fee estimates.                                                      |
| `swapQuoteStore`                  | `wallet-read`    | Persisted swap quotes.                                              |
| `publicClient(chainId)`           | `wallet-read`    | Authenticated per-chain viem public client for raw EVM reads.       |
| `walletExecutor(io, source)`      | `wallet-submit`  | Executor for transactions, message signing, and typed-data signing. |
| `networkRegistry`                 | `network-manage` | Supported network registry.                                         |

### Raw EVM reads

With `wallet-read`, call `ctx.publicClient(chainId)` for an authenticated
[viem](https://viem.sh) public client backed by the same RPC gateway the host uses:

```ts
const client = this.ctx.publicClient(1)
const balance = await client.getBalance({ address })
```

### Signing and submission

With `wallet-submit`, call `ctx.walletExecutor(io, "<command-id>")` to get an executor.
The executor accepts three request kinds and routes every request through MetaMask policy:

| Request kind  | Description                          | Result                      |
| ------------- | ------------------------------------ | --------------------------- |
| `transaction` | Submit an EVM transaction on a chain | Transaction hash and status |
| `message`     | Sign a plaintext message             | Signature                   |
| `typed-data`  | Sign an EIP-712 typed-data payload   | Signature                   |

## PluginCommand class

A plugin command extends `PluginCommand` and implements `execute`. The security-critical lifecycle is sealed.
A subclass that overrides `run`, `runLifecycle`, `beforeExecute`, `init`, `prepareForRepl`,
`withPluginIsolation`, or the `requiresAuth`, `requiresInit`, and `requiresFees` getters throws
`PLUGIN_SEALED_OVERRIDE` before it can run.
Fee-cache warmup is host-only and always off for plugin commands.

| Member                                            | Role                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------ |
| `execute(io)`                                     | Required. The command's logic. Its return value is rendered by the host. |
| `pluginCommandId`                                 | Required. Must match the command's manifest `id`.                        |
| `description`, `examples`, `flags`, `args`        | Static configuration shown in help output.                               |
| `requiresAuth`                                    | Static. Gates the sign-in check. Defaults to `true`.                     |
| `requiresInit`                                    | Static. Gates the wallet setup check. Defaults to `true`.                |
| `afterExecute`, `successHint`, `analyticsOutcome` | Optional hooks.                                                          |

## Plugin SDK surface

Import from `@metamask/agent-wallet/plugin`:

| Export                                                                                        | Description                                             |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `PluginCommand`                                                                               | Base class for plugin commands.                         |
| `PluginCommandContext`                                                                        | Type of the curated context available as `this.ctx`.    |
| `PluginManifest`, `definePluginManifest`, `PluginManifestSchema`                              | Manifest type, authoring helper, and schema.            |
| `CommandIO`                                                                                   | Interaction surface passed to `execute`.                |
| `CommandError`, `ok`, result helpers                                                          | Error and result envelope helpers.                      |
| `schemaToFlags`, `schemaToArgs`, `resolveInputs`, `mergeArgsIntoFlags`, `enumFlag`, `trimKey` | Declarative input engine.                               |
| `InputFieldType`, `InputSchema`, `InputField`, `ResolvedInputs`, `SelectOption`, `Asker`      | Input types.                                            |
| `PublicClient`                                                                                | viem public client type returned by `ctx.publicClient`. |

## Data access categories

`commands[].dataAccess` labels the data a command reads.
The categories appear on the consent screen and are informational.

`accounts`, `balances`, `prices`, `tokens`, `network`, `fees`, `swap-quotes`, `session`,
`mnemonic`

## Storage locations

| Data                        | Location                                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| Plugin code                 | The oclif data directory. On macOS `~/Library/Application Support/mm/`, on Linux `~/.local/share/mm/`. |
| Approvals and configuration | `~/.metamask/config.json` under the `plugins` key.                                                     |

Each approval record stores the approved version, package integrity, manifest hash, approved
capabilities, approved command IDs, and an approval timestamp.

The data directory is outside the running CLI's module tree, so Agent Wallet symlinks itself into
the data directory's `node_modules` when user plugins are installed. That way a plugin's
`@metamask/agent-wallet/plugin` import resolves to the same running instance rather than loading a
second copy of the CLI. Declare `@metamask/agent-wallet` as a peer dependency, not a regular
dependency, so the symlink is what resolves.

## Related pages

- [Plugins overview](../plugins/index.md)
- [Install a plugin](../plugins/install-a-plugin.md)
- [Build a plugin](../plugins/build-a-plugin.md)
- [Error codes](error-codes.md#plugin-errors)
