import * as capitalize  from "lodash.capitalize"

export const fetchAndGenerateSidebarItems = async (networkName) => {
  try {
    const response = await fetch(`https://sot-network-methods.vercel.app/specs/${networkName}`);
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
