import React, { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

export interface CardItem {
  title?: ReactNode;
  description?: ReactNode;
  href?: string;
  icon?: string;
  flaskOnly?: boolean;
}

interface CardListItemProps {
  item: CardItem;
}

export default function CardListItem({ item }: CardListItemProps): JSX.Element {
  const cardContent = (
    <>
      {item.title && (
        <Heading as="h2" className={clsx(styles.cardTitle)}>
          {item.icon && <img src={item.icon} className={styles.cardIcon} />}
          <span>{item.title}</span>
        </Heading>
      )}
      {item.description && <p>{item.description}</p>}
    </>
  );

  const rootClassName = clsx("card", "padding--lg", styles.cardContainer, {
    [styles.flaskOnly]: item.flaskOnly,
  });

  if (item.href) {
    return (
      <Link className={rootClassName} href={item.href}>
        {cardContent}
      </Link>
    );
  }

  return <div className={rootClassName}>{cardContent}</div>;
}
