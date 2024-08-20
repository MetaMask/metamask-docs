import { clsx } from 'clsx'
import { forwardRef } from 'react'

import Spinner from '@site/src/components/elements/spinner'
import { linkComponentMap } from '@site/src/utils/component-map'
import { buttonIconMap } from '@site/src/utils/icon-map'
import { logoMap } from '@site/src/utils/logo-map'

import styles from './button.module.scss'

/**
 * A versatile Button component with various style and functionality options.
 * @param {Object} props - The component props.
 * @param {string} [props.buttonType=''] - The HTML button type.
 * @param {'primary'|'secondary'|'tertiary'} [props.type='primary'] - The visual style of the button.
 * @param {string|boolean} [props.label=false] - The button label.
 * @param {string|boolean} [props.labelTwo] - The secondary label for hover state.
 * @param {boolean} [props.isLarge] - Flag for large button size.
 * @param {string} [props.ariaLabel] - Aria label for accessibility.
 * @param {string} [props.icon] - Icon identifier.
 * @param {string|Object} [props.logo] - Logo identifier or component.
 * @param {string} [props.href='/'] - URL for link buttons.
 * @param {Function} [props.onClick] - Click event handler.
 * @param {boolean} [props.disabled=false] - Disabled state of the button.
 * @param {'link'|'a'|'button'} [props.as='button'] - Render as different element.
 * @param {boolean} [props.external=false] - Flag for external links.
 * @param {string|boolean} [props.rel=false] - Rel attribute for links.
 * @param {boolean|string} [props.download=false] - Download attribute for links.
 * @param {string} [props.className=''] - Additional CSS classes.
 * @param {string} [props.textTransform='uppercase'] - Text transform style.
 * @param {boolean} [props.labelBig=false] - Flag for big label style.
 * @param {string} [props.logoFillColor] - Fill color for the logo.
 * @param {boolean} [props.hasSpinner] - If we should show a spinner icon.
 * @param {React.ReactNode} [props.children] - The children of the component.
 */
const Button = forwardRef(
  (
    {
      buttonType = '',
      type = 'primary',
      label = false,
      labelTwo = label,
      isLarge,
      isExtraLarge,
      ariaLabel = label,
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
      ...rest
    },
    ref
  ) => {
    const asValue = as
    const Component = linkComponentMap[asValue]
    const IconComponent = buttonIconMap[icon]?.component
    const iconDirection = buttonIconMap[icon]?.direction
    const LogoComponent = typeof logo === 'string' ? logoMap[logo] : logo

    const renderIcon = extraClass => (
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
      ['link-styles-none']: asValue !== 'button',
    })

    const labelClassNames = clsx(
      styles['label'],
      label !== labelTwo && styles['label-small'],
      'font-primary',
      'font-weight-medium',
      textTransform !== 'none' && textTransform
    )

    return (
      <Component
        ref={ref}
        href={asValue !== 'button' ? href : null}
        target={asValue !== 'button' && external ? '_blank' : null}
        rel={rel ? rel : external && asValue !== 'button' ? 'noreferrer noopener' : null}
        aria-label={ariaLabel}
        onClick={onClick}
        className={buttonClassNames}
        disabled={disabled}
        download={as !== 'button' && download ? download : null}
        {...(asValue === 'button' && { type: buttonType })}
        {...rest}>
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
