import React from "react";
import LoadingImg from "./loading.svg";
import clsx from "clsx";

import styles from "./button.module.scss";

interface IButton {
  onClick?: VoidFunction;
  children: string | React.ReactElement;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  href?: string;
  target?: string;
}

export default function Button({
  className,
  onClick = () => {},
  children,
  disabled = false,
  isLoading,
  href,
  target = "_blank",
}: IButton) {
  return !href ? (
    <button
      className={clsx(styles.button, className)}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {!isLoading ? children : <LoadingImg className={styles.isLoading} />}
    </button>
  ) : (
    <a className={clsx(styles.button, className)} href={href} target={target}>
      {!isLoading ? children : <LoadingImg className={styles.isLoading} />}
    </a>
  );
}
