import Text from '@site/src/components/Text'
import Button from '@site/src/components/elements/buttons/button'

import styles from './maintenance.module.scss'
import React from 'react'
import { trackClickForSegment } from '@site/src/lib/segmentAnalytics'
import { useColorMode } from '@docusaurus/theme-common'

const Maintenance = ({ network }: { network: 'linea' | 'sepolia' }) => {
  const SEPOLIA_URL = 'https://faucetlink.to/sepolia'
  const LINEA_URL = 'https://docs.linea.build/build-on-linea/use-linea-testnet/fund'
  const { colorMode } = useColorMode()

  const handleOnClick = () => {
    trackClickForSegment({
      eventName: 'Explore Alternative Faucets',
      clickType: `Maintenance ${network}`,
      userExperience: 'B',
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    })
  }

  return (
    <div className={styles.maintenance}>
      <div className={styles.modal}>
        <Text as="h3">The faucet is at full capacity due to high demand.</Text>
        <Text as="p">Try checking back later. Thank you for your patience. Need ETH urgently?</Text>
        <Button
          as="a"
          target="_blank"
          data-testid="maintenance-cta-alternative"
          onClick={handleOnClick}
          label={'Explore Alternative Faucets'}
          href={network === 'sepolia' ? SEPOLIA_URL : LINEA_URL}
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
  )
}

export default Maintenance
