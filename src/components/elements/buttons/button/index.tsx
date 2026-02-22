import { clsx } from 'clsx'
import { forwardRef, ReactNode } from 'react'

import Spinner from '@site/src/components/elements/spinner'
import { linkComponentMap } from '@site/src/utils/component-map'
import { buttonIconMap } from '@site/src/utils/icon-map'
import { logoMap } from '@site/src/utils/logo-map'

import styles from './button.module.scss'

interface ButtonProps {
  buttonType?: string
  type?: 'primary' | 'secondary' | 'tertiary'
  label?: string | boolean
  labelTwo?: string | boolean
  isLarge?: boolean
  isExtraLarge?: boolean
  ariaLabel?: string
  icon?: string
  logo?: string | React.ComponentType
  href?: string
  onClick?: () => void
  disabled?: boolean
  as?: 'link' | 'a' | 'button' | 'div'
  external?: boolean
  rel?: string | boolean
  download?: boolean | string
  className?: string
  textTransform?: string
  labelBig?: boolean
  logoFillColor?: string
  hasSpinner?: boolean
  style?: React.CSSProperties | unknown
  target?: string
  children?: ReactNode
}

const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      buttonType = '',
      type = 'primary',
      label = false,
      labelTwo = label,
      isLarge,
      isExtraLarge,
      ariaLabel = label as string,
      icon,
      logo,
      href = '/',
      onClick,
      disabled = false,
      as = 'button',
      external = false,
      rel = false,
      download = false,
      className = '',
      textTransform = 'uppercase',
      labelBig = false,
      logoFillColor,
      hasSpinner = false,
      children,
      style,
      ...rest
    },
    ref
  ) => {
    const asValue = as
    const Component = linkComponentMap[asValue]
    const IconComponent = buttonIconMap[icon]?.component
    const iconDirection = buttonIconMap[icon]?.direction
    const LogoComponent = typeof logo === 'string' ? logoMap[logo] : logo

    const renderIcon = (extraClass?: string) => (
      <span
        className={clsx(
          styles['icon'],
          extraClass === 'icon-hover' && styles[extraClass],
          iconDirection && styles[`${extraClass}-${iconDirection}`],
          icon === 'transcript' && styles['icon--stroke'],
          icon === 'github' && styles['icon--adjust']
        )}>
        <IconComponent />
      </span>
    )

    const renderLogo = () => {
      if (!LogoComponent) return null

      return (
        <span className={styles['logo']}>
          <LogoComponent />
        </span>
      )
    }

    const buttonClassNames = clsx(styles['button'], className, 'text-decoration-none', {
      [styles['primary']]: type === 'primary',
      [styles['secondary']]: type === 'secondary',
      [styles['tertiary']]: type === 'tertiary',
      [styles['has-logo']]: logo && LogoComponent,
      [styles['logo-fill-color']]: logoFillColor,
      [styles['has-icon']]: icon,
      [styles['is-large']]: isLarge && label,
      [styles['is-extra-large']]: isExtraLarge,
      [styles['no-label']]: !label,
      [styles['disabled']]: disabled,
    })

    const labelClassNames = clsx(
      styles['label'],
      label !== labelTwo && styles['label-small'],
      'font-primary',
      'font-weight-medium',
      textTransform !== 'none' && textTransform
    )

    const isLinkElement = asValue === 'link' || asValue === 'a'
    const isButtonElement = asValue === 'button'

    const elementProps: Record<string, unknown> = {
      ref: ref as React.Ref<unknown>,
      'aria-label': ariaLabel,
      onClick,
      className: buttonClassNames,
      style,
      ...rest,
    }

    if (isLinkElement) {
      elementProps.href = href
      if (external) {
        elementProps.target = '_blank'
        elementProps.rel = rel || 'noreferrer noopener'
      } else if (rel) {
        elementProps.rel = rel
      }
      if (download) {
        elementProps.download = download
      }
    }

    if (isButtonElement) {
      elementProps.disabled = disabled
      if (buttonType) {
        elementProps.type = buttonType
      }
    }

    return (
      <Component {...elementProps}>
        <span className={clsx(styles['button-holder'], labelBig && styles['label-big'])}>
          {children}
          {hasSpinner && <Spinner />}

          <span className={styles['button-main']}>
            {logo && renderLogo()}
            {label && <span className={labelClassNames}>{label}</span>}
            {icon && renderIcon('icon')}
            {!label && icon && renderIcon('icon-hover')}
          </span>

          {label && labelTwo && (
            <span
              className={styles['button-hover']}
              aria-hidden={label === labelTwo ? 'true' : 'false'}>
              {logo && renderLogo()}
              <span className={labelClassNames}>{labelTwo}</span>
              {icon && renderIcon()}
            </span>
          )}
        </span>
      </Component>
    )
  }
)

Button.displayName = 'Button'

export default Button
