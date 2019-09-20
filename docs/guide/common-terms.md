# Common Terms

## Words are Hard
This is a list of terms you might encounter when using the MetaMask interface.

### Wallet
* The interface / client / wrapper / holder that you use to manage your account(s).
* Example: MetaMask.io, your Ledger Hardware Wallet, a Multisig Wallet Contract.

### Account
* A public & private keypair that "holds" your funds.
* Your funds are actually stored on the blockchain, not in the wallet or account.
* Just like your Reddit account has a `username (public)` and `password (private)`, so does your Ethereum account. For additional security, you can use a password to encrypt your private key which would result in a `username (public)` and `password (private)` and `password for that password (private + more secure)`. See the `Keystore File` section.

### Address ("Public Key")
* You use this to send funds to an account.
* Sometimes referred to as the "public key"
* A string made up of `0x` + `40 hexadecimal characters`.
* In Ethereum, the address begins with `0x`.
* Example: `0x06A85356DCb5b307096726FB86A78c59D38e08ee`

### Public Key
* In cryptography, you have a keypair: the public and private key.
* You can derive a public key from a private key, but cannot derive a private key from a public key.
* (Advanced) In Ethereum, the address "acts" like the public key, but it's not actually the public key.
* (Advanced) In Ethereum, the public key is derived from the private key and is 128 hex characters. You then take the `"SHA3" (Keccak-256)` hash of this (64 characters), take the last 40 characters, and prefix with 0x, give you your 42-character address.

### Keystore File
* Encrypted version of your private key in JSON format (though it does not have a JSON extension)
* A fancy version of your private key that is protected by a password of your choosing.
* When combined with the password, it has the private key.
* Safer than a private key because you need the password.
* File name usually is in the format `UTC` + `--` + `DATE_CREATED` + `--` + `YOUR_ADDRESS_WITHOUT_THE_OX`
* Example of File Name: `UTC--2017-07-02T20-33-09.177Z--06a85356dcb5b307096726fb86a78c59d38e08ee`
* (pw: `mypassword`)
* Example of Contents: 

``` json 
{
  "version":3,
  "id":"aa811d53-fe9a-44a2-bd1c-e737007b5591",
  "address":"06a85356dcb5b307096726fb86a78c59d38e08ee",
  "Crypto": {
    "ciphertext":"f5a7cc8d4b8cf93510b0d0d057f3a52ac79fd48e619e0638c4ffd978ca180248",
    "cipherparams": {
      "iv":"975ab00192e2dd74170e91ca59c0b0bd"
    },
    "cipher":"aes-128-ctr",
    "kdf":"scrypt",
    "kdfparams": {
      "dklen":32,"salt":"0210f0d0b99e440dfbceb36373304638bac093a367ee7da6411cd165f7aa907a",
      "n":1024,
      "r":8,
      "p":1
    },
    "mac":"8197a747a3855a10546a2ff939c36470daed78e393b670efa0c12fe3b23dd7e3"
  }
}
```

### Mnemonic Phrase / Seed Phrase / Seed Words
* Another fancy version of your private key, that is actually used to derive multiple private keys.
* A (typically) 12 or 24 word phrase that allows you to access infinite number of accounts.
* Used by Ledger, TREZOR, MetaMask, Jaxx, and others.
* Originates from BIP 39 Spec.
* The accounts you can access with this phrase are determined by the "path".
* Example 12-words: 
```
brain surround have swap horror body response double fire dumb bring hazard
```
* Example 24-words: 
```
card enrich gesture connect kick topple fan body blind engine lemon swarm venue praise addict agent unaware equal bean sing govern income link leg
```

### Hardware Wallet
* Typically, a single-purpose device that "holds" your private key(s), ensuring your private keys are safe.
* Typically, they use a 24-word phrase. This phrase you should write down (not on your computer) and store separately from your hardware wallet.
* If you lose your hardware wallet, you can still gain access to your accounts & funds via the word-phrase you wrote down.
* Never type the word-phrase on your computer. It defeats the purpose of your hardware wallet.
* [Purchase Hardware Wallets Here](https://www.myetherwallet.com/hardware-wallet-affiliates)
### Identicon / AddressIdenticon / AddressIcon
* The colorful blob of colors that corresponds to your address.
* It is an easy way to see if your address is correct.
* [Example 1](http://i.imgur.com/lHUrIiZ.jpg)
* [Example 2](http://i.imgur.com/FvyLewS.jpg)
* *Note: the above addresses are a single character different but have remarkably different icons & colors. Magic!*


### Hexadecimal
Used all over Ethereum for a variety of things, a hexadecimal string is comprised of the numbers `0 1 2 3 4 5 6 7 8 9` and `A B C D E F`

### Seed
* The input given to derive a private key. This should always be generated in a truly random way, not something you make up with your measly human brain.
* If you chose the seed, it is known as a `brain wallet`

### Brain Wallet
* An account generated from a seed or password or passphrase of your choosing.
* Humans are not capable of generating enough entropy and therefore the wallets derived from these phrases are insecure.
* Brain wallets can be brute forced by super fast computers.
* [Brain wallet are insecure.](https://www.reddit.com/r/ethereum/comments/45y8m7/brain_wallets_are_now_generally_shunned_by/)
* Don't use brain wallets.

### Entropy
* Also known as "randomness".
* The more random something is, the more entropy it has, and the more secure it is.
* Usually defined in "bits of entropy" or the number of years it would take to brute-force a \_\_\_\_ (e.g. private key) derived with that much entropy.
* Ethereum private keys are 256-bit keys
* 24-Word mnemonic phrases are also 256 bits of entropy. 2048 words in the dictionary. 11 bits of entropy (the words). `11 * 24 = 264`. The last word is a checksum.

### Derive / Derivation
* To derive something is to obtain it from an original source.
* For example, if we were to derive a Keystore from a private key and a password, this means that the Keystore is made from these two sources.
* The Keystore is a product of the two, thus it is derived from them.

### Encryption
* Encryption is the act of taking a string of letters/numbers, like your private key, and turning them into another string of letters/numbers through a method of private translation.
* There are various different encryption methods.
* Encryption offers protection against those trying to steal your information!

### Encrypted vs Unencrypted Keys 
* An unencrypted private key is 64 characters long, and it is used to unlock or restore wallets.
* An encrypted key is also 64 letters long and is a regular private key that has gone through the process of encryption, as defined above.
* For example, if the world ‘Apple’ was your shortened private key, then it was encrypted three letters down the alphabet, your new shortened encrypted key would be ‘Dssoh’. Since you know the way to encrypt this key, you could derive the original private key from it by reversing the method of encryption.
* Usually encrypted private keys are kept within the extension or device they are encrypted by, and they remain out of sight from the user. This is meant to add another layer of security to keep a user’s wallet information safe.

### Decentralize / Decentralization
* The process of transferring authority of a single entity (ex. Government or large corporation) to multiple smaller entities.

### Trustless
* A distributed trustless consensus which the blockchain is responsible for. Since everyone has a copy of the ledger of all transactions ever executed, there is no need for a third-party. You can verify the transactions yourself, however the Ethereum blockchain and Bitcoin blockchain were created to ensure rules and agreements between all parties are executed when all conditions are met.

### Smart Contracts 
* A piece of code (or program) that is stored on the blockchain network. Conditions of the contract are predefined by the users, if all conditions are met, certain actions are executed by the contract (program).

### Blockchain 
* A decentralized publicly owned ledger.

All feedback, rewrites, clarification, typo-fixing, and requests for additions are more than welcome.

Thanks to [MyCrypto](https://support.mycrypto.com/general-knowledge/ethereum-blockchain/a-glossary-of-common-terms-in-the-ethereum-crypto-space) for this Glossary's starting point