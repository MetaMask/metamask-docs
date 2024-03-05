# Class: MethodNotSupportedError

Error thrown when a keyring JSON-RPC method is not supported.

## Extends

- `Error`

## Constructors

### new MethodNotSupportedError(method)

```ts
new MethodNotSupportedError(method): MethodNotSupportedError
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `method` | `string` |

#### Overrides

Error.constructor

#### Source

[external/keyring-api/src/keyring-rpc-dispatcher.ts:28](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-rpc-dispatcher.ts#L28)

## Properties

### message

```ts
message: string;
```

#### Inherited from

Error.message

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1054

***

### name

```ts
name: string;
```

#### Inherited from

Error.name

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1053

***

### stack

```ts
stack?: string;
```

#### Inherited from

Error.stack

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1055

***

### prepareStackTrace

```ts
static prepareStackTrace?: (err, stackTraces) => any;
```

Optional override for formatting stack traces

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

#### Returns

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

Error.prepareStackTrace

#### Source

external/keyring-api/node\_modules/@types/node/globals.d.ts:11

***

### stackTraceLimit

```ts
static stackTraceLimit: number;
```

#### Inherited from

Error.stackTraceLimit

#### Source

external/keyring-api/node\_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace()

```ts
static captureStackTrace(targetObject, constructorOpt?): void
```

Create .stack property on a target object

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt`? | `Function` |

#### Inherited from

Error.captureStackTrace

#### Source

external/keyring-api/node\_modules/@types/node/globals.d.ts:4
