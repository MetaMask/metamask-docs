import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./card.module.css";

export type CardItem = {
  title: string;
  subtitle?: string;
  link: string;
  description: JSX.Element;
};

export default function Card({ title, subtitle, link, description }: CardItem) {
  return (
    <div className={clsx("col col--4 margin-bottom--lg", styles.cardContainer)}>
      <Link className={clsx(styles.root, "card")} to={link}>
        <div className="card__header">
          <span>
            <Heading as="h3">{title}</Heading>
            {subtitle && <Heading as="h4">{subtitle}</Heading>}
          </span>
        </div>
        <div className={clsx(styles.cardBody)}>{description}</div>
        <div className={clsx(styles.ctaButton, "button")}>
          Get started
        </div>
      </Link>
    </div>
  );
}
