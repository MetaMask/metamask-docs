# Run a test network

In the top right menu of MetaMask, select the network that you're currently connected to.
Among several popular defaults, you'll find **Custom RPC** and **Localhost 8545**.
These are both useful for connecting to a test blockchain, such as
[Ganache](https://www.trufflesuite.com/ganache).
You can quickly install and start Ganache if you have `npm` installed using
`npm i -g ganache-cli && ganache-cli`.

Ganache has some great features for starting your application with different states.
If your application starts with the `-m` flag, you can feed it the same seed phrase you have in your
MetaMask, and the test network will give each of your first 10 accounts 100 test ether, which makes
it easier to start work.

Since your seed phrase has the power to control all your accounts, it's probably worth keeping at
least one seed phrase for development, separate from any you use for storing real value.
One easy way to manage multiple seed phrases with MetaMask is with multiple browser profiles, each
of which can have its own clean extension installations.

## Reset your local nonce calculation

If you're running a test blockchain and restart it, you can accidentally confuse MetaMask because it
calculates the next [nonce](../how-to/send-transactions.md#nonce) based on both the network
state _and_ the known sent transactions.

To clear MetaMask's transaction queue and reset its nonce calculation, use the **Reset Account**
button in **Settings** (available in the top right menu).
