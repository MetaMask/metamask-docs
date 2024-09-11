import clsx from 'clsx'
import { CSSProperties } from 'react'
import { MDContent } from './MDContent'
import Heading from '@theme/Heading'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'
import styles from './styles.module.scss'

interface SchemaPropertyProps {
  title: string
  type?: string
  required?: boolean
  description?: string
}

interface TagProps {
  name: string
}

export const SchemaProperty = ({ title, type, required, description }: SchemaPropertyProps) => {
  return (
    <div className={styles.schemaWrapper}>
      <div className={styles.schemaHeader} style={{ justifyContent: 'space-between' }}>
        <div className={styles.schemaHeader}>
          <Heading as="h5" className={'type-paragraph-m font-primary font-weight-medium'}>
            {title}
          </Heading>
          <span className={clsx(styles.textAltColor, 'type-paragraph-m')}>{type}</span>
        </div>
        {required && (
          <span className={clsx(styles.textErrorColor, 'type-paragraph-m')}>required</span>
        )}
      </div>
      <p className={clsx(styles.description, 'margin--none type-paragraph-m')}>
        <MDContent content={description} />
      </p>
    </div>
  )
}

export const Tag = ({ name }: TagProps) => {
  const bgStyle = {
    MetaMask: 'var(--consumer-green)',
    Restricted: 'var(--consumer-orange)',
    Deprecated: 'var(--consumer-purple)',
  }
  return (
    <div className={styles['tag-holder']}>
      <CutOffCorners size={'xxs'}>
        <span
          className={clsx(styles['tag'], 'type-label-caption uppercase font-weight-medium')}
          style={
            {
              '--color-palette': bgStyle[name] ? bgStyle[name] : 'var(--consumer-blue)',
            } as CSSProperties
          }>
          {name}
        </span>
      </CutOffCorners>
    </div>
  )
}
