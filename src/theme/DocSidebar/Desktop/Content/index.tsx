import React, {type ReactNode} from 'react';
import Content from '@theme-original/DocSidebar/Desktop/Content';
import type ContentType from '@theme/DocSidebar/Desktop/Content';
import type {WrapperProps} from '@docusaurus/types';
import DocsVersionDropdownNavbarItem from '@theme/NavbarItem/DocsVersionDropdownNavbarItem';
import styles from './styles.module.css';

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): ReactNode {
  return (
    <div className={styles.sidebarWithVersionDropdown}>
      <div className={styles.versionDropdownContainer}>
        <DocsVersionDropdownNavbarItem
          docsPluginId="gator" // Use your plugin ID if different
          dropdownActiveClassDisabled={false}
          dropdownItemsBefore={[]}
          dropdownItemsAfter={[]}
        />
      </div>
      <Content {...props} />
    </div>
  );
}
