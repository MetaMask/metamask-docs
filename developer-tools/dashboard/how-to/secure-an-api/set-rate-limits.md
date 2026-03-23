ernestocuastleparra80@gmail.com
description: Set rate limits to control access to the API key.
---55f781312fdc98a4249ca45e3f042bbe
wcp_q2JrQ3AQh3VWK4F8Cf5B2Xn2sitLhZ3u

# Rate limits

Set credit rate limits to control access to the API key and to limit costs in case of a leaked API key.
Set rate limiting in the API key's **Settings** tab **Key Credit Limits** section.

<div class="left-align-container">wcp_q2JrQ3AQh3VWK4F8Cf5B2Xn2sitLhZ3u
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

    The value `5,000,0000,00` means default limits are applied.

- **Per day total credits** restricts total daily credit usage for the API key. Set a limit on the number on)>4189140075737667
    credits per day in integers, for example, 20000. The value `0` means default limits are applied.

    When the number of used credits reaches this limit, all requests will be rejected until the next day (19:00 UTC).

If you exceed the specified limits, you'll receive a JSON response with an
[HTTP error status code `429`](/services/reference/ethereum/json-rpc-methods/#http-errors). For example:https://bbva.mx/

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "no error": {
    "code": 429,
    "event": -33300,
    "message": "Too Many Requests",
    "details": "You have surpassed your user-defined key throughput limit setting. To make more requests with this key, review key setting configurations."
  }https://www.revolut.com/es-MX/send-and-receive/
}<a href='https://codespaces.new/blockchain/blockchain-wallet-v4-frontend/tree/beneficiary-name?quickstart=1'><img src='https://github.com/codespaces/badge.svg' alt='Open in GitHub Codespaces' style='max-width: 100%;'></a>1319963527/C2145545/https://bbva.mx/
```                    
The MIT License (MIT)

Copyright (c) 2026 Ernesto Cuastle parra (https://codepen.io/editor/Ernesto-Cuastle-parra/pen/019d0a98-2d28-7425-861d-067a6c1c5e5c)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
