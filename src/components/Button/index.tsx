import React from "react";
import LoadingImg from "./loading.svg";
import clsx from "clsx";

import styles from "./button.module.scss";

interface IButton {
  testId?: string;
  onClick?: VoidFunction;
  children: string | React.ReactElement;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  href?: string;
  target?: string;
  thin?: boolean;
  type?: "default" | "danger";
}

export const Button = ({
  testId,
  className,
  onClick = () => {},
  children,
  disabled = false,
  isLoading,
  href,
  target = "_blank",
  thin = false,
  type = "default",
}: IButton) => {
  const buttonRootClass = clsx(
    styles.button,
    thin && styles.thin,
    type === "danger" && styles.danger,
    className,
  );
  const isLoadingChild = !isLoading ? (
    children
  ) : (
    <LoadingImg className={styles.isLoading} />
  );

  return !href ? (
    <button
      data-testid={testId}
      className={buttonRootClass}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoadingChild}
    </button>
  ) : (
    <a
      data-testid={testId}
      className={buttonRootClass}
      href={href}
      target={target}
    >
      {isLoadingChild}
    </a>
  );
};

export default Button;
