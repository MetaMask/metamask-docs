# Onboarding Library

As an Ethereum enabled site developer, sending users offsite to install MetaMask presents challenges. Most notably, you must inform the user to return to your site and refresh their browser after the installation. Your site will detect the user's newly installed MetaMask extension only after that refresh. We at MetaMask care deeply about user experience, and we knew that this workflow needed to be improved.

MetaMask now provides a [metamask-onboarding library](https://github.com/MetaMask/metamask-onboarding) designed to improve and simplify the onboarding experience. The new library exposes an API to initiate the onboarding process. In the process, it registers your site as the origin of the onboarding request. MetaMask will check for this origin after the user completes the onboarding flow. If it finds an origin, the final confirmation button of the MetaMask onboarding flow will indicate that the user will be redirected back to your site.

## Getting Started

1. Install @metamask/onboarding using npm or yarn.
2. Import the Onboarding Library or include it in your page.

```javascript
// As an ES6 module
import MetaMaskOnboarding from '@metamask/onboarding';
// Or as an ES5 module
const MetaMaskOnboarding = require('@metamask/onboarding');
```

If you'd prefer you can instead include the prebuilt ES5 bundle that ships with the library:

```html
<script src="./metamask-onboarding.bundle.js"></script>
```

3. Create a new instance of the Onboarding library

```javascript
const onboarding = new MetaMaskOnboarding();
```

4. Start the onboarding process in response to a user event (e.g. a button click).

```javascript
onboarding.startOnboarding();
```

## Examples

### Basic Usage

```javascript
const onboarding = new MetaMaskOnboarding();
onboarding.startOnboarding();
```

### Using React

```jsx
import MetaMaskOnboarding from '@metamask/onboarding';
import React from 'react';

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';
const CONNECTED_TEXT = 'Connected';

export function OnboardingButton() {
  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);
  const onboarding = React.useRef();

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  React.useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts);
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.removeListener('accountsChanged', handleNewAccounts);
      };
    }
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
  };
  return (
    <button disabled={isDisabled} onClick={onClick}>
      {buttonText}
    </button>
  );
}
```

### Using TypeScript

We ship our TypeScript types with `@metamask/onboarding`. Modifying the above example to get type safety when using the onboarding library is simple:

```jsx
  -const onboarding = React.useRef();
  +const onboarding = React.useRef<MetaMaskOnboarding>();
```

Doing this step will give you editor auto-completion for the methods exposed by the library, and helpful documentation.

![Editor Highlighting](https://user-images.githubusercontent.com/4448075/85584481-ccc7ec00-b604-11ea-9b74-49c76ee0bf22.png)

### Using Vanilla Javascript + HTML

```html
<!DOCTYPE html>
<html lang="en-CA">
  <head>
    <title>MetaMask Onboarding Example</title>
    <meta charset="UTF-8" />
  </head>
  <body>
    <h1>Sample Dapp</h1>
    <button id="onboard">Loading...</button>
    <script src="./metamask-onboarding.bundle.js"></script>
    <script>
      window.addEventListener('DOMContentLoaded', () => {
        const onboarding = new MetaMaskOnboarding();
        const onboardButton = document.getElementById('onboard');
        let accounts;

        const updateButton = () => {
          if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
            onboardButton.innerText = 'Click here to install MetaMask!';
            onboardButton.onclick = () => {
              onboardButton.innerText = 'Onboarding in progress';
              onboardButton.disabled = true;
              onboarding.startOnboarding();
            };
          } else if (accounts && accounts.length > 0) {
            onboardButton.innerText = 'Connected';
            onboardButton.disabled = true;
            onboarding.stopOnboarding();
          } else {
            onboardButton.innerText = 'Connect';
            onboardButton.onclick = async () => {
              await window.ethereum.request({
                method: 'eth_requestAccounts',
              });
            };
          }
        };

        updateButton();
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
          window.ethereum.on('accountsChanged', (newAccounts) => {
            accounts = newAccounts;
            updateButton();
          });
        }
      });
    </script>
  </body>
</html>
```

## Onboarding Diagram

Here is a diagram of the interactions between the onboarding library, the forwarder, and the extension:

![Onboarding Library Diagram](https://user-images.githubusercontent.com/2459287/67541693-439c9600-f6c0-11e9-93f8-112a8941384a.png)
