import clsx from 'clsx'
import Button from '@site/src/components/elements/buttons/button'

import styles from './styles.module.css'

interface AuthBoxProps {
  handleConnect: () => void
  theme: string
}

export const AuthBox = ({ handleConnect, theme }: AuthBoxProps) => {
  return (
    <div className={styles.msgWrapper}>
      <p className={clsx(styles.msgText, 'type-paragraph-m')}>
        Connect MetaMask to test requests using your wallet
      </p>
      <Button
        as="button"
        label={'Connect MetaMask'}
        onClick={() => handleConnect()}
        data-test-id="connect-metamask"
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
