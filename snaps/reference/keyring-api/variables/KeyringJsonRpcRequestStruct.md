# Variable: KeyringJsonRpcRequestStruct

```ts
const KeyringJsonRpcRequestStruct: Struct<{
  id: string;
  jsonrpc: "2.0";
  method: string;
  } | {
  id: string;
  jsonrpc: "2.0";
  method: string;
  params: Record<string, Json> | Json[];
  }, null>;
```

## Source

[external/keyring-api/src/keyring-api.ts:67](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-api.ts#L67)
