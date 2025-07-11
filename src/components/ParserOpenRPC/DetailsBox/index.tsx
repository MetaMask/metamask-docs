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
  extraContent?: JSX.Element | Record<string, JSX.Element>
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
  // Helper function to render extraContent at specific positions
  const renderExtraContent = (position: string) => {
    if (React.isValidElement(extraContent)) {
      // Backward compatibility - old syntax only renders at after-description
      return position === 'after-description' ? extraContent : null
    }
    // New syntax - render at specified position
    return extraContent?.[position] || null
  }

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
          className={clsx('padding-bottom--md', styles.borderBottomLine, styles.methodSummary)}>
          <strong>Summary: </strong>
          <span className={styles.summaryText}>
            <MDContent content={summary} />
            {/* after-summary content is inline appended */}
            {renderExtraContent('after-summary')}
          </span>
        </p>
      )}
      {/* after-summary content when summary is null */}
      {summary === null && renderExtraContent('after-summary')}
      {description !== null && (
        <div className={clsx('padding-top--md', styles.methodDescription)}>
          <MDContent content={description} />
        </div>
      )}
      {/* after-description content */}
      {renderExtraContent('after-description') && (
        <div className={clsx('padding-top--lg', styles.extraContent)}>
          {renderExtraContent('after-description')}
        </div>
      )}
      <Heading
        as="h2"
        className={clsx(styles.secondaryHeading, 'padding-top--lg padding-bottom--md')}>
        Parameters
      </Heading>
      <div className={styles.paramContainer}>
        {params.length === 0 ? (
          <div className={clsx('padding-vert--md', styles.noParamsDescription)}>
            This method doesn't accept any parameters.
          </div>
        ) : (
          params && renderParamSchemas(params, components)
        )}
      </div>
      {/* after-parameters content */}
      {renderExtraContent('after-parameters') && (
        <div className={clsx('padding-top--lg', styles.extraContent)}>
          {renderExtraContent('after-parameters')}
        </div>
      )}
      <Heading
        as="h2"
        className={clsx(styles.secondaryHeading, 'padding-top--lg padding-vert--md')}>
        Returns
      </Heading>
      <div className={styles.paramContainer}>
        {result && renderResultSchemas(result, components)}
      </div>
      {/* after-returns content */}
      {renderExtraContent('after-returns') && (
        <div className={clsx('padding-top--lg', styles.extraContent)}>
          {renderExtraContent('after-returns')}
        </div>
      )}
    </>
  )
}
