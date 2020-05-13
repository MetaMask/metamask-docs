# Mobile Getting Started

If your site works with the MetaMask Extension, then you should be all set!
If it doesn't, please refer to our [best practices](./mobile-best-practices.html) and if you're still having issues, please open an issue [here](https://github.com/MetaMask/metamask-mobile)

# ethereum.initialized

On mobile, the loading of the window can be slower than you might be used to dealing with on the web. Because of this, we've implemented an event: ethereum#initialized
<gist/>

But for the best user experience, we would also like to encourage the practice of only asking for the user's accounts upon a user initiated interaction.
