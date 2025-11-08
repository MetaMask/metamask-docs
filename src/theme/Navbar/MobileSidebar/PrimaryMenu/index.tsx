/**
 * Custom PrimaryMenu for Mobile Sidebar
 * 
 * This component handles the Products dropdown specially by rendering
 * a custom mobile-friendly menu structure instead of the HTML dropdown.
 */

import React, {type ReactNode} from 'react'
import {useThemeConfig} from '@docusaurus/theme-common'
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal'
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem'
import ProductsMenuMobile from '@theme/Navbar/MobileSidebar/ProductsMenu'

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as NavbarItemConfig[]
}

// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar()
  const items = useNavbarItems()

  return (
    <ul className="menu__list">
      {items.map((item, i) => {
        // Check if this is the Products dropdown
        // We identify it by checking if it's a dropdown with label "Products"
        // and if it contains an HTML item (which is our Products.html)
        const isProductsDropdown =
          item.type === 'dropdown' &&
          item.label === 'Products' &&
          item.items?.some((subItem) => subItem.type === 'html')

        // If it's the Products dropdown, render our custom component
        if (isProductsDropdown) {
          return (
            <ProductsMenuMobile
              key={i}
              onItemClick={() => mobileSidebar.toggle()}
            />
          )
        }

        // Otherwise, render normally
        return (
          <NavbarItem
            mobile
            {...item}
            onClick={() => mobileSidebar.toggle()}
            key={i}
          />
        )
      })}
    </ul>
  )
}

