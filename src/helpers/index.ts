import { RPC_NETWORK_URL } from "../lib/constants";

export const fetchAndGenerateDynamicSidebarItems = async (networkName) => {
  try {
    const response = await fetch(`${RPC_NETWORK_URL}/${networkName}`);
    const data = await response.json();
    const dynamicItems = data.methods.map((method) => ({
      type: "link",
      label: method.name,
      href: `/services/reference/linea/json-rpc-methods-new/${method.name}`,
    })).sort((a, b) => a.label.localeCompare(b.label));
    return [
      {
        type: "category",
        label: "JSON-RPC Methods NEW",
        link: {
          type: 'generated-index',
          slug: "/services/reference/linea/json-rpc-methods-new/"
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
