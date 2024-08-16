import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useColorMode } from '@docusaurus/theme-common'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'
import Button from '@site/src/components/elements/buttons/button'

import SvgStar from '@site/static/img/icons/star.svg'
import Shape from '@site/static/img/shapes/intro-cards/shape.svg'

import styles from './IntroCards.module.scss'

export default function IntroCards({ items }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const { colorMode } = useColorMode()
  const [theme, setTheme] = useState()

  useEffect(() => {
    setTheme(colorMode)
  }, [colorMode])

  return (
    <section className={styles['wrapper']}>
      <div className="container">
        {items?.length > 0 &&
          items.map(({ colorPalette, title, description, cards }, groupIndex) => (
            <div
              key={groupIndex}
              className={clsx(styles['grid-wrapper'], groupIndex % 2 !== 0 && styles['reverse'])}
              style={colorPalette ? { '--color-palette': `var(--developer-${colorPalette})` } : {}}>
              <div className={styles['grid-col-left']}>
                <Heading as="h2" className={clsx(styles['title'], 'type-heading-m')}>
                  {title}
                </Heading>

                <p className={clsx(styles['description'], 'type-paragraph-l')}>{description}</p>
              </div>

              <ul className={styles['grid-col-right']}>
                {cards?.length > 0 &&
                  cards.map(({ title, description, href }, cardIndex) => (
                    <li
                      key={cardIndex}
                      className={clsx(
                        styles['item'],
                        activeIndex === cardIndex && styles['active']
                      )}>
                      <CutOffCorners size="s">
                        <CutOffCorners size="s" />
                        <div
                          className={styles['holder']}
                          onMouseEnter={() => setActiveIndex(cardIndex)}
                          onMouseLeave={() => setActiveIndex(null)}>
                          <Link to={href} className={clsx(styles['inner'], 'text-decoration-none')}>
                            <Shape className={styles['shape']} />

                            <div className={styles['header']}>
                              <SvgStar className={styles['icon']} />
                              <Heading
                                as="h3"
                                className={clsx(styles['item-title'], 'type-heading-sm')}>
                                {title}
                              </Heading>
                            </div>

                            <div className={styles['footer']}>
                              <p className={clsx(styles['item-description'], 'type-paragraph-m')}>
                                {description}
                              </p>
                              {href && (
                                <Button
                                  as="div"
                                  label={false}
                                  type={theme === 'dark' ? 'secondary' : 'primary'}
                                  icon="arrow-right"
                                  className={styles['button']}
                                  style={
                                    theme === 'dark'
                                      ? {
                                          '--button-color-hover': 'var(--general-black)',
                                          '--button-text-color-hover': 'var(--general-white)',
                                        }
                                      : {
                                          '--button-color-hover': 'var(--general-white)',
                                          '--button-text-color-hover': 'var(--general-black)',
                                        }
                                  }
                                />
                              )}
                            </div>
                          </Link>
                        </div>
                      </CutOffCorners>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
      </div>
    </section>
  )
}
