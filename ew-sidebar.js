import {
  reactJS,
  vue,
  android,
  ios,
  node,
  reactnative,
  flutter,
  unity,
  unreal,
  js,
  getPnPVersion,
  pnpWebVersion,
} from "./src/utils/w3a-sdk-map";

function webTopNavButton(selectedSDK) {

  var webSDKs = {
    [reactJS]: `/embedded-wallets/sdk/react`,
    [vue]: `/embedded-wallets/sdk/vue`,
    [js]: `/embedded-wallets/sdk/js`,
  };
  if (webSDKs.hasOwnProperty(selectedSDK)) {
    delete webSDKs[selectedSDK];
  }
  var sdkNames = Object.keys(webSDKs);
  var sdkLinks = Object.values(webSDKs);
  var sdkVersion = pnpWebVersion;

  return `
    <div class="sdk-sidebar-container">
      <div class="sdk-sidebar-option-selected">
        Web
        <div class="sdk-sidebar-dropdown-container">
          <select class="sdk-sidebar-dropdown" onchange="location.href=this.value">
              <option value="">${selectedSDK}</option>
              <option value="${sdkLinks[0]}">${sdkNames[0]}</option>
              <option value="${sdkLinks[1]}">${sdkNames[1]}</option>
          </select>
          v${sdkVersion}
        </div>
      </div>
      <a class="sdk-sidebar-option" href="/embedded-wallets/sdk/android">
        Mobile & Gaming
      </a>
      <a class="sdk-sidebar-option" href="/embedded-wallets/sdk/node">
        Backend
      </a>
    </div>`;
}

function backendTopNavButton(selectedSDK) {
  var backendSDKs = {
    [node]: `/embedded-wallets/sdk/node`,
  };
  if (backendSDKs.hasOwnProperty(selectedSDK)) {
    delete backendSDKs[selectedSDK];
  }
  // var sdkNames = Object.keys(backendSDKs);
  // var sdkLinks = Object.values(backendSDKs);
  var sdkVersion = getPnPVersion(selectedSDK);

  return `
    <div class="sdk-sidebar-container">
      <a class="sdk-sidebar-option" href="/embedded-wallets/sdk/react">
        Web
      </a>
      <a class="sdk-sidebar-option" href="/embedded-wallets/sdk/android">
        Mobile & Gaming
      </a>
      <div class="sdk-sidebar-option-selected">
        Backend
        <div class="sdk-sidebar-dropdown-container">
          <select class="sdk-sidebar-dropdown" onchange="location.href=this.value">
              <option value="">${selectedSDK}</option>
          </select>
          v${sdkVersion}
        </div>
      </div>
    </div>`;
}

function mobileTopNavButton(selectedSDK) {
  var mobileSDKs = {
    [android]: `/embedded-wallets/sdk/android`,
    [ios]: `/embedded-wallets/sdk/ios`,
    [reactnative]: `/embedded-wallets/sdk/react-native`,
    [flutter]: `/embedded-wallets/sdk/flutter`,
    [unity]: `/embedded-wallets/sdk/unity`,
    [unreal]: `/embedded-wallets/sdk/unreal`,
  };
  if (mobileSDKs.hasOwnProperty(selectedSDK)) {
    delete mobileSDKs[selectedSDK];
  }
  var sdkNames = Object.keys(mobileSDKs);
  var sdkLinks = Object.values(mobileSDKs);
  var sdkVersion = getPnPVersion(selectedSDK);

  return `
    <div class="sdk-sidebar-container">
      <a class="sdk-sidebar-option" href="/embedded-wallets/sdk/react">
        Web
      </a>
      <div class="sdk-sidebar-option-selected">
        Mobile & Gaming
        <div class="sdk-sidebar-dropdown-container">
          <select class="sdk-sidebar-dropdown" onchange="location.href=this.value">
              <option value="">${selectedSDK}</option>
              <option value="${sdkLinks[0]}">${sdkNames[0]}</option>
              <option value="${sdkLinks[1]}">${sdkNames[1]}</option>
              <option value="${sdkLinks[2]}">${sdkNames[2]}</option>
              <option value="${sdkLinks[3]}">${sdkNames[3]}</option>
              <option value="${sdkLinks[4]}">${sdkNames[4]}</option>
          </select>
          v${sdkVersion}
        </div>
      </div>
      <a class="sdk-sidebar-option" href="/embedded-wallets/sdk/node">
        Backend
      </a>
    </div>`;
}

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebar = {
  overview: [
    "README",
    "how-it-works",
    {
      type: "category",
      label: "Dashboard",
      collapsible: true,
      collapsed: false,
      items: [
        "dashboard/README",
        {
          type: "category",
          label: "Configuration",
          items: [
            "dashboard/project-settings",
            "dashboard/allowlist",
            {
              type: "category",
              label: "Advanced Settings",
              collapsible: true,
              collapsed: false,
              items: [
                "dashboard/advanced/session-management",
                "dashboard/advanced/test-accounts",
                "dashboard/advanced/user-details",
                "dashboard/advanced/key-export",
              ],
            },
            "dashboard/chains-and-networks",
            "dashboard/authentication",
            "dashboard/wallet-services",
            "dashboard/customization",
            "dashboard/analytics",
          ],
        }
      ],
    },
    {
      type: "category",
      label: "Get Started",
      collapsible: true,
      collapsed: false,
      items: [
        { type: "link", label: "React", href: "/embedded-wallets/sdk/react" },
        { type: "link", label: "Vue", href: "/embedded-wallets/sdk/vue" },
        { type: "link", label: "JavaScript", href: "/embedded-wallets/sdk/js" },
        { type: "link", label: "Node.js", href: "/embedded-wallets/sdk/node" },
        { type: "link", label: "Android", href: "/embedded-wallets/sdk/android" },
        { type: "link", label: "iOS", href: "/embedded-wallets/sdk/ios" },
        { type: "link", label: "React Native", href: "/embedded-wallets/sdk/react-native" },
        { type: "link", label: "Flutter", href: "/embedded-wallets/sdk/flutter" },
        { type: "link", label: "Unity", href: "/embedded-wallets/sdk/unity" },
        { type: "link", label: "Unreal Engine", href: "/embedded-wallets/sdk/unreal" },
      ],
    },
    {
      type: "category",
      label: "Features",
      collapsible: true,
      collapsed: false,
      items: [
        "features/external-wallets",
        "features/smart-accounts",
        "features/funding",
        "features/user-account-dashboard",
        "features/server-side-verification",
        "features/whitelabel",
        "features/wallet-pregeneration",
        "features/nft-minting",
        "features/session-management",
        "features/mpc",
      ],
    },
    {
      type: "category",
      label: "Infrastructure",
      items: [
        "infrastructure/README",
        "infrastructure/mpc-architecture",
        "infrastructure/sss-architecture",
        "infrastructure/nodes-and-dkg",
        "infrastructure/glossary",
        {
          type: "link",
          label: "Compliance, Audits and Trust",
          href: "https://trust.web3auth.io",
        },
      ],
    },
    {
      type: "category",
      label: "Troubleshooting",
      items: [
        { type: "autogenerated", dirName: "troubleshooting" },
      ],
    }
  ],
  authentication: [
    "authentication/README",
    {
      type: "category",
      label: "Basic Logins",
      collapsible: true,
      collapsed: false,
      items: [
        "authentication/basic-logins/email-passwordless",
        "authentication/basic-logins/sms-otp",
        "authentication/basic-logins/external-wallets",
      ],
      collapsible: true,
      collapsed: false,
    },
    {
      type: "category",
      label: "Social Logins",
      collapsible: true,
      collapsed: false,
      items: [
        "authentication/social-logins/google",
        "authentication/social-logins/facebook",
        "authentication/social-logins/twitch",
        "authentication/social-logins/discord",
        "authentication/social-logins/oauth",
      ],
    },
    {
      type: "category",
      label: "Custom Connections",
      collapsible: true,
      collapsed: false,
      items: [
        "authentication/custom-connections/auth0",
        "authentication/custom-connections/aws-cognito",
        "authentication/custom-connections/firebase",
        "authentication/custom-connections/custom-jwt",
      ],
    },
    "authentication/group-connections",
    "authentication/id-token",
  ],
  other_blockchains: [
    "connect-blockchain/README",
    { type: "autogenerated", dirName: "connect-blockchain/other" },
  ],
  evm: [
    "connect-blockchain/evm/README",
    {
      type: "html",
      value: "<strong style='font-size:1.1em;display:block;margin:12px 0;'>Popular Chains</strong>",
      defaultStyle: true,
    },
    {
      type: "category",
      label: "Ethereum",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/ethereum" },
      ],
    },
    {
      type: "category",
      label: "Linea",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/linea" },
      ],
    },

    {
      type: "category",
      label: "Arbitrum",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/arbitrum" },
      ],
    },
    {
      type: "category",
      label: "Avalanche",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/avalanche" },
      ],
    },
    {
      type: "category",
      label: "Base",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/base" },
      ],
    },
    {
      type: "category",
      label: "BNB Chain",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/bnb" },
      ],
    },
    {
      type: "category",
      label: "Monad",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/monad" },
      ],
    },
    {
      type: "category",
      label: "Optimism",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/optimism" },
      ],
    },
    {
      type: "category",
      label: "Polygon",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/polygon" },
      ],
    },
    {
      type: "html",
      value: "<strong style='font-size:1.1em;display:block;margin:12px 0;'>EVM Compatible Chains</strong>",
      defaultStyle: true,
    },
    {
      type: "category",
      label: "Aleph Zero",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/aleph-zero" },
      ],
    },
    {
      type: "category",
      label: "Ancient8",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/ancient8" },
      ],
    },
    {
      type: "category",
      label: "Astar zKyoto",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/astar-zkyoto" },
      ],
    },
    {
      type: "category",
      label: "Astar zkEVM",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/astar-zkevm" },
      ],
    },
    {
      type: "category",
      label: "BitKub",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/bitkub" },
      ],
    },
    {
      type: "category",
      label: "Celo",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/celo" },
      ],
    },
    {
      type: "category",
      label: "Chiliz",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/chiliz" },
      ],
    },
    {
      type: "category",
      label: "Cronos",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/cronos" },
      ],
    },
    {
      type: "category",
      label: "Fhenix",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/fhenix" },
      ],
    },
    {
      type: "category",
      label: "Flare",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/flare" },
      ],
    },
    {
      type: "category",
      label: "Flow",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/flow" },
      ],
    },
    {
      type: "category",
      label: "Harmony",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/harmony" },
      ],
    },
    {
      type: "category",
      label: "Hedera",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/hedera" },
      ],
    },
    {
      type: "category",
      label: "Kinto",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/kinto" },
      ],
    },
    {
      type: "category",
      label: "Klaytn",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/klaytn" },
      ],
    },
    {
      type: "category",
      label: "Manta",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/manta" },
      ],
    },
    {
      type: "category",
      label: "Metis",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/metis" },
      ],
    },
    {
      type: "category",
      label: "Mint",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/mint" },
      ],
    },
    {
      type: "category",
      label: "Moonbeam",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/moonbeam" },
      ],
    },
    {
      type: "category",
      label: "Moonriver",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/moonriver" },
      ],
    },
    {
      type: "category",
      label: "Morph",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/morph" },
      ],
    },
    {
      type: "category",
      label: "Neon",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/neon" },
      ],
    },
    {
      type: "category",
      label: "Nibiru",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/nibiru" },
      ],
    },
    {
      type: "category",
      label: "opBNB",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/opbnb" },
      ],
    },
    {
      type: "category",
      label: "Rootstock",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/rootstock" },
      ],
    },
    {
      type: "category",
      label: "Saakuru",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/saakuru" },
      ],
    },
    {
      type: "category",
      label: "Shardeum",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/shardeum" },
      ],
    },
    {
      type: "category",
      label: "SKALE",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/skale" },
      ],
    },
    {
      type: "category",
      label: "Songbird",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/songbird" },
      ],
    },
    {
      type: "category",
      label: "Soneium",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/soneium" },
      ],
    },
    {
      type: "category",
      label: "Unichain",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/unichain" },
      ],
    },
    {
      type: "category",
      label: "XDC Network",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/xdc" },
      ],
    },
    {
      type: "category",
      label: "Zetachain",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/zetachain" },
      ],
    },
    {
      type: "category",
      label: "Zilliqa",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/zilliqa" },
      ],
    },
    {
      type: "category",
      label: "Zircuit",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/zircuit" },
      ],
    },
    {
      type: "category",
      label: "Tron",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm/tron" },
      ],
    },
    "connect-blockchain/evm/rpc-headers",

  ],
  solana: [
    { type: "autogenerated", dirName: "connect-blockchain/solana" },
  ],
  sdk_react: [
    {
      type: "html",
      value: webTopNavButton(reactJS),
      defaultStyle: true,
    },
    "sdk/react/README",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Advanced",
      items: [
        "sdk/react/advanced/README",
        "sdk/react/advanced/custom-authentication",
        "sdk/react/advanced/whitelabel",
        "sdk/react/advanced/mfa",
        "sdk/react/advanced/smart-accounts",
        "sdk/react/advanced/wallet-services",
      ],
    },
    {
      type: "category",
      label: "Web3Auth Hooks",
      items: [
        "sdk/react/hooks/README",
        "sdk/react/hooks/useWeb3Auth",
        "sdk/react/hooks/useWeb3AuthConnect",
        "sdk/react/hooks/useWeb3AuthDisconnect",
        "sdk/react/hooks/useWeb3AuthUser",
        "sdk/react/hooks/useIdentityToken",
        "sdk/react/hooks/useEnableMFA",
        "sdk/react/hooks/useManageMFA",
        "sdk/react/hooks/useCheckout",
        "sdk/react/hooks/useSwap",
        "sdk/react/hooks/useSwitchChain",
        "sdk/react/hooks/useWalletConnectScanner",
        "sdk/react/hooks/useWalletServicesPlugin",
        "sdk/react/hooks/useWalletUI",
      ],
    },
    "sdk/react/ethereum-hooks",
    {
      type: "category",
      label: "Solana Hooks",
      items: [
        "sdk/react/solana-hooks/README",
        "sdk/react/solana-hooks/useSolanaWallet",
        "sdk/react/solana-hooks/useSignMessage",
        "sdk/react/solana-hooks/useSignTransaction",
        "sdk/react/solana-hooks/useSignAndSendTransaction",
      ],
    },
    "sdk/react/examples",
    {
      type: "category",
      label: "Migration Guides",
      items: [
        { type: "autogenerated", dirName: "sdk/react/migration-guides" },
      ],
    },
    {
      type: "link",
      label: "Troubleshooting",
      href: "/embedded-wallets/troubleshooting/",
    },
    {
      type: "link",
      label: "Support Forum",
      href: "https://web3auth.io/community/c/help-pnp/pnp-web/7",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/Web3Auth/web3auth-web/releases",
    },
  ],
  sdk_vue: [
    {
      type: "html",
      value: webTopNavButton(vue),
      defaultStyle: true,
    },

    "sdk/vue/README",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Advanced",
      items: [
        "sdk/vue/advanced/README",
        "sdk/vue/advanced/custom-authentication",
        "sdk/vue/advanced/whitelabel",
        "sdk/vue/advanced/mfa",
        "sdk/vue/advanced/smart-accounts",
        "sdk/vue/advanced/wallet-services",
      ],
    },
    {
      type: "category",
      label: "Web3Auth Composables",
      items: [
        "sdk/vue/composables/README",
        "sdk/vue/composables/useWeb3Auth",
        "sdk/vue/composables/useWeb3AuthConnect",
        "sdk/vue/composables/useWeb3AuthDisconnect",
        "sdk/vue/composables/useWeb3AuthUser",
        "sdk/vue/composables/useIdentityToken",
        "sdk/vue/composables/useEnableMFA",
        "sdk/vue/composables/useManageMFA",
        "sdk/vue/composables/useCheckout",
        "sdk/vue/composables/useSwap",
        "sdk/vue/composables/useSwitchChain",
        "sdk/vue/composables/useWalletConnectScanner",
        "sdk/vue/composables/useWalletServicesPlugin",
        "sdk/vue/composables/useWalletUI",
      ],
    },
    "sdk/vue/ethereum-composables",
    {
      type: "category",
      label: "Solana Composables",
      items: [
        "sdk/vue/solana-composables/README",
        "sdk/vue/solana-composables/useSolanaWallet",
        "sdk/vue/solana-composables/useSignMessage",
        "sdk/vue/solana-composables/useSignTransaction",
        "sdk/vue/solana-composables/useSignAndSendTransaction",
      ],
    },
    "sdk/vue/examples",
    {
      type: "category",
      label: "Migration Guides",
      items: [
        { type: "autogenerated", dirName: "sdk/vue/migration-guides" },
      ],
    },
    {
      type: "link",
      label: "Troubleshooting",
      href: "/embedded-wallets/troubleshooting/",
    },
    {
      type: "link",
      label: "Support Forum",
      href: "https://web3auth.io/community/c/help-pnp/pnp-web/7",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/Web3Auth/web3auth-web/releases",
    },
  ],
  sdk_js: [
    {
      type: "html",
      value: webTopNavButton(js),
      defaultStyle: true,
    },
    "sdk/js/README",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Advanced",
      items: [
        "sdk/js/advanced/README",
        "sdk/js/advanced/custom-authentication",
        "sdk/js/advanced/whitelabel",
        "sdk/js/advanced/mfa",
        "sdk/js/advanced/smart-accounts",
        "sdk/js/advanced/wallet-services",
      ],
    },
    "sdk/js/events",
    {
      type: "category",
      label: "Usage",
      items: [
        "sdk/js/usage/README",
        "sdk/js/usage/connect",
        "sdk/js/usage/getUserInfo",
        "sdk/js/usage/getIdentityToken",
        "sdk/js/usage/logout",
        "sdk/js/usage/enableMFA",
        "sdk/js/usage/manageMFA",
        "sdk/js/usage/showCheckout",
        "sdk/js/usage/showSwap",
        "sdk/js/usage/switchChain",
        "sdk/js/usage/showWalletConnectScanner",
        "sdk/js/usage/showWalletUI",
      ],
    },
    "sdk/js/ethereum-integration",
    "sdk/js/examples",
    {
      type: "category",
      label: "Migration Guides",
      items: [
        {
          type: "category",
          label: "Modal",
          items: [
            { type: "autogenerated", dirName: "sdk/js/migration-guides/modal" },
          ],
        },
        {
          type: "category",
          label: "No Modal",
          items: [
            { type: "autogenerated", dirName: "sdk/js/migration-guides/no-modal" },
          ],
        },
      ],
    },
    {
      type: "link",
      label: "Troubleshooting",
      href: "/embedded-wallets/troubleshooting/",
    },
    {
      type: "link",
      label: "Support Forum",
      href: "https://web3auth.io/community/c/help-pnp/pnp-web/7",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/Web3Auth/web3auth-web/releases",
    },
  ],
  sdk_android: [
    {
      type: "html",
      value: mobileTopNavButton(android),
      defaultStyle: true,
    },
    "sdk/android/README",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Advanced",
      items: [
        "sdk/android/advanced/README",
        "sdk/android/advanced/custom-authentication",
        "sdk/android/advanced/whitelabel",
        "sdk/android/advanced/mfa",
        "sdk/android/advanced/dapp-share",
      ],
    },
    {
      type: "category",
      label: "Usage",
      items: [
        "sdk/android/usage/README",
        "sdk/android/usage/login",
        "sdk/android/usage/getUserInfo",
        "sdk/android/usage/getPrivKey",
        "sdk/android/usage/getEd25519PrivKey",
        "sdk/android/usage/logout",
        "sdk/android/usage/enableMFA",
        "sdk/android/usage/manageMFA",
        "sdk/android/usage/launchWalletServices",
        "sdk/android/usage/request",
      ],
    },
    "sdk/android/examples",
    {
      type: "category",
      label: "Migration Guides",
      items: [
        { type: "autogenerated", dirName: "sdk/android/migration-guides" },
      ],
    },
    {
      type: "link",
      label: "Troubleshooting",
      href: "/embedded-wallets/troubleshooting/",
    },
    {
      type: "link",
      label: "Support Forum",
      href: "https://web3auth.io/community/c/help-pnp/pnp-sdk/android/16",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/Web3Auth/web3auth-android-sdk/releases",
    },
  ],
  sdk_ios: [
    {
      type: "html",
      value: mobileTopNavButton(ios),
      defaultStyle: true,
    },
    "sdk/ios/README",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Advanced",
      items: [
        "sdk/ios/advanced/README",
        "sdk/ios/advanced/custom-authentication",
        "sdk/ios/advanced/whitelabel",
        "sdk/ios/advanced/mfa",
        "sdk/ios/advanced/dapp-share",
      ],
    },
    {
      type: "category",
      label: "Usage",
      items: [
        "sdk/ios/usage/README",
        "sdk/ios/usage/login",
        "sdk/ios/usage/getUserInfo",
        "sdk/ios/usage/getPrivKey",
        "sdk/ios/usage/getEd25519PrivKey",
        "sdk/ios/usage/logout",
        "sdk/ios/usage/enableMFA",
        "sdk/ios/usage/manageMFA",
        "sdk/ios/usage/launchWalletServices",
        "sdk/ios/usage/request",
      ],
    },
    "sdk/ios/examples",
    {
      type: "category",
      label: "Migration Guides",
      items: [
        { type: "autogenerated", dirName: "sdk/ios/migration-guides" },
      ],
    },
    {
      type: "link",
      label: "Troubleshooting",
      href: "/embedded-wallets/troubleshooting/",
    },
    {
      type: "link",
      label: "Support Forum",
      href: "https://web3auth.io/community/c/help-pnp/pnp-ios/17",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/Web3Auth/web3auth-swift-sdk/releases",
    },
  ],
  sdk_react_native: [
    {
      type: "html",
      value: mobileTopNavButton(reactnative),
      defaultStyle: true,
    },
    "sdk/react-native/README",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Advanced",
      items: [
        "sdk/react-native/advanced/README",
        "sdk/react-native/advanced/custom-authentication",
        "sdk/react-native/advanced/smart-accounts",
        "sdk/react-native/advanced/whitelabel",
        "sdk/react-native/advanced/mfa",
        "sdk/react-native/advanced/dapp-share",
      ],
    },
    {
      type: "category",
      label: "Usage",
      items: [
        "sdk/react-native/usage/README",
        "sdk/react-native/usage/login",
        "sdk/react-native/usage/userInfo",
        "sdk/react-native/usage/privKey",
        "sdk/react-native/usage/ed25519Key",
        "sdk/react-native/usage/logout",
        "sdk/react-native/usage/enableMFA",
        "sdk/react-native/usage/launchWalletServices",
        "sdk/react-native/usage/request",
      ],
    },
    "sdk/react-native/examples",
    {
      type: "category",
      label: "Migration Guides",
      items: [
        { type: "autogenerated", dirName: "sdk/react-native/migration-guides" },
      ],
    },
    {
      type: "link",
      label: "Troubleshooting",
      href: "/embedded-wallets/troubleshooting/",
    },
    {
      type: "link",
      label: "Support Forum",
      href: "https://web3auth.io/community/c/help-pnp/pnp-rn/19",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/Web3Auth/web3auth-react-native-sdk/releases",
    },
  ],
  sdk_flutter: [
    {
      type: "html",
      value: mobileTopNavButton(flutter),
      defaultStyle: true,
    },
    "sdk/flutter/README",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Advanced",
      items: [
        "sdk/flutter/advanced/README",
        "sdk/flutter/advanced/custom-authentication",
        "sdk/flutter/advanced/whitelabel",
        "sdk/flutter/advanced/mfa",
        "sdk/flutter/advanced/dapp-share",
      ],
    },
    {
      type: "category",
      label: "Usage",
      items: [
        "sdk/flutter/usage/README",
        "sdk/flutter/usage/login",
        "sdk/flutter/usage/getUserInfo",
        "sdk/flutter/usage/getPrivKey",
        "sdk/flutter/usage/getEd25519PrivKey",
        "sdk/flutter/usage/logout",
        "sdk/flutter/usage/enableMFA",
        "sdk/flutter/usage/manageMFA",
        "sdk/flutter/usage/launchWalletServices",
        "sdk/flutter/usage/request",
      ],
    },
    "sdk/flutter/examples",
    {
      type: "category",
      label: "Migration Guides",
      items: [
        { type: "autogenerated", dirName: "sdk/flutter/migration-guides" },
      ],
    },
    {
      type: "link",
      label: "Troubleshooting",
      href: "/embedded-wallets/troubleshooting/",
    },
    {
      type: "link",
      label: "Support Forum",
      href: "https://web3auth.io/community/c/help-pnp/pnp-flutter/18",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/Web3Auth/web3auth-flutter-sdk/releases",
    },
  ],
  sdk_unity: [
    {
      type: "html",
      value: mobileTopNavButton(unity),
      defaultStyle: true,
    },
    "sdk/unity/README",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Advanced",
      items: [
        "sdk/unity/advanced/README",
        "sdk/unity/advanced/custom-authentication",
        "sdk/unity/advanced/whitelabel",
        "sdk/unity/advanced/mfa",
        "sdk/unity/advanced/dapp-share",
      ],
    },
    {
      type: "category",
      label: "Usage",
      items: [
        "sdk/unity/usage/README",
        "sdk/unity/usage/login",
        "sdk/unity/usage/getUserInfo",
        "sdk/unity/usage/getPrivKey",
        "sdk/unity/usage/getEd25519PrivKey",
        "sdk/unity/usage/logout",
        "sdk/unity/usage/enableMFA",
        "sdk/unity/usage/launchWalletServices",
        "sdk/unity/usage/request",
      ],
    },
    "sdk/unity/examples",
    {
      type: "link",
      label: "Troubleshooting",
      href: "/embedded-wallets/troubleshooting/",
    },
    {
      type: "link",
      label: "Support Forum",
      href: "https://web3auth.io/community/c/help-pnp/pnp-unity/20",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/Web3Auth/web3auth-unity-sdk/releases",
    },
  ],
  sdk_node: [
    {
      type: "html",
      value: backendTopNavButton(node),
      defaultStyle: true,
    },
    "sdk/node/README",
    "sdk/node/connect",
    "sdk/node/blockchain-connection",
    "sdk/node/private-key",
    "sdk/node/examples",
    {
      type: "link",
      label: "Troubleshooting",
      href: "/embedded-wallets/troubleshooting/",
    },
    {
      type: "link",
      label: "Support Forum",
      href: "https://web3auth.io/community/c/help-pnp/pnp-node/21",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/Web3Auth/web3auth-backend/releases",
    },
  ],
  sdk_unreal: [
    {
      type: "html",
      value: mobileTopNavButton(unreal),
      defaultStyle: true,
    },
    "sdk/unreal/README",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Advanced",
      items: [
        "sdk/unreal/advanced/README",
        "sdk/unreal/advanced/custom-authentication",
        "sdk/unreal/advanced/whitelabel",
        "sdk/unreal/advanced/mfa",
      ],
    },
    {
      type: "category",
      label: "Usage",
      items: [
        "sdk/unreal/usage/README",
        "sdk/unreal/usage/login",
        "sdk/unreal/usage/getUserInfo",
        "sdk/unreal/usage/getPrivKey",
        "sdk/unreal/usage/getEd25519PrivKey",
        "sdk/unreal/usage/logout",
      ],
    },
    "sdk/unreal/examples",
    {
      type: "link",
      label: "Troubleshooting",
      href: "/embedded-wallets/troubleshooting/",
    },
    {
      type: "link",
      label: "Support Forum",
      href: "https://web3auth.io/community/c/help-pnp/pnp-unreal/21",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/Web3Auth/web3auth-unreal-sdk/releases",
    },
  ],
};

export default sidebar;
