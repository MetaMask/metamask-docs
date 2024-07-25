import React from "react";
import Card, { type CardItem } from "@site/src/components/Card";

const CardList: CardItem[] = [
  {
    title: "📱 Integrate your dapp with the MetaMask wallet",
    link: "/wallet",
    description: (
      <>
        Integrate your dapp with MetaMask using the Wallet API. You can interact
        with your users&apos; Ethereum accounts from multiple dapp platforms.
      </>
    ),
  },
  {
    title: "🛠️ Extend the functionality of MetaMask using Snaps",
    link: "/snaps",
    description: (
      <>
        Extend the functionality of MetaMask using Snaps. You can create a Snap
        to add support for custom networks, account types, APIs, and more.
      </>
    ),
  },
  {
    title: "📐 Build and scale your dapp using services",
    link: "/services",
    description: (
      <>
        Build and scale your dapp or Snap using services provided by MetaMask and Infura.
        This includes APIs that optimize essential development tasks.
      </>
    ),
  },
];

export default function CardList(): JSX.Element {
  return (
    <div className={clsx(styles.cardList)}>
      {cardItems.map((item, index) => (
        <CardListItem key={index} item={item} />
      ))}
    </div>
  );
}
