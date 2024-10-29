---
description: Best practices for MetaMask Multichain 
sidebar_position: 2
---

# Best practices and recommendations

:::note
While your dapp can still interact with the existing EIP-1193 API (which is not optimized for Multichain), 
we recommend starting directly with the Multichain API (using``wallet_createSession) if possible.
Compatibility with the EIP-1193 API is mainly provided to help dapps that rely on third-party libraries with dependencies on EIP-1193.
:::

## Security considerations

- Always validate input parameters to ensure that they are correct and expected.
- Handle errors gracefully to avoid exposing sensitive information or causing crashes.
- Implement proper error messages that are informative yet secure for users.

## Performance optimization

- Cache frequently used data to reduce repeated operations and improve performance.
- Minimize unnecessary network requests to save bandwidth and reduce latency.
- Handle connection state changes efficiently to maintain a stable user experience.

## User experience

- Provide clear and immediate feedback for user actions to keep them informed.
- Display loading states during operations to show that the system is working.

## Testing

- Use test networks before deploying to mainnet to catch issues early in a safe environment.
- Verify all error scenarios to ensure the system behaves as expected under all conditions.