# Detect MetaMask

To verify if the browser is running MetaMask, copy and paste the following code snippet in the
developer console of your web browser:

```javascript
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
}
```

View the [full API](../reference/provider-api.md) for the `window.ethereum` object.

To differentiate MetaMask from other Ethereum-compatible browsers, you can detect MetaMask using
`ethereum.isMetaMask`.
