# JSON-RPC methods

Celo supports a subset [Ethereum JSON-RPC methods](../../ethereum/json-rpc-methods/index.md). WebSocket calls aren't supported when using the Celo endpoints.

The following methods aren't supported with Celo:

- `eth_feeHistory`
- `eth_getUncleCountByBlockHash`
- `eth_getUncleCountByBlockNumber`
- `eth_getUncleByBlockHashAndIndex`
- `eth_getUncleByBlockNumberAndIndex`

The following methods are supported by Celo, but not supported by Infura using a Celo endpoint:

- `eth_getFilterChanges`
- `eth_getFilterLogs`
- `eth_newFilter`
- `eth_newBlockFilter`
- `eth_uninstallFilter`

Infura is also compatible with the [Celo ContractKit](https://docs.celo.org/developer/contractkit), a library of tools
designed to integrate applications with Celo.
