const axios = require("axios");
const util = require("util");
const fs = require("fs");
const path = require("path");
const joi = require("joi");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const environment = process.env.IB_ENV || "development";

async function fetchHostedFile(filename) {
  try {
    response = await axios.get("https:/raw.githubusercontent.com/" + filename);
    var fileContent = response.data;
    if (typeof fileContent !== "string") {
      fileContent = JSON.stringify(fileContent, null, 2);
    }
    return fileContent;
  } catch (e) {
    console.log(`Error fetching ${filename}: ${e}`);
    return "";
  }
}

const IBfileLinks = require("../../utils/IBfileLinks.json");
module.exports = (context, options) => ({
  name: "docusaurus-plugin-virtual-files",
  async loadContent() {
    const dir = path.resolve(context.siteDir, options.rootDir);
    const filenames = Object.values(IBfileLinks);
    const fileContents = {};
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (environment === "development") {
      var data = "";
      for (const filename of filenames) {
        const filePath = path.join(dir, filename.replaceAll("/", "-"));
        try {
          data = await readFileAsync(filePath, "utf8");
        } catch (e) {
          console.log(`Fetching ${filename} since local cache not available`);

          data = await fetchHostedFile(filename);

          try {
            await writeFileAsync(filePath, data);
            console.log(`Saved ${filename} to cache`);
          } catch (error) {
            console.log(`Error saving ${filename} to cache`);
          }
        }
        fileContents[filename] = data;
      }
    } else {
      for (const filename of filenames) {
        fileContents[filename] = await fetchHostedFile(filename);
      }
    }

    return fileContents;
  },
  async contentLoaded({ content, actions }) {
    const { createData, addRoute } = actions;
    const files = await createData("files.json", JSON.stringify(content));
    addRoute({
      path: (process.env.REACT_APP_BASE_URL || "/docs/") + "quick-start",
      component: "@site/src/pages/quick-start",
      modules: {
        files,
      },
    });
  },
});

module.exports.validateOptions = ({ options, validate }) =>
  validate(
    joi.object({
      rootDir: joi.string().required(),
    }),
    options,
  );
