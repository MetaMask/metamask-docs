import React from 'react'
import { useLocation } from '@docusaurus/router'

export default function AnnouncementBar(): JSX.Element | null {
  const location = useLocation()

  return (
    <div className="theme-announcement-bar" role="banner" data-announcement-bar="true">
      <div style={{ textAlign: 'center' }}>
        <strong style={{ fontWeight: 700 }}>MetaMask SDK</strong> is now{' '}
        <strong style={{ fontWeight: 700 }}>MetaMask Connect</strong>. Go multichain with one
        integration across Ethereum, Solana, and additional chains as support expands.{' '}
        <a href="/metamask-connect">Get started</a>.
      </div>
    </div>
  )
}
