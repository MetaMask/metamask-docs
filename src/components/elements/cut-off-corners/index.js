import { clsx } from 'clsx'

import styles from './cut-off-corners.module.scss'

/**
 * A component that applies cut-off corner styles to its children.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child elements to be wrapped.
 * @param {boolean} [props.leftTop] - Apply cut-off to the top-left corner.
 * @param {boolean} [props.rightTop] - Apply cut-off to the top-right corner.
 * @param {boolean} [props.rightBottom] - Apply cut-off to the bottom-right corner.
 * @param {boolean} [props.leftBottom] - Apply cut-off to the bottom-left corner.
 * @param {'xs'|'s'|'m'|'l'|'xl'} [props.size='l'] - The size of the cut-off corners.
 * @param {1|2|3|4|5} [props.stepAnimation=2] - The step of the animation.
 * @param {boolean} [props.disabled] - Disable the cut-off corners and render children directly.
 */
export default function CutOffCorners({
  children,
  leftTop,
  rightTop,
  rightBottom,
  leftBottom,
  size = 'l',
  stepAnimation = 2,
  disabled,
}) {
  if (disabled) {
    return <>{children}</>
  }

  const isDefault = !leftTop && !rightTop && !rightBottom && !leftBottom

  return (
    <div
      className={clsx(styles['cut-off-corners'], {
        [styles['top-left']]: isDefault ? true : leftTop,
        [styles['top-right']]: rightTop,
        [styles['bottom-right']]: isDefault ? true : rightBottom,
        [styles['bottom-left']]: leftBottom,

        [styles['extra-extra-small']]: size === 'xxs',
        [styles['extra-small']]: size === 'xs',
        [styles['small']]: size === 's',
        [styles['medium']]: size === 'm',
        [styles['large']]: size === 'l',
        [styles['x-large']]: size === 'xl',

        [styles['step-1']]: stepAnimation === 1,
        [styles['step-2']]: stepAnimation === 2,
        [styles['step-3']]: stepAnimation === 3,
        [styles['step-4']]: stepAnimation === 4,
        [styles['step-5']]: stepAnimation === 5,
      })}>
      {children}
    </div>
  )
}
