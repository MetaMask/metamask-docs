/**
 * Custom Products Menu Component for Mobile
 * 
 * This component renders a simple flat list of product items
 * in the mobile sidebar under an expandable "Products" menu.
 */

import React, {useEffect} from 'react'
import clsx from 'clsx'
import {
  useCollapsible,
  Collapsible,
} from '@docusaurus/theme-common'
import {useLocalPathname} from '@docusaurus/theme-common/internal'
import {translate} from '@docusaurus/Translate'
import Link from '@docusaurus/Link'
import {mobileProductsMenu} from '@site/src/config/mobileProductsMenu'
import styles from './styles.module.css'

function CollapseButton({
  collapsed,
  onClick,
}: {
  collapsed: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <button
      aria-label={
        collapsed
          ? translate({
              id: 'theme.navbar.mobileDropdown.collapseButton.expandAriaLabel',
              message: 'Expand the dropdown',
              description:
                'The ARIA label of the button to expand the mobile dropdown navbar item',
            })
          : translate({
              id: 'theme.navbar.mobileDropdown.collapseButton.collapseAriaLabel',
              message: 'Collapse the dropdown',
              description:
                'The ARIA label of the button to collapse the mobile dropdown navbar item',
            })
      }
      aria-expanded={!collapsed}
      type="button"
      className="clean-btn menu__caret"
      onClick={onClick}
    />
  )
}

function useItemCollapsible({active}: {active: boolean}) {
  const {collapsed, toggleCollapsed, setCollapsed} = useCollapsible({
    initialState: () => !active,
  })

  // Expand if any item active after a navigation
  useEffect(() => {
    if (active) {
      setCollapsed(false)
    }
  }, [active, setCollapsed])

  return {
    collapsed,
    toggleCollapsed,
  }
}

function isPathActive(pathname: string, href: string): boolean {
  // Normalize paths by removing trailing slashes
  const normalizedPathname = pathname.replace(/\/$/, '') || '/'
  const normalizedHref = href.replace(/\/$/, '') || '/'
  
  // Check exact match or if pathname starts with href
  return normalizedPathname === normalizedHref || normalizedPathname.startsWith(normalizedHref + '/')
}

export default function ProductsMenuMobile({
  onItemClick,
}: {
  onItemClick: () => void
}): React.ReactElement {
  const localPathname = useLocalPathname()
  
  // Check if any product item is active
  const hasActiveItem = mobileProductsMenu.some((item) =>
    isPathActive(localPathname, item.href)
  )

  const {collapsed, toggleCollapsed} = useItemCollapsible({
    active: hasActiveItem,
  })

  return (
    <li
      className={clsx('menu__list-item', {
        'menu__list-item--collapsed': collapsed,
      })}>
      <div
        className={clsx('menu__list-item-collapsible', {
          'menu__list-item-collapsible--active': hasActiveItem,
        })}>
        <span
          className={clsx(
            styles.dropdownNavbarItemMobile,
            'menu__link menu__link--sublist'
          )}
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault()
            toggleCollapsed()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              toggleCollapsed()
            }
          }}>
          Products
        </span>
        <CollapseButton
          collapsed={collapsed}
          onClick={(e) => {
            e.preventDefault()
            toggleCollapsed()
          }}
        />
      </div>

      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        {mobileProductsMenu.map((item, i) => {
          const isItemActive = isPathActive(localPathname, item.href)
          return (
            <li key={i} className="menu__list-item">
              <Link
                to={item.href}
                className={clsx('menu__link', {
                  'menu__link--active': isItemActive,
                })}
                onClick={onItemClick}>
                {item.label}
              </Link>
            </li>
          )
        })}
      </Collapsible>
    </li>
  )
}

