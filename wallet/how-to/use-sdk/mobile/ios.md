---
sidebar_label: iOS
sidebar_position: 1
toc_max_heading_level: 4
description: Set up the SDK in your iOS dapp.
tags:
  - iOS SDK
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Use MetaMask SDK with iOS

Import [MetaMask SDK](../../../concepts/sdk/index.md) into your native iOS dapp to enable your
users to easily connect with their MetaMask Mobile wallet.

## Prerequisites

- MetaMask Mobile version 7.6.0 or later installed on your target device (that is, a physical device
  or emulator).
  You can install MetaMask Mobile from the [App Store](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202)
  or clone and compile MetaMask Mobile from [source](https://github.com/MetaMask/metamask-mobile)
  and build to your target device.

- iOS version 14 or later.
  The SDK supports `ios-arm64` (iOS devices) and `ios-arm64-simulator` (M1 chip simulators).
  It currently doesn't support `ios-ax86_64-simulator` (Intel chip simulators).

## Steps

### 1. Install the SDK

<Tabs>
<TabItem value="CocoaPods">

To add the SDK as a CocoaPods dependency to your project, add the following entry to our Podfile:

```text
pod 'metamask-ios-sdk'
```

Run the following command:

```bash
pod install
```

</TabItem>
<TabItem value="Swift Package Manager">

To add the SDK as a Swift Package Manager (SPM) package to your project, in Xcode, select
**File > Swift Packages > Add Package Dependency**.
Enter the URL of the MetaMask iOS SDK repository: `https://github.com/MetaMask/metamask-ios-sdk`.

Alternatively, you can add the URL directly in your project's package file:

```swift
dependencies: [
    .package(
        url: "https://github.com/MetaMask/metamask-ios-sdk",
        from: "0.3.0"
    )
]
```

</TabItem>
</Tabs>

### 2. Import the SDK

Import the SDK by adding the following line to the top of your project file:

```swift
import metamask_ios_sdk
```

### 3. Connect your dapp

Connect your dapp to MetaMask by adding the following code to your project file:

```swift
let appMetadata = AppMetadata(name: "Dub Dapp", url: "https://dubdapp.com")

@ObservedObject var metamaskSDK = MetaMaskSDK.shared(appMetadata)

metamaskSDK.connect()
```

By default, MetaMask logs three SDK events: `connectionRequest`, `connected`, and `disconnected`.
This allows MetaMask to monitor any SDK connection issues.
To disable this, set `MetaMaskSDK.shared.enableDebug = false` or `ethereum.enableDebug = false`.

### 4. Call methods

You can now call any [JSON-RPC API method](/wallet/reference/json-rpc-api) using `metamaskSDK.request()`.

#### Example: Get chain ID

The following example gets the user's chain ID by calling
[`eth_chainId`](/wallet/reference/eth_chainId).

```swift
let chainIdRequest = EthereumRequest(method: .ethChainId)
let chainId = await metamaskSDK.request(chainIdRequest)
```

#### Example: Get account balance

The following example gets the user's account balance by calling
[`eth_getBalance`](/wallet/reference/eth_getBalance).

```swift
// Create parameters
let account = metamaskSDK.account

let parameters: [String] = [
    // account to check for balance
    account,
    // "latest", "earliest" or "pending" (optional)
    "latest"
]

// Create request
let getBalanceRequest = EthereumRequest(
    method: .ethGetBalance,
    params: parameters
)

// Make request
let accountBalance = await metamaskSDK.request(getBalanceRequest)
```

#### Example: Send transaction

The following example sends a transaction by calling
[`eth_sendTransaction`](/wallet/reference/eth_sendTransaction).

<Tabs>
<TabItem value="Use a dictionary">

If your request parameters make up a simple dictionary of string key-value pairs, you can use the
dictionary directly.
Note that `Any` or even `AnyHashable` types aren't supported, since the type must be explicitly known.

```swift
// Create parameters
let account = metamaskSDK.account

let parameters: [String: String] = [
    // receiver address
    "to": "0x...",
    // sender address
    "from": account,
    // amount
    "value": "0x..."
]

// Create request
let transactionRequest = EthereumRequest(
    method: .ethSendTransaction,
    // eth_sendTransaction expects an array parameters object
    params: [parameters]
)

// Make a transaction request
let transactionResult = await metamaskSDK.request(transactionRequest)
```

</TabItem>
<TabItem value="Use a struct">

For more complex parameter representations, define and use a struct that conforms to `CodableData`,
that is, a struct that implements the following requirement:

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
let account = metamaskSDK.account

let transaction = Transaction(
    // receiver address
    to: "0x...",
    // sender address
    from: account,
    // amount
    value: "0x..."
)

// Create request
let transactionRequest = EthereumRequest(
    method: .ethSendTransaction,
    // eth_sendTransaction expects an array parameters object
    params: [transaction]
)

// Make a transaction request
let result = await metamaskSDK.request(transactionRequest)
```

</TabItem>
</Tabs>

## Example

See the [example iOS dapp](https://github.com/MetaMask/metamask-ios-sdk/tree/main/Example) in the
iOS SDK GitHub repository for more information.
