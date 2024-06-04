import React from "react";

const parseMarkdown = (content: string) => {
  return content
    .replace(/\[(.*?)\]\((.*?)\)/g, "<a href=\"$2\">$1</a>")
    .replace(/`(.*?)`/g, "<code>$1</code>");
};

// eslint-disable-next-line react/prop-types
export const MDContent = ({ content = "" }) => (
  <span dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />
);
