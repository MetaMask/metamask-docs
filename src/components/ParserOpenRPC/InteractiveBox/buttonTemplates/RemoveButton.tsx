import React from "react";
import clsx from "clsx";
import styles from "@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.scss";

export const RemoveButton = (props) => (
  <button
    className={clsx(
      styles.tableButton,
      styles.tableButtonAddNewArray
    )}
    {...props}
  >
    <img
      src="/img/icons/minus-icon.svg"
      alt="Remove"
      width="16px"
      height="16px"
    />
    <span className={styles.tableButtonAddArrayItemName}>
        Remove
    </span>
  </button>
);
