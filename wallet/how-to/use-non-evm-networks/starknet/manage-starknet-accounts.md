---
description: Manage Starknet accounts in MetaMask.
sidebar_position: 2
---

# Manage Starknet accounts

## View account information

After a user connects, you can display the account details, such as the account address: 

```javascript
const showAccountInfo = async () => {
  const account = await connectStarknetAccount();
  if (account) {
    document.getElementById('accountAddress').innerText = `Account Address: ${account}`;
  }
};
```

## Switch between accounts

With the `get-starknet` library, you can allow users to switch accounts by re-enabling the wallet. 
MetaMask will prompt the user to select a different account if multiple accounts are available.

```javascript
const switchStarknetAccount = async () => {
  try {
    const starknet = getStarknet();
    await starknet.enable();  // Prompts the user to select an account
    const account = starknet.selectedAddress;
    console.log('Switched to Starknet Account:', account);
    
    return account;
  } catch (error) {
    console.error('Error switching Starknet account:', error);
  }
};
```

## Manage account transactions

You can manage transactions with `get-starknet`:

```javascript

const invokeStarknetContract = async () => {
  try {
    const starknet = getStarknet();
    await starknet.enable();  // Make sure the wallet is enabled

    const contractAddress = '0xYourContractAddress';  // Replace with your contract address
    const entrypoint = 'function_name';  // The function you want to call
    const calldata = [/* your function arguments */];  // Replace with calldata

    const result = await starknet.invoke({
      contractAddress: contractAddress,
      entrypoint: entrypoint,
      calldata: calldata
    });

    console.log('Transaction result:', result);
  } catch (error) {
    console.error('Error invoking contract:', error);
  }
};
```

# Comprehensive Guide to Managing Starknet Accounts

## 1. Retrieving and Displaying Connected Starknet Accounts

To retrieve and display connected Starknet accounts, you'll typically use the `get-starknet` library in combination with React hooks for state management.

```typescript
import { useStarknet, useConnectors } from '@starknet-react/core';
import { useState, useEffect } from 'react';

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

This component will display the connected account address if available, and provide buttons to connect or disconnect accounts.

## 2. Switching Between Multiple Starknet Accounts

Starknet doesn't natively support account switching like Ethereum. Instead, users typically have to disconnect and reconnect with a different account. However, you can implement a user-friendly interface to manage this process:

```typescript
import { useStarknet, useConnectors } from '@starknet-react/core';
import { useState, useEffect } from 'react';

function AccountSwitcher() {
  const { account } = useStarknet();
  const { available, connect, disconnect } = useConnectors();
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);

  useEffect(() => {
    if (account?.address && !connectedAccounts.includes(account.address)) {
      setConnectedAccounts([...connectedAccounts, account.address]);
    }
  }, [account]);

  const switchAccount = async (connector: any) => {
    await disconnect();
    await connect(connector);
  };

  return (
    <div>
      <h2>Connected Accounts:</h2>
      <ul>
        {connectedAccounts.map((address) => (
          <li key={address}>{address}</li>
        ))}
      </ul>
      <h2>Available Connectors:</h2>
      {available.map((connector) => (
        <button key={connector.id()} onClick={() => switchAccount(connector)}>
          Switch to {connector.name()}
        </button>
      ))}
    </div>
  );
}
```

This component keeps track of all connected accounts and allows switching between available connectors.

## 3. Account Creation Process

Account creation in Starknet is typically handled by the wallet provider (e.g., ArgentX, Braavos). As a dApp developer, you don't create accounts directly. Instead, you guide users to create an account with their preferred wallet provider. Here's how you might implement a guide for users:

```typescript
function AccountCreationGuide() {
  return (
    <div>
      <h2>Create a Starknet Account</h2>
      <ol>
        <li>Install a Starknet-compatible wallet (e.g., ArgentX, Braavos)</li>
        <li>Open the wallet and follow its account creation process</li>
        <li>Once created, return to this dApp and connect your new account</li>
      </ol>
      <p>After creating your account, you can connect it to this dApp.</p>
    </div>
  );
}
```

## Handling Account Changes and Disconnections

To handle account changes and disconnections, you can use event listeners provided by get-start. Here's an example using `@starknet-react/core`:

```
import { getStarknet } from 'get-starknet';
import { useEffect, useState } from 'react';

function AccountChangeHandler() {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const starknet = getStarknet();

    const handleAccountsChanged = (accounts: string[]) => {
      console.log('Accounts changed:', accounts);
      setAccount(accounts[0] || null);
      // Update your app's state here
    };

    const handleDisconnect = () => {
      console.log('Disconnected from wallet');
      setAccount(null);
      // Handle disconnection (e.g., reset app state, show connect button)
    };

    if (starknet) {
      starknet.on('accountsChanged', handleAccountsChanged);
      starknet.on('networkChanged', handleDisconnect);

      // Initial account setup
      starknet.enable().then((accounts: string[]) => {
        setAccount(accounts[0] || null);
      });

      return () => {
        starknet.off('accountsChanged', handleAccountsChanged);
        starknet.off('networkChanged', handleDisconnect);
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

You would typically use this component at the top level of your app to handle account changes globally.

## Best Practices

- Always check for account connection status before performing operations.
- Provide clear feedback to users about their connection status.
- Handle disconnections gracefully, resetting relevant app state.
- Use try-catch blocks when interacting with wallet methods to handle potential errors.
