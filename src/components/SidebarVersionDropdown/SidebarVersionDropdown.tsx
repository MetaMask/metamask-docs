import React, { useState, useRef, useEffect } from 'react'
import { useHistory, useLocation } from '@docusaurus/router'
import versions from '@site/gator_versions.json'
import clsx from 'clsx'
import styles from './SidebarVersionDropdown.module.css'

// Supported versions for the @metamask/delegation-toolkit.
const delegationToolkitVersions = ['0.13.0', '0.12.0']

export default function SidebarVersionDropdown({ path = 'smart-accounts-kit' }: { path?: string }) {
  const history = useHistory()
  const location = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [hoveredVersion, setHoveredVersion] = useState<string | null>(null) // State to track hovered item

  const latestVersion = versions[0]
  const allVersions = ['current', latestVersion, ...versions.filter(v => v !== latestVersion)]

  const getVersionLabel = (version: string) => {
    if (version === 'current') return 'development'
    if (version === latestVersion) return `latest (${version})`
    if (delegationToolkitVersions.includes(version)) {
      return `Delegation Toolkit (${version})`
    }
    return version
  }

  const getActiveVersion = () => {
    const segments = location.pathname.split('/')
    const versionSegment = segments[2]

    if (versionSegment === 'development') return 'current'
    if (!versionSegment || versionSegment === '' || versionSegment === latestVersion)
      return latestVersion
    if (versions.includes(versionSegment)) return versionSegment
    return latestVersion
  }

  const currentVersion = getActiveVersion()

  const handleSelect = (version: string) => {
    let versionPath = ''
    if (version === 'current') {
      versionPath = `/${path}/development/`
    } else if (version === latestVersion) {
      versionPath = `/${path}`
    } else {
      versionPath = `/${path}/${version}/`
    }

    history.push(versionPath)
    setOpen(false)
  }

  const toggleDropdown = () => setOpen(prev => !prev)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <div
        className={clsx('menu__link', styles.versionItem)}
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && toggleDropdown()}>
        <span className={styles.label}>Version: {getVersionLabel(currentVersion)}</span>
        <span className={clsx(styles.chevron)} aria-hidden>
          ▾
        </span>{' '}
        {/* Custom class applied here */}
      </div>
      {open && (
        <ul className={styles.menu} role="menu">
          {allVersions.map(version => (
            <li
              key={version}
              className={clsx(styles.menuItem, {
                [styles.selected]: version === currentVersion, // Apply selected class for current version
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
  )
}
