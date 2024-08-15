import clsx from 'clsx'
import Heading from '@theme/Heading'
import Button from '@site/src/components/elements/button'

import styles from './hero.module.scss'

export default function Hero({ title, description, link }) {
  return (
    <section className={styles['wrapper']}>
      <div className="container">
        <div className={styles['grid-wrapper']}>
          <div className={styles['grid-col-left']}>
            <Heading as="h1" className={clsx(styles['title'], 'type-heading-l')}>
              {title}
            </Heading>

            <p className={clsx(styles['description'], 'type-paragraph-l')}>{description}</p>

            {link && (
              <Button className={styles['button']} to={link.to} label={link.label} isLight />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
