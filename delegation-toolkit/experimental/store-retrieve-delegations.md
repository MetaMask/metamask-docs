---
description: Store and retrieve delegations using the `DelegationStorageClient`.
sidebar_position: 1
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Store and retrieve delegations

:::caution Experimental
This is an experimental feature and may change in future releases.
:::

You can use methods provided by the `DelegationStorageClient` of the MetaMask Delegation Toolkit to store and retrieve
[delegations](../concepts/delegation.md).

## Prerequisites

- [Install and set up the Delegation Toolkit.](../get-started/install.md)
- [Configure the Delegation Toolkit.](../how-to/configure.md)
- Ensure you have an API key and API key ID to interact with the `DelegationStorageClient`.
  If you need to gain access, email hellogators@consensys.net.

## Configure the storage client

Create the `DelegationStorageClient` instance, and configure it using your API key and API key ID.

```typescript
import { 
  DelegationStorageClient, 
  DelegationStorageEnvironment 
} from "@metamask/delegation-toolkit/experimental";

const delegationStorageClient = new DelegationStorageClient({
  apiKey: "<YOUR-API-KEY>",
  apiKeyId: "<YOUR-API-KEY-ID>",
  environment: DelegationStorageEnvironment.prod
});
```

## Store a delegation

To store a delegation, use the `storeDelegation` method of the `DelegationStorageClient`. This method takes one parameter:

1. `delegation` - A `Delegation` object representing the delegation to be stored.

### Example

<Tabs>
<TabItem value="example.ts">

```typescript
import { delegationStorageClient } from "./config.ts";

const delegationHash = await delegationStorageClient.storeDelegation(delegation);
```
</TabItem>

<TabItem value="config.ts">

```typescript
import { 
  DelegationStorageClient, 
  DelegationStorageEnvironment 
} from "@metamask/delegation-toolkit/experimental";

export const delegationStorageClient = new DelegationStorageClient({
  apiKey: "<YOUR-API-KEY>",
  apiKeyId: "<YOUR-API-KEY-ID>",
  environment: DelegationStorageEnvironment.prod
});
```
</TabItem>
</Tabs>

## Retrieve a delegation chain

To retrieve a delegation chain, use the `getDelegationChain` method of the `DelegationStorageClient`. This method takes one parameter:

1. `leafDelegationOrDelegationHash` - Either a `Delegation` object or the delegation hash as a hex string.

:::note
A delegation can be a root delegation, where its `authority` is `0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff`. It can also be a child of another delegation, where its `authority` is the hash of its parent delegation. This method returns the delegation referenced by `leafDelegationOrDelegationHash` and any ancestors.
:::

### Example

<Tabs>
<TabItem value="example.ts">

```typescript
import { delegationStorageClient } from "./config.ts";
import { getDelegationHashOffchain } from "@metamask/delegation-toolkit";

// Assuming you have the leaf delegation
const delegationHash = getDelegationHashOffchain(leafDelegation);

const delegationChain: Delegation[] = await delegationStorageClient.getDelegationChain(
  delegationHash
);
```
</TabItem>

<TabItem value="config.ts">

```typescript
import { 
  DelegationStorageClient, 
  DelegationStorageEnvironment 
} from "@metamask/delegation-toolkit/experimental";

export const delegationStorageClient = new DelegationStorageClient({
  apiKey: "<YOUR-API-KEY>",
  apiKeyId: "<YOUR-API-KEY-ID>",
  environment: DelegationStorageEnvironment.prod
});
```
</TabItem>
</Tabs>

## Retrieve delegations for a specific account

To retrieve delegations stored for a specific account, use the `fetchDelegations` method of the `DelegationStorageClient`. This method allows you to fetch delegations where the specified account is either the delegator or the delegate.
It takes two parameters:

1. `account` - The address of the account for which you want to retrieve delegations.
2. `filter` - The nature of the delegations. Possible values are:
    - `DelegationStoreFilter.Given` - For delegations where the specified `account` is the `delegator`.
    - `DelegationStoreFilter.Received` - For delegations where the specified `account` is the `delegate`.

### Example

<Tabs>
<TabItem value="example.ts">

```typescript
import { delegationStorageClient } from "./config.ts";

const address = "0x027aeAFF3E5C33c4018FDD302c20a1B83aDCD96C"

// Fetch the delegations given by address.
const grantedDelegations = await delegationStorageClient.fetchDelegations(
  address,
  DelegationStoreFilter.Given,
);

// Fetch the delegations received by the address.
const receivedDelegations = await delegationStore.fetchDelegations(
  address,
  DelegationStoreFilter.Received,
);
```
</TabItem>

<TabItem value="config.ts">

```typescript
import { 
  DelegationStorageClient, 
  DelegationStorageEnvironment 
} from "@metamask/delegation-toolkit/experimental";

export const delegationStorageClient = new DelegationStorageClient({
  apiKey: "<YOUR-API-KEY>",
  apiKeyId: "<YOUR-API-KEY-ID>",
  environment: DelegationStorageEnvironment.prod
});
```
</TabItem>
</Tabs>
