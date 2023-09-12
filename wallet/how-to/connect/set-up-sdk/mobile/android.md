---
sidebar_label: Android
sidebar_position: 2
toc_max_heading_level: 4
---

# Use MetaMask SDK with Android

You can import [MetaMask SDK](../../../../concepts/sdk.md) into your native Android dapp to enable
your users to easily connect with their MetaMask Mobile wallet.

:::tip
Refer to the [example Android dapp source code](https://github.com/MetaMask/metamask-android-sdk/tree/main/app)
for examples on how to use the SDK to make Ethereum requests.
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
  implementation 'io.metamask.androidsdk:metamask-android-sdk:0.1.1'
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

#### 2.2. Inject ViewModel dependencies

The SDK uses Hilt dependency injections, so you must create a module defining an Ethereum ViewModel injection.
This is a single instance that is shared across various view models and survives configuration changes:

```kotlin title="ViewModelModule.kt"
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import io.metamask.androidsdk.ApplicationRepository
import io.metamask.androidsdk.EthereumViewModel
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object EthereumViewModelModule {

    @Provides
    @Singleton
    fun provideEthereumViewModel(repository: ApplicationRepository): EthereumViewModel {
        return EthereumViewModel(repository)
    }
}
```

#### 2.3. Set up an application class

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

#### 2.4. Add @AndroidEntryPoint

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
import io.metamask.androidsdk.EthereumViewModel
```

### 4. Connect your dapp

Connect your dapp to MetaMask by adding the following code to your project file.
The Ethereum module requires the app context, so you must instantiate it from an activity or a
module that injects a context.

```kotlin title="MainActivity.kt"
// MainActivity

// Obtain EthereumViewModel using viewModels()
val ethereumViewModel: EthereumViewModel by viewModels()

val dapp = Dapp(name: "Droid Dapp", url: "https://droiddapp.com")

// This is the same as calling "eth_requestAccounts"
ethereumViewModel.connect(dapp) { result ->
    if (result is RequestError) {
        Log.e(TAG, "Ethereum connection error: ${result.message}")
    } else {
        Logger.d(TAG, "Ethereum connection result: $result")
    }
}
```

By default, MetaMask logs three SDK events: `connectionRequest`, `connected`, and `disconnected`.
This allows MetaMask to monitor any SDK connection issues.
To disable this, set `ethereumViewModel.enableDebug = false`.

### 5. Call provider methods

You can now call any [provider API method](../../../../reference/provider-api.md).

The following examples use the
[`window.ethereum.request(args)`](../../../../reference/provider-api.md#windowethereumrequestargs)
provider API method to call various [RPC API](../../../../concepts/apis.md#json-rpc-api) methods.

#### Example: Get chain ID

The following example gets the user's chain ID by calling
[`eth_chainId`](/wallet/reference/eth_chainId).

```kotlin
var chainId: String? = null

val chainIdRequest = EthereumRequest(EthereumMethod.ETH_CHAIN_ID.value) // or EthereumRequest("eth_chainId")

ethereumViewModel.sendRequest(chainIdRequest) { result ->
    if (result is RequestError) {
        // handle error
    } else {
        chainId = result
    }
}
```

#### Example: Get account balance

The following example gets the user's account balance by calling
[`eth_getBalance`](/wallet/reference/eth_getBalance).

```kotlin
var balance: String? = null

// Create parameters
val params: List<String> = listOf(
    ethereumViewModel.selectedAddress,
    "latest" // "latest", "earliest" or "pending" (optional)
    )

// Create request
let getBalanceRequest = EthereumRequest(
    EthereumMethod.ETHGETBALANCE.value,
    params)

// Make request
ethereumViewModel.sendRequest(getBalanceRequest) { result ->
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
val message = "{\"domain\":{\"chainId\":\"${ethereumViewModel.chainId}\",\"name\":\"Ether Mail\",\"verifyingContract\":\"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC\",\"version\":\"1\"},\"message\":{\"contents\":\"Hello, Busa!\",\"from\":{\"name\":\"Kinno\",\"wallets\":[\"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826\",\"0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF\"]},\"to\":[{\"name\":\"Busa\",\"wallets\":[\"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB\",\"0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57\",\"0xB0B0b0b0b0b0B000000000000000000000000000\"]}]},\"primaryType\":\"Mail\",\"types\":{\"EIP712Domain\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"version\",\"type\":\"string\"},{\"name\":\"chainId\",\"type\":\"uint256\"},{\"name\":\"verifyingContract\",\"type\":\"address\"}],\"Group\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"members\",\"type\":\"Person[]\"}],\"Mail\":[{\"name\":\"from\",\"type\":\"Person\"},{\"name\":\"to\",\"type\":\"Person[]\"},{\"name\":\"contents\",\"type\":\"string\"}],\"Person\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"wallets\",\"type\":\"address[]\"}]}}"

val from = ethereumViewModel.selectedAddress
val params: List<String> = listOf(from, message)

val signRequest = EthereumRequest(
    EthereumMethod.ETH_SIGN_TYPED_DATA_V4.value,
    params
)

ethereumViewModel.sendRequest(signRequest) { result ->
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
val from = ethereumViewModel.
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
ethereumViewModel.sendRequest(transactionRequest) { result ->
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

    ethereumViewModel.sendRequest(switchChainRequest) { result ->
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

    ethereumViewModel.sendRequest(addChainRequest) { result ->
        if (result is RequestError) {
            onError("Add chain error: ${result.message}")
        } else {
            if (chainId == ethereumViewModel.chainId) {
                onSuccess("Successfully switched to ${Network.chainNameFor(chainId)} ($chainId)")
            } else {
                onSuccess("Successfully added ${Network.chainNameFor(chainId)} ($chainId)")
            }
        }
    }
}
```
