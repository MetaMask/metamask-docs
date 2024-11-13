---
description: Manage Starknet accounts in MetaMask.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Manage Starknet accounts

You can manage Starknet accounts in MetaMask using the
[`get-starknet`](https://github.com/starknet-io/get-starknet) library or the
[`wallet_invokeSnap`](/snaps/reference/wallet-api-for-snaps/#wallet_invokesnap) JSON-RPC method.

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

<Tabs>
  <TabItem value="get-starknet" default>

  ```javascript
  const connectStarknetAccount = async () => {
    const starknet = await connect();
    await starknet.enable();  // Prompts the user to connect their Starknet account using MetaMask.
    return starknet;
  };

  const showAccountInfo = async () => {
    const starknet = await connectStarknetAccount();
    
    if (account) {
      document.getElementById("accountAddress").innerText = `Account Address: ${starknet.selectedAddress}`;
    }
  };
  ```

  </TabItem>
  <TabItem value="wallet_invokeSnap">
  
  ```javascript
  const showAccountInfo = async () => {
    if (typeof provider !== "undefined" && provider.isMetaMask) {
      try {
        // Invoke the Starknet Snap to get account information.
        const response = await provider // Or window.ethereum if you don't support EIP-6963.
          .request({
            method: "wallet_invokeSnap",
            params: {
              snapId: "npm:@starknet-snap/snap", 
              request: {
                method: "starknet_recoverAccounts"
              }
            }
          });

        if (response && response.length > 0) {
          const account = response[0]; // Get the first account.
          document.getElementById("accountAddress").innerText = `Account Address: ${account.address}`;
        } else {
          document.getElementById("accountAddress").innerText = "No Starknet account found";
        }
      } catch (error) {
        console.error("Error fetching Starknet account:", error);
        document.getElementById("accountAddress").innerText = "Error fetching account information";
      }
    } else {
      document.getElementById("accountAddress").innerText = "MetaMask not detected or Snaps not supported";
    }
  };

  // Call the function when needed.
  showAccountInfo();
  ```

  </TabItem> 
</Tabs>

## Retrieve the connected account

You can retrieve and display a user's connected Starknet account.
The following example displays the connected account address if available, and displays buttons to
connect or disconnect the account.

<Tabs>
  <TabItem value="get-starknet" default>

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

  </TabItem>
  <TabItem value="wallet_invokeSnap">
  
  ```javascript
  import React, { useState, useEffect } from "react";

  const STARKNET_SNAP_ID = "npm:@starknet-snap/snap";

  function AccountDisplay() {
    const [accountAddress, setAccountAddress] = useState<string | undefined>();
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const connectToSnap = async () => {
      if (typeof provider !== "undefined" && provider.isMetaMask) {
        try {
          // Request permission to access the Snap.
          await provider // Or window.ethereum if you don't support EIP-6963.
            .request({
              method: "wallet_requestSnaps",
              params: { [STARKNET_SNAP_ID]: {} }
            });
          setIsConnected(true);
          fetchAccount();
        } catch (err) {
          console.error("Error connecting to Starknet Snap:", err);
          setError("Failed to connect to Starknet Snap");
        }
      } else {
        setError("MetaMask not detected or Snaps not supported");
      }
    };

    const disconnectFromSnap = async () => {
      setAccountAddress(undefined);
      setIsConnected(false);
    };

    const fetchAccount = async () => {
      if (typeof provider !== "undefined" && provider.isMetaMask) {
        try {
          const response = await provider // Or window.ethereum if you don't support EIP-6963.
            .request({
              method: "wallet_invokeSnap",
              params: {
                snapId: STARKNET_SNAP_ID,
                request: {
                  method: "starknet_recoverAccounts"
                }
              }
            });

          if (response && response.length > 0) {
            setAccountAddress(response[0].address);
          } else {
            setError("No Starknet account found");
          }
        } catch (err) {
          console.error("Error fetching Starknet account:", err);
          setError("Failed to fetch account information");
        }
      }
    };

    useEffect(() => {
      if (isConnected) {
        fetchAccount();
      }
    }, [isConnected]);

    return (
      <div>
        {accountAddress ? (
          <p>Connected Account: {accountAddress}</p>
        ) : (
          <p>No account connected</p>
        )}
        {!isConnected ? (
          <button onClick={connectToSnap}>Connect to Starknet</button>
        ) : (
          <button onClick={disconnectFromSnap}>Disconnect</button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  export default AccountDisplay;
  ```

  </TabItem> 
</Tabs>


## Manage account transactions

You can manage a user's Starknet account transactions.
The following example invokes a specific function on a Starknet smart contract, handles wallet
connection and transaction submission, and logs the result or any errors:

<Tabs>
  <TabItem value="get-starknet" default>

```javascript
const invokeStarknetContract = async () => {
  try {
    const starknet = getStarknet();
    await starknet.enable();  // Make sure the wallet is enabled.

    const contractAddress = "0xYourContractAddress";  // Replace with your contract address.
    const entrypoint = "function_name";  // The function you want to call.
    const calldata = [/* your function arguments */];  // Replace with calldata.

    const result = await starknet.account.execute({
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

  </TabItem>
  <TabItem value="wallet_invokeSnap">

```javascript
const invokeStarknetContract = async () => {
  if (typeof provider !== "undefined" && provider.isMetaMask) {
    try {
      const calls = [
        {
          entrypoint: "transfer", // The function name to call on the contract.
          calldata: [
            "0x1234567890abcdef1234567890abcdef12345678", // Recipient's address.
            "1000000000000000000" // Amount to transfer in wei (1 token, assuming 18 decimals).
          ]
        }
      ];

      const result = await provider // Or window.ethereum if you don't support EIP-6963.
        .request({
          method: "wallet_invokeSnap",
          params: {
            snapId: "npm:@consensys/starknet-snap",
            request: {
              method: "starkNet_executeTxn",
              params: {
                address: "0xb60e8dd61c5d32be8058bb8eb970870f07233155", // The sender's address.
                calls: calls, // The array of calls with entrypoint and calldata.
                details: {
                  nonce: 1, // Optional nonce.
                  maxFee: "1000000000000000", // Maximum gas fee allowed.
                },
                chainId: "0x534e5f5345504f4c4941" // Starknet Sepolia testnet chain ID.
              }
            }
          }
        });

      console.log("Transaction result: ", result);
    } catch (error) {
      console.error("Error invoking contract:", error);
    }
  } else {
    console.error("MetaMask not detected or Snaps not supported");
  }
};
```

  </TabItem> 
</Tabs>

## Handle account changes and disconnections

You can handle account changes and disconnections.
Use the following component at the top level of your dapp to handle account changes globally:

<Tabs>
  <TabItem value="get-starknet" default>

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
      };

      const handleDisconnect = () => {
        console.log("Disconnected from wallet");
        setAccount(null);
      };

      if (starknet) {
        starknet.on("accountsChanged", handleAccountsChanged);
        starknet.on("networkChanged", handleDisconnect);

        // Initial account setup.
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
  </TabItem>
  <TabItem value="wallet_invokeSnap">

  ```javascript
  import React, { useEffect, useState } from "react";

  const STARKNET_SNAP_ID = "npm:@starknet-snap/snap";

  function AccountChangeHandler() {
    const [account, setAccount] = useState<string | null>(null);

    const fetchAccount = async () => {
      if (typeof provider !== "undefined" && provider.isMetaMask) {
        try {
          const response = await provider // Or window.ethereum if you don't support EIP-6963.
            .request({
              method: "wallet_invokeSnap",
              params: {
                snapId: STARKNET_SNAP_ID,
                request: {
                  method: "starknet_recoverAccounts"
                }
              }
            });

          if (response && response.length > 0) {
            setAccount(response[0].address);
          } else {
            setAccount(null);
          }
        } catch (error) {
          console.error("Error fetching Starknet account:", error);
          setAccount(null);
        }
      } else {
        console.error("MetaMask not detected or Snaps not supported");
        setAccount(null);
      }
    };

    useEffect(() => {
      fetchAccount();

      // Retrieve account changes every 5 seconds.
      const intervalId = setInterval(fetchAccount, 5000);

      return () => clearInterval(intervalId);
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
  
  </TabItem> 
</Tabs>
