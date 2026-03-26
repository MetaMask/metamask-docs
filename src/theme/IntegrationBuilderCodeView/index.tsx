import CodeBlock from '@theme/CodeBlock'
import classNames from 'classnames'
import path from 'path'
import { FiFile } from 'react-icons/fi'
import { useEffect, useRef } from 'react'

import styles from './styles.module.css'

interface Props {
  filenames: string[]
  fileContents: Record<string, string>
  highlight?: string
  selectedFilename: string
  onClickFilename: (filename: string) => void
}

const getDisplayName = (filename: string): string => {
  return path.basename(filename)
}

const getLanguage = (filename: string): string => {
  const ext = path.extname(filename).substr(1)

  if (
    ['jsx', 'java', 'swift', 'ts', 'tsx', 'html', 'css', 'xml', 'dart', 'json', 'cs'].includes(ext)
  )
    return `language-${ext}`
  if (ext === 'js') return 'language-jsx'
  if (ext === 'vue') return 'language-ts'
  if (ext === 'gradle') return 'language-groovy'
  if (ext === 'kt') return 'language-kotlin'
  if (ext === 'plist') return 'language-xml'
  if (ext === 'yaml') return 'language-yaml'
  if (ext === '') return 'language-shell'
  return undefined
}

export default function IntegrationBuilderCodeView({
  selectedFilename,
  filenames,
  fileContents,
  highlight,
  onClickFilename,
}: Props) {
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!highlight) return
    const el = bodyRef.current
    if (!el) return

    // Wait one frame for CodeBlock to finish rendering the new content
    requestAnimationFrame(() => {
      const highlightedLine = el.querySelector(
        '.theme-code-block-highlighted-line, .code-focus'
      ) as HTMLElement | null

      if (highlightedLine) {
        const containerHeight = el.clientHeight
        const lineTop = highlightedLine.offsetTop
        const target = Math.max(lineTop - containerHeight / 3, 0)
        el.scrollTo({ top: target, behavior: 'smooth' })
      }
    })
  }, [highlight])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ul
          className={classNames('tabs', styles.codeTabs)}
          role="tablist"
          aria-orientation="horizontal">
          {filenames.map(filename => (
            <li
              key={filename}
              className={classNames('tabs__item', {
                'tabs__item--active': filename === selectedFilename,
              })}
              role="tab"
              onClick={onClickFilename.bind(this, filename)}
              onKeyDown={onClickFilename.bind(this, filename)}>
              <FiFile />
              <span>{getDisplayName(filename.replace('-', '-\u2060'))}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.body} ref={bodyRef}>
        <CodeBlock className={getLanguage(selectedFilename)}>
          {fileContents[selectedFilename]}
        </CodeBlock>
      </div>
    </div>
  )
}
