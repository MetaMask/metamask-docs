# Variable: KeyringAccountStruct

```ts
const KeyringAccountStruct: Struct<{
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
  }, {
  address: Struct<string, null>;
  id: Struct<string, null>;
  name: Struct<string, null>;
  options: Struct<null | Record<string, Json>, null>;
  supportedMethods: Struct<(
     | "personal_sign"
     | "eth_sendTransaction"
     | "eth_sign"
     | "eth_signTransaction"
     | "eth_signTypedData"
     | "eth_signTypedData_v1"
     | "eth_signTypedData_v2"
     | "eth_signTypedData_v3"
     | "eth_signTypedData_v4")[], Struct<
     | "personal_sign"
     | "eth_sendTransaction"
     | "eth_sign"
     | "eth_signTransaction"
     | "eth_signTypedData"
     | "eth_signTypedData_v1"
     | "eth_signTypedData_v2"
     | "eth_signTypedData_v3"
     | "eth_signTypedData_v4", {
     eth_sendTransaction: "eth_sendTransaction";
     eth_sign: "eth_sign";
     eth_signTransaction: "eth_signTransaction";
     eth_signTypedData: "eth_signTypedData";
     eth_signTypedData_v1: "eth_signTypedData_v1";
     eth_signTypedData_v2: "eth_signTypedData_v2";
     eth_signTypedData_v3: "eth_signTypedData_v3";
     eth_signTypedData_v4: "eth_signTypedData_v4";
     personal_sign: "personal_sign";
  }>>;
  type: Struct<"eip155:eoa" | "eip155:erc4337", {
     eip155:eoa: "eip155:eoa";
     eip155:erc4337: "eip155:erc4337";
  }>;
  }>;
```

## Source

[external/keyring-api/src/keyring-api.ts:16](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-api.ts#L16)
