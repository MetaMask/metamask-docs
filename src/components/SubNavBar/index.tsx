import React from 'react'
import { useLocation } from '@docusaurus/router'
import Link from '@docusaurus/Link'
import clsx from 'clsx'
import styles from './SubNavBar.module.css'

export interface SubNavLink {
  key: string
  label: string
  path: string
  external?: boolean
}

export interface SubNavBarConfig {
  pathPattern: string | string[]
  sectionName: string
  links: SubNavLink[]
}

interface SubNavBarProps {
  config: SubNavBarConfig
}

export default function SubNavBar({ config }: SubNavBarProps) {
  const location = useLocation()
  const { pathPattern, sectionName, links } = config

  // Check if current path matches the pattern
  const isPatternMatch = (patterns: string | string[], pathname: string): boolean => {
    const patternArray = Array.isArray(patterns) ? patterns : [patterns]
    return patternArray.some(pattern => pathname.startsWith(pattern))
  }

  // Don't render if current path doesn't match pattern
  if (!isPatternMatch(pathPattern, location.pathname)) {
    return null
  }

  // Check if a link is currently active - finds the most specific match
  const isActiveLink = (linkPath: string): boolean => {
    // Exact match for the path
    if (location.pathname === linkPath) {
      return true
    }

    // Check if current path starts with this link path
    if (linkPath !== '/' && location.pathname.startsWith(linkPath)) {
      // Find all matching links (that current path starts with)
      const matchingLinks = links.filter(link =>
        link.path !== '/' && location.pathname.startsWith(link.path)
      )

      // Return true only if this is the longest/most specific match
      const longestMatch = matchingLinks.reduce((longest, current) =>
        current.path.length > longest.path.length ? current : longest
      )

      return longestMatch.path === linkPath
    }

    return false
  }

  return (
    <nav className={styles.subNavBar}>
      <div className={styles.container}>
        <h2 className={styles.sectionHeading}>{sectionName}</h2>
        <div className={styles.navContent}>
          <ul className={styles.linksList}>
            {links.map((link) => (
              <li key={link.key} className={styles.linkItem}>
                {link.external ? (
                  <a
                    href={link.path}
                    className={clsx(styles.link, styles.externalLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                    <span className={styles.externalIcon}>↗</span>
                  </a>
                ) : (
                  <Link
                    to={link.path}
                    className={clsx(styles.link, {
                      [styles.activeLink]: isActiveLink(link.path)
                    })}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
