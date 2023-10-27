import React from "react";
import CardListItem, { CardItem } from "./CardListItem";

interface CardListProps {
  items: CardItem[];
}

export default function CardList(props: CardListProps): JSX.Element {
  const { items } = props;

  return (
    <section className="row">
      {items.map((item, index) => (
        <article key={index} className="col col--6 margin-bottom--lg">
          <CardListItem item={item} />
        </article>
      ))}
    </section>
  );
}
