import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import Heading from '@theme/Heading'
import styles from './styles.module.scss'

const LINKS = [
  { label: 'Docs home', to: '/' },
  { label: 'Quickstart', to: '/quickstart/' },
  { label: 'Tutorials', to: '/tutorials/' },
  { label: 'MetaMask Connect', to: '/metamask-connect/' },
  { label: 'Embedded Wallets', to: '/embedded-wallets/' },
  { label: 'Smart Accounts Kit', to: '/smart-accounts-kit/' },
  { label: 'Snaps', to: '/snaps/' },
]

export default function NotFoundContent({ className }) {
  return (
    <main className={clsx('container', className, styles.notFound)}>
      <div className="row">
        <div className="col col--8 col--offset-2">
          <Heading as="h1" className={styles.title}>
            <Translate id="theme.NotFound.title" description="The title of the 404 page">
              Page not found
            </Translate>
          </Heading>
          <p className={clsx(styles.description, 'type-paragraph-l')}>
            <Translate id="theme.NotFound.p1" description="The first paragraph of the 404 page">
              This page may have moved or no longer exists. Try search, or start from one of these:
            </Translate>
          </p>
          <nav className={styles.links} aria-label="Popular pages">
            {LINKS.map(({ label, to }) => (
              <Link key={to} to={to} className={styles.link}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </main>
  )
}
