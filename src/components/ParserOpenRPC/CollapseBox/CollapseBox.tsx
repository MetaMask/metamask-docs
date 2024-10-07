import clsx from "clsx";
import {
  useCollapsible,
  Collapsible,
  useColorMode,
} from "@docusaurus/theme-common";
import styles from "./styles.module.css";
import React, { useEffect } from "react";

interface CollapseBoxProps {
  children: JSX.Element;
  isInitCollapsed?: boolean;
}

export const CollapseBox = ({
  children,
  isInitCollapsed = true,
}: CollapseBoxProps) => {
  const { collapsed, setCollapsed } = useCollapsible({ initialState: isInitCollapsed });
  const { colorMode } = useColorMode();
  useEffect(() => {
    setCollapsed(isInitCollapsed);
  }, [isInitCollapsed]);
  return (
    <div
      className={clsx(
        styles.collapseWrapper,
        !collapsed && styles.collapsedWrapperView,
      )}
    >
      <button
        className={clsx(
          styles.collapseBtn,
          !collapsed && styles.collapsedBtnView,
          colorMode === "light" && styles.collapsedBtnLightHover,
        )}
        onClick={() => setCollapsed((expanded) => !expanded)}
      >
        {collapsed ? "Show child attributes" : "Hide child attributes"}
        <div
          className={clsx(
            styles.collapseIcon,
            !collapsed && styles.collapsedIconView,
          )}
        ></div>
      </button>
      <Collapsible
        animation={{ duration: 100, easing: "ease-in" }}
        lazy={false}
        collapsed={collapsed}
      >
        {children}
      </Collapsible>
    </div>
  );
};
