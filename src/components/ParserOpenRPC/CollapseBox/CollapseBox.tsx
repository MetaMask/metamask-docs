import clsx from 'clsx'
import { useEffect } from 'react'
import { useCollapsible, Collapsible, useColorMode } from '@docusaurus/theme-common'
import Button from '@site/src/components/elements/buttons/button'

import styles from './styles.module.css'

interface CollapseBoxProps {
  children: JSX.Element
  isInitCollapsed?: boolean
}

export const CollapseBox = ({ children, isInitCollapsed = false }: CollapseBoxProps) => {
  const { collapsed, toggleCollapsed } = useCollapsible({ initialState: true })
  const { colorMode } = useColorMode()
  useEffect(() => {
    if (isInitCollapsed) {
      toggleCollapsed()
    }
  }, [isInitCollapsed])
  return (
    <div className={clsx(styles.collapseWrapper, !collapsed && styles.collapsedWrapperView)}>
      <Button
        type="tertiary"
        as="button"
        label={collapsed ? 'Show child attributes' : 'Hide child attributes'}
        icon={collapsed ? 'arrow-right' : 'arrow-down'}
        onClick={() => toggleCollapsed()}
        style={
          colorMode === 'dark'
            ? {
                '--button-color': 'var(--general-white)',
                '--button-text-color': 'var(--general-white)',
                '--button-color-hover': 'var(--general-white)',
                '--button-text-color-hover': 'var(--general-black)',
              }
            : {
                '--button-color-hover': 'var(--general-black)',
                '--button-text-color-hover': 'var(--general-white)',
              }
        }
      />
      <Collapsible
        animation={{ duration: 100, easing: 'ease-in' }}
        lazy={false}
        collapsed={collapsed}>
        {children}
      </Collapsible>
    </div>
  )
}
