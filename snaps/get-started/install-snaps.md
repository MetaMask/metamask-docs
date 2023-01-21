# Install Snaps

To install snaps, you'll need:

- Up-to-date Chromium or Firefox browser
- [Node.js](https://nodejs.org/)
- MetaMask Flask

  To interact with (your) snaps, you will need to install [MetaMask Flask](https://metamask.io/flask/),
  a canary distribution for developers that provides access to upcoming features.

  ::: warning
  Make sure to install Flask in a new browser profile or disable any existing installed versions of MetaMask.
  Running multiple instances of MetaMask in the same browser profile will break dapp interactions.
  :::
  
Learn more about the anatomy of a snap.

We recommend getting started with snaps using our template.

## Install the snaps CLI

Before continuing, you should know that
[`@metamask/snaps-cli`](https://www.npmjs.com/package/@metamask/snaps-cli) exists, and will be one
of your most important tools as you get started with snap development.
The CLI can be installed globally using `npm` or `yarn`, and provides commands for initiating a snap
project and building, executing, and serving your snap for local development.
Executing `mm-snap --help` will provide detailed usage instructions.
