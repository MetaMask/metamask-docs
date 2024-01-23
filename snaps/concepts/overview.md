---
description: Learn about the Snaps system at a high level.
sidebar_position: 1
---

# Snaps overview

MetaMask Snaps is an open source system that allows anyone to safely extend the functionality of
MetaMask, creating new web3 end user experiences.
For example, a Snap can add support for different blockchain protocols, add custom account types, or
provide additional functionality using its own APIs.
This allows MetaMask to be used with a far more diverse set of protocols, dapps, and services.

## Architecture diagram


## Technical overview

A Snap is a JavaScript program run in an isolated environment that customizes the wallet experience.
To isolate Snaps from the rest of the application, MetaMask uses [Secure EcmaScript (SES)](execution-environment.md).
This allows MetaMask to restrict access to global JavaScript APIs and to isolate a Snap's code from
other parts of the application.

### Permissions

By default, a Snap has no capabilities.
It must [request capabilities](../how-to/request-permissions.md) to be granted by the user at
installation, such as accessing the network, storing data in MetaMask, or displaying dialogs.
Data stored by a snap is only visible to that Snap, and a Snap cannot access data of other Snaps or
of MetaMask core unless given permission to do so.

### APIs

As with MetaMask's Ethereum Provider RPC API, Snaps communicate with MetaMask using JSON-RPC.
New RPC methods have been added to MetaMask's JSON-RPC API as well, which are documented as part of
the Snaps API.
These new methods are what allow Snaps to extend or modify the functionality of MetaMask.
In addition, they also allow dapps to install and communicate with individual Snaps, and Snaps to
communicate with each other.

Learn more [about the Snaps APIs](apis.md).

### Lifecycle

Just like [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) or
AWS lambda functions, Snaps are designed to wake up in response to messages/events, and shut down
when idle.
Snaps have an ephemeral lifecycle: they're here one moment, gone the next.
Also, if MetaMask detects that a Snap becomes unresponsive, it shuts the Snap down.

A Snap is considered unresponsive if:

1. It hasn't received a JSON-RPC request for 30 seconds.
1. It takes more than 60 seconds to process a JSON-RPC request.

Stopped Snaps start whenever they receive a JSON-RPC request, unless they're disabled.
If a Snap is disabled, the user must re-enable it before it can start again.

### User interface

Any Snap must represent itself and what it does to the end user.
Using the MetaMask settings page, the user can see their installed Snaps.
For each Snap, the user can:

- See most of its manifest data.
- See its execution status (running, stopped, or crashed).
- Enable and disable the Snap.

Other than the settings page, a Snap can modify the MetaMask UI using
[custom UI](../how-to/use-custom-ui.md) in only two ways:

- By opening a dialog using the [`snap_dialog`](../reference/rpc-api.md#snap_dialog) RPC method.
- By returning transaction insights from the [`onTransaction`](../reference/exports.md#ontransaction)
  export.

This means that most Snaps must rely on dapps and their own RPC methods to present their data to the user.

Providing more ways for Snaps to modify the MetaMask UI is an important goal of the Snaps system,
and over time more and more Snaps will be able to contain their user interfaces entirely within
MetaMask itself.
