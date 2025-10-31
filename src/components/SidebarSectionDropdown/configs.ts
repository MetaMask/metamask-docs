import type { SidebarSectionDropdownProps, SidebarStaticTitleProps } from './SidebarSectionDropdown'

export const SERVICES_DASHBOARD_CONFIG: SidebarSectionDropdownProps = {
  sections: [
    {
      key: 'services',
      label: 'Services',
      title: 'Services',
      description: 'Use high performance APIs provided by Infura',
      path: '/services/',
      pathPattern: '/services',
    },
    {
      key: 'dashboard',
      label: 'Dashboard',
      title: 'Developer dashboard',
      description: 'Manage keys, monitor usage, and access account info',
      path: '/developer-tools/dashboard/',
      pathPattern: '/developer-tools/dashboard',
    },
  ],
  dropdownLabel: 'Section:',
  defaultSection: 'services',
}

export const SDK_WALLET_CONFIG: SidebarSectionDropdownProps = {
  sections: [
    {
      key: 'sdk',
      label: 'SDK',
      title: 'MetaMask SDK',
      description: 'Connect to MetaMask extension and mobile',
      path: '/sdk/',
      pathPattern: '/sdk',
    },
    {
      key: 'wallet',
      label: 'Wallet API',
      title: 'Wallet API',
      description: 'Connect to MetaMask extension only',
      path: '/wallet/',
      pathPattern: '/wallet',
    },
  ],
  dropdownLabel: 'Product:',
  defaultSection: 'sdk',
}

export const SNAPS_CONFIG: SidebarStaticTitleProps = {
  title: 'Snaps',
  pathPattern: '/snaps',
}

export const DELEGATION_TOOLKIT_CONFIG: SidebarStaticTitleProps = {
  title: 'Smart Accounts Kit',
  pathPattern: '/smart-accounts-kit',
}

export function isPathInSections(
  pathname: string,
  sections: SidebarSectionDropdownProps['sections']
): boolean {
  return sections.some(section => {
    const patterns = Array.isArray(section.pathPattern)
      ? section.pathPattern
      : [section.pathPattern]
    return patterns.some(pattern => pathname.startsWith(pattern))
  })
}
