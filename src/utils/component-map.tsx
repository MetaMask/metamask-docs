import Link from '@docusaurus/Link'
import { forwardRef, ReactNode, MouseEvent } from 'react'

interface CommonProps {
  children: ReactNode
  className?: string
  ref?: React.Ref<any>
}

interface ButtonProps extends CommonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  ariaLabel?: string
  [key: string]: any
}

interface LinkProps extends CommonProps {
  href?: string
  target?: string
  to?: string
  [key: string]: any
}

interface DivProps extends CommonProps {
  onClick?: (event: MouseEvent<HTMLDivElement>) => void
  [key: string]: any
}

interface SectionProps extends CommonProps {
  [key: string]: any
}

interface AsideProps extends CommonProps {
  [key: string]: any
}

export const linkComponentMap = {
  // eslint-disable-next-line react/display-name
  ['button']: forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, onClick, ariaLabel, ...props }, ref) => (
      <button onClick={onClick} ref={ref} {...props}>
        {children}
      </button>
    )
  ),
  // eslint-disable-next-line react/display-name
  ['link']: forwardRef<HTMLAnchorElement, LinkProps>(
    ({ children, href, target, className, ...props }, ref) => (
      <Link to={href} target={target} className={className} {...props} ref={ref}>
        {children}
      </Link>
    )
  ),
  // eslint-disable-next-line react/display-name
  ['a']: forwardRef<HTMLAnchorElement, LinkProps>(
    ({ children, href, target, className, ...props }, ref) => (
      <Link href={href} target={target} className={className} ref={ref} {...props}>
        {children}
      </Link>
    )
  ),
  // eslint-disable-next-line react/display-name
  ['div']: forwardRef<HTMLDivElement, DivProps>(
    ({ children, onClick, className, ...props }, ref) => (
      <div className={className} onClick={onClick} ref={ref} {...props}>
        {children}
      </div>
    )
  ),
  // eslint-disable-next-line react/display-name
  ['section']: forwardRef<HTMLElement, SectionProps>(
    ({ children, onClick, className, ...props }, ref) => (
      <section className={className} ref={ref} {...props}>
        {children}
      </section>
    )
  ),
  // eslint-disable-next-line react/display-name
  ['aside']: forwardRef<HTMLElement, AsideProps>(
    ({ children, onClick, className, ...props }, ref) => (
      <aside className={className} ref={ref} {...props}>
        {children}
      </aside>
    )
  ),
}
