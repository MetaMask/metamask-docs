import clsx from 'clsx'
import CardListItem, { CardItem } from './CardListItem'

import styles from './CardList.module.scss'

interface CardListProps {
  items: CardItem[]
}

export default function CardList(props: CardListProps): JSX.Element {
  const { items } = props

  return (
    <section className={styles['wrapper']}>
      <ul className={styles['list']}>
        {items.map((item, index) => (
          <CardListItem key={index} item={item} />
        ))}
      </ul>
    </section>
  )
}
