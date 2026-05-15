---
description: Build an x402-compatible Node.js server that accepts ERC-7710 delegation payments.
sidebar_label: Seller
keywords:
  [x402, ERC-7710, HTTP 402, Advanced Permissions, facilitator, delegation, Express, Node.js]
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Create an x402 server with ERC-7710

In this guide, you build a Node.js server that charges for HTTP API access using
[x402](https://www.x402.org/) and accepts [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710) delegation
payments verified through the MetaMask facilitator.

You use the official [`@x402/express`](https://www.npmjs.com/package/@x402/express) middleware with a custom ERC-7710 scheme that routes
verification and settlement through the MetaMask facilitator.

## Prerequisites

- [Node.js 18](https://nodejs.org/en) or later.
- A [Node.js Express server](https://expressjs.com/en/starter/installing.html).
- A seller payout address to receive funds (for example, a
  [MetaMask wallet](https://metamask.io/download) address).

## Steps

### 1. Install the dependencies

```bash npm2yarn
npm install @x402/core @x402/evm @x402/express cors express
```

### 2. Create the ERC-7710 scheme

Create a custom scheme that extends `ExactEvmScheme` from `@x402/evm` to add ERC-7710
delegation support.

The scheme overrides `enhancePaymentRequirements` to set `assetTransferMethod` to `erc7710`
and include the facilitator addresses so buyers can scope their delegation to specific
set of facilitators before creating the payment payload.

```ts
import { ExactEvmScheme } from '@x402/evm/exact/server'
import type {
  PaymentRequirements,
  Network,
  Price,
  AssetAmount,
  SupportedKind,
  SchemeNetworkServer,
} from '@x402/core/types'
import type { FacilitatorClient } from '@x402/core/server'

export class Erc7710EvmScheme implements SchemeNetworkServer {
  readonly scheme = 'exact'
  private readonly inner = new ExactEvmScheme()

  constructor(private readonly facilitatorClient: FacilitatorClient) {}

  async parsePrice(price: Price, network: Network): Promise<AssetAmount> {
    return this.inner.parsePrice(price, network)
  }

  getAssetDecimals(asset: string, network: Network): number {
    return this.inner.getAssetDecimals?.(asset, network) ?? 6
  }

  async enhancePaymentRequirements(
    paymentRequirements: PaymentRequirements,
    supportedKind: SupportedKind,
    facilitatorExtensions: string[]
  ): Promise<PaymentRequirements> {
    const enhanced = await this.inner.enhancePaymentRequirements(
      paymentRequirements,
      supportedKind,
      facilitatorExtensions
    )

    const supported = await this.facilitatorClient.getSupported()
    const facilitators =
      supported.signers[paymentRequirements.network] ?? supported.signers['eip155:*'] ?? []

    return {
      ...enhanced,
      extra: {
        ...enhanced.extra,
        assetTransferMethod: 'erc7710',
        facilitators,
      },
    }
  }
}
```

### 3. Configure the server

Set up the Express server with the x402 `paymentMiddleware` and the custom ERC-7710 scheme.
The `paymentMiddleware` intercepts requests to protected routes and handles the full x402 payment
flow, including requirements advertisement, verification, and settlement.

In this example, you create a protected `GET /api/hello` endpoint that charges 0.01 USDC on
Base mainnet.
Replace the payout address in `src/config.ts` with your own seller wallet address.

<Tabs>
<TabItem value="src/index.ts">

```ts
import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { paymentMiddleware } from '@x402/express'
import { x402ResourceServer } from '@x402/core/server'
import { Erc7710EvmScheme } from './scheme.js'
import { NETWORK_ID, PORT, payToAddress, facilitatorClient } from './config.js'

const app = express()
app.use(cors({ exposedHeaders: ['PAYMENT-REQUIRED', 'PAYMENT-RESPONSE'] }))

app.use(
  paymentMiddleware(
    {
      'GET /api/hello': {
        accepts: [
          {
            scheme: 'exact',
            price: '$0.01',
            network: NETWORK_ID,
            payTo: payToAddress,
          },
        ],
        description: 'Access to protected resource',
        mimeType: 'application/json',
      },
    },
    new x402ResourceServer(facilitatorClient).register(
      NETWORK_ID,
      new Erc7710EvmScheme(facilitatorClient)
    )
  )
)

app.get('/api/hello', (_req: Request, res: Response) => {
  res.json({ message: 'Hello!' })
})

app.listen(PORT, () => {
  console.log(`[seller] Server running on http://localhost:${PORT}`)
})
```

</TabItem>

<TabItem value="src/config.ts">

```ts
import { HTTPFacilitatorClient } from '@x402/core/server'

export const NETWORK_ID = 'eip155:8453'
export const PORT = 4402

// Replace with your seller payout address.
export const payToAddress = '0x<PAY_TO_ADDRESS>'

// MetaMask facilitator base URL for x402 on Base mainnet.
export const facilitatorClient = new HTTPFacilitatorClient({
  url: 'https://tx-sentinel-base-mainnet.dev-api.cx.metamask.io/platform/v2/x402',
})
```

</TabItem>
</Tabs>

## Next steps

- Learn more about [ERC-7710 delegation](../../concepts/delegation/overview.md).
- See the [x402 ERC-7710 specification](https://github.com/coinbase/x402/blob/main/specs/schemes/exact/scheme_exact_evm.md#3-assettransfermethod-erc-7710).
