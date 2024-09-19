---
description: Manage Starknet accounts in MetaMask.
sidebar_position: 2
---

# Manage Starknet accounts

You can manage Starknet accounts to display account information, handle transactions, and respond to account changes in your dapp. 

## View account information

After a user connects, you can display the account details, such as the account address: 

```javascript
const showAccountInfo = async () => {
  const account = await connectStarknetAccount();
  if (account) {
    document.getElementById("accountAddress").innerText = `Account Address: ${account}`;
  }
};
```

## Retrieve connected Starknet accounts

To retrieve and display connected Starknet accounts, use the `get-starknet` library in combination with React hooks:

```javascript
import { useStarknet, useConnectors } from "@starknet-react/core";
import { useState, useEffect } from "react";

function AccountDisplay() {
  const { account } = useStarknet();
  const { available, connect, disconnect } = useConnectors();
  const [accountAddress, setAccountAddress] = useState<string | undefined>();

  useEffect(() => {
    setAccountAddress(account?.address);
  }, [account]);

  return (
    <div>
      {accountAddress ? (
        <p>Connected Account: {accountAddress}</p>
      ) : (
        <p>No account connected</p>
      )}
      {available.map((connector) => (
        <button key={connector.id()} onClick={() => connect(connector)}>
          Connect {connector.name()}
        </button>
      ))}
      {account && (
        <button onClick={() => disconnect()}>Disconnect</button>
      )}
    </div>
  );
}
```

This component displays the connected account address if available, and provides buttons to connect or disconnect accounts.

## Account creation

Account creation in Starknet is handled by the wallet provider. As a dapp developer, you do not create accounts directly. Instead, you guide users to create an account with their preferred wallet provider.

:::note

Currently, multiple Starknet accounts are not supported in the Starknet Snap.

:::

## Manage account transactions

You can manage transactions with `get-starknet`:

```javascript

const invokeStarknetContract = async () => {
  try {
    const starknet = getStarknet();
    await starknet.enable();  // Make sure the wallet is enabled

    const contractAddress = "0xYourContractAddress";  // Replace with your contract address
    const entrypoint = "function_name";  // The function you want to call
    const calldata = [/* your function arguments */];  // Replace with calldata

    const result = await starknet.invoke({
      contractAddress: contractAddress,
      entrypoint: entrypoint,
      calldata: calldata
    });

    console.log("Transaction result: ", result);
  } catch (error) {
    console.error("Error invoking contract:", error);
  }
};
```
This invokes a specific function on a Starknet smart contract, handling wallet connection and transaction submission, and logs the result or any errors.


## Handle account changes and disconnections

To handle account changes and disconnections, you can use event listeners provided by `get-starknet`:

```javascript
import { getStarknet } from "get-starknet";
import { useEffect, useState } from "react";

function AccountChangeHandler() {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const starknet = getStarknet();

    const handleAccountsChanged = (accounts: string[]) => {
      console.log("Accounts changed:", accounts);
      setAccount(accounts[0] || null);
      // Update your app"s state here
    };

    const handleDisconnect = () => {
      console.log("Disconnected from wallet");
      setAccount(null);
      // Handle disconnection (e.g., reset app state, show connect button)
    };

    if (starknet) {
      starknet.on("accountsChanged", handleAccountsChanged);
      starknet.on("networkChanged", handleDisconnect);

      // Initial account setup
      starknet.enable().then((accounts: string[]) => {
        setAccount(accounts[0] || null);
      });

      return () => {
        starknet.off("accountsChanged", handleAccountsChanged);
        starknet.off("networkChanged", handleDisconnect);
      };
    }
  }, []);

  return (
    <div>
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <p>No account connected</p>
      )}
    </div>
  );
}

export default AccountChangeHandler;
```

Use this component at the top level of your app to handle account changes globally.
