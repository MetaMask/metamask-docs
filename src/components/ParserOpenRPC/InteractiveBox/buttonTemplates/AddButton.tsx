import React from "react";
import clsx from "clsx";
import styles from "@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.css";

export const AddButton = (props) => (
  <button
    className={clsx(
      styles.tableButton,
      styles.tableButtonAddNewArray
    )}
    {...props}
  >
    <img
      src="/img/icons/plus-icon.svg"
      alt="Add"
      width="16px"
      height="16px"
    />
    <span className={styles.tableButtonAddArrayItemName}>
      Add
    </span>
  </button>
);
