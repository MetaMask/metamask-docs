import type { SidebarSectionDropdownProps } from './SidebarSectionDropdown'

export const SERVICES_DASHBOARD_CONFIG: SidebarSectionDropdownProps = {
  sections: [
    {
      key: 'services',
      label: 'Services',
      path: '/services/',
      pathPattern: '/services',
    },
    {
      key: 'dashboard',
      label: 'Dashboard',
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
      path: '/sdk/',
      pathPattern: '/sdk',
    },
    {
      key: 'wallet',
      label: 'Wallet API',
      path: '/wallet/',
      pathPattern: '/wallet',
    },
  ],
  dropdownLabel: 'Product:',
  defaultSection: 'sdk',
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
