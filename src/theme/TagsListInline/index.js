import React from 'react'
import TagsListInline from '@theme-original/TagsListInline'
import styles from './styles.module.scss'

export default function TagsListInlineWrapper(props) {
  return (
    <div className={styles.tags}>
      <TagsListInline {...props} />
    </div>
  )
}
