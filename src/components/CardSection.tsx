import clsx from 'clsx'
import { CSSProperties, JSX, useState, useEffect } from 'react'
import { useColorMode } from '@docusaurus/theme-common'
import Card, { CardItem } from '@site/src/components/Card'

import styles from './CardSection.module.scss'

type CardSectionProps = {
  title?: string
  description?: string
  cards: CardItem[]
  colorPalette?: string
}

export default function CardSection({
  title,
  description,
  cards,
  colorPalette,
}: CardSectionProps): JSX.Element {
  const { colorMode } = useColorMode()
  const [theme, setTheme] = useState('')

  useEffect(() => {
    setTheme(colorMode)
  }, [colorMode])

  return (
    <section className={styles.wrapper}>
      <div className="container">
        <div className={styles['grid-wrapper']}>
          <div className={styles['grid-col-center']}>
            <div
              className={clsx(
                styles['section-grid'],
                !title && !description && styles['cards-only']
              )}
              style={
                colorPalette
                  ? ({
                      '--color-palette': `var(--developer-${colorPalette})`,
                    } as CSSProperties)
                  : {}
              }>
              {/* Title and Description Column */}
              {(title || description) && (
                <div className={styles['content-column']}>
                  <div className={styles.header}>
                    {title && <h2>{title}</h2>}
                    {description && <p>{description}</p>}
                  </div>
                </div>
              )}

              {/* Cards Columns */}
              <div className={styles['cards-wrapper']}>
                {cards.map(({ title, description, href, buttonIcon }, index) => (
                  <div key={index} className={styles['card-column']}>
                    <Card
                      title={title}
                      description={description}
                      href={href}
                      theme={theme}
                      buttonIcon={buttonIcon}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
