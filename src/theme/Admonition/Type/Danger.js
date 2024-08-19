import React from 'react'
import Danger from '@theme-original/Admonition/Type/Danger'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'

export default function DangerWrapper(props) {
  return (
    <>
      <CutOffCorners size="m">
        <Danger {...props} />
      </CutOffCorners>
    </>
  )
}
