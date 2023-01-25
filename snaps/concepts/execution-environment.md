---
title: Snap execution environment
---

# Snaps execution environment

Snaps execute in a sandboxed environment that runs Secure EcmaScript (SES, see
[below](#secure-ecmascript-ses)).
There is no DOM, no Node.js builtins, and no platform-specific APIs other than MetaMask's `wallet`
global object.
Almost all standard JavaScript globals contained in
[this list](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) that
are also in Node.js are available as normal.
This includes things like `Promise`, `Error`, `Math`, `Set`, `Reflect` etc.

In addition, the following globals are available:

- `console`
- `crypto`
- `fetch` / `WebSocket` (with the [appropriate permission](#accessing-the-internet))
- `setTimeout` / `clearTimeout`
- `setInterval` / `clearInterval`
- `SubtleCrypto`
- `WebAssembly`
- `TextEncoder` / `TextDecoder`
- `atob` / `btoa`
- `URL`

The execution environment is instrumented in this way to:

1. Prevent snaps from influencing any other running code, including MetaMask itself.
    - In plain terms, to prevent all snaps from polluting the global environment and malicious snaps
      from stealing the user's stuff.
1. Prevent snaps from accessing sensitive JavaScript APIs (like `fetch`) without permission.
1. Ensure that the execution environment is "fully virtualizable", i.e. platform-independent.

This allows us to safely execute snaps anywhere, without the snap needing to worry about where and
how it is executed.

### Secure EcmaScript (SES)

Secure EcmaScript, or [SES](https://github.com/endojs/endo/tree/master/packages/ses), is a subset of
the JavaScript language designed to enable mutually suspicious programs to execute in the same
JavaScript process (or more accurately, the same [realm](https://tc39.es/ecma262/#realm)).
You can think of it as a more severe form of
[strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).

---

## Execution environment

Snaps are untrusted JavaScript programs that execute safely inside the MetaMask application.
To isolate snaps from the rest of the application and to provide a “fully virtualizable” execution
environment, MetaMask uses [Secure EcmaScript (SES)](https://github.com/endojs/endo/tree/master/packages/ses),
a subset of JavaScript developed by [Agoric](https://agoric.com/).

Among other things, SES allows MetaMask to restrict access to global JavaScript APIs and isolate
untrusted code from other parts of the application.
SES does this at the cost of some performance and incompatibility with some JavaScript practices,
such as modifying prototypes of intrinsic objects (for example, the `Promise` constructor).