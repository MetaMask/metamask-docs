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
    title: "🔌 Power your dapp using services",
    link: "/services",
    description: (
      <>
        Power your dapp or Snap using services provided by MetaMask and Infura.
        This includes APIs aimed at optimizing essential development tasks.
      </>
    ),
  },
];

export default function CardSection(): JSX.Element {
  return (
    <section className="container margin-top--sm margin-bottom--lg">
      <div className="row">
        {CardList.map((props, idx) => (
          <Card key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
