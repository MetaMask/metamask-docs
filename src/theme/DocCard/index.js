import clsx from 'clsx'
import Link from '@docusaurus/Link'
import { findFirstSidebarItemLink, useDocById } from '@docusaurus/theme-common/internal'
import { usePluralForm } from '@docusaurus/theme-common'
import { translate } from '@docusaurus/Translate'
import Heading from '@theme/Heading'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'
import Button from '@site/src/components/elements/buttons/button'

import styles from './styles.module.scss'

function useCategoryItemsPlural() {
  const { selectMessage } = usePluralForm()
  return count =>
    selectMessage(
      count,
      translate(
        {
          message: '1 item|{count} items',
          id: 'theme.docs.DocCard.categoryDescription.plurals',
          description:
            'The default description for a category card in the generated index about how many items this category includes',
        },
        { count }
      )
    )
}
function CardContainer({ href, children }) {
  return (
    <Link href={href} className={clsx(styles['inner'], 'text-decoration-none', 'link-styles-none')}>
      {children}

      {href && (
        <Button
          as="div"
          label={false}
          type={'secondary'}
          icon="arrow-right"
          className={styles['button']}
          style={{
            '--button-color-hover': 'var(--general-white)',
            '--button-text-color-hover': 'var(--general-black)',
          }}
        />
      )}
    </Link>
  )
}
function CardLayout({ href, title, description }) {
  return (
    <CutOffCorners size="s">
      <div className={styles['holder']}>
        <CardContainer href={href}>
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
        </CardContainer>
      </div>
    </CutOffCorners>
  )
}
function CardCategory({ item }) {
  const href = findFirstSidebarItemLink(item)
  const categoryItemsPlural = useCategoryItemsPlural()
  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null
  }
  return (
    <CardLayout
      href={href}
      title={item.label}
      description={item.description ?? categoryItemsPlural(item.items.length)}
    />
  )
}
function CardLink({ item }) {
  const doc = useDocById(item.docId ?? undefined)
  return (
    <CardLayout
      href={item.href}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  )
}
export default function DocCard({ item }) {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />
    case 'category':
      return <CardCategory item={item} />
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`)
  }
}
