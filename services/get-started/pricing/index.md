---
description: Infura's credit pricing model.
---

# Pricing

:::info

The credit pricing model replaces request-based billing for free-tier (Core) customers. Customers on
Developer and Team plans will be transitioned to the credit model on September 30, 2024.

**Existing customers on Growth and Custom plans will remain on request-based billing**.

:::

Infura's credit pricing model introduces a more accurate and transparent pricing structure by assigning
specific credit values to each request, based on computational complexity.

Infura users get a fixed allocated daily credit quota as part of their subscription plan, which they can
use toward any combination of requests, allowing for more precise budgeting and resource management.
This shift not only provides greater flexibility but also encourages efficient use of resources.

:::tip

View the [credit cost table](./credit-cost.md) for a breakdown of the cost for each method.

:::

## Credit pricing considerations

Depending on the type of requests, the credit pricing model might have unique ways of counting
credits toward your daily credit quota:

- [**WebSocket streaming**](../../concepts/websockets.md#pricing): Subscribing and unsubscribing to events consume credits from your
    daily quota. Each event received through a WebSocket connection also
    [consumes credits based on the event type](./credit-cost.md#subscription-events).
    WebSocket connections are severed once you reach your daily credit limit.

- [**Batch requests**](../../how-to/make-batch-requests.md): Each individual RPC call
    within a batch call consumes credits (including the batch call itself).

- [**Archive requests**](../../concepts/archive-data.md): Accessing archive data (older than 128 blocks)
    currently consumes the same amount of credits as non-archive data, however, this might change in the future.

## Infura plans

The following credit plans are available for new customers:

- **Free tier**: 6,000,000 daily credits, and 2,000 credits per second rate limit.
- **Developer**: 15,000,000 daily credits, and 4,000 credits per second rate limit.
- **Team**: 75,000,000 daily credits, and 40,000 credits per second rate limit.
- **Custom**: [Contact us](https://www.infura.io/contact) to determine the custom plan for your requirements.

:::info important
The existing Growth plan is no longer available to new Infura customers.
:::
