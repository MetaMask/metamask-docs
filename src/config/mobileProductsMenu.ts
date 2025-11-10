/**
 * Mobile Products Menu Configuration
 * 
 * This configuration defines a simple flat list of product items
 * displayed in the mobile sidebar under "Products".
 */

export interface MobileProductItem {
  label: string
  href: string
}

export const mobileProductsMenu: MobileProductItem[] = [
  {
    label: 'MM Connect',
    href: '/sdk',
  },
  {
    label: 'Embedded Wallets',
    href: '/embedded-wallets',
  },
  {
    label: 'Delegation Toolkit',
    href: '/delegation-toolkit',
  },
  {
    label: 'Snaps',
    href: '/snaps',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Developer dashboard',
    href: '/developer-tools/dashboard',
  },
]

