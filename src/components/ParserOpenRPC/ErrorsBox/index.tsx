import React from 'react'
import { useColorMode } from '@docusaurus/theme-common'
import clsx from 'clsx'
import Heading from '@theme/Heading'
import { MDContent } from '@site/src/components/ParserOpenRPC/DetailsBox/MDContent'

import styles from './styles.module.scss'

interface ErrorItem {
  code: number
  message: string
}

interface ErrorsBoxProps {
  errors: ErrorItem[]
}

export default function ErrorsBox({ errors }: ErrorsBoxProps) {
  const { colorMode } = useColorMode()
  if (errors.length === 0) return null

  return (
    <div className="markdown padding-bottom--xl">
      <Heading
        as="h2"
        className={clsx(styles.heading2, styles.borderBottomLine, 'padding-vert--md')}>
        Errors
      </Heading>
      <div className={styles.errWrapper}>
        <div
          className={clsx(
            styles.errRowHeading,
            colorMode === 'light' ? styles.errRowHeadingLightView : styles.errRowHeadingDarkView,
            'type-paragraph-m font-primary font-weight-medium'
          )}>
          <div className={styles.errColCode}>Code</div>
          <div className={styles.errColMsg}>Message</div>
        </div>
        {errors.map((err, i) => (
          <div key={`${err.code}-${i}`} className={styles.errRow}>
            <div className={clsx(styles.errColCode, 'type-paragraph-m')}>{err.code}</div>
            <div className={clsx(styles.errColMsg, 'type-paragraph-m')}>
              <MDContent content={err.message} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
