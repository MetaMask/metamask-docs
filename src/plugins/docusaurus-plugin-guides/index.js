const path = require("path");
const fs = require("fs");
const util = require("util");
const glob = require("glob");
const matter = require("gray-matter");

const globAsync = util.promisify(glob);
const readFileAsync = util.promisify(fs.readFile);

module.exports = (context, options) => ({
  name: "docusaurus-plugin-guides",
  getPathsToWatch() {
    const dir = path.resolve(context.siteDir, "src", "pages", "guides");
    return [`${dir}/**/*.{md,mdx}`];
  },
  async loadContent() {
    const dir = path.resolve(context.siteDir, "src", "pages", "guides");

    const filenames = await globAsync("**/*.{md,mdx}", { cwd: dir, nodir: true });
    const frontMatters = {};

    for (const filename of filenames) {
      const src = await readFileAsync(path.join(dir, filename), "utf-8");
      const { data } = matter(src);
      const splits = filename.split(".");
      splits.pop();
      const name = splits.join("."); // Trim .md
      frontMatters[name] = data;
    }

    return frontMatters;
  },
  async contentLoaded({ content, actions }) {
    const { createData, addRoute } = actions;
    const contentHub = await createData("guides.json", JSON.stringify(content));
    addRoute({
      path: (process.env.REACT_APP_BASE_URL || "/docs/") + "guides",
      exact: true,
      component: "@site/src/pages/guides",
      modules: { content: contentHub },
    });
  },
});
