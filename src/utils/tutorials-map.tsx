export const tags = {
  web3Auth: 'web3auth',
  embeddedWallet: 'embedded wallets',
  metamaskSdk: 'mm connect',
  delegationToolkit: 'delegation toolkit',
  infura: 'infura',
  snaps: 'snaps',
  web: 'web',
  android: 'android',
  ios: 'ios',
  wagmi: 'wagmi',
  reactNative: 'react native',
  flutter: 'flutter',
  node: 'node',
  unity: 'unity',
  unreal: 'unreal engine',
  evm: 'evm',
  solana: 'solana',
  multiChain: 'multi chain',
  xrpl: 'xrpl',
  algorand: 'algorand',
  aptos: 'aptos',
  bitcoin: 'bitcoin',
  cosmos: 'cosmos',
  immutablex: 'immutablex',
  near: 'near',
  polkadot: 'polkadot',
  polymesh: 'polymesh',
  starkex: 'starkex',
  starknet: 'starknet',
  sui: 'sui',
  tezos: 'tezos',
  tron: 'tron',
  ton: 'ton',
  accountAbstraction: 'account abstraction',
  onRamp: 'on ramp',
}

export interface TutorialsInterface {
  content: Record<
    string,
    {
      title: string
      image: string
      description: string
      type: string
      tags: string[]
      date: string
      author: string
      communityPortalTopicId: string
      pinned: string
    }
  >
}

export const platformMap = [
  {
    label: 'Web',
    value: tags.web,
  },
  {
    label: 'Android',
    value: tags.android,
  },
  {
    label: 'iOS/ Swift',
    value: tags.ios,
  },
  {
    label: 'React Native',
    value: tags.reactNative,
  },
  {
    label: 'Flutter',
    value: tags.flutter,
  },
  {
    label: 'Unity',
    value: tags.unity,
  },
  {
    label: 'Unreal Engine',
    value: tags.unreal,
  },
  {
    label: 'Node.js',
    value: tags.node,
  },
]

export const productMap = [
  {
    label: 'MM Connect',
    value: tags.metamaskSdk,
  },
  {
    label: 'Embedded Wallets',
    value: tags.embeddedWallet,
  },
  {
    label: 'Delegation Toolkit',
    value: tags.delegationToolkit,
  },
]
