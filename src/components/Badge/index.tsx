import React from "react";
import styles from "./badge.module.scss";
import clsx from "clsx";

type variant = "error" | "success" | "default";

interface IBadge {
  variant?: variant;
  label: string;
}

export default function Badge({ variant = "default", label }: IBadge) {
  return <span className={clsx(styles.badge, styles[variant])}>{label}</span>;
}
