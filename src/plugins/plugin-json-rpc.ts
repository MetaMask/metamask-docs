import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import * as path from "path";

export interface ResponseItem {
  name: string;
  data: any | null;
  error: Error | null | boolean;
}

async function fetchData(url: string, name: string): Promise<ResponseItem> {
  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    return { name, data, error: false };
  } catch (error) {
    return { name, data: null, error: true };
  }
}

async function fetchMultipleData(
  requests: { url: string; name: string }[],
): Promise<ResponseItem[]> {
  const promises = requests.map(({ url, name }) => fetchData(url, name));
  const responses = await Promise.all(promises);
  return responses;
}

export const RPC_NETWORK_URL = "https://sot-network-methods.vercel.app/specs";
export const MM_RPC_URL = "https://metamask.github.io/api-specs/latest/openrpc.json";
export const MM_REF_PATH = "wallet/reference/json-rpc-methods";

export enum NETWORK_NAMES {
  linea = "linea",
  metamask = "metamask",
}

const requests = [
  {
    url: `${RPC_NETWORK_URL}/${NETWORK_NAMES.linea}`,
    name: NETWORK_NAMES.linea,
  },
  {
    url: MM_RPC_URL,
    name: NETWORK_NAMES.metamask,
  },
];

export const prepareLinkItems = (items, refPath) => {
  return items.map((method) => ({
    type: "link",
    label: method.name,
    href: `/${refPath}/${method.name.toLowerCase()}`,
  }))
}

export const fetchAndGenerateDynamicSidebarItems = async (url: string, refPath: string, network: string) => {
  const dynamicRefItems = await fetchData(url, network);
  if (dynamicRefItems.data && !dynamicRefItems.error) {
    return prepareLinkItems(dynamicRefItems.data.methods, refPath);
  }
  return []
}

export default function useNetworksMethodPlugin() {
  return {
    name: "plugin-json-rpc",
    async loadContent() {
      return await fetchMultipleData(requests)
        .then((responseArray) => {
          return responseArray;
        })
        .catch(() => {
          return [];
        });
    },
    async contentLoaded({ content, actions }) {
      const { addRoute, createData, setGlobalData } = actions;
      setGlobalData({ netData: content });
      const dynamicRoutes = content.find(item => item.name === NETWORK_NAMES.metamask);
      if (dynamicRoutes) {
        const methodsData = await createData(
          'methodsData.json',
          JSON.stringify(dynamicRoutes.data.methods)
        );
        dynamicRoutes.data.methods.forEach(async (method) => {
          return addRoute({
            path: `/${MM_REF_PATH}/${method.name.toLowerCase()}`,
            component: require.resolve("../components/CustomReferencePage/index.tsx"),
            modules: {
              methodsData: methodsData,
            },
            exact: true,
            customData: { ...method, networkName: NETWORK_NAMES.metamask }
          });
        });
      }
    },
    configureWebpack() {
      return {
        plugins: [
          new NodePolyfillPlugin()
        ],
        resolve: {
          alias: {
            "@site-global": path.resolve(__dirname, '../methodsData.json'),
            fs: false,
            module: false,
            "child_process": false,
            "worker_threads": false,
            "uglify-js": false,
            "@swc/core": false,
            "esbuild": false,
          },
        },
      }
    },
  };
}
