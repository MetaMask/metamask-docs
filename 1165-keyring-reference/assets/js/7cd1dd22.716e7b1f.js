"use strict";(self.webpackChunkmetamask_docs=self.webpackChunkmetamask_docs||[]).push([[8447],{3905:(e,n,t)=>{t.d(n,{Zo:()=>s,kt:()=>k});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=r.createContext({}),p=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},s=function(e){var n=p(e.components);return r.createElement(c.Provider,{value:n},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=p(t),u=a,k=d["".concat(c,".").concat(u)]||d[u]||m[u]||i;return t?r.createElement(k,o(o({ref:n},s),{},{components:t})):r.createElement(k,o({ref:n},s))}));function k(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=u;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l[d]="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=t[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},7723:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var r=t(87462),a=(t(67294),t(3905));const i={sidebar_position:1,toc_max_heading_level:2,sidebar_label:"Objects"},o="Keyring Client API objects",l={unversionedId:"reference/keyring-api/client-api/objects",id:"reference/keyring-api/client-api/objects",title:"Keyring Client API objects",description:"Account management Snaps use the following objects",source:"@site/snaps/reference/keyring-api/client-api/objects.md",sourceDirName:"reference/keyring-api/client-api",slug:"/reference/keyring-api/client-api/objects",permalink:"/1165-keyring-reference/snaps/reference/keyring-api/client-api/objects",draft:!1,editUrl:"https://github.com/MetaMask/metamask-docs/edit/main/snaps/reference/keyring-api/client-api/objects.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,toc_max_heading_level:2,sidebar_label:"Objects"},sidebar:"snapsSidebar",previous:{title:"Keyring Client API",permalink:"/1165-keyring-reference/snaps/reference/keyring-api/client-api/"},next:{title:"Events",permalink:"/1165-keyring-reference/snaps/reference/keyring-api/client-api/events"}},c={},p=[{value:"<code>KeyringAccount</code>",id:"keyringaccount",level:2},{value:"Example",id:"example",level:3},{value:"<code>KeyringRequest</code>",id:"keyringrequest",level:2},{value:"Example",id:"example-1",level:3}],s={toc:p},d="wrapper";function m(e){let{components:n,...t}=e;return(0,a.kt)(d,(0,r.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"keyring-client-api-objects"},"Keyring Client API objects"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/1165-keyring-reference/snaps/features/custom-evm-accounts/"},"Account management Snaps")," use the following objects\nwith the ",(0,a.kt)("a",{parentName:"p",href:"/1165-keyring-reference/snaps/reference/keyring-api/client-api/"},"Keyring Client API"),"."),(0,a.kt)("h2",{id:"keyringaccount"},(0,a.kt)("inlineCode",{parentName:"h2"},"KeyringAccount")),(0,a.kt)("p",null,"An object representing an account with its properties and capabilities.\nAn account object contains:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"address"),": ",(0,a.kt)("inlineCode",{parentName:"li"},"string")," - Account address or next receive address (UTXO)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"id"),": ",(0,a.kt)("inlineCode",{parentName:"li"},"string")," - Account ID (UUIDv4)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"methods"),": ",(0,a.kt)("inlineCode",{parentName:"li"},"string[]")," - List of supported ",(0,a.kt)("a",{parentName:"li",href:"/1165-keyring-reference/snaps/reference/keyring-api/interface-api"},"Keyring Interface API")," methods."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"options"),": ",(0,a.kt)("inlineCode",{parentName:"li"},"Record<string, Json>")," - Snap-defined account options."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"type"),": ",(0,a.kt)("inlineCode",{parentName:"li"},"string")," - Account type.\n",(0,a.kt)("inlineCode",{parentName:"li"},'"eip155:eoa"')," for an externally owned account (EOA) or ",(0,a.kt)("inlineCode",{parentName:"li"},'"eip155:erc4337"')," for an\n",(0,a.kt)("a",{parentName:"li",href:"https://eips.ethereum.org/EIPS/eip-4337"},"ERC-4337")," account.")),(0,a.kt)("h3",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "address": "0xd1f5279be4b4dd94133a23dee1b23f5bfc0db1d0",\n    "id": "091bbc2e-6625-44d0-ac5c-658670ca649a",\n    "methods": [\n        "eth_sign",\n        "eth_signTransaction",\n        "eth_signTypedData_v4",\n        "personal_sign"\n    ],\n    "options": {\n        "signerCount": 5,\n        "threshold": 3\n    },\n    "type": "eip155:eoa"\n}\n')),(0,a.kt)("h2",{id:"keyringrequest"},(0,a.kt)("inlineCode",{parentName:"h2"},"KeyringRequest")),(0,a.kt)("p",null,"An object representing a request made to the account management Snap for account-related operations.\nA request object contains:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"account"),": ",(0,a.kt)("inlineCode",{parentName:"li"},"string")," - Account ID (UUIDv4)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"id"),": ",(0,a.kt)("inlineCode",{parentName:"li"},"string")," - Request ID (UUIDv4)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"request")," - Inner request sent by the client application, containing:",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"method"),": ",(0,a.kt)("inlineCode",{parentName:"li"},"string")," - The request method."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"params"),": ",(0,a.kt)("inlineCode",{parentName:"li"},"Json[]")," - Optional method parameters."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"scope"),": ",(0,a.kt)("inlineCode",{parentName:"li"},"string")," - Request's scope (",(0,a.kt)("a",{parentName:"li",href:"https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md"},"CAIP-2"),"\nchain ID).")),(0,a.kt)("h3",{id:"example-1"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "address": "0xd1f5279be4b4dd94133a23dee1b23f5bfc0db1d0",\n    "id": "f84d3a97-b6e1-47ea-8b0c-fd8609efaad4",\n    "request": {\n        "method": "personal_sign",\n        "params": [\n            "0x4578616d706c652060706572736f6e616c5f7369676e60206d657373616765",\n            "0xe887f3b50232722e6eb4c1d3a03b34c9b345acd1"\n        ]\n    },\n    "scope": "eip155:1"\n}\n')))}m.isMDXComponent=!0}}]);