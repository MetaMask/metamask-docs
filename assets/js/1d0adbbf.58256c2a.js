"use strict";(self.webpackChunkmetamask_docs=self.webpackChunkmetamask_docs||[]).push([[4332],{3905:(e,a,n)=>{n.d(a,{Zo:()=>m,kt:()=>k});var t=n(67294);function s(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function p(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,t)}return n}function l(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?p(Object(n),!0).forEach((function(a){s(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function r(e,a){if(null==e)return{};var n,t,s=function(e,a){if(null==e)return{};var n,t,s={},p=Object.keys(e);for(t=0;t<p.length;t++)n=p[t],a.indexOf(n)>=0||(s[n]=e[n]);return s}(e,a);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(t=0;t<p.length;t++)n=p[t],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var i=t.createContext({}),o=function(e){var a=t.useContext(i),n=a;return e&&(n="function"==typeof e?e(a):l(l({},a),e)),n},m=function(e){var a=o(e.components);return t.createElement(i.Provider,{value:a},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},u=t.forwardRef((function(e,a){var n=e.components,s=e.mdxType,p=e.originalType,i=e.parentName,m=r(e,["components","mdxType","originalType","parentName"]),d=o(n),u=s,k=d["".concat(i,".").concat(u)]||d[u]||c[u]||p;return n?t.createElement(k,l(l({ref:a},m),{},{components:n})):t.createElement(k,l({ref:a},m))}));function k(e,a){var n=arguments,s=a&&a.mdxType;if("string"==typeof e||s){var p=n.length,l=new Array(p);l[0]=u;var r={};for(var i in a)hasOwnProperty.call(a,i)&&(r[i]=a[i]);r.originalType=e,r[d]="string"==typeof e?e:s,l[1]=r;for(var o=2;o<p;o++)l[o]=n[o];return t.createElement.apply(null,l)}return t.createElement.apply(null,n)}u.displayName="MDXCreateElement"},87870:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>i,contentTitle:()=>l,default:()=>c,frontMatter:()=>p,metadata:()=>r,toc:()=>o});var t=n(87462),s=(n(67294),n(3905));const p={description:"Display custom user interface components.",sidebar_position:1},l="Custom UI",r={unversionedId:"features/custom-ui",id:"features/custom-ui",title:"Custom UI",description:"Display custom user interface components.",source:"@site/snaps/features/custom-ui.md",sourceDirName:"features",slug:"/features/custom-ui",permalink:"/snaps/features/custom-ui",draft:!1,editUrl:"https://github.com/MetaMask/metamask-docs/edit/main/snaps/features/custom-ui.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{description:"Display custom user interface components.",sidebar_position:1},sidebar:"snapsSidebar",previous:{title:"Features",permalink:"/snaps/features"},next:{title:"Localization",permalink:"/snaps/features/localization"}},i={},o=[{value:"Components",id:"components",level:2},{value:"<code>address</code>",id:"address",level:3},{value:"Example",id:"example",level:4},{value:"<code>copyable</code>",id:"copyable",level:3},{value:"Example",id:"example-1",level:4},{value:"<code>divider</code>",id:"divider",level:3},{value:"Example",id:"example-2",level:4},{value:"<code>heading</code>",id:"heading",level:3},{value:"Example",id:"example-3",level:4},{value:"<code>image</code>",id:"image",level:3},{value:"Example",id:"example-4",level:4},{value:"<code>panel</code>",id:"panel",level:3},{value:"Example",id:"example-5",level:4},{value:"<code>row</code>",id:"row",level:3},{value:"Example",id:"example-6",level:4},{value:"<code>spinner</code>",id:"spinner",level:3},{value:"Example",id:"example-7",level:4},{value:"<code>text</code>",id:"text",level:3},{value:"Example",id:"example-8",level:4},{value:"Markdown",id:"markdown",level:2},{value:"Example",id:"example-9",level:4},{value:"Links",id:"links",level:2},{value:"Example",id:"example-10",level:4},{value:"Emojis",id:"emojis",level:2},{value:"Example",id:"example-11",level:4},{value:"Examples",id:"examples",level:2}],m={toc:o},d="wrapper";function c(e){let{components:a,...p}=e;return(0,s.kt)(d,(0,t.Z)({},m,p,{components:a,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"custom-ui"},"Custom UI"),(0,s.kt)("p",null,"You can display custom user interface (UI) components using the\n",(0,s.kt)("a",{parentName:"p",href:"https://github.com/MetaMask/snaps/tree/main/packages/snaps-sdk"},(0,s.kt)("inlineCode",{parentName:"a"},"@metamask/snaps-sdk"))," module with\nthe following methods and entry points:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/snaps/reference/snaps-api#snap_dialog"},(0,s.kt)("inlineCode",{parentName:"a"},"snap_dialog"))),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/snaps/reference/entry-points#ontransaction"},(0,s.kt)("inlineCode",{parentName:"a"},"onTransaction"))," "),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/snaps/reference/entry-points#onhomepage"},(0,s.kt)("inlineCode",{parentName:"a"},"onHomePage")))),(0,s.kt)("p",null,"To use custom UI, first install ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/MetaMask/snaps/tree/main/packages/snaps-sdk"},(0,s.kt)("inlineCode",{parentName:"a"},"@metamask/snaps-sdk")),"\nusing the following command:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add @metamask/snaps-sdk\n")),(0,s.kt)("p",null,"Then, whenever you're required to return a custom UI component, import the components from the\nSDK and build your UI with them.\nFor example, to display a ",(0,s.kt)("a",{parentName:"p",href:"#panel"},(0,s.kt)("inlineCode",{parentName:"a"},"panel"))," using ",(0,s.kt)("a",{parentName:"p",href:"/snaps/reference/snaps-api#snap_dialog"},(0,s.kt)("inlineCode",{parentName:"a"},"snap_dialog")),":"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},'import { panel, heading, text } from "@metamask/snaps-sdk";\n\nawait snap.request({\n    method: "snap_dialog",\n    params: {\n        type: "alert",\n        content: panel([\n            heading("Alert heading"),\n            text("Something happened in the system."),\n        ]),\n    },\n});\n')),(0,s.kt)("h2",{id:"components"},"Components"),(0,s.kt)("p",null,"The following custom UI components are available:"),(0,s.kt)("h3",{id:"address"},(0,s.kt)("inlineCode",{parentName:"h3"},"address")),(0,s.kt)("p",null,"Outputs a formatted text field for an Ethereum address.\nThe address is automatically displayed with a jazzicon and truncated value.\nHovering the address shows the full value in a tooltip."),(0,s.kt)("h4",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},'import { panel, heading, address } from "@metamask/snaps-sdk";\n\nawait snap.request({\n    method: "snap_dialog",\n    params: {\n        type: "alert",\n        content: panel([\n            heading("Are you sure you want to send tokens to this address?"),\n            address("0x000000000000000000000000000000000000dEaD"),\n        ]),\n    },\n});\n')),(0,s.kt)("div",{class:"row"},(0,s.kt)("div",{class:"column"},(0,s.kt)("img",{src:n(66595).Z,alt:"Address UI example",width:"450px",style:{border:"1px solid #DCDCDC"}})),(0,s.kt)("div",{class:"column"},(0,s.kt)("img",{src:n(2557).Z,alt:"Address tooltip UI example",width:"450px",style:{border:"1px solid #DCDCDC"}}))),(0,s.kt)("h3",{id:"copyable"},(0,s.kt)("inlineCode",{parentName:"h3"},"copyable")),(0,s.kt)("p",null,"Outputs a read-only text field with a copy-to-clipboard shortcut."),(0,s.kt)("h4",{id:"example-1"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},'import { text, copyable } from "@metamask/snaps-sdk";\n\nawait snap.request({\n    method: "snap_dialog",\n    params: {\n        type: "alert",\n        content: panel([\n            text("Your address:"),\n            copyable("0x000000000000000000000000000000000000dEaD"),\n        ]),\n    },\n});\n')),(0,s.kt)("p",{align:"center"},(0,s.kt)("img",{src:n(22098).Z,alt:"Copyable UI example",width:"450px",style:{border:"1px solid #DCDCDC"}})),(0,s.kt)("h3",{id:"divider"},(0,s.kt)("inlineCode",{parentName:"h3"},"divider")),(0,s.kt)("p",null,"Outputs a horizontal divider."),(0,s.kt)("h4",{id:"example-2"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},'import type { OnHomePageHandler } from "@metamask/snaps-sdk";\nimport { panel, divider, text } from "@metamask/snaps-sdk";\n\nmodule.exports.onHomePage = async () => {\n    return {\n        content: panel([\n            heading("Hello world!"),\n            divider(),\n            text("Welcome to my Snap home page!"),\n        ]),\n    };\n};\n')),(0,s.kt)("p",{align:"center"},(0,s.kt)("img",{src:n(57757).Z,alt:"Divider UI example",width:"450px",style:{border:"1px solid #DCDCDC"}})),(0,s.kt)("h3",{id:"heading"},(0,s.kt)("inlineCode",{parentName:"h3"},"heading")),(0,s.kt)("p",null,"Outputs a heading.\nThis is useful for ",(0,s.kt)("a",{parentName:"p",href:"#panel"},(0,s.kt)("inlineCode",{parentName:"a"},"panel"))," titles."),(0,s.kt)("h4",{id:"example-3"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},'import type { OnHomePageHandler } from "@metamask/snaps-sdk";\nimport { panel, heading, text } from "@metamask/snaps-sdk";\n\nmodule.exports.onHomePage = async () => {\n    return {\n        content: panel([\n            heading("Hello world!"),\n            text("Welcome to my Snap home page!"),\n        ]),\n    };\n};\n')),(0,s.kt)("p",{align:"center"},(0,s.kt)("img",{src:n(61224).Z,alt:"Divider UI example",width:"450px",style:{border:"1px solid #DCDCDC"}})),(0,s.kt)("h3",{id:"image"},(0,s.kt)("inlineCode",{parentName:"h3"},"image")),(0,s.kt)("p",null,"Outputs an image.\nThis component takes an inline SVG.\nIt does not support remote URLs.\nYou can embed JPG or PNG in SVG using data URIs.\nThe SVG is rendered within an ",(0,s.kt)("inlineCode",{parentName:"p"},"<img>")," tag, which prevents JavaScript or interaction events from being supported."),(0,s.kt)("h4",{id:"example-4"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},'import type { OnHomePageHandler } from "@metamask/snaps-sdk";\nimport { panel, heading, text, image } from "@metamask/snaps-sdk";\n\nmodule.exports.onHomePage = async () => {\n    return {\n        content: panel([\n            heading("Hello world!"),\n            text("Welcome to my Snap home page!"),\n            image("<svg viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'m2.514 17.874 9 5c.021.011.043.016.064.026s.051.021.078.031a.892.892 0 0 0 .688 0c.027-.01.052-.019.078-.031s.043-.015.064-.026l9-5A1 1 0 0 0 22 16.9L21 7V2a1 1 0 0 0-1.625-.781L14.649 5h-5.3L4.625 1.219A1 1 0 0 0 3 2v4.9l-1 10a1 1 0 0 0 .514.974ZM5 7V4.081l3.375 2.7A1 1 0 0 0 9 7h6a1 1 0 0 0 .625-.219L19 4.079V7.1l.934 9.345L13 20.3v-2.967l1.42-.946A1.3 1.3 0 0 0 15 15.3a1.3 1.3 0 0 0-1.3-1.3h-3.4A1.3 1.3 0 0 0 9 15.3a1.3 1.3 0 0 0 .58 1.084l1.42.946v2.97l-6.94-3.855Zm3.5 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm5-2a2 2 0 1 1 2 2 2 2 0 0 1-2-2Z\'/></svg>"),\n        ]),\n    };\n};\n')),(0,s.kt)("p",{align:"center"},(0,s.kt)("img",{src:n(73785).Z,alt:"Divider UI example",width:"450px",style:{border:"1px solid #DCDCDC"}})),(0,s.kt)("h3",{id:"panel"},(0,s.kt)("inlineCode",{parentName:"h3"},"panel")),(0,s.kt)("p",null,"Outputs a panel, which can be used as a container for other components.\nThis component takes an array of custom UI components."),(0,s.kt)("h4",{id:"example-5"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},'import type { OnTransactionHandler } from "@metamask/snaps-sdk";\nimport { panel, heading, text } from "@metamask/snaps-sdk";\n\nmodule.exports.onTransaction = async ({ transaction }) => {\n    const gasFeesPercentage = /* Calculate gas fees percentage */;\n    return {\n        content: panel([\n            heading("Transaction insights"),\n            text(\n                `As set up, you are paying **${gasFeesPercentage.toFixed(\n                    2,\n                )}%** in gas fees for this transaction.`,\n            ),\n        ]),\n    };\n};\n')),(0,s.kt)("p",{align:"center"},(0,s.kt)("img",{src:n(12968).Z,alt:"Panel UI example",width:"450px",style:{border:"1px solid #DCDCDC"}})),(0,s.kt)("h3",{id:"row"},(0,s.kt)("inlineCode",{parentName:"h3"},"row")),(0,s.kt)("p",null,"Outputs a row with a label and value, which can be used for key-value data.\nThe label must be a string. The value can be a child component of type\n",(0,s.kt)("a",{parentName:"p",href:"#text"},(0,s.kt)("inlineCode",{parentName:"a"},"text"))," or ",(0,s.kt)("a",{parentName:"p",href:"#address"},(0,s.kt)("inlineCode",{parentName:"a"},"address")),"."),(0,s.kt)("h4",{id:"example-6"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},'import { panel, row, text, address } from "@metamask/snaps-sdk";\n\nawait snap.request({\n    method: "snap_dialog",\n    params: {\n        type: "alert",\n        content: panel([\n            row("Address", address("0x000000000000000000000000000000000000dEaD")),\n            row("Balance", text("1.78 ETH")),\n        ]),\n    },\n});\n')),(0,s.kt)("p",{align:"center"},(0,s.kt)("img",{src:n(27312).Z,alt:"Row UI example",width:"450px",style:{border:"1px solid #DCDCDC"}})),(0,s.kt)("h3",{id:"spinner"},(0,s.kt)("inlineCode",{parentName:"h3"},"spinner")),(0,s.kt)("p",null,"Outputs a loading indicator."),(0,s.kt)("h4",{id:"example-7"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},'import { panel, heading, spinner } from "@metamask/snaps-sdk";\n\nawait snap.request({\n    method: "snap_dialog",\n    params: {\n        type: "alert",\n        content: panel([\n            heading("Please wait..."),\n            spinner(),\n        ]),\n    },\n});\n')),(0,s.kt)("p",{align:"center"},(0,s.kt)("img",{src:n(38608).Z,alt:"Spinner UI example",width:"450px",style:{border:"1px solid #DCDCDC"}})),(0,s.kt)("h3",{id:"text"},(0,s.kt)("inlineCode",{parentName:"h3"},"text")),(0,s.kt)("p",null,"Outputs text. "),(0,s.kt)("h4",{id:"example-8"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},'import type { OnHomePageHandler } from "@metamask/snaps-sdk";\nimport { panel, heading, text } from "@metamask/snaps-sdk";\n\nmodule.exports.onHomePage = async () => {\n    return {\n        content: panel([\n            heading("Hello world!"),\n            text("Welcome to my Snap home page!"),\n        ]),\n    };\n};\n')),(0,s.kt)("p",{align:"center"},(0,s.kt)("img",{src:n(61224).Z,alt:"Spinner UI example",width:"450px",style:{border:"1px solid #DCDCDC"}})),(0,s.kt)("h2",{id:"markdown"},"Markdown"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"#text"},(0,s.kt)("inlineCode",{parentName:"a"},"text"))," components accept bold and italic inline Markdown."),(0,s.kt)("h4",{id:"example-9"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},'import { panel, heading, text } from "@metamask/snaps-sdk";\n\nawait snap.request({\n    method: "snap_dialog",\n    params: {\n        type: "alert",\n        content: panel([\n            heading("Hello world!"),\n            text("This is **bold** and this is _italic_."),\n        ]),\n    },\n});\n')),(0,s.kt)("p",{align:"center"},(0,s.kt)("img",{src:n(88639).Z,alt:"Markdown UI example",width:"450px",style:{border:"1px solid #DCDCDC"}})),(0,s.kt)("h2",{id:"links"},"Links"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"#text"},(0,s.kt)("inlineCode",{parentName:"a"},"text"))," components accept inline links."),(0,s.kt)("h4",{id:"example-10"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},'import type { OnHomePageHandler } from "@metamask/snaps-sdk";\nimport { panel, text } from "@metamask/snaps-sdk";\n\nmodule.exports.onHomePage = async () => {\n    return {\n        content: panel([\n            heading("Hello world!"),\n            text("Download [MetaMask](https://metamask.io)."),\n            text("Read the MetaMask docs at [](https://docs.metamask.io)."),\n        ]),\n    };\n};\n')),(0,s.kt)("p",{align:"center"},(0,s.kt)("img",{src:n(12310).Z,alt:"Spinner UI example",width:"450px",style:{border:"1px solid #DCDCDC"}})),(0,s.kt)("h2",{id:"emojis"},"Emojis"),(0,s.kt)("p",null,"Text-based components (such as ",(0,s.kt)("a",{parentName:"p",href:"#heading"},(0,s.kt)("inlineCode",{parentName:"a"},"heading"))," and ",(0,s.kt)("a",{parentName:"p",href:"#text"},(0,s.kt)("inlineCode",{parentName:"a"},"text")),") accept emojis."),(0,s.kt)("h4",{id:"example-11"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},'import { panel, heading, text } from "@metamask/snaps-sdk";\n\nawait snap.request({\n    method: "snap_dialog",\n    params: {\n        type: "alert",\n        content: panel([\n            heading("Hello world!"),\n            text("This is an apple \ud83c\udf4e and this is an orange \ud83c\udf4a."),\n        ]),\n    },\n});\n')),(0,s.kt)("p",{align:"center"},(0,s.kt)("img",{src:n(34373).Z,alt:"Emojis UI example",width:"450px",style:{border:"1px solid #DCDCDC"}})),(0,s.kt)("h2",{id:"examples"},"Examples"),(0,s.kt)("p",null,"See the ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/dialogs"},(0,s.kt)("inlineCode",{parentName:"a"},"@metamask/dialog-example-snap")),",\n",(0,s.kt)("a",{parentName:"p",href:"https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/transaction-insights"},(0,s.kt)("inlineCode",{parentName:"a"},"@metamask/transaction-insight-example-snap")),",\nand\n",(0,s.kt)("a",{parentName:"p",href:"https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/home-page"},(0,s.kt)("inlineCode",{parentName:"a"},"@metamask/home-page-example-snap")),"\npackages for full examples of implementing custom UI."))}c.isMDXComponent=!0},2557:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/custom-ui-address-tooltip-c0b648ad133522ae5df738c778ce607c.png"},66595:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/custom-ui-address-ba820915e5b30a4fa2444c0218775d79.png"},22098:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/custom-ui-copyable-7a43ac4224f0c82ed081a124e26f4b36.png"},57757:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/custom-ui-divider-bcab9f6e1e050f4816d965cfe4f635e0.png"},34373:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/custom-ui-emojis-7c8bfebfdc0f15a054279edb40b4570e.png"},61224:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/custom-ui-heading-39190ca0fc87ce734cecc2d1da3ff561.png"},73785:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/custom-ui-image-d5d912daf08c5a0e45291974baf662bd.png"},12310:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/custom-ui-links-8190eead9124615dd2a4388492bd8144.png"},88639:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/custom-ui-markdown-9f23c69906bf2052570b625c0a005ca7.png"},12968:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/custom-ui-panel-81c6419831b577f87f2dc974e4073777.png"},27312:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/custom-ui-row-c12f694fc1db2e08563d0a6d0b8891f9.png"},38608:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/custom-ui-spinner-a8fe5ebf65de1dda20bc58e3fcf31e52.gif"}}]);