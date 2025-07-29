import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { useColorMode } from '@docusaurus/theme-common';
import CutOffCorners from '@site/src/components/elements/cut-off-corners';
import Button from '@site/src/components/elements/buttons/button';
import SvgStar from '@site/static/img/icons/star.svg';
import Shape from '@site/static/img/shapes/intro-cards/shape.svg';
import styles from './NavigationOverlay.module.css';
import {
  METAMASK_SDK,
  EMBEDDED_WALLETS,
  DELEGATION_TOOLKIT
} from '../builder/choices';

interface NavigationOption {
  id: string;
  title: string;
  description: string;
  icon?: string;
  product: string;
}

interface NavigationFlowProps {
  onSelect: (product: string) => void;
}

const navigationOptions: NavigationOption[] = [
  {
    id: 'connect-wallets',
    title: "I want to connect users' wallets to my dApp",
    description: "Enable wallet connections for Web3 interactions",
    icon: "🔗",
    product: METAMASK_SDK
  },
  {
    id: 'create-wallets',
    title: "I want to create wallets inside my application",
    description: "Embed wallet functionality directly in your app",
    icon: "💳",
    product: EMBEDDED_WALLETS
  },
  {
    id: 'gasless-transactions',
    title: "I want to manage gasless transactions",
    description: "Handle transaction fees for your users",
    icon: "⚡",
    product: DELEGATION_TOOLKIT
  }
];

const NavigationFlow: React.FC<NavigationFlowProps> = ({ onSelect }) => {
  const { colorMode } = useColorMode();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleOptionSelect = (option: NavigationOption) => {
    onSelect(option.product);
  };

  return (
    <div className={styles.flowContainer}>
      <div className={styles.stepHeader}>
        <Heading as="h2" className={styles.sectionTitle}>What would you like to do?</Heading>
        <p className={styles.sectionDescription}>Choose the option that best describes your project goals:</p>
      </div>

      <div className={styles.cardsWrapper}>
        {navigationOptions.map((option) => (
          <div key={option.id} className={styles.cardColumn}>
            <div
              className={clsx(styles.cardItem, hoveredCard === option.id && styles.cardActive)}
              style={{ '--color-palette': 'var(--developer-purple)' } as React.CSSProperties}
            >
              <CutOffCorners size="s">
                <div
                  className={styles.cardHolder}
                  onMouseEnter={() => setHoveredCard(option.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleOptionSelect(option)}
                >
                  <div className={styles.cardInner}>
                    <Shape className={styles.cardShape} />

                    <div className={styles.cardHeader}>
                      <SvgStar className={styles.cardIcon} />
                      <Heading as="h3" className={styles.cardTitle}>
                        {option.title}
                      </Heading>
                    </div>

                    <div className={styles.cardFooter}>
                      <p className={styles.cardDescription}>
                        {option.description}
                      </p>
                      <Button
                        as="button"
                        label={false}
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

      <div className={styles.quickLinks}>
        <Heading as="h4" className={styles.quickLinksTitle}>Quick Links</Heading>
        <div className={styles.linkGrid}>
          <Link href="/sdk" className={styles.quickLink}>
            📖 MetaMask SDK Documentation
          </Link>
          <Link href="/wallet" className={styles.quickLink}>
            💳 Embedded Wallets Guide
          </Link>
          <Link href="/delegation-toolkit" className={styles.quickLink}>
            ⚡ Delegation Toolkit Docs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationFlow; 