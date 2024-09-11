import React from 'react'
import EditThisPage from '@theme-original/EditThisPage'
import styles from './styles.module.scss'

export default function EditThisPageWrapper(props) {
  return (
    <div className={styles.themeEditThisPage}>
      <EditThisPage {...props} />
    </div>
  )
}
