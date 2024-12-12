import React from "react";
import Card, { type CardItem } from "@site/src/components/Card";
import styles from "./cardsection.module.css";

const CardList: CardItem[] = [
  {
    title: "Integrate with the MetaMask wallet",
    link: "/wallet",
    description: (
      <>
        Integrate your dapp with MetaMask using the Wallet API.
        You can interact with your users&apos; EVM accounts from multiple dapp platforms.
      </>
    ),
  },
  {
    title: "Build on chain apps with the SDK",
    link: "/sdk",
    description: (
      <>
        Authenticate users, handle transactions, interact with contracts, and more.
      </>
    ),
  },
  {
    title: "Extend the functionality of MetaMask using Snaps",
    link: "/snaps",
    description: (
      <>
        Extend the functionality of MetaMask using Snaps. You can create a Snap
        to add support for custom networks, account types, APIs, and more.
      </>
    ),
  },
];

export default function CardSection(): JSX.Element {
  return (
    <section className="container margin-top--sm margin-bottom--lg">
      <div className={styles.row}>
        {CardList.map((props, idx) => (
          <Card key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}