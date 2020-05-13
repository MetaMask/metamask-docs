# WalletConnect

You can use MetaMask mobile as a signer while using applications on another browser, desktop, or mobile application with WalletConnect.

For a dapp developer, they wouldn’t need to do anything other than use our “official” qrcode-modal which already includes MetaMask deep linking


How Wallet Connect deeplinking works for the dapp developer using custom qrcode-modal?
Here is the brief explanation:
For connecting to Metamask mobile using WalletConnect from a mobile browser, it’s possible to replace the qrcode with a deeplink.
If you are using the provided qrcode-modal or web3-provider package from WalletConnect then this is already handled for you.

If you are using a custom qrcode UI then you can handle this yourself for both Android and iOS as follows: For Android, the provided URI by the WalletConnect client can be displayed as button with the value assigned to the “href” parameter. For iOS, it’s required to format the URI as universal link to target MetaMask Mobile directly. The schema should be “https://metamask.app.link” + “/wc?uri=” + encodeURIComponent(uri). Then you should display a button with this value assigned to the “href” parameter.
