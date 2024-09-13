---
description: eth_getBlockRange API method
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# eth_getBlockRange

Returns the block information for blocks within a specified range.

## Parameters

- `start block hash`: (string) _[required]_ Hexadecimal block number, or one of the string tags
  `latest`, `earliest`, `pending`, `safe`, or `finalized`.
  See the [default block parameter](https://ethereum.org/en/developers/docs/apis/json-rpc/#default-block).
- `end block hash`: (string) _[required]_ Hexadecimal block number, or one of the string tags
  `latest`, `earliest`, `pending`, `safe`, or `finalized`.
  See the [default block parameter](https://ethereum.org/en/developers/docs/apis/json-rpc/#default-block).
- `transaction details flag`: (boolean) _[required]_ `true` returns full transaction objects, `false`
  returns only the hashes of the transactions.

## Returns

Array of block objects:

- `difficulty`: A hexadecimal of the difficulty for this block.
- `extraData`: The "extra data" field of this block.
- `gasLimit`: Maximum gas allowed in this block.
- `gasUsed`: Total used gas by all transactions in this block.
- `hash`: 32 bytes. The hash of the block. Null when the returned block is the pending block.
- `logsBloom`: 256 bytes. The bloom filter for the logs of the block. Null when the returned block is the pending block.
- `miner`: 20 bytes. The address of the beneficiary to whom the mining rewards were given.
- `nonce`: 8 bytes. The hash of the generated proof-of-work. Null when the returned block is the pending block.
- `number`: The block number. Null when the returned block is the pending block.
- `parentHash`: 32 bytes. The hash of the parent block.
- `receiptsRoot`: 32 bytes. The root of the receipts trie of the block.
- `sha3Uncles`: 32 bytes. The SHA3 of the uncles data in the block.
- `size`: A hexadecimal of the size of this block in bytes.
- `stateRoot`: 32 bytes. The root of the final state trie of the block.
- `timestamp`: Unix timestamp for when the block was collated.
- `totalDifficulty`: A hexadecimal of the total difficulty of the chain until this block.
- `transactions`: [Array] An array of transaction objects, or 32 bytes transaction hashes depending on the last given parameter.
- `transactionsRoot`: 32 bytes. The root of the transaction trie of the block.
- `uncles`: [Array] An Array of uncle hashes.

## Example

Replace `<YOUR-API-KEY>` with an API key from your [Infura dashboard](https://infura.io/dashboard).

### Request

<Tabs>
  <TabItem value="cURL" label="cURL" default>

```bash
curl https://mantle-mainnet.infura.io/v3/<YOUR-API-KEY> \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc": "2.0", "method": "eth_getBlockRange", "params": ["0x1", "0x2", false], "id": 1}'
```

  </TabItem>
  <TabItem value="WSS">

```bash
wscat -c wss://mantle-mainnet.infura.io/ws/v3/<YOUR-API-KEY> -x '{"jsonrpc": "2.0", "method": "eth_getBlockRange", "params": ["0x1", "0x2", false], "id": 1}'
```

  </TabItem>
</Tabs>

### Result

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "difficulty": "0x2",
      "extraData": "0xd97735082a846765746889676f312e31352e3133856c696e75780000000000009c3827892825f0825a7e329b6913b84c9e4f89168350aff0939e0e6609629f2e7f07f2aeb62acbf4b16a739cab68866f4880ea406583a4b28a59d4f55dc2314e00",
      "gasLimit": "0xe4e1c0",
      "gasUsed": "0x3183d",
      "hash": "0xbee7192e575af30420cae0c7776304ac196077ee72b048970549e4f08e875453",
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000400000000000100000000000000200000000002000000000000001000000000000000000004000000000000000000000000000040000400000100400000000000000100000000000000000000000000000020000000000000000000000000000000000000000000000001000000000000000000000100000000000000000000000000000000000000000000000000000000000000088000000080000000000010000000000000000000000000000800008000120000000000000000000000000000000002000",
      "miner": "0x0000000000000000000000000000000000000000",
      "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "nonce": "0x0000000000000000",
      "number": "0x1",
      "parentHash": "0x7ca38a1916c42007829c55e69d3e9a73265554b586a499015373241b8a3fa48b",
      "receiptsRoot": "0xf4c97b1186b690ad3318f907c0cdaf46f4598f27f711a5609064b2690a767287",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": "0x30c",
      "stateRoot": "0xd3ac40854cd2ac17d8effeae6065cea990b04be714f7061544973feeb2f1c95f",
      "timestamp": "0x618d4769",
      "totalDifficulty": "0x3",
      "transactions": [
        "0x5e77a04531c7c107af1882d76cbff9486d0a9aa53701c30888509d4f5f2b003a"
      ],
      "transactionsRoot": "0x19f5efd0d94386e72fcb3f296f1cb2936d017c37487982f76f09c591129f561f",
      "uncles": []
    },
    {
      "difficulty": "0x2",
      "extraData": "0xd98301090a848932606889676f312e61742e3133856c696e757800000000000064a82cb66c7810b9619e7f14ab65c769a828b1616974987c530684eb3870b65e5b2400c1b61c6d340beef8c8e99127ac0de50e479d21f0833a5e2910fe64b41801",
      "gasLimit": "0xe4e1c0",
      "gasUsed": "0x1c60d",
      "hash": "0x45fd6ce41bb8ebb2bccdaa92dd1619e367404cb07722039901a7eba63dea1d13",
      "logsBloom": "0x00080000000200000000000000000008000000000000000000000100008000000000000000000000000000000000000000000000000000000000400000000000100000000000000000000000020000000000000000000000000000000000004000000000000000000000000000000000400000000400000000000000100000000000000000000000000000020000000000000000000000000000000000000000100000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000008400000000000000000010000000000000000020000000020000000000000000000000000000000000000000000002000",
      "miner": "0x0000000000000000000000000000000000000000",
      "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "nonce": "0x0000000000000000",
      "number": "0x2",
      "parentHash": "0xbee7192e575af30420cae0c7776304ac196077ee72b048970549e4f08e875453",
      "receiptsRoot": "0x2057c8fb79c0f294062c1436aa56741134dc46d228a4f874929f8b791a7007a4",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": "0x30c",
      "stateRoot": "0x87026f3a614318ae24bcef6bc8f7564479afbbbe2b1fb189bc133a5de5a2b0f8",
      "timestamp": "0x618d8837",
      "totalDifficulty": "0x5",
      "transactions": [
        "0xaf6ed8a6864d44989adc47c84f6fe0aeb1819817505c42cde6cbbcd5e14dd317"
      ],
      "transactionsRoot": "0xa39c4d0d2397f8fcb1683ba833d4ab935cd2f4c5ca6f56a7d9a45b9904ea1c69",
      "uncles": []
    }
  ]
}
```
