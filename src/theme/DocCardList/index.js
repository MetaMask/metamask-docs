import React from 'react'
import clsx from 'clsx'
import { useCurrentSidebarCategory, filterDocCardListItems } from '@docusaurus/theme-common'
import DocCard from '@theme/DocCard'

function DocCardListForCurrentSidebarCategory({ className }) {
  const category = useCurrentSidebarCategory()
  return <DocCardList items={category.items} className={className} />
}
export default function DocCardList(props) {
  const { items, className } = props
  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />
  }
  const filteredItems = filterDocCardListItems(items)
  return (
    <section className={clsx('row', className)}>
      {filteredItems.map((item, index) => (
        <DocCard key={index} item={item} />
      ))}
    </section>
  )
}
