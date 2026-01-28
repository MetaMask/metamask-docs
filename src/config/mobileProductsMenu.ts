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
    label: 'MetaMask Connect',
    href: '/sdk',
  },
  {
    label: 'Embedded Wallets',
    href: '/embedded-wallets',
  },
  {
    label: 'Smart Accounts Kit',
    href: '/smart-accounts-kit',
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

