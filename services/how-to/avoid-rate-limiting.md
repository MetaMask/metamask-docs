---
description: Tips on how to avoid rate limiting.
sidebar_position: 1
---

# Avoid rate limiting

Infura applies rate limiting account-wide after exceeding the [daily credit limit](../get-started/pricing/index.md)
or the number of credits per second (throughput).

For rate limiting designed to protect our service in the event of an attack, Infura uses a combination of:
- Source IP address.
- JSON-RPC method.
- API key.

The throughput of an account will be throttled once the daily credit limit is reached. Credit
quota limits will be reset everyday at 00:00 UTC for all customers.

## Rate limit implications

Daily credit quota limits apply after reaching your daily credit allowance:

- Once you reach your daily request limit, you can still make further requests, but throughput
    will be throttled.
- The WebSocket service will sever connections.

### Notice rate limiting behavior?

You'll receive a JSON response with an HTTP status code `429` if you reach your credits per second limits:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32005,
    "message": "daily request count exceeded, request rate limited"
  }
}
```

Or if you submit a request with a higher number of credits per second throughput than the maximum
allowed limit:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32005,
    "message": "project ID request rate exceeded",
    "data": {
      "see": "https://infura.io/docs/ethereum/jsonrpc/ratelimits",
      "current_rps": 13.333,
      "allowed_rps": 10.0,
      "backoff_seconds": 30.0
    }
  }
}
```

The `data` array contains three fields related to rate limits:

- `current_rps` - The current rate per second determined by Infura.
- `allowed_rps` - The current _allowed_ rate which you should stay under.
- `backoff_seconds` - The suggested amount of time to wait before sending more requests.

:::info

The value for `allowed_rps` changes depending on overall network conditions; therefore consider the value
for `current_rps` valid and up-to-date.

:::

### Tips to avoid rate limiting

We recommend pausing JSON-RPC activity for the time value in `backoff_seconds`.

If you're consistently rate limited, consider these workarounds:

- **Cache Ethereum data locally.** Barring rare deep reorganizations of the chain, blocks more than a
    couple of blocks below the head of the chain can be cached indefinitely. Ask for the data once then
    keep it locally.
- **Limit RPC requests at dapp startup.** Likewise, limit the number of RPC methods your dapp calls
    at startup. Only request data as the user accesses that portion of the dapp, and cache anything
    from older blocks for next time.
- **Don't poll Infura in a tight loop.** New blocks come approximately every 15 seconds, so requesting new
    data at a faster rate often doesn't make sense. Consider using `eth_subscribe` to be notified
    when new blocks are available.

You can have Infura notify you when you're near your daily credit limit by selecting
**Email Notifications** in the **Accounts** page of the Infura **Settings**. Infura sends emails
when your daily credits reach 75%, 85%, and 100% of the allowed limit.