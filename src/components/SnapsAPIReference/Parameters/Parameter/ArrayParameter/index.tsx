import { FunctionComponent } from 'react'
import { ArrayMethodParameter } from '../types'
import styles from '../styles.module.scss'
import { Parameter } from '../index'
import { Header } from '../Header'
import { Description } from '../Description'

export type ArrayParameterProps = {
  parameter: ArrayMethodParameter
  nested?: boolean
}

export const ArrayParameter: FunctionComponent<ArrayParameterProps> = ({ parameter, nested }) => {
  const { description, element } = parameter

  return (
    <div className={nested ? styles['parameter-child-item'] : styles.parameter}>
      <div className={styles['parameter-main']}>
        <Header parameter={parameter} type="array" />
        {description && <Description>{description}</Description>}
      </div>

      <div className={styles['parameter-children']}>
        <Parameter parameter={element} nested={false} />
      </div>
    </div>
  )
}
