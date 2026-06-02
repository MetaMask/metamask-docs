import { FunctionComponent } from 'react'
import { MethodParameter } from '../types'
import styles from './styles.module.scss'

type HeaderProps = {
  parameter: MethodParameter
  type?: string
}

export const Header: FunctionComponent<HeaderProps> = ({ parameter, type = parameter.type }) => {
  const { name, required } = parameter

  return (
    <div className={styles['parameter-header']}>
      <div className={styles['parameter-name']}>
        {name && <h3 className="type-paragraph-m">{name}</h3>}
        <span className={styles['parameter-type']}>{type}</span>
      </div>
      {required && <span className={styles['parameter-required']}>required</span>}
    </div>
  )
}
