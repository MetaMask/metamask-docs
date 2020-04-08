# Create A Simple Dapp
::: tip 
We will be building this [app](https://metamask.github.io/test-dapp/)
:::

## Project Setup
Before you setup make sure you've visited and gone through our [Getting Started Guide](http://localhost:8080/guide/getting-started.html#getting-started)

Make sure you have:
1. Have the [MetaMask Extendsion](https://metamask.io/download.html) downlaoded.
2. Have Node.js [Downloaded and Installed](https://nodejs.org/)
3. Clone/Download the [project files](https://github.com/BboyAkers/simple-dapp-tutorial) from Github.
4. Have your favorite Text Editor or IDE installed. I personally like [Visual Studio Code](https://code.visualstudio.com/)

### Open Project Folder
Open the poejct folder. Navigate to start->index.html, and look at the comment stating part 1. We will be using/buidling off of this entire section for the first part of the tutorial.


### Install Dependencies
Open a terminal and make sure your terminal is inside the base diretory of the start/ folder. Inside the folder the files should look like this:

```
.
├─ index.html
├─ contract.js
├─ metamask.css
├─ package.json
└─ README.md
```
You'll have some more files but that's nothing worry about!

Open your terminal and navigate into the start folder. In this folder run:
``` bash
npm install
```
This will install all the neccessary dependencies we'll need for our project. This will have created a node_modules/ folder where all the dependencies are stored.

Next run:
``` bash
npm run serve
```

Navigate to `http://localhost:9011`

## Basic Actions & Status(Part 1)

Now let's navigate into the contract.js file inside you start folder.

Your file should look something like this. Don't worry about line 1-31.

``` javascript
const forwarderOrigin = 'http://localhost:9010'

const initialize = () => {
  //You will start here 
}
window.addEventListener('DOMContentLoaded', initialize)
```

As you can see here, as soon as the content in the DOM is loaded we are calling our initialized function. Now before we start writing any code we need to see what's on our task list for the first part of this app.

What we'll cover in part one:
  
- [Connecting to the MetaMask Wallet](/guide/create-dapp.html#connecting-to-the-metamask-wallet)
- See our eth_accounts result
- Display our network number
- Display our ChainId
- Display our Accounts


## Connecting to the MetaMask Wallet