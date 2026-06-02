import { FunctionComponent } from 'react'
import { ArrayMethodParameter } from '../types'
import styles from '../styles.module.scss'
import { Parameter } from '../index'
import { Header } from '../Header'
import { Description } from '../Description'

export type ArrayParameterProps = {
  parameter: ArrayMethodParameter
}

function getArrayType(parameter: ArrayMethodParameter): string {
  const { element } = parameter

  if (element.kind === 'object') {
    return 'object[]'
  }

  if (element.kind === 'union') {
    return 'union[]'
  }

  return `${element.type}[]`
}

export const ArrayParameter: FunctionComponent<ArrayParameterProps> = ({ parameter }) => {
  const { description, element } = parameter

  return (
    <div className={styles.parameter}>
      <div className={styles['parameter-main']}>
        <Header parameter={parameter} type={getArrayType(parameter)} />
        {description && <Description>{description}</Description>}
      </div>

      {element.kind !== 'primitive' && (
        <div className={styles['parameter-children']}>
          <Parameter parameter={element} />
        </div>
      )}
    </div>
  )
}
