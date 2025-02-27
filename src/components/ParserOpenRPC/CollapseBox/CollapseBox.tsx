import clsx from 'clsx'
import { useEffect } from 'react'
import { useCollapsible, Collapsible, useColorMode } from '@docusaurus/theme-common'

import ChevronDown from '@site/static/img/icons/chevron-down.svg'

import styles from './styles.module.scss'

interface CollapseBoxProps {
  children: JSX.Element
  isInitCollapsed?: boolean
}

export const CollapseBox = ({ children, isInitCollapsed = false }: CollapseBoxProps) => {
  const { collapsed, toggleCollapsed } = useCollapsible({ initialState: true })
  useEffect(() => {
    if (isInitCollapsed) {
      toggleCollapsed()
    }
  }, [isInitCollapsed])
  return (
    <div className={clsx(styles.collapseWrapper, !collapsed && styles.collapsedWrapperView)}>
      <button
        onClick={() => toggleCollapsed()}
        className={clsx(styles.buttonToggle, 'type-paragraph-m font-primary font-weight-medium-')}>
        {collapsed ? 'Show child attributes' : 'Hide child attributes'}

        {collapsed ? (
          <span className={styles.arrowDown}>
            <ChevronDown />
          </span>
        ) : (
          <span className={styles.arrowUp}>
            <ChevronDown />
          </span>
        )}
      </button>
      <Collapsible
        animation={{ duration: 100, easing: 'ease-in' }}
        lazy={false}
        collapsed={collapsed}>
        {children}
      </Collapsible>
    </div>
  )
}
