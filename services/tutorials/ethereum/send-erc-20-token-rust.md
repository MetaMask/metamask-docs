---
description: A tutorial for sending ERC-20 tokens.
sidebar_position: 6

---

# Send an ERC-20 token

In this tutorial we'll use Rust and the [ethers-rs library](https://www.gakonst.com/ethers-rs/getting-started/intro.html) to send an ERC-20 token from one address to another. This tutorial uses the Sepolia testnet and sends the [Chainlink token (LINK)](https://sepolia.etherscan.io/token/0x779877a7b0d9e8603169ddbd7836e478b4624789#code). 

## Prerequisites

- Make sure that you have test LINK in your MetaMask wallet. You can obtain test LINK for the Sepolia network using the [Chainlink faucet](https://faucets.chain.link/). Make sure that the `Ethereum Sepolia` network is selected on the top right of the faucet page when you connect your MetaMask wallet.
- [Install Rust from The Cargo Book](https://doc.rust-lang.org/cargo/getting-started/installation.html).

## Send the token

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

### 3. Copy the contract ABI

- Create a text file with the name `ct.json` in the `infura-rs` project directory. Visit the [ChainLink Token site on Etherscan](https://sepolia.etherscan.io/token/0x779877a7b0d9e8603169ddbd7836e478b4624789#code) and copy the `Contract ABI` (you will see it in a bottom section of the page) into the `ct.json` file.  

### 4. Update the main code

Open the Rust source `src/main.rs` and replace its contents with the following code: 

```rust showLineNumbers
use ethers::{
    middleware::SignerMiddleware,
    providers::{Http, Middleware, Provider},
    signers::{LocalWallet, Signer},
    types::{Address, U256},
    contract::abigen
};
use eyre::Result;
use std::convert::TryFrom;
use std::sync::Arc;
use serde_json::Value;

#[tokio::main]
async fn main() -> Result<()> {

    // connect to the network, don't forget to replace your INFURA_API_KEY
    let provider = Provider::<Http>::try_from("https://sepolia.infura.io/v3/INFURA_API_KEY")?;

    let chain_id = provider.get_chainid().await?;

    let contract_address = "0x779877A7B0D9E8603169DdbD7836e478b4624789".parse::<Address>()?;

    // define a `ERC20Contract` struct from the ABI
    abigen!(ERC20Contract, "./ct.json",);

    let to_address = "0xF1B792820b52e6503208CAb98ec0B7b89ac64D6A".parse::<Address>()?;

    // Create the contract instance to let us call methods of the contract and let it sign transactions with the sender wallet.
    // for simplicity replace the private key (without 0x), ofc it always recommended to load it from an .env file or external vault
    let wallet: LocalWallet = "SIGNER_PRIVATE_KEY"
        .parse::<LocalWallet>()?
        .with_chain_id(chain_id.as_u64());

    let signer = Arc::new(SignerMiddleware::new(provider, wallet.with_chain_id(chain_id.as_u64())));
    let contract = ERC20Contract::new(contract_address, signer);

    // Fetch the decimals used by the contract so we can compute the decimal amount to send.
    let whole_amount: u64 = 1;
    let decimals = contract.decimals().call().await?;
    let decimal_amount = U256::from(whole_amount) * U256::exp10(decimals as usize);

    // Transfer the desired amount of tokens to the `to_address`
    let tx = contract.transfer(to_address, decimal_amount);
    let pending_tx = tx.send().await?;
    let _mined_tx = pending_tx.await?;

    println!("Transaction Receipt: {}", serde_json::to_string(&_mined_tx)?);

    // Extract the tx hash for printing
    let json_str = serde_json::to_string(&_mined_tx)?;
    let json: Value = serde_json::from_str(&json_str)?;

    if let Some(transaction_hash) = json["transactionHash"].as_str() {
        println!("\n URL: https://sepolia.etherscan.io/tx/{}", transaction_hash);
    } else {
        println!("Transaction Hash not found");
    }

   Ok(())
}
```

Next, make the following updates to the above code:

- On line 17 replace the `INFURA_API_KEY` with the API key of your API project from
    [Infura dashboard](../../dashboard/create-api.md).
- On line 30 replace the `SIGNER_PRIVATE_KEY` with the private key of your Ethereum account. 

:::tip Secure your keys
To better secure your keys, follow the recommended approach described in the section [Create the .env file](../../tutorials/ethereum/send-a-transaction/use-web3.js.md#4-create-the-env-file).
:::

### 4. Run the code

From the `infura_rs` directory, run the code.

```rust
cargo run
```

You will see an output similar to the following. 
:::note Use the wrap button
Use the wrap button on the top right of the below code block window for wrapped display.
:::

```log
Finished dev [unoptimized + debuginfo] target(s) in 0.31s
     Running `target/debug/infura_rs`
Transaction Receipt: {"transactionHash":"0x301ae601943c5a1822886bf36e58c289ef942ca4bb08226ea3090b685aef9c7e","transactionIndex":"0x4","blockHash":"0xba6c880b14a7927ed2b6a5ac4e434d13d051dc770fe5f68666bb4d9b9ee1faed","blockNumber":"0x3a91b7","from":"0xe33fef60722ba79989aeaa1b6e6daf7f351c0fbb","to":"0x779877a7b0d9e8603169ddbd7836e478b4624789","cumulativeGasUsed":"0xd4673","gasUsed":"0x86fe","contractAddress":null,"logs":[{"address":"0x779877a7b0d9e8603169ddbd7836e478b4624789","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x000000000000000000000000e33fef60722ba79989aeaa1b6e6daf7f351c0fbb","0x000000000000000000000000f1b792820b52e6503208cab98ec0b7b89ac64d6a"],"data":"0x0000000000000000000000000000000000000000000000000de0b6b3a7640000","blockHash":"0xba6c880b14a7927ed2b6a5ac4e434d13d051dc770fe5f68666bb4d9b9ee1faed","blockNumber":"0x3a91b7","transactionHash":"0x301ae601943c5a1822886bf36e58c289ef942ca4bb08226ea3090b685aef9c7e","transactionIndex":"0x4","logIndex":"0x7","removed":false}],"status":"0x1","logsBloom":"0x00000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000040000001000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000082000000000000000000000000000000008000000100000000000000000000000000008000000000000000000000000000000000000000000000000000","type":"0x2","effectiveGasPrice":"0xb2d05e09"}

 URL: https://sepolia.etherscan.io/tx/0x301ae601943c5a1822886bf36e58c289ef942ca4bb08226ea3090b685aef9c7e
 ```

Visit the URL displayed at the bottom of the above terminal log to confirm the transfer of the LINK token.