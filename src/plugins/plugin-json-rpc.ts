import { JSON_RPC_METHODS_LABEL, NETWORK_NAMES, RPC_NETWORK_URL } from "../lib/constants.ts";

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

function generateMethodMDX(page) {
  return `---
title: '${page.name}'
---
# ${page.name}
  `;
}

export default function useNetworksMethodPlugin() {
  return {
    name: "plugin-json-rpc",
    async contentLoaded({ actions }) {
      const { setGlobalData, createData, addRoute } = actions;
      await fetchMultipleData(requests)
        .then((responseArray) => {
          setGlobalData({ netData: responseArray });
          return Promise.all(responseArray[responseArray.findIndex(item => item.name === NETWORK_NAMES.linea) || 0].data.methods.map(async (page) => {

            const methodMDXContent = generateMethodMDX(page);

            const filePath = await createData(
              `services/reference/linea/json-rpc-methods/${page.name}.mdx`,
              methodMDXContent
            );

            return addRoute({
              path: `/services/reference/linea/json-rpc-methods/${page.name}`,
              component: require.resolve("../components/CustomReferencePage/index.tsx"),
              exact: true,
              modules: {
                methodFile: filePath,
              },
              customData: { ...page }
            });
          }));
        })
        .catch(() => {
          setGlobalData({ netData: [] });
        });
    },
  };
}
