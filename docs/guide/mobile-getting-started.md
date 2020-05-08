# Mobile Getting Started

If your site works with the MetaMask Extension, then you should be all set!
If it doesn't, please refer to our [best practices](./mobile-best-practices.html) and if you're still having issues, please open an issue [here](https://github.com/MetaMask/metamask-mobile)


# ethereum.initialized
due to the way that mobile works, the loading of the window can be slower than you might be used to dealing with on the web
because of this, we've implemented an event ethereum#initialized

https://github.com/MetaMask/inpage-provider/blob/d6f381ddaaac951b25d2e608184555dd1191c3d9/src/initProvider.js#L45-L54


// gist updates pending
https://gist.github.com/rekmarks/06999f88fe6ab0cd1d71ac7cd2b2ac93

we would also like to encourage this practice of only asking for the user's accounts upon a user initated interaction
