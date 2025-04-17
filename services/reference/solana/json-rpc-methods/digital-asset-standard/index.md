---
title: Digital Asset Standard (DAS) API
---

DAS APIs provides an interface for interacting with digital assets such as fungible tokens, regular
NFTs, and compressed NFTs.

Use the pagination and sort options available to some API methods that return a large amount on data.

:::info
Infura does not currently support `params` as a JSON object.
Instead, parameters must be passed as a positional array, following the exact order defined in the method's specification. This may differ from some other providers, where parameters are typically wrapped in an object containing key/value pairs.
:::

## Supported DAS methods

Infura supports the following DAS API methods:

- [`getAsset`](./getasset.mdx)
- [`getAssetProof`](./getassetproof.mdx)
- [`getAssetProofBatch`](./getassetproofbatch.mdx)
- [`getAssets`](./getassets.mdx)
- [`getAssetsByAuthority`](./getassetsbyauthority.mdx)
- [`getAssetsByCreator`](./getassetsbycreator.mdx)
- [`getAssetsByGroup`](./getassetsbygroup.mdx)
- [`getAssetsByOwner`](./getassetsbyowner.mdx)
- [`getAssetSignatures`](./getassetsignatures.mdx)
- [`getNftEditions`](./getnfteditions.mdx)
- [`getTokenAccounts`](./gettokenaccounts.mdx)
- [`searchAssets`](./searchassets.mdx)

## Pagination options

Use pagination to manage large result sets and control how data is returned.

- **By page**: Use when you want to access results in fixed-size pages (for example, when
    displaying  data in a paged UI). Requires the `page` parameter and can be combined with a `limit`.
- **By cursor**: Use for efficient pagination through a large or frequently changing dataset.
    Requires a `cursor` value from a previous response.
- **By range**: Use when you need to retrieve results within a specific time or ID range.
    Requires `before` or `after` parameters. Useful for narrowing a query.

## Sorting options

Control the order in which results are returned. Sorting may affect performance.

- **`id`**: Sorts results by ID. Useful when IDs are incremental and correlate with creation order.
- **`created`**: Sorts results by creation timestamp. Use this to get the oldest or newest records
    first.
- **`recent_action`**: Sorts by the timestamp of the most recent update or event. Helpful when
    tracking activity or status changes.
- **`none`**: No sorting applied. Use for faster responses when order doesn’t matter.

## Sort direction

Define how sorted results are ordered.

- **`asc`**: Sorts in ascending order (for example, from oldest to newest).
- **`desc`**: Sorts in descending order (for example, from newest to oldest). Often used to show the most recent results first.
