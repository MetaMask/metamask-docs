import React from 'react'
import Heading from '@theme/Heading'
import { MDContent } from './MDContent'
import { renderParamSchemas, renderResultSchemas } from './RenderParams'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { MethodParam, SchemaComponents } from '@site/src/components/ParserOpenRPC/interfaces'
import { Tag } from '@site/src/components/ParserOpenRPC/DetailsBox/SchemaProperty'

interface TagItem {
  name: string
  $ref: string
}

interface DetailsBoxProps {
  method: string
  description: string | null
  summary: string | null
  params: MethodParam[]
  components: SchemaComponents
  result: any
  tags: TagItem[]
  extraContent?: JSX.Element
}

export default function DetailsBox({
  method,
  description,
  summary,
  params,
  components,
  result,
  tags,
  extraContent,
}: DetailsBoxProps) {
  return (
    <>
      {tags.length > 0 && (
        <div className={styles.tagList}>
          {tags.map(tag => (
            <div key={tag.name}>
              <Tag name={tag.name} />
            </div>
          ))}
        </div>
      )}
      <Heading as="h1">{method}</Heading>
      {summary !== null && (
        <p
          style={{ marginBottom: '0.5rem' }}
          className={clsx('padding-bottom--md', styles.borderBottomLine)}>
          <strong>Summary: </strong>
          <span className={styles.summaryText}>
            <MDContent content={summary} />
          </span>
        </p>
      )}
      {description !== null && (
        <div className="padding-top--md">
          <MDContent content={description} />
        </div>
      )}
      {extraContent && <div className="padding-top--lg">{extraContent}</div>}
      <Heading
        as="h2"
        className={clsx(styles.secondaryHeading, 'padding-top--lg padding-bottom--md')}>
        Parameters
      </Heading>
      <div className={styles.paramContainer}>
        {params.length === 0 ? (
          <div className="padding-vert--md">This method doesn't accept any parameters.</div>
        ) : (
          params && renderParamSchemas(params, components)
        )}
      </div>
      <Heading
        as="h2"
        className={clsx(styles.secondaryHeading, 'padding-top--lg padding-vert--md')}>
        Returns
      </Heading>
      <div className={styles.paramContainer}>
        {result?.description && (
          <div className="padding-vert--md">
            <MDContent content={result.description} />
          </div>
        )}
        {result && renderResultSchemas(result, components)}
      </div>
    </>
  )
}
