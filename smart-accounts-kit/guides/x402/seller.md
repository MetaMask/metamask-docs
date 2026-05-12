---
description: Build an x402-compatible Node.js server that accepts ERC-7710 delegation payments.
sidebar_label: Seller
keywords:
  [x402, ERC-7710, HTTP 402, Advanced Permissions, facilitator, delegation, Express, Node.js]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Create an x402 server with ERC-7710

In this guide, you build a Node.js server that charges for HTTP API access using
[x402](https://www.x402.org/) and accepts [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710)
delegation payments verified through the MetaMask facilitator.

The official `@x402/express` middleware doesn't support ERC-7710 delegation payloads. This guide
shows you how to implement the x402 HTTP contract manually with Express.

## Prerequisites

- [Node.js 18](https://nodejs.org/en) or later.
- A [Node.js Express server](https://expressjs.com/en/starter/installing.html).
- A seller payout address to receive funds (for example, a [MetaMask wallet](https://metamask.io/download) address).

## Steps

### 1. Install the dependencies

```bash npm2yarn
npm install viem
```

### 2. Create payment requirements

Define the payment requirements that every protected route returns to buyers. Follow the [x402 payment requirements schema](https://docs.x402.org/core-concepts/http-402#payment-headers-in-v2), and set `scheme` to `erc7710`.

#### Parameters

| Name                | Description                                                                                                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scheme`            | Payment scheme the facilitator uses to interpret the payload. Set this to `erc7710` so the facilitator routes the payment to its delegation verifier instead of the default `exact` scheme. |
| `network`           | [CAIP-2](https://chainagnostic.org/CAIPs/caip-2) chain identifier for the payment. The example uses `eip155:8453`, the identifier for Base.                                                 |
| `maxAmountRequired` | Maximum amount the buyer must authorize, expressed in the wei format. The example charges 0.01 USDC.                                                                                        |
| `resource`          | Protected route this requirement applies to.                                                                                                                                                |
| `description`       | Short, human-readable label that buyers see in the `x402` response and your `/info` discovery payload.                                                                                      |
| `mimeType`          | Content type of the response the buyer receives after a successful payment.                                                                                                                 |
| `payTo`             | Seller wallet address that receives the settled funds.                                                                                                                                      |
| `maxTimeoutSeconds` | Maximum time, in seconds, the buyer's payment authorization stays valid before settlement must complete.                                                                                    |
| `asset`             | ERC-20 token contract address used for payment. The example uses USDC on Base.                                                                                                              |

#### Implementation

<Tabs>
<TabItem value = "src/payment.ts">

```ts
import { PaymentRequirements } from './type'
import { Hex } from 'viem'

export const paymentRequirements: PaymentRequirements = {
  scheme: 'erc7710',
  // CAIP-2 identifier for Base.
  network: 'eip155:8453',
  // 0.1 USDC in wei format.
  maxAmountRequired: '10000',
  resource: '/api/premium',
  description: 'Premium API access',
  mimeType: 'application/json',
  payTo: '<YOUR_PAYTO_ADDRESS>',
  maxTimeoutSeconds: 60,
  // USDC contract address on Base.
  asset: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
}
```

</TabItem>
<TabItem value = "src/type.ts">

```ts
import { Address } from 'viem'

export type PaymentRequirements = {
  scheme: string
  network: string
  maxAmountRequired: string
  resource: string
  description: string
  mimeType: string
  payTo: Address
  maxTimeoutSeconds: number
  asset: Address
}
```

</TabItem>
</Tabs>

### 3. Add a discovery method

Add a public `GET /info` route that publishes your protected paths and their payment terms.
Buyers call this route before they prepare an ERC-7710 delegation payment.

```ts
// src/index.ts
import express from 'express'
import { paymentRequirements } from './payment'

const app = express()
app.use(express.json())

app.get('/info', (_req, res) => {
  res.json({
    routes: ['/api/premium'],
    accepts: [paymentRequirements],
  })
})
```

### 4. Add payment middleware

Add payment middleware that runs before each protected handler. Parse the base64 `X-PAYMENT` header to
extract the encoded delegation chain (`permissionContext`) the buyer prepared.

When the `X-PAYMENT` header is missing or malformed, respond with `402 Payment Required` and a JSON body
that tells the buyer how to pay.

```ts
// src/middleware.ts
import type { Request, Response, NextFunction } from 'express'
import { paymentRequirements } from './payment'

export function requirePayment(req: Request, res: Response, next: NextFunction) {
  const header = req.header('X-PAYMENT')

  if (!header) {
    return res.status(402).json({
      x402Version: 1,
      accepts: [paymentRequirements],
      error: 'X-PAYMENT header missing',
    })
  }

  try {
    const decoded = JSON.parse(Buffer.from(header, 'base64').toString('utf8'))
    res.locals.paymentPayload = decoded
    return next()
  } catch (error) {
    return res.status(402).json({
      x402Version: 1,
      accepts: [paymentRequirements],
      error: 'X-PAYMENT header is not valid base64-encoded JSON',
    })
  }
}
```

### 5. Verify the payment

Call the MetaMask facilitator's `verify` endpoint to confirm the encoded delegation chain authorizes the requested resource. If verification fails, return `402` with the failure reason from the facilitator so the buyer can correct the payment and retry.

<Tabs>
<TabItem value = 'src/middleware.ts'>

```ts
// src/middleware.ts
import { FACILITATOR_URL } from './config'

export async function verifyPayment(req: Request, res: Response, next: NextFunction) {
  const response = await fetch(`${FACILITATOR_URL}/platform/v2/x402/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      x402Version: 1,
      paymentPayload: res.locals.paymentPayload,
      paymentRequirements,
    }),
  })

  const result = await response.json()

  if (!response.ok || result.isValid !== true) {
    return res.status(402).json({
      x402Version: 1,
      accepts: [paymentRequirements],
      error: result.invalidReason ?? 'Verification failed',
    })
  }

  return next()
}
```

</TabItem>
<TabItem value = 'src/config.ts'>

```ts
const FACILITATOR_URL = 'https://tx-sentinel-base-mainnet.dev-api.cx.metamask.io'
```

</TabItem>
</Tabs>

### 6. Settle the payment

After verification succeeds, run your business logic and call the MetaMask facilitator's `settle` endpoint. Attach the settlement result to the response as the `X-PAYMENT-RESPONSE` header so the buyer can correlate it with the original request.

The example returns `{ message: 'Premium content unlocked' }` as a placeholder. Replace it with whatever JSON payload your protected route serves.

```ts
// src/index.ts
import { requirePayment, verifyPayment } from './middleware'
import { paymentRequirements } from './payment'
import { FACILITATOR_URL } from './config'

app.get('/api/premium', requirePayment, verifyPayment, async (_req, res) => {
  const settlement = await fetch(`${FACILITATOR_URL}/platform/v2/x402/settle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      x402Version: 1,
      paymentPayload: res.locals.paymentPayload,
      paymentRequirements,
    }),
  }).then(r => r.json())

  const encoded = Buffer.from(JSON.stringify(settlement)).toString('base64')
  res.setHeader('X-PAYMENT-RESPONSE', encoded)
  // Run your business logic and send as a response.
  res.json({ message: 'Premium content unlocked' })
})

app.listen(4402, () => {
  console.log('Seller listening on port 4402')
})
```

## Next steps

- Learn more about [ERC-7710 delegation](../../concepts/delegation/overview.md).
- See the [x402 ERC-7710 specification](https://github.com/coinbase/x402/blob/main/specs/schemes/exact/scheme_exact_evm.md#3-assettransfermethod-erc-7710).
