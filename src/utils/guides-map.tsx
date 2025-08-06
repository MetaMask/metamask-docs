export const tags = {
  pnp: "plug and play",
  mpcCoreKit: "mpc core kit",
  sfa: "single factor auth",
  sfaJS: "@web3auth/single-factor-auth",
  mpcCoreKitJS: "@web3auth/mpc-core-kit",
  web: "web",
  android: "android",
  ios: "ios",
  wagmi: "wagmi",
  reactNative: "react native",
  flutter: "flutter",
  node: "node",
  unity: "unity",
  unreal: "unreal engine",
  evm: "evm",
  solana: "solana",
  multiChain: "multi chain",
  xrpl: "xrpl",
  algorand: "algorand",
  aptos: "aptos",
  bitcoin: "bitcoin",
  cosmos: "cosmos",
  immutablex: "immutablex",
  near: "near",
  polkadot: "polkadot",
  polymesh: "polymesh",
  starkex: "starkex",
  starknet: "starknet",
  sui: "sui",
  tezos: "tezos",
  tron: "tron",
  ton: "ton",
  customAuthentication: "custom authentication",
  accountAbstraction: "account abstraction",
  onRamp: "on ramp",
  mfa: "mfa",
};

export interface GuidesInterface {
  content: Record<
    string,
    {
      title: string;
      image: string;
      description: string;
      type: string;
      tags: string[];
      date: string;
      author: string;
      communityPortalTopicId: string;
      pinned: string;
    }
  >;
}

export const platformMap = [
  {
    label: "Web",
    value: tags.web,
  },
  {
    label: "Android",
    value: tags.android,
  },
  {
    label: "iOS/ Swift",
    value: tags.ios,
  },
  {
    label: "React Native",
    value: tags.reactNative,
  },
  {
    label: "Flutter",
    value: tags.flutter,
  },
  {
    label: "Unity",
    value: tags.unity,
  },
  {
    label: "Unreal Engine",
    value: tags.unreal,
  },
  {
    label: "Node.js",
    value: tags.node,
  },
];

export const productMap = [
  {
    label: "Plug and Play",
    value: tags.pnp,
  },
  {
    label: "Single Factor Auth",
    value: tags.sfa,
  },
  {
    label: "MPC Core Kit",
    value: tags.mpcCoreKit,
  },
];