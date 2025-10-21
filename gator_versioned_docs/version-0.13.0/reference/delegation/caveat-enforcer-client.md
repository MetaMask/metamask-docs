---
description: Caveat Enforcer Client API reference.
sidebar_label: Caveat Enforcer Client
toc_max_heading_level: 2
keywords: [delegation state, caveat enforcer client, API, methods, reference]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Caveat Enforcer Client reference

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

// Since current time is in seconds, we need to convert milliseconds to seconds.
const startDate = Math.floor(Date.now() / 1000)

export const delegation = createDelegation({
  scope: {
    type: 'erc20PeriodTransfer',
    tokenAddress: '0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da',
    periodAmount: parseUnits('10', 6),
    periodDuration: 86400,
    startDate,
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
import { parseUnits } from 'viem'

const environment = getDeleGatorEnvironment(chain.id)

// Since current time is in seconds, we need to convert milliseconds to seconds.
const startTime = Math.floor(Date.now() / 1000)

export const delegation = createDelegation({
  scope: {
    type: 'erc20Streaming',
    tokenAddress: '0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92',
    amountPerSecond: parseUnits('0.1', 6),
    initialAmount: parseUnits('1', 6),
    maxAmount: parseUnits('10', 6),
    startTime,
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
import { parseEther } from 'viem'
import { getDeleGatorEnvironment } from '@metamask/delegation-toolkit'

const environment = getDeleGatorEnvironment(chain.id)

// Since current time is in seconds, we need to convert milliseconds to seconds.
const startDate = Math.floor(Date.now() / 1000)

export const delegation = createDelegation({
  scope: {
    type: 'nativeTokenPeriodTransfer',
    periodAmount: parseEther('0.01', 6),
    periodDuration: 86400,
    startDate,
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

// Since current time is in seconds, we need to convert milliseconds to seconds.
const startTime = Math.floor(Date.now() / 1000)

export const delegation = createDelegation({
  scope: {
    type: "nativeTokenStreaming",
    amountPerSecond: parseEther('0.001'),
    initialAmount: parseEther('0.01'),
    maxAmount: parseEther('0.1'),
    startTime,
  },
  to: 'DELEGATE_ADDRESS',
  from: 'DELEGATOR_ADDRESS',
  environment,
})
```

</TabItem>
</Tabs>

## `getMultiTokenPeriodEnforcerAvailableAmount`

Returns the available amount from the multi token period transfer enforcer for the current period. You'll need to 
encode the args for the token index you want to check the available amount. 

### Parameters

| Name          | Type                   | Required | Description |
| ------------- | ---------------------- | -------- | ----------- |
| `delegation`  | `Delegation`           | Yes      | The delegation object with token index for which you want to check the available amount. |

### Example

<Tabs>
<TabItem value="example.ts">

```typescript
import { delegation } './config.ts'

// Encode the args for the multiTokenPeriod enforcer.
const args = encodePacked(['uint256'], [BigInt(0)]);

// Ensure the index is correct when working with multiple enforcers.
delegation.caveats[0].args = args

// Returns the available amount for the first token in the list.  
const { availableAmount } = await caveatEnforcerClient.getMultiTokenPeriodEnforcerAvailableAmount({
  delegation,
})
```

</TabItem>
<TabItem value="config.ts">

```typescript
import { createDelegation, getDeleGatorEnvironment, ROOT_AUTHORITY } from '@metamask/delegation-toolkit'
import { createCaveatBuilder } from '@metamask/delegation-toolkit/utils'
import { sepolia as chain } from 'viem/chains'
import { parseUnits, parseEther } from 'viem'

const environment = getDeleGatorEnvironment(chain.id)
const caveatBuilder = createCaveatBuilder(environment)

// Current time as start date. 
// Since startDate is in seconds, we need to convert milliseconds to seconds.
const startDate = Math.floor(Date.now() / 1000);

const tokenConfigs = [
  {
    token: "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da",
    // 1 token with 6 decimals.
    periodAmount: parseUnits('1', 6),
     // 1 day in seconds.
    periodDuration: 86400,
    startDate
  },
  {
    // For native token use zeroAddress
    token: zeroAddress,
    // 0.01 ETH in wei.
    periodAmount: parseEther('0.01'),
    // 1 hour in seconds.
    periodDuration: 3600,
    startDate
  }
]

const caveats = caveatBuilder.addCaveat({
  'multiTokenPeriod',
   tokenConfigs
})

export const delegation: Delegation =  {
  delegate: 'DELEGATE_ADDRESS',
  delegator: 'DELEGATOR_ADDRESS',
  authority: ROOT_AUTHORITY,
  caveats: caveats.build(),
  salt: '0x',
};
```

</TabItem>
</Tabs>
