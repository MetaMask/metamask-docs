---
description: Caveat Enforcer Client API reference.
sidebar_label: Caveat Enforcer Client
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Caveat Enforcer Client

The following API methods are related to `CaveatEnforcerClient` used to [check the delegation state](../../guides/delegation/check-delegation-state.md).

## `createCaveatEnforcerClient`

Create a Viem Client extended with caveat enforcer actions. This client allows you to interact with the caveat enforcers of the 
delegation, and read the required state.

### Parameters

| Name          | Type                   | Required | Description |
| ------------- | ---------------------- | -------- | ----------- |
| `client`      | `Client`               | Yes      | The Viem Client to interact with the caveat enforcer contracts and read their state. |
| `environment` | `DeleGatorEnvironment` | Yes      | Environment to resolve the smart contracts for the current chain.       |

### Example

<Tabs>
<TabItem value="example.ts">

```typescript
import { environment, publicClient as client } from './config.ts'
import { createCaveatEnforcerClient } from '@metamask/delegation-toolkit'

const caveatEnforcerClient = createCaveatEnforcerClient({
  environment,
  client,
})
```

</TabItem>
<TabItem value="config.ts">

```typescript
import { sepolia as chain } from 'viem/chains'
import { createPublicClient, http } from 'viem'
import { getDeleGatorEnvironment } from '@metamask/delegation-toolkit'

export const environment = getDeleGatorEnvironment(chain.id)

export const publicClient = createPublicClient({
  chain,
  transport: http(),
})
```

</TabItem>
</Tabs>

## `getErc20PeriodTransferEnforcerAvailableAmount`

Returns the available amount from the ERC-20 period transfer enforcer for the current period.

### Parameters

| Name          | Type                   | Required | Description |
| ------------- | ---------------------- | -------- | ----------- |
| `delegation`  | `Delegation`           | Yes      | The delegation object for which you want to check the available amount. |

### Example

<Tabs>
<TabItem value="example.ts">

```typescript
import { delegation } './config.ts'

// Returns the available amount for current period. 
const { availableAmount } = await caveatEnforcerClient.getErc20PeriodTransferEnforcerAvailableAmount({
  delegation,
})
```

</TabItem>
<TabItem value="config.ts">

```typescript
import { createDelegation } from '@metamask/delegation-toolkit'
import { sepolia as chain } from 'viem/chains'
import { getDeleGatorEnvironment } from '@metamask/delegation-toolkit'

const environment = getDeleGatorEnvironment(chain.id)

export const delegation = createDelegation({
  scope: {
    type: 'erc20PeriodTransfer',
    tokenAddress: '0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da',
    periodAmount: 1000000000000000000n,
    periodDuration: 86400,
    startDate: 1743763600,
  },
  to: 'DELEGATE_ADDRESS',
  from: 'DELEGATOR_ADDRESS',
  environment,
})
```

</TabItem>
</Tabs>

## `getErc20StreamingEnforcerAvailableAmount`

Returns the available amount from the ERC-20 streaming enforcer.

### Parameters

| Name          | Type                   | Required | Description |
| ------------- | ---------------------- | -------- | ----------- |
| `delegation`  | `Delegation`           | Yes      | The delegation object for which you want to check the available amount. |

### Example

<Tabs>
<TabItem value="example.ts">

```typescript
import { delegation } './config.ts'

// Returns the available amount 
const { availableAmount } = await caveatEnforcerClient.getErc20StreamingEnforcerAvailableAmount({
  delegation,
})
```

</TabItem>
<TabItem value="config.ts">

```typescript
import { createDelegation } from '@metamask/delegation-toolkit'
import { sepolia as chain } from 'viem/chains'
import { getDeleGatorEnvironment } from '@metamask/delegation-toolkit'

const environment = getDeleGatorEnvironment(chain.id)

export const delegation = createDelegation({
  scope: {
    type: 'erc20Streaming',
    tokenAddress: '0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92',
    amountPerSecond: 100n,
    initialAmount: 1000000n,
    maxAmount: 10000000n,
    startTime: 1703980800,
  },
  to: 'DELEGATE_ADDRESS',
  from: 'DELEGATOR_ADDRESS',
  environment,
})
```

</TabItem>
</Tabs>

## `getNativeTokenPeriodTransferEnforcerAvailableAmount`

Returns the available amount from the native token period enforcer for the current period.

### Parameters

| Name          | Type                   | Required | Description |
| ------------- | ---------------------- | -------- | ----------- |
| `delegation`  | `Delegation`           | Yes      | The delegation object for which you want to check the available amount. |

### Example

<Tabs>
<TabItem value="example.ts">

```typescript
import { delegation } './config.ts'

// Returns the available amount for current period. 
const { availableAmount } = await caveatEnforcerClient.getNativeTokenPeriodTransferEnforcerAvailableAmount({
  delegation,
})
```

</TabItem>
<TabItem value="config.ts">

```typescript
import { createDelegation } from '@metamask/delegation-toolkit'
import { sepolia as chain } from 'viem/chains'
import { getDeleGatorEnvironment } from '@metamask/delegation-toolkit'

const environment = getDeleGatorEnvironment(chain.id)

export const delegation = createDelegation({
  scope: {
    type: 'nativeTokenPeriodTransfer',
    periodAmount: 1000000000000000000n,
    periodDuration: 86400,
    startDate: 1743763600,
  },
  to: 'DELEGATE_ADDRESS',
  from: 'DELEGATOR_ADDRESS',
  environment,
})
```

</TabItem>
</Tabs>

## `getNativeTokenStreamingEnforcerAvailableAmount`

Returns the available amount from the native streaming enforcer.

### Parameters

| Name          | Type                   | Required | Description |
| ------------- | ---------------------- | -------- | ----------- |
| `delegation`  | `Delegation`           | Yes      | The delegation object for which you want to check the available amount. |

### Example

<Tabs>
<TabItem value="example.ts">

```typescript
import { delegation } './config.ts'

// Returns the available amount 
const { availableAmount } = await caveatEnforcerClient.getNativeTokenStreamingEnforcerAvailableAmount({
  delegation,
})
```

</TabItem>
<TabItem value="config.ts">

```typescript
import { createDelegation } from '@metamask/delegation-toolkit'
import { sepolia as chain } from 'viem/chains'
import { getDeleGatorEnvironment } from '@metamask/delegation-toolkit'

const environment = getDeleGatorEnvironment(chain.id)

export const delegation = createDelegation({
  scope: {
    type: "nativeTokenStreaming",
    amountPerSecond: 100n,
    initialAmount: 1000000n,
    maxAmount: 10000000n,
    startTime: 1703980800,
  },
  to: 'DELEGATE_ADDRESS',
  from: 'DELEGATOR_ADDRESS',
  environment,
})
```

</TabItem>
</Tabs>