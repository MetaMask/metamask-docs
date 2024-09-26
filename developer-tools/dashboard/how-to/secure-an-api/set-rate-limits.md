---
description: Set rate limits to control access to the API key.
---

# Rate limits

:::info

The credit pricing model replaces the request-based billing for free-tier (Core) customers.
**Existing paid customers will not be immediately affected and will continue to limit the number of requests per second**.

:::

Set credit rate limits to control access to the API key and to limit costs in case of a leaked API key.
Set rate limiting in the API key's **Settings** tab **Key Credit Limits** section.

<div class="left-align-container">
  <div class="img-large">
    <img
      src={require('../../../images/rate-limiting-settings.png').default}
    />
  </div>
</div>

- **PER SECOND CREDIT RATE-LIMITING** restricts credits per second (throughput) for the API key. Set
    the maximum number of credits per second in whole numbers. When credits per second rate exceeds
    this value, requests are rejected. When the credit rate drops below the limit, requests
    are accepted again.

    The value `0` means default limits are applied.

- **PER DAY TOTAL CREDITS** restricts total daily credit usage for the API key. Set a limit on number of
    credits per day in integers, e.g. 20000. The value `0` means default limits are applied.

    When the number of used credits reach this limit, all requests will be rejected until the next day (00:00 UTC).
