---
description: Create a Web3 or IPFS API
sidebar_position: 2
---

# Create an API key

:::important API key restrictions

Based on your plan, Infura allows for the following amount of API keys:

- Free plan - Allows one API key.
- Developer plan - Allows up to five API keys.
- Team plans and higher - No limit on the number of API keys.

For more information, see to the [Infura pricing page](https://www.infura.io/pricing).

:::

Infura allows you to enable multiple network endpoints and expansion APIs for your API key. If calls are
made to a disabled network or service, then all requests to that network or service will fail.

To keep your account secure and cost effective, add only the necessary endpoints, as some have usage limits or charges based
on request volume.

To create an API key:

1. Open the [Infura dashboard](https://infura.io/dashboard). Enter your login details, if required.
1. Select **CREATE NEW API KEY**.

<div class="left-align-container">
<div class="img-large">
    <img
    src={require("../../images/create_key.png").default}
    />
</div>
</div>

1. From the pop-up window, provide a name, then click **CREATE**.
1. Select the networks that you want your API key to access, and select **Save Changes**.

You can [configure additional security](../how-to/secure-an-api/api-key-secret.md) for your API key by requiring an API key secret or JWTs with
each API request.

## Best practices for configuring API key endpoints

We recommend the following best practices when creating your API keys:

- Group API key endpoints by environment. For example, create seperate API keys for production or development environments.
- Group API key endpoints by groups or individuals [sharing the API key](../how-to/project-sharing.md).
- Limit the number of networks or services per API key only to the necessary endpoints.
- Group the API key endpoints based on shared security considerations such as
  [allowlists](../how-to/secure-an-api/use-an-allowlist.md) or
  [key request volume limits](../how-to/secure-an-api/set-rate-limits.md).
