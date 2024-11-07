# Access IPFS content

Access files on the IPFS network with gateways.

[IPFS Gateways](https://docs.ipfs.io/concepts/ipfs-gateway/#overview) are HTTP-based services that access content residing on the IPFS network. They provide workarounds for applications—such as browsers, curl, and wget—that have no native support for IPFS.

For example, errors may occur when an application that does not support IPFS attempts to access content in the canonical form:

```
 ipfs://<Content-Identifier>/<optional path to resource>
```

A solution is to use a custom-built private gateway or an Infura project-specific dedicated gateway.

:::info

- [Content identifiers](https://docs.ipfs.io/concepts/content-addressing/) must use CIDv1 (not CIDv0) because some browsers
  and user agents force lowercase for the authority part of URLs.
- The Infura IPFS public gateway was deprecated on August 10, 2022.

:::
