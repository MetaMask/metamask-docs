# Working with third-party snaps

Some snaps are designed to communicate with Dapps. If you are a Dapp developer, you can use these snaps to take advantage of new features enabled by snaps. This is possible because [snaps can expose an RPC API](../reference/exports/#onrpcrequest). Snaps can decide to make their API available to Dapps by requesting the [`endowment:rpc`](../reference/permissions.md#endowmentrpc) permission.

## Connecting to a snap

Connecting to a snap is done by using the [`wallet_requestSnaps`](../reference/rpc-api.md#wallet_requestsnaps) method from your Dapp. If a user does not have a snap installed in their MetaMask, MetaMask will prompt the user to install the snap.

TO DO: show the response that the dapp developer will receive when the snap is already installed, when it has to be installed, when the user rejects the installation, or when the RPC endowment is not available for that snap.

:::tip
Snaps are installed into the MetaMask instance of each user. If a snap stores data, that data is specific to that user's instance of MetaMask. However, that data can be shared with multiple dapps. Do not assume that data stored by a snap is unique to your dapp. 
:::

## Finding out whether a snap is installed

Finding out whether a snap is installed is done using the [`wallet_getSnaps`](../reference/rpc-api.md#wallet_getsnaps) method from your Dapp. You'll receive a list of _only_ those snaps that are connected to your current Dapp.

The response comes in the form of an object keyed by the ID of the snap. Each value is a nested object with additional information like the version of the snap that is installed.

:::tip
`wallet_getSnaps` only returns the snaps that are connected to your dapp. The user may have other snaps installed that your dapp is not aware of. 
:::

A sample code you can use to verify whether the snap with e.g. ID `npm:super-snap` is installed would be:

```ts
const snaps = await ethereum.request({
  method: 'wallet_getSnaps'
});

const isMySnapInstalled = Object.keys(snaps).includes('npm:super-snap');
```

If you need to work with a specific version of a snap, you can instead iterate over `Object.values(snaps)`, and use the `id` and `version` properties inside each object to figure out whether the snap is installed with the required version.

:::tip
It is not possible for a user to install multiple versions of a snap into the same instance of MetaMask. You should avoid requiring a specific version of a snap unless you absolutely need to. In most cases, you should request the latest version of the snap and architect your Dapp to be able to work with that version. 
:::

## Reconnecting to a snap

At any time, a user can open their MetaMask Snaps settings menu and see all of the dapps that are connected to a snap. From that menu they can revoke a dapp connection. If your dapp loses the connection to a snap, you can reconnect with `wallet_requestSnaps`. Since the snap is already installed, you will get a success response without MetaMask showing a popup. However, if the user has removed or disabled the snap, you will get TO DO: explain the responses. 