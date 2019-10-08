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