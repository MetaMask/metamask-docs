# Snap user interface

Any snap must represent itself and what it does to the end user.
Using the MetaMask settings page, the user can see their installed snaps.
For each snap, the user can:

- See most of its manifest data.
- See its execution status (running, stopped, or crashed).
- Enable and disable the snap.

Other than the settings page, the only way a snap can modify the MetaMask UI is by creating a
confirmation using the [`snap_confirm`](../reference/rpc-api.md#snap_confirm) API method.
This means that many snaps must rely on dapps/websites and their own API methods to
present their data to the user.

Providing more ways for snaps to modify the MetaMask UI is an important goal of the Snaps system,
and over time more and more snaps will be able to contain their user interfaces entirely within
MetaMask itself.