---
description: Learn about the lifecycle of a snap.
---

# Snap lifecycle

Just like [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) or
AWS lambda functions, snaps are designed to wake up in response to messages/events, and shut down
when idle.
Snaps have an ephemeral lifecycle: they're here one moment, gone the next.
Also, if MetaMask detects that a snap becomes unresponsive, it shuts the snap down.
This doesn't mean that you can't create long-running snaps, but it does mean that your snaps must
handle being shut down, especially when they're not within the JSON-RPC request/response cycle.

A snap is considered unresponsive if:

1. It hasn't received a JSON-RPC request for 30 seconds.
1. It takes more than 60 seconds to process a JSON-RPC request.

Stopped snaps start whenever they receive a JSON-RPC request, unless they're disabled.
If a snap is disabled, the user must re-enable it before it can start again.