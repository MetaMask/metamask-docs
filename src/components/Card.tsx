import clsx from 'clsx'
import { CSSProperties, ReactNode, useState } from 'react'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'
import Button from '@site/src/components/elements/buttons/button'

import SvgStar from '@site/static/img/icons/star.svg'
import Shape from '@site/static/img/shapes/intro-cards/shape.svg'

import styles from './Card.module.scss'

export type CardItem = {
  title: string
  href: string
  description?: string | ReactNode
  theme?: string
}

export default function Card({ title, href, description, theme }: CardItem) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <li className={clsx(styles['item'], isHovered && styles['active'])}>
      <CutOffCorners size="s">
        <div
          className={styles['holder']}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <Link to={href} className={clsx(styles['inner'], 'link-styles-none')}>
            <Shape className={styles['shape']} />

            <div className={styles['header']}>
              <SvgStar className={styles['icon']} />
              <Heading as="h3" className={clsx(styles['item-title'], 'type-heading-sm')}>
                {title}
              </Heading>
            </div>

            <div className={styles['footer']}>
              {description && (
                <p className={clsx(styles['item-description'], 'type-paragraph-m')}>
                  {description}
                </p>
              )}

              {href && (
                <Button
                  as="button"
                  label={false}
                  type={theme === 'dark' ? 'secondary' : 'primary'}
                  icon="arrow-right"
                  className={styles['button']}
                  style={
                    theme === 'dark'
                      ? ({
                          '--button-color-hover': 'var(--general-white)',
                          '--button-text-color-hover': 'var(--general-black)',
                        } as unknown as CSSProperties)
                      : ({
                          '--button-color-hover': 'var(--general-black)',
                          '--button-text-color-hover': 'var(--general-white)',
                        } as unknown as CSSProperties)
                  }
                />
              )}
            </div>
          </Link>
        </div>
      </CutOffCorners>
    </li>
  )
}
