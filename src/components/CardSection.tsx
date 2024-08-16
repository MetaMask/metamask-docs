import clsx from 'clsx'
import { CSSProperties, JSX } from 'react'
import Heading from '@theme/Heading'
import Card, { CardItem } from '@site/src/components/Card'

import styles from './CardSection.module.scss'

type CardSectionItem = {
  colorPalette: string
  title: string
  description: string
  cards: CardItem[]
}

type CardSectionProps = {
  items: CardSectionItem[]
}

export default function CardSection({ items }: CardSectionProps): JSX.Element {
  return (
    <section className={styles['wrapper']}>
      <div className="container">
        {items?.length > 0 &&
          items.map(
            ({ colorPalette, title, description, cards }: CardSectionItem, groupIndex: number) => (
              <div
                key={groupIndex}
                className={clsx(styles['grid-wrapper'], groupIndex % 2 !== 0 && styles['reverse'])}
                style={
                  colorPalette
                    ? ({
                        '--color-palette': `var(--developer-${colorPalette})`,
                      } as CSSProperties)
                    : {}
                }>
                <div className={styles['grid-col-left']}>
                  <div className={styles['sticky-col']}>
                    <Heading as="h2" className={clsx(styles['title'], 'type-heading-m')}>
                      {title}
                    </Heading>
                    <p className={clsx(styles['description'], 'type-paragraph-l')}>{description}</p>
                  </div>
                </div>
                <ul className={styles['grid-col-right']}>
                  {cards?.length > 0 &&
                    cards.map(({ title, description, href }: CardItem, cardIndex: number) => (
                      <Card key={cardIndex} title={title} description={description} href={href} />
                    ))}
                </ul>
              </div>
            )
          )}
      </div>
    </section>
  )
}
