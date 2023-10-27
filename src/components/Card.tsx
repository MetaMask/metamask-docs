import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./Card.module.css";

export type CardItem = {
  title: string;
  link: string;
  description: JSX.Element;
};

export default function Card({ title, link, description }: CardItem) {
  return (
    <div className="col col--4 margin-top--sm margin-bottom--md">
      <Link className={clsx(styles.root, "card padding--sm")} href={link}>
        <div className="card__header"><h3>{title}</h3></div>
        <div className="card__body">{description}</div>
      </Link>
    </div>
  );
}