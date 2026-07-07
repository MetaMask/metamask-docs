import type { SidebarSectionDropdownProps, SidebarStaticTitleProps } from './SidebarSectionDropdown'

export const SNAPS_CONFIG: SidebarStaticTitleProps = {
  title: 'Snaps',
  pathPattern: '/snaps',
}

export const SMART_ACCOUNTS_KIT_CONFIG: SidebarStaticTitleProps = {
  title: 'Smart Accounts Kit',
  pathPattern: '/smart-accounts-kit',
}

export const AGENT_WALLET_CONFIG: SidebarStaticTitleProps = {
  title: 'Agent Wallet',
  pathPattern: '/agent-wallet',
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
