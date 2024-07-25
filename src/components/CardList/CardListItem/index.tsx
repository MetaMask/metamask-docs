import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export interface CardItem {
  title?: React.ReactNode;
  description?: React.ReactNode;
  href?: string;
  icon?: string;
  flaskOnly?: boolean;
}

interface CardListItemProps {
  item: CardItem;
}

export default function CardListItem({ item }: CardListItemProps): JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setEqualHeight = () => {
      const cardContainer = cardRef.current;
      if (!cardContainer) return;

      const cards = Array.from(
        cardContainer.getElementsByClassName("card") as HTMLCollectionOf<HTMLElement>
      );
      cards.forEach((card) => {
        card.style.height = "auto";
      });

      const cardHeights = Array.from(cards).map((card) => card.offsetHeight);
      const maxHeight = Math.max(...cardHeights);

      cards.forEach((card) => {
        card.style.height = `${maxHeight}px`;
      });
    };

    setEqualHeight();
    window.addEventListener("resize", setEqualHeight);

    return () => {
      window.removeEventListener("resize", setEqualHeight);
    };
  }, []);

  const cardContent = (
    <>
      {item.title && (
        <h2 className={clsx(styles.cardTitle)}>
          {item.icon && <img src={item.icon} className={styles.cardIcon} />}
          <span>{item.title}</span>
        </h2>
      )}
      {item.description && <p>{item.description}</p>}
    </>
  );

  const rootClassName = clsx("cardContainer", styles.cardContainer, {
    [styles.flaskOnly]: item.flaskOnly,
  });

  if (item.href) {
    return (
      <Link className={rootClassName} href={item.href} ref={cardRef}>
        {cardContent}
      </Link>
    );
  }

  return <div className={rootClassName} ref={cardRef}>{cardContent}</div>;
}
