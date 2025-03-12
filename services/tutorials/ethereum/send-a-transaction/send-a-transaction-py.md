---
description: Send a transaction using Python.
---

# Use Python

Send a regular transaction from one account to another with [Python](https://www.python.org/).

## Prerequisites

- [Node.js](https://nodejs.org/en/download/).
- An Ethereum account containing some [Sepolia test ETH](https://www.infura.io/faucet).

:::info

Use [MetaMask](https://metamask.io) or similar to create an Ethereum account for testing.

:::

## Steps

### 1. Create a project directory

Create a new directory:

```bash
mkdir infura
```

`cd` into the directory:

```bash
cd infura
```

### 2. Install the dependencies

```bash
pip install web3
```

```bash
pip install python-dotenv
```

### 3. Create `.env` file

Create a `.env` file in your project directory to store the private key of your Ethereum account.

```bash
PRIVATE_KEY = <PRIVATE-KEY>
```

Find out how to access the [private key of your Ethereum account](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/). Make sure that you prefix the `<PRIVATE_KEY>` value with `0x`. The
private key you export from MetaMask will not be prefixed with `0x`.

:::danger

Never disclose your private key.

A malicious actor who has access to your private key can steal your assets.

:::

### 4. Create `eip1559_tx.py` file

Create a file named `eip1559_tx.py` and add the following lines of code.

```python
import os
from dotenv import load_dotenv
from web3 import Web3, exceptions

load_dotenv()

infura_url = "https://sepolia.infura.io/v3/<YOUR-API-KEY>"
private_key = os.getenv("PRIVATE_KEY")
from_account = "<PUBLIC-KEY>"
to_account = "<RECIPIENT-PUBLIC-KEY>"
web3 = Web3(Web3.HTTPProvider(infura_url))

try:
  from_account = web3.to_checksum_address(from_account)
except exceptions.InvalidAddress:
  print(f"Invalid 'from_account' address: {from_account}")

try:
  to_account = web3.to_checksum_address(to_account)
except exceptions.InvalidAddress:
  print(f"Invalid 'to_account' address: {to_account}")

nonce = web3.eth.get_transaction_count(from_account)
tx = {
  "type": "0x2",
  "nonce": nonce,
  "from": from_account,
  "to": to_account,
  "value": web3.to_wei(0.01, "ether"),
  "maxFeePerGas": web3.to_wei("250", "gwei"),
  "maxPriorityFeePerGas": web3.to_wei("3", "gwei"),
  "chainId": 11155111
}
gas = web3.eth.estimate_gas(tx)
tx["gas"] = gas
signed_tx = web3.eth.account.sign_transaction(tx, private_key)
tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
print("Transaction hash: " + str(web3.to_hex(tx_hash)))
```

Ensure you replace the following values in the code:

- `<YOUR-API-KEY>` with the API key of the Web3 project.
- `<PUBLIC-KEY>` with the public key associated with the private key you added in the `.env` file.
- `<RECIPIENT-PUBLIC-KEY>` With the public key of the recipient of the transfer.

If using a different Ethereum network, update the URL in the code.

### 4. Execute the transaction

Run the script:

```bash
python eip1559_tx.py
```

Example output:

```
Transaction hash: 0x30c0ef29111ca7aecc78a99149649b5076d104afa7ed2f603ff2d2ec1aa27a8c
```

You can search for the transaction on a block explorer like [Sepolia Etherscan](https://sepolia.etherscan.io/tx/0x28e414889b47ba43b00086bc3ae42ea4ea521739f77b78afcaefb1b7fe42e955).
