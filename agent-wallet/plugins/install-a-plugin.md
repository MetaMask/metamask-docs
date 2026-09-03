---
description: Install, review, update, and remove MetaMask Agent Wallet plugins.
keywords: [MetaMask, Agent Wallet, plugin, install, consent, capabilities]
---

# Install a plugin

Install plugins to add new commands to MetaMask Agent Wallet.
Every install shows a consent screen listing the plugin's commands, data access, and requested
capabilities before anything runs.

## Enable plugins

Plugins are a beta feature and are off by default.
Installing and running plugins are both blocked until you enable the feature.

```bash
mm config set experimentalPlugins true
```

## Install from npm

Agent Wallet fetches the package metadata, shows the consent screen, and installs after you
approve. Installs fail closed when the registry is unreachable or the package can't be verified.

```bash
mm plugins install <package>

# Pass `--accept-permissions` to skip the interactive prompt in scripts and CI
mm plugins install <package> --accept-permissions
```

## Install a local plugin

Local `file:` paths and git sources can't be verified, so you need to opt in first.
This is intended for development only.
Without the opt-in, these installs are refused with `PLUGIN_UNVERIFIED_SOURCE`.

```bash
mm config set experimentalAllowUnverifiedInstalls true
mm plugins install file:/path/to/plugin --accept-permissions
```

Prefer installing from the plugin directory rather than a packed tarball.
Agent Wallet reads the manifest from the directory, so it can show the full capability consent
screen before installing. A tarball shows only the unverified-source banner, because the manifest
isn't readable until the package is unpacked. Either way, Agent Wallet persists the approved
capabilities after the install completes.

To develop against a directory without copying it, use `mm plugins link`, which shows the same
consent screen:

```bash
mm plugins link /path/to/plugin
```

## Manage installed plugins

`mm plugins update` shows the consent screen again for any plugin whose version or manifest
changed.

```bash
mm plugins                          # list installed plugins
mm plugins inspect <package>        # show plugin details
mm plugins update                   # update all and re-consent changed manifests
mm plugins uninstall <package>      # remove a plugin
```

## Disable plugins

Turn the whole plugin system off at any time. Installed plugin commands then fail with `PLUGIN_BETA_DISABLED` until you re-enable the feature.

```bash
mm config set experimentalPlugins false
```

## Next steps

- [Build a plugin](build-a-plugin.md)
