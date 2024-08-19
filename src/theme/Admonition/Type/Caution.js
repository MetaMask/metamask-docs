import React from 'react'
import Caution from '@theme-original/Admonition/Type/Caution'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'

export default function CautionWrapper(props) {
  return (
    <>
      <CutOffCorners size="m">
        <Caution {...props} />
      </CutOffCorners>
    </>
  )
}
