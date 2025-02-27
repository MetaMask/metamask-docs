import clsx from 'clsx'
import Icon from '@site/src/components/Icon/Icon'
import { MSG_TYPES } from '@site/src/lib/constants'
import Heading from '@theme/Heading'

import styles from './MessageBox.module.scss'

const MessageBox = ({ opened, type, title, description }) => {
  if (!opened) {
    return null
  }
  const renderIcon = () => {
    switch (type) {
      case MSG_TYPES.ERROR:
        return <Icon name="alert-error" />
      case MSG_TYPES.SUCCESS:
        return <Icon name="alert-success" />
      default:
        return <Icon name="alert-info" />
    }
  }

  return (
    <div className={styles['box']}>
      <Heading as="h3" className={clsx(styles['title'], 'type-heading-xs')}>
        {renderIcon()}
        {title}
      </Heading>
      <p className={clsx(styles['desc'], 'type-paragraph-l')}>{description}</p>
    </div>
  )
}

export default MessageBox
