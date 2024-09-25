import React from 'react'
import Heading from '@theme/Heading'
import { MDContent } from './MDContent'
import { renderParamSchemas, renderResultSchemas } from './RenderParams'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { MethodParam, SchemaComponents } from '@site/src/components/ParserOpenRPC/interfaces'
import { Tag } from '@site/src/components/ParserOpenRPC/DetailsBox/SchemaProperty'

interface TagItem {
  name: string;
  $ref: string;
}

interface DetailsBoxProps {
  method: string;
  description: string | null;
  params: MethodParam[];
  components: SchemaComponents;
  result: any;
  tags: TagItem[];
  extraContent?: JSX.Element;
}

export default function DetailsBox({
  method,
  description,
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
            <Tag key={tag.name} name={tag.name} />
          ))}
        </div>
      )}
      <div className="markdown">
        <Heading
          as="h1"
          className={clsx(styles.heading1, method.length > 33 && styles.headingSmall)}>
          {method}
        </Heading>
        <MDContent content={description} />
          {extraContent && <div className="padding-top--lg">{extraContent}</div>}
        <Heading as="h2" className={styles.heading2}>
          Parameters
        </Heading>
        {params.length === 0 ? (
          <div>This method does not accept any parameters</div>
        ) : (
          <>{params && renderParamSchemas(params, components)}</>
        )}
        <Heading as="h2" className={styles.heading2}>
          Returns
        </Heading>
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
