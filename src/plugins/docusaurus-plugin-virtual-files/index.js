const axios = require('axios')
const util = require('util')
const fs = require('fs')
const path = require('path')
const joi = require('joi')
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

const environment = process.env.IB_ENV || 'development'

async function fetchHostedFile(filename) {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/' + filename)
    var fileContent = response.data
    if (typeof fileContent !== 'string') {
      fileContent = JSON.stringify(fileContent, null, 2)
    }
    return fileContent
  } catch (e) {
    return '' // Return empty string as fallback
  }
}

const qsFileLinks = require('../../utils/qs-file-links.json')
module.exports = (context, options) => ({
  name: 'docusaurus-plugin-virtual-files',
  async loadContent() {
    const dir = path.resolve(context.siteDir, options.rootDir)
    const filenames = Object.values(qsFileLinks)
    const fileContents = {}
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    if (environment === 'development') {
      var data = ''
      for (const filename of filenames) {
        const filePath = path.join(dir, filename.replaceAll('/', '-'))
        try {
          data = await readFileAsync(filePath, 'utf8')
        } catch (e) {
          data = await fetchHostedFile(filename)

          try {
            await writeFileAsync(filePath, data)
          } catch (error) {
            console.log(`Error saving ${filename} to cache: ${error.message}`)
          }
        }
        fileContents[filename] = data
      }
    } else {
      for (const filename of filenames) {
        fileContents[filename] = await fetchHostedFile(filename)
      }
    }

    console.log(`✅ Virtual files plugin: Loaded ${Object.keys(fileContents).length} files`)
    return fileContents
  },
  async contentLoaded({ content, actions }) {
    const { createData, addRoute } = actions

    // Create JSON data file
    const files = await createData('files.json', JSON.stringify(content))

    const routePath = '/quickstart'

    addRoute({
      path: routePath,
      exact: true,
      component: '@site/src/pages/quickstart',
      modules: {
        files,
      },
    })

    // Add this to prevent other routes from being created in the quickstart namespace
    addRoute({
      path: `${routePath}/*`,
      component: '@site/src/pages/quickstart',
      modules: {
        files,
      },
    })
  },
})

module.exports.validateOptions = ({ options, validate }) =>
  validate(
    joi.object({
      rootDir: joi.string().required(),
    }),
    options
  )
