import React from 'react'
import { useLocation } from '@docusaurus/router'

export default function AnnouncementBar(): JSX.Element | null {
  const location = useLocation()
  
  return (
    <div className="theme-announcement-bar" role="banner" data-announcement-bar="true">
      <div style={{ textAlign: 'center' }}>
        <strong style={{ fontWeight: 700 }}>MetaMask SDK</strong> has been replaced by <strong style={{ fontWeight: 700 }}>MetaMask Connect</strong>. One integration for EVM, Solana, and more networks coming soon. <a href="/sdk">Learn more</a>.
      </div>
    </div>
  )
}
