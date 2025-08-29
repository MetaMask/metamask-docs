/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { IntegrationStep } from './interfaces'

interface Module {
  default: React.ComponentType<any>
  frontMatter?: Record<string, any>
}

export function toStep(mod: Module): IntegrationStep {
  const Component = mod.default
  const step: IntegrationStep = {
    content: <Component />, // Always include the MDX content
  }

  // Add contentType if specified
  if (mod.frontMatter?.contentType) {
    step.contentType = mod.frontMatter.contentType
  }

  // Add mediaContent if specified
  if (mod.frontMatter?.mediaContent) {
    step.mediaContent = mod.frontMatter.mediaContent
  }

  return step
}

export function toSteps<T extends { [key in keyof T]: Module }>(mods: T) {
  return Object.fromEntries(
    Object.entries(mods).map(([key, mod]) => [key, toStep(mod as Module)])
  ) as { [key in keyof T]: IntegrationStep }
}

export class ReplaceFileAggregator {
  replacementOutcomes = []

  replaceFileVariable(
    fileContent: string,
    filename: string,
    variableName: string,
    replacement: string
  ): string {
    // Add defensive check for undefined/null fileContent
    if (!fileContent || typeof fileContent !== 'string') {
      console.warn(
        `Warning: fileContent is ${fileContent} for file ${filename}. Using empty string.`
      )
      return ''
    }

    // 1. number of new lines to derive OFFSET
    const replacementLineCount = replacement.split(`\n`).length - 3
    // 2. line that this occurs on
    const contentByLine = fileContent.split(`\n`)
    let variableLine
    for (let i = 0; i < contentByLine.length; i += 1) {
      if (contentByLine[i].includes(variableName)) {
        variableLine = i
      }
    }
    variableLine += 1
    const exp = `\n *// REPLACE-${variableName}-\n *`
    const re = new RegExp(exp, 'gm')

    this.replacementOutcomes.push({ filename, replacementLineCount, variableLine })
    return fileContent.replace(re, replacement)
  }

  highlightRange(
    filename: string,
    fileContent: string,
    variableName: string
  ): { range: string; filename: string; fileContent: string; variableName: string } {
    // Add defensive check for undefined/null fileContent
    if (!fileContent || typeof fileContent !== 'string') {
      console.warn(
        `Warning: fileContent is ${fileContent} for file ${filename} in highlightRange. Using empty string.`
      )
      return { range: '1-1', filename, fileContent: '', variableName }
    }

    const contentByLine = fileContent.split(`\n`)
    const startLine = []
    const endLine = []
    for (let i = 0; i < contentByLine.length; i += 1) {
      if (contentByLine[i].includes(`IMP START - ${variableName}`)) {
        startLine.push(i)
      }
      if (contentByLine[i].includes(`IMP END - ${variableName}`)) {
        endLine.push(i)
      }
    }

    return { range: `${startLine[0]}-${endLine[0]}`, filename, fileContent, variableName }
  }

  rangeOffsetEditor(pointer: { range: string; filename: string }) {
    const numbersInRange = pointer.range.split('-')
    for (let x = 0; x < numbersInRange.length; x += 1) {
      let actualNum = parseInt(numbersInRange[x], 10)
      let offset = 0
      for (let i = 0; i < this.replacementOutcomes.length; i += 1) {
        const mutatedActualNum = actualNum + offset
        if (
          mutatedActualNum > this.replacementOutcomes[i].variableLine &&
          this.replacementOutcomes[i].filename === pointer.filename
        ) {
          offset += this.replacementOutcomes[i].replacementLineCount
        }
      }
      actualNum += offset
      numbersInRange[x] = actualNum.toString()
    }
    return { range: numbersInRange.join('-'), filename: pointer.filename }
  }
}

export function replaceFileVariable(
  fileContent: string,
  variableName: string,
  replacement: string
) {
  const exp = `\n *// REPLACE-${variableName}-\n *`
  const re = new RegExp(exp, 'gm')
  return fileContent.replace(re, replacement)
}
