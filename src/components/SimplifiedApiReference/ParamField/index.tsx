import React from 'react'
import Expandable from '../Expandable'
import styles from './styles.module.css'

interface NestedParam {
  name: string
  type: string
  required: boolean
  description: string
  children?: NestedParam[]
}

interface ParamFieldProps {
  name: string
  type: string
  required: boolean
  description: string
  children?: NestedParam[]
  expandableTitle?: string
}

const ParamField: React.FC<ParamFieldProps> = ({
  name,
  type,
  required,
  description,
  children = [],
  expandableTitle
}) => {
  const hasChildren = children.length > 0

  const renderNestedParams = (params: NestedParam[], title?: string) => {
    if (params.length === 0) return null

    return (
      <Expandable title={title || `${name} properties`}>
        {params.map((param, index) => (
          <ParamField
            key={index}
            name={param.name}
            type={param.type}
            required={param.required}
            description={param.description}
            children={param.children}
            expandableTitle={param.children?.length ? `${param.name} properties` : undefined}
          />
        ))}
      </Expandable>
    )
  }

  return (
    <div className={styles.paramField}>
      <div className={styles.paramHeader}>
        <div className={styles.paramName}>
          <code>{name}</code>
          <span className={styles.paramType}>({type})</span>
          {required && <span className={styles.required}>required</span>}
        </div>
      </div>
      <div className={styles.paramDescription}>
        {description}
      </div>
      {hasChildren && renderNestedParams(children, expandableTitle)}
    </div>
  )
}

export default ParamField
