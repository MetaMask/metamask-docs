import React from "react";
import Card, { type CardItem } from "@site/src/components/Card";

const CardList: CardItem[] = [
  {
    title: "SDK",
    link: "/sdk",
    description: (
      <>
        Integrate your dapp with MetaMask using MetaMask SDK. You can interact
        with your users&apos; Ethereum accounts from multiple dapp platforms.
      </>
    ),
  },
  {
    title: "Wallet",
    link: "/wallet",
    description: (
      <>
        Integrate your dapp with MetaMask using the Wallet API. You can request
        signatures from users, send transactions, display tokens, and more.
      </>
    ),
  },
  {
    title: "Snaps",
    link: "/snaps",
    description: (
      <>
        Extend the functionality of MetaMask using Snaps. You can create a Snap
        to add support for custom networks, account types, APIs, and more.
      </>
    ),
  },
  {
    title: "Services",
    link: "/services",
    description: (
      <>
        Power your dapp or Snap using services provided by MetaMask and Infura.
        This includes APIs aimed at optimizing essential development tasks.
      </>
    ),
  },
  {
    title: "Infura dashboard",
    link: "/developer-tools/dashboard",
    description: (
      <>
        Use the Infura dashboard as a central hub for managing your Infura API
        keys, monitoring usage, and accessing account and billing information.
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
