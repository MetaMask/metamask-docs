/* eslint-disable camelcase */
import { IntegrationBuilder, IntegrationStep } from '../interfaces'
import {
  DTKQuickStartSourceCode,
  DTKQuickStartHostedLinks,
  EWQuickStartHostedLinks,
  EWQuickStartSourceCode,
  MMSDKQuickStartSourceCode,
  MMSDKQuickStartHostedLinks,
} from '../../../utils/IBmaps'
import {
  PRODUCTS,
  LANGS_EMBEDDED_WALLETS,
  LANGS_METAMASK_SDK,
  LANGS_DELEGATION_TOOLKIT,
  EMBEDDED_WALLETS,
  DELEGATION_TOOLKIT,
} from './choices'

import highlight from './highlight'
import EWAndroid from './embedded-wallets/android'
import EWFlutter from './embedded-wallets/flutter'
import EWIos from './embedded-wallets/ios'
import EWReactNative from './embedded-wallets/react_native'
import EWAngular from './embedded-wallets/angular'
import EWNextjs from './embedded-wallets/nextjs'
import EWReact from './embedded-wallets/react'
import EWVue from './embedded-wallets/vue'
import MMReact from './metamask-sdk/react'
import MMNextjs from './metamask-sdk/nextjs'
import DTKReact from './delegation-toolkit/react'
import DTKNextjs from './delegation-toolkit/nextjs'

const frameworks = {
  EW_ANGULAR: EWAngular,
  EW_NEXTJS: EWNextjs,
  EW_REACT: EWReact,
  EW_VUE: EWVue,
  EW_ANDROID: EWAndroid,
  EW_IOS: EWIos,
  EW_REACT_NATIVE: EWReactNative,
  EW_FLUTTER: EWFlutter,
  MMSDK_REACT: MMReact,
  MMSDK_NEXTJS: MMNextjs,
  DTK_REACT: DTKReact,
  DTK_NEXTJS: DTKNextjs,
}

// Helper function to map framework choice to framework key based on product
const getFrameworkKey = (product: string, framework: string): string => {
  if (product === EMBEDDED_WALLETS) {
    return `EW_${framework}`
  } else if (product === DELEGATION_TOOLKIT) {
    return `DTK_${framework}`
  } else {
    return `MMSDK_${framework}`
  }
}

const builder: IntegrationBuilder = {
  // Name of the integration builder
  displayName: 'Web3Auth',
  // Options that will be displayed in the UI for selection
  options: {
    product: {
      displayName: 'Product',
      default: PRODUCTS[0].key,
      type: 'product_selection',
      choices: PRODUCTS,
    },
    framework: {
      displayName: 'Platform/ Framework',
      default: LANGS_METAMASK_SDK[0].key,
      type: 'dropdown',
      choices: LANGS_METAMASK_SDK,
    },
  },

  // Build integrations based on input values
  build(values: Record<string, string>, files: Record<string, string>, stepIndex: number) {
    const finalValues = values

    const filenames: string[] = []
    const newFiles = JSON.parse(JSON.stringify(files))
    const steps: IntegrationStep[] = []

    let frameworkChoices, frameworkDefault

    if (finalValues.product === EMBEDDED_WALLETS) {
      frameworkChoices = LANGS_EMBEDDED_WALLETS
      frameworkDefault = LANGS_EMBEDDED_WALLETS[0].key
    } else if (finalValues.product === DELEGATION_TOOLKIT) {
      frameworkChoices = LANGS_DELEGATION_TOOLKIT
      frameworkDefault = LANGS_DELEGATION_TOOLKIT[0].key
    } else {
      frameworkChoices = LANGS_METAMASK_SDK
      frameworkDefault = LANGS_METAMASK_SDK[0].key
    }

    if (!frameworkChoices.map(item => item.key).includes(finalValues.framework)) {
      finalValues.framework = frameworkDefault
    }

    this.options = {
      product: {
        displayName: 'Product',
        default: PRODUCTS[0].key,
        type: 'product_selection',
        choices: PRODUCTS,
      },
      framework: {
        displayName: 'Platform/ Framework',
        default: frameworkDefault,
        type: 'dropdown',
        choices: frameworkChoices,
      },
    }

    let sourceCodeLink, embedLink

    if (finalValues.product === EMBEDDED_WALLETS) {
      sourceCodeLink = EWQuickStartSourceCode[finalValues.framework]
      embedLink = EWQuickStartHostedLinks[finalValues.framework]
    } else if (finalValues.product === DELEGATION_TOOLKIT) {
      sourceCodeLink = DTKQuickStartSourceCode[finalValues.framework]
      embedLink = DTKQuickStartHostedLinks[finalValues.framework]
    } else {
      sourceCodeLink = MMSDKQuickStartSourceCode[finalValues.framework]
      embedLink = MMSDKQuickStartHostedLinks[finalValues.framework]
    }

    // Get the correct framework key by mapping the choice to the framework object key
    const frameworkKey = getFrameworkKey(finalValues.product, finalValues.framework)

    // Check if the framework exists before calling build
    if (!frameworks[frameworkKey]) {
      throw new Error(`Framework not found: ${frameworkKey}`)
    }

    frameworks[frameworkKey].build({ ...finalValues, filenames, files: newFiles, steps })

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
      embedLink,
      sourceCodeLink,
    }
  },
}

export default builder
