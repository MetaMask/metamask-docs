import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
import clsx from "clsx";
import Heading from "@theme/Heading";
import { MDContent } from "@site/src/components/ParserOpenRPC/DetailsBox/MDContent";
import styles from "./styles.module.css";

interface ErrorItem {
  code: number;
  message: string;
}

interface ErrorsBoxProps {
  errors: ErrorItem[];
}

export default function ErrorsBox({ errors }: ErrorsBoxProps) {
  const { colorMode } = useColorMode();
  if (errors.length === 0) return null;

  return (
    <>
      <Heading
        as="h2"
        className={clsx(styles.secondaryHeading, "padding-vert--md")}
      >
        Errors
      </Heading>
      <div className={styles.errWrapper}>
        <div
          className={clsx(
            styles.errRowHeading,
            colorMode === "light"
              ? styles.errRowHeadingLightView
              : styles.errRowHeadingDarkView,
          )}
        >
          <div className={styles.errColCode}>Code</div>
          <div className={styles.errColMsg}>Message</div>
        </div>
        {errors.map((err, i) => (
          <div key={`${err.code}-${i}`} className={styles.errRow}>
            <div className={styles.errColCode}>{err.code}</div>
            <div className={styles.errColMsg}>
              <MDContent content={err.message} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
