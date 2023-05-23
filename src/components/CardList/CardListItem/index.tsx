import React, { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export interface CardItem {
  title?: ReactNode;
  description?: ReactNode;
  href?: string;
  icon?: string;
}

interface CardListItemProps {
  item: CardItem;
}

export default function CardListItem({ item }: CardListItemProps): JSX.Element {
  const cardContent = (
    <>
      {item.title && (
        <h2 className={clsx("text--truncate", styles.cardTitle)}>
          {item.icon && (
            <img src={item.icon} className={styles.cardIcon} />
          )}
          <span>{item.title}</span>
        </h2>
      )}
      {item.description && (
        <p>
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
