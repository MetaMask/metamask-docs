/* eslint-disable no-plusplus */
function highlightStart(fileContent: string, variableName: string): string {
  // Add defensive check for undefined fileContent
  if (!fileContent) {
    console.warn(`File content is undefined in highlightStart for variable: ${variableName}`)
    return ''
  }

  const contentByLine = fileContent.split(`\n`)
  for (let i = 0; i < contentByLine.length; i += 1) {
    if (contentByLine[i].includes(`IMP START - ${variableName}`)) {
      contentByLine[i] = `//highlight-start \n// focus-start`
    }
  }
  return contentByLine.join('\n')
}

function highlightEnd(fileContent: string, variableName: string): string {
  // Add defensive check for undefined fileContent
  if (!fileContent) {
    console.warn(`File content is undefined in highlightEnd for variable: ${variableName}`)
    return ''
  }

  const contentByLine = fileContent.split(`\n`)
  for (let i = 0; i < contentByLine.length; i += 1) {
    if (contentByLine[i].includes(`IMP END - ${variableName}`)) {
      contentByLine[i] = `//highlight-end \n// focus-end`
    }
  }
  return contentByLine.join('\n')
}

function removeHighlightCode(fileContent: string): string {
  // Add defensive check for undefined fileContent
  if (!fileContent) {
    console.warn(`File content is undefined in removeHighlightCode`)
    return ''
  }

  // 2. line that this occurs on
  const contentByLine = fileContent.split(`\n`)
  for (let i = 0; i < contentByLine.length; i += 1) {
    if (contentByLine[i].includes('IMP')) {
      contentByLine.splice(i, 1)
    }
  }
  return contentByLine.join('\n')
}

function highlightSection(fileContent: string, variableName: string): string {
  // Add defensive check for undefined fileContent
  if (!fileContent) {
    console.warn(`File content is undefined in highlightSection for variable: ${variableName}`)
    return ''
  }

  const highlightStartFile = highlightStart(fileContent, variableName)
  const highlightedFile = highlightEnd(highlightStartFile, variableName)
  return removeHighlightCode(highlightedFile)
}

function highlight(stepIndex, filenames, files, steps) {
  // Add defensive checks for undefined parameters
  if (!steps || !steps[stepIndex] || !steps[stepIndex].pointer) {
    console.warn(`Invalid step data at index ${stepIndex}`)
    return files || {}
  }

  const { pointer } = steps[stepIndex]
  const newFiles = files || {}

  for (let i = 0; i < filenames.length; i++) {
    if (filenames[i] === pointer.filename) {
      newFiles[filenames[i]] = highlightSection(
        pointer.fileContent || files[filenames[i]],
        pointer.variableName
      )
    } else {
      newFiles[filenames[i]] = removeHighlightCode(files[filenames[i]])
    }
  }

  return newFiles
}

export default highlight
