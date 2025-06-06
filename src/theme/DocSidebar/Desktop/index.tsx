import React from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useLocation } from '@docusaurus/router';
import Logo from '@theme/Logo';
import CollapseButton from '@theme-original/DocSidebar/Desktop/CollapseButton';
import Content from '@theme-original/DocSidebar/Desktop/Content';
import SidebarVersionDropdown from '@site/src/components/SidebarVersionDropdown/SidebarVersionDropdown';
import type { PropSidebar } from '@docusaurus/plugin-content-docs';
import styles from './styles.module.css';

type Props = {
  path: string;
  sidebar: PropSidebar;
  onCollapse: () => void;
  isHidden: boolean;
};

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: Props) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  const location = useLocation();
  const isGatorDocs = location.pathname.startsWith('/delegation-toolkit');

  let versionDropdown = null;
  try {
    if (isGatorDocs) {
      versionDropdown = (
        <div className={styles.versionDropdownContainer}>
          <SidebarVersionDropdown pluginId="gator" />
        </div>
      );
    }
  } catch (e) {
    console.error('Failed to render version dropdown:', e);
  }

  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden
      )}
    >
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      {versionDropdown}
      <Content path={path} sidebar={sidebar} />
      {hideable && <CollapseButton onClick={onCollapse} />}
    </div>
  );
}

export default DocSidebarDesktop;
