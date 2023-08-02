---
description: Set an icon on MetaMask for your dapp.
sidebar_position: 3
---

# Display a dapp icon

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
