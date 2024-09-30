import { RPC_NETWORK_URL } from "../lib/constants";

export const fetchAndGenerateDynamicSidebarItems = async (networkName) => {
  try {
    const response = await fetch(`${RPC_NETWORK_URL}/${networkName}`);
    const data = await response.json();
    const dynamicItems = data.methods.map((method) => ({
      type: "link",
      label: method.name,
      href: `/services/reference/linea/json-rpc-methods/${method.name}`,
    })).sort((a, b) => a.label.localeCompare(b.label));
    return [
      {
        type: "category",
        label: "JSON-RPC methods",
        link: {
          type: 'generated-index',
          slug: "/reference/linea/json-rpc-methods/"
        },
        collapsed: true,
        collapsible: true,
        items: dynamicItems,
      },
    ];
  } catch (error) {
    console.error("Error fetching methods:", error);
    return [];
  }
}
