import React from 'react'
import Note from '@theme-original/Admonition/Type/Note'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'

export default function NoteWrapper(props) {
  return (
    <>
      <CutOffCorners size="m">
        <Note {...props} />
      </CutOffCorners>
    </>
  )
}
