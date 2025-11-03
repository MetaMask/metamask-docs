/**
 * DocH1CopyPageWrapper
 *
 * Purpose:
 * - Positions the CopyPageButton next to the document H1 on docs pages.
 *
 * Rationale:
 * - Keeps CopyPageButton focused on presentation + markdown extraction only.
 * - Avoids doc-vs-tutorial branching or DOM mutations inside the button.
 * - Runs only on Doc pages (wired in DocItem/Layout), so timing/targets are reliable.
 *
 * Behavior:
 * - Wraps the first `article h1` in a container and moves the button into it.
 * - Enables absolute positioning via CSS without affecting tutorials.
 * - No UI is rendered; this component only performs safe DOM positioning and
 *   guards against double wrapping.
 */
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


