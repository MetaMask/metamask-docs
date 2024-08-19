import React from 'react'
import Warning from '@theme-original/Admonition/Type/Warning'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'

export default function WarningWrapper(props) {
  return (
    <>
      <CutOffCorners size="m">
        <Warning {...props} />
      </CutOffCorners>
    </>
  )
}
