/*
  This component allows MM to provide rpc urls with a no follow so that tools such as ahref dont 
  tripper http 404s on urls that support api requests. It provides a copy option to allow users
  to grab the url without right-click.
*/

import React, { useState, useCallback } from 'react'
import styles from './styles.module.css'

type CopyableNoFollowProps = {
  url: string
  /** Optional link text; defaults to url */
  children?: React.ReactNode
}

export default function CopyableNoFollow({ url, children }: CopyableNoFollowProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [url])

  return (
    <span className={styles.wrapper}>
      <a href={url} rel="nofollow" target="_blank">
        {children ?? url}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className={styles.copyButton}
        title={copied ? 'Copied!' : 'Copy URL'}
        aria-label={copied ? 'Copied!' : 'Copy URL'}>
        {copied ? (
          <span className={styles.copied}>Copied!</span>
        ) : (
          <svg
            className={styles.icon}
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden>
            <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z" />
            <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
          </svg>
        )}
      </button>
    </span>
  )
}
