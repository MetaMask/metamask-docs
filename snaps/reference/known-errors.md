---
description: See the Snaps known errors reference
---

# Snaps known errors

Snaps can [communicate the following errors](../how-to/communicate-errors.md) without crashing the Snap:

| Error                      | Description                                                                | Error code |
|----------------------------|----------------------------------------------------------------------------|:----------:|
| `ChainDisconnectedError`   | Indicates that the provider is disconnected from the requested chain.      |   `4901`   |
| `DisconnectedError`        | Indicates that the provider is disconnected.                               |   `4900`   |
| `InternalError`            | Indicates that an internal error has occurred.                             |  `-32603`  |
| `InvalidInputError`        | Indicates that the input to a method is invalid.                           |  `-32000`  |
| `InvalidParamsError`       | Indicates that the parameters to a method are invalid.                     |  `-32602`  |
| `InvalidRequestError`      | Indicates that the request is invalid.                                     |  `-32600`  |
| `LimitExceededError`       | Indicates that a limit has been exceeded.                                  |  `-32005`  |
| `MethodNotFoundError`      | Indicates that a method does not exist.                                    |  `-32601`  |
| `MethodNotSupportedError`  | Indicates that a method is not supported.                                  |  `-32004`  |
| `ParseError`               | Indicates that a request is not valid JSON.                                |  `-32700`  |
| `ResourceNotFoundError`    | Indicates that a resource does not exist.                                  |  `-32001`  |
| `ResourceUnavailableError` | Indicates that a resource is unavailable.                                  |  `-32002`  |
| `TransactionRejected`      | Indicates that a transaction has been rejected.                            |  `-32003`  |
| `UnauthorizedError`        | Indicates that the requested method/account is not authorized by the user. |   `4100`   |
| `UnsupportedMethodError`   | Indicates that the requested method is not supported by the provider.      |   `4200`   |
| `UserRejectedRequestError` | Indicates that the user has rejected the request.                          |   `4001`   |
