import React from 'react'
import Link from '@docusaurus/Link'
import Badge from '@site/src/components/Badge'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './GuideCard.module.css'

interface GuideCardProps {
  title: string
  description: string
  link: string
  image?: string
  tags?: string[]
  author?: string
  date?: string
  type?: string
  searchInput?: string
  activeTags?: string[]
}

export default function GuideCard({
  title,
  description,
  link,
  image,
  tags = [],
  author,
  date,
  type,
  searchInput = '',
  activeTags = [],
}: GuideCardProps) {
  const { siteConfig } = useDocusaurusContext()
  const { baseUrl } = siteConfig

  function highlightSearchText(text: string) {
    if (!searchInput.trim()) {
      return text
    }

    const searchTerms = searchInput.trim().split(/\s+/)
    const regex = new RegExp(`(${searchTerms.join('|')})`, 'gi')

    // Use replace to find matches and build result
    let lastIndex = 0
    const elements: React.ReactNode[] = []
    let match

    // Reset regex lastIndex to avoid stateful issues
    regex.lastIndex = 0

    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        elements.push(text.slice(lastIndex, match.index))
      }

      // Add the highlighted match
      elements.push(<mark key={match.index}>{match[0]}</mark>)

      lastIndex = match.index + match[0].length

      // Prevent infinite loop with zero-length matches
      if (match.index === regex.lastIndex) {
        regex.lastIndex++
      }
    }

    // Add remaining text after last match
    if (lastIndex < text.length) {
      elements.push(text.slice(lastIndex))
    }

    return <span>{elements}</span>
  }

  return (
    <article className={styles.card}>
      <Link to={link} className={styles.cardLink}>
        {image && (
          <div className={styles.imageContainer}>
            <img src={baseUrl + image} alt={title} className={styles.image} />
          </div>
        )}

        <div className={styles.content}>
          {type && (
            <div className={styles.typeContainer}>
              <Badge label={type} variant="default" />
            </div>
          )}

          <h3 className={styles.title}>{highlightSearchText(title)}</h3>

          <p className={styles.description}>{highlightSearchText(description)}</p>
        </div>
      </Link>

      {tags.length > 0 && (
        <div className={styles.tagsContainer}>
          {tags.map(tag => (
            <Badge
              key={tag}
              label={tag}
              variant={activeTags.includes(tag) ? 'success' : 'default'}
            />
          ))}
        </div>
      )}

      {(author || date) && (
        <div className={styles.meta}>{author && date && `${author} | ${date}`}</div>
      )}
    </article>
  )
}
