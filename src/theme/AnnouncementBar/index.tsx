import React from 'react'
import { useLocation } from '@docusaurus/router'

export default function AnnouncementBar(): JSX.Element | null {
  const location = useLocation()
  
  // Show on smart-accounts-kit paths or main/homepage
  const isSmartAccountsKitPath = location.pathname.includes('/smart-accounts-kit')
  const isMainPath = location.pathname === '/'

  const isValidPath = isSmartAccountsKitPath || isMainPath

  if (!isValidPath) {
    return null
  }

  return (
    <div className="theme-announcement-bar" role="banner" data-announcement-bar="true">
      <div style={{ textAlign: 'center' }}>
        <strong>Delegation Toolkit is now renamed to Smart Accounts Kit.</strong>
      </div>
    </div>
  )
}
