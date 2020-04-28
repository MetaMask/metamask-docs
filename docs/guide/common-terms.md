# Common Terms

## Words are Hard

<p id="agoctitecs_p">
  This is a list of terms you might encounter when using the MetaMask interface.
</p>

#### [You can also read in Spanish](https://github.com/faraggi/words-are-hard-es/blob/master/words-are-hard-es.md), thanks to [faraggi](https://github.com/faraggi)

---

### Wallet

<ul>
  <li id="wallet_l1">The interface / client / wrapper / holder that you use to manage your account(s).</li>

  <li id="wallet_l2">Example: MetaMask.io, your Ledger Hardware Wallet, a Multisig Wallet Contract.</li>
</ul>

### Account

<ul>
  <li id="account_l1">A public & private keypair that "holds" your funds.</li>

  <li id="account_l2">Your funds are actually stored on the blockchain, not in the wallet or account.</li>

  <li id="account_l3"> Just like your Reddit account has a <code> username (public)</code> and <code> password (private)</code>, so does your Ethereum account. For additional security, you can use a password to encrypt your private key which would result in a <code> username (public)</code> and <code> password (private)</code> and <code> password for that password (private + more secure)</code>. See the <code> Keystore File</code> section. </li>
</ul>

### Address _("Public Key")_

<ul>
  <li id="address_l1">You use this to send funds <b>to</b> an account.</li>
  <li id="address_l2">Sometimes referred to as the "public key"</li>
  <li id="address_l3">A string made up of <code>0x</code> + <code>40 hexadecimal characters</code>.</li>
  <li id="address_l4">In Ethereum, the address begins with <code>0x</code>.</li>
  <li id="address_l5">Example: <code>0x06A85356DCb5b307096726FB86A78c59D38e08ee</code></li>
</ul>

### Public Key

<ul>
  <li id="pubk_l1">In cryptography, you have a keypair: the public and private key.</li>
  <li id="pubk_l2">You can derive a public key from a private key, but cannot derive a private key from a public key.</li>
  <li id="pubk_l3">(Advanced) In Ethereum, the address "acts" like the public key, but it's not actually the public key.</li>
  <li id="pubk_l4">(Advanced) In Ethereum, the public key is derived from the private key and is 128 hex characters. You then take the <code>"SHA3" (Keccak-256)</code> hash of this (64 characters), take the last 40 characters, and prefix with <code>0x</code>, give you your 42-character address.</li>
</ul>

### Private Key

<ul>
  <li id="privk_1">You use this to send funds <b>from</b> an account.</li>
  <li id="privk_2">The secret half of your Address / public key.</li>
  <li id="privk_3">A string of 64 hexadecimal characters.</li>
  <li id="privk_4">(<a href='https://crypto.stackexchange.com/questions/30269/are-all-possible-ec-private-keys-valid' target='_blank'>Almost</a>) every string of 64 hexadecimal characters is a private key.</li>
  <li id="privk_5">If you hand-type a private key differently today than yesterday, you will access a different wallet. Never hand type your private key.</li>
  <li id="privk_6">This is the string you need to send from your account. Without it you cannot access your funds. Although, you don't need to save this raw, unencrypted private key in this format. You can saving the fancy versions of it (e.g. the Keystore File / Mnemonic Phrase).</li>
  <li id="privk_7">Example: <code>afdfd9c3d2095ef696594f6cedcae59e72dcd697e2a7521b1578140422a4f890</code></li>
</ul>

### Keystore File

<ul>
  <li id="keystoref_l1">
    Encrypted version of your private key in JSON format (though it does not have a JSON extension)
  </li>
  <li id="keystoref_l2">
    A fancy version of your private key that is protected by a password of your choosing.
  </li>
  <li id="keystoref_l3">
    When combined with the password, it has the private key.
  </li>
  <li id="keystoref_l4">
    Safer than a private key because you need the password.
  </li>
  <li id="keystoref_l5">
    File name usually is in the format <code>UTC</code> + <code>--</code> + <code>DATE_CREATED</code> + <code>--</code> + <code>YOUR_ADDRESS_WITHOUT_THE_OX</code></li>
  <li id="keystoref_l6">
    Example of File Name: <code>UTC--2017-07-02T20-33-09.177Z--06a85356dcb5b307096726fb86a78c59d38e08ee</code>
  </li>
  <li id="keystoref_l7">
    Example of Contents: <code>{"version":3,"id":"aa811d53-fe9a-44a2-bd1c-e737007b5591","address":"06a85356dcb5b307096726fb86a78c59d38e08ee","Crypto":{"ciphertext":"f5a7cc8d4b8cf93510b0d0d057f3a52ac79fd48e619e0638c4ffd978ca180248","cipherparams":{"iv":"975ab00192e2dd74170e91ca59c0b0bd"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"0210f0d0b99e440dfbceb36373304638bac093a367ee7da6411cd165f7aa907a","n":1024,"r":8,"p":1},"mac":"8197a747a3855a10546a2ff939c36470daed78e393b670efa0c12fe3b23dd7e3"}}</code>
  </li>
  <li id="keystoref_l8">
    (pw: <code>mypassword</code>)
  </li>
</ul>

### Mnemonic Phrase / Seed Phrase / Seed Words

<ul>
  <li id="mphrase_l1">
    Another fancy version of your private key, that is actually used to derive multiple private keys.
  </li>
  <li id="mphrase_l2">
    A (typically) 12 or 24 word phrase that allows you to access infinite number of accounts.
  </li>
  <li id="mphrase_l3">
    Used by Ledger, TREZOR, MetaMask, Jaxx, and others.
  </li>
  <li id="mphrase_l4">
    Originates from <a href='https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki' target='_blank'>BIP 39 Spec</a>.
  </li>
  <li id="mphrase_l5">
    The accounts you can access with this phrase are determined by the "path".
  </li>
  <li id="mphrase_l6">
    Example 12-words: <code>brain surround have swap horror body response double fire dumb bring hazard</code>
  </li>
  <li id="mphrase_l7">
    Example 24-words: <code>card enrich gesture connect kick topple fan body blind engine lemon swarm venue praise addict agent unaware equal bean sing govern income link leg</code>
  </li>
</ul>

### Hardware Wallet

<ul>
  <li id="hardwarew_l1">
    Typically, a single-purpose device that "holds" your private key(s), ensuring your private keys are safe.
  </li>
  <li id="hardwarew_l2">
    Typically, they use a 24-word phrase. This phrase you should write down (not on your computer) and store separately from your hardware wallet.
  </li>
  <li id="hardwarew_l3">
    If you lose your hardware wallet, you can still gain access to your accounts & funds via the word-phrase you wrote down.
  </li>
  <li id="hardwarew_l4">
    Never type the word-phrase on your computer. It defeats the purpose of your hardware wallet.
  </li>
  <li id="hardwarew_l5">
    <a href='https://kb.myetherwallet.com/en/hardware-wallets/' target='_blank'> See here for more information about Hardware Wallets</a>
  </li>
</ul>

### Identicon / AddressIdenticon / AddressIcon

<ul>
  <li id="addressIdent_l1">
    The colorful blob of colors that corresponds to your address.
  </li>
  <li id="addressIdent_l2">
    It is an easy way to see if your address is correct.
  </li>
  <li id="addressIdent_l3">
    <a href='http://i.imgur.com/lHUrIiZ.jpg' target='_blank'> Example 1 </a>
  </li>
  <li id="addressIdent_l4">
    <a href='http://i.imgur.com/FvyLewS.jpg' target='_blank'> Example 2 </a>
  </li>
  <li id="addressIdent_l5">
    <em>Note: the above addresses are a single character different but have remarkably different icons & colors. Magic!</em>
  </li>
</ul>

### Hexadecimal

<ul>
  <li id="hexadecimal_l">
    Used all over Ethereum for a variety of things, a hexadecimal string is comprised of the numbers <code>0 1 2 3 4 5 6 7 8 9</code> and <code>A B C D E F</code>
  </li>
</ul>

### Seed

<ul>
  <li id="seed_l1">
    The input given to derive a private key. This should always be generated in a truly random way, not something you make up with your measly human brain.
  </li>
  <li id="seed_l2">
    If you chose the seed, it is known as a <code>brain wallet</code>
  </li>
</ul>

### Brain Wallet

<ul>
  <li id="bw_l1">
    An account generated from a seed or password or passphrase of your choosing.
  </li>
  <li id="bw_l2">
    Humans are not capable of generating enough entropy and therefore the wallets derived from these phrases are insecure.
  </li>
  <li id="bw_l3">
    Brain wallets can be brute forced by super fast computers.
  </li>
  <li id="bw_l4">
    <a href='https://www.reddit.com/r/ethereum/comments/45y8m7/brain_wallets_are_now_generally_shunned_by/' target='_blank'> Brain wallet are insecure. </a>
  </li>
  <li id="bw_l5">
    Don't use brain wallets.
  </li>
</ul>

### Entropy

<ul>
  <li id="entropy_l1">
    Also known as "randomness".
  </li>
  <li id="entropy_l2">
    The more random something is, the more entropy it has, and the more secure it is.
  </li>
  <li id="entropy_l3">
    Usually defined in "bits of entropy" or the number of years it would take to brute-force a <b>\_\_\_\_</b> (e.g. private key) derived with that much entropy.
  </li>
  <li id="entropy_l4">
    Ethereum private keys are 256-bit keys
  </li>
  <li id="entropy_l5">
    24-Word mnemonic phrases are also 256 bits of entropy. 2048 words in the dictionary. 11 bits of entropy (the words). <code>11 * 24 = 264</code>. The last word is a checksum.
  </li>
</ul>

### Derive / Derivation

<ul>
  <li id="deriveDeriv_l1">
    To derive something is to obtain it from an original source.
  </li>
  <li id="deriveDeriv_l2">
    For example, if we were to derive a Keystore from a private key and a password, this means that the Keystore is made from these two sources.
  </li>
  <li id="deriveDeriv_l3">
    The Keystore is a product of the two, thus it is derived from them.
  </li>
</ul>

### Encryption

<ul>
  <li id="encryption_l1">
    Encryption is the act of taking a string of letters/numbers, like your private key, and turning them into another string of letters/numbers through a method of private translation.
  </li>
  <li id="encryption_l2">
    There are various different encryption methods.
  </li>
  <li id="encryption_l3">
    Encryption offers protection against those trying to steal your information!
  </li>
</ul>

### Encrypted vs Unencrypted Keys

<ul>
  <li id="encvunenc_l1">
    An unencrypted private key is 64 characters long, and it is used to unlock or restore wallets.
  </li>
  <li id="encvunenc_l2">
    An encrypted key is also 64 letters long and is a regular private key that has gone through the process of encryption, as defined above.
  </li>
  <li id="encvunenc_l3">
    For example, if the world ‘Apple’ was your shortened private key, then it was encrypted three letters down the alphabet, your new shortened encrypted key would be ‘Dssoh’. Since you know the way to encrypt this key, you could derive the original private key from it by reversing the method of encryption.
  </li>
  <li id="encvunenc_l4">
    Usually encrypted private keys are kept within the extension or device they are encrypted by, and they remain out of sight from the user. This is meant to add another layer of security to keep a user’s wallet information safe.
  </li>
</ul>

### Decentralize / Decentralization

<ul>
  <li id="decentralize_l">
    The process of transferring authority of a single entity (ex. Government or large corporation) to multiple smaller entities.
  </li>
</ul>

### Trustless

<ul>
  <li id="trustless_l">
    A distributed trustless consensus which the blockchain is responsible for. Since everyone has a copy of the ledger of all transactions ever executed, there is no need for a third-party. You can verify the transactions yourself, however the Ethereum blockchain and Bitcoin blockchain were created to ensure rules and agreements between all parties are executed when all conditions are met.
  </li>
</ul>

### Smart Contracts

<ul>
  <li id="sc_l">
    A piece of code (or program) that is stored on the blockchain network. Conditions of the contract are predefined by the users, if all conditions are met, certain actions are executed by the contract (program).
  </li>
</ul>

### Blockchain

<ul>
  <li id="blockchain_l">
    A decentralized publicly owned ledger.
  </li>
</ul>

<p id="fixGlossary">
  All feedback, rewrites, clarification, typo-fixing, and requests for additions are more than welcome. ?
</p>

<p>Thanks to <a href="https://support.mycrypto.com/getting-started/ethereum-glossary.html" target="_blank">MyCrypto</a> for this Glossary's starting point</p>
