# Working with third-party snaps

While some snaps are designed to be one-off and dedicated one and only one Dapp, this isn't always the case. Third-party developers like yourself can use these snaps to build your own Dapps, or even to compose with another snap.

This is possible because [snaps can expose an RPC API](../reference/exports/#onrpcrequest). Snaps can decide to make their API available to other Dapps, other snaps, or both, by requesting the [`endowment:rpc`](../reference/permissions.md#endowmentrpc) permission.

## Installing a snap

Installing a snap is done by using the [`wallet_requestSnaps`](../reference/rpc-api.md#wallet_requestsnaps) method from your Dapp or your snap.

:::tip
A snap is not installed only once. It has to be installed for every consumer that wants to use it. For example, if you're building two Dapps that use the same snap, each Dapp will need to install the snap independently.
:::

## Finding out whether a snap is installed

Figuring out whether a snap is installed is done using the [`wallet_getSnaps`](../reference/rpc-api.md#wallet_getsnaps) method from your Dapp or your snap. You'll receive a list of _only_ those snaps that are connected to your current Dapp or snap.

The response comes in the form of an object keyed by the ID of the snap. Each value within is a nested object with additional information like the version of the snap that is installed.

A sample code you can use to verify whether the snap with e.g. ID `npm:super-snap` is installed would be:

```ts
const snaps = await ethereum.request({
  method: 'wallet_getSnaps'
});

const isMySnapInstalled = Object.keys(snaps).includes('npm:super-snap');
```

If you need to work with a specific version of a snap, you can instead iterate over `Object.values(snaps)`, and use the `id` and `version` properties inside each object to figure out whether the snap is installed with the required version.