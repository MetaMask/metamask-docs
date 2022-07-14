interface WatchAssetParams {
  type: 'ERC20'; // In the future, other standards will be supported
  options: {
    address: string; // The address of the token contract
    'symbol': string; // A ticker symbol or shorthand, up to 11 characters
    decimals: number; // The number of token decimals
    image: string; // A string url of the token logo
  };
}
