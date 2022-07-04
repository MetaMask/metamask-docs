# Patching Dependencies

::: tip Only Available in MetaMask Flask
[Snaps](./snaps.html) is only available in [MetaMask Flask](https://metamask.io/flask).
:::

A problem that may arise as you develop your snap is that some dependencies make use of APIs that aren't available in the snaps execution environment. To work around this, we firstly recommend that you check if another library is available that makes use of the APIs made available for snaps (see [Snaps Development Guide](./snaps-development-guide.html#the-snap-execution-environment) for a list of APIs).

If you are unable to find another library (or version) that works with the snaps execution environment, another way of solving the problem is by patching the dependency yourself. For this we can leverage [`patch-package`](https://npmjs.com/package/patch-package).

`patch-package` works by allowing you to make changes to your dependencies, saving the changes as a patch and replaying it when installing dependencies.

To use it, install it using the following command:

`yarn add -D patch-package postinstall-postinstall`.

Then add a postinstall script to your `package.json`.

```diff
 "scripts": {
+  "postinstall": "patch-package"
 }
```

Now you can make changes to your dependencies inside `node_modules` and run `yarn patch-package package-name` to save the changes as a patch. This will create a `.patch` file containing your dependency patch. These patches can be committed to your Git repository and will be replayed when you re-install your dependencies.

**If you need guidance in how you can patch your dependencies or otherwise need help troubleshooting dependency problems, please create an issue on the [MetaMask/snaps-skunkworks](https://github.com/MetaMask/snaps-skunkworks) repository.**

## Patching the use of XMLHttpRequest

The `XMLHttpRequest` API is not exposed in the snaps execution environment and will not be in the future. Because of this, you may run into issues with dependencies in your dependency tree attempting to leverage this API for their network requests.

Below we've included some examples of popular libraries that use `XMLHttpRequest` and are therefore not compatible with the snaps execution environment. Below you'll also find some patching strategies for fixing dependencies that try to make use of these libraries.

### cross-fetch

`cross-fetch` is a popular library used for cross-platform access to the `fetch` API across multiple environments. Under the hood, however, the library does make use of `XMLHttpRequest` and therefore it will cause issues when used in a snap.

Luckily, this issue is fairly easy to patch with `patch-package`. To do this, open up `node_modules/cross-fetch/browser-ponyfill.js` and find the following lines (it's close to the bottom):

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

After replacing it, run `yarn patch-package cross-fetch` which saves the patch for future use.

If you find that it's easier you can also use the following patch, copy and paste this to `patches/cross-fetch+3.1.5.patch` and re-install your dependencies.

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

Using either of these methods allows your dependencies to access the `fetch` API correctly and `cross-fetch` compatible with the snaps execution environment.

### axios

`axios` is another popular networking library that leverages `XMLHttpRequest` under the hood.

At the time of writing there is no known way of patching `axios` to work with the snaps execution environment. Instead you may have to resort to replacing the usage of `axios` with another library such as `isomorphic-fetch` or `isomorphic-unfetch`. Or simply using the snaps execution environment global `fetch`.

Below is a small example of how you can rewrite your dependency to use `fetch` instead of `axios`.
**Note**: In a production environment this may be a large task depending on the usage of `axios`.

**axios**

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

**fetch**

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

More resources:

- [Replace axios with a simple custom fetch wrapper](https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper)
