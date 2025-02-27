import React from 'react'
import clsx from 'clsx'
import Translate from '@docusaurus/Translate'
import Heading from '@theme/Heading'
import styles from './styles.module.scss'

export default function NotFoundContent({ className }) {
  return (
    <main className={clsx('container margin-vert--xl', className, styles.notFound)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className={clsx(styles.title, 'type-heading-m')}>
            <Translate id="theme.NotFound.title" description="The title of the 404 page">
              Page Not Found
            </Translate>
          </Heading>
          <p className={clsx(styles.description, 'type-paragraph-l')}>
            <Translate id="theme.NotFound.p1" description="The first paragraph of the 404 page">
              We could not find what you were looking for.
            </Translate>
          </p>
          <p className={clsx(styles.description, 'type-paragraph-l')}>
            <Translate id="theme.NotFound.p2" description="The 2nd paragraph of the 404 page">
              Please contact the owner of the site that linked you to the original URL and let them
              know their link is broken.
            </Translate>
          </p>
        </div>
      </div>
    </main>
  )
}
