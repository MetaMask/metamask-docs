# Getting Started

To develop for MetaMask, you're first going to want to get MetaMask installed on your development machine. [Download here](https://metamask.io/).

Once you have it running, you should find that new browser tabs have a `window.ethereum` object available in the console.
This is the way MetaMask provides for you to interact with it.

You can review the full API for that object [here](./ethereum-provider.html).
Note that in **early 2020**, we are introducing significant changes to this API, and we recommend that you refer to its documentation.

## Basic Considerations

### Web3 Browser Detection

The first thing your app will want to do is verify whether the user is using MetaMask or not, which is simple using a check like `if (typeof window.ethereum !== 'undefined') { /* deal with it */ }`.

### Running a Test Network

In the top right menu of MetaMask, you can select the network that you are currently connected to. Among several popular defaults, you'll find `Custom RPC` and `Localhost 8545`. These are both useful for connecting to a test blockchain, like [ganache](https://truffleframework.com/ganache), which you can quickly install and start if you have `npm` installed with `npm i -g ganache-cli && ganache-cli`.

Ganache has some great features for starting it up with different states. If you start it with the `-m` flag, you can feed it the same seed phrase you have in your MetaMask, and the test network will give your first 10 accounts 100 test ether each, which makes it easier to start work.

Since your seed phrase is the power to control all your accounts, it is probably worth keeping at least one seed phrase for development, separate from any that you use for storing real value. One easy way to manage multiple seed phrases with MetaMask is with multiple browser profiles, each of which can have its own clean extension installations.

#### Resetting Your Local Nonce Calculation

If you're running a test blockchain, and then restart it, you can accidentally confuse MetaMask, because it calculates the next [nonce](./sending-transactions.html#nonce-ignored)
based on both the network state _and_ the known sent transactions.

To clear MetaMask's transaction queue, and effectively reset its nonce calculation, you can use the `Reset Account` button in `Settings` (available in the top-right sandwich menu).

### Detecting MetaMask

If you want to differentiate MetaMask from other ethereum-compatible browsers, you can detect MetaMask using `ethereum.isMetaMask`.

### User State

Currently there are a few stateful things you want to consider when interacting with this API:

- What is the current network?
- What is the current account?

Both of these are available synchronously as `ethereum.networkVersion` and `ethereum.selectedAddress`.
You can listen for changes using events too, see ([the API reference](./ethereum-provider.html)).

### Connecting to MetaMask

"Connecting" or "logging in" to MetaMask effectively means "to access the user's Ethereum account(s)".

You should **only** initiate a connection request in response to direct user action, such as clicking a button.
You should **never** initiate a connection request on page load.

We recommend that you provide a button to allow the user to connect MetaMask to your dapp.
Clicking this button should call the following method:

```javascript
ethereum.enable();
```

**Example:**

<EthConnectButton />

```html
<button class="enableEthereumButton">Enable Ethereum</button>
```

```javascript
const ethereumButton = document.querySelector('.enableEthereumButton');

ethereumButton.addEventListener('click', () => {
  //Will Start the metamask extension
  ethereum.enable();
});
```

This promise-returning function resolves with an array of hex-prefixed ethereum addresses, which can be used as general account references when sending transactions.

Over time, this method is intended to grow to include various additional parameters to help your site request all the setup it needs from the user during setup.

Since it returns a promise, if you're in an `async` function, you may log in like this:

```javascript
const accounts = await ethereum.enable();
const account = accounts[0];
// We currently only ever provide a single account,
// but the array gives us some room to grow.
```

**Example:**

<EthAsyncConnectButton />

```html
<button class="enableEthereumButton">Enable Ethereum</button>
<h2>Account: <span class="showAccount"></span></h2>
```

```javascript
const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
  getAccount();
});

async function getAccount() {
  const accounts = await ethereum.enable();
  const account = accounts[0];
  showAccount.innerHTML = account;
}
```

## Choosing a Convenience Library

Convenience libraries exist for a variety of reasons.

Some of them simplify the creation of specific user interface elements, some entirely manage the user account onboarding, and others give you a variety of methods of interacting with smart contracts, for a variety of API preferences, from promises, to callbacks, to strong types, and on.

The provider API itself is very simple, and wraps
[Ethereum JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC#json-rpc-methods)
formatted messages, which is why developers usually use a convenience library for interacting
with the provider, like [ethers](https://www.npmjs.com/package/ethers), [web3](https://www.npmjs.com/package/web3),
[truffle](https://truffleframework.com/), [Embark](https://embark.status.im/), or others. From those tools,
you can generally find sufficient documentation to interact with the provider, without reading this lower-level API.
