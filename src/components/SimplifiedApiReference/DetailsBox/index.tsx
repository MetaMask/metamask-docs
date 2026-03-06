import React from 'react'
import Heading from '@theme/Heading'
import ParamField from '../ParamField'
import styles from './styles.module.css'

interface NestedParam {
  name: string
  type: string
  required: boolean
  description: string
  children?: NestedParam[]
}

interface Parameter {
  name: string
  type: string
  required: boolean
  description: string
  children?: NestedParam[]
}

interface Error {
  code: number | string
  message: string
  description: string
}

interface Returns {
  type: string
  description: string
}

interface DetailsBoxProps {
  method: string
  description?: string
  parameters: Parameter[]
  returns?: Returns
  errors: Error[]
}

const DetailsBox: React.FC<DetailsBoxProps> = ({
  method,
  description,
  parameters,
  returns,
  errors
}) => {
  return (
    <>
      <Heading as="h1">{method}</Heading>
      
      {description && (
        <div className={styles.description}>
          <p>{description}</p>
        </div>
      )}
      
      <Heading as="h2" className={styles.sectionHeading}>
        Parameters
      </Heading>
      
      <div className={styles.paramContainer}>
        {parameters.length === 0 ? (
          <div className={styles.noParams}>
            This method doesn't accept any parameters.
          </div>
        ) : (
          <div className={styles.paramFields}>
            {parameters.map((param, index) => (
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
          </div>
        )}
      </div>
      
      {returns && (
        <>
          <Heading as="h2" className={styles.sectionHeading}>
            Returns
          </Heading>
          <div className={styles.paramContainer}>
            <div className={styles.returnsInfo}>
              <p>{returns.description}</p>
            </div>
          </div>
        </>
      )}
      
      {errors.length > 0 && (
        <>
          <Heading as="h2" className={styles.sectionHeading}>
            Errors
          </Heading>
          <div className={styles.paramContainer}>
            <table className={styles.paramTable}>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Message</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {errors.map((error, index) => (
                  <tr key={index}>
                    <td><code>{error.code}</code></td>
                    <td>{error.message}</td>
                    <td>{error.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}

export default DetailsBox
