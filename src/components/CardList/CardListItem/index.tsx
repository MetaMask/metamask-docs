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
  icon?: string
  flaskOnly?: boolean
}

interface CardListItemProps {
  item: CardItem
}

export default function CardListItem({ item }: CardListItemProps) {
  const { title, description, href, icon } = item
  const [isHovered, setIsHovered] = useState(false)
  const { colorMode } = useColorMode()
  const [theme, setTheme] = useState('')

  useEffect(() => {
    setTheme(colorMode)
  }, [colorMode])

  return (
    <li className={clsx(styles['item'], isHovered && styles['active'])}>
      <CutOffCorners size="s">
        <div
          className={styles['holder']}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <Link to={href} className={clsx(styles['inner'], 'text-decoration-none')}>
            <div className={styles['header']}>
              <Heading as="h3" className={clsx(styles['title'], 'type-heading-xs')}>
                {icon && <img src={icon} className={styles.icon} />}
                <span>{title}</span>
              </Heading>

              <p className={clsx(styles['description'], 'type-paragraph-s')}>{description}</p>
            </div>
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
