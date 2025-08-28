import type { SubNavBarConfig } from './index'

export const EMBEDDED_WALLETS_SUBNAV_CONFIG: SubNavBarConfig = {
  pathPattern: '/embedded-wallets',
  sectionName: 'Embedded Wallets',
  links: [
    {
      key: 'overview',
      label: 'Overview',
      path: '/embedded-wallets/',
    },
    {
      key: 'js',
      label: 'JavaScript',
      path: '/embedded-wallets/js/',
    },
    {
      key: 'react',
      label: 'React',
      path: '/embedded-wallets/react/',
    },
    {
      key: 'react-native',
      label: 'React Native',
      path: '/embedded-wallets/react-native/',
    },
    {
      key: 'vue',
      label: 'Vue',
      path: '/embedded-wallets/vue/',
    },
    {
      key: 'android',
      label: 'Android',
      path: '/embedded-wallets/android/',
    },
    {
      key: 'ios',
      label: 'iOS',
      path: '/embedded-wallets/ios/',
    },
    {
      key: 'flutter',
      label: 'Flutter',
      path: '/embedded-wallets/flutter/',
    },
    {
      key: 'unity',
      label: 'Unity',
      path: '/embedded-wallets/unity/',
    },
    {
      key: 'unreal',
      label: 'Unreal',
      path: '/embedded-wallets/unreal/',
    },
  ],
}

// Array of all sub nav configs for easy iteration
export const ALL_SUBNAV_CONFIGS = [EMBEDDED_WALLETS_SUBNAV_CONFIG]

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
