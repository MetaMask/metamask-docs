import { FunctionComponent } from 'react'
import { PrimitiveMethodParameter } from '../types'
import { Header } from '../Header'
import { Description } from '../Description'
import styles from '@site/src/components/SnapsAPIReference/Parameters/Parameter/styles.module.scss'

export type PrimitiveParameterProps = {
  parameter: PrimitiveMethodParameter
  nested?: boolean
}

export const PrimitiveParameter: FunctionComponent<PrimitiveParameterProps> = ({
  parameter,
  nested,
}) => {
  const { description } = parameter

  return (
    <div className={nested ? styles['parameter-child-item'] : styles.parameter}>
      <div className={styles['parameter-main']}>
        <Header parameter={parameter} />
        {description && <Description>{description}</Description>}
      </div>
    </div>
  )
}
