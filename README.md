# MetaMask developer documentation

This is the MetaMask developer documentation repository.
The documentation site is hosted at [`docs.metamask.io`](https://docs.metamask.io), and it's
built using [Docusaurus](https://docusaurus.io/), a static site generator purpose-built for
technical documentation.

## Build locally

Build the documentation site locally using the following steps.

### Prerequisites

- [Node.js](https://nodejs.org/) version 16
- [Yarn](https://yarnpkg.com/) version 3
- [Git](https://git-scm.com/)

### Steps

1. Clone the repository.

   ```bash
   git clone https://github.com/MetaMask/metamask-docs.git
   cd metamask-docs
   ```

2. Initialize and update the [`keyring-api`](https://github.com/MetaMask/keyring-api) submodule.

   ```bash
   git submodule init && git submodule update
   ```

3. Install dependencies.

   ```bash
   yarn install
   ```

4. Start the development server.

   ```bash
   yarn start
   ```

   Once the server starts, you can view the documentation at `http://localhost:3000`.

For more information on contributing to the documentation, see the [full contribution guidelines](CONTRIBUTING.md).
