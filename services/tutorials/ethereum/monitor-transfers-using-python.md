---
description: Monitor transfers to an Ethereum account.
sidebar_position: 3
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Monitor transfers using Python

In this tutorial, you'll monitor transfers to an Ethereum account using the Web3 Python library.

## Prerequisites

- [Pip](https://pip.pypa.io/en/stable/installation/) installed

## Steps

### 1. Create a project directory

Create a new directory for your project. This can be done from the command line:

```bash
mkdir monitorTransfer
```

Change into the new directory:

```bash
cd monitorTransfer
```

### 2. Install required packages

Install the `web3.py` package:

```bash
pip install web3
```

### 3. Create a script file

Create a file called `monitorTransactions.py`. At the top of file, add the following lines to import the `web3.py` library:

```python
from web3 import Web3
import time
```

### 4. Connect to Infura

Connect to the Infura endpoint and the address of the account:

```python
infura_url = "https://mainnet.infura.io/v3/<YOUR_API_KEY"
account = "<YOUR_PUBLIC_ADDRESS>"
web3 = Web3(Web3.HTTPProvider(infura_url))
```

:::warning

Replace `<YOUR_API_KEY>` with your Infura API key and `<YOUR_PUBLIC_ADDRESS>` with the Ethereum account you want to monitor.

:::

### 5. Set the function

Create a function to check new transactions for the account defined in [step 3](monitor-transfers-using-python.md#3.-create-a-script-file) and retrieves the details for the transaction:

```python
def watch():
  while True:
    block = web3.eth.get_block('latest')
    print("Searching in block " + str(block.number))

    if block and block.transactions:
      for transaction in block.transactions:
        tx_hash = transaction.hex()  # the hashes are stored in a hexBytes format
        tx = web3.eth.get_transaction(tx_hash)
        if tx.to is not None:
          if tx.to == account:
            print("Transaction found in block {} :".format(block.number))
            print({
              "hash": tx_hash,
              "from": tx["from"],
              "value": web3.fromWei(tx["value"], 'ether')
            })
    time.sleep(5)

watch()
```

### 6. Check for confirmations

Exchanges often wait until a deposit has reached a certain number of confirmations before processing the new transaction. The number of confirmations is the number of blocks that have passed since the transaction was included on-chain. By checking that a transaction has reached the specified number of confirmations, the exchange can be confident that this transaction is final and they can process the deposit.

Create a function to determine the number of confirmations for the transaction:

```python
def confirmations(tx_hash):
  tx = web3.eth.get_transaction(tx_hash)
  return web3.eth.block_number - tx.blockNumber
```

You can then call the function using something similar to:

```python
print(confirmations(tx_hash))
```

### 7. Run the script

Run the script using the following command:

<Tabs>
  <TabItem value="Command" label="Command" default>

```python
python3 monitorTransactions.py
```

  </TabItem>
  <TabItem value="Example output" label="Example output" >

```python
Searching in block 15019035
Transaction found in block 15019035 :
{"hash": "0x0f878eb882dfd069c482740df533e0ddef63504d795dcc3c934c3f9a6c159362", "from": "0x95B564F3B3BaE3f206aa418667bA000AFAFAcc8a", "value": 0}
Transaction found in block 15019035 :
{"hash": "0xee75ed766e17fef1cae917686b5b73e7c72b2fcf51e1558629b8fe96a7e5a1bd", "from": "0x9696f59E4d72E237BE84fFD425DCaD154Bf96976", "value": 0}
Transaction found in block 15019035 :
{"hash": "0x1cddbeff3ac97651f5d7e49e98f4289aeef728e08b05180c75bc04cdc970895d", "from": "0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549", "value": 0}
...
67341
```

  </TabItem>
</Tabs>

### Complete code overview

```python
from web3 import Web3
import time

infura_url = "https://mainnet.infura.io/v3/<YOUR_API_KEY>"
account = "<YOUR_PUBLIC_ADDRESS>"
web3 = Web3(Web3.HTTPProvider(infura_url))

def confirmations(tx_hash):
  tx = web3.eth.get_transaction(tx_hash)
  return web3.eth.block_number - tx.blockNumber

def watch():
  while True:
    block = web3.eth.get_block("latest")
    print("Searching in block " + str(block.number))

    if block and block.transactions:
      for transaction in block.transactions:
        tx_hash = transaction.hex()  # the hashes are stored in a hexBytes format
        tx = web3.eth.get_transaction(tx_hash)
        if tx.to is not None:
          if tx.to == account:
            print("Transaction found in block {} :".format(block.number))
            print({
              "hash": tx_hash,
              "from": tx["from"],
              "value": web3.from_wei(tx["value"], "ether")
            })
    time.sleep(5)

watch()
# print(confirmations("0x0d40d60e118e9e1f61c2baa2252cc5f8b8ed491c885ec35db6fd6cfc8589c1a7"))
```
