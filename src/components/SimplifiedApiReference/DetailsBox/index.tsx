import React from 'react'
import Heading from '@theme/Heading'
import ParamField from '../ParamField'
import ReactMarkdown from 'react-markdown'
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
  errors,
}) => {
  return (
    <>
      <Heading as="h1" className={styles.title}>
        {method}
      </Heading>

      {description && (
        <div className={styles.description}>
          <ReactMarkdown skipHtml={true}>{description}</ReactMarkdown>
        </div>
      )}

      <Heading as="h3" className={styles.sectionHeading}>
        Parameters
      </Heading>

      <div className={styles.paramContainer}>
        {parameters.length === 0 ? (
          <div className={styles.noParams}>This method doesn't accept any parameters.</div>
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
          <Heading as="h3" className={styles.sectionHeading}>
            Returns
          </Heading>
          <div className={styles.paramContainer}>
            <div className={styles.returnsInfo}>
              <ReactMarkdown skipHtml={true}>{returns.description}</ReactMarkdown>
            </div>
          </div>
        </>
      )}

      {errors.length > 0 && (
        <>
          <Heading as="h3" className={styles.sectionHeading}>
            Errors
          </Heading>
          <div className={styles.paramContainer}>
            <table className={styles.paramTable}>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {errors.map((error, index) => (
                  <tr key={index}>
                    <td>
                      <code>{error.code}</code>
                    </td>
                    <td>
                      <ReactMarkdown skipHtml={true}>{error.description}</ReactMarkdown>
                    </td>
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
