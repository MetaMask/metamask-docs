import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export interface CardItem {
  title?: string;
  description?: string;
  href?: string;
}

interface CardProps {
  item: CardItem;
}

export default function Card({ item }: CardProps): JSX.Element {
  const cardContent = (
    <>
      {item.title && (
        <h2 className={clsx("text--truncate", styles.cardTitle)} title={item.title}>
          {item.title}
        </h2>
      )}
      {item.description && (
        <p className={styles.cardDescription}>
          {item.description}
        </p>
      )}
    </>
  );
  
  const rootClassName = clsx("card padding--lg", styles.cardContainer);

  if (item.href) {
    return (
      <Link className={rootClassName} href={item.href}>{cardContent}</Link>
    );
  }

  return <div className={rootClassName}>{cardContent}</div>;
}
