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
[x402](https://www.x402.org/) and accepts [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710)
delegation payments verified through the MetaMask facilitator.

The official `@x402/express` middleware doesn't yet support ERC-7710 delegation payloads. This guide
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

### 2. Define constants

Configure the server constants the middleware uses to build payment requirements in later steps.
The example charges in USDC on Base mainnet and routes verification and settlement through the
MetaMask facilitator.

```ts
// src/config.ts
import 'dotenv/config'
import { Address } from 'viem'
import { base } from 'viem/chains'

export const NETWORK_ID = `eip155:${base.id}`

// USDC address on Base mainnet.
export const USDC_ADDRESS: Address = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
export const PAY_TO_ADDRESS = '0x<PAY_TO_ADDRESS>'
// MetaMask facilitator base URL for x402 on Base mainnet.
export const FACILITATOR_URL =
  'https://tx-sentinel-base-mainnet.dev-api.cx.metamask.io/platform/v2/x402'
```

### 3. Create payment middleware

Add payment middleware that runs before each protected handler. The middleware factory builds the
payment requirements for the route, reads the buyer's delegation payload from the request
header, verifies it through the facilitator, and settles it before the protected handler runs.
It also fetches the current facilitator signer address and includes it in
`PaymentRequirements.extra.facilitators`.

When the header is missing, the middleware encodes the payment requirements in a `PAYMENT-REQUIRED`
response header and returns `402 Payment Required` with a JSON body that tells the buyer how to pay.
When the header is malformed, the middleware returns `400 Bad Request`.

The middleware builds payment requirements that follow the [x402 payment requirements schema](https://docs.x402.org/core-concepts/http-402#payment-headers-in-v2).
Set `scheme` to `exact` and `assetTransferMethod` to `erc7710` so the facilitator routes the
payment to its delegation verifier.

#### Parameters

<Tabs>
<TabItem value = "PaymentRequirements">

Payment terms the seller advertises. The middleware builds the `PaymentRequirements` object per
request and returns it in the `PAYMENT-REQUIRED` response header when payment is missing.

| Name                        | Description                                                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `scheme`                    | Payment scheme the facilitator uses to interpret the payload. Set this to `exact` so the facilitator routes the payment through its standard verifier. |
| `network`                   | [CAIP-2](https://chainagnostic.org/CAIPs/caip-2) chain identifier for the payment. The example uses `eip155:8453`, the identifier for Base.            |
| `amount`                    | Amount the buyer must authorize, expressed in the wei format. The example charges 0.01 USDC.                                                           |
| `asset`                     | ERC-20 token contract address used for payment. The example uses USDC on Base.                                                                         |
| `payTo`                     | Seller wallet address that receives the settled funds.                                                                                                 |
| `maxTimeoutSeconds`         | Maximum time, in seconds, the buyer's payment authorization stays valid before settlement must complete.                                               |
| `extra.assetTransferMethod` | Asset transfer method the facilitator uses. Set this to `erc7710` so the facilitator routes the payment to its ERC-7710 delegation verifier.           |
| `extra.facilitators`        | List of facilitator addresses allowed to settle the payment. This helps buyers scope a delegation to a specific facilitator address before signing.    |

</TabItem>
<TabItem value = "PaymentPayload">

Decoded delegation payload the buyer sends in the `payment-signature` request header. The
middleware forwards this object to the facilitator's `/verify` and `/settle` endpoints.

| Name                        | Description                                                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `x402Version`               | Version of the x402 protocol the buyer used. The example uses version 2.                                                                               |
| `accepted`                  | Snapshot of the `PaymentRequirements` the buyer agreed to. The facilitator uses this to confirm the buyer signed the same terms the seller advertised. |
| `payload.delegationManager` | Address of the ERC-7710 delegation manager contract that executes the delegation.                                                                      |
| `payload.permissionContext` | Hex-encoded delegation chain the buyer signed.                                                                                                         |
| `payload.delegator`         | Address of the buyer's account that granted the delegation.                                                                                            |

</TabItem>
</Tabs>

#### Implementation

<Tabs>
<TabItem value = "src/middleware.ts">

```ts
import type { Request, Response, NextFunction } from 'express'
import type { Address } from 'viem'
import { USDC_ADDRESS, NETWORK_ID, PAY_TO_ADDRESS } from './config'
import type { PaymentPayload, PaymentRequirements, PaymentMiddlewareOptions } from './types'
import { fetchFacilitatorAddress } from './utils'

export function createPaymentMiddleware(options: PaymentMiddlewareOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let facilitatorAddress: Address | null = null
    try {
      facilitatorAddress = await fetchFacilitatorAddress()
    } catch (err) {
      console.warn('[x402] Could not fetch facilitator address:', err)
    }

    const paymentRequirements: PaymentRequirements = {
      scheme: 'exact',
      network: NETWORK_ID,
      amount: options.amount,
      asset: USDC_ADDRESS,
      payTo: PAY_TO_ADDRESS,
      maxTimeoutSeconds: 60,
      extra: {
        assetTransferMethod: 'erc7710',
        ...(facilitatorAddress ? { facilitators: [facilitatorAddress] } : {}),
      },
    }

    const paymentHeader =
      (req.headers['payment-signature'] as string) || (req.headers['x-payment-signature'] as string)

    if (!paymentHeader) {
      const paymentRequired = {
        x402Version: 2,
        accepts: [paymentRequirements],
        description: options.description || 'Payment required to access this resource',
        mimeType: options.mimeType || 'application/json',
      }
      const encoded = Buffer.from(JSON.stringify(paymentRequired)).toString('base64')
      res.setHeader('PAYMENT-REQUIRED', encoded)
      res.status(402).json({ error: 'Payment Required', paymentRequired })
      return
    }

    let paymentPayload: PaymentPayload
    try {
      const decoded = Buffer.from(paymentHeader, 'base64').toString('utf-8')
      paymentPayload = JSON.parse(decoded)
    } catch {
      res.status(400).json({ error: 'Invalid PAYMENT-SIGNATURE header' })
      return
    }

    // Verification and settlement are added in steps 5 and 6.
    next()
  }
}
```

</TabItem>
<TabItem value = "src/utils.ts">

```ts
import type { Address } from 'viem'
import { FACILITATOR_URL } from './config'

export async function fetchFacilitatorAddress(): Promise<Address> {
  const res = await fetch(`${FACILITATOR_URL}/supported`)
  if (!res.ok) throw new Error('Failed to fetch facilitator supported info')
  const data = await res.json()
  const address = data.signers?.['eip155:*']?.[0] as Address
  if (!address) throw new Error('Facilitator address not found in /supported response')
  return address
}
```

</TabItem>
<TabItem value = "src/types.ts">

```ts
import type { Address, Hex } from 'viem'

export interface PaymentRequirements {
  scheme: string
  network: string
  amount: string
  asset: Address
  payTo: Address
  maxTimeoutSeconds: number
  extra: {
    assetTransferMethod: string
    facilitators?: Address[]
    [key: string]: unknown
  }
}

export interface PaymentPayload {
  x402Version: number
  accepted: {
    scheme: string
    network: string
    amount: string
    asset: Address
    payTo: Address
    maxTimeoutSeconds: number
    extra: {
      assetTransferMethod: string
      facilitators?: Address[]
      [key: string]: unknown
    }
  }
  payload: {
    delegationManager: Address
    permissionContext: Hex
    delegator: Address
  }
}

export interface PaymentMiddlewareOptions {
  amount: string
  description?: string
  mimeType?: string
}
```

</TabItem>
</Tabs>

### 4. Verify the payment

Call the MetaMask facilitator's `verify` endpoint through the `verifyPayment` helper to confirm
the encoded delegation chain authorizes the requested resource. If verification fails, return
`402` with the failure reason from the facilitator so the buyer can correct the payment and retry.
If the facilitator itself is unreachable, return `502` so the buyer knows the failure is on the
seller side.

<Tabs>
<TabItem value = "src/middleware.ts">

```ts
// add-start
+ import { facilitatorPost } from './utils'
+ import type { VerifyResult } from './types'
// add-end

// add-start
+ function verifyPayment(
+   paymentPayload: PaymentPayload,
+   paymentRequirements: PaymentRequirements,
+ ): Promise<VerifyResult> {
+   return facilitatorPost('verify', { paymentPayload, paymentRequirements })
+ }
// add-end

 export function createPaymentMiddleware(options: PaymentMiddlewareOptions) {
   return async (req: Request, res: Response, next: NextFunction) => {
     // Additional code from previous step

// add-start
+    let verifyResult: VerifyResult
+    try {
+      verifyResult = await verifyPayment(paymentPayload, paymentRequirements)
+    } catch (err) {
+      const message = err instanceof Error ? err.message : 'Verification failed'
+      res.status(502).json({ error: message })
+      return
+    }
+
+    if (!verifyResult.isValid) {
+      res.status(402).json({
+        error: 'Payment verification failed',
+        reason: verifyResult.invalidReason,
+        message: verifyResult.invalidMessage,
+      })
+      return
+    }
// add-end

     next()
   }
 }
```

</TabItem>
<TabItem value = "src/utils.ts">

```ts
import { FACILITATOR_URL } from './config'

export async function facilitatorPost<T>(endpoint: string, body: object): Promise<T> {
  const res = await fetch(`${FACILITATOR_URL}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
    throw new Error(error.error || `Facilitator ${endpoint} failed: ${res.status}`)
  }
  return res.json()
}
```

</TabItem>
<TabItem value = "src/types.ts">

```ts
import type { Address } from 'viem'

export interface VerifyResult {
  isValid: boolean
  invalidReason?: string
  invalidMessage?: string
  payer?: Address
}
```

</TabItem>
</Tabs>

### 5. Settle the payment

After verification succeeds, settle the payment in the middleware through the `settlePayment`
helper before calling `next()`.
If settlement fails, return `402` with the facilitator error so the buyer can correct and retry.
If settlement succeeds, set the `PAYMENT-RESPONSE` header with the verified payer and scheme so
the buyer can correlate the result with the original request.

<Tabs>
<TabItem value = "src/middleware.ts">

```ts
// add-start
+ import type { SettleResult } from './types'
// add-end

// add-start
+ function settlePayment(
+   paymentPayload: PaymentPayload,
+   paymentRequirements: PaymentRequirements,
+ ): Promise<SettleResult> {
+   return facilitatorPost('settle', { paymentPayload, paymentRequirements })
+ }
// add-end

 export function createPaymentMiddleware(options: PaymentMiddlewareOptions) {
   return async (req: Request, res: Response, next: NextFunction) => {
     // Additional code from previous steps

// add-start
+    let settleResult: SettleResult
+    try {
+      settleResult = await settlePayment(paymentPayload, paymentRequirements)
+    } catch (err) {
+      const message = err instanceof Error ? err.message : 'Settlement failed'
+      res.status(502).json({ error: message })
+      return
+    }
+
+    if (!settleResult.success) {
+      res.status(402).json({
+        error: 'Payment settlement failed',
+        reason: settleResult.errorReason,
+        message: settleResult.errorMessage,
+      })
+      return
+    }
+
+    console.log('[x402] Settlement:', `tx ${settleResult.transaction}`)
+
+    const paymentResponse = {
+      x402Version: 2,
+      scheme: paymentRequirements.scheme,
+      network: NETWORK_ID,
+      payer: verifyResult.payer,
+    }
+    const encodedResponse = Buffer.from(JSON.stringify(paymentResponse)).toString('base64')
+    res.setHeader('PAYMENT-RESPONSE', encodedResponse)
// add-end

     next()
   }
 }
```

</TabItem>
<TabItem value = "src/types.ts">

```ts
import type { Address, Hex } from 'viem'

export interface SettleResult {
  success: boolean
  transaction?: Hex
  network?: string
  errorReason?: string
  errorMessage?: string
  payer?: Address
}
```

</TabItem>
</Tabs>

### 6. Configure the server

Mount the protected routes on an Express router gated by the middleware, then start the server.
The example returns `{ message: 'Hello!' }` as a placeholder. Replace it with whatever JSON payload
your protected route serves.

```ts
// src/index.ts (continued)
import { createPaymentMiddleware } from './middleware'

const api = express.Router()
api.use(
  createPaymentMiddleware({
    // 0.01 USDC in wei format.
    amount: '10000',
    description: 'Access to protected resource',
    mimeType: 'application/json',
  })
)

api.get('/hello', (_req: Request, res: Response) => {
  res.json({ message: 'Hello!' })
})

app.use('/api', api)

app.listen(4402, () => {
  console.log(`[seller] Server running on http://localhost:4402`)
})
```

## Next steps

- Learn more about [ERC-7710 delegation](../../concepts/delegation/overview.md).
- See the [x402 ERC-7710 specification](https://github.com/coinbase/x402/blob/main/specs/schemes/exact/scheme_exact_evm.md#3-assettransfermethod-erc-7710).
