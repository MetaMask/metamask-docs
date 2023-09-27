---
sidebar_position: 1
sidebar_label: SDK connections
---

# MetaMask SDK connections

## Connection flow

The connection flow between the SDK and MetaMask Mobile depends on the device the dapp is on:

- The dapp and MetaMask Mobile are on different devices (for example, a desktop web dapp):

  1. The dapp shows a modal where the user is asked to select if they want to connect to MetaMask using
      the browser extension or MetaMask Mobile.
  
  2. If the user selects extension:
  
      1. If the extension is not installed, the user is taken to the Chrome extension store where the
          extension can be downloaded/installed.
     
      2. If it's already installed then the flow continues at it would normally do with MM Extension.
     
  3. If user selects MM Mobile app:
  
      1. If the MM mobile app is not installed, the user is taken to the Apple/Google app stores to
          download and install it.
     
      2. If the MM mobile app is already installed, the connection is established as described in
          the paragraph below.
   
  :::note
  The choice between MM Extension and MM mobile app is persisted unless the user or the dapp disconnects. At that point the user is again shown with the modal asking to select which client to use.
  :::

- Dapp and MetaMask Mobile are on the same device (for example, a mobile web dapp or mobile dapp):

  1. Dapp deeplinks to MM Mobile app:

      1. If the MM mobile app is not installed, the user is taken to the Apple/Google app stores to
          download and install it.
     
      2. If the MM mobile app is already installed, the connection is established as described in
          the paragraph below.

### Dapp MetaMask Mobile encrypted connection

When mobile connection is selected this is how the encrypted connection is established:

1. Dapp generates a UUID v4 (Socket.io room id)
2. Dapp generates a ECIES key pair
3. Dapp connects to Socket.io server on room id
4. Dapp shows QRCode/sends deep link with public key and room id
5. MM Mobile app opens QRCode/deeplink
6. MM Mobile app connects to Socket.io room id
7. MM Mobile app generates ECIES key pair
8. ECIES Keys Exchange
9. Encrypted communication starts (RPC Methods, etc)
   ​
   On Android SDK, the socket.io communication is not used but there's a direct (encrypted) local communication between the mobile app using the Android SDK and the MM mobile app. Read more on Android SDK documentation.

The SDK uses elliptic curve integrated encryption scheme (ECIES) to communicate with MetaMask Mobile.
ECIES is a hybrid encryption scheme that combines the benefits of both symmetric and asymmetric encryption.
It's a secure method of exchanging encrypted messages between two parties.

In ECIES, the sender (your dapp) generates a shared secret using the recipient's (MetaMask Mobile's)
public key and their own private key.
The shared secret is used to encrypt the message using a symmetric cipher (the SDK uses `AES-256-GCM`).
The encrypted message is then combined with a message authentication code (MAC) and sent to the recipient.

MetaMask Mobile uses its private key and the dapp's public key to recreate the shared secret and
decrypt the message.
The MAC is used to verify the authenticity of the message.

One of the main benefits of ECIES is that it allows the sender and recipient to exchange messages
without having to exchange a shared secret beforehand.
It also provides security against eavesdropping and tampering, since the shared secret is derived
from the sender's and recipient's private keys, which are both kept secret.

## Connection status

The connection between the SDK and MetaMask Mobile can [pause](#paused-connections) and
[clear](#cleared-connections).

### Paused connections

Connections pause after MetaMask Mobile is in background (minimized) for 20 seconds.
This is to accommodate OS restrictions.

When a connection pauses, all traffic to MetaMask Mobile pauses, and the SDK doesn't produce any
response until the user opens MetaMask Mobile again.
The SDK automatically deeplinks to MetaMask Mobile, so connections resume automatically.
If MetaMask Mobile is paused and the user completely closes MetaMask Mobile, the connection remains
paused and resumes when the user opens it again.

Because of this, polling data from MetaMask Mobile may not work for long periods of time.

:::info known issue
When MetaMask Mobile is running in the background, the connection may pause and fail to resume properly when the user reopens MetaMask.
The user must return to your dapp so the request is re-sent.
The SDK team is working on this issue, and is researching decentralized communication solutions that
hold state such as [Waku](https://waku.org/).
:::

### Cleared connections

Connections clear if the user closes or refreshes your dapp, since MetaMask doesn't persist
connections on the dapp side.
This is for simplicity and security purposes.

If the user completely closes MetaMask Mobile without [pausing the connection](#paused-connections)
first, MetaMask infers that the user isn't using the wallet and closes the connection.

#### Close connections manually

To close connections manually from MetaMask Mobile, go to **Settings > Experimental**, and select
**Clear MetaMask SDK connections**.
