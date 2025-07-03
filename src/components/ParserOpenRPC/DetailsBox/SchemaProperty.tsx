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
  pattern?: string
  defaultVal?: string
  showRequired?: boolean
}

interface TagProps {
  name: string
}

export const SchemaProperty = ({
  title,
  type,
  required,
  description,
  pattern,
  defaultVal,
  showRequired = true,
}: SchemaPropertyProps) => {
  return (
    <div className={styles.schemaWrapper}>
      <div className={styles.schemaHeader} style={{ justifyContent: 'space-between' }}>
        <div className={styles.schemaHeader}>
          <Heading as="h5" className={'type-paragraph-m font-primary font-weight-medium'}>
            {title}
          </Heading>
          <span className={clsx(styles.textAltColor, 'type-paragraph-m')}>{type}</span>
        </div>
        {required && showRequired && (
          <span className={clsx(styles.textErrorColor, 'type-paragraph-m')}>required</span>
        )}
      </div>
      <p className={clsx(styles.description, 'margin--none type-paragraph-m')}>
        <MDContent content={description} />
        {pattern && (
          <div className={styles.propItemWrapper}>
            <span className={styles.propItemLabel}>Pattern: </span>
            <span className={styles.propItemValue}>{pattern}</span>
          </div>
        )}
        {defaultVal && (
          <div className={styles.propItemWrapper}>
            <span className={styles.propItemLabel}>Default: </span>
            <span className={styles.propItemValue}>{defaultVal}</span>
          </div>
        )}
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
      <CutOffCorners size={'xs'}>
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
