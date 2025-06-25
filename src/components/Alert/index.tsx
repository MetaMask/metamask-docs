import React from "react";
import { positions, types } from "react-alert";
import clsx from "clsx";
import CloseImg from "./close.svg";
import InfoImg from "./info.svg";
import SuccessImg from "./success.svg";
import ErrorImg from "./error.svg";
import Text from "@site/src/components/Text";
import styles from "./alert.module.scss";

export const options = {
  position: positions.TOP_CENTER,
  timeout: 10000,
  offset: "5px",
  containerStyle: {
    zIndex: 1000,
    marginTop: 64,
  },
};

export const AlertTemplate = ({ style, options, message, close }) => {
  const handleCloseAlert = () => {
    close();
  };

  return (
    <div
      style={style}
      className={clsx(
        styles.alert,
        options.type === types.INFO && styles.info,
        options.type === types.SUCCESS && styles.success,
        options.type === types.ERROR && styles.error,
      )}
    >
      {options.type === types.INFO && <InfoImg className={styles.icon} />}
      {options.type === types.SUCCESS && <SuccessImg className={styles.icon} />}
      {options.type === types.ERROR && <ErrorImg className={styles.icon} />}
      {message}
      <span
        role="button"
        data-testid="alert-close"
        onClick={handleCloseAlert}
        className={styles.closeButton}
      >
        <CloseImg className={styles.closeIcon} />
      </span>
    </div>
  );
};

export const AlertTitle = ({
  children,
}: {
  children: string | React.ReactElement;
}) => (
  <Text as="p" className={styles.alertTitle}>
    {children}
  </Text>
);

export const AlertText = ({
  children,
}: {
  children: string | React.ReactElement;
}) => (
  <Text as="p" className={styles.alertText}>
    {children}
  </Text>
);
