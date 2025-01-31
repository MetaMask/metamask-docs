import clsx from 'clsx'
import { CSSProperties, JSX, useState, useEffect } from 'react'
import { useColorMode } from '@docusaurus/theme-common'
import Heading from '@theme/Heading'
import Card, { CardItem } from '@site/src/components/Card'

import styles from './CardSection.module.scss'

type CardSectionProps = {
  cards: CardItem[]
  colorPalette: string
}

export default function CardSection({ cards, colorPalette }: CardSectionProps): JSX.Element {
  const { colorMode } = useColorMode()
  const [theme, setTheme] = useState('')

  useEffect(() => {
    setTheme(colorMode)
  }, [colorMode])

  return (
    <section className={styles['wrapper']}>
      <div className="container">
        <div className={styles['grid-wrapper']}>
          <div className={styles['grid-col-center']}>
            <ul
              className={styles['grid']}
              style={
                colorPalette
                  ? ({
                      '--color-palette': `var(--developer-${colorPalette})`,
                    } as CSSProperties)
                  : {}
              }
            >
              {cards?.length > 0 &&
                cards.map(({ title, description, href }: CardItem, cardIndex: number) => (
                  <Card
                    key={cardIndex}
                    title={title}
                    description={description}
                    href={href}
                    theme={theme}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
