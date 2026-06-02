import { FunctionComponent } from 'react'
import { PrimitiveMethodParameter } from '../types'
import { Header } from '../Header'
import { Description } from '../Description'
import styles from '../styles.module.scss'

export type PrimitiveParameterProps = {
  parameter: PrimitiveMethodParameter
}

export const PrimitiveParameter: FunctionComponent<PrimitiveParameterProps> = ({ parameter }) => {
  const { description } = parameter

  return (
    <div className={styles.parameter}>
      <div className={styles['parameter-main']}>
        <Header parameter={parameter} />
        {description && <Description>{description}</Description>}
      </div>
    </div>
  )
}
