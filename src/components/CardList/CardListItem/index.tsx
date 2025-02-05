import React, { ReactNode } from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'

import { useState, useEffect } from 'react'
import { useColorMode } from '@docusaurus/theme-common'
import Heading from '@theme/Heading'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'
import Button from '@site/src/components/elements/buttons/button'

import styles from './styles.module.scss'

export interface CardItem {
  title?: ReactNode
  description?: ReactNode
  href?: string
  flaskOnly?: boolean
}

interface CardListItemProps {
  item: CardItem
}

export default function CardListItem({ item }: CardListItemProps) {
  const { title, description, href, flaskOnly } = item
  const [isHovered, setIsHovered] = useState(false)
  const { colorMode } = useColorMode()
  const [theme, setTheme] = useState('')

  useEffect(() => {
    setTheme(colorMode)
  }, [colorMode])

  return (
    <li
      className={clsx(styles['item'], isHovered && styles['active'], flaskOnly && styles['flask'])}>
      <CutOffCorners size="s">
        <div
          className={styles['holder']}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <Link to={href} className={clsx(styles['inner'], 'link-styles-none')}>
            {flaskOnly && (
              <div className={styles['tag-holder']}>
                <CutOffCorners size={'xs'}>
                  <span
                    className={clsx(
                      styles['tag'],
                      'type-label-caption uppercase font-weight-medium'
                    )}>
                    Flask
                  </span>
                </CutOffCorners>
              </div>
            )}

            <div className={styles['header']}>
              <Heading as="h3" className={clsx(styles['title'], 'type-heading-xs')}>
                {title}
              </Heading>

              <p className={clsx(styles['description'], 'type-paragraph-s')}>{description}</p>
            </div>
            {href && (
              <Button
                as="button"
                label={false}
                type={theme === 'dark' ? 'secondary' : 'primary'}
                icon="arrow-right"
                style={
                  theme === 'dark'
                    ? {
                        '--button-color-hover': 'var(--general-white)',
                        '--button-text-color-hover': 'var(--general-black)',
                      }
                    : {
                        '--button-color-hover': 'var(--general-black)',
                        '--button-text-color-hover': 'var(--general-white)',
                      }
                }
              />
            )}
          </Link>
        </div>
      </CutOffCorners>
    </li>
  )
}
