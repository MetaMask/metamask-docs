import React from "react";
import styles from "./text.module.scss";
import clsx from "clsx";

interface IText {
  as?: "p" | "h1" | "h2" | "h3";
  children: string | React.ReactElement;
  className?: string;
}

export default function Text({
  as = "p",
  children,
  className,
}: IText): React.JSX.Element {
  switch (as) {
    case "h1":
      return <h1 className={clsx(styles.h1, className)}>{children}</h1>;
    case "h2":
      return <h2 className={clsx(styles.h2, className)}>{children}</h2>;
    case "h3":
      return <h3 className={clsx(styles.h3, className)}>{children}</h3>;
    default:
      return <p className={clsx(styles.p, className)}>{children}</p>;
  }
}
