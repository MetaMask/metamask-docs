"use strict";(self.webpackChunkmetamask_docs=self.webpackChunkmetamask_docs||[]).push([[4002],{65739:(e,n,r)=>{r.d(n,{Ay:()=>c,RM:()=>a});var t=r(74848),s=r(28453);const a=[];function o(e){const n={p:"p",...(0,s.R)(),...e.components};return(0,t.jsx)(n.p,{children:"Returns an estimate of how much priority fee, in wei, you need to be included in a block."})}function c(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},5339:(e,n,r)=>{r.d(n,{Ay:()=>c,RM:()=>a});var t=r(74848),s=r(28453);const a=[];function o(e){const n={a:"a",code:"code",p:"p",...(0,s.R)(),...e.components};return(0,t.jsxs)(n.p,{children:["Replace ",(0,t.jsx)(n.code,{children:"YOUR-API-KEY"})," with an API key from your ",(0,t.jsx)(n.a,{href:"https://infura.io/dashboard",children:"Infura dashboard"}),"."]})}function c(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},10353:(e,n,r)=>{r.d(n,{Ay:()=>c,RM:()=>a});var t=r(74848),s=r(28453);const a=[];function o(e){const n={p:"p",...(0,s.R)(),...e.components};return(0,t.jsx)(n.p,{children:"None."})}function c(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},15772:(e,n,r)=>{r.d(n,{Ay:()=>u,RM:()=>c});var t=r(74848),s=r(28453),a=r(11470),o=r(19365);const c=[];function i(e){const n={code:"code",pre:"pre",...(0,s.R)(),...e.components};return(0,t.jsx)(a.A,{children:(0,t.jsx)(o.A,{value:"JSON",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'{\n  "jsonrpc": "2.0",\n  "id": 1,\n  "result": "0x55d4a80"\n}\n'})})})})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(i,{...e})}):i(e)}},82732:(e,n,r)=>{r.d(n,{Ay:()=>c,RM:()=>a});var t=r(74848),s=r(28453);const a=[];function o(e){const n={code:"code",p:"p",...(0,s.R)(),...e.components};return(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"result"}),": A hexadecimal value of the priority fee, in wei, needed to be included in a block."]})}function c(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},15476:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>x,contentTitle:()=>f,default:()=>y,frontMatter:()=>m,metadata:()=>b,toc:()=>v});var t=r(74848),s=r(28453),a=r(11470),o=r(19365),c=r(65739),i=r(10353),u=r(82732),l=r(5339);function d(e){const n={code:"code",pre:"pre",...(0,s.R)(),...e.components};return(0,t.jsx)(a.A,{children:(0,t.jsx)(o.A,{value:"cURL",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'curl https://base-mainnet.infura.io/v3/YOUR-API-KEY \\\n  -X POST \\\n  -H "Content-Type: application/json" \\\n  -d \'{"jsonrpc":"2.0","method":"eth_maxPriorityFeePerGas","params": [],"id":1}\'\n'})})})})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}var h=r(15772);const m={title:"eth_maxPriorityFeePerGas"},f=void 0,b={id:"reference/base/json-rpc-methods/eth_maxpriorityfeepergas",title:"eth_maxPriorityFeePerGas",description:"Parameters",source:"@site/services/reference/base/json-rpc-methods/eth_maxpriorityfeepergas.mdx",sourceDirName:"reference/base/json-rpc-methods",slug:"/reference/base/json-rpc-methods/eth_maxpriorityfeepergas",permalink:"/test-integrate-infura/services/reference/base/json-rpc-methods/eth_maxpriorityfeepergas",draft:!1,unlisted:!1,editUrl:"https://github.com/MetaMask/metamask-docs/edit/main/services/reference/base/json-rpc-methods/eth_maxpriorityfeepergas.mdx",tags:[],version:"current",frontMatter:{title:"eth_maxPriorityFeePerGas"},sidebar:"servicesSidebar",previous:{title:"eth_getUncleCountByBlockNumber",permalink:"/test-integrate-infura/services/reference/base/json-rpc-methods/eth_getunclecountbyblocknumber"},next:{title:"eth_protocolVersion",permalink:"/test-integrate-infura/services/reference/base/json-rpc-methods/eth_protocolversion"}},x={},v=[...c.RM,{value:"Parameters",id:"parameters",level:2},...i.RM,{value:"Returns",id:"returns",level:2},...u.RM,{value:"Example",id:"example",level:2},...l.RM,{value:"Request",id:"request",level:3},{value:"Response",id:"response",level:3},...h.RM];function j(e){const n={h2:"h2",h3:"h3",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(c.Ay,{}),"\n",(0,t.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n","\n",(0,t.jsx)(i.Ay,{}),"\n",(0,t.jsx)(n.h2,{id:"returns",children:"Returns"}),"\n","\n",(0,t.jsx)(u.Ay,{}),"\n",(0,t.jsx)(n.h2,{id:"example",children:"Example"}),"\n","\n",(0,t.jsx)(l.Ay,{}),"\n",(0,t.jsx)(n.h3,{id:"request",children:"Request"}),"\n","\n",(0,t.jsx)(p,{}),"\n",(0,t.jsx)(n.h3,{id:"response",children:"Response"}),"\n","\n",(0,t.jsx)(h.Ay,{})]})}function y(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(j,{...e})}):j(e)}},19365:(e,n,r)=>{r.d(n,{A:()=>o});r(96540);var t=r(18215);const s={tabItem:"tabItem_Ymn6"};var a=r(74848);function o(e){let{children:n,hidden:r,className:o}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,t.A)(s.tabItem,o),hidden:r,children:n})}},11470:(e,n,r)=>{r.d(n,{A:()=>R});var t=r(96540),s=r(18215),a=r(23104),o=r(56347),c=r(205),i=r(57485),u=r(31682),l=r(70679);function d(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:r}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:r,attributes:t,default:s}}=e;return{value:n,label:r,attributes:t,default:s}}))}(r);return function(e){const n=(0,u.X)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,r])}function h(e){let{value:n,tabValues:r}=e;return r.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:r}=e;const s=(0,o.W6)(),a=function(e){let{queryString:n=!1,groupId:r}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:n,groupId:r});return[(0,i.aZ)(a),(0,t.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(s.location.search);n.set(a,e),s.replace({...s.location,search:n.toString()})}),[a,s])]}function f(e){const{defaultValue:n,queryString:r=!1,groupId:s}=e,a=p(e),[o,i]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!h({value:n,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=r.find((e=>e.default))??r[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:a}))),[u,d]=m({queryString:r,groupId:s}),[f,b]=function(e){let{groupId:n}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(n),[s,a]=(0,l.Dv)(r);return[s,(0,t.useCallback)((e=>{r&&a.set(e)}),[r,a])]}({groupId:s}),x=(()=>{const e=u??f;return h({value:e,tabValues:a})?e:null})();(0,c.A)((()=>{x&&i(x)}),[x]);return{selectedValue:o,selectValue:(0,t.useCallback)((e=>{if(!h({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),b(e)}),[d,b,a]),tabValues:a}}var b=r(92303);const x={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var v=r(74848);function j(e){let{className:n,block:r,selectedValue:t,selectValue:o,tabValues:c}=e;const i=[],{blockElementScrollPositionUntilNextRender:u}=(0,a.a_)(),l=e=>{const n=e.currentTarget,r=i.indexOf(n),s=c[r].value;s!==t&&(u(n),o(s))},d=e=>{let n=null;switch(e.key){case"Enter":l(e);break;case"ArrowRight":{const r=i.indexOf(e.currentTarget)+1;n=i[r]??i[0];break}case"ArrowLeft":{const r=i.indexOf(e.currentTarget)-1;n=i[r]??i[i.length-1];break}}n?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.A)("tabs",{"tabs--block":r},n),children:c.map((e=>{let{value:n,label:r,attributes:a}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>i.push(e),onKeyDown:d,onClick:l,...a,className:(0,s.A)("tabs__item",x.tabItem,a?.className,{"tabs__item--active":t===n}),children:r??n},n)}))})}function y(e){let{lazy:n,children:r,selectedValue:s}=e;const a=(Array.isArray(r)?r:[r]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===s));return e?(0,t.cloneElement)(e,{className:"margin-top--md"}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==s})))})}function g(e){const n=f(e);return(0,v.jsxs)("div",{className:(0,s.A)("tabs-container",x.tabList),children:[(0,v.jsx)(j,{...n,...e}),(0,v.jsx)(y,{...n,...e})]})}function R(e){const n=(0,b.A)();return(0,v.jsx)(g,{...e,children:d(e.children)},String(n))}},28453:(e,n,r)=>{r.d(n,{R:()=>o,x:()=>c});var t=r(96540);const s={},a=t.createContext(s);function o(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);