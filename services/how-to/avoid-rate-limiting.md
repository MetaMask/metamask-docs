---
description: Tips on how to avoid rate limiting.
sidebar_position: 1
---

# Avoid rate limiting

Infura applies rate limiting account-wide after exceeding the [daily credit limit](../get-started/pricing/index.md)
or the number of credits per second (throughput). The rate limiting also applies to
[user-defined limits that you can configure in the dashboard](/developer-tools/dashboard/how-to/secure-an-api/set-rate-limits).

When you exceed your daily credit limit, Infura stops accepting further traffic and removes
access for the rest of the day, halting further usage. You'll need to upgrade your plan, or purchase
additional credit packs for more capacity.

If you've exceeded your allowed throughput limit, consider reducing the amount of requests per
second, or upgrade for more capacity.

Credit quota limits are reset every day at 00:00 UTC for all customers.

## Rate limit implications

Daily credit quota limits apply after reaching your daily credit allowance:

- Once you reach your daily request limit, your service will be halted for the rest of the day.
- The WebSocket service will sever connections.

### Notice rate limiting behavior?

You'll receive a JSON response with an HTTP status code `402` if you reach your daily credit limit. For example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": 402,
    "event": -33000,
    "message": "Payment Required",
    "details": "You have reached your daily credit limit. To continue making requests, upgrade your plan or purchase additional credits"
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
    "code": 429,
    "event": -33200,
    "message": "Too Many Requests",
    "details": "You have surpassed your allowed throughput limit. Reduce the amount of requests per second or upgrade for more capacity."
  }
}
```

### Tips to avoid rate limiting

We recommend pausing JSON-RPC activity if you surpass your request per second capacity.

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
