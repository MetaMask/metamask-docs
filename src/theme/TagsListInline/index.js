import React from "react"
import TagsListInline from "@theme-original/TagsListInline"

export default function TagsListInlineWrapper(props) {
  const wrapperStyle = { fontSize: "0.85rem" }

  return (
    <div style={wrapperStyle}>
      <TagsListInline {...props} />
    </div>
  )
}
