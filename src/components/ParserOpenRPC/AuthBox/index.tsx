import React, { useContext } from 'react'
import clsx from 'clsx'
import Button from '@site/src/components/elements/buttons/button'
import styles from './styles.module.scss'
import { MetamaskProviderContext } from '@site/src/theme/Root'

interface AuthBoxProps {
  theme: string
}

export const AuthBox = ({ theme }: AuthBoxProps) => {
  const { metaMaskWalletIdConnectHandler } = useContext(MetamaskProviderContext)
  const connectHandler = () => {
    metaMaskWalletIdConnectHandler()
  }
  return (
    <div className={styles.msgWrapper}>
      <p className={clsx(styles.msgText, 'type-paragraph-m')}>
        Connect your MetaMask wallet to run requests successfully.
      </p>
      <Button
        as="button"
        label={'Connect Wallet'}
        onClick={connectHandler}
        data-test-id="connect-wallet"
        style={
          theme === 'dark'
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
    </div>
  )
}
