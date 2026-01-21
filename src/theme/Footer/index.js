import React, { useEffect, useState } from 'react'
import Footer from '@theme-original/Footer'
import { Intercom } from '@intercom/messenger-js-sdk'
import useIsBrowser from '@docusaurus/useIsBrowser'

export default function FooterWrapper(props) {
  const [canShowFooter, setCanShowFooter] = useState(true)

  useEffect(() => {
    const handleManageCookie = () => {
      window.Osano.cm.showDrawer('osano-cm-dom-info-dialog-open')
    }
    const cookieBtn = document.getElementById('manage-cookie-btn')
    if (!cookieBtn) return
    cookieBtn.addEventListener('click', handleManageCookie)

    return () => {
      cookieBtn.removeEventListener('click', handleManageCookie)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // check if footer can be shown
      const path = window.location.pathname
      if (path.includes('quickstart')) {
        setCanShowFooter(false)
      }
    }
  }, [])

  const isBrowser = useIsBrowser()
  const isProd = process.env.NODE_ENV === 'production'
  if (isBrowser && isProd) {
    Intercom({
      app_id: 'txttgas6',
    })
  }

  if (!canShowFooter) return null

  return (
    <>
      <Footer {...props} />
    </>
  )
}
