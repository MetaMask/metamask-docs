---
sidebar_label: Onboard users
description: Simplify the MetaMask onboarding experience for your users.
sidebar_position: 13
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Use the MetaMask onboarding library

Sending users away from your dapp to install MetaMask presents challenges.
You must inform the user to return to your dapp and refresh their browser after the installation.
Your dapp detects the user's newly installed MetaMask extension only after that refresh.

You can use MetaMask's [onboarding library](https://github.com/MetaMask/metamask-onboarding) to
improve and simplify the onboarding experience.
The library exposes an API to initiate the onboarding process.

During the onboarding process, the library registers your dapp as the origin of the onboarding request.
MetaMask checks for this origin after the user completes the onboarding flow.
If it finds an origin, the final confirmation button of the MetaMask onboarding flow indicates that
the user will be redirected back to your dapp.

:::tip
[MetaMask SDK](../concepts/sdk/index.md) incorporates the functionality of the MetaMask onboarding library.
You don't need to set up the onboarding library if you use the SDK.
:::

## Steps

1. Install [@metamask/onboarding](https://github.com/MetaMask/metamask-onboarding).
1. Import the library or include it in your page:

    ```javascript
    // As an ES6 module
    import MetaMaskOnboarding from "@metamask/onboarding";
    // Or as an ES5 module
    const MetaMaskOnboarding = require("@metamask/onboarding");
    ```

    Alternatively, you can include the prebuilt ES5 bundle that ships with the library:

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

## Example

The following are example ways to use the onboarding library in various frameworks:

<Tabs>
<TabItem value="React">

```jsx
import MetaMaskOnboarding from "@metamask/onboarding";
import React from "react";

const ONBOARD_TEXT = "Click here to install MetaMask!";
const CONNECT_TEXT = "Connect";
const CONNECTED_TEXT = "Connected";

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
                .request({ method: "eth_requestAccounts" })
                .then(handleNewAccounts);
            window.ethereum.on("accountsChanged", handleNewAccounts);
            return () => {
                window.ethereum.removeListener(
                    "accountsChanged",
                    handleNewAccounts
                );
            };
        }
    }, []);

    const onClick = () => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
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

</TabItem>
<TabItem value="TypeScript">

The onboarding library ships with MetaMask's TypeScript types.
Modify the React example as follows to get type safety:

```jsx
-const onboarding = React.useRef();
+const onboarding = React.useRef<MetaMaskOnboarding>();
```

This gives you editor auto-completion for the methods exposed by the library, and
helpful documentation:

![Editor Highlighting](https://user-images.githubusercontent.com/4448075/85584481-ccc7ec00-b604-11ea-9b74-49c76ee0bf22.png)

</TabItem>
<TabItem value="Vanilla JavaScript and HTML">

```html
<!doctype html>
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
            window.addEventListener("DOMContentLoaded", () => {
                const onboarding = new MetaMaskOnboarding();
                const onboardButton = document.getElementById("onboard");
                let accounts;

                const updateButton = () => {
                    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
                        onboardButton.innerText =
                            "Click here to install MetaMask!";
                        onboardButton.onclick = () => {
                            onboardButton.innerText = "Onboarding in progress";
                            onboardButton.disabled = true;
                            onboarding.startOnboarding();
                        };
                    } else if (accounts && accounts.length > 0) {
                        onboardButton.innerText = "Connected";
                        onboardButton.disabled = true;
                        onboarding.stopOnboarding();
                    } else {
                        onboardButton.innerText = "Connect";
                        onboardButton.onclick = async () => {
                            await window.ethereum.request({
                                method: "eth_requestAccounts",
                            });
                        };
                    }
                };

                updateButton();
                if (MetaMaskOnboarding.isMetaMaskInstalled()) {
                    window.ethereum.on("accountsChanged", (newAccounts) => {
                        accounts = newAccounts;
                        updateButton();
                    });
                }
            });
        </script>
    </body>
</html>
```

</TabItem>
</Tabs>
