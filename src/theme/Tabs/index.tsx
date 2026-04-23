import React, { isValidElement, type ReactElement, type ReactNode } from 'react'
import clsx from 'clsx'
import { ThemeClassNames } from '@docusaurus/theme-common'
import {
  useScrollPositionBlocker,
  useTabs,
  useTabsContextValue,
  sanitizeTabsChildren,
  TabsProvider,
} from '@docusaurus/theme-common/internal'
import useIsBrowser from '@docusaurus/useIsBrowser'
import type { Props } from '@theme/Tabs'
import styles from './styles.module.scss'

function TabList({ className }: { className?: string }) {
  const { selectedValue, selectValue, tabValues, block } = useTabs()
  const tabRefs: (HTMLLIElement | null)[] = []
  const { blockElementScrollPositionUntilNextRender } = useScrollPositionBlocker()

  const handleTabChange = (
    event:
      | React.FocusEvent<HTMLLIElement>
      | React.MouseEvent<HTMLLIElement>
      | React.KeyboardEvent<HTMLLIElement>
  ) => {
    const newTab = event.currentTarget
    const newTabIndex = tabRefs.indexOf(newTab)
    const newTabValue = tabValues[newTabIndex]!.value

    if (newTabValue !== selectedValue) {
      blockElementScrollPositionUntilNextRender(newTab)
      selectValue(newTabValue)
    }
  }

  const handleKeydown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    let focusElement: HTMLLIElement | null = null

    switch (event.key) {
      case 'Enter': {
        handleTabChange(event)
        break
      }
      case 'ArrowRight': {
        const nextTab = tabRefs.indexOf(event.currentTarget) + 1
        focusElement = tabRefs[nextTab] ?? tabRefs[0]!
        break
      }
      case 'ArrowLeft': {
        const prevTab = tabRefs.indexOf(event.currentTarget) - 1
        focusElement = tabRefs[prevTab] ?? tabRefs[tabRefs.length - 1]!
        break
      }
      default:
        break
    }

    focusElement?.focus()
  }

  return (
    <ul
      role="tablist"
      aria-orientation="horizontal"
      className={clsx(
        styles.tabs,
        'tabs',
        {
          'tabs--block': block,
        },
        className
      )}>
      {tabValues.map(({ value, label, attributes }) => (
        <li
          role="tab"
          tabIndex={selectedValue === value ? 0 : -1}
          aria-selected={selectedValue === value}
          key={value}
          ref={ref => {
            tabRefs.push(ref)
          }}
          onKeyDown={handleKeydown}
          onClick={handleTabChange}
          {...attributes}
          className={clsx('tabs__item', styles.tabItem, attributes?.className as string, {
            'tabs__item--active': selectedValue === value,
          })}>
          {label ?? value}
        </li>
      ))}
    </ul>
  )
}

function TabContent({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}

function TabsContainer({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}): ReactNode {
  return (
    <div className={clsx(ThemeClassNames.tabs.container, 'tabs-container', styles.tabList)}>
      <TabList className={className} />
      <TabContent>{children}</TabContent>
    </div>
  )
}

export default function Tabs(props: Props): ReactNode {
  const isBrowser = useIsBrowser()
  const contextValue = useTabsContextValue(props)
  const childItems = sanitizeTabsChildren(props.children)
  const el = (idx: number) =>
    isValidElement(childItems[idx]) ? (childItems[idx] as ReactElement) : null
  const value = {
    ...contextValue,
    tabValues: contextValue.tabValues.map((tabValue, idx) => {
      const child = el(idx)
      return {
        ...tabValue,
        attributes: {
          ...tabValue.attributes,
          className: clsx(tabValue.attributes?.className, {
            [styles.flaskOnly]: child?.props?.flaskOnly,
            [styles.deprecated]: child?.props?.deprecated,
          }),
        },
      }
    }),
  }

  return (
    <TabsProvider
      value={value}
      // Remount tabs after hydration
      // Temporary fix for https://github.com/facebook/docusaurus/issues/5653
      key={String(isBrowser)}>
      <TabsContainer className={props.className}>{childItems}</TabsContainer>
    </TabsProvider>
  )
}
