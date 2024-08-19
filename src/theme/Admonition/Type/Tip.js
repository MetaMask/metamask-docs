import React from 'react'
import Tip from '@theme-original/Admonition/Type/Tip'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'

export default function TipWrapper(props) {
  return (
    <>
      <CutOffCorners size="m">
        <Tip {...props} />
      </CutOffCorners>
    </>
  )
}
