---
description: See the Snaps known errors reference
sidebar_position: 6
---

# Snaps known errors

Snaps can [communicate the following errors](../how-to/communicate-errors.md) without crashing the Snap:

| Error                      | What the error indicates                                    | Error code |
| -------------------------- | ----------------------------------------------------------- | :--------: |
| `ChainDisconnectedError`   | The provider is disconnected from the requested chain.      |   `4901`   |
| `DisconnectedError`        | The provider is disconnected.                               |   `4900`   |
| `InternalError`            | An internal error has occurred.                             |  `-32603`  |
| `InvalidInputError`        | The input to a method is invalid.                           |  `-32000`  |
| `InvalidParamsError`       | The parameters to a method are invalid.                     |  `-32602`  |
| `InvalidRequestError`      | The request is invalid.                                     |  `-32600`  |
| `LimitExceededError`       | A limit has been exceeded.                                  |  `-32005`  |
| `MethodNotFoundError`      | A method does not exist.                                    |  `-32601`  |
| `MethodNotSupportedError`  | A method is not supported.                                  |  `-32004`  |
| `ParseError`               | A request is not valid JSON.                                |  `-32700`  |
| `ResourceNotFoundError`    | A resource does not exist.                                  |  `-32001`  |
| `ResourceUnavailableError` | A resource is unavailable.                                  |  `-32002`  |
| `TransactionRejected`      | A transaction has been rejected.                            |  `-32003`  |
| `UnauthorizedError`        | The requested method/account is not authorized by the user. |   `4100`   |
| `UnsupportedMethodError`   | The requested method is not supported by the provider.      |   `4200`   |
| `UserRejectedRequestError` | The user has rejected the request.                          |   `4001`   |
