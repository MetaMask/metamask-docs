"use strict";(self.webpackChunkmetamask_docs=self.webpackChunkmetamask_docs||[]).push([[2416],{41996:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var i=n(74848),a=n(28453);const s={sidebar_position:2,description:"Learn about the Android SDK architecture.",tags:["Android SDK"]},r="Android SDK architecture",o={id:"concepts/sdk/android",title:"Android SDK architecture",description:"Learn about the Android SDK architecture.",source:"@site/wallet/concepts/sdk/android.md",sourceDirName:"concepts/sdk",slug:"/concepts/sdk/android",permalink:"/update-react-tutorials-86-mm-detect-2/wallet/concepts/sdk/android",draft:!1,unlisted:!1,editUrl:"https://github.com/MetaMask/metamask-docs/edit/main/wallet/concepts/sdk/android.md",tags:[{label:"Android SDK",permalink:"/update-react-tutorials-86-mm-detect-2/wallet/tags/android-sdk"}],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,description:"Learn about the Android SDK architecture.",tags:["Android SDK"]},sidebar:"walletSidebar",previous:{title:"SDK connections",permalink:"/update-react-tutorials-86-mm-detect-2/wallet/concepts/sdk/connections"},next:{title:"Convenience libraries",permalink:"/update-react-tutorials-86-mm-detect-2/wallet/concepts/convenience-libraries"}},d={},c=[{value:"Architecture",id:"architecture",level:2},{value:"Connection flow",id:"connection-flow",level:2}];function l(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"android-sdk-architecture",children:"Android SDK architecture"}),"\n",(0,i.jsxs)(t.p,{children:["The Android version of ",(0,i.jsx)(t.a,{href:"/update-react-tutorials-86-mm-detect-2/wallet/concepts/sdk/",children:"MetaMask SDK"})," enables your users to easily connect with their\nMetaMask Mobile wallet.\nThe ",(0,i.jsx)(t.a,{href:"#architecture",children:"architecture"})," and ",(0,i.jsx)(t.a,{href:"#connection-flow",children:"connection flow"})," of\nthe Android SDK differs from the other SDK platforms."]}),"\n",(0,i.jsx)(t.admonition,{title:"Get started",type:"tip",children:(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["Get started by ",(0,i.jsx)(t.a,{href:"/update-react-tutorials-86-mm-detect-2/wallet/how-to/use-sdk/mobile/android",children:"setting up the SDK in your Android dapp"}),"."]}),"\n",(0,i.jsxs)(t.li,{children:["See the ",(0,i.jsx)(t.a,{href:"https://github.com/MetaMask/metamask-android-sdk/tree/main/app",children:"example Android dapp"})," in\nthe Android SDK GitHub repository for advanced use cases."]}),"\n"]})}),"\n",(0,i.jsx)(t.h2,{id:"architecture",children:"Architecture"}),"\n",(0,i.jsx)(t.p,{children:"The following diagram outlines the high-level architecture of the Android SDK:"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"Android SDK architecture diagram",src:n(18292).A+"",width:"1512",height:"1122"})}),"\n",(0,i.jsx)(t.p,{children:"The MetaMask Android SDK consists of two components:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"The client SDK"}),", imported in the dapp"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"The server SDK"}),", an Android Native Module embedded in the MetaMask React Native wallet"]}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["The client SDK communicates with the server SDK using\n",(0,i.jsx)(t.a,{href:"https://developer.android.com/guide/components/processes-and-threads#IPC",children:"Interprocess communication (IPC)"}),".\nThe JSON-RPC calls are implemented using the\n",(0,i.jsx)(t.a,{href:"https://developer.android.com/guide/components/aidl",children:"Android Interface Definition Language (AIDL)"}),".\nCommunication over IPC is encrypted using elliptic curve integrated encryption scheme (ECIES)."]}),"\n",(0,i.jsx)(t.p,{children:"Within MetaMask, the wallet (written in React Native) communicates with the Native Module (written\nin Kotlin) using different mechanisms depending on the direction of communication:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Native Module \u2192 React Native"})," - The Native Module broadcasts messages as events that the wallet\nlistens to and handles upon receipt."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"React Native \u2192 Native Module"})," - The wallet calls the Native Module using the ",(0,i.jsx)(t.code,{children:"NativeModules"})," API,\nwhich enables React Native code to call native Kotlin primitives."]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"connection-flow",children:"Connection flow"}),"\n",(0,i.jsx)(t.p,{children:"The following diagram outlines the communication flow between the Android client SDK and server SDK:"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"Android SDK communication diagram",src:n(51997).A+"",width:"1512",height:"1334"})}),"\n",(0,i.jsx)(t.p,{children:"The flow is as follows:"}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsx)(t.li,{children:"The dapp, with the SDK installed, initiates communication when a user connects to MetaMask.\nThe dapp deeplinks to MetaMask, and MetaMask sets up the Android Native Module to receive client requests."}),"\n",(0,i.jsx)(t.li,{children:"The dapp generates an ECIES public/private key pair.\nThe dapp and MetaMask exchange public keys over IPC."}),"\n",(0,i.jsx)(t.li,{children:"The dapp and MetaMask perform end-to-end encrypted JSON-RPC calls."}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},18292:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/sdk-android-architecture-37023c4faf4a70fbda21e5a463252d65.png"},51997:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/sdk-android-communication-10dcd9c63acfecb8a3274a0641499424.png"},28453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>o});var i=n(96540);const a={},s=i.createContext(a);function r(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);