import React from 'react'

export default function AnnouncementBar(): JSX.Element | null {
  return (
    <div className="theme-announcement-bar" role="banner" data-announcement-bar="true">
      <div style={{ textAlign: 'center' }}>
        <strong style={{ fontWeight: 700 }}>Infura</strong> docs have shifted to{' '}
        <a href="https://docs.infura.io/">docs.infura.io</a>.
      </div>
    </div>
  )
}
