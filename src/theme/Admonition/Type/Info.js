import React from 'react'
import Info from '@theme-original/Admonition/Type/Info'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'

export default function InfoWrapper(props) {
  return (
    <>
      <CutOffCorners size="m">
        <Info {...props} />
      </CutOffCorners>
    </>
  )
}
