import React from "react";

const parseLists = (text: string) => {
  const lines = text.split('\n');
  let result = '';
  let inList = false;
  let inSubList = false;

  lines.forEach((line) => {
    const trimmed = line.trim();
    const isListItem = trimmed.startsWith('- ');
    const isSubListItem = line.startsWith('  - ');

    if (isListItem && !isSubListItem) {
      if (!inList) {
        result += '<ul>\n';
        inList = true;
      } else if (inSubList) {
        result += '</ul>\n';
        inSubList = false;
      }
      result += `<li>${trimmed.slice(2).trim()}</li>\n`;
    } else if (isSubListItem) {
      if (!inSubList) {
        result = result.replace(/<\/li>\n$/, '');
        result += '<ul>\n';
        inSubList = true;
      }
      result += `<li>${trimmed.slice(4).trim()}</li>\n`;
    } else {
      if (inSubList) {
        result += '</ul>\n';
        inSubList = false;
      }
      if (inList) {
        result += '</ul>\n';
        inList = false;
      }
      result += `${line}\n`;
    }
  });
  if (inSubList) result += '</ul>\n';
  if (inList) result += '</ul>\n';
  return result;
}

const parseMarkdown = (content: string) => {
  return parseLists(
    content
      .replace(/\[(.*?)\]\((.*?)\)/g, (match, text, url) => {
        const isExternal = /^(https?:\/\/)/.test(url);
        const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${url}"${targetAttr}>${text}</a>`;
      })
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
  );
};

interface MDContentProps {
  content?: string;
}

export const MDContent = ({ content = "" }: MDContentProps) => (
  <span dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />
);
