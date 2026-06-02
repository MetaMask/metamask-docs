import clsx from 'clsx'
import { ReactNode, useState } from 'react'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import CutOffCorners from '@site/src/components/elements/cut-off-corners'
import Button from '@site/src/components/elements/buttons/button'

import SvgControls from '@site/static/img/icons/controls.svg'
import SvgGlobe from '@site/static/img/icons/globe.svg'
import SvgShield from '@site/static/img/icons/shield.svg'
import SvgStar from '@site/static/img/icons/star.svg'
import SvgUser from '@site/static/img/icons/user.svg'
import SvgWallet from '@site/static/img/icons/wallet.svg'
import SvgCommunity from '@site/static/img/icons/community.svg'
import SvgMultichain from '@site/static/img/icons/multichain.svg'
import Shape from '@site/static/img/shapes/intro-cards/shape.svg'

import styles from './Card.module.scss'

/** Optional lead icon for product cards (defaults to star). */
export type CardLeadIcon =
  | 'wallet'
  | 'user'
  | 'shield'
  | 'globe'
  | 'controls'
  | 'community'
  | 'multichain'
  | 'star'

const LEAD_ICON_COMPONENTS: Record<
  CardLeadIcon,
  React.ComponentType<React.SVGProps<SVGElement>>
> = {
  wallet: SvgWallet,
  user: SvgUser,
  shield: SvgShield,
  globe: SvgGlobe,
  controls: SvgControls,
  community: SvgCommunity,
  multichain: SvgMultichain,
  star: SvgStar,
}

export type CardItem = {
  title: string | ReactNode
  href: string
  description?: string | ReactNode
  theme?: string
  buttonIcon?: 'arrow-right' | 'external-arrow'
  leadIcon?: CardLeadIcon
}

export default function Card({
  title,
  href,
  description,
  theme,
  buttonIcon = 'arrow-right',
  leadIcon = 'star',
}: CardItem) {
  const [isHovered, setIsHovered] = useState(false)
  const LeadIcon = LEAD_ICON_COMPONENTS[leadIcon] ?? LEAD_ICON_COMPONENTS.star

  return (
    <div className={clsx(styles['item'], isHovered && styles['active'])}>
      <CutOffCorners size="s">
        <div
          className={styles['holder']}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <Link to={href} className={clsx(styles['inner'], 'link-styles-none')}>
            <Shape className={styles['shape']} />

            <div className={styles['header']}>
              <LeadIcon className={styles['icon']} aria-hidden />
              <Heading as="h3" className={clsx(styles['item-title'], 'type-heading-sm')}>
                {title}
              </Heading>
            </div>

            <div className={styles['footer']}>
              {description && (
                <p className={clsx(styles['item-description'], 'type-paragraph-m')}>
                  {description}
                </p>
              )}

              {href && (
                <Button
                  as="button"
                  label={false}
                  type={theme === 'dark' ? 'secondary' : 'primary'}
                  icon={buttonIcon}
                  className={styles['button']}
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
            </div>
          </Link>
        </div>
      </CutOffCorners>
    </div>
  )
}
