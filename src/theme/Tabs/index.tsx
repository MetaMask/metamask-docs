import React, {cloneElement, type ReactElement} from 'react';
import clsx from 'clsx';
import {
  useScrollPositionBlocker,
  useTabs,
  sanitizeTabsChildren,
  type TabItemProps,
} from '@docusaurus/theme-common/internal';
import useIsBrowser from '@docusaurus/useIsBrowser';
import type {Props} from '@theme/Tabs';
import styles from './styles.module.css';

function TabList({
  className,
  block,
  selectedValue,
  selectValue,
  tabValues,
}: Props & ReturnType<typeof useTabs>) {
  console.log(tabValues);
  const tabRefs: (HTMLLIElement | null)[] = [];
  const {blockElementScrollPositionUntilNextRender} =
    useScrollPositionBlocker();

  const handleTabChange = (
    event:
      | React.FocusEvent<HTMLLIElement>
      | React.MouseEvent<HTMLLIElement>
      | React.KeyboardEvent<HTMLLIElement>,
  ) => {
    const newTab = event.currentTarget;
    const newTabIndex = tabRefs.indexOf(newTab);
    const newTabValue = tabValues[newTabIndex]!.value;

    if (newTabValue !== selectedValue) {
      blockElementScrollPositionUntilNextRender(newTab);
      selectValue(newTabValue);
    }
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    let focusElement: HTMLLIElement | null = null;

    switch (event.key) {
      case 'Enter': {
        handleTabChange(event);
        break;
      }
      case 'ArrowRight': {
        const nextTab = tabRefs.indexOf(event.currentTarget) + 1;
        focusElement = tabRefs[nextTab] ?? tabRefs[0]!;
        break;
      }
      case 'ArrowLeft': {
        const prevTab = tabRefs.indexOf(event.currentTarget) - 1;
        focusElement = tabRefs[prevTab] ?? tabRefs[tabRefs.length - 1]!;
        break;
      }
      default:
        break;
    }

    focusElement?.focus();
  };

  return (
    <ul
      role="tablist"
      aria-orientation="horizontal"
      className={clsx(
        'tabs',
        {
          'tabs--block': block,
        },
        className,
      )}>
      {tabValues.map(({value, label, attributes}) => (
        <li
          // TODO extract TabListItem
          role="tab"
          tabIndex={selectedValue === value ? 0 : -1}
          aria-selected={selectedValue === value}
          key={value}
          ref={(tabControl) => tabRefs.push(tabControl)}
          onKeyDown={handleKeydown}
          onClick={handleTabChange}
          {...attributes}
          className={clsx(
            'tabs__item',
            styles.tabItem,
            attributes?.className as string,
            {
              'tabs__item--active': selectedValue === value,
            },
          )}>
          {label ?? value}
        </li>
      ))}
    </ul>
  );
}

function TabContent({
  lazy,
  children,
  selectedValue,
}: Props & ReturnType<typeof useTabs>) {
  const childTabs = (Array.isArray(children) ? children : [children]).filter(
    Boolean,
  ) as ReactElement<TabItemProps>[];
  if (lazy) {
    const selectedTabItem = childTabs.find(
      (tabItem) => tabItem.props.value === selectedValue,
    );
    if (!selectedTabItem) {
      // fail-safe or fail-fast? not sure what's best here
      return null;
    }
    return cloneElement(selectedTabItem, {className: 'margin-top--md'});
  }
  return (
    <div className="margin-top--md">
      {childTabs.map((tabItem, i) =>
        cloneElement(tabItem, {
          key: i,
          hidden: tabItem.props.value !== selectedValue,
        }),
      )}
    </div>
  );
}

function TabsComponent(props: Props): JSX.Element {
  const tabs = useTabs(props);
  /**
   * Tabs and TabItems aren't rendered in a straightforward manner.
   * Swizzling the TabItem component has no effect: the TabItem is used only for its data.
   * The actual tab items are rendered by the TabList component above.
   * Here we are adding custom styling to a tab by combining the tab values from the hook
   * with the props of the TabItem.
   */
  const finalTabs = {
    ...tabs,
    tabValues: tabs.tabValues.map((tabValue, idx) => ({
      ...tabValue,
      attributes: {
        ...tabValue.attributes,
        className: clsx(
          tabValue.attributes?.className,
          {
            [styles.flaskOnly]: props.children[idx]?.props.flaskOnly,
            [styles.deprecated]: props.children[idx]?.props.deprecated
          }
        )
      }
    }))
  }
  return (
    <div className={clsx('tabs-container', styles.tabList)}>
      <TabList {...finalTabs} {...props} />
      <TabContent {...finalTabs} {...props} />
    </div>
  );
}

export default function Tabs(props: Props): JSX.Element {
  const isBrowser = useIsBrowser();
  return (
    <TabsComponent
      // Remount tabs after hydration
      // Temporary fix for https://github.com/facebook/docusaurus/issues/5653
      key={String(isBrowser)}
      {...props}>
      {sanitizeTabsChildren(props.children)}
    </TabsComponent>
  );
}
