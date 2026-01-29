import React, { useState } from 'react'
import styles from './styles.module.css'

interface ExpandableProps {
  title: string
  children: React.ReactNode
}

const Expandable: React.FC<ExpandableProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={styles.expandable}>
      <button
        className={styles.expandableHeader}
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        <span className={styles.expandableTitle}>{title}</span>
        <span className={`${styles.expandableIcon} ${isExpanded ? styles.expanded : ''}`}>
          ▼
        </span>
      </button>
      {isExpanded && (
        <div className={styles.expandableContent}>
          {children}
        </div>
      )}
    </div>
  )
}

export default Expandable
