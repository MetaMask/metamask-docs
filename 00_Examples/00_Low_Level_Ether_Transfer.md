# MetaMask Quick Start

Do you prefer to just copy and paste some working code? Here is a simple but complete working MetaMask tipping application.

Below the code snippet, we'll include some links to some related valuable resources.

```javascript
// Let's imagine you want to receive an ether tip
const yourAddress = '0x0c54FcCd2e384b4BB6f2E405Bf5Cbc15a017AaFb'
const value = '0xde0b6b3a7640000' // an ether has 18 decimals, here in hex.
const desiredNetwork = '1' // '1' is the Ethereum main network ID.

// Detect whether the current browser is ethereum-compatible,
// and handle the case where it isn't:
if (typeof window.ethereum === 'undefined') {
  alert('Looks like you need a Dapp browser to get started.')
  alert('Consider installing MetaMask!')

} else {

  // In the case the user has MetaMask installed, you can easily
  // ask them to sign in and reveal their accounts:
  ethereum.request({ method: 'eth_requestAccounts' })

  // Remember to handle the case they reject the request:
  .catch(function (reason) {
    if (reason === 'User rejected provider access') {
      // The user didn't want to sign in!
    } else {
      // This shouldn't happen, so you might want to log this...
      alert('There was an issue signing you in.')
    }
  })

  // In the case they approve the log-in request, you'll receive their accounts:
  .then(function (accounts) {
    // You also should verify the user is on the correct network:
    if (ethereum.networkVersion !== desiredNetwork) {
      alert('This application requires the main network, please switch it in your MetaMask UI.')

      // We plan to provide an API to make this request in the near future.
      // https://github.com/MetaMask/metamask-extension/issues/3663
    }

    // Once you have a reference to user accounts,
    // you can suggest transactions and signatures:
    const account = accounts[0]
    sendEtherFrom(account, function (err, transaction) {
      if (err) {
        return alert(`Sorry you weren't able to contribute!`)
      }

      alert('Thanks for your successful contribution!')
    })

  })
}

function sendEtherFrom (account, callback) {

  // We're going to use the lowest-level API here, with simpler example links below
  const method = 'eth_sendTransaction'
  const params = [{
    from: account,
    to: yourAddress,
    value: value,
  }]

  // Methods that require user authorization like this one will prompt a user interaction.
  // Other methods (like reading from the blockchain) may not.
  ethereum.request({ method, params })
    .then((txHash) => {

      alert('Thank you for your generosity!')

      // You can poll the blockchain to see when this transaction has been mined:
      pollForCompletion(txHash, callback)
    })
    .catch((error) => {
      if (error.code === 4001) { // 4001: User rejected request
        return alert(`We can't take your money without your permission.`)
      }
      alert('There was an issue, please try again.')
    })
}

function pollForCompletion (txHash, callback) {
  let calledBack = false

  // Normal ethereum blocks are approximately every 15 seconds.
  // Here we'll poll every 2 seconds.
  const checkInterval = setInterval(function () {

    ethereum.request({
      method: 'eth_getTransactionByHash',
      params: [ txHash ],
    })
      .then((transaction) => {

        if (calledBack || !transaction) {
          // We've either already seen the mined transaction,
          // or no transaction was returned, indicating that it
          // hasn't been mined yet.
          return
        }

        // The transaction has been mined.
        clearInterval(checkInterval)
        calledBack = true
        callback(null, transaction)
      })
      .catch((error) => {

        if (calledBack) {
          return
        }

        // Some unknown error occurred.
        callback(error)
      })
    })
  }, 2000)
}
```

Now that was all very low level, but should show you how MetaMask works at its simplest, and lowest level!

Now you can read more about this [ethereum API](./API_Reference), or maybe get acquainted with a convenience library so you don't have to interact with it directly:

- [ethers](https://www.npmjs.com/package/ethers)
- [web3.js](https://www.npmjs.com/package/web3)
- [Embark](https://framework.embarklabs.io/)
- [ethjs](https://www.npmjs.com/package/ethjs)
- [truffle](https://www.trufflesuite.com/)
