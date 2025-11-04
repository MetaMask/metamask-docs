import React from 'react'
import clsx from 'clsx'
import { useThemeConfig } from '@docusaurus/theme-common'
import { useLocation } from '@docusaurus/router'
import Logo from '@theme/Logo'
import CollapseButton from '@theme-original/DocSidebar/Desktop/CollapseButton'
import Content from '@theme-original/DocSidebar/Desktop/Content'
import SidebarVersionDropdown from '@site/src/components/SidebarVersionDropdown/SidebarVersionDropdown'
import SidebarSectionDropdown, {
  SidebarStaticTitle,
} from '@site/src/components/SidebarSectionDropdown/SidebarSectionDropdown'
import {
  SERVICES_DASHBOARD_CONFIG,
  SNAPS_CONFIG,
  DELEGATION_TOOLKIT_CONFIG,
  isPathInSections,
} from '@site/src/components/SidebarSectionDropdown/configs'
import type { PropSidebar } from '@docusaurus/plugin-content-docs'
import styles from './styles.module.css'

type Props = {
  path: string
  sidebar: PropSidebar
  onCollapse: () => void
  isHidden: boolean
}

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: Props) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig()

  const location = useLocation()
  const isSmartAccountsKitDocs = location.pathname.startsWith('/delegation-toolkit')
  const isServicesOrDashboard = isPathInSections(
    location.pathname,
    SERVICES_DASHBOARD_CONFIG.sections
  )
  const isSnaps = location.pathname.startsWith('/snaps')

  let smartAccountsKitTitle = null
  let versionDropdown = null
  try {
    if (isSmartAccountsKitDocs) {
      smartAccountsKitTitle = (
        <div className={styles.versionDropdownContainer}>
          <SidebarStaticTitle title={DELEGATION_TOOLKIT_CONFIG.title} />
        </div>
      )
      versionDropdown = (
        <div className={styles.versionDropdownContainer}>
          <SidebarVersionDropdown path="delegation-toolkit" />
        </div>
      )
    }
  } catch (e) {
    console.error('Failed to render smart accounts kit components:', e)
  }

  let servicesDropdown = null
  try {
    if (isServicesOrDashboard) {
      servicesDropdown = (
        <div className={styles.versionDropdownContainer}>
          <SidebarSectionDropdown {...SERVICES_DASHBOARD_CONFIG} />
        </div>
      )
    }
  } catch (e) {
    console.error('Failed to render services dropdown:', e)
  }

  let snapsTitle = null
  try {
    if (isSnaps) {
      snapsTitle = (
        <div className={styles.versionDropdownContainer}>
          <SidebarStaticTitle title={SNAPS_CONFIG.title} />
        </div>
      )
    }
  } catch (e) {
    console.error('Failed to render Snaps title:', e)
  }

  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden
      )}>
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      {smartAccountsKitTitle}
      {versionDropdown}
      {servicesDropdown}
      {snapsTitle}
      <Content path={path} sidebar={sidebar} />
      {hideable && <CollapseButton onClick={onCollapse} />}
    </div>
  )
}

export default DocSidebarDesktop
