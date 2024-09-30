import React from "react";

const parseLists = (content: string) => {
  const lines = content.split('\n');
  let result = '';
  let isFirstLevelOpen = false;
  let isSecondLevelOpen = false;
  lines.forEach((line) => {
    if (line.match(/^ {2}-\s+/)) {
      if (!isSecondLevelOpen) {
        result += '<ul>';
        isSecondLevelOpen = true;
      }
      result += `<li>${line.trim().substring(4)}</li>`;
    } else if (line.match(/^ -\s+/)) {
      if (isSecondLevelOpen) {
        result += '</ul>';
        isSecondLevelOpen = false;
      }
      if (!isFirstLevelOpen) {
        result += '<ul>';
        isFirstLevelOpen = true;
      }
      result += `<li>${line.trim().substring(2)}</li>`;
    } else {
      if (isSecondLevelOpen) {
        result += '</ul>';
        isSecondLevelOpen = false;
      }
      if (isFirstLevelOpen) {
        result += '</ul>';
        isFirstLevelOpen = false;
      }
      result += line;
    }
  });
  if (isSecondLevelOpen) result += '</ul>';
  if (isFirstLevelOpen) result += '</ul>';
  return result;
};

const parseMarkdown = (content: string) => {
  return parseLists(
    content
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  );
};

interface MDContentProps {
  content?: string;
}

export const MDContent = ({ content = "" }: MDContentProps) => (
  <span dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />
);
