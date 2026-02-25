import { Fragment, FunctionComponent } from 'react'
import { UnionMethodParameter } from '../types'
import styles from '../styles.module.scss'
import { Parameter } from '../index'
import { Header } from '../Header'
import { Description } from '../Description'
import classNames from 'classnames'

export type UnionParameterProps = {
  parameter: UnionMethodParameter
}

export const UnionParameter: FunctionComponent<UnionParameterProps> = ({ parameter }) => {
  const { description, options } = parameter

  return (
    <div className={styles.parameter}>
      <div className={styles['parameter-main']}>
        <Header parameter={parameter} type="union" />
        {description && <Description>{description}</Description>}
      </div>

      <h3 className="margin-vert--lg type-paragraph-s">Options</h3>
      <div className={styles['parameter-children']}>
        {Object.entries(options).map(([key, property], index, array) => (
          <Fragment key={`${key}-${property.name}`}>
            <div className={styles['parameter-child']}>
              <Parameter parameter={property} />
            </div>
            {index < array.length - 1 && (
              <p className={classNames('type-paragraph-s', styles['parameter-separator'])}>or</p>
            )}
          </Fragment>
        ))}
      </div>

      {parameter.commonProperties?.length > 0 && (
        <>
          <h3 className="margin-vert--lg type-paragraph-s">Common properties</h3>
          <div className={styles['parameter-children']}>
            {Object.entries(parameter.commonProperties).map(([key, property]) => (
              <div key={`${key}-${property.name}`} className={styles['parameter-child']}>
                <Parameter parameter={property} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
