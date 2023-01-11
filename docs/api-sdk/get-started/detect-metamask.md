# Detect MetaMask

To verify if the browser is running MetaMask, copy and paste the code snippet below in the developer
console of your web browser:

```javascript
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
}
```

You can review the full API for the `window.ethereum` object [here].

If you want to differentiate MetaMask from other Ethereum-compatible browsers, you can detect
MetaMask using `ethereum.isMetaMask`.
