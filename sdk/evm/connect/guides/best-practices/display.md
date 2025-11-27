# Display in MetaMask

## Display icons

When your dapp makes a login request to a MetaMask user, MetaMask may render a modal that displays
your dapp icon.

MetaMask retrieves this icon using the HTML selector `<head> link[rel="shortcut icon"]`, so you can
follow the [favicon standard](https://en.wikipedia.org/wiki/Favicon) to customize your dapp icon.
Make sure to have a `link` tag within your dapp's `head` with `rel = "shortcut icon"`, as in the
following example.
The tag's `href` attribute is used for assigning the dapp icon.

```html
<head>
  <link rel="shortcut icon" href="https://your-dapp.com/your-icon.png" />
</head>
```

## Display method names

MetaMask uses the [Ethereum Signature Database](https://www.4byte.directory/) to display
method names on the confirmation screen.
For many common method names, such as token methods, this allows MetaMask to look up the method
names by their [method signature](https://solidity.readthedocs.io/en/v0.4.21/abi-spec.html).
However, sometimes you're using a method that isn't in that database, and MetaMask simply
displays **Contract Interaction** to the user.

To register your contract's method names so they show in the MetaMask interface,
[submit each method's signature to the Ethereum Signature Database](https://www.4byte.directory/submit/).