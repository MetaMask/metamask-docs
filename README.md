# MetaMask developer documentation

This is the MetaMask developer documentation repository.
The documentation site is hosted at [`docs.metamask.io`](https://docs.metamask.io), and it's
built using [Docusaurus](https://docusaurus.io/), a static site generator purpose-built for
technical documentation.

## Build locally

Build the documentation site locally using the following steps.

### Prerequisites

- [Node.js](https://nodejs.org/) version 18+
- [Yarn](https://yarnpkg.com/) version 3
- [Git](https://git-scm.com/)

### Steps

1. Clone the repository.

   ```bash
   git clone https://github.com/MetaMask/metamask-docs.git
   cd metamask-docs
   ```

   > **Note:** If you don't have write access to this repository, you must [fork the repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) to your personal account and clone your forked repository instead. [Add an upstream remote](https://docs.github.com/en/get-started/quickstart/fork-a-repo#configuring-git-to-sync-your-fork-with-the-upstream-repository) to be able to pull from and push to the original repository.
   >
   > ```bash
   > git clone https://github.com/<YOUR-USERNAME>/metamask-docs.git
   > cd metamask-docs
   > git remote add upstream https://github.com/MetaMask/metamask-docs.git
   > ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Start the development server.

   ```bash
   npm start
   ```

   Once the server starts, you can view the documentation at `http://localhost:3000`.

For more information on contributing to the documentation, see the [full contribution guidelines](CONTRIBUTING.md).
