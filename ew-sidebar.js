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
    [reactJS]: `/embedded-wallets/react`,
    [vue]: `/embedded-wallets/vue`,
    [js]: `/embedded-wallets/js`,
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
      <a class="sdk-sidebar-option" href="/embedded-wallets/android">
        Mobile
      </a>
      <a class="sdk-sidebar-option" href="/embedded-wallets/unity">
        Gaming
      </a>
    </div>`;
}

function gamingTopNavButton(selectedSDK) {
  var gamingSDKs = {
    [unity]: `/embedded-wallets/unity`,
    [unreal]: `/embedded-wallets/unreal`,
  };
  if (gamingSDKs.hasOwnProperty(selectedSDK)) {
    delete gamingSDKs[selectedSDK];
  }
  var sdkNames = Object.keys(gamingSDKs);
  var sdkLinks = Object.values(gamingSDKs);
  var sdkVersion = getPnPVersion(selectedSDK);

  return `
    <div class="sdk-sidebar-container">
      <a class="sdk-sidebar-option" href="/embedded-wallets/react">
        Web
      </a>
      <a class="sdk-sidebar-option" href="/embedded-wallets/android">
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
    [android]: `/embedded-wallets/android`,
    [ios]: `/embedded-wallets/ios`,
    [reactnative]: `/embedded-wallets/react-native`,
    [flutter]: `/embedded-wallets/flutter`,
  };
  if (mobileSDKs.hasOwnProperty(selectedSDK)) {
    delete mobileSDKs[selectedSDK];
  }
  var sdkNames = Object.keys(mobileSDKs);
  var sdkLinks = Object.values(mobileSDKs);
  var sdkVersion = getPnPVersion(selectedSDK);

  return `
    <div class="sdk-sidebar-container">
      <a class="sdk-sidebar-option" href="/embedded-wallets/react">
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
      <a class="sdk-sidebar-option" href="/embedded-wallets/unity">
        Gaming
      </a>
    </div>`;
}

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebar = {
  sdk_pnp_react: [
    {
      type: "html",
      value: webTopNavButton(reactJS),
      defaultStyle: true,
    },
    "react/react",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Advanced",
      items: [
        "react/advanced/advanced",
        "react/advanced/custom-authentication",
        "react/advanced/whitelabel",
        "react/advanced/mfa",
        "react/advanced/smart-accounts",
        "react/advanced/wallet-services",
      ],
    },
    {
      type: "category",
      label: "Web3Auth Hooks",
      items: [
        "react/hooks/hooks",
        "react/hooks/useWeb3Auth",
        "react/hooks/useWeb3AuthConnect",
        "react/hooks/useWeb3AuthDisconnect",
        "react/hooks/useWeb3AuthUser",
        "react/hooks/useIdentityToken",
        "react/hooks/useEnableMFA",
        "react/hooks/useManageMFA",
        "react/hooks/useCheckout",
        "react/hooks/useSwap",
        "react/hooks/useSwitchChain",
        "react/hooks/useWalletConnectScanner",
        "react/hooks/useWalletServicesPlugin",
        "react/hooks/useWalletUI",
      ],
    },
    "react/ethereum-hooks",
    {
      type: "category",
      label: "Solana Hooks",
      items: [
        "react/solana-hooks/solana-hooks",
        "react/solana-hooks/useSolanaWallet",
        "react/solana-hooks/useSignMessage",
        "react/solana-hooks/useSignTransaction",
        "react/solana-hooks/useSignAndSendTransaction",
      ],
    },
    "react/examples",
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
  sdk_pnp_vue: [
    {
      type: "html",
      value: webTopNavButton(vue),
      defaultStyle: true,
    },

    "vue/vue",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Advanced",
      items: [
        "vue/advanced/advanced",
        "vue/advanced/custom-authentication",
        "vue/advanced/whitelabel",
        "vue/advanced/mfa",
        "vue/advanced/smart-accounts",
        "vue/advanced/wallet-services",
      ],
    },
    {
      type: "category",
      label: "Web3Auth Composables",
      items: [
        "vue/composables/composables",
        "vue/composables/useWeb3Auth",
        "vue/composables/useWeb3AuthConnect",
        "vue/composables/useWeb3AuthDisconnect",
        "vue/composables/useWeb3AuthUser",
        "vue/composables/useIdentityToken",
        "vue/composables/useEnableMFA",
        "vue/composables/useManageMFA",
        "vue/composables/useCheckout",
        "vue/composables/useSwap",
        "vue/composables/useSwitchChain",
        "vue/composables/useWalletConnectScanner",
        "vue/composables/useWalletServicesPlugin",
        "vue/composables/useWalletUI",
      ],
    },
    "vue/ethereum-composables",
    {
      type: "category",
      label: "Solana Composables",
      items: [
        "vue/solana-composables/solana-composables",
        "vue/solana-composables/useSolanaWallet",
        "vue/solana-composables/useSignMessage",
        "vue/solana-composables/useSignTransaction",
        "vue/solana-composables/useSignAndSendTransaction",
      ],
    },
    "vue/examples",
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
  sdk_pnp_js: [
    {
      type: "html",
      value: webTopNavButton(js),
      defaultStyle: true,
    },
    "js/js",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Advanced",
      items: [
        "js/advanced/advanced",
        "js/advanced/custom-authentication",
        "js/advanced/whitelabel",
        "js/advanced/mfa",
        "js/advanced/smart-accounts",
        "js/advanced/wallet-services",
      ],
    },
    "js/events",
    {
      type: "category",
      label: "Functions",
      items: [
        "js/functions/functions",
        "js/functions/connect",
        "js/functions/getUserInfo",
        "js/functions/getIdentityToken",
        "js/functions/logout",
        "js/functions/enableMFA",
        "js/functions/manageMFA",
        "js/functions/showCheckout",
        "js/functions/showSwap",
        "js/functions/switchChain",
        "js/functions/showWalletConnectScanner",
        "js/functions/showWalletUI",
      ],
    },
    "js/ethereum-integration",
    "js/examples",
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
  sdk_pnp_android: [
    {
      type: "html",
      value: mobileTopNavButton(android),
      defaultStyle: true,
    },
    "android/android",
    "android/install",
    "android/initialize",
    "android/usage",
    "android/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "android/whitelabel",
        "android/custom-authentication",
        "android/mfa",
        "android/dapp-share",
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
      href: "https://web3auth.io/community/c/help-pnp/pnp-android/16",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/Web3Auth/web3auth-android-sdk/releases",
    },
  ],
  sdk_pnp_ios: [
    {
      type: "html",
      value: mobileTopNavButton(ios),
      defaultStyle: true,
    },
    "ios/ios",
    "ios/install",
    "ios/initialize",
    "ios/usage",
    "ios/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "ios/whitelabel",
        "ios/custom-authentication",
        "ios/mfa",
        "ios/dapp-share",
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
  sdk_pnp_react_native: [
    {
      type: "html",
      value: mobileTopNavButton(reactnative),
      defaultStyle: true,
    },
    "react-native/react-native",
    "react-native/install",
    "react-native/initialize",
    "react-native/usage",
    "react-native/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "react-native/account-abstraction",
        "react-native/whitelabel",
        "react-native/custom-authentication",
        "react-native/mfa",
        "react-native/dapp-share",
      ],
    },
    {
      type: "category",
      label: "Providers",
      items: [
        "react-native/providers/providers",
        "react-native/providers/evm",
        "react-native/providers/aa-provider",
        "react-native/providers/solana",
        "react-native/providers/xrpl",
        "react-native/providers/common",
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
  sdk_pnp_flutter: [
    {
      type: "html",
      value: mobileTopNavButton(flutter),
      defaultStyle: true,
    },
    "flutter/flutter",
    "flutter/install",
    "flutter/initialize",
    "flutter/usage",
    "flutter/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "flutter/whitelabel",
        "flutter/custom-authentication",
        "flutter/mfa",
        "flutter/dapp-share",
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
  sdk_pnp_unity: [
    {
      type: "html",
      value: gamingTopNavButton(unity),
      defaultStyle: true,
    },
    "unity/unity",
    "unity/install",
    "unity/initialize",
    "unity/usage",
    "unity/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "unity/whitelabel",
        "unity/custom-authentication",
        "unity/mfa",
        "unity/dapp-share",
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
  sdk_pnp_unreal: [
    {
      type: "html",
      value: gamingTopNavButton(unreal),
      defaultStyle: true,
    },
    "unreal/unreal",
    "unreal/install",
    "unreal/initialize",
    "unreal/usage",
    "unreal/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "unreal/whitelabel",
        "unreal/custom-authentication",
        "unreal/mfa",
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
