export interface ExamplesInterface {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  tags: string[];
  link: string;
  githubLink: string;
  qsLink?: string;
}

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

export const PLAYGROUND = "PLAYGROUND";
export const QUICK_START = "QUICK START";
export const SAMPLE_APP = "SAMPLE APP";

export const webExamples: ExamplesInterface[] = [
  // Quick Starts
  {
    title: "React Quick Start",
    description: "A quick integration of Web3Auth SDK in React",
    image: "banners/react.png",
    type: QUICK_START,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/quick-starts/react-quick-start",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/quick-starts/react-quick-start",
    id: "react-quick-start",
    qsLink: "/quick-start?framework=REACT&stepIndex=0",
  },
  {
    title: "React Solana Quick Start",
    description: "A quick integration of Web3Auth SDK in React with Solana blockchain",
    image: "banners/solana.png",
    type: QUICK_START,
    tags: [tags.pnp, tags.web, tags.solana, "react"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/quick-starts/react-solana-quick-start",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/quick-starts/react-solana-quick-start",
    id: "react-solana-quick-start",
    qsLink: "/quick-start?framework=REACT_SOLANA&stepIndex=0",
  },
  {
    title: "Angular Quick Start",
    description: "A quick integration of Web3Auth SDK in Angular",
    image: "banners/angular.png",
    type: QUICK_START,
    tags: [tags.pnp, tags.web, tags.evm, "angular"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/quick-starts/angular-quick-start",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/quick-starts/angular-quick-start",
    id: "angular-quick-start",
    qsLink: "/quick-start?framework=ANGULAR&stepIndex=0",
  },
  {
    title: "Vue Quick Start",
    description: "A quick integration of Web3Auth SDK in Vue",
    image: "banners/vue.png",
    type: QUICK_START,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "vue"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/quick-starts/vue-quick-start",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/quick-starts/vue-quick-start",
    id: "vue-quick-start",
    qsLink: "/quick-start?framework=VUE&stepIndex=0",
  },
  {
    title: "Vue Solana Quick Start",
    description: "A quick integration of Web3Auth SDK in Vue with Solana blockchain",
    image: "banners/solana.png",
    type: QUICK_START,
    tags: [tags.pnp, tags.web, tags.solana, "vue"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/quick-starts/vue-solana-quick-start",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/quick-starts/vue-solana-quick-start",
    id: "vue-solana-quick-start",
    qsLink: "/quick-start?framework=VUE_SOLANA&stepIndex=0",
  },
  {
    title: "NextJS Quick Start",
    description: "A quick integration of Web3Auth SDK in NextJS",
    image: "banners/next.js.png",
    type: QUICK_START,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "nextjs"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/quick-starts/nextjs-quick-start",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/quick-starts/nextjs-quick-start",
    id: "nextjs-quick-start",
    qsLink: "/quick-start?framework=NEXTJS&stepIndex=0",
  },
  {
    title: "Vanilla JS Quick Start",
    description: "A quick integration of Web3Auth SDK in Vanilla JavaScript",
    image: "banners/htmljs.png",
    type: QUICK_START,
    tags: [tags.pnp, tags.web, tags.evm],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/quick-starts/vanillajs-quick-start",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/quick-starts/vanillajs-quick-start",
    id: "vanillajs-quick-start",
    qsLink: "/quick-start?framework=HTML&stepIndex=0",
  },

  // React Playground
  {
    title: "React Playground",
    description: "A playground to test all the features of Web3Auth SDKs in React",
    image: "banners/react.png",
    type: PLAYGROUND,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", "hooks"],
    link: "https://web3auth-playground.vercel.app/",
    githubLink: "https://github.com/Web3Auth/web3auth-examples/tree/main/react-playground",
    id: "react-playground",
  },

  // Custom Authentication Examples - Single Connection
  {
    title: "Auth0 Implicit Example",
    description: "Implementing Auth0 implicit flow authentication with Web3Auth",
    image: "banners/auth0.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", "auth0", "implicit"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/auth0-implicit-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/auth0-implicit-example",
    id: "auth0-implicit-example",
  },
  {
    title: "Auth0 JWT Example",
    description: "Implementing Auth0 JWT authentication with Web3Auth",
    image: "banners/auth0.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", "auth0", "jwt"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/auth0-jwt-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/auth0-jwt-example",
    id: "auth0-jwt-example",
  },
  {
    title: "Cognito Implicit Example",
    description: "Implementing AWS Cognito implicit flow authentication with Web3Auth",
    image: "banners/cognito.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", "cognito", "implicit"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/cognito-implicit-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/cognito-implicit-example",
    id: "cognito-implicit-example",
  },
  {
    title: "Custom JWT Example",
    description: "Implementing custom JWT authentication with Web3Auth",
    image: "banners/jwt.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", "jwt", "custom"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/custom-jwt-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/custom-jwt-example",
    id: "custom-jwt-example",
  },
  {
    title: "Discord Implicit Example",
    description: "Implementing Discord implicit flow authentication with Web3Auth",
    image: "banners/discord.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", "discord", "implicit"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/discord-implicit-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/discord-implicit-example",
    id: "discord-implicit-example",
  },
  {
    title: "Facebook Implicit Example",
    description: "Implementing Facebook implicit flow authentication with Web3Auth",
    image: "banners/facebook.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", "facebook", "implicit"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/facebook-implicit-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/facebook-implicit-example",
    id: "facebook-implicit-example",
  },
  {
    title: "Firebase JWT Example",
    description: "Implementing Firebase JWT authentication with Web3Auth",
    image: "banners/firebase.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", "firebase", "jwt"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/firebase-jwt-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/firebase-jwt-example",
    id: "firebase-jwt-example",
  },
  {
    title: "Google Implicit Example",
    description: "Implementing Google implicit flow authentication with Web3Auth",
    image: "banners/google.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", "google", "implicit"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/google-implicit-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/google-implicit-example",
    id: "google-implicit-example",
  },
  {
    title: "Google One Tap Example",
    description: "Implementing Google One Tap authentication with Web3Auth",
    image: "banners/google.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", "google", "one-tap"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/google-one-tap-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/google-one-tap-example",
    id: "google-one-tap-example",
  },
  {
    title: "Modal Example",
    description: "Implementing Web3Auth Modal for authentication",
    image: "banners/react.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", "modal"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/modal-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/modal-example",
    id: "modal-example",
  },
  {
    title: "Twitch Implicit Example",
    description: "Implementing Twitch implicit flow authentication with Web3Auth",
    image: "banners/twitch.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", "twitch", "implicit"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/twitch-implicit-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/twitch-implicit-example",
    id: "twitch-implicit-example",
  },
  {
    title: "Worldcoin Implicit Example",
    description: "Implementing Worldcoin implicit flow authentication with Web3Auth",
    image: "banners/worldcoin.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", "worldcoin", "implicit"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/worldcoin-implicit-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/single-connection/worldcoin-implicit-example",
    id: "worldcoin-implicit-example",
  },

  // Custom Authentication Examples - Grouped Connection
  {
    title: "Auth0 Google Implicit Grouped Example",
    description: "Implementing Auth0 and Google grouped authentication with implicit flow",
    image: "banners/auth0.png",
    type: SAMPLE_APP,
    tags: [
      tags.pnp,
      tags.web,
      tags.evm,
      tags.wagmi,
      "react",
      "auth0",
      "google",
      "implicit",
      "grouped",
    ],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/grouped-connection/auth0-google-implicit-grouped-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/grouped-connection/auth0-google-implicit-grouped-example",
    id: "auth0-google-implicit-grouped-example",
  },
  {
    title: "Auth0 Google JWT Grouped Example",
    description: "Implementing Auth0 and Google grouped authentication with JWT",
    image: "banners/auth0.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", "auth0", "google", "jwt", "grouped"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/grouped-connection/auth0-google-jwt-grouped-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/grouped-connection/auth0-google-jwt-grouped-example",
    id: "auth0-google-jwt-grouped-example",
  },
  {
    title: "Firebase Google JWT Grouped Example",
    description: "Implementing Firebase and Google grouped authentication with JWT",
    image: "banners/firebase.png",
    type: SAMPLE_APP,
    tags: [
      tags.pnp,
      tags.web,
      tags.evm,
      tags.wagmi,
      "react",
      "firebase",
      "google",
      "jwt",
      "grouped",
    ],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/grouped-connection/firebase-google-jwt-grouped-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/grouped-connection/firebase-google-jwt-grouped-example",
    id: "firebase-google-jwt-grouped-example",
  },
  {
    title: "Modal Google Email Passwordless Grouped Example",
    description: "Implementing Web3Auth Modal with Google and Email Passwordless authentication",
    image: "banners/google.png",
    type: SAMPLE_APP,
    tags: [
      tags.pnp,
      tags.web,
      tags.evm,
      tags.wagmi,
      "react",
      "modal",
      "google",
      "email",
      "passwordless",
      "grouped",
    ],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/grouped-connection/modal-google-email-passwordless-grouped-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/custom-authentication/grouped-connection/modal-google-email-passwordless-grouped-example",
    id: "modal-google-email-passwordless-grouped-example",
  },

  // Other Blockchain Examples
  {
    title: "Algorand Example",
    description: "Implementing Web3Auth with Algorand blockchain",
    image: "banners/algorand.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.algorand, "react"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/algorand-example",
    githubLink: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/algorand-example",
    id: "algorand-example",
  },
  {
    title: "Aptos Example",
    description: "Implementing Web3Auth with Aptos blockchain",
    image: "banners/aptos.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.aptos, "react"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/aptos-example",
    githubLink: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/aptos-example",
    id: "aptos-example",
  },
  {
    title: "Bitcoin Example",
    description: "Implementing Web3Auth with Bitcoin blockchain",
    image: "banners/react.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.bitcoin, "react"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/bitcoin-example",
    githubLink: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/bitcoin-example",
    id: "bitcoin-example",
  },
  {
    title: "Cosmos Example",
    description: "Implementing Web3Auth with Cosmos blockchain",
    image: "banners/cosmos.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.cosmos, "react"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/cosmos-example",
    githubLink: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/cosmos-example",
    id: "cosmos-example",
  },
  {
    title: "Multi Chain Example",
    description: "Implementing Web3Auth with multiple blockchain networks",
    image: "banners/multichain.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.multiChain, "react"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/multi-chain-example",
    githubLink: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/multi-chain-example",
    id: "multi-chain-example",
  },
  {
    title: "Polkadot Example",
    description: "Implementing Web3Auth with Polkadot blockchain",
    image: "banners/polkadot.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.polkadot, "react"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/polkadot-example",
    githubLink: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/polkadot-example",
    id: "polkadot-example",
  },
  {
    title: "Polymesh Example",
    description: "Implementing Web3Auth with Polymesh blockchain",
    image: "banners/polymesh.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.polymesh, "react"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/polymesh-example",
    githubLink: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/polymesh-example",
    id: "polymesh-example",
  },
  {
    title: "Server Side Verification Example",
    description: "Implementing server-side verification with Web3Auth",
    image: "banners/ssv.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "nextjs", "server-side"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/server-side-verification-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/other/server-side-verification-example",
    id: "server-side-verification-example",
  },
  {
    title: "Sign Protocol Example",
    description: "Implementing signing protocols with Web3Auth",
    image: "banners/sign-protocol.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", "signing"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/sign-protocol-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/other/sign-protocol-example",
    id: "sign-protocol-example",
  },
  {
    title: "Smart Account Example",
    description: "Implementing smart accounts with Web3Auth for account abstraction",
    image: "banners/react.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", tags.accountAbstraction],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/smart-account-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-examples/tree/main/other/smart-account-example",
    id: "smart-account-example",
  },
  {
    title: "Sui Example",
    description: "Implementing Web3Auth with Sui blockchain",
    image: "banners/sui.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.sui, "react"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/sui-example",
    githubLink: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/sui-example",
    id: "sui-example",
  },
  {
    title: "Tezos Example",
    description: "Implementing Web3Auth with Tezos blockchain",
    image: "banners/tezos.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.tezos, "react"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/tezos-example",
    githubLink: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/tezos-example",
    id: "tezos-example",
  },
  {
    title: "TON Example",
    description: "Implementing Web3Auth with TON blockchain",
    image: "banners/ton.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.ton, "react"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/ton-example",
    githubLink: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/ton-example",
    id: "ton-example",
  },
  {
    title: "TRON Example",
    description: "Implementing Web3Auth with TRON blockchain",
    image: "banners/tron.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.tron, "react"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/tron-example",
    githubLink: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/tron-example",
    id: "tron-example",
  },
  {
    title: "XMTP Example",
    description: "Implementing Web3Auth with XMTP messaging protocol",
    image: "banners/xmtp.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.evm, tags.wagmi, "react", "xmtp", "messaging"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/xmtp-example",
    githubLink: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/xmtp-example",
    id: "xmtp-example",
  },
  {
    title: "XRPL Example",
    description: "Implementing Web3Auth with XRP Ledger",
    image: "banners/xrpl.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.web, tags.xrpl, "react"],
    link: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/xrpl-example",
    githubLink: "https://github.com/Web3Auth/web3auth-examples/tree/main/other/xrpl-example",
    id: "xrpl-example",
  },
];
export const pnpiOSExamples: ExamplesInterface[] = [
  {
    title: "Web3Auth PnP iOS SDK Quick Start",
    description: "A quick integration of Web3Auth Plug and Play iOS SDK",
    image: "banners/ios-swift.png",
    type: QUICK_START,
    tags: [tags.pnp, tags.ios, tags.evm, "swift"],
    link: EWQuickStartHostedLinks.IOS,
    id: "ios-quick-start",
    githubLink: EWQuickStartSourceCode.IOS,
    qsLink: "/quick-start?framework=IOS&stepIndex=0",
  },
  {
    title: "Integrate Web3Auth PnP iOS SDK with Solana Blockchain",
    description: "Use Solana Blockchain with Plug and Play iOS SDK",
    image: "banners/ios-solana.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.ios, "swift", tags.solana, "ed25519"],
    link: "https://github.com/Web3Auth/web3auth-ios-examples/tree/main/ios-solana-example",
    id: "ios-solana-example",
    githubLink: "https://github.com/Web3Auth/web3auth-ios-examples/tree/main/ios-solana-example",
  },
  {
    title: "PnP iOS SDK Playground",
    description: "A playground to test all the features of Plug and Play iOS SDK",
    image: "banners/ios-swift.png",
    type: PLAYGROUND,
    tags: [tags.pnp, tags.ios, "swift", tags.solana, tags.evm, "secp256k1"],
    link: "https://w3a.link/pnp-ios-playground",
    githubLink: "https://github.com/Web3Auth/web3auth-ios-examples/tree/main/ios-playground",
    id: "pnp-ios-playground",
  },
  {
    title: "Integrate Firebase based Login in PnP iOS SDK",
    description: "Use your own Firebase ID Token based Login with Plug and Play iOS SDK",
    image: "banners/ios-firebase.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.ios, "swift", "firebase", tags.evm, "id token login"],
    link: "https://github.com/Web3Auth/web3auth-ios-examples/tree/main/ios-firebase-example",
    id: "ios-firebase-example",
    githubLink: "https://github.com/Web3Auth/web3auth-ios-examples/tree/main/ios-firebase-example",
  },
  // {
  //   title: "Integrate Auth0 SPA in PnP iOS SDK",
  //   description: "Use Auth0 Single Page App (Implicit Mode) with Plug and Play iOS SDK",
  //   image: "banners/ios-auth0.png",
  //   type: SAMPLE_APP,
  //   tags: [tags.pnp, tags.ios, "swift", "auth0", "email passwordless", tags.evm, "implicit mode"],
  //   link: "https://github.com/Web3Auth/web3auth-ios-examples/tree/main/ios-auth0-example",
  //   id: "ios-auth0-example",
  //   githubLink: "https://github.com/Web3Auth/web3auth-ios-examples/tree/main/ios-auth0-example",
  //
  // },
  {
    title: "Using Aggregate Verifiers in Web3Auth PnP iOS SDK",
    description:
      "Combine multiple logins (Google, Facebook and GitHub) using Aggregate Verifiers in Web3Auth Plug and Play iOS SDK",
    image: "banners/ios-auth0.png",
    type: SAMPLE_APP,
    tags: [
      tags.pnp,
      tags.ios,
      "swift",
      "aggregate verifier",
      "implicit mode",
      "auth0",
      "google",
      "github",
      "facebook",
      tags.evm,
    ],
    link: "https://github.com/Web3Auth/web3auth-ios-examples/tree/main/ios-aggregate-verifier-example",
    id: "ios-aggregate-verifier-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-ios-examples/tree/main/ios-aggregate-verifier-example",
  },
];
export const pnpAndroidExamples: ExamplesInterface[] = [
  {
    title: "Web3Auth PnP Android SDK Quick Start",
    description: "A quick integration of Web3Auth Plug and Play Android SDK",
    image: "banners/android.png",
    type: QUICK_START,
    tags: [tags.pnp, tags.android, tags.evm, "kotlin"],
    link: EWQuickStartHostedLinks.ANDROID,
    githubLink: EWQuickStartSourceCode.ANDROID,
    id: "android-quick-start",
    qsLink: "/quick-start?framework=ANDROID&stepIndex=0",
  },
  {
    title: "Integrate Web3Auth PnP Android SDK with Solana Blockchain",
    description: "Use Solana Blockchain with Plug and Play Android SDK",
    image: "banners/android-solana.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.android, "kotlin", tags.solana, "ed25519"],
    link: "https://github.com/Web3Auth/web3auth-android-examples/tree/main/android-solana-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-android-examples/tree/main/android-solana-example",
    id: "android-solana-example",
  },
  {
    title: "PnP Android SDK Playground",
    description: "A playground to test all the features of Plug and Play Android SDK",
    image: "banners/android.png",
    type: PLAYGROUND,
    tags: [tags.pnp, tags.android, "kotlin", tags.solana, tags.evm, "secp256k1"],
    link: "https://w3a.link/pnp-android-playground",
    githubLink:
      "https://github.com/Web3Auth/web3auth-android-examples/tree/main/android-playground",
    id: "android-playground",
  },
  {
    title: "Integrate Firebase based Login in PnP Android SDK",
    description: "Use your own Firebase ID Token based Login with Plug and Play Android SDK",
    image: "banners/android-firebase.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.android, "kotlin", "firebase", tags.evm, "id token login"],
    link: "https://github.com/Web3Auth/web3auth-android-examples/tree/main/android-firebase-example",
    id: "android-firebase-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-android-examples/tree/main/android-firebase-example",
  },
  {
    title: "Integrate Auth0 SPA in PnP Android SDK",
    description: "Use Auth0 Single Page App (Implicit Mode) with Plug and Play Android SDK",
    image: "banners/android-auth0.png",
    type: SAMPLE_APP,
    tags: [
      tags.pnp,
      tags.android,
      tags.evm,
      "kotlin",
      "auth0",
      "email passwordless",
      "implicit mode",
    ],
    link: "https://github.com/Web3Auth/web3auth-android-examples/tree/main/android-auth0-example",
    id: "android-auth0-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-android-examples/tree/main/android-auth0-example",
  },
  {
    title: "Using Aggregate Verifiers in Web3Auth PnP Android SDK",
    description:
      "Combine multiple logins (Google, Facebook and GitHub) using Aggregate Verifiers in Web3Auth Plug and Play Android SDK",
    image: "banners/android-auth0.png",
    type: SAMPLE_APP,
    tags: [
      tags.pnp,
      tags.android,
      tags.evm,
      "kotlin",
      "aggregate verifier",
      "implicit mode",
      "auth0",
      "google",
      "github",
      "facebook",
    ],
    link: "https://github.com/Web3Auth/web3auth-android-examples/tree/main/android-aggregate-verifier-example",
    id: "android-aggregate-verifier-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-android-examples/tree/main/android-aggregate-verifier-example",
  },
];
export const pnpReactNativeExamples: ExamplesInterface[] = [
  {
    title: "Web3Auth PnP React Native SDK Quick Start",
    description:
      "A quick integration of Web3Auth Plug and Play React Native SDK in Android and iOS",
    image: "banners/react-native.png",
    type: QUICK_START,
    tags: [tags.pnp, tags.android, tags.ios, tags.evm, tags.reactNative],
    link: EWQuickStartHostedLinks.REACT_NATIVE,
    githubLink: EWQuickStartSourceCode.REACT_NATIVE,
    id: "rn-bare-quick-start",
    qsLink: "/quick-start?framework=REACT_NATIVE&stepIndex=0",
  },
  {
    title: "Using Auth0 with Web3Auth PnP React Native SDK",
    description:
      "Using Auth0 Single Page App (Implicit Mode) in Web3Auth Plug and Play React Native SDK in Android and iOS",
    image: "banners/react-native-auth0.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.android, tags.ios, tags.reactNative, tags.evm, "auth0", "implicit mode"],
    link: "https://github.com/Web3Auth/web3auth-react-native-examples/tree/main/rn-bare-auth0-example",
    id: "rn-bare-auth0-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-react-native-examples/tree/main/rn-bare-auth0-example",
  },
  {
    title: "Using Aggregate Verifiers in Web3Auth PnP React Native SDK",
    description:
      "Combine multiple logins (Google, Facebook and GitHub) using Aggregate Verifiers in Web3Auth Plug and Play React Native SDK for Android and iOS",
    image: "banners/react-native-auth0.png",
    type: SAMPLE_APP,
    tags: [
      tags.pnp,

      tags.android,
      tags.ios,
      tags.evm,
      tags.reactNative,
      "aggregate verifier",
      "implicit mode",
      "auth0",
      "google",
      "github",
      "facebook",
    ],
    link: "https://github.com/Web3Auth/web3auth-react-native-examples/tree/main/rn-bare-aggregate-verifier-example",
    id: "rn-bare-aggregate-verifier-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-react-native-examples/tree/main/rn-bare-aggregate-verifier-example",
  },
  {
    title: "Using Web3Auth PnP React Native SDK in Expo",
    description: "Using Web3Auth Plug and Play React Native SDK in an Expo App",
    image: "banners/expo.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.android, tags.ios, tags.evm, tags.reactNative, "expo"],
    link: "https://github.com/Web3Auth/web3auth-react-native-examples/tree/main/rn-expo-example",
    id: "rn-expo-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-react-native-examples/tree/main/rn-expo-example",
  },
];
export const pnpFlutterExamples: ExamplesInterface[] = [
  {
    title: "Web3Auth PnP Flutter SDK Quick Start",
    description: "A quick integration of Web3Auth Plug and Play Flutter SDK for Android and iOS",
    image: "banners/flutter.png",
    type: QUICK_START,
    tags: [tags.pnp, tags.flutter, tags.ios, tags.android, tags.evm, "dart"],
    link: "https://github.com/Web3Auth/web3auth-flutter-examples/tree/main/flutter-quick-start",
    id: "flutter-quick-start",
    githubLink:
      "https://github.com/Web3Auth/web3auth-flutter-examples/tree/main/flutter-quick-start",
  },
  {
    title: "Integrate Web3Auth PnP Flutter SDK with Solana Blockchain",
    description: "Use Solana Blockchain with Plug and Play Flutter SDK for Android and iOS",
    image: "banners/flutter-solana.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.flutter, tags.ios, tags.android, "dart", tags.solana, "ed25519"],
    link: "https://github.com/Web3Auth/web3auth-flutter-examples/tree/main/flutter-solana-example",
    id: "flutter-solana-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-flutter-examples/tree/main/flutter-solana-example",
  },
  {
    title: "PnP Flutter SDK Playground",
    description:
      "A playground to test all the features of Plug and Play Flutter SDK for Android and iOS",
    image: "banners/flutter.png",
    type: PLAYGROUND,
    tags: [
      tags.pnp,
      tags.flutter,
      tags.ios,
      tags.android,
      "dart",
      tags.solana,
      tags.evm,
      "secp256k1",
    ],
    link: "https://w3a.link/pnp-flutter-ios-playground",
    githubLink:
      "https://github.com/Web3Auth/web3auth-flutter-examples/tree/main/flutter-playground",
    id: "flutter-playground",
  },
  {
    title: "Integrate Firebase based Login in PnP Flutter SDK",
    description:
      "Use your own Firebase ID Token based Login with Plug and Play Flutter SDK for Android and iOS",
    image: "banners/flutter-firebase.png",
    type: SAMPLE_APP,
    tags: [
      tags.pnp,
      tags.flutter,
      tags.ios,
      tags.android,
      tags.evm,
      "dart",
      "firebase",
      "id token login",
    ],
    link: "https://github.com/Web3Auth/web3auth-flutter-examples/tree/main/flutter-firebase-example",
    id: "flutter-firebase-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-flutter-examples/tree/main/flutter-firebase-example",
  },
  {
    title: "Integrate Auth0 SPA in PnP Flutter SDK",
    description:
      "Use Auth0 Single Page App (Implicit Mode) with Plug and Play Flutter SDK for Android and iOS",
    image: "banners/flutter-auth0.png",
    type: SAMPLE_APP,
    tags: [
      tags.pnp,
      tags.flutter,
      tags.ios,
      tags.android,
      "dart",
      "auth0",
      "email passwordless",
      "implicit mode",
      tags.evm,
    ],
    link: "https://github.com/Web3Auth/web3auth-flutter-examples/tree/main/flutter-auth0-example",
    id: "flutter-auth0-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-flutter-examples/tree/main/flutter-auth0-example",
  },
  {
    title: "Using Aggregate Verifiers in Web3Auth PnP Flutter SDK",
    description:
      "Combine multiple logins (Google, Facebook and GitHub) using Aggregate Verifiers in Web3Auth Plug and Play Flutter SDK for Android and iOS",
    image: "banners/flutter-auth0.png",
    type: SAMPLE_APP,
    tags: [
      tags.pnp,
      tags.flutter,
      tags.ios,
      tags.android,
      "dart",
      "aggregate verifier",
      "implicit mode",
      "auth0",
      "google",
      "github",
      "facebook",
      tags.evm,
    ],
    link: "https://github.com/Web3Auth/web3auth-flutter-examples/tree/main/flutter-aggregate-verifier-example",
    id: "flutter-aggregate-verifier-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-flutter-examples/tree/main/flutter-aggregate-verifier-example",
  },
];
export const pnpUnityExamples: ExamplesInterface[] = [
  {
    title: "Web3Auth PnP Unity SDK Quick Start",
    description:
      "A quick integration of Web3Auth Plug and Play Unity SDK in Android, iOS and WebGL",
    image: "banners/unity.png",
    type: QUICK_START,
    tags: [tags.pnp, tags.unity, "csharp", tags.android, tags.ios, tags.evm, "webgl"],
    link: EWQuickStartSourceCode.UNITY,
    id: "unity-quick-start",
    githubLink: EWQuickStartSourceCode.UNITY,
  },
  {
    title: "Using Auth0 with Web3Auth PnP Unity SDK",
    description:
      "Using Auth0 Single Page App (Implicit Mode) in Web3Auth Plug and Play Unity SDK in Android, iOS and WebGL",
    image: "banners/unity-auth0.png",
    type: SAMPLE_APP,
    tags: [
      tags.pnp,
      tags.unity,
      "csharp",
      tags.android,
      tags.ios,
      "webgl",
      "auth0",
      "implicit mode",
      tags.evm,
    ],
    link: "https://github.com/Web3Auth/web3auth-unity-examples/tree/main/unity-auth0-example",
    id: "unity-auth0-example",
    githubLink: "https://github.com/Web3Auth/web3auth-unity-examples/tree/main/unity-auth0-example",
  },
  {
    title: "Using Aggregate Verifiers in Web3Auth PnP Unity SDK",
    description:
      "Combine multiple logins (Google, Facebook and GitHub) using Aggregate Verifiers in Web3Auth Plug and Play Unity SDK for Android, iOS and WebGL",
    image: "banners/unity-auth0.png",
    type: SAMPLE_APP,
    tags: [
      tags.pnp,
      tags.unity,
      "csharp",
      tags.android,
      tags.ios,
      "webgl",
      "aggregate verifier",
      "implicit mode",
      "auth0",
      "google",
      "github",
      "facebook",
      tags.evm,
    ],
    link: "https://github.com/Web3Auth/web3auth-unity-examples/tree/main/unity-aggregate-verifier-example",
    id: "unity-aggregate-verifier-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-unity-examples/tree/main/unity-aggregate-verifier-example",
  },
];
export const pnpUnrealExamples: ExamplesInterface[] = [
  {
    title: "Web3Auth PnP Unreal Engine SDK Quick Start",
    description: "A quick integration of Web3Auth Plug and Play Unreal Engine SDK in Android & iOS",
    image: "banners/unreal.png",
    type: QUICK_START,
    tags: [tags.pnp, tags.unreal, "csharp", tags.android, tags.evm, tags.ios],
    link: "https://github.com/Web3Auth/web3auth-unreal-example/tree/master",
    id: "unreal-quick-start",
    githubLink: EWQuickStartSourceCode.UNREAL,
  },
  {
    id: "unreal-auth0-example",
    title: "Using Auth0 with Web3Auth PnP Unreal Engine SDK",
    description:
      "Using Auth0 Single Page App (Implicit Mode) in Web3Auth Plug and Play Unreal Engine SDK in Android & iOS",
    image: "banners/unreal-auth0.png",
    type: SAMPLE_APP,
    tags: [tags.pnp, tags.unreal, tags.android, tags.ios, "auth0", tags.evm, "implicit mode"],
    link: "https://github.com/Web3Auth/web3auth-unreal-example/tree/auth0-example",
    githubLink: "https://github.com/Web3Auth/web3auth-unreal-example/tree/auth0-example",
  },
  {
    id: "unreal-google-example",
    title: "Using Google in Web3Auth PnP Unreal Engine SDK",
    description:
      "Using Google Custom Authentication in Web3Auth Plug and Play Unreal Engine SDK for Android & iOS",
    image: "banners/unreal-google.png",
    type: SAMPLE_APP,
    tags: [
      tags.pnp,
      tags.unreal,
      tags.android,
      tags.ios,
      tags.evm,
      "aggregate verifier",
      "implicit mode",
      "auth0",
      "google",
      "github",
      "facebook",
    ],
    link: "https://github.com/Web3Auth/web3auth-unreal-example/tree/custom-google",
    githubLink: "https://github.com/Web3Auth/web3auth-unreal-example/tree/custom-google",
  },
];

export const coreKitSfaiOSExamples: ExamplesInterface[] = [
  {
    title: "Web3Auth Single Factor Auth iOS SDK Quick Start",
    description: "A quick integration of Single Factor Auth iOS SDK",
    image: "banners/ios-swift.png",
    type: QUICK_START,
    tags: [tags.sfa, "sfa", tags.ios, tags.evm, "swift"],
    link: "https://github.com/Web3Auth/web3auth-ios-examples/tree/main/sfa-ios-quick-start",
    id: "sfa-ios-quick-start",
    githubLink: "https://github.com/Web3Auth/web3auth-ios-examples/tree/main/sfa-ios-quick-start",
  },
];
export const coreKitSfaAndroidExamples: ExamplesInterface[] = [
  {
    title: "Web3Auth Single Factor Auth Android SDK Quick Start",
    description: "A quick integration of Web3Auth Single Factor Auth Android SDK",
    image: "banners/android.png",
    type: QUICK_START,
    tags: [tags.sfa, "sfa", tags.android, tags.evm, "kotlin"],
    link: "https://github.com/Web3Auth/web3auth-android-examples/tree/main/sfa-android-quick-start",
    id: "sfa-ios-quick-start",
    githubLink:
      "https://github.com/Web3Auth/web3auth-android-examples/tree/main/sfa-android-quick-start",
  },
];
export const coreKitSfaReactNativeExamples: ExamplesInterface[] = [
  {
    id: "sfa-rn-bare-quick-start",
    title: "Web3Auth Single Factor Auth React Native SDK Quick Start",
    description:
      "A quick integration of Web3Auth Single Factor Auth React Native SDK in Android and iOS",
    image: "banners/react-native.png",
    type: QUICK_START,
    tags: [tags.sfa, "sfa", tags.android, tags.ios, tags.evm, tags.reactNative],
    link: "https://github.com/Web3Auth/web3auth-react-native-examples/tree/main/sfa-rn-bare-quick-start",
    githubLink:
      "https://github.com/Web3Auth/web3auth-react-native-examples/tree/main/sfa-rn-bare-quick-start",
  },
  {
    id: "sfa-rn-expo-auth0-example",
    title: "Using Web3Auth Single Factor Auth React Native SDK in Expo",
    description: "Using Web3Auth Single Factor Auth React Native SDK in an Expo App",
    image: "banners/expo.png",
    type: SAMPLE_APP,
    tags: [tags.sfa, "sfa", tags.android, tags.ios, tags.reactNative, "expo"],
    link: "https://github.com/Web3Auth/web3auth-react-native-examples/tree/main/sfa-rn-expo-auth0-example",
    githubLink:
      "https://github.com/Web3Auth/web3auth-react-native-examples/tree/main/sfa-rn-expo-auth0-example",
  },
];
export const coreKitSfaFlutterExamples: ExamplesInterface[] = [
  {
    id: "sfa_flutter_quick_start",
    title: "Web3Auth Single Factor Auth Flutter SDK Quick Start",
    description:
      "A quick integration of Web3Auth Single Factor Auth Flutter SDK for Android and iOS",
    image: "banners/flutter.png",
    type: QUICK_START,
    tags: [tags.sfa, "sfa", tags.flutter, tags.ios, tags.android, tags.evm, "dart"],
    link: "https://github.com/Web3Auth/web3auth-flutter-examples/tree/main/sfa_flutter_quick_start",
    githubLink:
      "https://github.com/Web3Auth/web3auth-flutter-examples/tree/main/sfa_flutter_quick_start",
  },
  {
    id: "sfa_flutter_solana",
    title: "Integrate Web3Auth Single Factor Auth Flutter SDK with Solana Blockchain",
    description: "Use Solana Blockchain with Single Factor Auth Flutter SDK for Android and iOS",
    image: "banners/flutter-solana.png",
    type: SAMPLE_APP,
    tags: [tags.sfa, "sfa", tags.flutter, tags.ios, tags.android, "dart", tags.solana, "ed25519"],
    link: "https://github.com/Web3Auth/web3auth-flutter-examples/tree/main/sfa_flutter_solana",
    githubLink:
      "https://github.com/Web3Auth/web3auth-flutter-examples/tree/main/sfa_flutter_solana",
  },
];

export const coreKitMPCWebExamples: ExamplesInterface[] = [
  {
    title: "MPC Core Kit React Quick Start",
    description: "A quick integration of Multi Party Computation Core Kit SDK in React",
    image: "banners/react.png",
    type: QUICK_START,
    tags: [
      tags.mpcCoreKit,
      "mpc",
      tags.web,
      tags.mpcCoreKitJS,
      tags.evm,

      "react",
      "id token login",
    ],
    link: "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-web/quick-starts/mpc-core-kit-react-quick-start",
    githubLink:
      "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-web/quick-starts/mpc-core-kit-react-quick-start",
    id: "mpc-core-kit-react-quick-start",
  },
  {
    title: "MPC Core Kit Angular Quick Start",
    description: "A quick integration of Multi Party Computation Core Kit SDK in angular",
    image: "banners/angular.png",
    type: QUICK_START,
    tags: [
      tags.mpcCoreKit,
      "mpc",
      tags.web,
      tags.mpcCoreKitJS,
      tags.evm,

      "angular",
      "id token login",
    ],
    link: "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-web/quick-starts/mpc-core-kit-angular-quick-start",
    githubLink:
      "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-web/quick-starts/mpc-core-kit-angular-quick-start",
    id: "mpc-core-kit-angular-quick-start",
  },
  {
    title: "MPC Core Kit Vue Quick Start",
    description: "A quick integration of Multi Party Computation Core Kit SDK in Vue",
    image: "banners/vue.png",
    type: QUICK_START,
    tags: [tags.mpcCoreKit, "mpc", tags.web, tags.mpcCoreKitJS, tags.evm, "vue", "id token login"],
    link: "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-web/quick-starts/mpc-core-kit-vue-quick-start",
    githubLink:
      "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-web/quick-starts/mpc-core-kit-vue-quick-start",
    id: "mpc-core-kit-vue-quick-start",
  },
  {
    title: "MPC Core Kit NextJS Quick Start",
    description: "A quick integration of Multi Party Computation Core Kit SDK in NextJS",
    image: "banners/next.js.png",
    type: QUICK_START,
    tags: [
      tags.mpcCoreKit,
      "mpc",
      tags.web,
      tags.mpcCoreKitJS,
      tags.evm,

      "nextjs",
      "id token login",
    ],
    link: "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-web/quick-starts/mpc-core-kit-nextjs-quick-start",
    githubLink:
      "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-web/quick-starts/mpc-core-kit-nextjs-quick-start",
    id: "mpc-core-kit-nextjs-quick-start",
  },
  {
    title: "Use Aggregate Verifiers in MPC Core Kit SDK",
    description:
      "Aggregate Google, Auth0 GitHub & Email Passwordless in Multi Party Computation Core Kit SDK",
    image: "banners/auth0.png",
    type: SAMPLE_APP,
    tags: [
      tags.mpcCoreKit,
      "mpc",
      tags.web,
      tags.mpcCoreKitJS,
      tags.evm,

      "aggregate verifier",
      "google",
      "github",
      "email passwordless",
      "auth0",
      "id token login",
    ],
    link: "https://github.com/Web3Auth/mpc-core-kit-examples/blob/main/mpc-core-kit-web/mpc-core-kit-aggregate-verifier-example/",
    id: "mpc-core-kit-aggregate-verifier-example",
    githubLink:
      "https://github.com/Web3Auth/mpc-core-kit-examples/blob/main/mpc-core-kit-web/mpc-core-kit-aggregate-verifier-example/",
  },
  {
    title: "Integrate Farcaster Login in MPC Core Kit SDK",
    description: "Use Farcaster with Multi Party Computation Core Kit SDK",
    image: "banners/farcaster.png",
    type: SAMPLE_APP,
    tags: [
      tags.mpcCoreKit,
      "mpc",
      tags.web,
      tags.mpcCoreKitJS,
      tags.evm,

      "farcaster",
      "id token login",
    ],
    link: "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-web/mpc-core-kit-farcaster",
    id: "mpc-core-kit-farcaster",
    githubLink:
      "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-web/mpc-core-kit-farcaster",
  },
  {
    title: "Integrate MPC Core Kit SDK with Solana Blockchain",
    description: "Use Solana with MPC Core Kit SDK",
    image: "banners/solana.png",
    type: SAMPLE_APP,
    tags: [tags.mpcCoreKit, tags.web, tags.mpcCoreKitJS, tags.evm, tags.solana, "ed25519"],
    link: "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-web/mpc-core-kit-solana",
    id: "mpc-core-kit-solana",
    githubLink:
      "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-web/mpc-core-kit-solana",
  },
];
export const coreKitMPCReactNativeExamples: ExamplesInterface[] = [
  {
    id: "mpc-core-kit-rn-quick-start",
    title: "Web3Auth MPC Core Kit React Native Quick Start",
    description:
      "A quick integration of Web3Auth Multi Party Computation Core Kit in React Native for Android and iOS",
    image: "banners/react-native.png",
    type: QUICK_START,
    tags: [tags.mpcCoreKit, "mpc", tags.android, tags.evm, tags.ios, tags.reactNative],
    link: "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-react-native/mpc-core-kit-rn-quick-start",
    githubLink:
      "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-react-native/mpc-core-kit-rn-quick-start",
  },
  {
    id: "mpc-core-kit-rn-auth0",
    title: "Using Auth0 with MPC Core Kit React Native",
    description:
      "Integrate Auth0 with Web3Auth Multi Party Computation Core Kit in React Native for Android and iOS",
    image: "banners/react-native-auth0.png",
    type: SAMPLE_APP,
    tags: [
      tags.mpcCoreKit,
      "mpc",

      tags.android,
      tags.ios,
      tags.reactNative,
      tags.evm,
      "auth0",
      "id token login",
    ],
    link: "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-react-native/mpc-core-kit-rn-auth0",
    githubLink:
      "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-react-native/mpc-core-kit-rn-auth0",
  },
  {
    id: "mpc-core-kit-rn-solana",
    title: "Using Solana MPC Core Kit SDK React Native",
    description: "Integrate Solana with Web3Auth MPC Core Kit in React Native for Android and iOS",
    image: "banners/solana.png",
    type: SAMPLE_APP,
    tags: [
      tags.mpcCoreKit,
      "mpc",

      tags.android,
      tags.ios,
      tags.reactNative,
      tags.evm,
      "auth0",
      "id token login",
    ],
    link: "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-react-native/mpc-core-kit-rn-solana",
    githubLink:
      "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-react-native/mpc-core-kit-rn-solana",
  },
  {
    id: "mpc-core-kit-rn-expo-auth0",
    title: "Using MPC Core Kit SDK in Expo",
    description:
      "Integrate Auth0 with Web3Auth MPC Core Kit in React Native Expo for Android and iOS",
    image: "banners/expo.png",
    type: SAMPLE_APP,
    tags: [
      tags.mpcCoreKit,
      "mpc",

      tags.android,
      tags.ios,
      tags.reactNative,
      tags.evm,
      "auth0",
      "id token login",
    ],
    link: "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-react-native/mpc-core-kit-rn-expo-auth0",
    githubLink:
      "https://github.com/Web3Auth/mpc-core-kit-examples/tree/main/mpc-core-kit-react-native/mpc-core-kit-rn-expo-auth0",
  },
];

export const exampleMap: ExamplesInterface[] = [
  ...webExamples,
  ...pnpiOSExamples,
  ...pnpAndroidExamples,
  ...pnpReactNativeExamples,
  ...pnpFlutterExamples,
  ...pnpUnityExamples,
  ...pnpUnrealExamples,
  ...coreKitSfaiOSExamples,
  ...coreKitSfaAndroidExamples,
  ...coreKitSfaReactNativeExamples,
  ...coreKitSfaFlutterExamples,
  ...coreKitMPCWebExamples,
  ...coreKitMPCReactNativeExamples,
];

function arrayToObjectById(array) {
  return array.reduce((acc, obj) => {
    acc[obj.id] = obj;
    return acc;
  }, {});
}

export const examples = arrayToObjectById(exampleMap);
