import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export function onRouteDidUpdate({ location }) {
  const initPath = location.pathname;
  const getRelativePath = (str) => str.replace(/^(?:\/\/|[^/]+)*\//, "");
  if (initPath.includes("/infura") && ExecutionEnvironment.canUseDOM) {
    const links = document.querySelectorAll("main .theme-doc-markdown a:not([href^='#'])");
    if (links.length > 0) {
      links.forEach(link => {
        if (!link.href.includes("https")) {
          const path = getRelativePath(link.href);
          const url = path.substring(0, path.indexOf(".md/"));
          link.href = `https://docs.infura.io/${url}`;
        }
      });
    }
  }
}
