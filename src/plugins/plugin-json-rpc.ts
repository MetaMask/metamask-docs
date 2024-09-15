import LINEA_JSON from "./linea-openrpc.json";

export interface ResponseItem {
  name: string;
  data: any | null;
  error: Error | null | boolean;
}

async function fetchData(url: string, name: string): Promise<ResponseItem> {
  if (name === NETWORK_NAMES.linea) {
    return { name, data: LINEA_JSON, error: false }
  }
  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    return { name, data, error: false };
  } catch (error) {
    return { name, data: null, error: true };
  }
}

async function fetchMultipleData(
  requests: { url: string; name: string }[]
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
  };
}
