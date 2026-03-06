import React from 'react'
import Heading from '@theme/Heading'
import CodeBlock from '@theme/CodeBlock'
import styles from './styles.module.css'

interface RequestBoxProps {
  method: string
  exampleRequest: string
  exampleResponse: string
}

const RequestBox: React.FC<RequestBoxProps> = ({
  method,
  exampleRequest,
  exampleResponse
}) => {
  return (
    <>
      <div className={styles.cardWrapper}>
          <CodeBlock title="Example request" language="javascript" className="margin-bottom--none">
            {exampleRequest}
          </CodeBlock>
      </div>
      
      <div className={styles.cardWrapper}>
          <CodeBlock title="Example response" language="javascript" className="margin-bottom--none">
            {exampleResponse}
          </CodeBlock>
      </div>
    </>
  )
}

export default RequestBox
