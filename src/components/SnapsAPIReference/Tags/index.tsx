import { FunctionComponent } from 'react'
import { Tag } from './Tag';
import styles from './styles.module.scss'

export type TagsProps = {
  method: {
    subjectTypes: string[];
    restricted: boolean;
  }
}

export const Tags: FunctionComponent<TagsProps> = ({ method }) => {
  return (
    method.subjectTypes.length > 0 && (
      <ul className={styles.tags}>
        {method.subjectTypes.map((subjectType) => (
          <li key={subjectType}>
            <Tag name={subjectType} />
          </li>
        ))}

        {method.restricted && (
          <li>
            <Tag name="restricted" />
          </li>
        )}
      </ul>
    )
  )
}
