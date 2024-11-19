---
toc_max_heading_level: 4
description: Set up the SDK in your Android dapp.
tags:
  - Android SDK
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Use MetaMask SDK with Android

Import MetaMask SDK into your native Android dapp to enable
your users to easily connect with their MetaMask Mobile wallet.

:::tip See also
- [Android SDK architecture](../../../concepts/android-sdk.md)
:::

## Prerequisites

- MetaMask Mobile version 7.6.0 or later installed on your target device (that is, a physical
  device or emulator).
  You can install MetaMask Mobile from [Google Play](https://play.google.com/store/apps/details?id=io.metamask),
  or clone and compile MetaMask Mobile from [source](https://github.com/MetaMask/metamask-mobile)
  and build to your target device.

- Android SDK version 23 or later.

## Steps

### 1. Install the SDK

To add the SDK from Maven Central as a dependency to your project, in your `app/build.gradle` file,
add the following entry to the `dependencies` block:

```gradle title="build.gradle"
dependencies {
  implementation "io.metamask.androidsdk:metamask-android-sdk"
}
```

Then, sync your project with the Gradle settings.
Once the syncing completes, you can set up the rest of your project.

### 2. Import the SDK

Import the SDK by adding the following line to the top of your project file:

```kotlin
import io.metamask.androidsdk.Ethereum
```

### 3. Connect your dapp

The SDK supports callbacks using the `Ethereum` provider object, and coroutines using the
`EthereumFlow` provider object.
You can connect your dapp to MetaMask in one of two ways:

1. [Use the `Ethereum` or `EthereumFlow` provider object directly](#31-use-the-provider-object-directly).
   We recommend using this method in a pure model layer.
2. [Use a ViewModel](#32-use-a-viewmodel) that injects the `Ethereum` or `EthereumFlow` provider object.
   We recommend using this method at the app level, because it provides a single instance that
   survives configuration changes and can be shared across all views.

:::note Logging
By default, MetaMask logs three SDK events: `connection_request`, `connected`, and `disconnected`.
This allows MetaMask to monitor any SDK connection issues.
To disable this, set `ethereum.enableDebug = false`.
:::

#### 3.1. Use the provider object directly

Use the `Ethereum` provider object (for callbacks) or the `EthereumFlow` provider object (for
coroutines) to connect your dapp to MetaMask.
Add the following code to your project file:

<Tabs>
<TabItem value="Callbacks">

```kotlin
@AndroidEntryPoint
class SomeModel(context: Context) {

  val dappMetadata = DappMetadata("Droid Dapp", "https://www.droiddapp.io")

  // To use the Infura API to make read-only requests, specify your Infura API key using the
  // infuraAPIKey option in SDKOptions.
  val infuraAPIKey = "1234567890"

  // To use your own node (for example, with Hardhat) to make read-only requests, specify your
  // node's chain ID and RPC URL using the readonlyRPCMap option in SDKOptions.
  val readonlyRPCMap = mapOf("0x1" to "hptts://www.testrpc.com")

  // Use callbacks.
  val ethereum = Ethereum(context, dappMetadata, SDKOptions(infuraAPIKey, readonlyRPCMap))

  // This is the same as calling eth_requestAccounts.
  ethereum.connect() { result ->
    when (result) {
      is Result.Error -> {
        Logger.log("Ethereum connection error: ${result.error.message}")
      }
      is Result.Success.Item -> {
        Logger.log("Ethereum connection result: ${result.value}")
      }
    }
  }
}
```

</TabItem>
<TabItem value="Coroutines">

```kotlin
@AndroidEntryPoint
class SomeModel(context: Context) {

  val dappMetadata = DappMetadata("Droid Dapp", "https://www.droiddapp.io")

  // To use the Infura API to make read-only requests, specify your Infura API key using the
  // infuraAPIKey option in SDKOptions.
  val infuraAPIKey = "1234567890"

  // To use your own node (for example, with Hardhat) to make read-only requests, specify your
  // node's chain ID and RPC URL using the readonlyRPCMap option in SDKOptions.
  val readonlyRPCMap = mapOf("0x1" to "hptts://www.testrpc.com")

  // Use coroutines.
  val coroutineScope = rememberCoroutineScope()

  // This is the same as calling eth_requestAccounts.
  coroutineScope.launch {
    when (val result = ethereum.connect()) {
      is Result.Error -> {
        Logger.log("Ethereum connection error: ${result.error.message}")
      }
      is Result.Success.Item -> {
        Logger.log("Ethereum connection result: ${result.value}")
      }
    }
  }
}
```

</TabItem>
</Tabs>

As an alternative to calling the `connect()` method, you can
[call convenience methods](#5-optional-call-convenience-methods) to connect to MetaMask and make a
request in a single RPC request.

#### 3.2. Use a ViewModel

To connect your dapp to MetaMask using a ViewModel, create a ViewModel that injects the
`Ethereum` provider object (for callbacks) or the `EthereumFlow` provider object (for coroutines).
Add wrapper functions for each Ethereum method you wish to call.

You can use a dependency manager such as [Hilt](https://developer.android.com/training/dependency-injection/hilt-android)
to initialize the ViewModel and maintain its state across configuration changes.
If you use Hilt, your setup might look like the following:

<Tabs>
<TabItem value="Callbacks">

```kotlin title="EthereumViewModel.kt"
@HiltViewModel
class EthereumViewModel @Inject constructor(
  private val ethereum: Ethereum
): ViewModel() {

  val ethereumState = MediatorLiveData<EthereumState>().apply {
    addSource(ethereum.ethereumState) { newEthereumState ->
      value = newEthereumState
    }
  }

  // Wrapper function to connect the dapp.
  fun connect(callback: ((Result) -> Unit)?) {
    ethereum.connect(callback)
  }

  // Wrapper function call all RPC methods.
  fun sendRequest(request: EthereumRequest, callback: ((Result) -> Unit)?) {
    ethereum.sendRequest(request, callback)
  }
}
```

</TabItem>
<TabItem value="Coroutines">

```kotlin title="EthereumFlowViewModel.kt"
@HiltViewModel
class EthereumFlowViewModel @Inject constructor(
  private val ethereum: EthereumFlowWrapper
): ViewModel() {

  val ethereumFlow: Flow<EthereumState> get() = ethereum.ethereumState
    
  // Wrapper function to connect the dapp.  
  suspend fun connect(): Result {
    return ethereum.connect()
  }

  // Wrapper function call all RPC methods.
  suspend fun sendRequest(request: EthereumRequest): Result {
    return ethereum.sendRequest(request)
  }
}
```

</TabItem>
</Tabs>

To use the ViewModel, add the following code to your project file:

```kotlin
val ethereumViewModel: EthereumFlowViewModel by viewModels()

// This is the same as calling eth_requestAccounts.
ethereumViewModel.connect()
```

As an alternative to calling the `connect()` method, you can
[call convenience methods](#5-optional-call-convenience-methods) to connect to MetaMask and make a
request in a single RPC request.

:::info
See the example dapp's
[`EthereumViewModel.kt`](https://github.com/MetaMask/metamask-android-sdk/blob/main/app/src/main/java/com/metamask/dapp/EthereumViewModel.kt)
and
[`EthereumFlowViewModel.kt`](https://github.com/MetaMask/metamask-android-sdk/blob/main/app/src/main/java/com/metamask/dapp/EthereumFlowViewModel.kt)
files for more information.
:::

### 4. Call methods

You can now call any [JSON-RPC API method](/wallet/reference/json-rpc-methods) using
`ethereum.sendRequest()`.
The SDK also provides [convenience methods](#5-optional-call-convenience-methods) for common RPC
requests so you don't have to manually construct requests.

The following examples use coroutines.

#### Example: Get account balance

The following example gets the user's account balance by calling
[`eth_getBalance`](/wallet/reference/json-rpc-methods/eth_getBalance).
This is a [read-only request](../../../how-to/make-read-only-requests.md), which uses the Infura API
if an `infuraAPIKey` is provided in the `SDKOptions`.
We recommend using the Infura API to provide a seamless user experience.

```kotlin
val balance = ethereum.getEthBalance(ethereum.selectedAddress, "latest")

when (balance) {
  is Result.Success.Item -> {
    Logger.log("Ethereum account balance: ${result.value}")
    balance = result.value
  }
  is Result.Error -> {
    Logger.log("Ethereum request balance error: ${result.error.message}")
  }
}
```

#### Example: Sign message

The following example requests the user sign a message by calling
[`eth_signTypedData_v4`](/wallet/reference/json-rpc-methods/eth_signTypedData_v4).

```kotlin
val message = "{\"domain\":{\"chainId\":\"${ethereum.chainId}\",\"name\":\"Ether Mail\",\"verifyingContract\":\"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC\",\"version\":\"1\"},\"message\":{\"contents\":\"Hello, Busa!\",\"from\":{\"name\":\"Kinno\",\"wallets\":[\"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826\",\"0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF\"]},\"to\":[{\"name\":\"Busa\",\"wallets\":[\"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB\",\"0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57\",\"0xB0B0b0b0b0b0B000000000000000000000000000\"]}]},\"primaryType\":\"Mail\",\"types\":{\"EIP712Domain\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"version\",\"type\":\"string\"},{\"name\":\"chainId\",\"type\":\"uint256\"},{\"name\":\"verifyingContract\",\"type\":\"address\"}],\"Group\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"members\",\"type\":\"Person[]\"}],\"Mail\":[{\"name\":\"from\",\"type\":\"Person\"},{\"name\":\"to\",\"type\":\"Person[]\"},{\"name\":\"contents\",\"type\":\"string\"}],\"Person\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"wallets\",\"type\":\"address[]\"}]}}"
val address = ethereum.selectedAddress

when (val result = ethereum.ethSignTypedDataV4(message, address)) {
  is Result.Error -> {
    Logger.log("Ethereum sign error: ${result.error.message}")
  }
  is Result.Success.Item -> {
    Logger.log("Ethereum sign result: ${result.value}")
  }
}
```

#### Example: Batch requests

The following example requests the user to sign multiple messages at once by
[batching multiple requests](../../../how-to/batch-json-rpc-requests.md) that call
[`personal_sign`](/wallet/reference/json-rpc-methods/personal_sign).

```kotlin
val ethereumRequest1 = EthereumRequest(
  method = EthereumMethod.PERSONAL_SIGN.value,
  params = listOf(address, "hello world")
)

val ethereumRequest2 = EthereumRequest(
  method = EthereumMethod.PERSONAL_SIGN.value,
  params = listOf(address, "second message")
)

when (val result = ethereum.sendRequestBatch(listOf(ethereumRequest1, ethereumRequest2))) {
  is Result.Error -> {
    Logger.log("Ethereum batch sign error: ${result.error.message}")
  }
  is Result.Success.Items -> {
    Logger.log("Ethereum batch sign result: ${result.value}")
  }
}
```

#### Example: Send transaction

The following example sends a transaction by calling
[`eth_sendTransaction`](/wallet/reference/json-rpc-methods/eth_sendTransaction).

```kotlin
val from = ethereum.selectedAddress
val to = "0x0000000000000000000000000000000000000000"
val value = "0x8ac7230489e80000"

when (val result = ethereum.sendTransaction(from, to, value)) {
  is Result.Success.Item -> {
    Logger.log("Ethereum transaction result: ${result.value}")
    balance = result.value
  }
  is Result.Error -> {
    // Handle error.
  }
}
```

#### Example: Switch chain

The following example switches to a new Ethereum chain by calling
[`wallet_switchEthereumChain`](/wallet/reference/json-rpc-methods/wallet_switchethereumchain).

```kotlin
when(val result = ethereum.switchEthereumChain(chainId)) {
  is Result.Success.Item -> {
    // Successfully switched to chainId.
  }
  is Result.Error -> {
    // Handle error.
  }
}
```

### 5. (Optional) Call convenience methods

The SDK provides the following convenience methods to simplify connecting to MetaMask and calling
common RPC methods.
These examples use coroutines.

#### Example: Connect and request

The following example uses the `connectWith` convenience method to connect to MetaMask and call
[`eth_sendTransaction`](/wallet/reference/json-rpc-methods/eth_sendTransaction) in one RPC request.

```kotlin
val params: Map<String, Any> = mutableMapOf(
  "from" to "", // This will be populated with the selected address once connected.
  "to" to "0x0000000000000000000000000000000000000000",
  "value" to "0x8ac7230489e80000"
)

val sendTransactionRequest = EthereumRequest(
  method = EthereumMethod.ETH_SEND_TRANSACTION.value,
  params = listOf(params)
)

when (val result = ethereum.connectWith(sendTransactionRequest)) {
  is Result.Error -> {
    // Handle error.
  }
  is Result.Success.Item -> {
    // Transaction hash ${result.value}
  }
}
```

#### Example: Connect and sign

The following example uses the `connectSign` convenience method to connect to MetaMask and call
[`personal_sign`](/wallet/reference/json-rpc-methods/personal_sign) in one RPC request.
You do not need to construct the `personal_sign` request, you only need to provide the message to sign.

```kotlin
val message = "This is the message to sign."

when (val result = ethereum.connectSign(message)) {
  is Result.Error -> {
    Logger.log("Ethereum connectSign error: ${result.error.message}")
  }
  is Result.Success.Item -> {
    Logger.log("Ethereum connectSign result: ${result.value}")
  }
}
```

## Example

See the [example Android dapp](https://github.com/MetaMask/metamask-android-sdk/tree/main/app) in
the Android SDK GitHub repository for more information.
