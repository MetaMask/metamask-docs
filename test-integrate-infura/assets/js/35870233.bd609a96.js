"use strict";(self.webpackChunkmetamask_docs=self.webpackChunkmetamask_docs||[]).push([[93772],{60944:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>r,contentTitle:()=>l,default:()=>p,frontMatter:()=>a,metadata:()=>o,toc:()=>d});var s=i(74848),t=i(28453);const a={description:"Manage files using IPFS.",sidebar_position:3},l="Manage files",o={id:"how-to/use-ipfs/manage-files",title:"Manage files",description:"Manage files using IPFS.",source:"@site/services/how-to/use-ipfs/manage-files.md",sourceDirName:"how-to/use-ipfs",slug:"/how-to/use-ipfs/manage-files",permalink:"/test-integrate-infura/services/how-to/use-ipfs/manage-files",draft:!1,unlisted:!1,editUrl:"https://github.com/MetaMask/metamask-docs/edit/main/services/how-to/use-ipfs/manage-files.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{description:"Manage files using IPFS.",sidebar_position:3},sidebar:"servicesSidebar",previous:{title:"Authenticate requests",permalink:"/test-integrate-infura/services/how-to/use-ipfs/authenticate-requests"},next:{title:"Migrate to Infura's IPFS service",permalink:"/test-integrate-infura/services/how-to/use-ipfs/migrate-to-infuras-ipfs-service"}},r={},d=[{value:"Upload a file with the IPFS API",id:"upload-a-file-with-the-ipfs-api",level:3},{value:"Upload a file with the Infura UI",id:"upload-a-file-with-the-infura-ui",level:3},{value:"Upload a file with <code>ipfs-upload-client</code>",id:"upload-a-file-with-ipfs-upload-client",level:3},{value:"Command flags",id:"command-flags",level:4},{value:"Pin a file",id:"pin-a-file",level:3},{value:"Unpin a file",id:"unpin-a-file",level:3},{value:"Read a file",id:"read-a-file",level:3}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"manage-files",children:"Manage files"}),"\n",(0,s.jsx)(n.p,{children:"Upload and pin files across the IPFS network using Infura's API endpoints, custom tools, and libraries."}),"\n",(0,s.jsx)(n.admonition,{type:"info",children:(0,s.jsx)(n.p,{children:"Infura doesn't currently support remote pinning services on IPFS Desktop."})}),"\n",(0,s.jsx)(n.h3,{id:"upload-a-file-with-the-ipfs-api",children:"Upload a file with the IPFS API"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'curl -X POST -F file=@myfile \\\n-u "<API_KEY>:<API_KEY_SECRET>" \\\n"https://ipfs.infura.io:5001/api/v0/add"\n\n> {\n      "Name":"ipfs_file_docs_getting_started_demo.txt",\n      "Hash":"QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn",\n      "Size":"44"\n  }\n'})}),"\n",(0,s.jsxs)(n.p,{children:["When you upload a file using the ",(0,s.jsx)(n.code,{children:"/api/v0/add"})," endpoint, the file is automatically pinned, and it isn't necessary to ",(0,s.jsx)(n.code,{children:"pin"})," again."]}),"\n",(0,s.jsx)(n.h3,{id:"upload-a-file-with-the-infura-ui",children:"Upload a file with the Infura UI"}),"\n",(0,s.jsx)(n.p,{children:"Upload one or more files using the Infura UI. Uploaded files are automatically pinned and automatically appear in your project's dashboard explorer. Unpin it at any time using the unpin button in the UI. To upload content:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["In the IPFS dashboard for your project, select ",(0,s.jsx)(n.strong,{children:"UPLOAD CONTENT"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Drag and drop, or select one or more files to upload, and click ",(0,s.jsx)(n.strong,{children:"UPLOAD"}),"."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Your uploaded files will display in the dashboard."}),"\n",(0,s.jsxs)(n.h3,{id:"upload-a-file-with-ipfs-upload-client",children:["Upload a file with ",(0,s.jsx)(n.code,{children:"ipfs-upload-client"})]}),"\n",(0,s.jsxs)(n.p,{children:["Infura's ",(0,s.jsx)(n.a,{href:"https://github.com/INFURA/ipfs-upload-client",children:"ipfs-upload-client"})," is a command line tool for uploading files and directories to IPFS. Install the tool using the following steps:"]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Clone the ipfs-upload-client repository:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"git clone https://github.com/INFURA/ipfs-upload-client.git\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Change to the ",(0,s.jsx)(n.code,{children:"ipfs-upload-client"})," directory:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"cd ipfs-upload-client\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Compile the source code to create a binary in the project folder:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"go build\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Upload your files and directories to IPFS using the following syntax:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"./ipfs-upload-client --id <API_KEY> --secret <API_KEY_SECRET> </path/to/data>\n"})}),"\n",(0,s.jsxs)(n.p,{children:["By default, the tool also pins your uploaded file. You can override this default by setting ",(0,s.jsx)(n.code,{children:"--pin false"}),". Read more\nabout using the tool in ",(0,s.jsx)(n.a,{href:"https://blog.infura.io/ipfs-file-upload-client-tool/",children:"this blog post"}),"."]}),"\n",(0,s.jsx)(n.h4,{id:"command-flags",children:"Command flags"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'  --id       API key\n  --secret   API key secret\n  --url      The API URL (default "https://ipfs.infura.io:5001", set with --url <CUSTOM_URL>)\n  --pin      Whether or not to pin the data (default true, set to false with --pin=false)\n'})}),"\n",(0,s.jsx)(n.h3,{id:"pin-a-file",children:"Pin a file"}),"\n",(0,s.jsxs)(n.p,{children:["IPFS pinning allows you to retain and persist data on IPFS nodes. Pinning assures that data is accessible indefinitely, and\nnot removed during the ",(0,s.jsx)(n.a,{href:"https://docs.ipfs.io/concepts/persistence/#garbage-collection",children:"IPFS garbage collection process"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'curl -X POST -u "<API_KEY>:<API_KEY_SECRET>" \\\n"https://ipfs.infura.io:5001/api/v0/pin/add?arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn"\n'})}),"\n",(0,s.jsxs)(n.p,{children:["A pinned file will appear in your project's dashboard explorer. You can ",(0,s.jsx)(n.a,{href:"/test-integrate-infura/services/how-to/use-ipfs/manage-files#unpin-a-file",children:"unpin"})," it at any\ntime using the unpin button in the UI or with the API endpoint."]}),"\n",(0,s.jsx)(n.h3,{id:"unpin-a-file",children:"Unpin a file"}),"\n",(0,s.jsx)(n.p,{children:"Unpin a file using the Infura UI or IPFS API."}),"\n",(0,s.jsxs)(n.p,{children:["To unpin a file in the Infura UI, select the file in the IPFS dashboard for your project and select the ",(0,s.jsx)(n.strong,{children:"UNPIN"})," link."]}),"\n",(0,s.jsx)(n.p,{children:"Alternatively, use the IPFS API to unpin content."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'curl -X POST -u "<API_KEY>:<API_KEY_SECRET>" \\\n"https://ipfs.infura.io:5001/api/v0/pin/rm?arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn"\n'})}),"\n",(0,s.jsx)(n.h3,{id:"read-a-file",children:"Read a file"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'curl -X POST -u "<API_KEY>:<API_KEY_SECRET>" \\\n"https://ipfs.infura.io:5001/api/v0/cat?arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn"\n\n> Infura IPFS - Getting started demo.\n'})})]})}function p(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>o});var s=i(96540);const t={},a=s.createContext(t);function l(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);