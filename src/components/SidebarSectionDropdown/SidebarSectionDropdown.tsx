import React, { useState, useRef, useEffect } from 'react'
import { useHistory, useLocation } from '@docusaurus/router'
import clsx from 'clsx'
import styles from './SidebarSectionDropdown.module.css'

export { default as SidebarStaticTitle } from './SidebarStaticTitle'

interface SectionOption {
  key: string
  label: string
  title?: string
  description?: string
  path: string
  pathPattern: string | string[]
}

export interface SidebarSectionDropdownProps {
  sections: SectionOption[]
  defaultSection?: string
  dropdownLabel?: string
}

export interface SidebarStaticTitleProps {
  title: string
  pathPattern: string | string[]
}

export default function SidebarSectionDropdown({
  sections,
  defaultSection,
  dropdownLabel = 'Section:',
}: SidebarSectionDropdownProps) {
  const history = useHistory()
  const location = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  const getCurrentSection = (): string => {
    const pathname = location.pathname

    // Check each section's path pattern
    for (const section of sections) {
      const patterns = Array.isArray(section.pathPattern)
        ? section.pathPattern
        : [section.pathPattern]

      for (const pattern of patterns) {
        if (pathname.startsWith(pattern)) {
          return section.key
        }
      }
    }

    // Return default section or first section if no match
    return defaultSection || sections[0]?.key || ''
  }

  const currentSection = getCurrentSection()
  const currentSectionData = sections.find(section => section.key === currentSection) || sections[0]
  const currentSectionLabel = currentSectionData?.label || ''
  const currentSectionTitle = currentSectionData?.title
  const currentSectionDescription = currentSectionData?.description

  const handleSelect = (sectionKey: string) => {
    const selectedSection = sections.find(section => section.key === sectionKey)
    if (selectedSection) {
      history.push(selectedSection.path)
      setOpen(false)
    }
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
        className={clsx('menu__link', styles.sectionItem)}
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && toggleDropdown()}>
        <div className={styles.labelContainer}>
          {currentSectionTitle ? (
            <>
              <div className={styles.title}>{currentSectionTitle}</div>
              {currentSectionDescription && (
                <div className={styles.description}>{currentSectionDescription}</div>
              )}
            </>
          ) : (
            <span className={styles.label}>
              {dropdownLabel} {currentSectionLabel}
            </span>
          )}
        </div>
        <span className={clsx(styles.chevron)} aria-hidden>
          ▾
        </span>
      </div>
      {open && (
        <ul className={styles.menu} role="menu">
          {sections.map(section => (
            <li
              key={section.key}
              className={clsx(styles.menuItem, {
                [styles.selected]: section.key === currentSection,
                [styles.hovered]: hoveredSection === section.key,
              })}
              onClick={() => handleSelect(section.key)}
              role="menuitem"
              onMouseEnter={() => setHoveredSection(section.key)}
              onMouseLeave={() => setHoveredSection(null)}>
              <div className={styles.menuItemContent}>
                <div className={styles.menuItemTitle}>
                  {section.title || section.label}
                </div>
                {section.description && (
                  <div className={styles.menuItemDescription}>
                    {section.description}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
