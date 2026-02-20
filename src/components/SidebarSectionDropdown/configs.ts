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

export const SNAPS_CONFIG: SidebarStaticTitleProps = {
  title: 'Snaps',
  pathPattern: '/snaps',
}

export const SMART_ACCOUNTS_KIT_CONFIG: SidebarStaticTitleProps = {
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
