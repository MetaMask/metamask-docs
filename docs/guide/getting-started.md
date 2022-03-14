# Getting Started

To develop for MetaMask, install MetaMask in the browser of your choice on your development machine. [Download here](https://metamask.io/).

::: warning A quick note...
This guide assumes intermediate knowledge of HTML, CSS, and JavaScript.
:::

Once MetaMask is installed and running (make sure you back up your Secret Recovery Phrase), you should find that new browser tabs have a `window.ethereum` object available in the developer console.
This is how your website will interact with MetaMask.

You can review the full API for that object [here](./ethereum-provider.html).
Note that **over the course of 2020**, we introduced significant changes to this API, and we recommend that you refer to its documentation.

## Basic Considerations

### Web3 Browser Detection

To verify if the browser is running MetaMask, copy and paste the code snippet below in the developer console of your web browser:

```javascript
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
}
```

You can review the full API for the `window.ethereum` object [here](./ethereum-provider.html).

### Setting Up a Test Network

#### 1. Show test networks**
First click on the networks drop down, then Click on the "Show/hide" Link

![image](https://user-images.githubusercontent.com/1038445/150907727-77fe4899-5238-4df6-8fa4-e6ae522e7d02.png)

Click on the "Show test network" toggle button so it displays "ON"

![image](https://user-images.githubusercontent.com/1038445/150907769-c7ea63a8-6bd2-4f80-a376-a70243bb14b7.png)


#### 2. Connecting to Ropsten Test Network**

Use the network dropdown menu (which would normally be displaying Ethereum Mainnet like the image above) and select Ropsten Test Network: 

![image](https://user-images.githubusercontent.com/1038445/150908059-f86cd2eb-6d59-43e8-8fec-bacce425ebe0.png)


I recommend creating a test account just for the Ropsten Test Network. (Just give it a name)

Click the "+ Create Account" Selection from the Menu

![image](https://user-images.githubusercontent.com/1038445/150908294-22099c19-4b22-4587-939b-3f9f882b09e8.png)

#### 3. Request 1 ETH Over the test network**

Navigate to https://faucet.metamask.io/. Then, Click on "reqest 1 ether from faucet" and select the test account you created earlier:


![image](https://user-images.githubusercontent.com/1038445/150909358-80beed6d-bebc-4602-90fb-183b15279228.png)


A request will be sent to Metamask Client for you to sign. 

Click Next 

**WAIT Patiently for the transaction to be approved once Metamask has connected (may take a couple minutes)**

![image](https://user-images.githubusercontent.com/1038445/150909613-6cb6d54e-3d43-4505-b8d6-7fa6b225e355.png)

Click "request 1 ether from faucet"

![image](https://user-images.githubusercontent.com/1038445/150909688-211f3398-e737-42db-bee2-e62d5e2ef5a8.png)

Below shows the wallet address and balance of the wallet

![image](https://user-images.githubusercontent.com/1038445/150910232-703e1c26-4bdb-41aa-a174-7c10a9f3a6f8.png)

It is possible to click on the wallet address to see transaction history

![image](https://user-images.githubusercontent.com/1038445/150910318-b6cd9eb6-56e8-46b0-9664-82a072d3b0a5.png)

#### 4. Running a Test Network

If you would like to run your own network on your local machine, [Ganache](https://www.trufflesuite.com/ganache) has some great features for starting your application with different states.

You can quickly install and start Ganache if you have `npm` installed with `npm i -g ganache-cli && ganache-cli`.
Once Ganache is started, connect to the network `Localhost 8545`, which you can find at the bottom of the network list (if you don't see this, follow the instructions in [`Connecting to a test network`](#Connecting) to display test networks).

You can now

![image](https://user-images.githubusercontent.com/1038445/150916135-c9d019ad-86f3-474d-a0ef-d53dabe799f9.png)

If your application starts with the `-m` flag, you can feed it the same seed phrase you have in your MetaMask, and the test network will give each of your first 10 accounts 100 test ether, which makes it easier to start work.

Using the same Mnumonic phrase will generate the same set of 10 account numbers when you restart Ganache
``` ganache-cli -m "random set of words to generate same account numbers each restart" ```

Since your seed phrase has the power to control all your accounts, it is probably worth keeping at least one seed phrase for development, separate from any that you use for storing real value. One easy way to manage multiple seed phrases with MetaMask is with multiple browser profiles, each of which can have its own clean extension installations.

##### 4.  Resetting Your Local Nonce Calculation

If you're running a test blockchain and restart it, you can accidentally confuse MetaMask because it calculates the next [nonce](./sending-transactions.html#nonce-ignored)
based on both the network state _and_ the known sent transactions.

To clear MetaMask's transaction queue, and effectively reset its nonce calculation, you can use the `Reset Account` button in `Settings` (available in the top-right identicon menu).

#### 5.  Detecting MetaMask

If you want to differentiate MetaMask from other Ethereum-compatible browsers, you can detect MetaMask using `ethereum.isMetaMask`.

#### 6. User State

Currently there are a few stateful things to consider when interacting with this API:

- What is the current network?
- What is the current account?

Both of these are available synchronously as `ethereum.networkVersion` and `ethereum.selectedAddress`.
You can listen for changes using events too, see ([the API reference](./ethereum-provider.html)).

#### 7. Connecting to MetaMask

"Connecting" or "logging in" to MetaMask effectively means "to access the user's Ethereum account(s)".

You should **only** initiate a connection request in response to direct user action, such as clicking a button.
You should **always** disable the "connect" button while the connection request is pending.
You should **never** initiate a connection request on page load.

We recommend that you provide a button to allow the user to connect MetaMask to your dapp.
Clicking this button should call the following method:

```javascript
ethereum.request({ method: 'eth_requestAccounts' });
```

**Example:**

<EthConnectButton />

:::: tabs :options="{ useUrlFragment: false }"

::: tab HTML

```html
<button class="enableEthereumButton">Enable Ethereum</button>
```

:::

::: tab JavaScript

```javascript
const ethereumButton = document.querySelector('.enableEthereumButton');

ethereumButton.addEventListener('click', () => {
  //Will Start the metamask extension
  ethereum.request({ method: 'eth_requestAccounts' });
});
```

:::

::::

This promise-returning function resolves with an array of hex-prefixed Ethereum addresses, which can be used as general account references when sending transactions.

Over time, this method is intended to grow to include various additional parameters to help your site request everything it needs from the user during setup.

Since it returns a promise, if you're in an `async` function, you may log in like this:

```javascript
const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
const account = accounts[0];
// We currently only ever provide a single account,
// but the array gives us some room to grow.
```

**Example:**

<EthAsyncConnectButton />

:::: tabs :options="{ useUrlFragment: false }"

::: tab HTML

```html
<button class="enableEthereumButton">Enable Ethereum</button>
<h2>Account: <span class="showAccount"></span></h2>
```

:::

::: tab JavaScript

```javascript
const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
  getAccount();
});

async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  showAccount.innerHTML = account;
}
```

:::

::::

## Choosing a Convenience Library

Convenience libraries exist for a variety of reasons.

Some of them simplify the creation of specific user interface elements, some entirely manage the user account onboarding, and others give you a variety of methods of interacting with smart contracts, for a variety of API preferences, from promises, to callbacks, to strong types, and on.

The provider API itself is very simple, and wraps
[Ethereum JSON-RPC](https://eth.wiki/json-rpc/API#json-rpc-methods)
formatted messages, which is why developers usually use a convenience library for interacting
with the provider, like [ethers](https://www.npmjs.com/package/ethers), [web3.js](https://www.npmjs.com/package/web3),
[truffle](https://www.trufflesuite.com/), [Embark](https://framework.embarklabs.io/), or others. From those tools,
you can generally find sufficient documentation to interact with the provider, without reading this lower-level API.
