import React, { useState, useEffect, useRef } from 'react';
import styles from './CopyPageButton.module.css';

// Helpers shared by both actions
const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const extractInlineText = (element) => {
  let result = '';
  element.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      result += node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'CODE' && node.parentElement.tagName !== 'PRE') {
        result += `\`${decodeHTML(node.innerHTML)}\``;
      } else if (node.tagName === 'STRONG' || node.tagName === 'B') {
        result += `**${node.textContent}**`;
      } else if (node.tagName === 'EM' || node.tagName === 'I') {
        result += `*${node.textContent}*`;
      } else if (node.tagName === 'A') {
        result += `[${node.textContent}](${node.href})`;
      } else if (node.tagName === 'BR') {
        result += '\n';
      } else {
        result += extractInlineText(node);
      }
    }
  });
  return result;
};

const shouldSkipSection = (section, sectionsArray) => {
  const tag = section.tagName.toLowerCase();
  // Hidden (tabs/details)
  if (section.hidden || section.closest('[hidden]')) return true;
  // Tab navigation
  if (section.closest('[role="tablist"]')) return true;
  // Nested inside lists – will be handled by parent list
  if (tag === 'p' || tag === 'pre' || tag === 'blockquote' || tag === 'table') {
    const parentList = section.closest('ol, ul');
    if (parentList && sectionsArray.includes(parentList)) return true;
  }
  // Closed details
  const parentDetails = section.closest('details');
  if (parentDetails && !parentDetails.open) return true;
  return false;
};

const tableToMarkdown = (tableEl) => {
  // Build Markdown table: header row + separator + body rows
  const rows = Array.from(tableEl.querySelectorAll(':scope > thead > tr, :scope > tbody > tr, :scope > tr'));
  if (rows.length === 0) return '';

  const firstRowCells = Array.from(rows[0].querySelectorAll('th, td'));
  const headers = firstRowCells.map(cell => cell.textContent.trim());
  let md = '';

  if (headers.length > 0) {
    md += `| ${headers.join(' | ')} |\n`;
    md += `| ${headers.map(() => '---').join(' | ')} |\n`;
  }

  const bodyRows = rows.slice(1);
  bodyRows.forEach(tr => {
    const cells = Array.from(tr.querySelectorAll('th, td')).map(td => td.textContent.trim());
    md += `| ${cells.join(' | ')} |\n`;
  });

  return `${md}\n`;
};

const getContentRoot = () => document.querySelector('article') || document.querySelector('.markdown');

const buildMarkdown = () => {
  const root = getContentRoot();
  if (!root) return '';

  const title = document.querySelector('h1')?.textContent || 'Documentation';
  let markdown = `# ${title}\n\n`;

  const sections = root.querySelectorAll('h2, h3, h4, p, ul, ol, pre, blockquote, table');
  const sectionsArray = Array.from(sections);

  sectionsArray.forEach(section => {
    if (shouldSkipSection(section, sectionsArray)) return;
    const tag = section.tagName.toLowerCase();

    if (tag === 'h2') {
      const text = decodeHTML(section.innerHTML).replace(/<[^>]+>/g, '').trim();
      markdown += `\n## ${text}\n\n`;
      return;
    }
    if (tag === 'h3') {
      const text = decodeHTML(section.innerHTML).replace(/<[^>]+>/g, '').trim();
      markdown += `\n### ${text}\n\n`;
      return;
    }
    if (tag === 'h4') {
      const text = decodeHTML(section.innerHTML).replace(/<[^>]+>/g, '').trim();
      markdown += `\n#### ${text}\n\n`;
      return;
    }
    if (tag === 'pre') {
      const codeElement = section.querySelector('code');
      if (codeElement) {
        const languageClass = codeElement.className.match(/language-(\w+)/);
        const language = languageClass ? languageClass[1] : '';
        const code = codeElement.innerText;
        markdown += `\`\`\`${language}\n${code}\n\`\`\`\n\n`;
      } else {
        markdown += `\`\`\`\n${section.innerText}\n\`\`\`\n\n`;
      }
      return;
    }
    if (tag === 'blockquote') {
      const lines = section.textContent.trim().split('\n');
      lines.forEach(line => {
        if (line.trim()) markdown += `> ${line.trim()}\n`;
      });
      markdown += '\n';
      return;
    }
    if (tag === 'ul' || tag === 'ol') {
      const items = section.querySelectorAll(':scope > li');
      items.forEach((item, index) => {
        const prefix = tag === 'ol' ? `${index + 1}.` : '-';
        const text = extractInlineText(item);
        markdown += `${prefix} ${text.trim()}\n`;
      });
      markdown += '\n';
      return;
    }
    if (tag === 'p') {
      const text = extractInlineText(section);
      if (text.trim() && text.trim() !== 'Copy') markdown += `${text.trim()}\n\n`;
      return;
    }
    if (tag === 'table') {
      markdown += tableToMarkdown(section);
      return;
    }
  });

  return markdown;
};

export default function CopyPageButton({ standalone = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [mobileAlign, setMobileAlign] = useState('center'); // 'center' | 'left' | 'right'

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // No H1 wrapping here; handled by a separate wrapper component on doc pages

  // Compute mobile alignment when dropdown opens
  useEffect(() => {
    if (!isOpen) return;
    const compute = () => {
      const container = containerRef.current;
      const menu = dropdownRef.current;
      if (!container || !menu) return;
      const vw = window.innerWidth;
      const cr = container.getBoundingClientRect();
      const mr = menu.getBoundingClientRect();
      const centerX = cr.left + cr.width / 2;
      const margin = 8;
      // Try centered
      const half = mr.width / 2;
      if (centerX + half > vw - margin) {
        setMobileAlign('right');
      } else if (centerX - half < margin) {
        setMobileAlign('left');
      } else {
        setMobileAlign('center');
      }
    };
    // Wait for dropdown to render sizes
    const id = requestAnimationFrame(compute);
    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  const handleCopyMarkdown = async () => {
    try {
      const markdown = buildMarkdown();
      if (!markdown) return;
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleViewMarkdown = () => {
    try {
      const markdown = buildMarkdown();
      if (!markdown) return;
      const win = window.open('', '_blank');
      const escaped = markdown
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      win.document.write(`<pre style="white-space: pre-wrap; word-wrap: break-word; font-family: monospace; padding: 20px;">${escaped}</pre>`);
    } catch (err) {
      console.error('Failed to view markdown:', err);
    }
  };

  return (
    <div className={styles.container} ref={containerRef} data-copy-button>
      <button
        className={styles.mainButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Copy page options"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/>
          <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/>
        </svg>
        <span>Copy page</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className={styles.arrow}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={
            `${styles.dropdown} ` +
            `${mobileAlign === 'right' ? styles.alignRight : mobileAlign === 'left' ? styles.alignLeft : styles.alignCenter}`
          }>
          <button className={styles.dropdownItem} onClick={handleCopyMarkdown}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/>
              <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/>
            </svg>
            <div>
              <div className={styles.itemTitle}>
                {copied ? 'Copied!' : 'Copy page'}
              </div>
              <div className={styles.itemDescription}>Copy page as Markdown for LLMs</div>
            </div>
          </button>

          <button className={styles.dropdownItem} onClick={handleViewMarkdown}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11A.5.5 0 0 1 8 2Z"/>
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2Z"/>
            </svg>
            <div>
              <div className={styles.itemTitle}>View as Markdown</div>
              <div className={styles.itemDescription}>View this page as plain text</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

