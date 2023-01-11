# MetaMask SDK

## Connections

### Lifecycle

When connecting with MetaMask Mobile wallet, it's important to understand when connections get paused, resumed and cleared.

#### Paused:

Connections get paused after the MetaMask Mobile app is in background (minimized) for 20 seconds. This is to accomodate OS restrictions and it means that all traffic into MetaMask Mobile gets paused and the SDK won't produce any response unless the MetaMask Mobile app is opened again. The SDK automatically deeplinks into MetaMask Mobile so connections should be resumed automatically.
If MetaMask Mobile is in pause mode and the user completely closes the app, the connection will be maintained in paused mode until it's opened again.

For this reason, polling data from the wallet may not work for long periods of time.

#### Cleared:

Connections get cleared if the dapp is closed or refreshed (in the case of a browser) as we don't persist connections on the dapp side. We did this for simplicity and for security purposes. We believe that creating a connection should be very easy so there is no need to persist, but this may change in the future.

If the MetaMask Mobile app is completely closed without entering pause mode first, we close the connection as we believe it means the user is no longer using the wallet for any further actions.

#### Close connections manually:

In order to close connections manually from the MetaMask Mobile app, you can go into

Settings -> Experimental

![Connections](../../assets/sdk-clear-connections.png)

## Communication layer

### Security

The security layer is handled via the use of **ECIES** encryption.

`Elliptic curve integrated encryption scheme` (ECIES) is a hybrid encryption scheme that combines the benefits of both symmetric and asymmetric encryption. It is a secure method of exchanging encrypted messages between two parties.

In ECIES, the sender (for example the **dAPP**) generates a shared secret using the recipient's public key (for example **MetaMask Mobile app**) and their own private key. The shared secret is used to encrypt the message using a symmetric cipher (the SDK used `AES-256-GCM`). The encrypted message is then combined with a message authentication code (`MAC`) and sent to the recipient.

MetaMask mobile app uses their private key and the dApp's public key to recreate the shared secret and decrypt the message. The MAC is used to verify the authenticity of the message.

One of the main benefits of ECIES is that it allows the sender and recipient to exchange messages without having to exchange a shared secret beforehand. It also provides security against eavesdropping and tampering, as the shared secret is derived from the sender's and recipient's private keys, which are both kept secret.

![Sequence diagram](../../assets/sdk-comm-diagram.svg)