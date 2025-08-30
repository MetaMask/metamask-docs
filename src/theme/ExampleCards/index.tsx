import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'

import styles from './styles.module.css'

import type { ExamplesInterface } from '@site/src/common/maps'

const chevron = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 3.33301L10.6667 7.99967L6 12.6663"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function ExampleCards(props: { exampleMap: ExamplesInterface[] }) {
  const { exampleMap } = props
  exampleMap.forEach(example => {
    example.image = useBaseUrl(example.image)
    return example
  })

  return (
    <div className={styles.exampleGroupContent}>
      {exampleMap.map((example: ExamplesInterface) => (
        <div key={example.link} className={styles.example}>
          <Link to={example.link} className={styles.exampleContent}>
            <img src={example.image} alt="Banner" />
            <h3>{example.title}</h3>
            <div className={styles.pillPrimary}>{example.type}</div>
            <p>{example.description}</p>
          </Link>
          {example.githubLink || example.qsLink || example.guideLink ? (
            <div className={styles.pillContainer}>
              {example.githubLink ? (
                <Link className={styles.pill} to={example.githubLink}>
                  Source Code{chevron}
                </Link>
              ) : null}
              {example.guideLink ? (
                <Link className={styles.pill} to={example.guideLink}>
                  Guide{chevron}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
