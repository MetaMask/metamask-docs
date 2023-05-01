---
title: Simple React Dapp with Global State
description: Update a simple (single component) React dapp that integrates MetaMask to utilize React Context Provider (global state).
toc_max_heading_level: 4
---

# Create a Simple React Dapp with Global State

This tutorial picks up where the [previous tutorial](./simple-react-dapp-local-state.md) left off. We will be starting our work from the [multi-component-start](https://github.com/MetaMask/dapp-tutorial-react/tree/multi-component-start) branch of the [dapp-tutorial-react](https://github.com/MetaMask/dapp-tutorial-react) source code repository.

We will also be utilizing TypeScript and a few best practices to ensure a clean code base as we will now have multiple components and a slightly more complex file structure in our [Vite](https://v3.vitejs.dev/guide/) + React project.

:::info Why Global State?
Our previous tutorial approached connecting to MetaMask and keeping changed wallet state in sync with a single component. In this tutorial we are going to move that state and its relevant functions into React Context and lift it to global state so that other components can be aware of any wallet state changes.
:::

## Prerequisites

- [Node.js](https://nodejs.org/) version 18+
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 9+
- A text editor (for example, [VS Code](https://code.visualstudio.com/))
- The [MetaMask extension](https://metamask.io/download) installed
- Basic knowledge of TypeScript, React and React Hooks

## Steps

### 1. Clone React Dapp Repository

Our first step to get started with this tutorial is to clone the [dapp-tutorial-react](https://github.com/MetaMask/dapp-tutorial-react) repository on GitHub and switch to the `multi-component-start` branch and install our node module dependencies.

```bash
git clone https://github.com/MetaMask/dapp-tutorial-react.git \
&& cd dapp-tutorial-react && git checkout multi-component-start \
&& npm install
```

At this point we should have a basic running application, but we have wiped out the code that we wrote in our previous branches [App.tsx file](https://github.com/MetaMask/dapp-tutorial-react/blob/single-component-final/src/App.tsx).

We will go over the structure of this new architecture, as it's still fairly simple. But first let's run our app using `npx vite` and make sure that your starting point looks the same as the image below:

![](../assets/tutorials/react-dapp/pt2-01.png)

Here we have three components, each with just some text loading, but we have the beginning of what we could turn into a fully working application complete with a navigation bar, main content "Display" area, and a footer area that we will utilize to show errors when we have them.

