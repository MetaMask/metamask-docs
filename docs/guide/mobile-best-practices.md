# Mobile Best Practices

If your site works with the MetaMask Extension, then you should be all set!
If it doesn't, please see below.
If you're still having issues, feel free to open an issue [here](https://github.com/MetaMask/metamask-mobile)

# ethereum.initialized

On mobile, the loading of the window can be slower than you might be used to dealing with on the web. Because of this, we've implemented an event: `ethereum#initialized`

[see gist](https://gist.github.com/rekmarks/06999f88fe6ab0cd1d71ac7cd2b2ac93)

New event dispatched on `window`: `ethereum#initialized`

Event name inspired by JSDoc `@event` tag: https://jsdoc.app/tags-event.html

```javascript
if (window.ethereum) {
  handleEthereum();
} else {
  window.addEventListener('ethereum#initialized', handleEthereum, {
    once: true,
  });

  // If the event is not dispatched by the end of the timeout,
  // the user probably doesn't have MetaMask installed.
  setTimeout(handleEthereum, 3000); // 3 seconds
}

function handleEthereum() {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    console.log('Ethereum successfully detected!');
    // Do work...
  } else {
    console.log('Please install MetaMask!');
  }
}
```

But for the best user experience, we would also like to encourage the practice of only asking for the user's accounts upon a user initiated interaction.
