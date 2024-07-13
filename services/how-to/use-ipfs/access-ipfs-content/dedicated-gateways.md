# Dedicated gateways

Dedicated gateways are project-specific.

:::info

You can only use dedicated gateways to access IPFS content, not to upload content. See [how to manage IPFS content](../manage-files.md).

:::

### Enable dedicated gateway

Go to your IPFS project settings.

Toggle **DEDICATED GATEWAYS** to enable.

<div class="left-align-container">
  <div class="img-large">
    <img
      src={require("../../../images/image.png").default}
      alt="Dedicated gateways in project settings"
    />
  </div>
</div>

### Choose a unique subdomain

The Infura dedicated gateway URL structure:

```
https://<CUSTOM-SUBDOMAIN>.infura-ipfs.io/ipfs/<Content-Identifier>/<optional path to resource>
```

For example, `https://meme-nft.infura-ipfs.io/ipfs/QmW5sPVbZDueZwvSuibteAwDFwFXhF8gebfptGBx1DZq1j`.

Enter a **UNIQUE SUBDOMAIN NAME** for your dedicated gateway and click **SAVE SUBDOMAIN**.

<div class="left-align-container">
  <div class="img-large">
    <img
      src={require("../../../images/unique-subdomain.png").default}
      alt="Enter unique subdomain"
    /
  </div>
</div>

:::info Subdomain format

- Subdomain length must be \<\= 63 characters.
- Subdomain must contain letters, numbers and dashes; matching the following regex: ^\[a-z0-9-]\*$.

:::

:::info Subdomain restrictions

- An account is allowed a maximum of 20 unique subdomains across all IPFS projects.
- One active subdomain allowed per project.
- Subdomains are reusable.

:::

Infura runs an automated check to ensure that the name is unique.

If the name is unique, a green box informs you that your project settings have been updated successfully.

:::info

You can rename your unique subdomain by typing over the current name.

:::

### Show only pinned content

Optional: check the **Pinned Content Only** box to restrict the gateway to respond with [pinned content](../manage-files.md#pin-a-file) only.

:::info

IPFS pinning allows you to retain and persist data on IPFS nodes. Pinning assures that data is accessible indefinitely, and not removed during the [IPFS garbage collection process](https://docs.ipfs.io/concepts/persistence/#garbage-collection).

:::

### Disable gateway

To disable a gateway, slide the **ENABLED** toggle left and confirm.

Things to note when disabling a gateway:

- The gateway is only disabled, not deleted, and you can use it again.
- Traffic is blocked and all settings are lost.
- To create a new gateway, switch the toggle to `Enabled` again.
- To re-enable the disabled gateway, switch the toggle to `Enabled` and use the same gateway name as before.
- Re-enabling and renaming both count towards the 20 name maximum.

:::info

Don't forget to communicate new gateway names to your customers.

:::

### Security settings

The dedicated gateway copies existing project security settings.

## Stats and billing

The dedicated gateway, and API calls, both count in stats and billing.

Traffic is billed at the same price as access to IPFS via the Infura API:

- 5GB of storage free.
- 5GB data transfer up free.
- 5GB data transfer down free.

Anything above those limits are charged at:

- Unlimited storage at **$0.08/GB/month.**
- Unlimited data transfer at **$0.12/GB/month.**
