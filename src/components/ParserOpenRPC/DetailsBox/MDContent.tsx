import React from "react";

const parseMarkdown = (content: string) => {
  return content
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    .replace(/`(.*?)`/g, "<code>$1</code>");
};

interface MDContentProps {
  content?: string;
}

export const MDContent = ({ content = "" }: MDContentProps) => (
  <span dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />
);
