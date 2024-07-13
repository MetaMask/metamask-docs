---
description: Set rate limits to control access to the API key.
---

# Rate limits

Set rate limits to control access to the API key and to limit costs in case of a leaked API key. Set rate limiting in the API key's
**Settings** tab **REQUESTS** section.

<div class="left-align-container">
  <div class="img-medium">
    <img
      src={require("../../../images/rate-limiting-settings.png").default}
    />
  </div
</div>

- **PER SECOND REQUESTS RATE-LIMITING** restricts requests per second for the API key. Set the maximum number of requests per second in decimals, e.g. 1.2. Whenever the rate of requests exceeds this value, requests are rejected. When the rate of requests drops below the limit again, requests are accepted again.

  Decimal value 0.0 means default limits are applied.

- **PER DAY TOTAL REQUESTS** restricts total daily requests for the API key. Set a limit on number of requests per day in integers, e.g. 20000. Integer value 0 means default limits are applied.

  When the number of requests reach this limit, all requests will be rejected until the next day (00:00 UTC).
