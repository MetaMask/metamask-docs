# Snap lifecycle

Before beginning the development of your snap, it's important to understand the snap lifecycle.
Just like [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) or
AWS lambda functions, snaps are designed to wake up in response to messages / events, and shut down
when they are idle.
We say that snaps have an "ephemeral" lifecycle: here one moment, gone the next.
In addition, if MetaMask detects that a snap becomes unresponsive, it will be shut down.
This does not mean that you can't create long-running snaps, but it does mean that your snaps must
handle being shut down, especially when they are not within the JSON-RPC request / response cycle.

A snap is considered "unresponsive" if:

1. It has not received a JSON-RPC request for 30 seconds.
1. It takes more than 60 seconds to process a JSON-RPC request.

Stopped snaps are started whenever they receive a JSON-RPC request, unless they have been disabled.
If a snap is disabled, the user must re-enable it before it can start again.