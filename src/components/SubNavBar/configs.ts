import type { SubNavBarConfig } from './index'

export const EMBEDDED_WALLETS_SUBNAV_CONFIG: SubNavBarConfig = {
  pathPattern: '/embedded-wallets',
  sectionName: 'Embedded Wallets',
  links: [
    {
      key: 'overview',
      label: 'Overview',
      path: '/embedded-wallets',
    },
    {
      key: 'sdk',
      label: 'SDKs',
      path: '/embedded-wallets/sdk/',
    },
    {
      key: 'authentication',
      label: 'Authentication',
      path: '/embedded-wallets/authentication/',
    },
    {
      key: 'connect-blockchain',
      label: 'EVM',
      path: '/embedded-wallets/connect-blockchain/evm/',
    },
    {
      key: 'connect-blockchain',
      label: 'Solana',
      path: '/embedded-wallets/connect-blockchain/solana/',
    },
    {
      key: 'connect-blockchain',
      label: 'Other Blockchains',
      path: '/embedded-wallets/connect-blockchain/other/',
    },
    {
      key: 'dashboard',
      label: 'Dashboard ↗',
      path: 'https://dashboard.web3auth.io/',
    },
    {
      key: 'demo',
      label: 'Demo ↗',
      path: 'https://demo.web3auth.io/',
    },
  ],
}

export const SDK_SUBNAV_CONFIG: SubNavBarConfig = {
  pathPattern: '/sdk',
  sectionName: 'MM Connect',
  links: [
    {
      key: 'overview',
      label: 'Overview',
      path: '/sdk',
    },
    {
      key: 'multichain',
      label: 'Multichain',
      path: '/sdk/multichain',
    },
    {
      key: 'evm',
      label: 'EVM',
      path: '/sdk/evm',
    },
    {
      key: 'solana',
      label: 'Solana',
      path: '/sdk/solana',
    },
  ],
}

// Array of all sub nav configs for easy iteration
export const ALL_SUBNAV_CONFIGS = [
  EMBEDDED_WALLETS_SUBNAV_CONFIG,
  SDK_SUBNAV_CONFIG,
]

// Helper function to get config for current path
export function getSubNavConfigForPath(pathname: string): SubNavBarConfig | null {
  // Find all matching configs
  const matchingConfigs = ALL_SUBNAV_CONFIGS.filter(config => {
    const patterns = Array.isArray(config.pathPattern) ? config.pathPattern : [config.pathPattern]
    return patterns.some(pattern => pathname.startsWith(pattern))
  })

  // If no matches, return null
  if (matchingConfigs.length === 0) {
    return null
  }

  // If only one match, return it
  if (matchingConfigs.length === 1) {
    return matchingConfigs[0]
  }

  // If multiple matches, return the most specific one (longest pattern)
  return matchingConfigs.reduce((mostSpecific, current) => {
    const currentPattern = Array.isArray(current.pathPattern)
      ? current.pathPattern[0]
      : current.pathPattern
    const mostSpecificPattern = Array.isArray(mostSpecific.pathPattern)
      ? mostSpecific.pathPattern[0]
      : mostSpecific.pathPattern

    return currentPattern.length > mostSpecificPattern.length ? current : mostSpecific
  })
}
