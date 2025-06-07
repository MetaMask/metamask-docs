import clsx from 'clsx'
import styles from './SectionIntro.module.scss'

export default function SectionIntro({ description }: { description: string }) {
  return (
    <section className={styles.wrapper}>
      <div className="container">
        <div className={styles['grid-wrapper']}>
          <div className={styles['grid-col-center']}>
             <div className={styles.header}>
               <p>{description}</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
