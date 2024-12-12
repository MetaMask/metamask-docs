import React from "react";
import clsx from "clsx";
import Card, { type CardItem } from "@site/src/components/Card";
import styles from "./cardsection.module.css";

const CardList: CardItem[] = [
  {
    title: "Wallet",
    subtitle: "Integrate with the MetaMask wallet",
    link: "/wallet",
    description: (
      <>
        Interact with your users&apos; via the MetaMask wallet.
      </>
    ),
  },
  {
    title: "SDK",
    subtitle: "Build on chain apps",
    link: "/sdk",
    description: (
      <>
        Authenticate users, handle transactions, interact with contracts, and more.
      </>
    ),
  },
  {
    title: "Snaps",
    subtitle: "Extend the functionality of MetaMask",
    link: "/snaps",
    description: (
      <>
        Extend the functionality of MetaMask with custom networks, account types, APIs, and more.
      </>
    ),
  },
];

export default function CardSection(): JSX.Element {
  return (
    <section >
      <div className={clsx(styles.cardSection)}>
        <div className={clsx(styles.row, "container padding-top--sm padding-bottom--lg")}>
          {CardList.map((props, idx) => (
            <Card key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}