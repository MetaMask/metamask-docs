import { DisplayChoice } from '../interfaces'

//Product choices
export const EMBEDDED_WALLETS = 'EMBEDDED_WALLETS'
export const METAMASK_SDK = 'METAMASK_SDK'

// Product choices
export const PRODUCTS: DisplayChoice[] = [
  { key: METAMASK_SDK, displayName: 'MetaMask SDK' },
  { key: EMBEDDED_WALLETS, displayName: 'Embedded Wallets' },
]

// Platform choices
export const REACT = 'REACT'
export const NEXTJS = 'NEXTJS'
export const VUE = 'VUE'
export const ANGULAR = 'ANGULAR'
export const ANDROID = 'ANDROID'
export const IOS = 'IOS'
export const WEBGL = 'WEBGL'
export const REACT_NATIVE = 'REACT_NATIVE'
export const FLUTTER = 'FLUTTER'

export const LANGS_EMBEDDED_WALLETS: DisplayChoice[] = [
  { key: REACT, displayName: 'React' },
  { key: NEXTJS, displayName: 'Next JS' },
  { key: VUE, displayName: 'Vue' },
  { key: ANGULAR, displayName: 'Angular' },
  { key: ANDROID, displayName: 'Android' },
  { key: IOS, displayName: 'iOS/Swift' },
  { key: REACT_NATIVE, displayName: 'React Native' },
  { key: FLUTTER, displayName: 'Flutter' },
]

export const LANGS_METAMASK_SDK: DisplayChoice[] = [{ key: REACT, displayName: 'React' }]

// Misc choices

export const YES = 'YES'
export const NO = 'NO'

export const TOGGLE: DisplayChoice[] = [
  { key: NO, displayName: 'No' },
  { key: YES, displayName: 'Yes' },
]

export const WALLET_AGGREGATOR_TOGGLE: DisplayChoice[] = [
  { key: NO, displayName: 'Social Logins' },
  { key: YES, displayName: 'Wallet Aggregator' },
]
