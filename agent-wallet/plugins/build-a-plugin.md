---
description: Build a MetaMask Agent Wallet plugin from the official template and publish it to npm.
keywords: [MetaMask, Agent Wallet, plugin, build, template, PluginCommand, capabilities]
---

# Build a plugin

This guide helps you build your own MetaMask Agent Wallet plugin, starting from the
[plugin template](https://github.com/MetaMask/agent-wallet-plugin-template).
The template ships a working `mm hello ping` command that you can rename and extend, so you have
something running before you write any code.

By the end of this guide, you have a plugin that adds your own command to Agent Wallet, tested
locally and ready to publish.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/download) v22 or later.

## 1. Clone the template

Clone the [plugin template](https://github.com/MetaMask/agent-wallet-plugin-template) into a
directory named after your plugin.

```bash
git clone https://github.com/MetaMask/agent-wallet-plugin-template my-plugin
cd my-plugin
```

## 2. Install the dependencies

Use your preferred package manager to install the dependencies.

```bash npm2yarn
npm install
```

## 3. Update the manifest

The `package.json` file declares your plugin's identity and the `mm` block declares what each
command does and needs.
Replace the template's placeholder values with your own:

- Set `name` and `description`.
- In the `mm` block, update each `commands[].id` to your command id.
- If a command reads wallet data or signs anything, list the capabilities and data access it needs.

Users consent to these capabilities at install time.
Keep the plugin-wide `capabilities` list empty because it is merged into every command.
See the [plugins reference](../reference/plugins.md) for every manifest field, capability, and
data access category.

```json
"mm": {
  "schemaVersion": 1,
  "minCliVersion": "^6.2.0",
  "capabilities": [],
  "commands": [
    {
      "id": "hello:balance",
      "capabilities": ["wallet-read"],
      "dataAccess": ["balances"]
    }
  ]
}
```

## 4. Write your command

Rename the template's command file to match the id you declared in the manifest.
The file path defines the command.
For example, `src/commands/hello/ping.ts` becomes `mm hello ping` with id `hello:ping`.

To write the command, extend `PluginCommand` from `@metamask/agent-wallet/plugin` and implement
`execute`.
The template's command shows the full pattern.

Keep the following rules in mind as you write your command:

- You implement only `execute`, plus static configuration and the optional hooks `afterExecute`,
  `successHint`, and `analyticsOutcome`.
  The rest of the lifecycle is sealed by the host.
- `pluginCommandId` must match the command's `id` in the plugin manifest.
- `requiresAuth` and `requiresInit` gate sign-in and wallet setup.
  Both default to `true`.
- Declare inputs once as a schema.
  `schemaToFlags` and `schemaToArgs` generate the command surface, and `io.resolveInputs` resolves
  flags, positionals, and interactive prompts.
- The base flags `--json`, `--format`, `--toon`, and `--verbose` are inherited automatically.

```ts
import {
  type CommandIO,
  InputFieldType,
  type InputSchema,
  PluginCommand,
  schemaToArgs,
  schemaToFlags,
} from '@metamask/agent-wallet/plugin'

const inputs = {
  name: {
    type: InputFieldType.Text,
    flag: 'name',
    message: 'Name to greet',
    required: false,
    prompt: false,
    index: 0,
  },
} satisfies InputSchema

export default class HelloPing extends PluginCommand<{ message: string }> {
  static override description = 'Say hello from the plugin template.'
  static override requiresAuth = false
  static override requiresInit = false
  static override flags = schemaToFlags(inputs)
  static override args = schemaToArgs(inputs)

  protected readonly pluginCommandId = 'hello:ping'

  async execute(io: CommandIO) {
    const { name } = await io.resolveInputs(inputs)
    return { message: name ? `pong, ${name}!` : 'pong' }
  }
}
```

## 5. Build and test locally

Now build your plugin and install it into your local Agent Wallet to try it out. Install from the
directory rather than a packed tarball, so Agent Wallet can read your manifest and show the full
capability consent screen.

As you iterate, run `mm plugins uninstall <name>` to remove the plugin before you install it again.

```bash npm2yarn
npm run build
mm config set experimentalPlugins true
mm config set experimentalAllowUnverifiedInstalls true
mm plugins install "file:$PWD" --accept-permissions
mm hello ping Alice
```

## 6. Publish

When your plugin works the way you want, publish the package to npm.

Users then install it with `mm plugins install <your-package>` and review a consent screen listing
your commands, data access, and requested capabilities.

```bash npm2yarn
npm publish
```

## Next steps

- Browse the [plugin examples repository](https://github.com/MetaMask/agent-wallet-plugin-examples)
  for complete working plugins, including an ENS resolver built on the authenticated RPC client.
- See the [plugins reference](../reference/plugins.md) for the manifest schema, capability types,
  and the published SDK surface.
