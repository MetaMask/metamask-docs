import React, { useState } from "react";
import clsx from "clsx";
import styles from "./accordion.module.scss";
import CloseImg from "./close.svg";
import Text from "@site/src/components/Text";

interface IAccordion {
  children: string | React.ReactElement;
  opened?: boolean;
}

export default function Accordion({ children, opened = false }: IAccordion) {
  const [isOpened, setIsOpened] = useState(opened);

  const handleClose = () => {
    setIsOpened((value) => !value);
  };

  const [title, ...body] = Array.isArray(children) ? children : [children];

  return (
    <div className={styles.accordion}>
      <div className={styles.header}>
        {title}
        <span
          role="button"
          onClick={handleClose}
          className={styles.closeButton}
        >
          <CloseImg className={clsx(styles.image, isOpened && styles.opened)} />
        </span>
      </div>
      <div className={clsx(styles.content, isOpened && styles.opened)}>
        {body}
      </div>
    </div>
  );
}

export function AccordionHeader({
  children,
}: {
  children: string | React.ReactElement;
}) {
  return (
    <Text as="h3" className={styles.accordionHeader}>
      {children}
    </Text>
  );
}

export function AccordionBody({
  children,
}: {
  children: string | React.ReactElement;
}) {
  return (
    <Text as="p" className={styles.accordionContainer}>
      {children}
    </Text>
  );
}
