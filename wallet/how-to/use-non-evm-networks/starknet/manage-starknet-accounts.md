---
description: Manage Starknet accounts in MetaMask.
sidebar_position: 2
---

# Manage Starknet accounts

You can manage Starknet accounts in MetaMask.
The following examples use the [`get-starknet`](https://github.com/starknet-io/get-starknet) library.

:::note Notes

- Account creation in Starknet is handled by the wallet provider.
  As a dapp developer, you do not create accounts directly.
  Instead, you can guide users to [create an account](connect-to-starknet.md) with MetaMask.
- Currently, the Starknet Snap doesn't support multiple Starknet accounts.

:::

## Prerequisites

[Connect to Starknet](connect-to-starknet.md) from your dapp.

## Display account information

After a user connects to their Starknet account in MetaMask, you can display the account details.
The following example displays the account address: 

```javascript
const showAccountInfo = async () => {
  const account = await connectStarknetAccount();
  if (account) {
    document.getElementById("accountAddress").innerText = `Account Address: ${account}`;
  }
};
```

## Retrieve the connected account

To retrieve and display a user's connected Starknet account, use the `get-starknet` library in
combination with React hooks.
The following example displays the connected account address if available, and displays buttons to
connect or disconnect the account.

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

## Manage account transactions

You can manage a user's Starknet account transactions using `get-starknet`.
The following example invokes a specific function on a Starknet smart contract, handles wallet
connection and transaction submission, and logs the result or any errors:

```javascript
const invokeStarknetContract = async () => {
  try {
    const starknet = getStarknet();
    await starknet.enable();  // Make sure the wallet is enabled.

    const contractAddress = "0xYourContractAddress";  // Replace with your contract address.
    const entrypoint = "function_name";  // The function you want to call.
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
      // Update your dapp's state.
    };

    const handleDisconnect = () => {
      console.log("Disconnected from wallet");
      setAccount(null);
      // Handle disconnection (for example reset dapp state, show connect button).
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

Use this component at the top level of your dapp to handle account changes globally.
