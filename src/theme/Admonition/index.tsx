import React from 'react'
import Admonition from '@theme-original/Admonition'
import { Props as AdmonitionPropsRaw } from '@theme/Admonition'
import Link from '@docusaurus/Link'
import type { WrapperProps } from '@docusaurus/types'

import FlaskIcon from './flask-icon.svg'
import './index.css'

type AdmonitionProps = Omit<AdmonitionPropsRaw, 'type'> & {
  type: AdmonitionPropsRaw['type'] | 'flaskOnly'
}

declare function AdmonitionComponent(props: AdmonitionProps): JSX.Element

type Props = WrapperProps<typeof AdmonitionComponent>

export default function AdmonitionWrapper(props: Props): JSX.Element {
  if (props.type === 'flaskOnly') {
    return (
      <>
        {/* @ts-ignore */}
        <Admonition {...props} icon={<FlaskIcon />} title="Flask Only">
          This feature is experimental and only available in{' '}
          <Link href="https://docs.metamask.io/snaps/get-started/install-flask/">
            MetaMask Flask
          </Link>
          , the canary distribution of MetaMask.
        </Admonition>
      </>
    )
  }
  return (
    <>
      <Admonition {...props} />
    </>
  )
}
