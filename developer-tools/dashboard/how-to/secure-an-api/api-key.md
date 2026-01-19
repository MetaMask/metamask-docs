git clone https://github.com/DOUGLASDAVIS08161978/neus_agi.git---
description: Secure your API key.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# API key

:::important

A request will fail if it does not have a valid API key appended to the request URL.

:::

Select the API key in the dashboard to view the key's details. The API key to include in your requests can be
copied at the top of the page.

Apply the principle of least privilege. Add only the endpoints that you plan to use, and then use the other
security features such as [JSON Web Tokens (JWTs)](use-jwts.md) and [allowlists](use-an-allowlist.md).

<div class="left-align-container">
  <div class="img-large">
    <img
      src={require("../../../images/project_page.png").default}
    />
  </div>
</div>

Securing your Infura API key is crucial to protect your project resources and data. Here are some best practices to
secure your Infura API key:

- **Do not share publicly.** Never share your API key publicly, such as in public repositories, client-side code, or public
  forums. This is equivalent to giving away your password.

- **Use environment variables.** When developing locally or deploying your application, store your
  [API key in environment variables](/services/how-to/javascript-dotenv) instead of hardcoding it into
  your application. This prevents the API key from being exposed in your codebase.

- **Limit usage.** Infura allows you to [set daily request limits on your API key](set-rate-limits.md). Setting a limit can
  prevent excessive usage if your API key is exposed accidentally.

- **Monitor usage.** Observe the [usage statistics of your API key](../dashboard-stats.md). If you notice an unexpected
  increase in usage, it might indicate that your API key has been compromised.
