import clsx from 'clsx'
import Heading from '@theme/Heading'
import Button from '@site/src/components/elements/buttons/button'

import Shape from '@site/static/img/shapes/hero/shape.svg'

import styles from './Hero.module.scss'

export default function Hero({ title, description, buttons = [] }) {
  return (
    <section className={styles['wrapper']}>
      <div className="container">
        <div className={styles['grid-wrapper']}>
          <div className={styles['grid-col-left']}>
            <Heading as="h1" className={clsx(styles['title'], 'type-heading-l')}>
              {title}
            </Heading>

            {description && (
              <p className={clsx(styles['description'], 'type-paragraph-l')}>{description}</p>
            )}

            {buttons.length > 0 && (
              <div className={styles['buttons-container']}>
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    className={styles['button']}
                    as="link"
                    type="primary"
                    {...button}
                    style={{
                      '--button-background': 'var(--general-white)',
                      '--button-color': 'var(--general-black)',
                      '--button-border-color': 'var(--general-white)',
                      '--button-background-hover': 'var(--general-black)',
                      '--button-color-hover': 'var(--general-white)',
                      '--button-border-color-hover': 'var(--general-white)',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div className={styles['grid-col-right']}>
            <Shape className={styles['shape']} />
          </div>
        </div>
      </div>
    </section>
  )
}
