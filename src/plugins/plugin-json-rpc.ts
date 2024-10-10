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

const RPC_NETWORK_URL = "https://sot-network-methods.vercel.app/specs";

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
    url: "https://metamask.github.io/api-specs/latest/openrpc.json",
    name: NETWORK_NAMES.metamask,
  },
];

export default function useNetworksMethodPlugin() {
  return {
    name: "plugin-json-rpc",
    async contentLoaded({ actions }) {
      const { setGlobalData } = actions;
      await fetchMultipleData(requests)
        .then((responseArray) => {
          setGlobalData({ netData: responseArray });
        })
        .catch(() => {
          setGlobalData({ netData: [] });
        });
    },
    configureWebpack() {
      return {
        plugins: [
          new NodePolyfillPlugin()
        ],
        resolve: {
          alias: {
            rpc: path.resolve(__dirname, "node_modules"),
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
