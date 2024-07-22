---
title: "Use Rust"
description: A tutorial for legacy and EIP-1559 transactions.
---

# Use Rust

In this two-part tutorial we'll use Rust and the [ethers-rs library](https://www.gakonst.com/ethers-rs/getting-started/intro.html) to:

- Send a legacy transaction `("type":"0x0")`
- Send an EIP-1559 transaction `("type":"0x2")`

This tutorial uses the Sepolia testnet. Also see [Transaction types](../../../concepts/transaction-types.md).

## Prerequisites

- Make sure that you have test ETH in your MetaMask wallet. You can obtain test ETH for the Sepolia network using the
  [Infura Sepolia faucet](https://www.infura.io/faucet/sepolia).
- [Install Rust from The Cargo Book](https://doc.rust-lang.org/cargo/getting-started/installation.html).

## Send a legacy transaction

### 1. Create a new project

Open a terminal and create a new project.

```Rust
cargo new infura_rs
```

This creates the `infura_rs` directory with the following structure:

```text
infura_rs
├── Cargo.toml
└── src
    └── main.rs
```

:::info

Refer to the [Cargo documentation](https://doc.rust-lang.org/cargo/getting-started/first-steps.html) for more information about getting started with Cargo.

:::

### 2. Edit the dependencies

Open `Cargo.toml` with your preferred editor and add the following dependencies to it:

```toml
[dependencies]
ethers = "2.0"
eyre = "0.6.8"
hex = "0.4.3"
tokio = { version = "1.28.2", features = ["full"] }
serde_json = "1.0.96"
```

### 3. Update the main code

Open the Rust source `src/main.rs` and replace its contents with the following code:

```rust showLineNumbers
use ethers::{
  core::{types::TransactionRequest},
  middleware::SignerMiddleware,
  providers::{Http, Middleware, Provider},
  signers::{LocalWallet, Signer},
  utils,
  prelude::*
};
use eyre::Result;
use std::convert::TryFrom;

#[tokio::main]
async fn main() -> Result<()> {
  // Connect to the network
  let provider = Provider::<Http>::try_from("https://sepolia.infura.io/v3/INFURA_API_KEY")?;

  let chain_id = provider.get_chainid().await?;

  // Define the signer.
  // Replace the SIGNER_PRIVATE_KEY with
  // the private key of your Ethereum account (without the 0x prefix).
  // However, we recommended that you load it from
  // an .env file or external vault.
  let wallet: LocalWallet = "SIGNER_PRIVATE_KEY"
    .parse::<LocalWallet>()?
    .with_chain_id(chain_id.as_u64());

  let to_address = "0xAED01C776d98303eE080D25A21f0a42D94a86D9c";

  // Connect the wallet to the provider
  let client = SignerMiddleware::new(provider, wallet);

  // Craft the transaction
  // The below code knows how to figure out the
  // default gas value and determine the next nonce
  // so you do not need to explicitly add them.
  let tx = TransactionRequest::new()
    .to(to_address)
    .value(U256::from(utils::parse_ether(0.01)?));

  // Send it!
  let pending_tx = client.send_transaction(tx, None).await?;

  // Get the mined tx
  let receipt = pending_tx.await?.ok_or_else(|| eyre::format_err!("tx dropped from mempool"))?;
  let tx = client.get_transaction(receipt.transaction_hash).await?;

  println!("Sent tx: {}\n", serde_json::to_string(&tx)?);
  println!("Tx receipt: {}", serde_json::to_string(&receipt)?);

  Ok(())
}
```

Next, make the following updates to the above code:

- On line 16 replace the `INFURA_API_KEY` with you API key from the
  [Infura dashboard](../../../../../developer-tools/dashboard/get-started/create-api/).
- On line 26 replace the `SIGNER_PRIVATE_KEY` with the private key of your Ethereum account.
- On line 29, use a test address, such as [`0xAED01C776d98303eE080D25A21f0a42D94a86D9c`](https://sepolia.etherscan.io/address/0xaed01c776d98303ee080d25a21f0a42d94a86d9c).

:::tip Secure your keys
To better secure your keys, follow the recommended approach described in the section [Create the .env file](../../../tutorials/ethereum/send-a-transaction/use-web3.js.md#4-create-the-env-file).
:::
`

### 4. Run the code

From the `infura_rs` directory, run the code.

```rust
cargo run
```

You will see an output similar to the following:

:::note Use the wrap button
Use the wrap button on the top right of the below code block window for wrapped display.
:::

```log
Compiling infura_rs v0.1.0 (/Users/rajkaramchedu/onboarding/traian-tutorials/infura_rs)
Finished dev [unoptimized + debuginfo] target(s) in 2.14s
Running `target/debug/infura_rs`

Sent tx:
{
  "hash": "0x3cb5a5fac18e889457905351c9950108873a8f0789fe83e8a733b8367f49a67a",
  "nonce": "0x1",
  "blockHash": "0xa2787f5ec22d491588a8ffc6e7cec3ed97fccac4845e448650d02fce672a657c",
  "blockNumber": "0x3a7608",
  "transactionIndex": "0x3d",
  "from": "0xe33fef60722ba79989aeaa1b6e6daf7f351c0fbb",
  "to": "0xaed01c776d98303ee080d25a21f0a42d94a86d9c",
  "value": "0x2386f26fc10000",
  "gasPrice": "0x3cc",
  "gas": "0x5208",
  "input": "0x",
  "v": "0x1546d71",
  "r": "0x92aa9fe6039946db5ea291a245529a5d67f5531e95d74c483fe8283cca9ec666",
  "s": "0x4a5c0de8e64c79659965fb36f2b0ea1d295ae868f5f65809ef4cf1ef55239e09",
  "type": "0x0",
  "chainId": "0xaa36a7"
}

Tx receipt:
{
  "transactionHash": "0x3cb5a5fac18e889457905351c9950108873a8f0789fe83e8a733b8367f49a67a",
  "transactionIndex": "0x3d",
  "blockHash": "0xa2787f5ec22d491588a8ffc6e7cec3ed97fccac4845e448650d02fce672a657c",
  "blockNumber": "0x3a7608",
  "from": "0xe33fef60722ba79989aeaa1b6e6daf7f351c0fbb",
  "to": "0xaed01c776d98303ee080d25a21f0a42d94a86d9c",
  "cumulativeGasUsed": "0x406e87",
  "gasUsed": "0x5208",
  "contractAddress": null,
  "logs": [],
  "status": "0x1",
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "type": "0x0",
  "effectiveGasPrice": "0x3cc"
}
```

In the above transaction receipt, the transaction type shows `"type":"0x0"` indicating that this was a legacy transaction. Next, we will send an EIP-1559 transaction, which is of the type `"type":"0x2"`.

## Send an EIP-1559 transaction

### 1. Modify the main code

To send an EIP-1559 transaction, i.e., of the `"type":"0x2"` you must use `Eip1559TransactionRequest` instead of `TransactionRequest` in the `main.rs` code. Replace the code in `main.rs` with the following code.

```rust showLineNumbers
use ethers::{
  core::{types::TransactionRequest},
  middleware::SignerMiddleware,
  providers::{Http, Middleware, Provider},
  signers::{LocalWallet, Signer},
  utils,
  prelude::*
};
use eyre::Result;
use std::convert::TryFrom;
use types::Eip1559TransactionRequest;

#[tokio::main]
async fn main() -> Result<()> {
  // Connect to the network
  let provider = Provider::<Http>::try_from("https://sepolia.infura.io/v3/INFURA_API_KEY")?;

  let chain_id = provider.get_chainid().await?;

  // Define the signer.
  // Replace the SIGNER_PRIVATE_KEY with
  // the private key of your Ethereum account (without the 0x prefix).
  // However, we recommended that you load it from
  // an .env file or external vault.
  let wallet: LocalWallet = "SIGNER_PRIVATE_KEY"
    .parse::<LocalWallet>()?
    .with_chain_id(chain_id.as_u64());

  let to_address = "0xAED01C776d98303eE080D25A21f0a42D94a86D9c";

  // Connect the wallet to the provider
  let client = SignerMiddleware::new(provider, wallet);

  // Craft the transaction
  // This also knows to estimate the `max_priority_fee_per_gas`
  // but added it manually just to see how it would look
  let tx = Eip1559TransactionRequest::new()
    .to(to_address)
    .value(U256::from(utils::parse_ether(0.01)?))
    .max_priority_fee_per_gas(U256::from(2000000000_u128)); // 2 Gwei

  // Send it!
  let pending_tx = client.send_transaction(tx, None).await?;

  // Get the mined tx
  let receipt = pending_tx.await?.ok_or_else(|| eyre::format_err!("tx dropped from mempool"))?;
  let tx = client.get_transaction(receipt.transaction_hash).await?;

  println!("Sent tx: {}\n", serde_json::to_string(&tx)?);
  println!("Tx receipt: {}", serde_json::to_string(&receipt)?);

  Ok(())
}
```

### 2. Run the modified code

From the `infura_rs` directory, run the code.

```rust
cargo run
```

You will see an output similar to the following.

```log
Compiling infura_rs v0.1.0 (/Users/rajkaramchedu/onboarding/traian-tutorials/infura_rs)
warning: unused import: `types::TransactionRequest`
 --> src/main.rs:2:12
  |
2 |     core::{types::TransactionRequest},
  |            ^^^^^^^^^^^^^^^^^^^^^^^^^
  |
  = note: `#[warn(unused_imports)]` on by default

warning: `infura_rs` (bin "infura_rs") generated 1 warning (run `cargo fix --bin "infura_rs"` to apply 1 suggestion)
Finished dev [unoptimized + debuginfo] target(s) in 2.42s
Running `target/debug/infura_rs`

Sent tx:
{
  "hash": "0xbbc036f4dfe00b590c3693b8a2516316dec5748b3e4085ec92dfc040d8b8492b",
  "nonce": "0x4",
  "blockHash": "0xe64a029af23b18738a69c6eab19b85d99dc2844e8ce54a4bedcc1a75fe18dc08",
  "blockNumber": "0x3a7a42",
  "transactionIndex": "0xf",
  "from": "0xe33fef60722ba79989aeaa1b6e6daf7f351c0fbb",
  "to": "0xaed01c776d98303ee080d25a21f0a42d94a86d9c",
  "value": "0x2386f26fc10000",
  "gasPrice": "0x7735940c",
  "gas": "0x5208",
  "input": "0x",
  "v": "0x1",
  "r": "0xa0e4125501b3146910750408adaa255cd3e3a06461e311e1146a0983fcd9b0e0",
  "s": "0x35c5c6cf6650dcff0ed1e25689d0ce17f7f5986342276f11651976c7048172d1",
  "type": "0x2",
  "accessList": [],
  "maxPriorityFeePerGas": "0x77359400",
  "maxFeePerGas": "0xb2d05e16",
  "chainId": "0xaa36a7"
}

Tx receipt:
{
  "transactionHash": "0xbbc036f4dfe00b590c3693b8a2516316dec5748b3e4085ec92dfc040d8b8492b",
  "transactionIndex": "0xf",
  "blockHash": "0xe64a029af23b18738a69c6eab19b85d99dc2844e8ce54a4bedcc1a75fe18dc08",
  "blockNumber": "0x3a7a42",
  "from": "0xe33fef60722ba79989aeaa1b6e6daf7f351c0fbb",
  "to": "0xaed01c776d98303ee080d25a21f0a42d94a86d9c",
  "cumulativeGasUsed": "0x6a7187",
  "gasUsed": "0x5208",
  "contractAddress": null,
  "logs": [],
  "status": "0x1",
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "type": "0x2",
  "effectiveGasPrice": "0x7735940c"
}
```

Ignore the `"warning: unused import: types::TransactionRequest"`. 
In the above transaction receipt, the transaction type shows `"type":"0x2"` indicating that this was an EIP-1559 transaction.
