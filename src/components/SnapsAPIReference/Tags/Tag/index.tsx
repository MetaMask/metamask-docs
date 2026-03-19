import { CSSProperties, FunctionComponent } from 'react'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'
import clsx from 'clsx'
import styles
  from '@site/src/components/ParserOpenRPC/DetailsBox/styles.module.scss'

const TAG_MAPPING: Record<string, {
  name: string;
  color: string;
}> = {
  'snap': {
    name: 'Snap',
    color: 'var(--consumer-green)',
  },
  'website': {
    name: 'Website',
    color: 'var(--consumer-blue)',
  },
  'restricted': {
    name: 'Restricted',
    color: 'var(--consumer-orange)',
  }
}

export type TagProps = {
  name: string;
}

export const Tag: FunctionComponent<TagProps> = ({ name }) => {
  const tag = TAG_MAPPING[name];
  if (!tag) {
    return null;
  }

  return (
    <CutOffCorners size="xs">
      <span
        className={clsx(styles['tag'], 'type-label-caption uppercase font-weight-medium')}
        style={
          {
            '--color-palette': tag.color,
          } as CSSProperties
        }>
        {tag.name}
      </span>
    </CutOffCorners>
  )
}
