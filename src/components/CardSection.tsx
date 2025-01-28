import React from "react";
import clsx from "clsx";
import Card, { type CardItem } from "@site/src/components/Card";
import styles from "./cardsection.module.css";

const CardList: CardItem[] = [
  {
    title: "SDK",
    subtitle: "📱 Build onchain dapps",
    link: "/sdk",
    description: (
      <>
        Authenticate users, handle transactions, and interact with contracts across the MetaMask extension and MetaMask Mobile using the SDK.
      </>
    ),
  },
  {
    title: "Wallet API",
    subtitle: "🌐 Integrate with the MetaMask wallet",
    link: "/wallet",
    description: (
      <>
        Connect to the MetaMask browser extension and interact with your users&apos; accounts using the Wallet API.
      </>
    ),
  },
  {
    title: "Snaps",
    subtitle: "🛠️ Extend the functionality of MetaMask",
    link: "/snaps",
    description: (
      <>
        Add support in MetaMask for custom networks, account types, and APIs by creating a custom Snap.
      </>
    ),
  },
  {
    title: "Services",
    subtitle: "📐 Build and scale your dapp",
    link: "/services",
    description: (
      <>
        Use services provided by MetaMask and Infura to optimize essential development tasks and scale your dapp or Snap.
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