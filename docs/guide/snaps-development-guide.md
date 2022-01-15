# Snaps Development Guide

::: warning 🛠️ Under Construction 🛠️
This page is under construction.
:::

::: tip Feature Requests
Do you have feature requests? Other ideas? We'd love to hear about them! [Click here](https://community.metamask.io/c/metamask-flask) to join the discussion.
:::

Developing Snaps is much like developing any JavaScript project, but there are some things that may be new even to a seasoned developer.
This guide is currently under construction, but will expand in the coming days to thoroughly cover the ins and outs of snap development.

## Resources

To get started with Snaps, you first have to download [MetaMask Flask](https://metamask.io/flask).

While this guide is under construction, we **highly recommend** consulting the [readme of `@metamask/snaps-cli`](https://www.npmjs.com/package/@metamask/snaps-cli), the command line utility we created to help with snap development.

In addition, you can review the growing number of [example snaps](https://github.com/MetaMask/snaps-skunkworks/tree/main/packages/snap-examples) maintained by MetaMask.

Finally, you may wish to check out the first functional key management snap ever made, [the Filecoin Snap, or `filsnap`](https://github.com/Chainsafe/filsnap/).

## Gotchas

### Accessing the Internet in a Snap

Snaps do not get access to any sensitive APIs or features by default, and Internet access is no exception to that rule.
To access the Internet, you must be specify the permission `endowment:network-access` in the `initialPermissions` of your `snap.manifest.json` file.
This will grant you access to the global `fetch` API.
Other global network APIs may be made available in the future.

### Writing SES-Compatible JavaScript

Snaps is implemented using Secure EcmaScript, or [SES](https://github.com/endojs/endo/tree/master/packages/ses), effectively a subset of the JavaScript language designed to enable mutually suspicious programs to execute in the same JavaScript process (or more accurately, the same [realm](https://tc39.es/ecma262/#realm)).

For present purposes, the important thing to understand is that, because SES is effectively a subset of JavaScript, you may write - or more likely, import - code that does not execute under SES.
[`@metamask/snaps-cli`](https://www.npmjs.com/package/@metamask/snaps-cli) will attempt to fix some such issues for you via the `mm-snap build` command, but it can't fix them all.

When `mm-snap build` fails during the `eval` step (you can also directly execute a built snap using `mm-snap eval`), you have to attempt to fix the issue manually.
If the problem is in a dependency, you can try a different version or make use of tools such as [`patch-package`](https://npmjs.com/package/patch-package) to fix the issue locally yourself.

If you're still stuck, you can ask for help [here](https://community.metamask.io/c/metamask-flask).
