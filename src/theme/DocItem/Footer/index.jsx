import React from 'react'
import clsx from 'clsx'
import { ThemeClassNames } from '@docusaurus/theme-common'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import LastUpdated from '@theme/LastUpdated'
import EditThisPage from '@theme/EditThisPage'
import FeedbackWidget from '@site/src/components/FeedbackWidget'
import styles from './styles.module.css'

export default function DocItemFooter({ feedbackKey }) {
  const { metadata } = useDoc()
  const { editUrl, lastUpdatedAt, formattedLastUpdatedAt, lastUpdatedBy } = metadata

  return (
    <footer className={clsx(ThemeClassNames.docs.docFooter, styles.footer)}>
      <div className={styles.topRow}>
        <div className={styles.feedbackCol}>
          <FeedbackWidget key={feedbackKey} />
        </div>
        <div className={styles.editCol}>{editUrl && <EditThisPage editUrl={editUrl} />}</div>
      </div>
      {(lastUpdatedAt || formattedLastUpdatedAt) && (
        <div className={clsx('type-paragraph-m', styles.lastUpdated)}>
          <LastUpdated
            lastUpdatedAt={lastUpdatedAt}
            formattedLastUpdatedAt={formattedLastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        </div>
      )}
    </footer>
  )
}
