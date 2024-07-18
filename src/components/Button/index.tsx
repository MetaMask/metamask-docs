import React from "react";
import styles from "./button.module.scss";

interface IButton {
  onClick: VoidFunction;
  children: string | React.ReactElement;
}

export default function Button({ onClick, children }: IButton) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
