# Integrate with MetaMask (API & SDK)

This page shows how to integrate code blocks that will load up in a Codesandbox iframe

```js codesandbox=vanilla?editorsize=75
document.getElementById('app').innerHTML = `
<button class="enableEthereumButton btn">Enable Ethereum</button>
<button disabled class="sendEthButton btn">Send Eth</button>
`;

if (typeof window.ethereum !== 'undefined') {
  const ethereumButton = document.querySelector('.enableEthereumButton');
  const sendEthButton = document.querySelector('.sendEthButton');

  let accounts = [];

  //Sending Ethereum to an address
  sendEthButton.addEventListener('click', () => {
    ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from: accounts[0],
        to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
        value: '0x29a2241af62c0000',
        gasPrice: '0x09184e72a000',
        gas: '0x2710',
      }],
    })
      .then((txHash) => console.log(txHash))
      .catch(console.error);
  });

  ethereumButton.addEventListener('click', async () => {
    await getAccount();
    sendEthButton.disabled = false;
    ethereumButton.disabled = true;
  });

  async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  }
}
```