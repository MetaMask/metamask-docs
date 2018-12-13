# Sign Typed Data v1

This early version of the spec lacked some later security improvements, and should generally be neglected in favor of [signTypedData_v3](./Sign_Typed_Data_v3).

Also known as `signTypedData`, originally premiered October 2017 in [this blog post](https://medium.com/metamask/scaling-web3-with-signtypeddata-91d6efc8b290), this method was the original state-channel-centric signing method.

The `signTypedData` familiy has a few major design considerations:

- Cheap to verify on chain
- Still somewhat human readable
- Hard to phish signatures

If on-chain verifiability cost is a high priority for you, you might want to consider it.

