# Security Controls

It's always a good time to think about security, even if your dApp is already live. By implementing these security controls, you can improve the security of your dApp and protect your users. The security advice given below is not exhaustive, but can serve as a starting point for thinking about web security.

## Secure your website with HTTPS

HTTPS is essential for protecting your website against hackers who may try to eavesdrop or tamper the communication channel you have with your users. HTTPS encrypts the data that's transmitted between the web server and the user's browser, making it difficult for attackers to intercept or modify the data. To secure your website with HTTPS, you'll need to obtain an SSL/TLS certificate from a trusted certificate authority (CA). [Let's Encrypt](https://letsencrypt.org/) is a great source for this as they offer free SSL/TLS certificate. Once you have the certificate, you'll need to install it on your web server. If you're using a static website hosting service, they may already have a way to enable HTTPS on your website.

## Use Content Security Policy (CSP):

Content Security Policy is a security feature that helps prevent various types of attacks by allowing you

CSP works by defining a set of policies that the browser must follow when displaying the webpage. This can be as simple as saying "Only load images from metamask.io" or more complex such as "Only allow my website to appear in an iFrame if that iFrame is metamask.io". Defining these policies helps helps protect against various kinds of attacks such as [cross-site scripting (XSS)](https://owasp.org/www-community/attacks/xss/), and [clickjacking](https://owasp.org/www-community/attacks/Clickjacking). You can find the full list of CSP directives that you can enable for your dApp in [CSP Section](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) of the MDM Web Docs.

### Setting a CSP with a server setup

To enable CSP for your application, all you need to do is set the `Content-Security-Policy` header in all responses from your server In express.js, this is as simple as adding the following middleware at the top of your server.

```js
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; frame-ancestors 'none'"
  );
  next();
});
```

In a header this looks like:

```
Content-Security-Policy: default-src 'self'; frame-ancestors 'none'
```

See https://content-security-policy.com/examples/ for other examples on how this look sin popular web frameworks and languages.

### Setting CSP for a static webpage

In many cases, dApp developers do not need to run their own server, and rely on third party hosting providers to serve their webpage. In cases where a custom `Content-Security-Policy` header cannot be set in server responses, we can make use of the <meta> HTML tag. This tag can be added to the `head` section of an HTML document to instruct the browser on which CSP directives should be followed.

```html
<head>
  <meta
    http-equiv="Content-Security-Policy"
    content="default-src 'self'; frame-ancestors 'none'"
  />
</head>
```

See https://content-security-policy.com/examples/meta/ for more details

### What should my Content Security Policy be?

There are an infinite number of configurations for a content security policy, and each configuration is specific to the dApp that is setting it. To determine what your application needs, we recommend starting with a very a secure and restrictive Content Security Policy, then loosening it as you need to.

The starting CSP policy should look like:

```
default-src 'self'; frame-ancestors 'none'`
```

- `default-src 'self';` ensures that by default no content from outside your domain will be allowed to load / be conntected to from code on the webpage.
- `frame-ancestors 'none'` ensures that your webpage cannot be embedded within the webpage of another domain (see this article on [clickjacking attacks](https://owasp.org/www-community/attacks/Clickjacking) for how this can be dangerous)

From here, you can make adjustments as needed by your application to support the content you want to load. For an example, if your dApp needs to load images hosted on Opensea you can instruct that this is allowed by adding `img-src 'opensea.io'` to your CSP so that it becomes:

```
default-src: 'self'; frame-ancestors 'none'; img-src: 'opensea.io'
```

For more information and common usecases for CSP, please check out https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP.
