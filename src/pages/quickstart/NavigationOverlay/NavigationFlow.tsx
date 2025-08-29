import React, { useState } from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import { useColorMode } from '@docusaurus/theme-common'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'
import Button from '@site/src/components/elements/buttons/button'
import SvgStar from '@site/static/img/icons/star.svg'
import Shape from '@site/static/img/shapes/intro-cards/shape.svg'
import styles from './NavigationOverlay.module.css'
import { METAMASK_SDK, EMBEDDED_WALLETS } from '../builder/choices'

interface NavigationOption {
  id: string
  title: string
  description: string
  product?: string
  link?: string
}

interface NavigationFlowProps {
  onSelect: (product: string) => void
}

const navigationOptions: NavigationOption[] = [
  {
    id: 'mm-sdk',
    title: "I want to connect to users' MetaMask wallets",
    description: 'MetaMask SDK',
    product: METAMASK_SDK,
  },
  {
    id: 'embedded-wallets-1',
    title: 'I want to create wallets inside my dapp',
    description: 'Embedded Wallets SDK',
    product: EMBEDDED_WALLETS,
  },
  {
    id: 'embedded-wallets-2',
    title: 'I want a wallet aggregator for my dapp',
    description: 'Embedded Wallets SDK',
    product: EMBEDDED_WALLETS,
  },
  {
    id: 'delegation-toolkit-1',
    title: 'I want to send gasless transactions',
    description: 'Delegation Toolkit',
    link: '/delegation-toolkit/development/guides/smart-accounts/send-gasless-transaction',
  },
  {
    id: 'delegation-toolkit-2',
    title: 'I want to perform executions on behalf of users',
    description: 'Delegation Toolkit',
    link: '/delegation-toolkit/development/guides/delegation/execute-on-smart-accounts-behalf',
  },
  {
    id: 'delegation-toolkit-3',
    title: 'I want to convert EOAs to smart accounts',
    description: 'Delegation Toolkit',
    link: '/delegation-toolkit/development/get-started/smart-account-quickstart/eip7702',
  },
]

const NavigationFlow: React.FC<NavigationFlowProps> = ({ onSelect }) => {
  const { colorMode } = useColorMode()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const handleOptionSelect = (option: NavigationOption) => {
    if (option.product) {
      onSelect(option.product)
    } else if (option.link) {
      window.location.href = option.link
    }
  }

  return (
    <div className={styles.flowContainer}>
      <div className={styles.stepHeader}>
        <Heading as="h2" className={styles.sectionTitle}>
          What do you want to do with MetaMask?
        </Heading>
        <p className={styles.sectionDescription}>
          Choose the option that best describes your project goals:
        </p>
      </div>

      <div className={styles.cardsWrapper}>
        {navigationOptions.map(option => (
          <div key={option.id} className={styles.cardColumn}>
            <div
              className={clsx(styles.cardItem, hoveredCard === option.id && styles.cardActive)}
              style={{ '--color-palette': 'var(--developer-purple)' } as React.CSSProperties}>
              <CutOffCorners size="s">
                <div
                  className={styles.cardHolder}
                  onMouseEnter={() => setHoveredCard(option.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleOptionSelect(option)}>
                  <div className={styles.cardInner}>
                    <Shape className={styles.cardShape} />

                    <div className={styles.cardHeader}>
                      <Heading as="h3" className={styles.cardTitle}>
                        {option.title}
                      </Heading>
                    </div>

                    <div className={styles.cardFooter}>
                      <p className={styles.cardDescription}>{option.description}</p>
                      <Button
                        as="button"
                        label={option.product ? 'Use Builder' : 'View Docs'}
                        type={colorMode === 'dark' ? 'secondary' : 'primary'}
                        icon="arrow-right"
                        className={styles.cardButton}
                      />
                    </div>
                  </div>
                </div>
              </CutOffCorners>
            </div>
          </div>
        ))}
      </div>

      {/* <div className={styles.quickLinks}>
        <Heading as="h4" className={styles.quickLinksTitle}>Quick Links</Heading>
        <div className={styles.linkGrid}>
          <Link href="/sdk" className={styles.quickLink}>
            📖 MetaMask SDK Docs
          </Link>
          <Link href="/wallet" className={styles.quickLink}>
            💳 Embedded Wallets Docs
          </Link>
          <Link href="/delegation-toolkit" className={styles.quickLink}>
            ⚡ Delegation Toolkit Docs
          </Link>
        </div>
      </div> */}
    </div>
  )
}

export default NavigationFlow
