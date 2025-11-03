import React, { useEffect, useRef } from 'react'
import styles from '../CopyPageButton/CopyPageButton.module.css'

export default function DocH1CopyPageWrapper() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Find H1 within doc pages
    const h1 = document.querySelector('article h1')
    if (!h1) return

    // Avoid double-wrapping
    if (h1.parentElement?.classList.contains(styles.h1Wrapper)) return

    const wrapper = document.createElement('div')
    wrapper.className = styles.h1Wrapper

    // Insert wrapper before H1 and move H1 inside
    h1.parentNode.insertBefore(wrapper, h1)
    wrapper.appendChild(h1)

    // Move the copy button container into wrapper if present
    const btnContainer = document.querySelector('[data-copy-button]')
    if (btnContainer) {
      wrapper.appendChild(btnContainer)
    }
  }, [])

  // This component only performs DOM positioning; it renders nothing
  return <div ref={containerRef} style={{ display: 'none' }} />
}


