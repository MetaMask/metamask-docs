import React, { ReactNode } from "react";
import styles from "./Tooltip.module.css";
import { Tooltip as ReactTippy } from "react-tippy";
import "react-tippy/dist/tippy.css";
import clsx from "clsx";

interface TooltipProps {
  children: ReactNode;
  message: string;
  disabled?: boolean;
  className?: string;
  onHidden: VoidFunction;
}

export const Tooltip = ({
  children,
  message,
  disabled,
  className,
  onHidden,
}: TooltipProps) => (
  <>
    {/* @ts-ignore */}
    <ReactTippy
      disabled={disabled}
      arrow={true}
      onHidden={onHidden}
      html={
        <div className={clsx(styles.tooltipContainer, className)}>
          {message}
        </div>
      }
      position="top"
      interactive={true}
    >
      {children}
    </ReactTippy>
  </>
);
