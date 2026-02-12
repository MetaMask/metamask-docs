---
description: Learn about the rate limits for IPFS requests.
sidebar_position: 5
---

# IPFS rate limits

API keys on Infura are subject to rate limits once they exceed a certain number of requests within a short time window.
These rate limits are in place to prevent abuse, ensure fair usage, and maintain the reliability of our services.

:::info

Current rate limits may change without notice.

:::

Authenticated requests associated with a particular project have more flexible rate limits and can make more requests per second.

## Authenticated API requests

Write API calls have a 150 requests per second limit for the following endpoints:

- `/api/v0/add`
- `/api/v0/block/put`
- `/api/v0/dag/put`
- `/api/v0/pin/add`

You can retrieve IPFS data using the API with a limit of 1500 requests per second for the remaining read-only methods such as:

- `/api/v0/cat`
- `/api/v0/get`
- `/api/v0/dag`

Read-only requests from a [dedicated gateway](access-ipfs-content/dedicated-gateways.md) have a limit of 100 requests per second.

If you would like a custom rate limit for requests per second, [contact us](https://www.infura.io/contact).
