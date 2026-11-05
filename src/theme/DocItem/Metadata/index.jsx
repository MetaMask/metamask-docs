import React from 'react'
import { PageMetadata } from '@docusaurus/theme-common'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

// Share image for pages that don't set their own `image:`, by product section.
// Without this, every such page falls back to the site-wide card.
const SECTION_IMAGES = {
  snaps: 'img/banners/snaps.png',
  'metamask-connect': 'img/banners/metamask-connect.png',
  'smart-accounts-kit': 'img/banners/smart-accounts-kit.png',
  'embedded-wallets': 'img/banners/embedded-wallets.png',
  'agent-wallet': 'img/banners/agent-wallet.png',
}

export default function DocItemMetadata() {
  const { metadata, frontMatter, assets } = useDoc()
  const { siteConfig } = useDocusaurusContext()
  // Staging builds set a non-root baseUrl (DEST), so strip it before reading the section.
  const section = metadata.permalink.slice(siteConfig.baseUrl.length).split('/')[0]
  return (
    <PageMetadata
      title={metadata.title}
      description={metadata.description}
      keywords={frontMatter.keywords}
      image={assets.image ?? frontMatter.image ?? SECTION_IMAGES[section]}
    />
  )
}
