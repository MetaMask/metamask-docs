---
title: Native iOS
---

# Use MetaMask SDK with iOS

You can import MetaMask SDK into your native iOS dapp to enable your users to easily connect
with their MetaMask Mobile wallet.

## Prerequisites

An iOS project set up with iOS version 14+.

## Steps

### 1. Install the SDK

To add the SDK as a Swift Package Manager (SPM) package to your project, in Xcode, select
**File > Swift Packages > Add Package Dependency**.
Enter the URL of the MetaMask iOS SDK repository: `https://github.com/MetaMask/metamask-ios-sdk`.

Alternatively, you can add the URL directly in your project's package file:

```swift
dependencies: [
    .package(
        url: "https://github.com/MetaMask/metamask-ios-sdk",
        from: "0.1.0"
    )
]
```

:::note
The SDK supports `ios-arm64` (iOS devices) and `ios-arm64-simulator` (M1 chip simulators).
It currently doesn't support `ios-ax86_64-simulator` (Intel chip simulators).
:::

### 2. Import the SDK

Import the SDK by adding the following line to the top of your project file:

```
import metamask_ios_sdk
```

### 3. Connect your dapp

Connect your dapp by adding the following code to your project file:

```swift
@ObservedObject var ethereum = MetaMaskSDK.shared.ethereum

let dapp = Dapp(name: "Dub Dapp", url: "https://dubdapp.com")

// This is the same as calling eth_requestAccounts
ethereum.connect(dapp)
```

By default, MetaMask logs three SDK events: `connectionRequest`, `connected`, and `disconnected`.
This allows MetaMask to monitor any SDK connection issues.
To disable this, set `MetaMaskSDK.shared.enableDebug = false` or `ethereum.enableDebug = false`.

### 4. Call provider methods

You can now call any [provider API method](../../reference/provider-api.md).

The SDK uses [Combine](https://developer.apple.com/documentation/combine) to publish Ethereum
events, so you need to define an `AnyCancellable` storage by adding the following line to your
project file:

```swift
@State private var cancellables: Set<AnyCancellable> = []
```

The following examples use the
[`window.ethereum.request(args)`](../../reference/provider-api.md#windowethereumrequestargs)
provider API method to call various [RPC API](../../reference/rpc-api.md) methods.

#### Example: Get chain ID

The following example gets the user's chain ID by calling
[`eth_chainId`](https://metamask.github.io/api-playground/api-documentation/#eth_chainId).

```swift
@State var chainId: String?

let chainIdRequest = EthereumRequest(method: .ethChainId)

ethereum.request(chainIdRequest)?.sink(receiveCompletion: { completion in
    switch completion {
    case .failure(let error):
        print("\(error.localizedDescription)")
    default: break
    }
}, receiveValue: { result in
    self.chainId = result
})
.store(in: &cancellables)
```

#### Example: Get account balance

The following example gets the user's account balance by calling
[`eth_getBalance`](https://metamask.github.io/api-playground/api-documentation/#eth_getBalance).

```swift
@State var balance: String?

// Create parameters
let parameters: [String] = [
    ethereum.selectedAddress, // address to check for balance
    "latest" // "latest", "earliest" or "pending" (optional)
  ]

// Create request
let getBalanceRequest = EthereumRequest(
    method: .ethGetBalance,
    params: parameters)

// Make request
ethereum.request(getBalanceRequest)?.sink(receiveCompletion: { completion in
    switch completion {
    case .failure(let error):
        print("\(error.localizedDescription)")
    default: break
    }
}, receiveValue: { result in
    self.balance = result
})
.store(in: &cancellables)
```

#### Example: Send transaction

The following examples send a transaction by calling
[`eth_sendTransaction`](https://metamask.github.io/api-playground/api-documentation/#eth_sendTransaction).

<!--tabs-->

# Use a dictionary

If your request parameters make up a simple dictionary of string key-value pairs, you can use the
dictionary directly.
Note that `Any` or even `AnyHashable` types aren't supported, since the type must be explicitly known.

```swift
// Create parameters
let parameters: [String: String] = [
    "to": "0x...", // receiver address
    "from": ethereum.selectedAddress, // sender address
    "value": "0x..." // amount
  ]

// Create request
let transactionRequest = EthereumRequest(
    method: .ethSendTransaction,
    params: [parameters] // eth_sendTransaction expects an array parameters object
    )

// Make a transaction request
ethereum.request(transactionRequest)?.sink(receiveCompletion: { completion in
    switch completion {
    case .failure(let error):
        print("\(error.localizedDescription)")
    default: break
    }
}, receiveValue: { result in
    print(result)
})
.store(in: &cancellables)
```

# Use a struct

For more complex parameter representations, define and use a struct that conforms to `CodableData`,
that is, implements the following requirement:

```
func socketRepresentation() -> NetworkData
```

The type can then be represented as a socket packet.

```swift
struct Transaction: CodableData {
    let to: String
    let from: String
    let value: String
    let data: String?

    init(to: String, from: String, value: String, data: String? = nil) {
        self.to = to
        self.from = from
        self.value = value
        self.data = data
    }

    func socketRepresentation() -> NetworkData {
        [
            "to": to,
            "from": from,
            "value": value,
            "data": data
        ]
    }
}

// Create parameters
let transaction = Transaction(
    to: "0x...", // receiver address
    from: ethereum.selectedAddress, // sender address
    value: "0x..." // amount
)

// Create request
let transactionRequest = EthereumRequest(
    method: .ethSendTransaction,
    params: [transaction] // eth_sendTransaction expects an array parameters object
    )

// Make a transaction request
ethereum.request(transactionRequest)?.sink(receiveCompletion: { completion in
    switch completion {
    case .failure(let error):
        print("\(error.localizedDescription)")
    default: break
    }
}, receiveValue: { result in
    print(result)
})
.store(in: &cancellables)
```

<!--/tabs-->
