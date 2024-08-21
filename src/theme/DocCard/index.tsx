import clsx from 'clsx'
import Link from '@docusaurus/Link'
import { useState, useEffect } from 'react'
import { useDocById, findFirstSidebarItemLink } from '@docusaurus/theme-common/internal'
import Heading from '@theme/Heading'
import { translate } from '@docusaurus/Translate'
import { useColorMode } from '@docusaurus/theme-common'
import type { Props } from '@theme/DocCard'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'
import Button from '@site/src/components/elements/buttons/button'

import styles from './styles.module.scss'

import type { PropSidebarItemCategory, PropSidebarItemLink } from '@docusaurus/plugin-content-docs'
import { ReactNode } from 'react'

function CardLayout({
  href,
  title,
  description,
  flaskOnly,
}: {
  href: string
  title: string
  description?: string
  flaskOnly?: boolean
}): JSX.Element {
  const { colorMode } = useColorMode()
  const [theme, setTheme] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setTheme(colorMode)
  }, [colorMode])

  return (
    <article
      className={clsx(styles['item'], isHovered && styles['active'], flaskOnly && styles['flask'])}>
      <CutOffCorners size="s">
        <div
          className={styles['holder']}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <Link
            href={href}
            className={clsx(styles['inner'], 'text-decoration-none', 'link-styles-none')}>
            {flaskOnly && (
              <div className={styles['tag-holder']}>
                <CutOffCorners size={'xxs'}>
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
              <Heading as="h2" className={clsx(styles['title'], 'type-heading-xs')} title={title}>
                {title}
              </Heading>

              {description && (
                <p className={clsx(styles['description'], 'type-paragraph-s')} title={description}>
                  {description}
                </p>
              )}
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
    </article>
  )
}

function CardCategory({ item }: { item: PropSidebarItemCategory }): JSX.Element | null {
  const href = findFirstSidebarItemLink(item)

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null
  }

  return (
    <CardLayout
      flaskOnly={!!item.customProps?.flask_only}
      href={href}
      title={item.label}
      description={
        item.description ??
        translate(
          {
            message: '{count} items',
            id: 'theme.docs.DocCard.categoryDescription',
            description:
              'The default description for a category card in the generated index about how many items this category includes',
          },
          { count: item.items.length }
        )
      }
    />
  )
}

function CardLink({ item }: { item: PropSidebarItemLink }): JSX.Element {
  const doc = useDocById(item.docId ?? undefined)
  return (
    <CardLayout
      flaskOnly={!!item.customProps?.flask_only}
      href={item.href}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  )
}

export default function DocCard({ item }: Props): JSX.Element {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />
    case 'category':
      return <CardCategory item={item} />
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`)
  }
}
