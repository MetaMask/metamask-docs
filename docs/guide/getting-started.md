# Getting Started

::: warning IMPORTANT NOTE
To develop for MetaMask, you’re first going to want to get MetaMask installed on your development machine. [Download here](https://metamask.io/)
:::

Once you have it running, you should find that new browser tabs have a ```window.ethereum ``` object available in the console. This is the way MetaMask provides for you to interact with it.
## Basic Considerations

### Web3 Browser Detection

The first thing your app will want to do is verify whether the user is using MetaMask or not, which is simple using a check like:

```javascript
if (typeof window.ethereum !== 'undefined') { /* deal with it */ }
```

### Running a Test Network
::: warning
Make sure you have npm installed. Unsure how? To download Node.js and npm [visit here](https://nodejs.org/en/)
:::
1. By default it will be on ```Main Ethereum Network ```. Click that and choose either ```Custom RPC``` or ```Localhost 8545```
2. These are both useful for connecting to a test blockchain, like [ganache](https://www.trufflesuite.com/ganache). You can quickly install and start if you have ```npm``` installed with ```npm i -g ganache-cli && ganache-cli```.

Ganache has some great features for starting it up with different states. If you start it with the -m flag, you can feed it the same seed phrase you have in your MetaMask, and the test network will give your first 10 accounts 100 test ether each, which makes it easier to start work.

Since your seed phrase is the power to control all your accounts, it is probably worth keeping at least one seed phrase for development, separate from any that you use for storing real value. One easy way to manage multiple seed phrases with MetaMask is with multiple browser profiles, each of which can have its own clean extension installations.


If you have an existing project and would like to keep documentation inside the project, you should install VuePress as a local dependency. This setup also allows you to use CI or services like Netlify for automatic deployment on push.

``` bash
# install as a local dependency
yarn add -D vuepress # OR npm install -D vuepress

# create a docs directory
mkdir docs
# create a markdown file
echo '# Hello VuePress' > docs/README.md
```



Then, add some scripts to `package.json`:

``` json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

You can now start writing with:

``` bash
yarn docs:dev # OR npm run docs:dev
```

To generate static assets, run:

``` bash
yarn docs:build # Or npm run docs:build
```

By default, the built files will be in `.vuepress/dist`, which can be configured via the `dest` field in `.vuepress/config.js`. The built files can be deployed to any static file server. See [Deployment Guide](deploy.md) for guides on deploying to popular services.
