import React, { useState } from 'react'
import clsx from 'clsx'
import styles from './accordion.module.scss'
import CloseImg from './close.svg'

interface IAccordion {
  children: [React.ReactElement, React.ReactElement]
  opened?: boolean
}

export default function Accordion({ children: [title, body], opened = false }: IAccordion) {
  const [isOpened, setIsOpened] = useState(opened)

  const handleToggle = () => {
    setIsOpened(value => !value)
  }

  return (
    <div className={styles.accordion}>
      <div
        role="button"
        data-testid="accordion-title"
        onClick={handleToggle}
        className={styles.header}>
        {title}
        <span role="button" data-testid="accordion-button-x" className={styles.closeButton}>
          <CloseImg className={clsx(styles.image, isOpened && styles.opened)} />
        </span>
      </div>
      <div className={clsx(styles.content, isOpened && styles.opened)}>{body}</div>
    </div>
  )
}
