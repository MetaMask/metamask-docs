# Getting Started

::: warning IMPORTANT NOTE
To develop for MetaMask, you’re first going to want to get MetaMask installed on your development machine. [Download here](https://metamask.io/)
:::

Once you have it running, you should find that new browser tabs have a ```window.ethereum ``` object available in the console. This is the way MetaMask provides for you to interact with it.
## Basic Considerations

### Web3 Browser Detection
The first thing your app will want to do is verify whether the user is using MetaMask or not, which is simple using a check like:

```javascript
if (typeof window.ethereum !== 'undefined') { /* deal with it */ }
```

### Running a Test Network
::: warning
Make sure you have npm installed. Unsure how? To download Node.js and npm [visit here](https://nodejs.org/en/)
:::
1. By default it will be on `Main Ethereum Network `. Click that and choose either `Custom RPC` or `Localhost 8545`
2. These are both useful for connecting to a test blockchain, like [ganache](https://www.trufflesuite.com/ganache). You can quickly install and start with `npm i -g ganache-cli && ganache-cli`.

Ganache has some great features for starting it up with different states. If you start it with the -m flag, you can feed it the same seed phrase you have in your MetaMask, and the test network will give your first 10 accounts 100 test ether each, which makes it easier to start work.

Since your seed phrase is the power to control all your accounts, it is probably worth keeping at least one seed phrase for development, separate from any that you use for storing real value. One easy way to manage multiple seed phrases with MetaMask is with multiple browser profiles, each of which can have its own clean extension installations.


### Resetting Your Local Nonce Calculation
If you’re running a test blockchain, and then restart it, you can accidentally confuse MetaMask, because it calculates the next nonce based on both the network state and the known sent transactions.

To clear MetaMask’s transaction queue, and effectively reset its nonce calculation, you can use the: `Reset Account` button in `Settings` (available in the top-right sandwich menu).

### Detecting MetaMask
If you want to differentiate MetaMask from other ethereum-compatible browsers, you can detect MetaMask using 
``` javascript
//Open Developer Console in browser, copy and paste below code
ethereum.isMetaMask // true
```

### User State
Currently there are a few stateful things you want to consider when interacting with this API:
* What is the current network?
* What is the current account?

Both of these are available synchronously as `ethereum.networkVersion` and `ethereum.selectedAddress`. You can listen for changes using events, too <a href="/guide/getting-started.html#inside-an-existing-project">see the API reference)</a>.