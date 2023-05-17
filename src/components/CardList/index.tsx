import React from "react";
import Card, { CardItem } from "@site/src/components/Card";

interface CardListProps {
  items: CardItem[];
}

export default function CardList(props: CardListProps): JSX.Element {
  const { items } = props;

  return (
    <section className="row">
      {items.map((item, index) => (
        <article key={index} className="col col--6 margin-bottom--lg">
          <Card item={item} />
        </article>
      ))}
    </section>
  );
}
