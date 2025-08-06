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
    const response = await axios.get("https://raw.githubusercontent.com/" + filename);
    var fileContent = response.data;
    if (typeof fileContent !== "string") {
      fileContent = JSON.stringify(fileContent, null, 2);
    }
    return fileContent;
  } catch (e) {
    return ""; // Return empty string as fallback
  }
}

const qsFileLinks = require("../../utils/qs-file-links.json");
module.exports = (context, options) => ({
  name: "docusaurus-plugin-virtual-files",
  async loadContent() {
    console.log('🔄 Virtual files plugin: loadContent called');
    const dir = path.resolve(context.siteDir, options.rootDir);
    const filenames = Object.values(qsFileLinks);
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
          data = await fetchHostedFile(filename);

          try {
            await writeFileAsync(filePath, data);
          } catch (error) {
            console.log(`Error saving ${filename} to cache: ${error.message}`);
          }
        }
        fileContents[filename] = data;
      }
    } else {
      for (const filename of filenames) {
        fileContents[filename] = await fetchHostedFile(filename);
      }
    }

    const emptyFiles = Object.entries(fileContents).filter(([key, value]) => !value || value.length === 0);
    if (emptyFiles.length > 0) {
      console.log(`Warning: ${emptyFiles.length} files are empty:`, emptyFiles.map(([key]) => key));
    }

    console.log(`✅ Virtual files plugin: Loaded ${Object.keys(fileContents).length} files`);
    return fileContents;
  },
  async contentLoaded({ content, actions }) {
    const { createData, addRoute } = actions;

    console.log('🔄 Virtual files plugin: contentLoaded called');
    console.log(`📁 Content has ${Object.keys(content).length} files`);

    // Create JSON data file like web3auth-docs
    const files = await createData("files.json", JSON.stringify(content));
    console.log('📄 Created files.json data:', files);

    const routePath = "/quickstart";
    console.log(`🛣️ Adding route at path: ${routePath}`);
    console.log(`📍 Component path: @site/src/pages/quickstart`);

    addRoute({
      path: routePath,
      exact: true,
      component: "@site/src/pages/quickstart",
      modules: {
        files,
      },
    });

    console.log('✅ Virtual files plugin: Route added successfully');
  },
});

module.exports.validateOptions = ({ options, validate }) =>
  validate(
    joi.object({
      rootDir: joi.string().required(),
    }),
    options,
  );
