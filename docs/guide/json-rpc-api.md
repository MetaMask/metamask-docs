# JSON RPC API

## The Ethereum RPC API
MetaMask uses the `ethereum.sendAsync()` API to wrap an RPC API which is based on an interface exposed by all Ethereum clients, with some extra methods that are provided by MetaMask, as a key-holding signer.

This document is a cross-post of [EIP 1474](https://github.com/ethereum/EIPs/pull/1474/), which aims to standardize the declaration of this interface.

```
eip: 1474
title: Remote procedure call specification
author: Paul Bouchon <mail@bitpshr.net>
discussions-to: https://ethereum-magicians.org/t/eip-remote-procedure-call-specification/1537
status: Draft
type: Standards Track
category: Interface
created: 2018-10-02
```

### Simple Summary

This proposal defines a standard set of remote procedure call methods that an Ethereum node should implement.

### Abstract

Nodes created by the current generation of Ethereum clients expose inconsistent and incompatible remote procedure call (RPC) methods because no formal Ethereum RPC specification exists. This proposal standardizes such a specification to provide developers with a predictable Ethereum RPC interface regardless of underlying node implementation.

### Specification 

#### Concepts 

#### RFC-2119

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [RFC-2119](https://www.ietf.org/rfc/rfc2119.txt).

### JSON-RPC

Communication with Ethereum nodes is accomplished using [JSON-RPC](https://www.jsonrpc.org/specification), a stateless, lightweight [remote procedure call](https://en.wikipedia.org/wiki/Remote_procedure_call) protocol that uses [JSON](http://www.json.org/) as its data format. Ethereum RPC methods MUST be called using [JSON-RPC request objects](https://www.jsonrpc.org/specification#request_object) and MUST respond with [JSON-RPC response objects](https://www.jsonrpc.org/specification#response_object).

#### Error codes

If an Ethereum RPC method encounters an error, the `error` member included on the response object MUST be an object containing a `code` member and descriptive `message` member. The following list contains all possible error codes and associated messages:

| Code | Message  | Meaning  | Category  |
|-------|---|---|---|
| -32700 | 	Parse error         | Invalid JSON                       | standard |
| -32600 | Invalid request      | JSON is not a valid request object | standard |
| -32601 | Method not found     | Method does not exist              | standard |
| -32602 | Invalid params       | Invalid method parameters          | standard |
| -32603 | Internal error       | Internal JSON-RPC error            | standard |
| -32000 | Invalid input        | Missing or invalid parameters      | non-standard |
| -32001 | Resource not found   | Requested resource not found       | non-standard |
| -32002 | Resource unavailable | Requested resource not available   | non-standard |
| -32003 | Transaction rejected | Transaction creation failed        | non-standard |
| -32004 | Method not supported	| Method is not implemented          | non-standard |

Example error response:

``` json
{
    "id": 1337
    "jsonrpc": "2.0",
    "error": {
        "code": -32003,
        "message": "Transaction rejected"
    }
}
```

#### Value encoding

Specific types of values passed to and returned from Ethereum RPC methods require special encoding:

#### `Quantity`
* A `Quantity` value MUST be hex-encoded.
* A `Quantity` value MUST be “0x”-prefixed.
* A `Quantity` value MUST be expressed using the fewest possible hex digits per byte.
* A `Quantity` value MUST express zero as “0x0”.

Examples `Quantity` values:

| Value | Valid  | Reason  |
|-------|---|---|---|
| 0x | 	Parse error         | empty not a valid quantity          |
| 0x0 | Invalid request     | interpreted as a quantity of zero   |
| 0x00 | Method not found   | leading zeroes not allowed          |
| 0x41 | Invalid params     | interpreted as a quantity of 65     |
| 0x400	 | Internal error   | interpreted as a quantity of 1024   |
| 0x0400 | Invalid input    | leading zeroes not allowed          |
| ff | Resource not found   | values must be prefixed             |

#### Data

* A Data value MUST be hex-encoded.
* A Data value MUST be “0x”-prefixed.
* A Data value MUST be expressed using two hex digits per byte.

Examples `Data` values:

| Value | Valid  | Reason  |
|-------|---|---|---|
| 0x       | valid   | interpreted as empty data                            |
| 0x0      | invalid | each byte must be represented using two hex digits   |
| 0x00     | valid   | interpreted as a single zero byte                    |
| 0x41     | true    | interpreted as a data value of 65                    |
| 0x004200 | true    | interpreted as a data value of 16896                 |
| 0xf0f0f  | false   | bytes require two hex digits                         |
| 004200   | false   | values must be prefixed                              |

#### Proposing changes

New Ethereum RPC methods and changes to existing methods MUST be proposed via the traditional EIP process. This allows for community consensus around new method implementations and proposed method modifications. RPC method proposals MUST reach “draft” status before being added to this proposal and the official Ethereum RPC specification defined herein.

## Methods
| Method | Description  | 
|-------|---|---|---|
| [web3_clientVersion](/guide/json-rpc-api.html#web3-clientversion) | Returns the version of the current client |
| [web3_sha3](/guide/json-rpc-api.html#web3-sha3) | Hashes data using the Keccak-256 algorithm |
| [net_listening](/guide/json-rpc-api.html#net-listening) | Determines if this client is listening for new network connections |
| [net_peerCount](/guide/json-rpc-api.html#net-peercount) | Returns the number of peers currently connected to this client |
| [net_version](/guide/json-rpc-api.html#net-version) | Returns the chain ID associated with the current network |
| [eth_accounts](/guide/json-rpc-api.html#eth-accounts)  | Returns a list of addresses owned by this client |
| [eth_blockNumber](/guide/json-rpc-api.html#eth-blocknumber)   | Returns the number of the most recent block seen by this client   |
| [eth_call](/guide/json-rpc-api.html#eth-call)   | Executes a new message call immediately without submitting a transaction to the network |
| [eth_coinbase](/guide/json-rpc-api.html#eth-coinbase)   | Returns the coinbase address for this client |
| [eth_estimateGas](/guide/json-rpc-api.html#eth-estimategas)   | Estimates the gas necessary to complete a transaction without submitting it to the network |
| [eth_gasPrice](/guide/json-rpc-api.html#eth-gasprice)   | Returns the current price of gas expressed in wei |
| [eth_getBalance](/guide/json-rpc-api.html#eth-getbalance)   | Returns the balance of an address in wei |
| [eth_getBlockByHash](/guide/json-rpc-api.html#eth-getblockbyhash)   | Returns information about a block specified by hash |
| [eth_getBlockByNumber](/guide/json-rpc-api.html#eth-getblockbynumber)   | Returns information about a block specified by number   |
| [eth_getBlockTransactionCountByHash](/guide/json-rpc-api.html#eth-getblocktransactioncountbyhash)   | Returns the number of transactions in a block specified by block hash |
| [eth_getBlockTransactionCountByNumber](/guide/json-rpc-api.html#eth-getblocktransactioncountbynumber)   | Returns the number of transactions in a block specified by block number |
| [eth_getCode](/guide/json-rpc-api.html#eth-getcode)   | Returns the contract code stored at a given address |
| [eth_getFilterChanges](/guide/json-rpc-api.html#eth-getfilterchanges) | Returns a list of all logs based on filter ID since the last log retrieval |
| [eth_getFilterLogs](/guide/json-rpc-api.html#eth-getfilterlogs)   | Returns a list of all logs based on filter ID |
| [eth_getLogs](/guide/json-rpc-api.html#eth-getlogs)   | Returns a list of all logs based on a filter object |
| [eth_getStorageAt](/guide/json-rpc-api.html#eth-getstorageat)   | Returns the value from a storage position at an address |
| [eth_getTransactionByBlockHashAndIndex](/guide/json-rpc-api.html#eth-gettransactionbyblockhashandindex)   | Returns information about a transaction specified by block hash and transaction index |
| [eth_getTransactionByBlockNumberAndIndex](/guide/json-rpc-api.html#eth-gettransactionbyblocknumberandindex)   | Returns information about a transaction specified by block number and transaction index |
| [eth_getTransactionByHash](/guide/json-rpc-api.html#eth-gettransactionbyhash)   | Returns information about a transaction specified by hash |
| [eth_getTransactionCount](/guide/json-rpc-api.html#eth-gettransactioncount)   | Returns the number of transactions sent from an address |
| [eth_getTransactionReceipt](/guide/json-rpc-api.html#eth-gettransactionreceipt)   | Returns the receipt of a transaction specified by hash |
| [eth_getUncleByBlockHashAndIndex](/guide/json-rpc-api.html#eth-getunclebyblockhashandindex)   | Returns information about an uncle specified by block hash and uncle index position |
| [eth_getUncleByBlockNumberAndIndex](/guide/json-rpc-api.html#eth-getunclebyblocknumberandindex)   | Returns information about an uncle specified by block number and uncle index position |
| [eth_getUncleCountByBlockHash](/guide/json-rpc-api.html#eth-getunclecountbyblockhash)   | Returns the number of uncles in a block specified by block hash |
| [eth_getUncleCountByBlockNumber](/guide/json-rpc-api.html#eth-getunclecountbyblocknumber)   | Returns the number of uncles in a block specified by block number |
| [eth_getWork](/guide/json-rpc-api.html#eth-getwork)   | Returns a list containing relevant information for proof-of-work |
| [eth_hashrate](/guide/json-rpc-api.html#eth-hashrate)   | Returns the number of hashes-per-second this node is mining at |
| [eth_mining](/guide/json-rpc-api.html#eth-mining)   | Determines if this client is mining new blocks |
| [eth_newBlockFilter](/guide/json-rpc-api.html#eth-newblockfilter)   | Creates a filter to listen for new blocks that can be used with `eth_getFilterChanges` |
| [eth_newFilter](/guide/json-rpc-api.html#eth-newfilter)   | Creates a filter to listen for specific state changes that can then be used with eth_getFilterChanges |
| [eth_newPendingTransactionFilter](/guide/json-rpc-api.html#eth-newpendingtransactionfilter)   | Creates a filter to listen for new pending transactions that can be used with `eth_getFilterChanges` |
| [eth_protocolVersion](/guide/json-rpc-api.html#eth-protocolversion)   | Returns the current Ethereum protocol version |
| [eth_sendRawTransaction](/guide/json-rpc-api.html#eth-sendrawtransaction)   | Sends and already-signed transaction to the network |
| [eth_sendTransaction](/guide/json-rpc-api.html#eth-sendtransaction)   | Creates, signs, and sends a new transaction to the network |
| [eth_sign](/guide/json-rpc-api.html#eth-sign)   |Calculates an Ethereum-specific signature in the form of `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))` |
| [eth_signTransaction](/guide/json-rpc-api.html#eth-signtransaction)   | Signs a transaction that can be submitted to the network at a later time using with `eth_sendRawTransaction` |
| [eth_signTypedData](/guide/json-rpc-api.html#eth-signtypeddata)   | Calculates an Ethereum-specific signature in the form of `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))` |
| [eth_submitHashrate](/guide/json-rpc-api.html#eth-submithashrate)   | Submit a mining hashrate |
| [eth_submitWork](/guide/json-rpc-api.html#eth-submitwork)   | Submit a proof-of-work solution |
| [eth_syncing](/guide/json-rpc-api.html#eth-syncing)   | Returns information about the status of this client’s network synchronization |
| [eth_uninstallFilter](/guide/json-rpc-api.html#eth-uninstallfilter)   | Destroys a filter based on filter ID |

### web3_clientVersion
  <!-- content goes here -->

### web3_sha3
  <!-- content goes here -->

### net_listening
  <!-- content goes here -->

### net_peerCount
 <!-- content goes here -->

### net_version
 <!-- content goes here -->

### eth_accounts
 <!-- content goes here -->

### eth_blockNumber
 <!-- content goes here -->

### eth_call
 <!-- content goes here -->

### eth_coinbase
 <!-- content goes here -->

### eth_estimateGas
 <!-- content goes here -->

### eth_gasPrice
 <!-- content goes here -->

### eth_getBalance
 <!-- content goes here -->

### eth_getBlockByHash
 <!-- content goes here -->

### eth_getBlockByNumber
 <!-- content goes here -->

### eth_getBlockTransactionCountByHash
 <!-- content goes here -->

### eth_getBlockTransactionCountByNumber
 <!-- content goes here -->

### eth_getCode
 <!-- content goes here -->

### eth_getFilterChanges
 <!-- content goes here -->

### eth_getFilterLogs
 <!-- content goes here -->

### eth_getLogs
 <!-- content goes here -->

### eth_getStorageAt
 <!-- content goes here -->

### eth_getTransactionByBlockHashAndIndex
 <!-- content goes here -->

### eth_getTransactionByBlockNumberAndIndex
 <!-- content goes here -->

### eth_getTransactionByHash
 <!-- content goes here -->

### eth_getTransactionCount
 <!-- content goes here -->

### eth_getTransactionReceipt
 <!-- content goes here -->

### eth_getUncleByBlockHashAndIndex
 <!-- content goes here -->

### eth_getUncleByBlockNumberAndIndex
 <!-- content goes here -->

### eth_getUncleCountByBlockHash
 <!-- content goes here -->

### eth_getUncleCountByBlockNumber
 <!-- content goes here -->

### eth_getWork
 <!-- content goes here -->

### eth_hashrate
 <!-- content goes here -->

### eth_mining
 <!-- content goes here -->

### eth_newBlockFilter
 <!-- content goes here -->

### eth_newFilter
 <!-- content goes here -->

### eth_newPendingTransactionFilter
 <!-- content goes here -->

### eth_protocolVersion
 <!-- content goes here -->

### eth_sendRawTransaction
 <!-- content goes here -->

### eth_sendTransaction
 <!-- content goes here -->

### eth_sign
 <!-- content goes here -->

### eth_signTransaction
 <!-- content goes here -->

### eth_signTypedData
 <!-- content goes here -->

### eth_submitHashrate
 <!-- content goes here -->

### eth_submitWork
 <!-- content goes here -->

### eth_syncing
 <!-- content goes here -->

### eth_uninstallFilter
 <!-- content goes here -->