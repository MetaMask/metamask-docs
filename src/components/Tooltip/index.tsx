import React, { ReactNode } from "react";
import styles from "./tooltip.module.css";
import { Tooltip as ReactTippy } from "react-tippy";
import "react-tippy/dist/tippy.css";

interface TooltipProps {
  children: ReactNode;
  message: string;
  disabled?: boolean;
}

export const Tooltip = ({ children, message, disabled }: TooltipProps) => {
  return (
    <>
      {/* @ts-ignore */}
      <ReactTippy
        disabled={disabled}
        arrow={true}
        html={<div className={styles.tooltipContainer}>{message}</div>}
        position="top"
        interactive={true}
      >
        {children}
      </ReactTippy>
    </>
  );
};
