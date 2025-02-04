---
description: Listen for new transactions on the blockchain.
sidebar_position: 8
---

# Subscribe to pending transactions

This tutorial shows you how to use Ethereum subscriptions to listen for new transactions on the blockchain as they get submitted.

The tutorial uses the Python `websockets` library and Infura’s WebSocket endpoint to subscribe to transactions and events on the blockchain.

## Prerequisites

- An [Ethereum project](../../get-started/infura.md) on Infura
- [Python installed](https://www.python.org/downloads/)

## Steps

### 1. Create your project directory

Create a new directory:

```bash
mkdir subscribe
```

`cd` into the directory:

```bash
cd subscribe
```

### 2. Install dependencies

Install `web3.py` and the `websockets` library:

```
pip install web3 websockets
```

### 3. Import project libraries

Create your file (for example `subscribe.py`) and import the libraries needed for the project:

```python
import asyncio
import json
import requests
from web3 import Web3
from websockets import connect
```

### 4. Connect to Infura

Connect to Infura’s WebSockets endpoint to subscribe to new pending transactions, and Infura’s HTTP Ethereum endpoint so we can make JSON-RPC calls such as `eth_get_transaction` to get more information about a specific transaction.

Define the following endpoints in your file:

```python
infura_ws_url = "wss://mainnet.infura.io/ws/v3/<YOUR-API-KEY>"
infura_http_url = "https://mainnet.infura.io/v3/<YOUR-API-KEY>"
web3 = Web3(Web3.HTTPProvider(infura_http_url))
```

:::warning

Replace `<YOUR-API-KEY>` with your Infura API key, you can use the same for both endpoints.

:::

### 5. Subscribe to pending transactions

Create an `async` method that connects to Infura’s WebSocket endpoint:

```python
async def get_event():
  async with connect(infura_ws_url) as ws:
    await ws.send('{"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}')
    subscription_response = await ws.recv()
    print(subscription_response)  # {"jsonrpc": "2.0", "id": 1, "result": "0xd67da23f62a01f58042bc73d3f1c8936"}
```

In the method we use `ws.send()` to start a new subscription for new pending transactions, after which we get a confirmation back from the node with our subscription ID.

Next, we can await any new messages from the Infura node and print the transaction hash of every new transaction appearing on the Ethereum chain.

```python
while True:
  try:
    message = await asyncio.wait_for(ws.recv(), timeout=15)
    response = json.loads(message)
    txHash = response["params"]["result"]
    print(txHash)
  except Exception as e:
    print(f"An error occurred: {e}")
    pass
```

Finally, we'll add an `if __name__ == "__main__"` statement, so that our program runs when we execute it from a command line.

```python
if __name__ == "__main__":
  loop = asyncio.get_event_loop()
  while True:
    loop.run_until_complete(get_event())
```

The complete code sample should now look as follows:

```python
import asyncio
import json
import requests
from web3 import Web3
from websockets import connect

infura_ws_url = "wss://mainnet.infura.io/ws/v3/<YOUR-API-KEY>"
infura_http_url = "https://mainnet.infura.io/v3/<YOUR-API-KEY>"
web3 = Web3(Web3.HTTPProvider(infura_http_url))

async def get_event():
  async with connect(infura_ws_url) as ws:
    await ws.send('{"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}')
    subscription_response = await ws.recv()
    print(subscription_response)

    while True:
      try:
        message = await asyncio.wait_for(ws.recv(), timeout=15)
        response = json.loads(message)
        txHash = response["params"]["result"]
        print(txHash)
      except Exception as e:
        print(f"An error occurred: {e}")
        pass

if __name__ == "__main__":
  loop = asyncio.get_event_loop()
  while True:
    loop.run_until_complete(get_event())
```

### 6. Execute the program

Execute the program using the following:

```
Python python3 subscribe.py
```

You should now see the terminal fill up with Ethereum transfers:

```
{"jsonrpc": "2.0", "id": 1, "result": "0xf1c8df0cb54ea89828976b86f2325930"}
0x9831d16f46bfe723514594e990cb3c66824a584fd849984f28adac8fb5523702
0x1c3837ceffdd48325e19754f7b84fda4effd32c0c141b7dafa90d741cdc2c8f9
0x4f8e5706c60be6482f810af9a5d9191447d55c7441f68f4019a124d04d2a40d4
0x0e90c6b1f286b6298f01f837ea8934229af680449a5e3761585cd79139fc6531
...
```

### 7. Monitor a specific address for transactions

You can update the program to monitor incoming transactions to a specific Ethereum address. Let’s define an account we’d like to monitor first, outside of the `get_event()` function:

```python
account = "<YOUR_PUBLIC_ADDRESS>"
```

Then, inside the function and `try` block, append the following to check whether the recipient is the address we specified, after which it will print the transaction hash, sender address, and the value sent in Ether.

```python
tx = web3.eth.get_transaction(txHash)
if tx.to == account:
  print("Pending transaction found with the following details:")
  print({
    "hash": txHash,
    "from": tx["from"],
    "value": web3.fromWei(tx["value"], "ether")
  })
```

The full program code should now look as follows:

```python
import asyncio
import json
import requests
from web3 import Web3
from websockets import connect

infura_ws_url = "wss://mainnet.infura.io/ws/v3/<YOUR-API-KEY>"
infura_http_url = "https://mainnet.infura.io/v3/<YOUR-API-KEY>"
web3 = Web3(Web3.HTTPProvider(infura_http_url))

# Used if you want to monitor ETH transactions to a specific address
account = "<YOUR_PUBLIC_ADDRESS>"

async def get_event():
  async with connect(infura_ws_url) as ws:
    await ws.send('{"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}')
    subscription_response = await ws.recv()
    print(subscription_response)

    while True:
      try:
        message = await asyncio.wait_for(ws.recv(), timeout=15)
        response = json.loads(message)
        txHash = response["params"]["result"]
        print(txHash)
        # Monitor transactions to a specific address
        tx = web3.eth.get_transaction(txHash)
        if tx.to == account:
          print("Pending transaction found with the following details:")
          print({
            "hash": txHash,
            "from": tx["from"],
            "value": web3.fromWei(tx["value"], "ether")
          })
      except Exception as e:
        print(f"An error occurred: {e}")
        pass

if __name__ == "__main__":
  loop = asyncio.get_event_loop()
  while True:
    loop.run_until_complete(get_event())
```
