---
sidebar_label: Android
sidebar_position: 2
toc_max_heading_level: 4
---

# Use MetaMask SDK with Android

Import [MetaMask SDK](../../../../concepts/sdk/index.md) into your native Android dapp to enable
your users to easily connect with their MetaMask Mobile wallet.

:::tip Learn more
- See the [example Android dapp](https://github.com/MetaMask/metamask-android-sdk/tree/main/app) in
  the Android SDK GitHub repository for advanced use cases.
- See more information about the [Android SDK architecture](../../../../concepts/sdk/android.md).
:::

## Prerequisites

- MetaMask Mobile version 7.6.0 or above installed on your target device (that is, a physical
  device or emulator)

  :::note
  You can install MetaMask Mobile from [Google Play](https://play.google.com/store/apps/details?id=io.metamask),
  or clone and compile MetaMask Mobile from [source](https://github.com/MetaMask/metamask-mobile)
  and build to your target device.
  :::

- Android SDK version 23 or above

## Steps

### 1. Install the SDK

To add the SDK from Maven Central as a dependency to your project, in your `app/build.gradle` file,
add the following entry to the `dependencies` block:

```gradle title="build.gradle"
dependencies {
  implementation 'io.metamask.androidsdk:metamask-android-sdk:0.2.0'
}
```

Then, sync your project with the Gradle settings.
Once the syncing completes, you can set up the rest of your project.

### 2. Set up your project

#### 2.1. Set up Gradle

The SDK uses Hilt for Dagger dependency injection, so you must add the corresponding dependencies to
your Gradle files.

Add the following to your project's root `build.gradle` file:

```gradle title="build.gradle"
buildscript {
    // other setup here
    ext {
        hilt_version = '2.43.2'
    }
    dependencies {
        classpath "com.google.dagger:hilt-android-gradle-plugin:$hilt_version"
    }
}
plugins {
    // other setup here
    id 'com.google.dagger.hilt.android' version "$hilt_version" apply false
}
```

Add the following to your `app/build.gradle` file:

```gradle title="app/build.gradle"
plugins {
    id 'kotlin-kapt'
    id 'dagger.hilt.android.plugin'
}

dependencies {
    // dagger-hilt
    implementation "com.google.dagger:hilt-android:$hilt_version"
    kapt "com.google.dagger:hilt-compiler:$hilt_version"

    // viewmodel-related
    implementation 'androidx.lifecycle:lifecycle-viewmodel-compose:2.6.1'
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.6.1'
}
```

#### 2.2. Set up an application class

If you don't have an application class, you must create one:

```kotlin title="MetaMaskDappApplication.kt"
import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class DappApplication : Application() {}
```

In the `AndroidManifest.xml` file, update `android:name` to this application class:

```xml title="AndroidManifest.xml"
<manifest>
    <application
        android:name=".DappApplication"
        ...
    </application>
</manifest>
```

#### 2.3. Add @AndroidEntryPoint

If you need to inject your dependencies in an activity, you must add `@AndroidEntryPoint` to your
activity class.
However, if you need to inject your dependencies in a fragment, you must add `@AndroidEntryPoint` to
both the fragment and the activity that hosts the fragment.

```kotlin title="MainActivity.kt"
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
   // ...
}
```

```kotlin title="LoginFragment.kt"
@AndroidEntryPoint
class LoginFragment : Fragment() {
   // ...
}
```

:::note
Refer to the [example dapp](https://github.com/MetaMask/metamask-android-sdk/tree/main/app) for more
details on how to set up a Jetpack Compose project to work with the SDK.
:::

### 3. Import the SDK

Import the SDK by adding the following line to the top of your project file:

```kotlin
import io.metamask.androidsdk.Ethereum
```

### 4. Connect your dapp

You can connect your dapp to MetaMask in one of two ways:

1. [Use the `ethereum` provider object directly](#41-use-the-provider-object-directly).
    We recommend using this method in a pure model layer.
2. [Use a ViewModel](#42-use-a-viewmodel) that injects the `ethereum` provider object.
    We recommend using this method at the app level, because it provides a single instance that
    survives configuration changes and can be shared across all views.

#### 4.1. Use the provider object directly

Use the `ethereum` provider object directly to connect your dapp to MetaMask by adding the following
code to your project file:

```kotlin
@AndroidEntryPoint
class SomeModel(private val repository: ApplicationRepository) {
    val ethereum = Ethereum(repository)
    
    val dapp = Dapp("Droid Dapp", "https://droiddapp.com")

    // This is the same as calling eth_requestAccounts
    ethereum.connect(dapp) { result ->
        if (result is RequestError) {
            Log.e(TAG, "Ethereum connection error: ${result.message}")
        } else {
            Log.d(TAG, "Ethereum connection result: $result")
        }
    }
}
```

#### 4.2. Use a ViewModel

To connect your dapp to MetaMask using a ViewModel, create a ViewModel that injects the
`ethereum` provider object, then add wrapper functions for each Ethereum method you wish to call.

:::note info
Hilt enables you to maintain the state of your ViewModel across configuration changes.
:::

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

  // Wrapper function to connect the dapp
  fun connect(dapp: Dapp, callback: ((Any?) -> Unit)?) {
    ethereum.connect(dapp, callback)
  }
  
  // Wrapper function call all RPC methods
  fun sendRequest(request: EthereumRequest, callback: ((Any?) -> Unit)?) {
    ethereum.sendRequest(request, callback)
  }
}
```

To use the ViewModel, add the following code to your project file:

```kotlin
val ethereumViewModel: EthereumViewModel by viewModels()

val dapp = Dapp("Droid Dapp", "https://droiddapp.com")

// This is the same as calling eth_requestAccounts
ethereum.connect(dapp) { result ->
    if (result is RequestError) {
        Log.e(TAG, "Ethereum connection error: ${result.message}")
    } else {
        Log.d(TAG, "Ethereum connection result: $result")
    }
}
```

See the example dapp's
[`EthereumViewModel.kt`](https://github.com/MetaMask/metamask-android-sdk/blob/main/app/src/main/java/com/metamask/dapp/EthereumViewModel.kt)
file for more information.

By default, MetaMask logs three SDK events: `connection_request`, `connected`, and `disconnected`.
This allows MetaMask to monitor any SDK connection issues.
To disable this, set `ethereum.enableDebug = false`.

### 5. Call methods

You can now call any [JSON-RPC API method](/wallet/reference/eth_subscribe) using
`ethereum.sendRequest()`.

#### Example: Get account balance

The following example gets the user's account balance by calling
[`eth_getBalance`](/wallet/reference/eth_getBalance).

```kotlin
var balance: String? = null

// Create parameters
val params: List<String> = listOf(
    ethereum.selectedAddress,
    "latest" // "latest", "earliest" or "pending" (optional)
    )

// Create request
let getBalanceRequest = EthereumRequest(
    EthereumMethod.ETHGETBALANCE.value,
    params)

// Make request
ethereum.sendRequest(getBalanceRequest) { result ->
    if (result is RequestError) {
        // handle error
    } else {
        balance = result
    }
}
```

#### Example: Sign message

The following example requests the user sign a message by calling
[`eth_signTypedData_v4`](/wallet/reference/eth_signTypedData_v4).

```kotlin
val message = "{\"domain\":{\"chainId\":\"${ethereum.chainId}\",\"name\":\"Ether Mail\",\"verifyingContract\":\"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC\",\"version\":\"1\"},\"message\":{\"contents\":\"Hello, Busa!\",\"from\":{\"name\":\"Kinno\",\"wallets\":[\"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826\",\"0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF\"]},\"to\":[{\"name\":\"Busa\",\"wallets\":[\"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB\",\"0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57\",\"0xB0B0b0b0b0b0B000000000000000000000000000\"]}]},\"primaryType\":\"Mail\",\"types\":{\"EIP712Domain\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"version\",\"type\":\"string\"},{\"name\":\"chainId\",\"type\":\"uint256\"},{\"name\":\"verifyingContract\",\"type\":\"address\"}],\"Group\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"members\",\"type\":\"Person[]\"}],\"Mail\":[{\"name\":\"from\",\"type\":\"Person\"},{\"name\":\"to\",\"type\":\"Person[]\"},{\"name\":\"contents\",\"type\":\"string\"}],\"Person\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"wallets\",\"type\":\"address[]\"}]}}"

val from = ethereum.selectedAddress
val params: List<String> = listOf(from, message)

val signRequest = EthereumRequest(
    EthereumMethod.ETH_SIGN_TYPED_DATA_V4.value,
    params
)

ethereum.sendRequest(signRequest) { result ->
    if (result is RequestError) {
        Log.e(TAG, "Ethereum sign error: ${result.message}")
    } else {
        Log.d(TAG, "Ethereum sign result: $result")
    }
}
```

#### Example: Send transaction

The following example sends a transaction by calling
[`eth_sendTransaction`](/wallet/reference/eth_sendTransaction).

```kotlin
// Create parameters
val from = ethereum.selectedAddress
val to = "0x0000000000000000000000000000000000000000"
val amount = "0x01"
val params: Map<String, Any> = mapOf(
    "from" to from,
    "to" to to,
    "amount" to amount
)

// Create request
val transactionRequest = EthereumRequest(
    EthereumMethod.ETH_SEND_TRANSACTION.value,
    listOf(params)
)

// Make a transaction request
ethereum.sendRequest(transactionRequest) { result ->
    if (result is RequestError) {
        // handle error
    } else {
        Log.d(TAG, "Ethereum transaction result: $result")
    }
}
```

#### Example: Switch chain

The following example switches to a new Ethereum chain by calling
[`wallet_switchEthereumChain`](/wallet/reference/wallet_switchethereumchain) and
[`wallet_addEthereumChain`](/wallet/reference/wallet_addethereumchain).

```kotlin
fun switchChain(
    chainId: String,
    onSuccess: (message: String) -> Unit,
    onError: (message: String, action: (() -> Unit)?) -> Unit
) {
    val switchChainParams: Map<String, String> = mapOf("chainId" to chainId)
    val switchChainRequest = EthereumRequest(
        method = EthereumMethod.SWITCH_ETHEREUM_CHAIN.value,
        params = listOf(switchChainParams)
    )

    ethereum.sendRequest(switchChainRequest) { result ->
        if (result is RequestError) {
            if (result.code == ErrorType.UNRECOGNIZED_CHAIN_ID.code || result.code == ErrorType.SERVER_ERROR.code) {
                val message = "${Network.chainNameFor(chainId)} ($chainId) has not been added to your MetaMask wallet. Add chain?"

                val action: () -> Unit = {
                    addEthereumChain(
                        chainId,
                        onSuccess = { result ->
                            onSuccess(result)
                        },
                        onError = { error ->
                            onError(error, null)
                        }
                    )
                }
                onError(message, action)
            } else {
                onError("Switch chain error: ${result.message}", null)
            }
        } else {
            onSuccess("Successfully switched to ${Network.chainNameFor(chainId)} ($chainId)")
        }
    }
}

private fun addEthereumChain(
    chainId: String,
    onSuccess: (message: String) -> Unit,
    onError: (message: String) -> Unit
) {
    Logger.log("Adding chainId: $chainId")

    val addChainParams: Map<String, Any> = mapOf(
        "chainId" to chainId,
        "chainName" to Network.chainNameFor(chainId),
        "rpcUrls" to Network.rpcUrls(Network.fromChainId(chainId))
    )
    val addChainRequest = EthereumRequest(
        method = EthereumMethod.ADD_ETHEREUM_CHAIN.value,
        params = listOf(addChainParams)
    )

    ethereum.sendRequest(addChainRequest) { result ->
        if (result is RequestError) {
            onError("Add chain error: ${result.message}")
        } else {
            if (chainId == ethereum.chainId) {
                onSuccess("Successfully switched to ${Network.chainNameFor(chainId)} ($chainId)")
            } else {
                onSuccess("Successfully added ${Network.chainNameFor(chainId)} ($chainId)")
            }
        }
    }
}
```
