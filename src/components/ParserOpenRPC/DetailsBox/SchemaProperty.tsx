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
    <div className="padding-vert--md">
      <div className={styles.schemaHeader} style={{ justifyContent: 'space-between' }}>
        <div className={styles.schemaHeader}>
          <Heading as="h5" className={'type-heading-xxs'}>
            {title}
          </Heading>
          <span className={styles.textAltColor}>{type}</span>
        </div>
        {required && <span className={styles.textErrorColor}>required</span>}
      </div>
      <p className="margin--none">
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
