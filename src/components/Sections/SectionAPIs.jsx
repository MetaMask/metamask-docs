import clsx from 'clsx'
import { API_LINKS } from '@site/src/lib/data'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'

import styles from './SectionAPIs.module.scss'

const SectionAPIs = () => {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['holder']}>
        <div className={styles['col']}>
          <Heading as="h2" className={clsx(styles['title'], 'type-heading-s')}>
            Blockchain APIs
          </Heading>
          <ul className={styles['links']}>
            {API_LINKS.blockchain.map(item => (
              <li key={item.name}>
                <Link to={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['col']}>
          <Heading as="h2" className={clsx(styles['title'], 'type-heading-s')}>
            Decentralize storage APIs
          </Heading>
          <ul className={styles['links']}>
            {API_LINKS.storage.map(item => (
              <li key={item.name}>
                <Link to={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SectionAPIs
