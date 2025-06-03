import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import versions from '@site/gator_versions.json';
import clsx from 'clsx';
import styles from './SidebarVersionDropdown.module.css';

export default function SidebarVersionDropdown({ pluginId = 'gator' }: { pluginId?: string }) {
  const history = useHistory();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [hoveredVersion, setHoveredVersion] = useState<string | null>(null); // State to track hovered item

  const latestVersion = versions[0];
  const allVersions = [latestVersion, 'current', ...versions.filter(v => v !== latestVersion)];

  const getVersionLabel = (version: string) => {
    if (version === 'current') return 'development';
    if (version === latestVersion) return `latest (${version})`;
    return version;
  };

  const getActiveVersion = () => {
    const segments = location.pathname.split('/');
    const versionSegment = segments[2];

    if (versionSegment === 'development') return 'current';
    if (!versionSegment || versionSegment === '' || versionSegment === latestVersion) return latestVersion;
    if (versions.includes(versionSegment)) return versionSegment;
    return latestVersion;
  };

  const currentVersion = getActiveVersion();

  const handleSelect = (version: string) => {
    let versionPath = '';
    if (version === 'current') {
      versionPath = `/${pluginId}/development/`;
    } else if (version === latestVersion) {
      versionPath = `/${pluginId}/`;
    } else {
      versionPath = `/${pluginId}/${version}/`;
    }

    history.push(versionPath);
    setOpen(false);
  };

  const toggleDropdown = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <div
        className={clsx('menu__link', styles.versionItem)}
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && toggleDropdown()}
      >
        <span className={styles.label}>Version: {getVersionLabel(currentVersion)}</span>
        <span className={clsx('menu__caret', styles.chevron)} aria-hidden>▾</span>
      </div>
      {open && (
        <ul className={styles.menu} role="menu">
          {allVersions.map((version) => (
            <li
              key={version}
              className={clsx(styles.menuItem, {
                [styles.hovered]: hoveredVersion === version, // Apply dynamic hover class
              })}
              onClick={() => handleSelect(version)}
              role="menuitem"
              onMouseEnter={() => setHoveredVersion(version)} // Set hovered version
              onMouseLeave={() => setHoveredVersion(null)} // Reset hover on mouse leave
            >
              {getVersionLabel(version)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
