# Set an icon

When your site makes a login request to a MetaMask user, MetaMask may render a modal that displays
your site icon.

MetaMask retrieves this icon using the HTML selector `<head> link[rel="shortcut icon"]`, so you can
follow the [favicon standard](https://en.wikipedia.org/wiki/Favicon) to customize your site icon.
Make sure to have a `link` tag within your site's `head` with `rel = "shortcut icon"`, as in the
following example.
The tag's `href` attribute is used for assigning the site icon.

```html
<head>
  <link rel="shortcut icon" href="https://your-site.com/your-icon.png" />
</head>
```
