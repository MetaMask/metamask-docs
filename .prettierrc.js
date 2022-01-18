module.exports = {
  singleQuote: true,
  overrides: [
    {
      files: ['WatchAssetParams.ts', 'web3ToProvider.js'],
      options: {
        quoteProps: 'preserve',
      },
    },
  ],
};
