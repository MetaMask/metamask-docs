/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { TutorialsInterface, platformMap, productMap } from '../../utils/tutorials-map'

import { useState, useEffect } from 'react'
import SEO from '@site/src/components/SEO'
import Hero from '@site/src/components/Hero/Hero'
import Input from '@site/src/components/Input'
import TutorialCard from './TutorialCard'
import CustomSelect, { OptionType } from './CustomSelect'
import styles from './styles.module.css'

export default function Tutorials({ content = {} }: TutorialsInterface) {
  const safeContent = content || {}

  const completeTutorials = Object.entries(safeContent)
    .map(([key, value]) => {
      return { ...value, link: `/tutorials/${key}` }
    })
    .filter(Boolean)
    .sort((a: any, b: any) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      const aDate = new Date(a.date)
      const bDate = new Date(b.date)
      return +bDate - +aDate
    })

  const [searchInput, setSearchInput] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [productFilter, setProductFilter] = useState<string[]>([])
  const [platformFilter, setPlatformFilter] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState<OptionType[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<OptionType[]>([])
  const [filteredTutorials, setFilteredTutorials] = useState(completeTutorials)
  const { siteConfig } = useDocusaurusContext()
  const { baseUrl } = siteConfig

  // Apply tag filters first
  useEffect(() => {
    let filtered = completeTutorials

    if (productFilter.length > 0 || platformFilter.length > 0) {
      filtered = completeTutorials.filter(item => {
        if (!item || !item.tags || !Array.isArray(item.tags)) return false

        const prodFil =
          productFilter.length === 0 || productFilter.some(tag => item.tags.includes(tag))
        const platFil =
          platformFilter.length === 0 || platformFilter.some(tag => item.tags.includes(tag))

        return prodFil && platFil
      })
    }

    setFilteredTutorials(filtered)
  }, [productFilter, platformFilter, completeTutorials])

  const onChangeProduct = (selectedOptions: OptionType[]) => {
    const filterValue = selectedOptions ? selectedOptions.map(item => item.value) : []
    setSelectedProducts(selectedOptions)
    setProductFilter(filterValue)
    setTags([...platformFilter, ...filterValue])
  }

  const onChangePlatform = (selectedOptions: OptionType[]) => {
    const filterValue = selectedOptions ? selectedOptions.map(item => item.value) : []
    setSelectedPlatforms(selectedOptions)
    setPlatformFilter(filterValue)
    setTags([...productFilter, ...filterValue])
  }

  function highlightSearchText(text) {
    if (!searchInput.trim()) {
      return text
    }

    const searchTerms = searchInput.trim().split(/\s+/)
    const regex = new RegExp(`(${searchTerms.join('|')})`, 'gi')

    // Use replace to find matches and build result
    let lastIndex = 0
    const elements = []
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

  function onChangeSearch(input) {
    setSearchInput(input)
  }

  // Filter the already filtered tutorials based on search
  const displayedTutorials = filteredTutorials.filter(item => {
    if (!item) return false // Skip null items
    if (!searchInput.trim()) return true

    const searchTerms = searchInput.toLowerCase().trim().split(/\s+/)
    return searchTerms.every(
      term =>
        (item.title && item.title.toLowerCase().includes(term)) ||
        (item.description && item.description.toLowerCase().includes(term)) ||
        (item.tags &&
          Array.isArray(item.tags) &&
          item.tags.some(tag => tag.toLowerCase().includes(term)))
    )
  })

  // No transformation needed - we'll render TutorialCard directly

  return (
    <Layout title="Tutorials">
      <SEO
        title="Tutorials"
        description="Tutorials to integrate, customize, and build with MetaMask developer tools."
        image={`${baseUrl}img/tutorialsog.jpg`}
        slug="/tutorials"
      />

      <Hero
        title="Tutorials"
        description="Explore use cases and follow these hands-on tutorials to integrate and build with MetaMask developer tools."
      />

      <section className="container">
        <div className={styles.headerInteractionArea}>
          <div className={styles.searchArea}>
            <Input
              placeholder="Search tutorials"
              value={searchInput}
              onChange={onChangeSearch}
              className={styles.searchInput}
            />
            <div className={styles.customSelect}>
              <CustomSelect
                options={productMap}
                value={selectedProducts}
                onChange={onChangeProduct}
                placeholder="Select product"
              />
            </div>
            <div className={styles.customSelect}>
              <CustomSelect
                options={platformMap}
                value={selectedPlatforms}
                onChange={onChangePlatform}
                placeholder="Select platform"
              />
            </div>
          </div>
        </div>

        {displayedTutorials.length > 0 ? (
          <div className={styles.cardsGrid}>
            {displayedTutorials.map((item: any) => (
              <TutorialCard
                key={item.link}
                title={item.title}
                description={item.description || ''}
                link={item.link}
                image={item.image}
                tags={item.tags || []}
                author={item.author}
                date={item.date}
                searchInput={searchInput}
                activeTags={tags}
              />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <p>No results found</p>
          </div>
        )}
      </section>
    </Layout>
  )
}
