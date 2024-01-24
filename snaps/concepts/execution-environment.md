---
description: Learn about the Snaps execution environment.
sidebar_position: 4
---

# Snaps execution environment

Snaps are untrusted JavaScript programs that execute safely in a sandboxed environment that runs
[Secure ECMAScript (SES)](#secure-ecmascript-ses).
This allows MetaMask to restrict access to global JavaScript APIs and to isolate a Snap's code from
other parts of the application.

There's no DOM, no Node.js built-ins, and no platform-specific APIs other than MetaMask's `wallet`
global object.
Almost all standard JavaScript globals contained in
[this list](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) that
are also in Node.js are available as normal.
This includes globals such as `Promise`, `Error`, `Math`, `Set`, and `Reflect`.

The following globals are also available:

- `console`
- `crypto`
- `fetch` (with the
  [`endowment:network-access`](../reference/permissions.md#endowmentnetwork-access) permission)
- `setTimeout` / `clearTimeout`
- `setInterval` / `clearInterval`
- `SubtleCrypto`
- `WebAssembly` (with the
  [`endowment:webassembly`](../reference/permissions.md#endowmentwebassembly) permission)
- `TextEncoder` / `TextDecoder`
- `atob` / `btoa`
- `URL`

The execution environment is instrumented in this way to:

1. Prevent Snaps from influencing any other running code, including MetaMask itself.
   That is, prevent all Snaps from polluting the global environment and malicious Snaps from
   stealing the user's stuff.
1. Prevent Snaps from accessing sensitive JavaScript APIs (such as `fetch`) without permission.
1. Ensure that the execution environment is "fully virtualizable," that is, platform-independent.

This allows you to safely execute Snaps anywhere, without the Snap needing to worry about where and
how it's executed.

## Secure ECMAScript (SES)

[Secure ECMAScript (SES)](https://github.com/endojs/endo/tree/master/packages/ses), is a subset of
the JavaScript language designed to enable mutually suspicious programs to execute in the same
JavaScript process (or more accurately, the same [realm](https://tc39.es/ecma262/#realm)).
You can think of it as a more severe form of
[strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).
