import React from 'react'
import clsx from 'clsx'
import { ThemeClassNames } from '@docusaurus/theme-common'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import LastUpdated from '@theme/LastUpdated'
import EditThisPage from '@theme/EditThisPage'
import FeedbackWidget from '../../../components/FeedbackWidget'
import styles from './styles.module.css'

export default function DocItemFooter() {
  const { metadata } = useDoc()
  const { editUrl, lastUpdatedAt, formattedLastUpdatedAt, lastUpdatedBy } = metadata

  return (
    <footer className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg docusaurus-mb-lg')}>
      <div className={styles.topRow}>
        <FeedbackWidget key={metadata.permalink} />
        {editUrl && (
          <div className={styles.editLink}>
            <EditThisPage editUrl={editUrl} />
          </div>
        )}
      </div>
      {(lastUpdatedAt || lastUpdatedBy) && (
        <div className={styles.lastUpdatedRow}>
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
