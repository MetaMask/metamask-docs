import React, { ReactNode } from "react";
import styles from "./Tooltip.module.css";
import { Tooltip as ReactTippy } from "react-tippy";
import "react-tippy/dist/tippy.css";

interface TooltipProps {
  children: ReactNode;
  message: string;
  disabled?: boolean;
  theme?: "light" | "dark";
}

export const Tooltip = ({ children, message, disabled, theme = "light" }: TooltipProps) => (
  <ReactTippy
    disabled={disabled}
    arrow={true}
    theme={theme}
    html={(
      <div className={styles.tooltipContainer}>{message}</div>
    )}
    position="top"
    interactive={true}
  >
    {children}
  </ReactTippy>
);
