import { useEffect, useState } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

const DISCOURSE_URL = 'https://builder.metamask.io'

export default function DiscourseComment(props) {
  // eslint-disable-next-line react/prop-types
  const { postUrl, discourseTopicId, metadata = {} } = props
  const { siteConfig } = useDocusaurusContext()
  const { customFields } = siteConfig

  const DISCOURSE_API_KEY = customFields.DISCOURSE_API_KEY
  const DISCOURSE_API_USERNAME = customFields.DISCOURSE_API_USERNAME || 'system'
  const DISCOURSE_CATEGORY_ID = customFields.DISCOURSE_CATEGORY_ID || '11'

  const [topicId, setTopicId] = useState(discourseTopicId)

  // Utility function to ensure consistent URL formatting
  const normalizeEmbedUrl = url => {
    if (url.startsWith('http')) {
      return url.replace('https://metamask.io', 'https://docs.metamask.io')
    }
    return `https://docs.metamask.io${url}`
  }

  // Search for existing topic by URL using Discourse search API
  const searchExistingTopic = async url => {
    try {
      const embedUrl = normalizeEmbedUrl(url)

      // Try direct embed URL lookup first (most reliable)
      try {
        const response = await fetch(
          `${DISCOURSE_URL}/t/by-embed-url.json?embed_url=${encodeURIComponent(embedUrl)}&api_key=${DISCOURSE_API_KEY}&api_username=${DISCOURSE_API_USERNAME}`
        )
        if (response.ok) {
          const topic = await response.json()
          if (topic.id) return topic.id
        }
      } catch (e) {
        // Silent failure, try search methods
      }

      // Fallback search methods
      const searchMethods = [
        // Method 1: Search by exact URL
        () =>
          fetch(
            `${DISCOURSE_URL}/search.json?q=${encodeURIComponent(embedUrl)}&api_key=${DISCOURSE_API_KEY}&api_username=${DISCOURSE_API_USERNAME}`
          ),
        // Method 2: Search by tutorial title + category
        () =>
          fetch(
            `${DISCOURSE_URL}/search.json?q=${encodeURIComponent(metadata.title || '')}%20category:${DISCOURSE_CATEGORY_ID}&api_key=${DISCOURSE_API_KEY}&api_username=${DISCOURSE_API_USERNAME}`
          ),
        // Method 3: Search by URL path only
        () =>
          fetch(
            `${DISCOURSE_URL}/search.json?q=${encodeURIComponent(url.replace(/^https?:\/\/[^\/]+/, ''))}&api_key=${DISCOURSE_API_KEY}&api_username=${DISCOURSE_API_USERNAME}`
          ),
      ]

      for (let i = 0; i < searchMethods.length; i++) {
        try {
          const response = await searchMethods[i]()

          if (response.ok) {
            const data = await response.json()

            // Look for topics that match our criteria
            const matchingTopic = data.topics?.find(topic => {
              // Normalize titles for comparison (remove special chars, lowercase, trim)
              const normalizeTitle = str =>
                str?.toLowerCase().replace(/[|:]/g, ' ').replace(/\s+/g, ' ').trim() || ''

              const topicTitleNorm = normalizeTitle(topic.title)
              const metaTitleNorm = normalizeTitle(metadata.title)

              // Check if titles share significant words (at least 50% overlap)
              const topicWords = new Set(topicTitleNorm.split(' ').filter(w => w.length > 3))
              const metaWords = new Set(metaTitleNorm.split(' ').filter(w => w.length > 3))
              const commonWords = [...topicWords].filter(w => metaWords.has(w))
              const wordOverlap =
                topicWords.size > 0 && metaWords.size > 0
                  ? commonWords.length / Math.min(topicWords.size, metaWords.size)
                  : 0

              const titleMatch =
                wordOverlap > 0.5 ||
                topicTitleNorm.includes(metaTitleNorm) ||
                metaTitleNorm.includes(topicTitleNorm)
              const excerptMatch = topic.excerpt?.includes(embedUrl) || topic.excerpt?.includes(url)
              const categoryMatch = topic.category_id === parseInt(DISCOURSE_CATEGORY_ID)

              return categoryMatch && (titleMatch || excerptMatch)
            })

            if (matchingTopic) {
              return matchingTopic.id
            }
          }
        } catch (e) {
          // Silent failure
        }
      }

      return null
    } catch (e) {
      return null
    }
  }

  // Clean, minimal embed loading
  const loadCleanEmbed = topicId => {
    if (!topicId) return // Show nothing if no topic

    // Clean up any existing embed
    const existingScript = document.querySelector('script[src*="embed.js"]')
    if (existingScript) {
      existingScript.remove()
    }

    const existingComments = document.getElementById('discourse-comments')
    if (existingComments) {
      existingComments.innerHTML = ''
    }

    // Clean, minimal embed setup
    window.DiscourseEmbed = {
      discourseUrl: `${DISCOURSE_URL}/`,
      discourseEmbedUrl: normalizeEmbedUrl(postUrl),
      topicId: topicId,
    }

    // Load embed script without monitoring or error handling
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = `${DISCOURSE_URL}/javascripts/embed.js`

    const targetElement =
      document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]
    targetElement.appendChild(script)
  }

  // Find discussion topic (simplified)
  const findDiscussionTopic = async () => {
    // 1. Use provided topicId if available
    if (discourseTopicId) return discourseTopicId

    // 2. Search for existing topic (silent)
    if (DISCOURSE_API_KEY) {
      try {
        return await searchExistingTopic(postUrl)
      } catch (e) {
        // Silent failure
        return null
      }
    }

    return null
  }

  // Main effect to handle topic loading
  useEffect(() => {
    const initializeEmbed = async () => {
      const foundTopicId = await findDiscussionTopic()
      setTopicId(foundTopicId)
      loadCleanEmbed(foundTopicId)
    }

    initializeEmbed()
  }, [postUrl, discourseTopicId, DISCOURSE_API_KEY])

  // Minimal component return - just the comments div
  return <div id="discourse-comments" />
}
