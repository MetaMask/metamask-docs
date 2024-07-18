import { useState } from "react";
import { useLocation } from "@docusaurus/router";

interface PageSidebar {
  path: string;
  network: string;
}

const usePageState = () => {
  const { pathname } = useLocation();
  const [pageState] = useState<PageSidebar | undefined>(() => {
    const [path, network] = pathname.split("/").slice(1);
    if (path && network) return { path, network };
    return;
  });
  return pageState;
};

export default usePageState;