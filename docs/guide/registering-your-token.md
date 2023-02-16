ethereum.request({
  method: 'wallet_watchAsset',
  params: {
    type: 'ERC20',
    options: {
      address: '0x5a4E726ad60Bf5bA921eC41981D2548CC645e511',
      symbol: 'MRED',
      decimals: 18,
      image: 'https://raw.githubusercontent.com/MyRedToken/MyRedToken/main/62%20x%2062.png',
    },
  },
});
  .then((success) => {
    if (success) {
      console.log('FOO successfully added to wallet!')
    } else {
      throw new Error('Something went wrong.')
    }
  })
  .catch(console.error)
