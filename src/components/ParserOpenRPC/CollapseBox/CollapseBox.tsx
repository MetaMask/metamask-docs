import clsx from "clsx";
import { useCollapsible, Collapsible, useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";
import React, { useEffect } from "react";

interface CollapseBoxProps {
  children: JSX.Element;
  isInitCollapsed?: boolean;
}

export const CollapseBox = ({ children, isInitCollapsed = false }: CollapseBoxProps) => {
  const { collapsed, toggleCollapsed } = useCollapsible({ initialState: true });
  const { colorMode } = useColorMode();
  useEffect(() => {
    if (isInitCollapsed) {
      toggleCollapsed();
    }
  }, [isInitCollapsed]);
  return (
    <div className={clsx(styles.collapseWrapper, !collapsed && styles.collapsedWrapperView)}>
      <button
        className={clsx(styles.collapseBtn, !collapsed && styles.collapsedBtnView, colorMode === "light" && styles.collapsedBtnLightHover)}
        onClick={toggleCollapsed}
      >
        {collapsed ? "Show child attributes" : "Hide child attributes"}
        <div className={clsx(styles.collapseIcon, !collapsed && styles.collapsedIconView)}></div>
      </button>
      <Collapsible lazy collapsed={collapsed}>{children}</Collapsible>
    </div>
  );
};
