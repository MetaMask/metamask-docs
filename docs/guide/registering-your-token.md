ethereum.request({
  method: 'wallet_watchAsset',
  params: {
    type: 'ERC20',
    options: {
      address: '0x5a4E726ad60Bf5bA921eC41981D2548CC645e511',
      symbol: 'MRED',
      decimals: 18,
      image: 'https://github.com/MyRedToken/MyRedToken/blob/main/62%20x%2062.png',
    },
  },
});
