---
title: 'MetaMask Connect Architecture - Platform Detection and Session Routing'
sidebar_label: Architecture
description: Understand how MetaMask Connect detects platforms, selects transports, creates encrypted sessions, and persists connections across page reloads.
keywords:
  [
    connect,
    sdk,
    architecture,
    platform detection,
    relay,
    session,
    end-to-end encryption,
    transport layer,
    websocket relay,
    session persistence,
    connection flow,
  ]
---

# Architecture

MetaMask Connect manages the full connection lifecycle between your dapp and the MetaMask wallet. It detects the user's platform, selects the best transport (direct extension, QR code relay, or deeplink), creates an encrypted CAIP-25 session, and persists that session across page reloads. All relay traffic is end-to-end encrypted so the relay server never sees message content.

When a user connects, MetaMask Connect automatically handles the following:

1. **Platform detection**: Checks for the MetaMask extension, browser type, and device.
2. **Transport selection**: Connects directly to the extension, or falls back to a QR code or deeplink relay.
3. **Session creation**: Establishes a [CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md) session for the requested chains.
4. **End-to-end encryption**: Encrypts relay connections so the relay server never sees message content.
5. **Session persistence**: Preserves sessions across page reloads and new tabs.

The following diagram illustrates this:

<p align="center">

```mermaid
flowchart TB
    subgraph dapp [Your dapp]
        SDK[MetaMask Connect]
    end

    subgraph detection [Platform detection]
        SDK --> ExtCheck{Extension present?}
    end

    ExtCheck -->|Yes| DirectExt[Direct extension communication]
    ExtCheck -->|No| MobileCheck{Mobile browser?}

    MobileCheck -->|Yes| Deeplink[Deeplink to mobile app]
    MobileCheck -->|No| QRCode[QR code and relay]

    DirectExt --> Extension[MetaMask browser extension]
    Deeplink --> Relay[E2E encrypted relay]
    QRCode --> Relay

    Relay --> MobileApp[MetaMask mobile app]

    Extension --> Session[Multichain session]
    MobileApp --> Session
```

</p>

## Next steps

- [Explore integration options.](./integration-options.md)
- [View supported platforms and connection methods.](./supported-platforms.md)
- [Get started with EVM networks.](./evm/index.mdx)
