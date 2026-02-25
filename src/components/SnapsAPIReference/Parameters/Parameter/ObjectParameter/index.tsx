import { FunctionComponent } from 'react'
import { ObjectMethodParameter } from '../types'
import styles from '../styles.module.scss'
import { Parameter } from '../index'
import { Header } from '../Header'
import { Description } from '../Description'

export type ObjectParameterProps = {
  parameter: ObjectMethodParameter
}

export const ObjectParameter: FunctionComponent<ObjectParameterProps> = ({ parameter }) => {
  const { description, properties } = parameter

  return (
    <div className={styles.parameter}>
      <div className={styles['parameter-main']}>
        <Header parameter={parameter} type="object" />
        {description && <Description>{description}</Description>}
      </div>

      <div className={styles['parameter-children']}>
        {Object.entries(properties).map(([key, property]) => (
          <Parameter key={`${key}-${property.name}`} parameter={property} />
        ))}
      </div>
    </div>
  )
}
