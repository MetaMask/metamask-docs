# Use MetaMask SDK with mobile dapps

You can import MetaMask SDK into your mobile dapp to enable your users to easily connect with their
MetaMask Mobile wallet.
See the instructions for the following mobile platforms:

- [React Native](../javascript/react-native.md)
- [Native iOS](ios.md)
- [Native Android](android.md) (coming soon)

## How it works

When a user accesses your mobile dapp, the SDK automatically deeplinks to MetaMask Mobile (or if the
user doesn't already have it, prompts them to install it).
After the user accepts the connection, they're automatically redirected back to your dapp.
This happens for all actions that need user approval.

<p align="center">

![SDK mobile browser example](../../../assets/sdk-mobile-browser.gif)

</p>