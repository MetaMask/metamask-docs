---
description: Learn about the lifecycle of a Snap.
sidebar_position: 2
---

# Snaps lifecycle

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
