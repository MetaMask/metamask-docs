---
description: Solve common issues.
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Troubleshoot common issues

This page describes common issues you may encounter when developing a Snap, and how to resolve them.

If you encounter any issues that you can't solve on your own, please
[open a GitHub issue](https://github.com/MetaMask/snaps-monorepo/issues).

## Fix build and evaluation issues

Because [Secure ECMAScript (SES)](../../learn/about-snaps/execution-environment.md) adds additional restrictions
on the JavaScript runtime on top of strict mode, code that executes normally under strict mode might
not under SES.
[`yarn mm-snap build`](../../reference/cli/subcommands.md#b-build) by default attempts to execute a
Snap in a stubbed SES environment.
You can also disable this behavior and run the evaluation step separately using
[`yarn mm-snap eval`](../../reference/cli/subcommands.md#e-eval).
If an error is thrown during this step, it's likely due to a SES incompatibility, and you must fix
the issues manually.
These incompatibilities tend to occur in dependencies.

The errors you get from SES are usually easy to fix.
The actual file, function, and variable names in the `eval` error stack trace might not make sense
to you, but the line numbers should correspond to your Snap [bundle file](../../learn/about-snaps/files.md#bundle-file).
Thus, you can identify if the error is due to your code or one of your dependencies.
If the problem is in a dependency, you can try a different version or to fix the issue locally by
using tools such as [`patch-package`](https://npmjs.com/package/patch-package) (see how to
[patch dependencies](#patch-dependencies)) or by modifying the bundle file directly.

To give you an idea of a common error and how to fix it, "sloppily" declared variables (i.e.
assigning to a new variable without an explicit variable declaration) are forbidden in strict mode,
and therefore in SES as well.
If you get an error during the `eval` step that says something like `variableName is not defined`,
simply prepending `var variableName;` to your Snap bundle may solve the problem.
(This actually happened so frequently with [Babel's](https://babeljs.io/) `regeneratorRuntime` that
`yarn mm-snap build` automatically handles that one.)

:::caution
Run [`yarn mm-snap manifest --fix`](../../reference/cli/subcommands.md#m-manifest) if you modified
your Snap bundle after building.
Otherwise your manifest `shasum` value won't be correct, and attempting to install your Snap fails.
:::

### Use other build tools

If you prefer building your Snap with a build system you're more comfortable with, Snaps implements
plugins for several other build systems:

- [Webpack](https://www.npmjs.com/package/@metamask/snaps-webpack-plugin)
- [Rollup](https://www.npmjs.com/package/@metamask/rollup-plugin-snaps)
- [Browserify](https://www.npmjs.com/package/@metamask/snaps-browserify-plugin)

For examples on how to set up these build systems yourself, please see the
[examples](https://github.com/MetaMask/snaps-monorepo/tree/main/packages/examples/examples).

We recommend running [`yarn mm-snap manifest --fix`](../../reference/cli/subcommands.md#m-manifest)
after creating your bundle to make sure your manifest `shasum` value is correct.
You might also benefit from running [`yarn mm-snap eval`](../../reference/cli/subcommands.md#e-eval)
to detect any SES issues up front.

## Patch dependencies

Some dependencies might use APIs that aren't available in the
[Snaps execution environment](../../learn/about-snaps/execution-environment.md).
To work around this, we recommend checking if another library is available that makes use of those APIs.

If you can't find another library (or version) that works with the Snaps execution environment, you
can patch the dependency yourself using [`patch-package`](https://npmjs.com/package/patch-package).

`patch-package` allows you to make changes to your dependencies, saving the changes as a patch and
replaying it when installing dependencies.

Install `patch-package` using Yarn:

```bash
yarn add -D patch-package postinstall-postinstall
```

Then add a postinstall script to your `package.json`:

```diff
 "scripts": {
+  "postinstall": "patch-package"
 }
```

Now you can make changes to your dependencies inside `node_modules` and run
`yarn patch-package package-name` to save the changes as a patch.
This creates a `.patch` file containing your dependency patch.
These patches can be committed to your Git repository and are replayed when you re-install your dependencies.

### Patch the use of XMLHttpRequest

The `XMLHttpRequest` API is not exposed in the Snaps execution environment and won't be in the future.
Because of this, you may run into issues with dependencies in your dependency tree attempting to
use this API for their network requests.

The following are examples of popular libraries that use `XMLHttpRequest` and are thus **not**
compatible with the Snaps execution environment.
This section also describes patching strategies for fixing dependencies that try to use these libraries.

#### cross-fetch

`cross-fetch` is a popular library used for cross-platform access to the `fetch` API across multiple
environments.
Under the hood, however, the library uses `XMLHttpRequest` and thus causes issues when used in a Snap.

You can easily patch this issue using `patch-package`.
Open `node_modules/cross-fetch/browser-ponyfill.js` and find the following lines near the bottom of
the file:

```javascript
// Choose between native implementation (global) or custom implementation (__self__)
// var ctx = global.fetch ? global : __self__;
var ctx = __self__; // this line disable service worker support temporarily
```

You can replace that with the following snippet:

```javascript
// Choose between native implementation (global) or custom implementation (__self__)
var ctx = global.fetch
  ? { ...global, fetch: global.fetch.bind(global) }
  : __self__;
// var ctx = __self__; // this line disable service worker support temporarily
```

After replacing it, run `yarn patch-package cross-fetch`, which saves the patch for future use.

Alternatively, you can use the following patch, copy and paste it to
`patches/cross-fetch+3.1.5.patch`, and re-install your dependencies:

```diff
diff --git a/node_modules/cross-fetch/dist/browser-ponyfill.js b/node_modules/cross-fetch/dist/browser-ponyfill.js
index f216aa3..6b3263b 100644
--- a/node_modules/cross-fetch/dist/browser-ponyfill.js
+++ b/node_modules/cross-fetch/dist/browser-ponyfill.js
@@ -543,8 +543,8 @@ __self__.fetch.ponyfill = true;
 // Remove "polyfill" property added by whatwg-fetch
 delete __self__.fetch.polyfill;
 // Choose between native implementation (global) or custom implementation (__self__)
-// var ctx = global.fetch ? global : __self__;
-var ctx = __self__; // this line disable service worker support temporarily
+var ctx = global.fetch ? { ...global, fetch: global.fetch.bind(global) } : __self__;
+// var ctx = __self__; // this line disable service worker support temporarily
 exports = ctx.fetch // To enable: import fetch from 'cross-fetch'
 exports.default = ctx.fetch // For TypeScript consumers without esModuleInterop.
 exports.fetch = ctx.fetch // To enable: import {fetch} from 'cross-fetch'
```

Using either of these methods allows your dependencies to access the `fetch` API correctly and
`cross-fetch` compatible with the Snaps execution environment.

#### axios

`axios` is a popular networking library that uses `XMLHttpRequest` under the hood.

Currently, there's no known way of patching `axios` to work with the Snaps execution environment.
Instead, you must replace `axios` with another library such as `isomorphic-fetch` or
`isomorphic-unfetch`, or simply use the Snaps execution environment global `fetch`.

The following is an example of how you can rewrite your dependency to use `fetch` instead of `axios`.

:::note
In a production environment this may be a large task depending on the usage of `axios`.
:::

<Tabs>
<TabItem value="axios">

```javascript
const instance = axios.create({
  baseURL: 'https://api.github.com/',
});

instance
  .get('users/MetaMask')
  .then((res) => {
    if (res.status >= 400) {
      throw new Error('Bad response from server');
    }
    return res.data;
  })
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.error(err);
  });
```

</TabItem>
<TabItem value="fetch">

```javascript
fetch('https://api.github.com/users/MetaMask')
  .then((res) => {
    if (!res.ok) {
      throw new Error('Bad response from server');
    }
    return res.json();
  })
  .then((json) => console.log(json))
  .catch((err) => console.error(err));
```

</TabItem>
</Tabs>

For more information, see how to
[replace axios with a simple custom fetch wrapper](https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper).
