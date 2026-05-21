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

You use the official [`@x402/express`](https://www.npmjs.com/package/@x402/express) middleware with the
[`@metamask/x402`](https://www.npmjs.com/package/@metamask/x402)
package, which provides an ERC-7710 server scheme that routes verification and settlement
through the MetaMask facilitator.

## Prerequisites

- [Node.js 18](https://nodejs.org/en) or later.
- A [Node.js Express server](https://expressjs.com/en/starter/installing.html).
- A seller payout address to receive funds (for example, a
  [MetaMask wallet](https://metamask.io/download) address).

## Facilitator URLs

The following table lists the available MetaMask facilitator endpoints:

| Name         | ID             | URL                                                                   |
| ------------ | -------------- | --------------------------------------------------------------------- |
| Base         | `eip155:8453`  | https://tx-sentinel-base-mainnet.api.cx.metamask.io/platform/v2/x402  |
| Base Sepolia | `eip155:84532` | https://tx-sentinel-base-sepolia.api.cx.metamask.io/platform/v2/x402  |
| Monad        | `eip155:143`   | https://tx-sentinel-monad-mainnet.api.cx.metamask.io/platform/v2/x402 |

## Steps

### 1. Install the dependencies

```bash npm2yarn
npm install @metamask/x402 @x402/core @x402/evm @x402/express cors express
```

### 2. Configure middleware

Set up the Express server with the x402 `paymentMiddleware` and the `x402ExactEvmErc7710ServerScheme`
from `@metamask/x402`.
The scheme automatically adds payment requirements with ERC-7710 fields when
`assetTransferMethod` is set to `erc7710` in the route configuration.

The `paymentMiddleware` intercepts requests to protected routes and handles the full x402 payment
flow, including requirements advertisement, verification, and settlement.

In this example, you create a protected `GET /api/hello` endpoint that charges 0.01 USDC on
Base Sepolia.
Replace the payout address in `src/config.ts` with your own seller wallet address.

<Tabs>
<TabItem value="src/index.ts">

```ts
import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { paymentMiddleware, x402ResourceServer } from '@x402/express'
import { x402ExactEvmErc7710ServerScheme } from '@metamask/x402'
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
            extra: {
              assetTransferMethod: 'erc7710',
            },
          },
        ],
        description: 'Access to protected resource',
        mimeType: 'application/json',
      },
    },
    new x402ResourceServer(facilitatorClient).register(
      NETWORK_ID,
      new x402ExactEvmErc7710ServerScheme()
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

export const NETWORK_ID = 'eip155:84532'
export const PORT = 4402

// Replace with your seller payout address.
export const payToAddress = '0x<PAY_TO_ADDRESS>'

// MetaMask facilitator base URL for x402 on Base Sepolia.
export const facilitatorClient = new HTTPFacilitatorClient({
  url: 'https://tx-sentinel-base-sepolia.api.cx.metamask.io/platform/v2/x402',
})
```

</TabItem>
</Tabs>

## Next steps

- Learn more about [ERC-7710 delegation](../../concepts/delegation/overview.md).
- See the [x402 ERC-7710 specification](https://github.com/coinbase/x402/blob/main/specs/schemes/exact/scheme_exact_evm.md#3-assettransfermethod-erc-7710).
