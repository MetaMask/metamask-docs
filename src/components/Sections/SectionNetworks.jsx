import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useColorMode } from '@docusaurus/theme-common'
import { NETWORK_LINKS } from '@site/src/lib/data'
import Link from '@docusaurus/Link'
import Button from '@site/src/components/elements/buttons/button'

import styles from './SectionNetworks.module.scss'

const SectionNetworks = () => {
  const [isNetworksListCollapsed, setIsNetworksListCollapsed] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const { colorMode } = useColorMode()
  const [theme, setTheme] = useState('')

  useEffect(() => {
    setTheme(colorMode)
  }, [colorMode])

  const toggleNetworksList = () => {
    setIsNetworksListCollapsed(prevState => !prevState)
  }

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const renderNetworkCard = ({ name, href, logo }, index) => (
    <li key={index} className={styles['item']}>
      <Link to={href} className={clsx(styles['inner'], 'text-decoration-none')}>
        <div className={styles['logo-wrap']}>
          <img src={logo} alt={`${name} logo`} />
        </div>
        {name}
      </Link>
    </li>
  )

  return (
    <section className={styles['wrapper']}>
      <ul className={styles['list']}>
        {NETWORK_LINKS.map((item, index) =>
          isMobile && isNetworksListCollapsed && index > 4 ? null : renderNetworkCard(item, index)
        )}
      </ul>
      {isMobile && (
        <Button
          as="div"
          label={`show ${isNetworksListCollapsed ? 'more' : 'less'} networks`}
          type={theme === 'dark' ? 'secondary' : 'primary'}
          icon={isNetworksListCollapsed ? 'plus' : 'minus'}
          className={styles['button']}
          onClick={toggleNetworksList}
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
      )}
    </section>
  )
}

export default SectionNetworks
