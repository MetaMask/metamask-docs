import React from 'react'
import Accordion from '@site/src/components/Accordion'
import Text from '@site/src/components/Text'
import styles from './faq.module.scss'
import { trackClickForSegment } from '@site/src/lib/segmentAnalytics'

interface IFaq {
  network: 'linea' | 'sepolia'
  className: string
  classNameHeading: string
  isLimitedUserPlan?: boolean
}

export default function Faq({ network, className, classNameHeading, isLimitedUserPlan }: IFaq) {
  const handleClickContactUs = () => {
    trackClickForSegment({
      eventName: 'Contact us',
      clickType: `Link in ${network} FAQ`,
      userExperience: 'B',
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    })
  }

  const handleClickLinea = () => {
    trackClickForSegment({
      eventName: 'What is Linea',
      clickType: `Link in ${network} FAQ`,
      userExperience: 'B',
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    })
  }

  const handleClickDiscord = () => {
    trackClickForSegment({
      eventName: 'Consensys Discord',
      clickType: `Link in ${network} FAQ`,
      userExperience: 'B',
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    })
  }

  const handleClickBridge = () => {
    trackClickForSegment({
      eventName: 'Bridge',
      clickType: `Link in ${network} FAQ`,
      userExperience: 'B',
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    })
  }

  switch (network) {
    case 'linea':
      return (
        <div className={className}>
          <div className={classNameHeading}>
            <Text as="h2">Frequently Asked Questions</Text>
            <Text as="p">Answers to commonly asked questions about the MetaMask faucet.</Text>
          </div>
          {isLimitedUserPlan && (
            <Accordion>
              <Text as="h3" className={styles.accordionHeader}>
                Why must my address have Ethereum Mainnet activity to claim Linea ETH?x
              </Text>
              <Text as="p" className={styles.accordionContainer}>
                MetaMask requires an address with Ethereum Mainnet activity to safeguard the faucet
                from automated bots, ensuring equitable Linea ETH distribution. The amount of Linea
                ETH you can receive ranges from 0 to 0.5, depending on your address's level of
                activity. No activity results in no Linea ETH, while a higher number of transactions
                can earn you up to 0.5. MetaMask maintains confidentiality over the exact criteria
                used to determine the amount issued to prevent any exploitation of the system,
                aiming to distribute testnet ETH fairly among genuine, active users.
              </Text>
            </Accordion>
          )}
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              I'm new to Web3. What is a faucet?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              A faucet is a platform that gives you testnet tokens to use when testing your smart
              contracts. This faucet gives you Sepolia ETH to test deploying smart contracts and
              sending transactions before deploying your dapp on Mainnet.
            </Text>
          </Accordion>
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              What is Linea?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              <span>
                <a
                  data-testid="faq-linea-what-is-linea"
                  onClick={handleClickLinea}
                  target="_blank"
                  href="https://linea.build">
                  Linea
                </a>{' '}
                is a type 2 zero knowledge Ethereum Virtual Machine (zkEVM). A zkEVM replicates the
                Ethereum environment as a rollup and allows developers to build on it as they would
                on Ethereum Mainnet. Linea allows you to deploy any smart contract, use any tool,
                and develop as if you're building on Ethereum. For users, this enables the
                experience and security guarantees of Ethereum, but with lower transaction costs and
                greater speed.
              </span>
            </Text>
          </Accordion>
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              How can I get help with using this faucet?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              <span>
                <a
                  data-testid="faq-linea-contact-us"
                  onClick={handleClickContactUs}
                  target="_blank"
                  href="https://support.metamask.io/">
                  Contact support
                </a>{' '}
                with any issues or questions you have relating to the faucet.
              </span>
            </Text>
          </Accordion>
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              How can I help make this faucet better?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              <span>
                If you have ideas on how to improve the faucet, feel free to submit them on{' '}
                <a
                  data-testid="faq-linea-discord"
                  onClick={handleClickDiscord}
                  target="_blank"
                  href="https://discord.com/invite/consensys">
                  Discord.
                </a>
              </span>
            </Text>
          </Accordion>
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              Where does Linea ETH come from?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              <span>
                Linea ETH comes from Sepolia ETH that is bridged to Linea using the canonical{' '}
                <a
                  data-testid="faq-linea-bridge"
                  onClick={handleClickBridge}
                  target="_blank"
                  href="https://bridge.linea.build">
                  bridge.
                </a>
              </span>
            </Text>
          </Accordion>
        </div>
      )
    case 'sepolia':
      return (
        <div className={className}>
          <div className={classNameHeading}>
            <Text as="h2">Frequently Asked Questions</Text>
            <Text as="p">Answers to commonly asked questions about the MetaMask faucet.</Text>
          </div>
          {isLimitedUserPlan && (
            <Accordion>
              <Text as="h3" className={styles.accordionHeader}>
                Why must my address have Ethereum Mainnet activity to claim Sepolia ETH?
              </Text>
              <Text as="p" className={styles.accordionContainer}>
                MetaMask requires an address with Ethereum Mainnet activity to safeguard the faucet
                from automated bots, ensuring equitable Sepolia ETH distribution. The amount of
                Sepolia ETH you can receive ranges from 0 to 0.5, depending on your address's level
                of activity. No activity results in no Sepolia ETH, while a higher number of
                transactions can earn you up to 0.5. MetaMask maintains confidentiality over the
                exact criteria used to determine the amount issued to prevent any exploitation of
                the system, aiming to distribute testnet ETH fairly among genuine, active users.
              </Text>
            </Accordion>
          )}
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              I'm new to Web3. What is a faucet?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              A faucet is a platform that gives you testnet tokens to use when testing your smart
              contracts. This faucet gives you Sepolia ETH to test deploying smart contracts and
              sending transactions before deploying your dapp on Mainnet.
            </Text>
          </Accordion>
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              How can I get help with using this faucet?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              <span>
                <a
                  data-testid="faq-sepolia-contact-us"
                  onClick={handleClickContactUs}
                  target="_blank"
                  href="https://support.metamask.io/">
                  Contact support
                </a>{' '}
                with any issues or questions you have relating to the faucet.
              </span>
            </Text>
          </Accordion>
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              How can I help make this faucet better?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              <span>
                If you have ideas on how to improve the faucet, feel free to submit them on{' '}
                <a
                  data-testid="faq-sepolia-discord"
                  onClick={handleClickDiscord}
                  target="_blank"
                  href="https://discord.com/invite/consensys">
                  Discord.
                </a>
              </span>
            </Text>
          </Accordion>
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              Where does Sepolia ETH come from?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              The Sepolia ETH comes from MetaMask's partnership with the Ethereum Foundation. We
              maintain an always-on, reliable faucet environment to support the development
              community.
            </Text>
          </Accordion>
        </div>
      )
  }
}
