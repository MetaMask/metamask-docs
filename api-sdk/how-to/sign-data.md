import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sign data

Since MetaMask makes cryptographic keys available to each user, websites can use these signatures
for a variety of uses.
Here are a few guides related to specific use cases:

- [Authenticating websites](https://medium.com/hackernoon/writing-for-blockchain-wallet-signature-request-messages-6ede721160d5)
- [Signing off-chain messages for an on-chain protocol](https://medium.com/metamask/our-metatransaction-hackathon-winner-a620551ccb9b)

There are currently six signing methods:

- `eth_sign`
- `personal_sign`
- `signTypedData` (currently identical to `signTypedData_v1`)
- `signTypedData_v1`
- `signTypedData_v3`
- `signTypedData_v4`

We recommend using `signTypedData_v4` for most use cases.
Read more about the [history of the signing methods](../concepts/signing-methods.md).

:::note
MetaMask supports signing transactions with Trezor and Ledger hardware wallets.
These hardware wallets currently only support signing data using the `personal_sign` method.
If you have trouble logging in to a website or dapp when using a Ledger or Trezor, the site may be
requesting you to sign data via an unsupported method, in which case we recommend using your
standard MetaMask account.
:::

## Sign typed data message parameters

- `domain`: Domain or domain signature.
  This:
    - Is only accepted for a specific website/contract.
    - Makes sure signatures are valid only where they are intended to be valid.
    - Allows you to have a unique contract that verifies the address.
    - Is a bunch of information that restricts where the signature is valid.
    - Is the domain of validity. It could be a contract, URL, etc.
    - Contains specifically what the dapp tells you.
    - Makes sure your signature(s) don't collide with other signatures.
- `chainId`: Chain ID.
  This makes sure signatures signed on one chain aren't valid on another chain.
- `name`: This parameter is primarily for UX purposes.
  For example, as a user, if you're using an Ether Mail app and a dialog comes up for Cryptokitties
  exchange, this would arouse suspicion due to what the name is on the signature.
- `verifyingContract`: This is an extra layer of assurance.
  Even if two developers end up creating an app with the same name, they will never have the same
  contract address.
  If you're unsure of the name, this shows the contract responsible for message verification.
  This field also takes a URL.
- `version`: Current version of the domain object.
- `message`: This parameter is completely open to any structure.
  Every field is optional.

## Example

This is an example of signing typed data with MetaMask.
See the [reference](https://metamask.github.io/test-dapp/#signTypedDataV4).

<Tabs>
<TabItem value="html" label="HTML" default>

```html
<div>
  <h3>Sign Typed Data V4</h3>
  <button type="button" id="signTypedDataV4Button">sign typed data v4</button>
</div>
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
signTypedDataV4Button.addEventListener('click', async function (event) {
  event.preventDefault();

  const msgParams = JSON.stringify({
    domain: {
      // Defining the chain aka Rinkeby testnet or Ethereum Main Net
      chainId: 1,
      // Give a user friendly name to the specific contract you are signing for.
      name: 'Ether Mail',
      // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
      verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      // Just let's you know the latest version. Definitely make sure the field name is correct.
      version: '1',
    },

    // Defining the message signing data content.
    message: {
      /*
       - Anything you want. Just a JSON Blob that encodes the data you want to send
       - No required fields
       - This is DApp Specific
       - Be as explicit as possible when building out the message schema.
      */
      contents: 'Hello, Bob!',
      attachedMoneyInEth: 4.2,
      from: {
        name: 'Cow',
        wallets: [
          '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
          '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
        ],
      },
      to: [
        {
          name: 'Bob',
          wallets: [
            '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
            '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
            '0xB0B0b0b0b0b0B000000000000000000000000000',
          ],
        },
      ],
    },
    // Refers to the keys of the *types* object below.
    primaryType: 'Mail',
    types: {
      // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      // Not an EIP712Domain definition
      Group: [
        { name: 'name', type: 'string' },
        { name: 'members', type: 'Person[]' },
      ],
      // Refer to PrimaryType
      Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person[]' },
        { name: 'contents', type: 'string' },
      ],
      // Not an EIP712Domain definition
      Person: [
        { name: 'name', type: 'string' },
        { name: 'wallets', type: 'address[]' },
      ],
    },
  });

  var from = await web3.eth.getAccounts();

  var params = [from[0], msgParams];
  var method = 'eth_signTypedData_v4';

  web3.currentProvider.sendAsync(
    {
      method,
      params,
      from: from[0],
    },
    function (err, result) {
      if (err) return console.dir(err);
      if (result.error) {
        alert(result.error.message);
      }
      if (result.error) return console.error('ERROR', result);
      console.log('TYPED SIGNED:' + JSON.stringify(result.result));

      const recovered = sigUtil.recoverTypedSignature_v4({
        data: JSON.parse(msgParams),
        sig: result.result,
      });

      if (
        ethUtil.toChecksumAddress(recovered) === ethUtil.toChecksumAddress(from)
      ) {
        alert('Successfully recovered signer as ' + from);
      } else {
        alert(
          'Failed to verify signer when comparing ' + result + ' to ' + from
        );
      }
    }
  );
});
```

</TabItem>
</Tabs>
