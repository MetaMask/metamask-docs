---
description: See the Snaps known errors reference
sidebar_position: 7
---

# Snaps known errors

## `InternalError`

### Description
This can be thrown by a Snap to indicate that an internal error occurred,
without crashing the Snap.

### Error code
The code returned with this error is `-32603`.

## `InvalidInputError`

### Description
This can be thrown by a Snap to indicate that the input to a method is
invalid, without crashing the Snap.

### Error code
The code returned with this error is `-32000`.

## `InvalidParamsError`

### Description
This can be thrown by a Snap to indicate that the parameters to a method are
invalid, without crashing the Snap.

### Error code
The code returned with this error is `-32602`.

## `InvalidRequestError`

### Description
This can be thrown by a Snap to indicate that the request is invalid, without
crashing the Snap.

### Error code
The code returned with this error is `-32600`.

## `LimitExceededError`

### Description
This can be thrown by a Snap to indicate that a limit has been exceeded,
without crashing the Snap.

### Error code
The code returned with this error is `-32005`.

## `MethodNotFoundError`

### Description
This can be thrown by a Snap to indicate that a method does not exist,
without crashing the Snap.

### Error code
The code returned with this error is `-32601`.

## `MethodNotSupportedError`

### Description
This can be thrown by a Snap to indicate that a method is not supported,
without crashing the Snap.

### Error code
The code returned with this error is `-32004`.

## `ParseError`

### Description
This can be thrown by a Snap to indicate that a request is not valid JSON,
without crashing the Snap.

### Error code
The code returned with this error is `-32700`.

## `ResourceNotFoundError`

### Description
This can be thrown by a Snap to indicate that a resource does not exist,
without crashing the Snap.

### Error code
The code returned with this error is `-32001`.

## `ResourceUnavailableError`

### Description
This can be thrown by a Snap to indicate that a resource is unavailable,
without crashing the Snap.

### Error code
The code returned with this error is `-32002`.

## `TransactionRejected`

### Description
This can be thrown by a Snap to indicate that a transaction was rejected,
without crashing the Snap.

### Error code
The code returned with this error is `-32003`.

## `ChainDisconnectedError`

### Description
This can be thrown by a Snap to indicate that the provider is disconnected
from the requested chain, without crashing the Snap.

### Error code
The code returned with this error is `4901`.

## `DisconnectedError`

### Description
This can be thrown by a Snap to indicate that the provider is disconnected,
without crashing the Snap.

### Error code
The code returned with this error is `4900`.

## `UnauthorizedError`

### Description
This can be thrown by a Snap to indicate that the requested method / account
is not authorized by the user, without crashing the Snap.

### Error code
The code returned with this error is `4100`.

## `UnsupportedMethodError`

### Description
This can be thrown by a Snap to indicate that the requested method is not
supported by the provider, without crashing the Snap.

### Error code
The code returned with this error is `4200`.

## `UserRejectedRequestError`

### Description
This can be thrown by a Snap to indicate that the user rejected the request,
without crashing the Snap.

### Error code
The code returned with this error is `4001`.