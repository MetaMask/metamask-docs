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
  params: MethodParam[]
  components: SchemaComponents
  result: any
  tags: TagItem[]
}

export default function DetailsBox({
  method,
  description,
  params,
  components,
  result,
  tags,
}: DetailsBoxProps) {
  return (
    <>
      {tags.length > 0 && (
        <div className={styles.tagList}>
          {tags.map(tag => (
            <Tag key={tag.name} name={tag.name} />
          ))}
        </div>
      )}
      <Heading as="h1" className={'margin-bottom--md type-heading-m'}>
        {method}
      </Heading>
      <MDContent content={description} />
      <Heading
        as="h2"
        className={clsx(
          styles.secondaryHeading,
          'padding-top--lg padding-bottom--md type-heading-s'
        )}>
        Parameters
      </Heading>
      {params.length === 0 ? (
        <div>This method does not accept any parameters</div>
      ) : (
        <>{params && renderParamSchemas(params, components)}</>
      )}
      <Heading
        as="h2"
        className={clsx(
          styles.secondaryHeading,
          styles.borderBottomLine,
          'padding-top--lg padding-vert--md type-heading-s'
        )}>
        Returns
      </Heading>
      {result?.description && (
        <div className="padding-vert--md">
          <MDContent content={result.description} />
        </div>
      )}
      {result && renderResultSchemas(result, components)}
    </>
  )
}
