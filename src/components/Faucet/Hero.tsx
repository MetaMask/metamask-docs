import React, { useContext, useEffect, useState } from 'react'
import Text from '@site/src/components/Text'
import Button from '@site/src/components/elements/buttons/button'
import Input from '@site/src/components/Input'
import clsx from 'clsx'
import { trackClickForSegment } from '@site/src/lib/segmentAnalytics'
import { WALLET_LINK_TYPE } from '@site/src/components/AuthLogin/AuthModal'
import { MetamaskProviderContext } from '@site/src/theme/Root'
import styles from './hero.module.scss'
import { useColorMode } from '@docusaurus/theme-common'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'

interface IHero {
  className: string
  network: 'linea' | 'sepolia'
  handleRequest: VoidFunction
  handleOnInputChange: (valiue: string) => void
  inputValue?: string
  isLoading?: boolean
  isLimitedUserPlan?: boolean
}

export default function Hero({
  network,
  className,
  handleRequest,
  inputValue,
  handleOnInputChange,
  isLoading,
  isLimitedUserPlan,
}: IHero) {
  const {
    metaMaskAccount,
    sdk,
    metaMaskWalletIdConnectHandler,
    walletLinked,
    projects,
    walletAuthUrl,
  } = useContext(MetamaskProviderContext)
  const isMobile = sdk.platformManager?.isMobile ?? false
  const isExtensionActive = sdk.isExtensionActive()
  const showInstallButton = !isExtensionActive && !isMobile
  const [isWalletLinking, setIsWalletLinking] = useState(false)
  const { colorMode } = useColorMode()

  const handleConnectWallet = () => {
    setIsWalletLinking(true)
    trackClickForSegment({
      eventName: !showInstallButton ? 'Install MetaMask' : 'Connect MetaMask',
      clickType: 'Hero',
      userExperience: 'B',
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    })
    metaMaskWalletIdConnectHandler()
  }

  const handleLinkWallet = () => {
    setIsWalletLinking(true)
    trackClickForSegment({
      eventName:
        walletLinked === WALLET_LINK_TYPE.NO
          ? 'Link Developer Dashboard Account'
          : 'Select Developer Dashboard Account',
      clickType: 'Hero',
      userExperience: 'B',
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    })
    window.location.href = walletAuthUrl
  }

  const handleRequestEth = () => {
    trackClickForSegment({
      eventName: 'Request ETH',
      clickType: 'Hero',
      userExperience: 'B',
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    })
    handleRequest()
  }

  useEffect(() => {
    if (walletLinked) {
      setIsWalletLinking(false)
    }
  }, [walletLinked])

  return (
    <div className={styles.heroWrapper}>
      <CutOffCorners size={'l'}>
        <div
          className={clsx(
            styles.hero,
            network === 'linea' && styles.linea,
            network === 'sepolia' && styles.sepolia,
            className
          )}>
          <Text as="h1">
            <span>
              {network === 'linea' && 'Linea Sepolia'}
              {network === 'sepolia' && 'Sepolia'} ETH delivered straight to your wallet
            </span>
          </Text>
          <Text as="p" className="description">
            {showInstallButton
              ? 'Install MetaMask for your browser to get started and request ETH.'
              : !Object.keys(projects).length
                ? walletLinked === undefined
                  ? 'Connect your MetaMask wallet to get started and request ETH.'
                  : walletLinked === WALLET_LINK_TYPE.NO
                    ? 'Link your Developer Dashboard account to get started and request ETH.'
                    : 'Select your Developer Dashboard account to get started and request ETH.'
                : 'Enter your MetaMask wallet address and request ETH.'}
          </Text>
          <div className={styles.actions}>
            {!!Object.keys(projects).length && !showInstallButton && (
              <div className={styles.inputCont}>
                <div className={styles.inputWrapper}>
                  <Input
                    label="Wallet address"
                    disabled={isLoading}
                    value={inputValue}
                    placeholder="ex. 0x or ENS"
                    onChange={handleOnInputChange}
                  />
                  <div className={clsx(!!Object.keys(projects).length && styles.alignedButtons)}>
                    <Button
                      as="button"
                      data-test-id="hero-cta-request-eth"
                      disabled={!inputValue || isLoading}
                      type={'primary'}
                      onClick={handleRequestEth}
                      icon={'arrow-right'}
                      label={'Request ETH'}
                      style={
                        colorMode !== 'dark'
                          ? {
                              '--button-color-hover': 'var(--general-black)',
                              '--button-text-color-hover': 'var(--general-white)',
                            }
                          : {}
                      }
                    />
                  </div>
                </div>
                {isLimitedUserPlan && (
                  <p className={styles.caption}>
                    The amount of {network === 'linea' && 'Linea Sepolia'}
                    {network === 'sepolia' && 'Sepolia'} ETH you'll get is determined by your
                    address's Ethereum Mainnet activity to ensure fair and bot-free distribution.
                  </p>
                )}
              </div>
            )}
            <div className={styles.btnWrapper}>
              {showInstallButton ? (
                <Button
                  as="button"
                  data-test-id="hero-cta-install-metamask"
                  label={'Install MetaMask'}
                  style={
                    colorMode === 'dark'
                      ? {
                          '--button-color': 'var(--consumer-orange)',
                          '--button-text-color': 'var(--general-black)',
                          '--button-color-hover': 'var(--general-white)',
                          '--button-text-color-hover': 'var(--general-black)',
                        }
                      : {
                          '--button-color': 'var(--consumer-orange)',
                          '--button-text-color': 'var(--general-black)',
                          '--button-color-hover': 'var(--general-black)',
                          '--button-text-color-hover': 'var(--general-white)',
                        }
                  }
                  onClick={handleConnectWallet}
                />
              ) : !Object.keys(projects).length ? (
                <>
                  {walletLinked === undefined && (
                    <Button
                      as="button"
                      data-test-id="hero-cta-connect-metamask"
                      onClick={handleConnectWallet}
                      label={'Connect MetaMask'}
                      style={
                        colorMode === 'dark'
                          ? {
                              '--button-color': 'var(--consumer-orange)',
                              '--button-text-color': 'var(--general-black)',
                              '--button-color-hover': 'var(--general-white)',
                              '--button-text-color-hover': 'var(--general-black)',
                            }
                          : {
                              '--button-color': 'var(--consumer-orange)',
                              '--button-text-color': 'var(--general-black)',
                              '--button-color-hover': 'var(--general-black)',
                              '--button-text-color-hover': 'var(--general-white)',
                            }
                      }
                    />
                  )}
                  {walletLinked === WALLET_LINK_TYPE.NO && (
                    <Button
                      as="button"
                      data-test-id="hero-cta-link-dashboard-account"
                      onClick={handleLinkWallet}
                      isLoading={isWalletLinking}
                      icon={'arrow-right'}
                      label={'Link Developer Dashboard Account'}
                      style={
                        colorMode !== 'dark'
                          ? {
                              '--button-color-hover': 'var(--general-black)',
                              '--button-text-color-hover': 'var(--general-white)',
                            }
                          : {}
                      }
                    />
                  )}
                  {walletLinked === WALLET_LINK_TYPE.MULTIPLE && (
                    <Button
                      as="button"
                      data-test-id="hero-cta-select-dashboard-account"
                      onClick={handleLinkWallet}
                      isLoading={isWalletLinking}
                      icon={'arrow-right'}
                      label={'Select Developer Dashboard Account'}
                      style={
                        colorMode !== 'dark'
                          ? {
                              '--button-color-hover': 'var(--general-black)',
                              '--button-text-color-hover': 'var(--general-white)',
                            }
                          : {}
                      }
                    />
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </CutOffCorners>
    </div>
  )
}
