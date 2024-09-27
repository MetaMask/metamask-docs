---
description: Use dotenv to load environment variables from a file.
sidebar_position: 8
---

# Use JavaScript dotenv

[`dotenv`](https://www.npmjs.com/package/dotenv) is an [npm](https://www.npmjs.com/) JavaScript package that loads environment variables from a `.env` file into the `process.env` global variable, storing configuration in the environment separate from the code.

When you create a dapp using Infura, store your environment variables on your local machine using `dotenv` to protect sensitive information, such as Infura API URLs and MetaMask mnemonics, from pushing to GitHub and becoming publicly accessible.

### Install `dotenv`

Use [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install `dotenv` in your project directory:

```bash
npm i dotenv
```

Navigate to the project's `package.json` file to check that `dotenv` is included under `dependencies:`

```json
"dependencies": {
...
  "dotenv": "^16.0.1",
...
```

:::info

You can create a `package.json` file by running a CLI questionnaire, or by creating a default `package.json` file. Refer to the [npm documentation](https://docs.npmjs.com/creating-a-package-json-file) for more information.

:::

### Create the `.env` file

At the root of your project directory, create a file named `.env` containing environment variables for sensitive information that shouldn't be shared, such as an Infura API key, Ethereum private key, or MetaMask secret recovery phrase:

```bash
INFURA_API_KEY = "<YOUR-API-KEY>"
PRIVATE_KEY = "<YOUR-PRIVATE-KEY>"
```

:::danger

Never disclose your private keys or secret recovery phrases. Anyone with your private keys or secret recovery phrases can steal assets held in your account or wallet.

:::

### Access the `.env` information

Give your project access to the `.env` information by including the following line at the top of your project script:

```javascript
require("dotenv").config()
```

Access the environment variables using `process.env.<YOUR-ENV-VAR-NAME>`. For example, the following is a `hardhat.config.js` file for a Hardhat project:

```javascript
require("@nomiclabs/hardhat-waffle")
require("dotenv").config()

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: process.env.INFURA_API_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
}
```

### Create a `.gitignore` file

If you push your project to GitHub, the `.env` file will become publicly accessible unless you include it in a [`.gitignore`](https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files) file.

Before pushing your project, create a file named `.gitignore`, and include a line containing `.env`. Your file will now be ignored by Git and won't be checked into GitHub.

:::warning

`.gitignore` ignores only untracked files. If your `.env` file was committed in the past, it's now tracked by Git. Untrack the file by deleting it and running `git rm --cached .env`, then include it in `.gitignore`.

If you committed sensitive data in the past, [remove the data from your GitHub repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).

:::

When cloning an existing project, it might come with a `.env.sample`, `.env.template`, or similar file containing environment variables without values. Copy this file into a `.env` file on your local machine and fill in your values.
