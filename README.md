# MetaMask Developer Documentation

Welcome to the MetaMask Documentation repository! This platform is built using [Docusaurus](https://docusaurus.io/), providing comprehensive guides and documentation to help you start working as quickly as possible with MetaMask.

## 🚀 Getting Started

Here are some quick steps to get you started with the MetaMask documentation repository:

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [MetaMask](https://metamask.io/)

### Steps

1. **Clone the Repository**

   ```sh
   git clone git@github.com:MetaMask/metamask-docs.git
   <!-- or with https `git clone https://github.com/MetaMask/metamask-docs.git` -->
   cd metamask-docs
   ```

2. **Link the keyring-api git submodule**
   ```sh
   cd external/keyring-api
   git clone git@github.com:MetaMask/keyring-api.git .
   yarn install
   yarn build
   cd ../..
   ```
3. **Install Dependencies**
   ```sh
   yarn install
   ```
4. **Start the Development Server**
   ```sh
   yarn start
   ```
   Once the server has started, you can view the documentation at `http://localhost:3000`.

## 🌐 JSON RPC Playground

Explore the JSON RPC Playground! This section of the documentation allows developers to interactively learn and try out the JSON-RPC API methods that MetaMask provides. You'll be able to make API requests and view corresponding responses, getting a hands-on understanding of how MetaMask’s JSON-RPC API functions.

To delve into the JSON RPC Playground, navigate to `[YOUR_DOCS_URL]/playground` after you've started the development server.

## 📘 Comprehensive Guides and Documentation

### MetaMask SDK

Dive deep into the MetaMask SDK through our extensive documentation, where we cover everything from initializing the SDK to interacting with the blockchain. Get insights into functionalities, method descriptions, and example usages to facilitate your DApp development with MetaMask.

### Snaps

MetaMask Snaps enable developers to extend the MetaMask wallet's functionality. Through our documentation, learn how to build your Snap and explore use-cases with examples to augment your development process.

### Wallet

Find all the information you need about the MetaMask Wallet - from basic setup and usage to advanced functionalities like sending tokens, managing accounts, and connecting to DApps. The documentation provides guidance to both new users and experienced developers.
