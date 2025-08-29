const path = require('path')
const fs = require('fs')
const util = require('util')
const glob = require('glob')
const matter = require('gray-matter')

const globAsync = util.promisify(glob)
const readFileAsync = util.promisify(fs.readFile)

module.exports = (context, options) => ({
  name: 'docusaurus-plugin-tutorials',
  getPathsToWatch() {
    const dir = path.resolve(context.siteDir, 'src', 'pages', 'tutorials')
    return [`${dir}/**/*.{md,mdx}`]
  },
  async loadContent() {
    const dir = path.resolve(context.siteDir, 'src', 'pages', 'tutorials')

    const filenames = await globAsync('**/*.{md,mdx}', { cwd: dir, nodir: true })
    const frontMatters = {}

    for (const filename of filenames) {
      const src = await readFileAsync(path.join(dir, filename), 'utf-8')
      const { data } = matter(src)
      const splits = filename.split('.')
      splits.pop()
      const name = splits.join('.') // Trim .md
      frontMatters[name] = data
    }

    return frontMatters
  },
  async contentLoaded({ content, actions }) {
    const { createData, addRoute } = actions
    const contentHub = await createData('tutorials.json', JSON.stringify(content))
    addRoute({
      path: '/tutorials',
      exact: true,
      component: '@site/src/components/GuidesPage',
      modules: { content: contentHub },
    })
  },
})
