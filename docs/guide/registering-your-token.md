
```javascript
const tokenAddress = '0xb03995e3A3df8535afF2D215FFa5475Dc8B649d8';
const tokenSymbol = 'BRT';
const tokenDecimals = 18;
const tokenImage = 'https://barakatcoin.io/wp-content/uploads/2022/02/Design-ohne-Titel3.png';

try {
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  const wasAdded = await ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: tokenAddress, // 0xb03995e3A3df8535afF2D215FFa5475Dc8B649d8;
        symbol: tokenSymbol, // BRT;
        decimals: tokenDecimals, // 18;
        image: tokenImage, // https://barakatcoin.io/wp-content/uploads/2022/02/Design-ohne-Titel3.png;
      },
    },
  });

  if (wasAdded) {
    console.log('Thanks for your interest!');
  } else {
    console.log('Your loss!');
  }
} catch (error) {
  console.log(error);
}
```
