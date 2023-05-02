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

Here we have three components, each with just static text, but the structure exists for a multi-component application consisting of a logo, navigation, main content "Display" area, and footer area that we will utilize to show errors when we have them.

### Styling Strategy

We have removed some styles that come default with ViteJS. `App.css` and `index.css` have been removed and we are opting for a modular approach to CSS in our project, but you really need not be concerned with those files unless you want to change the overall styles.

In the `/src` directory we have `App.global.css` which is styling that is specific to the entire application and is not related to a single component or has styling that we might want to reuse in many places in the case we scale the application further.

As well `/src` directory we have `App.module.css`. Considering our `App.tsx` is the container component for our application, `App.module.css` relates to it and its `appContainer` class which utilizes Flexbox to define the `display` type (`flex`) and the `flex-direction` (`column`). This ensures that any children components represented as `div`s are laid out in a single column layout (vertically).

Finally, we have a `/src/components` directory which has a folder for `Display`, `Navigation`, and `MetaMaskError`. Inside those folders are the component file and a corresponding modular CSS file that is specific to the component it is paired up with. The styles within those modules are specific to that component.

### Project Structure


```
├── src
│   ├── assets
│   ├── components
│   │   └── Display
│   │   |   └── index.tsx
│   │   |   └── Display.module.css
│   │   |   └── Display.tsx
│   │   ├── MetaMaskError
│   │   |   └── index.tsx
│   │   |   └── MetaMaskError.module.css
│   │   |   └── MetaMaskError.tsx
│   │   ├─── Navigation
│   │   |   └── index.tsx
│   │   |   └── Navigation.module.css
│   │   |   └── Navigation.tsx
│   ├── hooks
│   │   ├── useMetaMask.tsx
│   ├── utils
│   │   └── index.tsx
├── App.global.css
├── App.module.css
├── App.tsx
├── main.tsx
├── vite-env.d.ts
```