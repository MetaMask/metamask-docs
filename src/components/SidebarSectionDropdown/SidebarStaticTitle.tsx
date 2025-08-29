import React from 'react'
import styles from './SidebarSectionDropdown.module.css'

interface SidebarStaticTitleProps {
  title: string
}

export default function SidebarStaticTitle({ title }: SidebarStaticTitleProps) {
  return (
    <div className={styles.dropdown}>
      <div className={`menu__link ${styles.sectionItem} ${styles.staticTitle}`}>
        <div className={styles.labelContainer}>
          <div className={styles.title}>{title}</div>
        </div>
      </div>
    </div>
  )
}
