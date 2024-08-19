import React from 'react'
import Layout from '@theme-original/Admonition/Layout'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'

export default function LayoutWrapper(props) {
  return (
    <>
      <CutOffCorners size="m">
        <Layout {...props} />
      </CutOffCorners>
    </>
  )
}
