import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useCurrentSidebarCategory, filterDocCardListItems } from '@docusaurus/theme-common'
import { useColorMode } from '@docusaurus/theme-common'
import DocCard from '@theme/DocCard'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'
import isInternalUrl from '@docusaurus/isInternalUrl'
import Button from '@site/src/components/elements/buttons/button'

import styles from './styles.module.scss'

function DocCardListForCurrentSidebarCategory({ className }) {
  const category = useCurrentSidebarCategory()
  return <DocCardList items={category.items} className={className} />
}

export default function DocCardList(props) {
  const { colorMode } = useColorMode()
  const [theme, setTheme] = useState('')
  const { items, className } = props
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    setTheme(colorMode)
  }, [colorMode])

  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />
  }
  const filteredItems = filterDocCardListItems(items)
  return (
    <section className={clsx(styles['row'], 'row', className, 'padding-top--lg')}>
      {filteredItems.map((item, index) => (
        <article
          key={index}
          className={clsx(styles['item'], activeIndex === index && styles['active'])}>
          <CutOffCorners size={'s'}>
            <div
              className={styles['holder']}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}>
              <DocCard item={item} />

              {item.href && (
                <Button
                  as="link"
                  href={item.href}
                  label={false}
                  type={theme === 'dark' ? 'secondary' : 'primary'}
                  icon={isInternalUrl(item.href) ? 'arrow-right' : 'external-arrow'}
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
            </div>
          </CutOffCorners>
        </article>
      ))}
    </section>
  )
}
