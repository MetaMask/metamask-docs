import { FunctionComponent } from 'react'
import styles from './styles.module.scss'
import Markdown from 'react-markdown'

type DescriptionProps = {
  children: string
}

export const Description: FunctionComponent<DescriptionProps> = ({ children }) => {
  return (
    <div className={styles['parameter-description']}>
      <Markdown>{children}</Markdown>
    </div>
  )
}
