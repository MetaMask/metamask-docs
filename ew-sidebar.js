import {
  reactJS,
  vue,
  android,
  ios,
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
        Mobile
      </a>
      <a class="sdk-sidebar-option" href="/embedded-wallets/sdk/unity">
        Gaming
      </a>
    </div>`;
}

function gamingTopNavButton(selectedSDK) {
  var gamingSDKs = {
    [unity]: `/embedded-wallets/sdk/unity`,
    [unreal]: `/embedded-wallets/sdk/unreal`,
  };
  if (gamingSDKs.hasOwnProperty(selectedSDK)) {
    delete gamingSDKs[selectedSDK];
  }
  var sdkNames = Object.keys(gamingSDKs);
  var sdkLinks = Object.values(gamingSDKs);
  var sdkVersion = getPnPVersion(selectedSDK);

  return `
    <div class="sdk-sidebar-container">
      <a class="sdk-sidebar-option" href="/embedded-wallets/sdk/react">
        Web
      </a>
      <a class="sdk-sidebar-option" href="/embedded-wallets/sdk/android">
        Mobile
      </a>
      <div class="sdk-sidebar-option-selected">
        Gaming
        <div class="sdk-sidebar-dropdown-container">
          <select class="sdk-sidebar-dropdown" onchange="location.href=this.value">
              <option value="">${selectedSDK}</option>
              <option value="${sdkLinks[0]}">${sdkNames[0]}</option>
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
        Mobile
        <div class="sdk-sidebar-dropdown-container">
          <select class="sdk-sidebar-dropdown" onchange="location.href=this.value">
              <option value="">${selectedSDK}</option>
              <option value="${sdkLinks[0]}">${sdkNames[0]}</option>
              <option value="${sdkLinks[1]}">${sdkNames[1]}</option>
              <option value="${sdkLinks[2]}">${sdkNames[2]}</option>
          </select>
          v${sdkVersion}
        </div>
      </div>
      <a class="sdk-sidebar-option" href="/embedded-wallets/sdk/unity">
        Gaming
      </a>
    </div>`;
}

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebar = {
  overview: [
    "README",
    "how-web3auth-works",
    {
      type: "category",
      label: "Dashboard",
      collapsible: true,
      collapsed: false,
      items: [
        "dashboard/README",
        "dashboard/create-new-project",
        {
          type: "category",
          label: "Configuration",
          items: [
            "dashboard/configuration/project-settings",
            "dashboard/configuration/chains-and-networks",
            "dashboard/configuration/authentication",
            "dashboard/configuration/wallet-services",
            "dashboard/configuration/customization",
            "dashboard/configuration/analytics",
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
        { type: "link", label: "Android", href: "/embedded-wallets/sdk/android" },
        { type: "link", label: "iOS", href: "/embedded-wallets/sdk/ios" },
        { type: "link", label: "React Native", href: "/embedded-wallets/sdk/react-native" },
        { type: "link", label: "Flutter", href: "/embedded-wallets/sdk/flutter" },
        { type: "link", label: "Unity", href: "/embedded-wallets/sdk/unity" },
        { type: "link", label: "Unreal", href: "/embedded-wallets/sdk/unreal" },
      ],
    },
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
  connect_blockchain: [
    "connect-blockchain/README",
    {
      type: "category",
      label: "EVM Based Chains",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/evm" },
      ],
    },
    {
      type: "category",
      label: "Solana",
      items: [{ type: "autogenerated", dirName: "connect-blockchain/solana" }],
    },
    {
      type: "category",
      label: "Other Chains",
      items: [
        { type: "autogenerated", dirName: "connect-blockchain/other" },
      ],
      collapsible: true,
      collapsed: false,
    },
    "connect-blockchain/custom-chains",
    "connect-blockchain/rpc-headers",
  ],
  infrastructure: [
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
  troubleshooting: [
    { type: "autogenerated", dirName: "troubleshooting" },
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
      type: "link",
      label: "Playground",
      href: "https://web3auth-playground.vercel.app/",
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
      label: "Functions",
      items: [
        "sdk/js/functions/README",
        "sdk/js/functions/connect",
        "sdk/js/functions/getUserInfo",
        "sdk/js/functions/getIdentityToken",
        "sdk/js/functions/logout",
        "sdk/js/functions/enableMFA",
        "sdk/js/functions/manageMFA",
        "sdk/js/functions/showCheckout",
        "sdk/js/functions/showSwap",
        "sdk/js/functions/switchChain",
        "sdk/js/functions/showWalletConnectScanner",
        "sdk/js/functions/showWalletUI",
      ],
    },
    "sdk/js/ethereum-integration",
    "sdk/js/examples",
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
    "sdk/android/install",
    "sdk/android/initialize",
    "sdk/android/usage",
    "sdk/android/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "sdk/android/whitelabel",
        "sdk/android/custom-authentication",
        "sdk/android/mfa",
        "sdk/android/dapp-share",
      ],
    },
    {
      type: "link",
      label: "Playground",
      href: "https://w3a.link/pnp-android-playground",
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
    "sdk/ios/install",
    "sdk/ios/initialize",
    "sdk/ios/usage",
    "sdk/ios/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "sdk/ios/whitelabel",
        "sdk/ios/custom-authentication",
        "sdk/ios/mfa",
        "sdk/ios/dapp-share",
      ],
    },
    {
      type: "link",
      label: "Playground",
      href: "https://w3a.link/pnp-ios-playground",
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
    "sdk/react-native/install",
    "sdk/react-native/initialize",
    "sdk/react-native/usage",
    "sdk/react-native/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "sdk/react-native/account-abstraction",
        "sdk/react-native/whitelabel",
        "sdk/react-native/custom-authentication",
        "sdk/react-native/mfa",
        "sdk/react-native/dapp-share",
      ],
    },
    {
      type: "category",
      label: "Providers",
      items: [
        "sdk/react-native/providers/README",
        "sdk/react-native/providers/evm",
        "sdk/react-native/providers/aa-provider",
        "sdk/react-native/providers/solana",
        "sdk/react-native/providers/xrpl",
        "sdk/react-native/providers/common",
      ],
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
    "sdk/flutter/install",
    "sdk/flutter/initialize",
    "sdk/flutter/usage",
    "sdk/flutter/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "sdk/flutter/whitelabel",
        "sdk/flutter/custom-authentication",
        "sdk/flutter/mfa",
        "sdk/flutter/dapp-share",
      ],
    },
    {
      type: "link",
      label: "Playground Android",
      href: "https://w3a.link/pnp-flutter-android-playground",
    },
    {
      type: "link",
      label: "Playground iOS",
      href: "https://w3a.link/pnp-flutter-ios-playground",
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
      value: gamingTopNavButton(unity),
      defaultStyle: true,
    },
    "sdk/unity/README",
    "sdk/unity/install",
    "sdk/unity/initialize",
    "sdk/unity/usage",
    "sdk/unity/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "sdk/unity/whitelabel",
        "sdk/unity/custom-authentication",
        "sdk/unity/mfa",
        "sdk/unity/dapp-share",
      ],
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
  sdk_unreal: [
    {
      type: "html",
      value: gamingTopNavButton(unreal),
      defaultStyle: true,
    },
    "sdk/unreal/README",
    "sdk/unreal/install",
    "sdk/unreal/initialize",
    "sdk/unreal/usage",
    "sdk/unreal/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "sdk/unreal/whitelabel",
        "sdk/unreal/custom-authentication",
        "sdk/unreal/mfa",
      ],
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
