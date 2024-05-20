"use strict";(self.webpackChunkmetamask_docs=self.webpackChunkmetamask_docs||[]).push([[8228],{15680:(e,n,a)=>{a.d(n,{xA:()=>u,yg:()=>h});var t=a(96540);function r(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function o(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function s(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?o(Object(a),!0).forEach((function(n){r(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function i(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},o=Object.keys(e);for(t=0;t<o.length;t++)a=o[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)a=o[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=t.createContext({}),p=function(e){var n=t.useContext(l),a=n;return e&&(a="function"==typeof e?e(n):s(s({},n),e)),a},u=function(e){var n=p(e.components);return t.createElement(l.Provider,{value:n},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},d=t.forwardRef((function(e,n){var a=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=p(a),d=r,h=c["".concat(l,".").concat(d)]||c[d]||m[d]||o;return a?t.createElement(h,s(s({ref:n},u),{},{components:a})):t.createElement(h,s({ref:n},u))}));function h(e,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=a.length,s=new Array(o);s[0]=d;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i[c]="string"==typeof e?e:r,s[1]=i;for(var p=2;p<o;p++)s[p]=a[p];return t.createElement.apply(null,s)}return t.createElement.apply(null,a)}d.displayName="MDXCreateElement"},60636:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>p,toc:()=>c});var t=a(58168),r=(a(96540),a(15680)),o=a(4865),s=a(19365);const i={description:"Solve common issues.",sidebar_position:1},l="Troubleshoot common issues",p={unversionedId:"how-to/debug-a-snap/common-issues",id:"how-to/debug-a-snap/common-issues",title:"Troubleshoot common issues",description:"Solve common issues.",source:"@site/snaps/how-to/debug-a-snap/common-issues.md",sourceDirName:"how-to/debug-a-snap",slug:"/how-to/debug-a-snap/common-issues",permalink:"/fix-gh-pages/snaps/how-to/debug-a-snap/common-issues",draft:!1,editUrl:"https://github.com/MetaMask/metamask-docs/edit/main/snaps/how-to/debug-a-snap/common-issues.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{description:"Solve common issues.",sidebar_position:1},sidebar:"snapsSidebar",previous:{title:"Debug a Snap",permalink:"/fix-gh-pages/snaps/how-to/debug-a-snap/"},next:{title:"Publish a Snap",permalink:"/fix-gh-pages/snaps/how-to/publish-a-snap"}},u={},c=[{value:"Fix build and evaluation issues",id:"fix-build-and-evaluation-issues",level:2},{value:"Use other build tools",id:"use-other-build-tools",level:3},{value:"Patch dependencies",id:"patch-dependencies",level:2},{value:"Patch the use of <code>XMLHttpRequest</code>",id:"patch-the-use-of-xmlhttprequest",level:3},{value:"cross-fetch",id:"cross-fetch",level:4},{value:"axios",id:"axios",level:4}],m={toc:c},d="wrapper";function h(e){let{components:n,...a}=e;return(0,r.yg)(d,(0,t.A)({},m,a,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"troubleshoot-common-issues"},"Troubleshoot common issues"),(0,r.yg)("p",null,"This page describes common issues you may encounter when developing a Snap, and how to resolve them."),(0,r.yg)("p",null,"If you encounter any issues that you can't solve on your own, please\n",(0,r.yg)("a",{parentName:"p",href:"https://github.com/MetaMask/snaps-monorepo/issues"},"open a GitHub issue"),"."),(0,r.yg)("h2",{id:"fix-build-and-evaluation-issues"},"Fix build and evaluation issues"),(0,r.yg)("p",null,"Because ",(0,r.yg)("a",{parentName:"p",href:"/fix-gh-pages/snaps/learn/about-snaps/execution-environment"},"Secure ECMAScript (SES)")," adds additional restrictions\non the JavaScript runtime on top of strict mode, code that executes normally under strict mode might\nnot under SES.\n",(0,r.yg)("a",{parentName:"p",href:"/fix-gh-pages/snaps/reference/cli/subcommands#b-build"},(0,r.yg)("inlineCode",{parentName:"a"},"yarn mm-snap build"))," by default attempts to execute a\nSnap in a stubbed SES environment.\nYou can also disable this behavior and run the evaluation step separately using\n",(0,r.yg)("a",{parentName:"p",href:"/fix-gh-pages/snaps/reference/cli/subcommands#e-eval"},(0,r.yg)("inlineCode",{parentName:"a"},"yarn mm-snap eval")),".\nIf an error is thrown during this step, it's likely due to a SES incompatibility, and you must fix\nthe issues manually.\nThese incompatibilities tend to occur in dependencies."),(0,r.yg)("p",null,"The errors you get from SES are usually easy to fix.\nThe actual file, function, and variable names in the ",(0,r.yg)("inlineCode",{parentName:"p"},"eval")," error stack trace might not make sense\nto you, but the line numbers should correspond to your Snap ",(0,r.yg)("a",{parentName:"p",href:"/fix-gh-pages/snaps/learn/about-snaps/files#bundle-file"},"bundle file"),".\nThus, you can identify if the error is due to your code or one of your dependencies.\nIf the problem is in a dependency, you can try a different version or to fix the issue locally by\nusing tools such as ",(0,r.yg)("a",{parentName:"p",href:"https://npmjs.com/package/patch-package"},(0,r.yg)("inlineCode",{parentName:"a"},"patch-package"))," (see how to\n",(0,r.yg)("a",{parentName:"p",href:"#patch-dependencies"},"patch dependencies"),") or by modifying the bundle file directly."),(0,r.yg)("p",null,'To give you an idea of a common error and how to fix it, "sloppily" declared variables (i.e.\nassigning to a new variable without an explicit variable declaration) are forbidden in strict mode,\nand therefore in SES as well.\nIf you get an error during the ',(0,r.yg)("inlineCode",{parentName:"p"},"eval")," step that says something like ",(0,r.yg)("inlineCode",{parentName:"p"},"variableName is not defined"),",\nsimply prepending ",(0,r.yg)("inlineCode",{parentName:"p"},"var variableName;")," to your Snap bundle may solve the problem.\n(This actually happened so frequently with ",(0,r.yg)("a",{parentName:"p",href:"https://babeljs.io/"},"Babel's")," ",(0,r.yg)("inlineCode",{parentName:"p"},"regeneratorRuntime")," that\n",(0,r.yg)("inlineCode",{parentName:"p"},"yarn mm-snap build")," automatically handles that one.)"),(0,r.yg)("admonition",{type:"caution"},(0,r.yg)("p",{parentName:"admonition"},"Run ",(0,r.yg)("a",{parentName:"p",href:"/fix-gh-pages/snaps/reference/cli/subcommands#m-manifest"},(0,r.yg)("inlineCode",{parentName:"a"},"yarn mm-snap manifest --fix"))," if you modified\nyour Snap bundle after building.\nOtherwise your manifest ",(0,r.yg)("inlineCode",{parentName:"p"},"shasum")," value won't be correct, and attempting to install your Snap fails.")),(0,r.yg)("h3",{id:"use-other-build-tools"},"Use other build tools"),(0,r.yg)("p",null,"If you prefer building your Snap with a build system you're more comfortable with, Snaps implements\nplugins for several other build systems:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://www.npmjs.com/package/@metamask/snaps-webpack-plugin"},"Webpack")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://www.npmjs.com/package/@metamask/rollup-plugin-snaps"},"Rollup")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://www.npmjs.com/package/@metamask/snaps-browserify-plugin"},"Browserify"))),(0,r.yg)("p",null,"For examples on how to set up these build systems yourself, please see the\n",(0,r.yg)("a",{parentName:"p",href:"https://github.com/MetaMask/snaps-monorepo/tree/main/packages/examples/examples"},"examples"),"."),(0,r.yg)("p",null,"We recommend running ",(0,r.yg)("a",{parentName:"p",href:"/fix-gh-pages/snaps/reference/cli/subcommands#m-manifest"},(0,r.yg)("inlineCode",{parentName:"a"},"yarn mm-snap manifest --fix")),"\nafter creating your bundle to make sure your manifest ",(0,r.yg)("inlineCode",{parentName:"p"},"shasum")," value is correct.\nYou might also benefit from running ",(0,r.yg)("a",{parentName:"p",href:"/fix-gh-pages/snaps/reference/cli/subcommands#e-eval"},(0,r.yg)("inlineCode",{parentName:"a"},"yarn mm-snap eval")),"\nto detect any SES issues up front."),(0,r.yg)("h2",{id:"patch-dependencies"},"Patch dependencies"),(0,r.yg)("p",null,"Some dependencies might use APIs that aren't available in the\n",(0,r.yg)("a",{parentName:"p",href:"/fix-gh-pages/snaps/learn/about-snaps/execution-environment"},"Snaps execution environment"),".\nTo work around this, we recommend checking if another library is available that makes use of those APIs."),(0,r.yg)("p",null,"If you can't find another library (or version) that works with the Snaps execution environment, you\ncan patch the dependency yourself using ",(0,r.yg)("a",{parentName:"p",href:"https://npmjs.com/package/patch-package"},(0,r.yg)("inlineCode",{parentName:"a"},"patch-package")),"."),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"patch-package")," allows you to make changes to your dependencies, saving the changes as a patch and\nreplaying it when installing dependencies."),(0,r.yg)("p",null,"Install ",(0,r.yg)("inlineCode",{parentName:"p"},"patch-package")," using Yarn:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},"yarn add -D patch-package postinstall-postinstall\n")),(0,r.yg)("p",null,"Then add a postinstall script to your ",(0,r.yg)("inlineCode",{parentName:"p"},"package.json"),":"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-diff",metastring:'title="package.json"',title:'"package.json"'},' "scripts": {\n+  "postinstall": "patch-package"\n }\n')),(0,r.yg)("p",null,"Now you can make changes to your dependencies inside ",(0,r.yg)("inlineCode",{parentName:"p"},"node_modules")," and run\n",(0,r.yg)("inlineCode",{parentName:"p"},"yarn patch-package package-name")," to save the changes as a patch.\nThis creates a ",(0,r.yg)("inlineCode",{parentName:"p"},".patch")," file containing your dependency patch.\nThese patches can be committed to your Git repository and are replayed when you re-install your dependencies."),(0,r.yg)("h3",{id:"patch-the-use-of-xmlhttprequest"},"Patch the use of ",(0,r.yg)("inlineCode",{parentName:"h3"},"XMLHttpRequest")),(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"XMLHttpRequest")," API is not exposed in the Snaps execution environment and won't be in the future.\nBecause of this, you may run into issues with dependencies in your dependency tree attempting to\nuse this API for their network requests."),(0,r.yg)("p",null,"The following are examples of popular libraries that use ",(0,r.yg)("inlineCode",{parentName:"p"},"XMLHttpRequest")," and are thus ",(0,r.yg)("strong",{parentName:"p"},"not"),"\ncompatible with the Snaps execution environment.\nThis section also describes patching strategies for fixing dependencies that try to use these libraries."),(0,r.yg)("h4",{id:"cross-fetch"},"cross-fetch"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"cross-fetch")," is a popular library used for cross-platform access to the ",(0,r.yg)("inlineCode",{parentName:"p"},"fetch")," API across multiple\nenvironments.\nUnder the hood, however, the library uses ",(0,r.yg)("inlineCode",{parentName:"p"},"XMLHttpRequest")," and thus causes issues when used in a Snap."),(0,r.yg)("p",null,"You can easily patch this issue using ",(0,r.yg)("inlineCode",{parentName:"p"},"patch-package"),".\nOpen ",(0,r.yg)("inlineCode",{parentName:"p"},"node_modules/cross-fetch/browser-ponyfill.js")," and find the following lines near the bottom of\nthe file:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-javascript",metastring:'title="browser-ponyfill.js"',title:'"browser-ponyfill.js"'},"// Choose between native implementation (global) or custom implementation (__self__)\n// var ctx = global.fetch ? global : __self__;\nvar ctx = __self__; // this line disable service worker support temporarily\n")),(0,r.yg)("p",null,"You can replace that with the following snippet:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-javascript",metastring:'title="browser-ponyfill.js"',title:'"browser-ponyfill.js"'},"// Choose between native implementation (global) or custom implementation (__self__)\nvar ctx = global.fetch\n  ? { ...global, fetch: global.fetch.bind(global) }\n  : __self__;\n// var ctx = __self__; // this line disable service worker support temporarily\n")),(0,r.yg)("p",null,"After replacing it, run ",(0,r.yg)("inlineCode",{parentName:"p"},"yarn patch-package cross-fetch"),", which saves the patch for future use."),(0,r.yg)("p",null,"Alternatively, you can use the following patch, copy and paste it to\n",(0,r.yg)("inlineCode",{parentName:"p"},"patches/cross-fetch+3.1.5.patch"),", and re-install your dependencies:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-diff"},"diff --git a/node_modules/cross-fetch/dist/browser-ponyfill.js b/node_modules/cross-fetch/dist/browser-ponyfill.js\nindex f216aa3..6b3263b 100644\n--- a/node_modules/cross-fetch/dist/browser-ponyfill.js\n+++ b/node_modules/cross-fetch/dist/browser-ponyfill.js\n@@ -543,8 +543,8 @@ __self__.fetch.ponyfill = true;\n // Remove \"polyfill\" property added by whatwg-fetch\n delete __self__.fetch.polyfill;\n // Choose between native implementation (global) or custom implementation (__self__)\n-// var ctx = global.fetch ? global : __self__;\n-var ctx = __self__; // this line disable service worker support temporarily\n+var ctx = global.fetch ? { ...global, fetch: global.fetch.bind(global) } : __self__;\n+// var ctx = __self__; // this line disable service worker support temporarily\n exports = ctx.fetch // To enable: import fetch from 'cross-fetch'\n exports.default = ctx.fetch // For TypeScript consumers without esModuleInterop.\n exports.fetch = ctx.fetch // To enable: import {fetch} from 'cross-fetch'\n")),(0,r.yg)("p",null,"Using either of these methods allows your dependencies to access the ",(0,r.yg)("inlineCode",{parentName:"p"},"fetch")," API correctly and\n",(0,r.yg)("inlineCode",{parentName:"p"},"cross-fetch")," compatible with the Snaps execution environment."),(0,r.yg)("h4",{id:"axios"},"axios"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"axios")," is a popular networking library that uses ",(0,r.yg)("inlineCode",{parentName:"p"},"XMLHttpRequest")," under the hood."),(0,r.yg)("p",null,"Currently, there's no known way of patching ",(0,r.yg)("inlineCode",{parentName:"p"},"axios")," to work with the Snaps execution environment.\nInstead, you must replace ",(0,r.yg)("inlineCode",{parentName:"p"},"axios")," with another library such as ",(0,r.yg)("inlineCode",{parentName:"p"},"isomorphic-fetch")," or\n",(0,r.yg)("inlineCode",{parentName:"p"},"isomorphic-unfetch"),", or simply use the Snaps execution environment global ",(0,r.yg)("inlineCode",{parentName:"p"},"fetch"),"."),(0,r.yg)("p",null,"The following is an example of how you can rewrite your dependency to use ",(0,r.yg)("inlineCode",{parentName:"p"},"fetch")," instead of ",(0,r.yg)("inlineCode",{parentName:"p"},"axios"),"."),(0,r.yg)("admonition",{type:"note"},(0,r.yg)("p",{parentName:"admonition"},"In a production environment this may be a large task depending on the usage of ",(0,r.yg)("inlineCode",{parentName:"p"},"axios"),".")),(0,r.yg)(o.A,{mdxType:"Tabs"},(0,r.yg)(s.A,{value:"axios",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-javascript"},'const instance = axios.create({\n  baseURL: "https://api.github.com/",\n});\n\ninstance\n  .get("users/MetaMask")\n  .then((res) => {\n    if (res.status >= 400) {\n      throw new Error("Bad response from server");\n    }\n    return res.data;\n  })\n  .then((user) => {\n    console.log(user);\n  })\n  .catch((err) => {\n    console.error(err);\n  });\n'))),(0,r.yg)(s.A,{value:"fetch",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-javascript"},'fetch("https://api.github.com/users/MetaMask")\n  .then((res) => {\n    if (!res.ok) {\n        throw new Error("Bad response from server");\n    }\n    return res.json();\n  })\n  .then((json) => console.log(json))\n  .catch((err) => console.error(err));\n')))),(0,r.yg)("p",null,"For more information, see how to\n",(0,r.yg)("a",{parentName:"p",href:"https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper"},"replace axios with a simple custom fetch wrapper"),"."))}h.isMDXComponent=!0},19365:(e,n,a)=>{a.d(n,{A:()=>s});var t=a(96540),r=a(20053);const o={tabItem:"tabItem_Ymn6"};function s(e){let{children:n,hidden:a,className:s}=e;return t.createElement("div",{role:"tabpanel",className:(0,r.A)(o.tabItem,s),hidden:a},n)}},4865:(e,n,a)=>{a.d(n,{A:()=>d});var t=a(58168),r=a(96540),o=a(20053),s=a(23104),i=a(47751),l=a(92303);const p={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function u(e){let{className:n,block:a,selectedValue:i,selectValue:l,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:m}=(0,s.a_)(),d=e=>{const n=e.currentTarget,a=c.indexOf(n),t=u[a].value;t!==i&&(m(n),l(t))},h=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const a=c.indexOf(e.currentTarget)+1;n=c[a]??c[0];break}case"ArrowLeft":{const a=c.indexOf(e.currentTarget)-1;n=c[a]??c[c.length-1];break}}n?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.A)("tabs",{"tabs--block":a},n)},u.map((e=>{let{value:n,label:a,attributes:s}=e;return r.createElement("li",(0,t.A)({role:"tab",tabIndex:i===n?0:-1,"aria-selected":i===n,key:n,ref:e=>c.push(e),onKeyDown:h,onClick:d},s,{className:(0,o.A)("tabs__item",p.tabItem,s?.className,{"tabs__item--active":i===n})}),a??n)})))}function c(e){let{lazy:n,children:a,selectedValue:t}=e;const o=(Array.isArray(a)?a:[a]).filter(Boolean);if(n){const e=o.find((e=>e.props.value===t));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},o.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==t}))))}function m(e){const n=(0,i.u)(e);return r.createElement("div",{className:(0,o.A)("tabs-container",p.tabList)},r.createElement(u,(0,t.A)({},e,n)),r.createElement(c,(0,t.A)({},e,n)))}function d(e){const n=(0,l.A)();return r.createElement(m,(0,t.A)({key:String(n)},e))}},47751:(e,n,a)=>{a.d(n,{u:()=>m});var t=a(96540),r=a(56347),o=a(57485),s=a(31682),i=a(89466);function l(e){return function(e){return t.Children.map(e,(e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:n,label:a,attributes:t,default:r}}=e;return{value:n,label:a,attributes:t,default:r}}))}function p(e){const{values:n,children:a}=e;return(0,t.useMemo)((()=>{const e=n??l(a);return function(e){const n=(0,s.X)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,a])}function u(e){let{value:n,tabValues:a}=e;return a.some((e=>e.value===n))}function c(e){let{queryString:n=!1,groupId:a}=e;const s=(0,r.W6)(),i=function(e){let{queryString:n=!1,groupId:a}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:n,groupId:a});return[(0,o.aZ)(i),(0,t.useCallback)((e=>{if(!i)return;const n=new URLSearchParams(s.location.search);n.set(i,e),s.replace({...s.location,search:n.toString()})}),[i,s])]}function m(e){const{defaultValue:n,queryString:a=!1,groupId:r}=e,o=p(e),[s,l]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!u({value:n,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=a.find((e=>e.default))??a[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:o}))),[m,d]=c({queryString:a,groupId:r}),[h,g]=function(e){let{groupId:n}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,o]=(0,i.Dv)(a);return[r,(0,t.useCallback)((e=>{a&&o.set(e)}),[a,o])]}({groupId:r}),y=(()=>{const e=m??h;return u({value:e,tabValues:o})?e:null})();(0,t.useLayoutEffect)((()=>{y&&l(y)}),[y]);return{selectedValue:s,selectValue:(0,t.useCallback)((e=>{if(!u({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),g(e)}),[d,g,o]),tabValues:o}}}}]);