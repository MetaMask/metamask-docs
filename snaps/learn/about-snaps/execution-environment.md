---
description: Learn about the Snaps execution environment.
sidebar_position: 3
---

# Snaps execution environment

Snaps are untrusted JavaScript programs that execute safely in a sandboxed environment that runs
[Secure ECMAScript (SES)](#secure-ecmascript-ses).
This allows MetaMask to restrict access to global JavaScript APIs and to isolate a Snap's code from
other parts of the application.

This environment does not have a DOM, Node.js built-ins, or platform-specific APIs other than the
default `snap` global and MetaMask's `ethereum` global.

The execution environment is designed to:

- Prevent Snaps from polluting the global environment.
- Prevent malicious Snaps from stealing from users.
- Prevent Snaps from accessing sensitive JavaScript global APIs (such as `fetch`) without permission.
- Be "fully virtualizable," or platform-independent.

This allows you to safely execute Snaps anywhere, without the Snap needing to worry about where and
how it's executed.

## Supported globals

A Snap can access the [Snaps API](apis.md#snaps-api) using the `snap` global, and the
[MetaMask JSON-RPC API](apis.md#metamask-json-rpc-api) using the `ethereum` global.
To access the `ethereum` global, a Snap must request the
[`endowment:ethereum-provider`](../../reference/permissions.md#endowmentethereum-provider) permission.

Almost all
[standard JavaScript globals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
that are also in Node.js are available to Snaps.
This includes globals such as `Promise`, `Error`, `Math`, `Set`, and `Reflect`.

The following globals are also available:

- `console`
- `fetch` (with the
  [`endowment:network-access`](../../reference/permissions.md#endowmentnetwork-access) permission)
- `setTimeout` / `clearTimeout`
- `setInterval` / `clearInterval`
- `SubtleCrypto`
- `WebAssembly` (with the
  [`endowment:webassembly`](../../reference/permissions.md#endowmentwebassembly) permission)
- `TextEncoder` / `TextDecoder`
- `atob` / `btoa`
- `URL`

:::info note
To use Node.js built-in modules such as `crypto` and `path`, set the
[`polyfills`](../../reference/cli/options.md#polyfills) configuration option to `true`.
:::

## Secure ECMAScript (SES)

[Secure ECMAScript (SES)](https://github.com/endojs/endo/tree/master/packages/ses) is an implementation of the [Hardened JavaScript](https://hardenedjs.org/) proposal. 
Hardened JavaScript is a subset of JavaScript designed to enable mutually suspicious programs to execute in the same JavaScript process
(or the same [realm](https://tc39.es/ecma262/#realm)).
You can think of it as a more severe form of
[JavaScript strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).
