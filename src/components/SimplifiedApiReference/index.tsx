import React from 'react'
import styles from './styles.module.css'
import DetailsBox from './DetailsBox'
import RequestBox from './RequestBox'

interface NestedParam {
  name: string
  type: string
  required: boolean
  description: string
  children?: NestedParam[]
}

interface SimplifiedApiReferenceProps {
  method: string
  description?: string
  parameters: Array<{
    name: string
    type: string
    required: boolean
    description: string
    children?: NestedParam[]
  }>
  returns?: {
    type: string
    description: string
  }
  errors?: Array<{
    code: number | string
    message: string
    description: string
  }>
  exampleRequest: string
  exampleResponse: string
}

const SimplifiedApiReference: React.FC<SimplifiedApiReferenceProps> = ({
  method,
  description,
  parameters,
  returns,
  errors = [],
  exampleRequest,
  exampleResponse
}) => {
  return (
    <div className={styles.rowWrap}>
      <div className={styles.colLeft}>
        <div className={styles.colContentWrap}>
          <DetailsBox
            method={method}
            description={description}
            parameters={parameters}
            returns={returns}
            errors={errors}
          />
        </div>
      </div>
      <div className={styles.colRight}>
        <div className={styles.stickyCol}>
          <RequestBox
            method={method}
            exampleRequest={exampleRequest}
            exampleResponse={exampleResponse}
          />
        </div>
      </div>
    </div>
  )
}

export default SimplifiedApiReference
