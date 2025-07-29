---
description: Set rate limits to control access to the API key.
---

# Rate limits

Set credit rate limits to control access to the API key and to limit costs in case of a leaked API key.
Set rate limiting in the API key's **Settings** tab **Key Credit Limits** section.

<div class="left-align-container">
  <div class="img-large">
    <img
      src={require('../../../images/rate-limiting-settings.png').default}
    />
  </div>
</div>

- **Per second credit rate-limiting** restricts credits per second (throughput) for the API key. Set
    the maximum number of credits per second in whole numbers. When credits per second rate exceeds
    this value, requests are rejected. When the credit rate drops below the limit, requests
    are accepted again.

    The value `0` means default limits are applied.

- **Per day total credits** restricts total daily credit usage for the API key. Set a limit on the number of
    credits per day in integers, for example, 20000. The value `0` means default limits are applied.

    When the number of used credits reaches this limit, all requests will be rejected until the next day (00:00 UTC).

If you exceed the specified limits, you'll receive a JSON response with an
[HTTP error status code `429`](/services/reference/ethereum/json-rpc-methods#http-errors). For example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": 429,
    "event": -33300,
    "message": "Too Many Requests",
    "details": "You have surpassed your user-defined key throughput limit setting. To make more requests with this key, review key setting configurations."
  }
}
```
