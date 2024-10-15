import Link from '@docusaurus/Link'
import { forwardRef } from 'react'

export const linkComponentMap = {
  // eslint-disable-next-line react/display-name
  ['button']: forwardRef(({ children, onClick, ariaLabel, ...props }, ref) => (
    <button onClick={onClick} ref={ref} {...props}>
      {children}
    </button>
  )),
  // eslint-disable-next-line react/display-name
  ['link']: forwardRef(({ children, href, target, className, ...props }, ref) => (
    <Link to={href} target={target} className={className} {...props} ref={ref}>
      {children}
    </Link>
  )),
  // eslint-disable-next-line react/display-name
  ['a']: forwardRef(({ children, href, target, className, ...props }, ref) => (
    <Link href={href} target={target} className={className} ref={ref} {...props}>
      {children}
    </Link>
  )),
  // eslint-disable-next-line react/display-name
  ['div']: forwardRef(({ children, onClick, className, ...props }, ref) => (
    <div className={className} onClick={onClick} ref={ref} {...props}>
      {children}
    </div>
  )),
  // eslint-disable-next-line react/display-name
  ['section']: forwardRef(({ children, onClick, className, ...props }, ref) => (
    <section className={className} ref={ref} {...props}>
      {children}
    </section>
  )),
  // eslint-disable-next-line react/display-name
  ['aside']: forwardRef(({ children, onClick, className, ...props }, ref) => (
    <aside className={className} ref={ref} {...props}>
      {children}
    </aside>
  )),
}
