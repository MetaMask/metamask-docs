import clsx from 'clsx'
import React from 'react'
import Tree from '@theme-original/TOCItems/Tree'

import styles from './styles.module.scss'

export default function TreeWrapper(props) {
  return (
    <>
      <span className={clsx(styles['subtitle'], 'type-label-eyebrow')}>On this page</span>
      <Tree {...props} />
    </>
  )
}
