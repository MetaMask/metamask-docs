# Variable: KeyringRequestStruct

```ts
const KeyringRequestStruct: Struct<{
  account: string;
  request: { id: string; jsonrpc: "2.0"; method: string; } | { id: string; jsonrpc: "2.0"; method: string; params: Record<string, Json> | Json[]; };
  scope: string;
  }, {
  account: Struct<string, null>;
  request: Struct<{
     id: string;
     jsonrpc: "2.0";
     method: string;
     } | {
     id: string;
     jsonrpc: "2.0";
     method: string;
     params: Record<string, Json> | Json[];
  }, null>;
  scope: Struct<string, null>;
  }>;
```

## Source

[external/keyring-api/src/keyring-api.ts:89](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-api.ts#L89)
