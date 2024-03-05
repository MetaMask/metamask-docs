# Type alias: Sender

```ts
type Sender: {
  send: Promise<
     | null
     | string[]
     | {
     address: string;
     id: string;
     name: string;
     options: null | Record<string, Json>;
     supportedMethods: (
        | "personal_sign"
        | "eth_sendTransaction"
        | "eth_sign"
        | "eth_signTransaction"
        | "eth_signTypedData"
        | "eth_signTypedData_v1"
        | "eth_signTypedData_v2"
        | "eth_signTypedData_v3"
        | "eth_signTypedData_v4")[];
     type: "eip155:eoa" | "eip155:erc4337";
     }
     | {
     account: string;
     request: { id: string; jsonrpc: "2.0"; method: string; } | { id: string; jsonrpc: "2.0"; method: string; params: Record<string, Json> | Json[]; };
     scope: string;
     }
     | {
     pending: true;
     }
     | {
     pending: false;
     result: Json;
     }
     | {
     address: string;
     id: string;
     name: string;
     options: null | Record<string, Json>;
     supportedMethods: (
        | "personal_sign"
        | "eth_sendTransaction"
        | "eth_sign"
        | "eth_signTransaction"
        | "eth_signTypedData"
        | "eth_signTypedData_v1"
        | "eth_signTypedData_v2"
        | "eth_signTypedData_v3"
        | "eth_signTypedData_v4")[];
     type: "eip155:eoa" | "eip155:erc4337";
     }[]
     | {
     account: string;
     request: { id: string; jsonrpc: "2.0"; method: string; } | { id: string; jsonrpc: "2.0"; method: string; params: Record<string, Json> | Json[]; };
     scope: string;
  }[]>;
};
```

## Type declaration

### send()

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `request` |    \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_listAccounts"`;   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_getAccount"`;   `params`: \{ id: string; };   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_createAccount"`;   `params`: \{ name: string; options: Record<string, Json\> \| null; };   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_filterAccountChains"`;   `params`: \{ id: string; chains: string[]; };   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_updateAccount"`;   `params`: \{ account: \{ id: string; name: string; address: string; options: Record<string, Json\> \| null; supportedMethods: ("personal\_sign" \| "eth\_sendTransaction" \| "eth\_sign" \| "eth\_signTransaction" \| "eth\_signTypedData" \| "eth\_signTypedData\_v1" \| "eth\_signTypedData\_v2" \| "eth\_signTypedData\_v3" \| "eth\_signTypedData\_v4")[]; type: "eip155:eoa" \| "eip155:erc4337"; }; };   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_deleteAccount"`;   `params`: \{ id: string; };   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_listRequests"`;   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_getRequest"`;   `params`: \{ id: string; };   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_submitRequest"`;   `params`: \{ account: string; scope: string; request: \{ id: string; jsonrpc: "2.0"; method: string; } \| \{ id: string; jsonrpc: "2.0"; method: string; params: Record<string, Json\> \| Json[]; }; };   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_approveRequest"`;   `params`: \{ id: string; };   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_rejectRequest"`;   `params`: \{ id: string; };   } |

## Source

[external/keyring-api/src/keyring-client.ts:28](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-client.ts#L28)
