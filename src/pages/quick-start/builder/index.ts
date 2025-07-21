/* eslint-disable camelcase */
import { IntegrationBuilder, IntegrationStep } from '../interfaces'
import { quickStartHostedLinks, quickStartSourceCode } from '../../../utils/IBmaps'
import { LANGS } from './choices'

import highlight from './highlight'
import android from './android'
import flutter from './flutter'
import ios from './ios'
import react_native from './react_native'
import angular from './web/angular'
import nextjs from './web/nextjs'
import react from './web/react'
import vue from './web/vue'

const frameworks = {
  ANGULAR: angular,
  NEXTJS: nextjs,
  REACT: react,
  VUE: vue,
  ANDROID: android,
  IOS: ios,
  REACT_NATIVE: react_native,
  FLUTTER: flutter,
}

const builder: IntegrationBuilder = {
  // Name of the integration builder
  displayName: 'Web3Auth',

  // Options that will be displayed in the UI for selection
  options: {
    framework: {
      displayName: 'Platform/ Framework',
      default: LANGS[0].key,
      type: 'dropdown',
      choices: LANGS,
    },
  },

  // Build integrations based on input values
  build(values: Record<string, string>, files: Record<string, string>, stepIndex: number) {
    const finalValues = values

    const filenames: string[] = []
    const newFiles = JSON.parse(JSON.stringify(files))
    const steps: IntegrationStep[] = []

    let frameworkDefault

    frameworkDefault = LANGS[0].key

    if (!LANGS.map(item => item.key).includes(finalValues.framework)) {
      finalValues.framework = frameworkDefault
    }

    this.options = {
      framework: {
        displayName: 'Platform/ Framework',
        default: frameworkDefault,
        type: 'dropdown',
        choices: LANGS,
      },
    }

    frameworks[finalValues.framework].build({ ...finalValues, filenames, files: newFiles, steps })

    if (stepIndex >= steps.length) {
      // eslint-disable-next-line no-param-reassign
      stepIndex = steps.length - 1
    }

    const highlightedFiles = highlight(stepIndex, filenames, newFiles, steps)

    return {
      filenames: filenames.map(it => `${it}`),
      files: highlightedFiles,
      steps: steps.map(it => ({
        ...it,
        pointer: it.pointer ? { ...it.pointer, filename: `${it.pointer.filename}` } : undefined,
      })),
      stepIndex,
      embedLink: quickStartHostedLinks[finalValues.framework],
      sourceCodeLink: quickStartSourceCode[finalValues.framework],
    }
  },
}

export default builder
