import React from 'react';
import clsx from 'clsx';
import {
  NavbarSecondaryMenuFiller,
  type NavbarSecondaryMenuComponent,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { useLocation } from '@docusaurus/router';
import DocSidebarItems from '@theme/DocSidebarItems';
import SidebarVersionDropdown from '@site/src/components/SidebarVersionDropdown/SidebarVersionDropdown';
import SidebarSectionDropdown from '@site/src/components/SidebarSectionDropdown/SidebarSectionDropdown';
import { SERVICES_DASHBOARD_CONFIG, SDK_WALLET_CONFIG, isPathInSections } from '@site/src/components/SidebarSectionDropdown/configs';
import type { Props } from '@theme/DocSidebar/Mobile';
import styles from './styles.module.css';

// eslint-disable-next-line react/function-component-definition
const DocSidebarMobileSecondaryMenu: NavbarSecondaryMenuComponent<Props> = ({
  sidebar,
  path,
}) => {
  const mobileSidebar = useNavbarMobileSidebar();
  const location = useLocation();
  const isGatorDocs = location.pathname.startsWith('/delegation-toolkit');
  const isServicesOrDashboard = isPathInSections(location.pathname, SERVICES_DASHBOARD_CONFIG.sections);
  const isSDKOrWallet = isPathInSections(location.pathname, SDK_WALLET_CONFIG.sections);

  return (
    <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
      {isGatorDocs && (
        <li className={styles.versionDropdownContainer}>
          <SidebarVersionDropdown path="delegation-toolkit" />
        </li>
      )}
      {isServicesOrDashboard && (
        <li className={styles.versionDropdownContainer}>
          <SidebarSectionDropdown {...SERVICES_DASHBOARD_CONFIG} />
        </li>
      )}
      {isSDKOrWallet && (
        <li className={styles.versionDropdownContainer}>
          <SidebarSectionDropdown {...SDK_WALLET_CONFIG} />
        </li>
      )}
      <DocSidebarItems
        items={sidebar}
        activePath={path}
        onItemClick={(item) => {
          if ((item.type === 'category' && item.href) || item.type === 'link') {
            mobileSidebar.toggle();
          }
        }}
        level={1}
      />
    </ul>
  );
};

function DocSidebarMobile(props: Props) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

export default React.memo(DocSidebarMobile);
