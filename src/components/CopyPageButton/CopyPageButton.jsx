import React, { useState, useEffect, useRef } from 'react'
import styles from './CopyPageButton.module.css'

// Helpers shared by both actions
const decodeHTML = html => {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

const extractInlineText = element => {
  let result = ''
  element.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      result += node.textContent
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'CODE' && node.parentElement.tagName !== 'PRE') {
        result += `\`${decodeHTML(node.innerHTML)}\``
      } else if (node.tagName === 'STRONG' || node.tagName === 'B') {
        result += `**${node.textContent}**`
      } else if (node.tagName === 'EM' || node.tagName === 'I') {
        result += `*${node.textContent}*`
      } else if (node.tagName === 'A') {
        result += `[${node.textContent}](${node.href})`
      } else if (node.tagName === 'BR') {
        result += '\n'
      } else {
        result += extractInlineText(node)
      }
    }
  })
  return result
}

const shouldSkipSection = (section, sectionsArray) => {
  const tag = section.tagName.toLowerCase()
  // Hidden (tabs/details)
  if (section.hidden || section.closest('[hidden]')) return true
  // Tab navigation
  if (section.closest('[role="tablist"]')) return true
  // Nested inside lists – will be handled by parent list
  if (tag === 'p' || tag === 'pre' || tag === 'blockquote' || tag === 'table') {
    const parentList = section.closest('ol, ul')
    if (parentList && sectionsArray.includes(parentList)) return true
  }
  // Closed details
  const parentDetails = section.closest('details')
  if (parentDetails && !parentDetails.open) return true
  return false
}

const tableToMarkdown = tableEl => {
  // Build Markdown table: header row + separator + body rows
  const rows = Array.from(
    tableEl.querySelectorAll(':scope > thead > tr, :scope > tbody > tr, :scope > tr')
  )
  if (rows.length === 0) return ''

  const firstRowCells = Array.from(rows[0].querySelectorAll('th, td'))
  const headers = firstRowCells.map(cell => cell.textContent.trim())
  let md = ''

  if (headers.length > 0) {
    md += `| ${headers.join(' | ')} |\n`
    md += `| ${headers.map(() => '---').join(' | ')} |\n`
  }

  const bodyRows = rows.slice(1)
  bodyRows.forEach(tr => {
    const cells = Array.from(tr.querySelectorAll('th, td')).map(td => td.textContent.trim())
    md += `| ${cells.join(' | ')} |\n`
  })

  return `${md}\n`
}

const getContentRoot = () =>
  document.querySelector('article') || document.querySelector('.markdown')

const buildMarkdown = () => {
  const root = getContentRoot()
  if (!root) return ''

  const title = document.querySelector('h1')?.textContent || 'Documentation'
  let markdown = `# ${title}\n\n`

  const sections = root.querySelectorAll('h2, h3, h4, p, ul, ol, pre, blockquote, table')
  const sectionsArray = Array.from(sections)

  sectionsArray.forEach(section => {
    if (shouldSkipSection(section, sectionsArray)) return
    const tag = section.tagName.toLowerCase()

    if (tag === 'h2') {
      const text = (section.textContent || '').trim()
      markdown += `\n## ${text}\n\n`
      return
    }
    if (tag === 'h3') {
      const text = (section.textContent || '').trim()
      markdown += `\n### ${text}\n\n`
      return
    }
    if (tag === 'h4') {
      const text = (section.textContent || '').trim()
      markdown += `\n#### ${text}\n\n`
      return
    }
    if (tag === 'pre') {
      const codeElement = section.querySelector('code')
      if (codeElement) {
        const languageClass = codeElement.className.match(/language-(\w+)/)
        const language = languageClass ? languageClass[1] : ''
        const code = codeElement.innerText
        markdown += `\`\`\`${language}\n${code}\n\`\`\`\n\n`
      } else {
        markdown += `\`\`\`\n${section.innerText}\n\`\`\`\n\n`
      }
      return
    }
    if (tag === 'blockquote') {
      const lines = section.textContent.trim().split('\n')
      lines.forEach(line => {
        if (line.trim()) markdown += `> ${line.trim()}\n`
      })
      markdown += '\n'
      return
    }
    if (tag === 'ul' || tag === 'ol') {
      const items = section.querySelectorAll(':scope > li')
      items.forEach((item, index) => {
        const prefix = tag === 'ol' ? `${index + 1}.` : '-'
        const text = extractInlineText(item)
        markdown += `${prefix} ${text.trim()}\n`
      })
      markdown += '\n'
      return
    }
    if (tag === 'p') {
      const text = extractInlineText(section)
      if (text.trim() && text.trim() !== 'Copy') markdown += `${text.trim()}\n\n`
      return
    }
    if (tag === 'table') {
      markdown += tableToMarkdown(section)
      return
    }
  })

  return markdown
}

const MAX_URL_LENGTH = 12000

const openInAiTool = async (baseUrl, flashCopiedFn, toolId) => {
  const markdown = buildMarkdown()
  if (!markdown) return

  const prompt = `Help me with the following documentation page (${window.location.href}):\n\n${markdown}`
  const fullUrl = `${baseUrl}${encodeURIComponent(prompt)}`

  if (fullUrl.length <= MAX_URL_LENGTH) {
    window.open(fullUrl, '_blank')
  } else {
    try {
      await navigator.clipboard.writeText(markdown)
      const shortPrompt = `Help me with this documentation page: ${window.location.href}\n\n(The full page content has been copied to my clipboard and I will paste it below.)`
      window.open(`${baseUrl}${encodeURIComponent(shortPrompt)}`, '_blank')
      flashCopiedFn?.(toolId)
    } catch {
      const shortPrompt = `Help me with this documentation page: ${window.location.href}`
      window.open(`${baseUrl}${encodeURIComponent(shortPrompt)}`, '_blank')
    }
  }
}

const ExternalArrow = () => (
  <svg
    className={styles.externalArrow}
    width="10"
    height="10"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5">
    <path d="M3.5 2H10V8.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 2L2 10" strokeLinecap="round" />
  </svg>
)

export default function CopyPageButton({ standalone = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const [mobileAlign, setMobileAlign] = useState('center')

  useEffect(() => {
    const handleClickOutside = event => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const compute = () => {
      const container = containerRef.current
      const menu = dropdownRef.current
      if (!container || !menu) return
      const vw = window.innerWidth
      const cr = container.getBoundingClientRect()
      const mr = menu.getBoundingClientRect()
      const centerX = cr.left + cr.width / 2
      const margin = 8
      const half = mr.width / 2
      if (centerX + half > vw - margin) {
        setMobileAlign('right')
      } else if (centerX - half < margin) {
        setMobileAlign('left')
      } else {
        setMobileAlign('center')
      }
    }
    const id = requestAnimationFrame(compute)
    return () => cancelAnimationFrame(id)
  }, [isOpen])

  const flashCopied = id => {
    setCopiedId(id)
    const delay = id.startsWith('ai-') ? 3000 : 2000
    setTimeout(() => {
      setCopiedId(null)
      setIsOpen(false)
    }, delay)
  }

  const handleCopyMarkdown = async () => {
    try {
      const markdown = buildMarkdown()
      if (!markdown) return
      await navigator.clipboard.writeText(markdown)
      flashCopied('copy')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleViewMarkdown = () => {
    try {
      const markdown = buildMarkdown()
      if (!markdown) return
      const win = window.open('', '_blank')
      const escaped = markdown.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      win.document.write(
        `<pre style="white-space: pre-wrap; word-wrap: break-word; font-family: monospace; padding: 20px;">${escaped}</pre>`
      )
    } catch (err) {
      console.error('Failed to view markdown:', err)
    }
  }

  return (
    <div
      className={`${styles.container} ${standalone ? styles.standalone : ''}`}
      ref={containerRef}
      data-copy-button>
      <button
        className={styles.mainButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="AI and integration options">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
        </svg>
        <span>Open in Claude</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
          className={styles.arrow}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={
            `${styles.dropdown} ` +
            `${mobileAlign === 'right' ? styles.alignRight : mobileAlign === 'left' ? styles.alignLeft : styles.alignCenter}`
          }>
          {/* AI Tools */}
          <button
            className={styles.dropdownItem}
            onClick={() => openInAiTool('https://claude.ai/new?q=', flashCopied, 'ai-claude')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
            </svg>
            <div>
              <div className={styles.itemTitleRow}>
                <span className={styles.itemTitle}>Open in Claude</span>
                <ExternalArrow />
              </div>
              <div className={styles.itemDescription}>
                {copiedId === 'ai-claude'
                  ? 'Page copied — paste in chat'
                  : 'Ask questions about this page'}
              </div>
            </div>
          </button>

          <button
            className={styles.dropdownItem}
            onClick={() => openInAiTool('https://chatgpt.com/?q=', flashCopied, 'ai-chatgpt')}>
            <svg width="16" height="16" viewBox="118 120 484 480" fill="currentColor">
              <path d="M304.246 294.611V249.028C304.246 245.189 305.687 242.309 309.044 240.392L400.692 187.612C413.167 180.415 428.042 177.058 443.394 177.058C500.971 177.058 537.44 221.682 537.44 269.182C537.44 272.54 537.44 276.379 536.959 280.218L441.954 224.558C436.197 221.201 430.437 221.201 424.68 224.558L304.246 294.611ZM518.245 472.145V363.224C518.245 356.505 515.364 351.707 509.608 348.349L389.174 278.296L428.519 255.743C431.877 253.826 434.757 253.826 438.115 255.743L529.762 308.523C556.154 323.879 573.905 356.505 573.905 388.171C573.905 424.636 552.315 458.225 518.245 472.141V472.145ZM275.937 376.182L236.592 353.152C233.235 351.235 231.794 348.354 231.794 344.515V238.956C231.794 187.617 271.139 148.749 324.4 148.749C344.555 148.749 363.264 155.468 379.102 167.463L284.578 222.164C278.822 225.521 275.942 230.319 275.942 237.039V376.186L275.937 376.182ZM360.626 425.122L304.246 393.455V326.283L360.626 294.616L417.002 326.283V393.455L360.626 425.122ZM396.852 570.989C376.698 570.989 357.989 564.27 342.151 552.276L436.674 497.574C442.431 494.217 445.311 489.419 445.311 482.699V343.552L485.138 366.582C488.495 368.499 489.936 371.379 489.936 375.219V480.778C489.936 532.117 450.109 570.985 396.852 570.985V570.989ZM283.134 463.99L191.486 411.211C165.094 395.854 147.343 363.229 147.343 331.562C147.343 294.616 169.415 261.509 203.48 247.593V356.991C203.48 363.71 206.361 368.508 212.117 371.866L332.074 441.437L292.729 463.99C289.372 465.907 286.491 465.907 283.134 463.99ZM277.859 542.68C223.639 542.68 183.813 501.895 183.813 451.514C183.813 447.675 184.294 443.836 184.771 439.997L279.295 494.698C285.051 498.056 290.812 498.056 296.568 494.698L417.002 425.127V470.71C417.002 474.549 415.562 477.429 412.204 479.346L320.557 532.126C308.081 539.323 293.206 542.68 277.854 542.68H277.859ZM396.852 599.776C454.911 599.776 503.37 558.513 514.41 503.812C568.149 489.896 602.696 439.515 602.696 388.176C602.696 354.587 588.303 321.962 562.392 298.45C564.791 288.373 566.231 278.296 566.231 268.224C566.231 199.611 510.571 148.267 446.274 148.267C433.322 148.267 420.846 150.184 408.37 154.505C386.775 133.392 357.026 119.958 324.4 119.958C266.342 119.958 217.883 161.22 206.843 215.921C153.104 229.837 118.557 280.218 118.557 331.557C118.557 365.146 132.95 397.771 158.861 421.283C156.462 431.36 155.022 441.437 155.022 451.51C155.022 520.123 210.682 571.466 274.978 571.466C287.931 571.466 300.407 569.549 312.883 565.228C334.473 586.341 364.222 599.776 396.852 599.776Z" />
            </svg>
            <div>
              <div className={styles.itemTitleRow}>
                <span className={styles.itemTitle}>Open in ChatGPT</span>
                <ExternalArrow />
              </div>
              <div className={styles.itemDescription}>
                {copiedId === 'ai-chatgpt'
                  ? 'Page copied — paste in chat'
                  : 'Ask questions about this page'}
              </div>
            </div>
          </button>

          <button
            className={styles.dropdownItem}
            onClick={() =>
              openInAiTool('https://www.perplexity.ai/?q=', flashCopied, 'ai-perplexity')
            }>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z" />
            </svg>
            <div>
              <div className={styles.itemTitleRow}>
                <span className={styles.itemTitle}>Open in Perplexity</span>
                <ExternalArrow />
              </div>
              <div className={styles.itemDescription}>
                {copiedId === 'ai-perplexity'
                  ? 'Page copied — paste in chat'
                  : 'Ask questions about this page'}
              </div>
            </div>
          </button>

          <div className={styles.divider} />

          {/* Page content actions */}
          <button className={styles.dropdownItem} onClick={handleCopyMarkdown}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z" />
              <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
            </svg>
            <div>
              <div className={styles.itemTitle}>
                {copiedId === 'copy' ? 'Copied!' : 'Copy page'}
              </div>
              <div className={styles.itemDescription}>Copy page as Markdown for LLMs</div>
            </div>
          </button>

          <button className={styles.dropdownItem} onClick={handleViewMarkdown}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11A.5.5 0 0 1 8 2Z" />
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2Z" />
            </svg>
            <div>
              <div className={styles.itemTitleRow}>
                <span className={styles.itemTitle}>View as Markdown</span>
                <ExternalArrow />
              </div>
              <div className={styles.itemDescription}>View this page as plain text</div>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}
