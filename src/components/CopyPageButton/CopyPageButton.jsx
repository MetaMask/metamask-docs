import React, { useState, useEffect, useRef } from 'react';
import styles from './CopyPageButton.module.css';

export default function CopyPageButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);

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

  useEffect(() => {
    // Find the H1 element and wrap it with positioning
    const h1 = document.querySelector('article h1');
    if (!h1 || h1.parentElement?.classList.contains(styles.h1Wrapper)) {
      return;
    }

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = styles.h1Wrapper;

    // Insert wrapper before H1
    h1.parentNode.insertBefore(wrapper, h1);
    
    // Move H1 into wrapper
    wrapper.appendChild(h1);
    
    // Move this button container into wrapper
    if (containerRef.current) {
      wrapper.appendChild(containerRef.current);
    }
  }, []);

  const handleCopyMarkdown = async () => {
    try {
      // Get the main article content
      const article = document.querySelector('article');
      if (!article) return;

      // Get the page title
      const title = document.querySelector('h1')?.textContent || 'Documentation';

      // Extract text content from the article
      let markdown = `# ${title}\n\n`;

      // Helper to decode HTML entities
      const decodeHTML = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
      };

      // Helper to extract text with inline code
      const extractText = (element) => {
        let result = '';
        element.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            result += node.textContent;
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Handle inline code
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
              result += extractText(node);
            }
          }
        });
        return result;
      };

      // Get all content sections
      const sections = article.querySelectorAll('h2, h3, h4, p, ul, ol, pre, blockquote');
      const sectionsArray = Array.from(sections);
      
      sections.forEach(section => {
        const tag = section.tagName.toLowerCase();

        // Skip hidden tab panels
        if (section.hidden || section.closest('[hidden]')) {
          return;
        }
        
        // Skip elements inside tab buttons/navigation
        if (section.closest('[role="tablist"]')) {
          return;
        }
        
        // Skip elements that are nested inside other sections we'll process
        // For example, skip <p> or <pre> if they're inside an <ol>/<ul> we'll handle
        if (tag === 'p' || tag === 'pre' || tag === 'blockquote') {
          const parentList = section.closest('ol, ul');
          if (parentList && sectionsArray.includes(parentList)) {
            return; // Skip, we'll get this when we process the parent list
          }
        }
        
        // Skip elements inside closed details
        const parentDetails = section.closest('details');
        if (parentDetails && !parentDetails.open) {
          return;
        }

        if (tag === 'h2') {
          const text = decodeHTML(section.innerHTML).replace(/<[^>]+>/g, '').trim();
          markdown += `\n## ${text}\n\n`;
        } else if (tag === 'h3') {
          const text = decodeHTML(section.innerHTML).replace(/<[^>]+>/g, '').trim();
          markdown += `\n### ${text}\n\n`;
        } else if (tag === 'h4') {
          const text = decodeHTML(section.innerHTML).replace(/<[^>]+>/g, '').trim();
          markdown += `\n#### ${text}\n\n`;
        } else if (tag === 'pre') {
          // Use innerText to get the formatted code as displayed
          const codeElement = section.querySelector('code');
          if (codeElement) {
            // Get language from class
            const languageClass = codeElement.className.match(/language-(\w+)/);
            const language = languageClass ? languageClass[1] : '';
            const code = codeElement.innerText;
            markdown += `\`\`\`${language}\n${code}\n\`\`\`\n\n`;
          } else {
            markdown += `\`\`\`\n${section.innerText}\n\`\`\`\n\n`;
          }
        } else if (tag === 'blockquote') {
          const text = section.textContent.trim().split('\n');
          text.forEach(line => {
            if (line.trim()) {
              markdown += `> ${line.trim()}\n`;
            }
          });
          markdown += '\n';
        } else if (tag === 'ul' || tag === 'ol') {
          const items = section.querySelectorAll(':scope > li');
          items.forEach((item, index) => {
            const prefix = tag === 'ol' ? `${index + 1}.` : '-';
            const text = extractText(item);
            markdown += `${prefix} ${text.trim()}\n`;
          });
          markdown += '\n';
        } else if (tag === 'p') {
          const text = extractText(section);
          if (text.trim() && text.trim() !== 'Copy') {
            markdown += `${text.trim()}\n\n`;
          }
        }
      });

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
      // Get the main article content
      const article = document.querySelector('article');
      if (!article) return;

      // Get the page title
      const title = document.querySelector('h1')?.textContent || 'Documentation';

      // Extract text content from the article
      let markdown = `# ${title}\n\n`;

      // Helper to decode HTML entities
      const decodeHTML = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
      };

      // Helper to extract text with inline code
      const extractText = (element) => {
        let result = '';
        element.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            result += node.textContent;
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Handle inline code
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
              result += extractText(node);
            }
          }
        });
        return result;
      };

      // Get all content sections
      const sections = article.querySelectorAll('h2, h3, h4, p, ul, ol, pre, blockquote');
      const sectionsArray = Array.from(sections);
      
      sections.forEach(section => {
        const tag = section.tagName.toLowerCase();

        // Skip hidden tab panels
        if (section.hidden || section.closest('[hidden]')) {
          return;
        }
        
        // Skip elements inside tab buttons/navigation
        if (section.closest('[role="tablist"]')) {
          return;
        }
        
        // Skip elements that are nested inside other sections we'll process
        // For example, skip <p> or <pre> if they're inside an <ol>/<ul> we'll handle
        if (tag === 'p' || tag === 'pre' || tag === 'blockquote') {
          const parentList = section.closest('ol, ul');
          if (parentList && sectionsArray.includes(parentList)) {
            return; // Skip, we'll get this when we process the parent list
          }
        }
        
        // Skip elements inside closed details
        const parentDetails = section.closest('details');
        if (parentDetails && !parentDetails.open) {
          return;
        }

        if (tag === 'h2') {
          const text = decodeHTML(section.innerHTML).replace(/<[^>]+>/g, '').trim();
          markdown += `\n## ${text}\n\n`;
        } else if (tag === 'h3') {
          const text = decodeHTML(section.innerHTML).replace(/<[^>]+>/g, '').trim();
          markdown += `\n### ${text}\n\n`;
        } else if (tag === 'h4') {
          const text = decodeHTML(section.innerHTML).replace(/<[^>]+>/g, '').trim();
          markdown += `\n#### ${text}\n\n`;
        } else if (tag === 'pre') {
          // Use innerText to get the formatted code as displayed
          const codeElement = section.querySelector('code');
          if (codeElement) {
            // Get language from class
            const languageClass = codeElement.className.match(/language-(\w+)/);
            const language = languageClass ? languageClass[1] : '';
            const code = codeElement.innerText;
            markdown += `\`\`\`${language}\n${code}\n\`\`\`\n\n`;
          } else {
            markdown += `\`\`\`\n${section.innerText}\n\`\`\`\n\n`;
          }
        } else if (tag === 'blockquote') {
          const text = section.textContent.trim().split('\n');
          text.forEach(line => {
            if (line.trim()) {
              markdown += `> ${line.trim()}\n`;
            }
          });
          markdown += '\n';
        } else if (tag === 'ul' || tag === 'ol') {
          const items = section.querySelectorAll(':scope > li');
          items.forEach((item, index) => {
            const prefix = tag === 'ol' ? `${index + 1}.` : '-';
            const text = extractText(item);
            markdown += `${prefix} ${text.trim()}\n`;
          });
          markdown += '\n';
        } else if (tag === 'p') {
          const text = extractText(section);
          if (text.trim() && text.trim() !== 'Copy') {
            markdown += `${text.trim()}\n\n`;
          }
        }
      });

      // Open in new window with escaped HTML
      const win = window.open('', '_blank');
      const escapedMarkdown = markdown
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      win.document.write(`<pre style="white-space: pre-wrap; word-wrap: break-word; font-family: monospace; padding: 20px;">${escapedMarkdown}</pre>`);
    } catch (err) {
      console.error('Failed to view markdown:', err);
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
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
        <div className={styles.dropdown}>
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

