import { clsx } from 'clsx'
import Button from '@site/src/components/elements/button'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'
import Heading from '@theme/Heading'

import Shape from '@site/static/img/shapes/hero/shape.svg'

import styles from './call-to-action.module.scss'

const CallToAction = ({ title, description, link }) => {
  return (
    <section className={clsx(styles['call-to-action'])}>
      <div className={clsx(styles['container'], 'container')}>
        <div className={styles['grid-wrapper']}>
          <div className={styles['grid-col-center']}>
            <CutOffCorners>
              <div className={styles['grid-inner']}>
                <div className={styles['grid-col-left']}>
                  <Heading as="h2" className={clsx(styles['title'], 'type-heading-sm')}>
                    {title}
                  </Heading>

                  {description && (
                    <p className={clsx(styles['description'], 'type-paragraph-m')}>{description}</p>
                  )}

                  {link && (
                    <Button className={styles['button']} to={link.to} label={link.label} isLight />
                  )}
                </div>
                <div className={styles['grid-col-right']}>
                  <Shape className={styles['shape']} />
                </div>
              </div>
            </CutOffCorners>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
