---
description: Send a transaction using Go.
---

# Use Go

Send a regular transaction from one account to another with [Go](https://go.dev/).

## Prerequisites

- [Go](https://go.dev/doc/install) installed.
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

### 2. Initialize the directory and install the dependencies

```bash
go mod init infura
go get github.com/ethereum/go-ethereum/common
go get github.com/ethereum/go-ethereum/core/types
go get github.com/ethereum/go-ethereum/crypto
go get github.com/ethereum/go-ethereum/rpc@v1.10.17
```

### 3. Create `eip1559_tx.go` file

```go
package main

import (
	"context"
	"crypto/ecdsa"
	"fmt"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

func main() {
	client, err := ethclient.Dial("https://sepolia.infura.io/v3/API_KEY")
	if err != nil {
		log.Fatal(err)
	}

	privateKey, err := crypto.HexToECDSA("PRIVATE_KEY")
	if err != nil {
		log.Fatal(err)
	}

	publicKey := privateKey.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	if !ok {
		log.Fatal("error casting public key to ECDSA")
	}

	fromAddress := crypto.PubkeyToAddress(*publicKeyECDSA)

	nonce, err := client.PendingNonceAt(context.Background(), fromAddress)
	if err != nil {
		log.Fatal(err)
	}

        value := big.NewInt(10000000000000000) // in wei (0.01 eth)
	gasLimit := uint64(21000)               // in units
	tip := big.NewInt(2000000000)           // maxPriorityFeePerGas = 2 Gwei
	feeCap := big.NewInt(20000000000)       // maxFeePerGas = 20 Gwei
	if err != nil {
		log.Fatal(err)
	}

	toAddress := common.HexToAddress("ADDRESS_TO")
	var data []byte

	chainID, err := client.NetworkID(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	tx := types.NewTx(&types.DynamicFeeTx{
		ChainID:   chainID,
		Nonce:     nonce,
		GasFeeCap: feeCap,
		GasTipCap: tip,
		Gas:       gasLimit,
		To:        &toAddress,
		Value:     value,
		Data:      data,
	})

	signedTx, err := types.SignTx(tx, types.LatestSignerForChainID(chainID), privateKey)

	if err != nil {
		log.Fatal(err)
	}

	err = client.SendTransaction(context.Background(), signedTx)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Transaction hash: %s", signedTx.Hash().Hex())

}
```

Replace the following values in the script:

- `<API_KEY>` with the Infura API key.
- `<PRIVATE-KEY>` with the [private key of your Ethereum account](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
- `<ADDRESS-TO>` with the address of the recipient of funds.

If using a different Ethereum network, update the URL in the script.

:::danger

Never disclose your private key.

A malicious actor who has access to your private key can steal your assets.

:::

### 4. Execute the transaction

Run the script:

```bash
go run eip1559_tx.go
```

Example output:

```
Transaction hash: 0x47ed277bdfee88902f971510a7cd7b4c55722ea06488e697fb05dc99454e51ab
```

You can search for the transaction on a block explorer like [Sepolia Etherscan](https://sepolia.etherscan.io/).
