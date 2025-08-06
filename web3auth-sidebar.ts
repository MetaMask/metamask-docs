import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

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
} from "./src/common/SDKOptions";

import {
  getPnPVersion,
  getSFAVersion,
  getMPCCoreKitVersion,
  pnpWebVersion,
} from "./src/common/versions";

function webTopNavButton(selectedSDK: string): string {
  const baseUrl = process.env.REACT_APP_BASE_URL || "/docs/";

  var webSDKs = {
    [reactJS]: `${baseUrl}sdk/web/react`,
    [vue]: `${baseUrl}sdk/web/vue`,
    [js]: `${baseUrl}sdk/web/js`,
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
      <a class="sdk-sidebar-option" href="${baseUrl}sdk/mobile">
        Mobile
      </a>
      <a class="sdk-sidebar-option" href="${baseUrl}sdk/gaming">
        Gaming
      </a>
    </div>`;
}

function gamingTopNavButton(selectedSDK: string): string {
  const baseUrl = process.env.REACT_APP_BASE_URL || "/docs/";

  var gamingSDKs = {
    [unity]: `${baseUrl}sdk/gaming/unity`,
    [unreal]: `${baseUrl}sdk/gaming/unreal`,
  };
  if (gamingSDKs.hasOwnProperty(selectedSDK)) {
    delete gamingSDKs[selectedSDK];
  }
  var sdkNames = Object.keys(gamingSDKs);
  var sdkLinks = Object.values(gamingSDKs);
  var sdkVersion = getPnPVersion(selectedSDK);

  return `
    <div class="sdk-sidebar-container">
      <a class="sdk-sidebar-option" href="${baseUrl}sdk/web">
        Web
      </a>
      <a class="sdk-sidebar-option" href="${baseUrl}sdk/mobile">
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

function pnpMobileTopNavButton(selectedSDK: string): string {
  const baseUrl = process.env.REACT_APP_BASE_URL || "/docs/";

  var pnpMobileSDKs = {
    [android]: `${baseUrl}sdk/mobile/pnp/android`,
    [ios]: `${baseUrl}sdk/mobile/pnp/ios`,
    [reactnative]: `${baseUrl}sdk/mobile/pnp/react-native`,
    [flutter]: `${baseUrl}sdk/mobile/pnp/flutter`,
  };
  if (pnpMobileSDKs.hasOwnProperty(selectedSDK)) {
    delete pnpMobileSDKs[selectedSDK];
  }
  var sdkNames = Object.keys(pnpMobileSDKs);
  var sdkLinks = Object.values(pnpMobileSDKs);
  var sdkVersion = getPnPVersion(selectedSDK);

  return `
    <div class="sdk-sidebar-container">
      <a class="sdk-sidebar-option" href="${baseUrl}sdk/web">
        Web
      </a>
      <div class="sdk-sidebar-option-selected">
        Plug and Play
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
      <a class="sdk-sidebar-option" href="${baseUrl}sdk/mobile/sfa/android">
        Single Factor Auth
        <span class="sdk-sidebar-description">Use native logins of your app, keeping Web3Auth hidden from users.</span>
      </a>
      <a class="sdk-sidebar-option" href="${baseUrl}sdk/gaming">
        Gaming
      </a>
    </div>`;
}

function sfaMobileTopNavButton(selectedSDK: string): string {
  const baseUrl = process.env.REACT_APP_BASE_URL || "/docs/";

  var sfaMobileSDKs = {
    [android]: `${baseUrl}sdk/mobile/sfa/android`,
    [ios]: `${baseUrl}sdk/mobile/sfa/ios`,
    [reactnative]: `${baseUrl}sdk/mobile/sfa/react-native`,
    [flutter]: `${baseUrl}sdk/mobile/sfa/flutter`,
  };
  if (sfaMobileSDKs.hasOwnProperty(selectedSDK)) {
    delete sfaMobileSDKs[selectedSDK];
  }
  var sdkNames = Object.keys(sfaMobileSDKs);
  var sdkLinks = Object.values(sfaMobileSDKs);
  var sdkVersion = getSFAVersion(selectedSDK);

  return `
    <div class="sdk-sidebar-container">
      <a class="sdk-sidebar-option" href="${baseUrl}sdk/web">
        Web
      </a>
      <a class="sdk-sidebar-option" href="${baseUrl}sdk/mobile/pnp/android">
        Plug and Play
        <span class="sdk-sidebar-description">Integrate the full Web3Auth functionality with just 4 lines of code.</span>
      </a>
      <div class="sdk-sidebar-option-selected">
        Single Factor Auth
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
      <a class="sdk-sidebar-option" href="${baseUrl}sdk/gaming">
        Gaming
      </a>
    </div>`;
}

function mpcckTopNavButton(selectedSDK: string): string {
  const baseUrl = process.env.REACT_APP_BASE_URL || "/docs/";

  var mpcCoreKitSDKs = {
    [js]: `${baseUrl}sdk/mpc-core-kit/mpc-core-kit-js`,
    [reactnative]: `${baseUrl}sdk/mpc-core-kit/mpc-core-kit-react-native`,
  };
  if (mpcCoreKitSDKs.hasOwnProperty(selectedSDK)) {
    delete mpcCoreKitSDKs[selectedSDK];
  }
  var sdkNames = Object.keys(mpcCoreKitSDKs);
  var sdkLinks = Object.values(mpcCoreKitSDKs);
  var sdkVersion = getMPCCoreKitVersion(selectedSDK);

  return `
    <div class="sdk-sidebar-container">
      <div class="sdk-sidebar-option-selected">
        MPC Core Kit
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

const sdkQuickLinks: any = [
  {
    type: "html",
    value: "<span class='sidebarHeading'>Additional Reading</span>",
    defaultStyle: true,
  },
  {
    type: "link",
    label: "Quick Start",
    href: "/quick-start",
  },
  {
    type: "link",
    label: "Examples",
    href: "/examples",
  },
  {
    type: "link",
    label: "Authentication",
    href: "/authentication",
  },
  {
    type: "link",
    label: "Connect Blockchain",
    href: "/connect-blockchain",
  },
  {
    type: "link",
    label: "Troubleshooting",
    href: "/troubleshooting",
  },
  {
    type: "link",
    label: "Dashboard",
    href: "/dashboard",
  },
];

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: "html",
      value: "<span class='sidebarHeading'>Quick Links</span>",
      defaultStyle: true,
    },
    {
      type: "html",
      value: `<a class='sidebarLink' href="https://web3auth.io/community/c/announcements/5" target="_blank">
      <svg width="20" height="20" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2382_32884)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2197 2.52454C15.4635 2.63322 15.6251 2.91009 15.6251 3.21939V6.5105C16.221 6.65496 16.7733 7.00412 17.2098 7.52245C17.7958 8.21838 18.1251 9.16227 18.1251 10.1465C18.1251 11.1307 17.7958 12.0746 17.2098 12.7705C16.7733 13.2888 16.221 13.638 15.6251 13.7825V17.0736C15.6251 17.3829 15.4635 17.6597 15.2197 17.7684C14.9758 17.8771 14.7008 17.7948 14.5294 17.5619C13.7097 16.4479 12.0088 15.4883 9.79172 15.0698V19.2902C9.79137 19.8752 9.61719 20.4417 9.29988 20.8891C8.98256 21.3365 8.54246 21.6365 8.05712 21.7364C7.57178 21.8362 7.07233 21.7295 6.64677 21.4349C6.22121 21.1404 5.89683 20.6769 5.7308 20.1262L5.72913 20.1207L4.02651 14.3291C3.304 13.8888 2.71049 13.1942 2.33019 12.3351C1.90553 11.3758 1.77301 10.2717 1.95506 9.20963C2.13712 8.14761 2.62257 7.1929 3.32926 6.50706C4.03595 5.82122 4.92048 5.44637 5.83315 5.44596H7.36005C7.95219 5.44596 8.52857 5.40788 9.0825 5.33587C9.09232 5.3343 9.10222 5.33299 9.11219 5.33197C11.6599 4.9947 13.6279 3.9563 14.5294 2.73106C14.7008 2.49814 14.9758 2.41585 15.2197 2.52454ZM15.6251 12.2457C15.8862 12.136 16.1263 11.958 16.3259 11.7209C16.6775 11.3033 16.8751 10.737 16.8751 10.1465C16.8751 9.55596 16.6775 8.98962 16.3259 8.57206C16.1263 8.335 15.8862 8.15692 15.6251 8.04725V12.2457Z" fill="currentColor"/>
        </g>
        <defs>
        <clipPath id="clip0_2382_32884">
        <rect width="20" height="23.75" fill="none" transform="translate(0.000244141 0.25)"/>
        </clipPath>
        </defs>
      </svg>
      <span class='sidebarLinkText'>Announcements</span>
      </a>`,
      defaultStyle: true,
    },
    {
      type: "html",
      value: `<a class='sidebarLink' href="/docs/resources">
      <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 2.26404C3.46957 2.26404 2.96086 2.47475 2.58579 2.84982C2.21071 3.2249 2 3.73361 2 4.26404V15.264C2 16.0597 2.31607 16.8228 2.87868 17.3854C3.44129 17.948 4.20435 18.264 5 18.264C5.79565 18.264 6.55871 17.948 7.12132 17.3854C7.68393 16.8228 8 16.0597 8 15.264V4.26404C8 3.73361 7.78929 3.2249 7.41421 2.84982C7.03914 2.47475 6.53043 2.26404 6 2.26404H4ZM5 16.264C5.26522 16.264 5.51957 16.1587 5.70711 15.9711C5.89464 15.7836 6 15.5293 6 15.264C6 14.9988 5.89464 14.7445 5.70711 14.5569C5.51957 14.3694 5.26522 14.264 5 14.264C4.73478 14.264 4.48043 14.3694 4.29289 14.5569C4.10536 14.7445 4 14.9988 4 15.264C4 15.5293 4.10536 15.7836 4.29289 15.9711C4.48043 16.1587 4.73478 16.264 5 16.264ZM10 14.507L14.9 9.60704C15.2749 9.23198 15.4856 8.72337 15.4856 8.19304C15.4856 7.66271 15.2749 7.15409 14.9 6.77904L13.485 5.36404C13.1099 4.9891 12.6013 4.77847 12.071 4.77847C11.5407 4.77847 11.0321 4.9891 10.657 5.36404L10 6.02104V14.507ZM16 18.264H9.071L15.071 12.264H16C16.5304 12.264 17.0391 12.4748 17.4142 12.8498C17.7893 13.2249 18 13.7336 18 14.264V16.264C18 16.7945 17.7893 17.3032 17.4142 17.6783C17.0391 18.0533 16.5304 18.264 16 18.264Z" fill="currentColor"/>
</svg>

      <span class='sidebarLinkText'>Resources</span>
      </a>`,
      defaultStyle: true,
    },
    {
      type: "html",
      value: `<a class='sidebarLink' href="/docs/quick-start">
      <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.59022 12.2135L10.59 2.21384C10.651 2.12674 10.7382 2.06135 10.8389 2.02718C10.9396 1.99301 11.0486 1.99184 11.15 2.02384L11.1801 2.03333C11.2692 2.06763 11.3468 2.12683 11.4036 2.20416C11.4665 2.28995 11.5005 2.39358 11.5004 2.49999V2.50002V7.50002V8.00002H12.0004H16.0004H16.0007C16.0921 7.99998 16.1818 8.02502 16.2601 8.07243C16.3383 8.11984 16.402 8.18779 16.4443 8.26889C16.4865 8.34999 16.5058 8.44113 16.4998 8.5324C16.4939 8.62367 16.4631 8.71156 16.4107 8.78652L9.41083 18.7863L9.41044 18.7868C9.34953 18.8741 9.26236 18.9397 9.16161 18.974C9.06087 19.0083 8.95181 19.0095 8.85029 18.9776C8.74878 18.9456 8.66011 18.8821 8.59719 18.7963C8.53427 18.7104 8.50038 18.6068 8.50044 18.5003V18.5V13.5V13H8.00044H4.00045H4.00022C3.90876 13.0001 3.81904 12.975 3.74083 12.9276C3.66262 12.8802 3.59891 12.8122 3.55663 12.7311C3.51435 12.65 3.49513 12.5589 3.50105 12.4676C3.50697 12.3764 3.53782 12.2885 3.59022 12.2135Z" fill="currentColor" stroke="currentColor"/>
</svg>

      <span class='sidebarLinkText'>Quick Start</span>
      </a>`,
      defaultStyle: true,
    },
    {
      type: "html",
      value: `<a class='sidebarLink' href="/docs/examples">
      <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.70668 10.5L3.06023 10.1464L5.35318 7.85348C5.3532 7.85347 5.35322 7.85345 5.35323 7.85343C5.44694 7.75967 5.49957 7.63254 5.49957 7.49998C5.49957 7.36745 5.44696 7.24034 5.35329 7.14659C5.35325 7.14656 5.35322 7.14652 5.35318 7.14648M2.70668 10.5L4.29279 6.79298C4.48031 6.60551 4.73462 6.5002 4.99979 6.5002C5.26495 6.5002 5.51926 6.60551 5.70679 6.79298L5.35318 7.14648M2.70668 10.5L3.06023 10.8535L5.35323 13.1465L5.35318 13.1466L5.35943 13.1526C5.40719 13.1988 5.44528 13.2539 5.47148 13.3149C5.49769 13.3759 5.51148 13.4415 5.51206 13.5079C5.51263 13.5743 5.49998 13.6402 5.47484 13.7016C5.4497 13.7631 5.41257 13.8189 5.36563 13.8658C5.31868 13.9128 5.26286 13.9499 5.20141 13.975C5.13996 14.0002 5.07412 14.0128 5.00773 14.0123C4.94134 14.0117 4.87573 13.9979 4.81473 13.9717C4.75373 13.9455 4.69855 13.9074 4.65243 13.8596L4.65249 13.8596L4.64634 13.8534L1.64639 10.8535C1.64638 10.8535 1.64636 10.8534 1.64634 10.8534C1.55264 10.7597 1.5 10.6325 1.5 10.5C1.5 10.3674 1.55264 10.2403 1.64634 10.1465C1.64636 10.1465 1.64638 10.1465 1.64639 10.1465L4.64629 7.14659M2.70668 10.5L4.64629 7.14659M5.35318 7.14648C5.25943 7.05281 5.13232 7.0002 4.99979 7.0002C4.8672 7.0002 4.74005 7.05286 4.64629 7.14659M5.35318 7.14648L4.64629 7.14659M12.1577 4.02534L12.1579 4.02541C12.2203 4.04615 12.2779 4.07896 12.3275 4.12197C12.3772 4.16498 12.4178 4.21735 12.4472 4.27609C12.4766 4.33483 12.4941 4.39878 12.4988 4.46429C12.5035 4.52981 12.4952 4.5956 12.4744 4.65791L8.47444 16.6579L8.4744 16.658C8.43248 16.7839 8.34228 16.888 8.22364 16.9473C8.10499 17.0067 7.96762 17.0165 7.84175 16.9746C7.71588 16.9327 7.61181 16.8425 7.55244 16.7238C7.49309 16.6052 7.48327 16.4679 7.52513 16.3421C7.52515 16.342 7.52516 16.342 7.52518 16.3419L11.5251 4.3421L11.5252 4.34184C11.5459 4.27952 11.5788 4.22189 11.6218 4.17226C11.6648 4.12262 11.7172 4.08194 11.7759 4.05255C11.8346 4.02316 11.8986 4.00563 11.9641 4.00096C12.0296 3.99629 12.0954 4.00457 12.1577 4.02534ZM15.3532 13.8534L15.3532 13.8534L15.3471 13.8596C15.301 13.9074 15.2458 13.9455 15.1848 13.9717C15.1238 13.9979 15.0582 14.0117 14.9918 14.0123C14.9255 14.0128 14.8596 14.0002 14.7982 13.975C14.7367 13.9499 14.6809 13.9128 14.6339 13.8658C14.587 13.8189 14.5499 13.7631 14.5247 13.7016C14.4996 13.6402 14.4869 13.5743 14.4875 13.5079C14.4881 13.4415 14.5019 13.3759 14.5281 13.3149C14.5543 13.2539 14.5924 13.1988 14.6401 13.1526L14.6402 13.1527L14.6463 13.1465L16.9393 10.8535L17.2929 10.5L16.9393 10.1464L14.6464 7.85348C14.6464 7.85347 14.6464 7.85345 14.6463 7.85343C14.5526 7.75967 14.5 7.63254 14.5 7.49998C14.5 7.36745 14.5526 7.24034 14.6463 7.14659C14.7401 7.05286 14.8672 7.0002 14.9998 7.0002C15.1323 7.0002 15.2595 7.05284 15.3532 7.14654C15.3533 7.14656 15.3533 7.14657 15.3533 7.14659L18.3532 10.1465C18.4469 10.2402 18.4996 10.3674 18.4996 10.5C18.4996 10.6326 18.4469 10.7597 18.3532 10.8535L15.3532 13.8534Z" fill="currentColor" stroke="currentColor"/>
</svg>

      <span class='sidebarLinkText'>Examples</span>
      </a>`,
      defaultStyle: true,
    },
    {
      type: "html",
      value: `<a class='sidebarLink' href="/docs/sdk">

      <svg width="20" height="20" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0498 13.4C10.0498 12.5116 10.4027 11.6595 11.031 11.0312C11.6592 10.403 12.5113 10.05 13.3998 10.05H53.5998C54.4883 10.05 55.3404 10.403 55.9686 11.0312C56.5969 11.6595 56.9498 12.5116 56.9498 13.4V20.1C56.9498 20.9885 56.5969 21.8406 55.9686 22.4689C55.3404 23.0971 54.4883 23.45 53.5998 23.45H13.3998C12.5113 23.45 11.6592 23.0971 11.031 22.4689C10.4027 21.8406 10.0498 20.9885 10.0498 20.1V13.4ZM10.0498 33.5C10.0498 32.6116 10.4027 31.7595 11.031 31.1312C11.6592 30.503 12.5113 30.15 13.3998 30.15H33.4998C34.3883 30.15 35.2404 30.503 35.8686 31.1312C36.4969 31.7595 36.8498 32.6116 36.8498 33.5V53.6001C36.8498 54.4885 36.4969 55.3406 35.8686 55.9689C35.2404 56.5971 34.3883 56.9501 33.4998 56.9501H13.3998C12.5113 56.9501 11.6592 56.5971 11.031 55.9689C10.4027 55.3406 10.0498 54.4885 10.0498 53.6001V33.5ZM46.8998 30.15C46.0113 30.15 45.1592 30.503 44.531 31.1312C43.9028 31.7595 43.5498 32.6116 43.5498 33.5V53.6001C43.5498 54.4885 43.9028 55.3406 44.531 55.9689C45.1592 56.5971 46.0113 56.9501 46.8998 56.9501H53.5998C54.4883 56.9501 55.3404 56.5971 55.9686 55.9689C56.5969 55.3406 56.9498 54.4885 56.9498 53.6001V33.5C56.9498 32.6116 56.5969 31.7595 55.9686 31.1312C55.3404 30.503 54.4883 30.15 53.5998 30.15H46.8998Z"
                fill="currentColor"
              />
            </svg>
      <span class='sidebarLinkText'>SDK Reference</span>
      </a>`,
      defaultStyle: true,
    },
    {
      type: "html",
      value: `<a class='sidebarLink' href="/docs/resources/checklist">

     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 2C8.73478 2 8.48043 2.10536 8.29289 2.29289C8.10536 2.48043 8 2.73478 8 3C8 3.26522 8.10536 3.51957 8.29289 3.70711C8.48043 3.89464 8.73478 4 9 4H11C11.2652 4 11.5196 3.89464 11.7071 3.70711C11.8946 3.51957 12 3.26522 12 3C12 2.73478 11.8946 2.48043 11.7071 2.29289C11.5196 2.10536 11.2652 2 11 2H9Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C4 4.46957 4.21071 3.96086 4.58579 3.58579C4.96086 3.21071 5.46957 3 6 3C6 3.79565 6.31607 4.55871 6.87868 5.12132C7.44129 5.68393 8.20435 6 9 6H11C11.7956 6 12.5587 5.68393 13.1213 5.12132C13.6839 4.55871 14 3.79565 14 3C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V16C16 16.5304 15.7893 17.0391 15.4142 17.4142C15.0391 17.7893 14.5304 18 14 18H6C5.46957 18 4.96086 17.7893 4.58579 17.4142C4.21071 17.0391 4 16.5304 4 16V5ZM13.707 10.707C13.8892 10.5184 13.99 10.2658 13.9877 10.0036C13.9854 9.7414 13.8802 9.49059 13.6948 9.30518C13.5094 9.11977 13.2586 9.0146 12.9964 9.01233C12.7342 9.01005 12.4816 9.11084 12.293 9.293L9 12.586L7.707 11.293C7.5184 11.1108 7.2658 11.01 7.0036 11.0123C6.7414 11.0146 6.49059 11.1198 6.30518 11.3052C6.11977 11.4906 6.0146 11.7414 6.01233 12.0036C6.01005 12.2658 6.11084 12.5184 6.293 12.707L8.293 14.707C8.48053 14.8945 8.73484 14.9998 9 14.9998C9.26516 14.9998 9.51947 14.8945 9.707 14.707L13.707 10.707Z" fill="currentColor"/>
</svg>


      <span class='sidebarLinkText'>Integration Checklist</span>
      </a>`,
      defaultStyle: true,
    },
    {
      type: "html",
      value: "<span class='sidebarHeading'>Overview</span>",
      defaultStyle: true,
    },
    {
      type: "doc",
      id: "README",
    },
    "what-is-web3auth",
    "how-web3auth-works",
    {
      type: "category",
      label: "Product Stack",
      items: [
        {
          type: "doc",
          id: "product/product",
        },
        "product/pnp",
        "product/sfa",
        "product/mpc-core-kit",
        "product/wallet-services",
      ],
    },
    "product-fit",
    {
      type: "html",
      value: "<span class='sidebarHeading'>Features</span>",
      defaultStyle: true,
    },
    { type: "autogenerated", dirName: "features" },
    {
      type: "html",
      value: "<span class='sidebarHeading'>Additional Reading</span>",
      defaultStyle: true,
    },
    {
      type: "link",
      label: "Troubleshooting",
      href: "/troubleshooting",
    },
    "change-of-ownership",
  ],
  resources: [
    {
      type: "html",
      value: "<span class='sidebarHeading'>Quick Links</span>",
      defaultStyle: true,
    },
    {
      type: "html",
      value: `<a class='sidebarLink' href="https://web3auth.io/community/c/announcements/5" target="_blank">
      <svg width="20" height="20" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2382_32884)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2197 2.52454C15.4635 2.63322 15.6251 2.91009 15.6251 3.21939V6.5105C16.221 6.65496 16.7733 7.00412 17.2098 7.52245C17.7958 8.21838 18.1251 9.16227 18.1251 10.1465C18.1251 11.1307 17.7958 12.0746 17.2098 12.7705C16.7733 13.2888 16.221 13.638 15.6251 13.7825V17.0736C15.6251 17.3829 15.4635 17.6597 15.2197 17.7684C14.9758 17.8771 14.7008 17.7948 14.5294 17.5619C13.7097 16.4479 12.0088 15.4883 9.79172 15.0698V19.2902C9.79137 19.8752 9.61719 20.4417 9.29988 20.8891C8.98256 21.3365 8.54246 21.6365 8.05712 21.7364C7.57178 21.8362 7.07233 21.7295 6.64677 21.4349C6.22121 21.1404 5.89683 20.6769 5.7308 20.1262L5.72913 20.1207L4.02651 14.3291C3.304 13.8888 2.71049 13.1942 2.33019 12.3351C1.90553 11.3758 1.77301 10.2717 1.95506 9.20963C2.13712 8.14761 2.62257 7.1929 3.32926 6.50706C4.03595 5.82122 4.92048 5.44637 5.83315 5.44596H7.36005C7.95219 5.44596 8.52857 5.40788 9.0825 5.33587C9.09232 5.3343 9.10222 5.33299 9.11219 5.33197C11.6599 4.9947 13.6279 3.9563 14.5294 2.73106C14.7008 2.49814 14.9758 2.41585 15.2197 2.52454ZM15.6251 12.2457C15.8862 12.136 16.1263 11.958 16.3259 11.7209C16.6775 11.3033 16.8751 10.737 16.8751 10.1465C16.8751 9.55596 16.6775 8.98962 16.3259 8.57206C16.1263 8.335 15.8862 8.15692 15.6251 8.04725V12.2457Z" fill="currentColor"/>
        </g>
        <defs>
        <clipPath id="clip0_2382_32884">
        <rect width="20" height="23.75" fill="none" transform="translate(0.000244141 0.25)"/>
        </clipPath>
        </defs>
      </svg>
      <span class='sidebarLinkText'>Announcements</span>
      </a>`,
      defaultStyle: true,
    },
    {
      type: "html",
      value: `<a class='sidebarLink' href="/docs/">
      <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.7072 3.20877C10.5197 3.0213 10.2654 2.91599 10.0002 2.91599C9.73506 2.91599 9.48075 3.0213 9.29322 3.20877L2.29322 10.2088C2.11107 10.3974 2.01027 10.65 2.01255 10.9122C2.01483 11.1744 2.12 11.4252 2.30541 11.6106C2.49081 11.796 2.74163 11.9012 3.00382 11.9034C3.26602 11.9057 3.51862 11.8049 3.70722 11.6228L4.00022 11.3298V17.9158C4.00022 18.181 4.10558 18.4353 4.29312 18.6229C4.48065 18.8104 4.73501 18.9158 5.00022 18.9158H7.00022C7.26544 18.9158 7.51979 18.8104 7.70733 18.6229C7.89487 18.4353 8.00022 18.181 8.00022 17.9158V15.9158C8.00022 15.6506 8.10558 15.3962 8.29312 15.2087C8.48065 15.0211 8.73501 14.9158 9.00022 14.9158H11.0002C11.2654 14.9158 11.5198 15.0211 11.7073 15.2087C11.8949 15.3962 12.0002 15.6506 12.0002 15.9158V17.9158C12.0002 18.181 12.1056 18.4353 12.2931 18.6229C12.4807 18.8104 12.735 18.9158 13.0002 18.9158H15.0002C15.2654 18.9158 15.5198 18.8104 15.7073 18.6229C15.8949 18.4353 16.0002 18.181 16.0002 17.9158V11.3298L16.2932 11.6228C16.4818 11.8049 16.7344 11.9057 16.9966 11.9034C17.2588 11.9012 17.5096 11.796 17.695 11.6106C17.8805 11.4252 17.9856 11.1744 17.9879 10.9122C17.9902 10.65 17.8894 10.3974 17.7072 10.2088L10.7072 3.20877Z" fill="currentColor"/>
      </svg>
      <span class='sidebarLinkText'>Home</span>
      </a>`,
      defaultStyle: true,
    },
    {
      type: "html",
      value: `<a class='sidebarLink' href="/docs/quick-start">
      <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.59022 12.2135L10.59 2.21384C10.651 2.12674 10.7382 2.06135 10.8389 2.02718C10.9396 1.99301 11.0486 1.99184 11.15 2.02384L11.1801 2.03333C11.2692 2.06763 11.3468 2.12683 11.4036 2.20416C11.4665 2.28995 11.5005 2.39358 11.5004 2.49999V2.50002V7.50002V8.00002H12.0004H16.0004H16.0007C16.0921 7.99998 16.1818 8.02502 16.2601 8.07243C16.3383 8.11984 16.402 8.18779 16.4443 8.26889C16.4865 8.34999 16.5058 8.44113 16.4998 8.5324C16.4939 8.62367 16.4631 8.71156 16.4107 8.78652L9.41083 18.7863L9.41044 18.7868C9.34953 18.8741 9.26236 18.9397 9.16161 18.974C9.06087 19.0083 8.95181 19.0095 8.85029 18.9776C8.74878 18.9456 8.66011 18.8821 8.59719 18.7963C8.53427 18.7104 8.50038 18.6068 8.50044 18.5003V18.5V13.5V13H8.00044H4.00045H4.00022C3.90876 13.0001 3.81904 12.975 3.74083 12.9276C3.66262 12.8802 3.59891 12.8122 3.55663 12.7311C3.51435 12.65 3.49513 12.5589 3.50105 12.4676C3.50697 12.3764 3.53782 12.2885 3.59022 12.2135Z" fill="currentColor" stroke="currentColor"/>
</svg>

      <span class='sidebarLinkText'>Quick Start</span>
      </a>`,
      defaultStyle: true,
    },
    {
      type: "html",
      value: `<a class='sidebarLink' href="/docs/sdk">

      <svg width="20" height="20" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0498 13.4C10.0498 12.5116 10.4027 11.6595 11.031 11.0312C11.6592 10.403 12.5113 10.05 13.3998 10.05H53.5998C54.4883 10.05 55.3404 10.403 55.9686 11.0312C56.5969 11.6595 56.9498 12.5116 56.9498 13.4V20.1C56.9498 20.9885 56.5969 21.8406 55.9686 22.4689C55.3404 23.0971 54.4883 23.45 53.5998 23.45H13.3998C12.5113 23.45 11.6592 23.0971 11.031 22.4689C10.4027 21.8406 10.0498 20.9885 10.0498 20.1V13.4ZM10.0498 33.5C10.0498 32.6116 10.4027 31.7595 11.031 31.1312C11.6592 30.503 12.5113 30.15 13.3998 30.15H33.4998C34.3883 30.15 35.2404 30.503 35.8686 31.1312C36.4969 31.7595 36.8498 32.6116 36.8498 33.5V53.6001C36.8498 54.4885 36.4969 55.3406 35.8686 55.9689C35.2404 56.5971 34.3883 56.9501 33.4998 56.9501H13.3998C12.5113 56.9501 11.6592 56.5971 11.031 55.9689C10.4027 55.3406 10.0498 54.4885 10.0498 53.6001V33.5ZM46.8998 30.15C46.0113 30.15 45.1592 30.503 44.531 31.1312C43.9028 31.7595 43.5498 32.6116 43.5498 33.5V53.6001C43.5498 54.4885 43.9028 55.3406 44.531 55.9689C45.1592 56.5971 46.0113 56.9501 46.8998 56.9501H53.5998C54.4883 56.9501 55.3404 56.5971 55.9686 55.9689C56.5969 55.3406 56.9498 54.4885 56.9498 53.6001V33.5C56.9498 32.6116 56.5969 31.7595 55.9686 31.1312C55.3404 30.503 54.4883 30.15 53.5998 30.15H46.8998Z"
                fill="currentColor"
              />
            </svg>
      <span class='sidebarLinkText'>SDK Reference</span>
      </a>`,
      defaultStyle: true,
    },
    {
      type: "html",
      value: "<span class='sidebarHeading'>Resources</span>",
      defaultStyle: true,
    },
    "resources",
    {
      type: "category",
      label: "Authentication",
      items: [
        "authentication/authentication",
        {
          type: "html",
          value: "<span class='sidebarAuthHeading'>Login Connections</span>",
          defaultStyle: true,
        },
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
        {
          type: "html",
          value: "<span class='sidebarAuthHeading'>Advanced</span>",
          defaultStyle: true,
        },
        "authentication/id-token",
      ],
    },
    {
      type: "category",
      label: "Connect Blockchain",
      items: [
        "connect-blockchain/connect-blockchain",
        {
          type: "category",
          label: "EVM Based Chains",
          items: [
            "connect-blockchain/evm/evm",
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
          label: "Near",
          items: [{ type: "autogenerated", dirName: "connect-blockchain/near" }],
        },
        {
          type: "category",
          label: "Other Chains",
          items: [
            "connect-blockchain/other/other",
            "connect-blockchain/xrpl",
            { type: "autogenerated", dirName: "connect-blockchain/other" },
          ],
          collapsible: true,
          collapsed: false,
        },
        {
          type: "html",
          value: "<span class='sidebarAuthHeading'>Advanced</span>",
          defaultStyle: true,
        },
        "connect-blockchain/custom-chains",
        "connect-blockchain/rpc-headers",
      ],
    },
    {
      type: "category",
      label: "Dashboard",
      items: [
        "dashboard/dashboard",
        "dashboard/create-new-project",
        "dashboard/configure-connections",
      ],
    },
    "examples",
    "resources/checklist",
    {
      type: "category",
      label: "Web3Auth Infrastructure",
      items: [
        "infrastructure/infrastructure",
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
        "troubleshooting/troubleshooting",
        { type: "autogenerated", dirName: "troubleshooting" },
      ],
    },
  ],
  sdk_pnp_react: [
    {
      type: "html",
      value: webTopNavButton(reactJS),
      defaultStyle: true,
    },
    "sdk/web/react/react",
    {
      type: "category",
      label: "Advanced Configuration",
      items: [{ type: "autogenerated", dirName: "sdk/web/react/advanced" }],
    },
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Web3Auth Hooks",
      items: [{ type: "autogenerated", dirName: "sdk/web/react/hooks" }],
    },
    "sdk/web/react/ethereum-hooks",
    {
      type: "category",
      label: "Solana Hooks",
      items: [{ type: "autogenerated", dirName: "sdk/web/react/solana-hooks" }],
    },
    "sdk/web/react/examples",
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
    {
      type: "category",
      label: "Migration Guides",
      items: [
        {
          type: "category",
          label: "Plug and Play Modal SDK",
          items: [
            "migration-guides/modal-v9-to-v10",
            "migration-guides/modal-v8-to-v9",
            "migration-guides/modal-v7-to-v8",
            "migration-guides/modal-v6-to-v7",
            "migration-guides/modal-v5-to-v6",
          ],
        },
        {
          type: "category",
          label: "Plug and Play No Modal SDK",
          items: [
            "migration-guides/modal-v9-to-v10",
            "migration-guides/no-modal-v8-to-v9",
            "migration-guides/no-modal-v7-to-v8",
            "migration-guides/no-modal-v6-to-v7",
            "migration-guides/no-modal-v5-to-v6",
          ],
        },
      ],
    },
    ...sdkQuickLinks,
  ],
  sdk_pnp_vue: [
    {
      type: "html",
      value: webTopNavButton(vue),
      defaultStyle: true,
    },
    "sdk/web/vue/vue",
    {
      type: "category",
      label: "Advanced Configuration",
      items: [{ type: "autogenerated", dirName: "sdk/web/vue/advanced" }],
    },
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Web3Auth Composables",
      items: [{ type: "autogenerated", dirName: "sdk/web/vue/composables" }],
    },
    "sdk/web/vue/ethereum-composables",
    {
      type: "category",
      label: "Solana Composables",
      items: [{ type: "autogenerated", dirName: "sdk/web/vue/solana-composables" }],
    },
    "sdk/web/vue/examples",
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
    {
      type: "category",
      label: "Migration Guides",
      items: [
        {
          type: "category",
          label: "Plug and Play Modal SDK",
          items: [
            "migration-guides/modal-v8-to-v9",
            "migration-guides/modal-v7-to-v8",
            "migration-guides/modal-v6-to-v7",
            "migration-guides/modal-v5-to-v6",
          ],
        },
        {
          type: "category",
          label: "Plug and Play No Modal SDK",
          items: [
            "migration-guides/no-modal-v8-to-v9",
            "migration-guides/no-modal-v7-to-v8",
            "migration-guides/no-modal-v6-to-v7",
            "migration-guides/no-modal-v5-to-v6",
          ],
        },
      ],
    },
    ...sdkQuickLinks,
  ],
  sdk_pnp_js: [
    {
      type: "html",
      value: webTopNavButton(js),
      defaultStyle: true,
    },
    "sdk/web/js/js",
    {
      type: "category",
      label: "Advanced Settings",
      items: [{ type: "autogenerated", dirName: "sdk/web/js/advanced" }],
    },
    "sdk/web/js/events",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Functions",
      items: [
        "sdk/web/js/functions/functions",
        "sdk/web/js/functions/connect",
        "sdk/web/js/functions/enableMFA",
        "sdk/web/js/functions/getIdentityToken",
        "sdk/web/js/functions/getUserInfo",
        "sdk/web/js/functions/logout",
        "sdk/web/js/functions/manageMFA",
        "sdk/web/js/functions/showCheckout",
        "sdk/web/js/functions/showSwap",
        "sdk/web/js/functions/showWalletConnectScanner",
        "sdk/web/js/functions/showWalletUI",
        "sdk/web/js/functions/switchChain",
      ],
    },
    "sdk/web/js/ethereum-integration",
    "sdk/web/js/examples",
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
    {
      type: "category",
      label: "Migration Guides",
      items: [
        {
          type: "category",
          label: "Plug and Play Modal SDK",
          items: [
            "migration-guides/modal-v8-to-v9",
            "migration-guides/modal-v7-to-v8",
            "migration-guides/modal-v6-to-v7",
            "migration-guides/modal-v5-to-v6",
          ],
        },
        {
          type: "category",
          label: "Plug and Play No Modal SDK",
          items: [
            "migration-guides/no-modal-v8-to-v9",
            "migration-guides/no-modal-v7-to-v8",
            "migration-guides/no-modal-v6-to-v7",
            "migration-guides/no-modal-v5-to-v6",
          ],
        },
      ],
    },
    ...sdkQuickLinks,
  ],
  sdk_pnp_android: [
    {
      type: "html",
      value: pnpMobileTopNavButton(android),
      defaultStyle: true,
    },
    "sdk/mobile/pnp/android/android",
    "sdk/mobile/pnp/android/install",
    "sdk/mobile/pnp/android/initialize",
    "sdk/mobile/pnp/android/usage",
    "sdk/mobile/pnp/android/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "sdk/mobile/pnp/android/whitelabel",
        "sdk/mobile/pnp/android/custom-authentication",
        "sdk/mobile/pnp/android/mfa",
        "sdk/mobile/pnp/android/dapp-share",
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
    {
      type: "category",
      label: "Migration Guides",
      items: [
        "migration-guides/android-v8-to-v9",
        "migration-guides/android-v7.2-to-v7.3",
        "migration-guides/android-v7.1.2-to-v7.2",
        "migration-guides/android-v7.1.1-to-v7.1.2",
        "migration-guides/android-v6-to-v6.1",
        "migration-guides/android-v5-to-v6",
        "migration-guides/android-v4-to-v5",
      ],
    },
    ...sdkQuickLinks,
  ],
  sdk_pnp_ios: [
    {
      type: "html",
      value: pnpMobileTopNavButton(ios),
      defaultStyle: true,
    },
    "sdk/mobile/pnp/ios/ios",
    "sdk/mobile/pnp/ios/install",
    "sdk/mobile/pnp/ios/initialize",
    "sdk/mobile/pnp/ios/usage",
    "sdk/mobile/pnp/ios/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "sdk/mobile/pnp/ios/whitelabel",
        "sdk/mobile/pnp/ios/custom-authentication",
        "sdk/mobile/pnp/ios/mfa",
        "sdk/mobile/pnp/ios/dapp-share",
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
    {
      type: "category",
      label: "Migration Guides",
      items: [
        "migration-guides/ios-v9-to-v10",
        "migration-guides/ios-v8.2-to-v8.3",
        "migration-guides/ios-v8.1-to-v8.2",
        "migration-guides/ios-v8-to-v8.1",
        "migration-guides/ios-v7-to-v8",
        "migration-guides/ios-v6-to-v7",
      ],
    },
    ...sdkQuickLinks,
  ],
  sdk_pnp_react_native: [
    {
      type: "html",
      value: pnpMobileTopNavButton(reactnative),
      defaultStyle: true,
    },
    "sdk/mobile/pnp/react-native/react-native",
    "sdk/mobile/pnp/react-native/install",
    "sdk/mobile/pnp/react-native/initialize",
    "sdk/mobile/pnp/react-native/usage",
    "sdk/mobile/pnp/react-native/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "sdk/mobile/pnp/react-native/account-abstraction",
        "sdk/mobile/pnp/react-native/whitelabel",
        "sdk/mobile/pnp/react-native/custom-authentication",
        "sdk/mobile/pnp/react-native/mfa",
        "sdk/mobile/pnp/react-native/dapp-share",
      ],
    },
    {
      type: "category",
      label: "Providers",
      items: [
        "sdk/mobile/pnp/react-native/providers/providers",
        "sdk/mobile/pnp/react-native/providers/evm",
        "sdk/mobile/pnp/react-native/providers/aa-provider",
        "sdk/mobile/pnp/react-native/providers/solana",
        "sdk/mobile/pnp/react-native/providers/xrpl",
        "sdk/mobile/pnp/react-native/providers/common",
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
    {
      type: "category",
      label: "Migration Guides",
      items: [
        "migration-guides/rn-v7-to-v8",
        "migration-guides/rn-v5-to-v6",
        "migration-guides/rn-v4-to-v5",
        "migration-guides/rn-v3-to-v4",
      ],
    },
    ...sdkQuickLinks,
  ],
  sdk_pnp_flutter: [
    {
      type: "html",
      value: pnpMobileTopNavButton(flutter),
      defaultStyle: true,
    },
    "sdk/mobile/pnp/flutter/flutter",
    "sdk/mobile/pnp/flutter/install",
    "sdk/mobile/pnp/flutter/initialize",
    "sdk/mobile/pnp/flutter/usage",
    "sdk/mobile/pnp/flutter/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "sdk/mobile/pnp/flutter/whitelabel",
        "sdk/mobile/pnp/flutter/custom-authentication",
        "sdk/mobile/pnp/flutter/mfa",
        "sdk/mobile/pnp/flutter/dapp-share",
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
    {
      type: "category",
      label: "Migration Guides",
      items: ["migration-guides/flutter-v5-to-v6", "migration-guides/flutter-v3-to-v4"],
    },
    ...sdkQuickLinks,
  ],
  sdk_pnp_unity: [
    {
      type: "html",
      value: gamingTopNavButton(unity),
      defaultStyle: true,
    },
    "sdk/gaming/unity/unity",
    "sdk/gaming/unity/install",
    "sdk/gaming/unity/initialize",
    "sdk/gaming/unity/usage",
    "sdk/gaming/unity/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "sdk/gaming/unity/whitelabel",
        "sdk/gaming/unity/custom-authentication",
        "sdk/gaming/unity/mfa",
        "sdk/gaming/unity/dapp-share",
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
    ...sdkQuickLinks,
  ],
  sdk_pnp_unreal: [
    {
      type: "html",
      value: gamingTopNavButton(unreal),
      defaultStyle: true,
    },
    "sdk/gaming/unreal/unreal",
    "sdk/gaming/unreal/install",
    "sdk/gaming/unreal/initialize",
    "sdk/gaming/unreal/usage",
    "sdk/gaming/unreal/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "sdk/gaming/unreal/whitelabel",
        "sdk/gaming/unreal/custom-authentication",
        "sdk/gaming/unreal/mfa",
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
    ...sdkQuickLinks,
  ],
  sdk_core_kit_sfa_react_native: [
    {
      type: "html",
      value: sfaMobileTopNavButton(reactnative),
      defaultStyle: true,
    },
    "sdk/mobile/sfa/react-native/react-native",
    "sdk/mobile/sfa/react-native/install",
    "sdk/mobile/sfa/react-native/initialize",
    "sdk/mobile/sfa/react-native/authentication",
    "sdk/mobile/sfa/react-native/usage",
    "sdk/mobile/sfa/react-native/examples",
    {
      type: "category",
      collapsible: true,
      collapsed: false,
      label: "Additional Settings",
      items: [
        "sdk/mobile/sfa/react-native/account-abstraction",
        "sdk/mobile/sfa/react-native/initiate-topup",
        "sdk/mobile/sfa/react-native/show-wallet-connect",
      ],
    },
    {
      type: "category",
      label: "Providers",
      items: [
        "sdk/mobile/sfa/react-native/providers/providers",
        "sdk/mobile/sfa/react-native/providers/evm",
        "sdk/mobile/sfa/react-native/providers/aa-provider",
        "sdk/mobile/sfa/react-native/providers/solana",
        "sdk/mobile/sfa/react-native/providers/xrpl",
        "sdk/mobile/sfa/react-native/providers/common",
      ],
    },
    {
      type: "category",
      label: "Wallet Services Plugin",
      items: [
        "sdk/mobile/sfa/react-native/wallet-services/wallet-services",
        "sdk/mobile/sfa/react-native/wallet-services/usage",
        "sdk/mobile/sfa/react-native/wallet-services/wallet-services-hooks",
      ],
    },
    {
      type: "link",
      label: "Playground",
      href: "https://demo-sfa.web3auth.io",
    },
    {
      type: "category",
      label: "Migration Guides",
      items: ["migration-guides/sfa-rn-to-sfa-js", "migration-guides/sfa-node-to-sfa-js"],
    },
    {
      type: "link",
      label: "Support Forum",
      href: "https://web3auth.io/community/c/help-core-kit/core-kit-sfa/22",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/web3auth/single-factor-auth-web/releases",
    },
    ...sdkQuickLinks,
  ],
  sdk_sfa_android: [
    {
      type: "html",
      value: sfaMobileTopNavButton(android),
      defaultStyle: true,
    },
    "sdk/mobile/sfa/android/android",
    "sdk/mobile/sfa/android/install",
    "sdk/mobile/sfa/android/initialize",
    "sdk/mobile/sfa/android/authentication",
    "sdk/mobile/sfa/android/usage",
    "sdk/mobile/sfa/android/examples",
    {
      type: "link",
      label: "Support Forum",
      href: "https://web3auth.io/community/c/help-core-kit/core-kit-sfa-android/26",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/web3auth/single-factor-auth-android/releases",
    },
    {
      type: "category",
      label: "Migration Guides",
      items: [
        "migration-guides/sfa-android-v2-to-v3",
        "migration-guides/sfa-android-v1.2.0-to-v2.0.0",
        "migration-guides/sfa-android-v0.4.0-to-v1",
        "migration-guides/sfa-android-v0.1.0-to-v0.3.0",
      ],
    },
    ...sdkQuickLinks,
  ],
  sdk_sfa_ios: [
    {
      type: "html",
      value: sfaMobileTopNavButton(ios),
      defaultStyle: true,
    },
    "sdk/mobile/sfa/ios/ios",
    "sdk/mobile/sfa/ios/install",
    "sdk/mobile/sfa/ios/initialize",
    "sdk/mobile/sfa/ios/authentication",
    "sdk/mobile/sfa/ios/usage",
    "sdk/mobile/sfa/ios/examples",
    {
      type: "link",
      label: "Support Forum",
      href: "https://web3auth.io/community/c/help-core-kit/sfa-swift-sdk/30",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/web3auth/single-factor-auth-swift/releases",
    },
    {
      type: "category",
      label: "Migration Guides",
      items: [
        "migration-guides/sfa-ios-v8-to-v9",
        "migration-guides/sfa-ios-v7-to-v8",
        "migration-guides/sfa-ios-v2-to-v4",
      ],
    },
    ...sdkQuickLinks,
  ],
  sdk_sfa_flutter: [
    {
      type: "html",
      value: sfaMobileTopNavButton(flutter),
      defaultStyle: true,
    },
    "sdk/mobile/sfa/flutter/flutter",
    "sdk/mobile/sfa/flutter/install",
    "sdk/mobile/sfa/flutter/initialize",
    "sdk/mobile/sfa/flutter/authentication",
    "sdk/mobile/sfa/flutter/usage",
    "sdk/mobile/sfa/flutter/examples",
    {
      type: "link",
      label: "Support Forum",
      href: "https://web3auth.io/community/c/help-core-kit/sfa-flutter-sdk/31",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/web3auth/single-factor-auth-flutter/releases",
    },
    {
      type: "category",
      label: "Migration Guides",
      items: [
        "migration-guides/sfa-flutter-v5-to-v6",
        "migration-guides/sfa-flutter-v4-to-v5",
        "migration-guides/sfa-flutter-v2-to-v4",
        "migration-guides/sfa-flutter-v1-to-v2",
      ],
    },
    ...sdkQuickLinks,
  ],
  sdk_mpc_core_kit_js: [
    {
      type: "html",
      value: mpcckTopNavButton(js),
      defaultStyle: true,
    },
    "sdk/mpc-core-kit/mpc-core-kit-js/mpc-core-kit-js",
    "sdk/mpc-core-kit/mpc-core-kit-js/install",
    "sdk/mpc-core-kit/mpc-core-kit-js/initialize",
    {
      type: "category",
      label: "Authentication",
      items: [
        "sdk/mpc-core-kit/mpc-core-kit-js/authentication/authentication",
        "sdk/mpc-core-kit/mpc-core-kit-js/authentication/login-jwt",
        "sdk/mpc-core-kit/mpc-core-kit-js/authentication/login-oauth",
      ],
    },
    "sdk/mpc-core-kit/mpc-core-kit-js/signing",
    "sdk/mpc-core-kit/mpc-core-kit-js/usage",
    "sdk/mpc-core-kit/mpc-core-kit-js/examples",
    {
      type: "category",
      label: "Providers",
      items: [
        "sdk/mpc-core-kit/mpc-core-kit-js/providers/providers",
        "sdk/mpc-core-kit/mpc-core-kit-js/providers/evm",
      ],
    },
    {
      type: "link",
      label: "Support Forum",
      href: "https://web3auth.io/community/c/help-core-kit/mpc-core-kit/33",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/Web3Auth/mpc-core-kit/releases",
    },
    {
      type: "category",
      label: "Migration Guides",
      items: ["migration-guides/mpc-core-kit-web-v2-to-v3"],
    },
    ...sdkQuickLinks,
  ],
  sdk_mpc_core_kit_react_native: [
    {
      type: "html",
      value: mpcckTopNavButton(reactnative),
      defaultStyle: true,
    },
    "sdk/mpc-core-kit/mpc-core-kit-react-native/mpc-core-kit-react-native",
    "sdk/mpc-core-kit/mpc-core-kit-react-native/install",
    "sdk/mpc-core-kit/mpc-core-kit-react-native/initialize",
    "sdk/mpc-core-kit/mpc-core-kit-react-native/authentication",
    "sdk/mpc-core-kit/mpc-core-kit-react-native/signing",
    "sdk/mpc-core-kit/mpc-core-kit-react-native/usage",
    "sdk/mpc-core-kit/mpc-core-kit-react-native/examples",
    {
      type: "category",
      label: "Providers",
      items: [
        "sdk/mpc-core-kit/mpc-core-kit-react-native/providers/providers",
        "sdk/mpc-core-kit/mpc-core-kit-react-native/providers/evm",
      ],
    },
    {
      type: "link",
      label: "Support Forum",
      href: "https://web3auth.io/community/c/help-core-kit/mpc-core-kit/33",
    },
    {
      type: "link",
      label: "Release Notes",
      href: "https://github.com/Web3Auth/react-nativempc-core-kit/releases",
    },
    {
      type: "category",
      label: "Migration Guides",
      items: ["migration-guides/mpc-core-kit-react-native-migration"],
    },
    ...sdkQuickLinks,
  ],
};

export default sidebars;
