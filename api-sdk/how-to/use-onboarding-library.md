# Use onboarding library

Use the MetaMask [onboarding library](../concepts/onboarding-library.md) to simplify the experience
of onboarding new users to MetaMask.

## Steps

1. [Install @metamask/onboarding](https://github.com/MetaMask/metamask-onboarding).
1. Import the library or include it in your page:

    ```javascript
    // As an ES6 module
    import MetaMaskOnboarding from '@metamask/onboarding';
    // Or as an ES5 module
    const MetaMaskOnboarding = require('@metamask/onboarding');
    ```
    
    If you prefer, you can instead include the prebuilt ES5 bundle that ships with the library:
    
    ```html
    <script src="./metamask-onboarding.bundle.js"></script>
    ```

1. Create a new instance of the onboarding library:

    ```javascript
    const onboarding = new MetaMaskOnboarding();
    ```

1. Start the onboarding process in response to a user event (for example, a button click):

    ```javascript
    onboarding.startOnboarding();
    ```

## Examples

### Basic usage

```javascript
const onboarding = new MetaMaskOnboarding();
onboarding.startOnboarding();
```

### React

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

### TypeScript

We ship our TypeScript types with `@metamask/onboarding`.
Modifying the [React example](#react) to get type safety when using the onboarding library is simple:

```jsx
  -const onboarding = React.useRef();
  +const onboarding = React.useRef<MetaMaskOnboarding>();
```

Taking this step gives you editor auto-completion for the methods exposed by the library, and
helpful documentation.

![Editor Highlighting](https://user-images.githubusercontent.com/4448075/85584481-ccc7ec00-b604-11ea-9b74-49c76ee0bf22.png)

### Vanilla JavaScript + HTML

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
