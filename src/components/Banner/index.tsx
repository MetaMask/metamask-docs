import { ReactNode, FC, useState, useEffect } from 'react'
import { useColorMode } from '@docusaurus/theme-common'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'
import Button from '@site/src/components/elements/buttons/button'

import styles from './banner.module.scss'

interface BannerProps {
  children: ReactNode
}

const Banner: FC<BannerProps> = ({ children }) => {
  const { colorMode } = useColorMode()
  const [theme, setTheme] = useState('')

  useEffect(() => {
    setTheme(colorMode)
  }, [colorMode])

  return (
    <div className={styles.banner}>
      <CutOffCorners size="m">
        <div className={styles.inner}>
          {children}
          <Button
            className={styles['button']}
            as="a"
            type={theme === 'dark' ? 'secondary' : 'primary'}
            href="https://app.infura.io/register"
            target="_blank"
            rel="noopener noreferrer"
            label="Sign up"
            icon="external-arrow"
            style={
              theme === 'dark'
                ? {
                    '--button-color-hover': 'var(--general-white)',
                    '--button-text-color-hover': 'var(--general-black)',
                  }
                : {
                    '--button-color-hover': 'var(--general-black)',
                    '--button-text-color-hover': 'var(--general-white)',
                  }
            }
          />
        </div>
      </CutOffCorners>
    </div>
  )
}

export default Banner
