import React from "react";
import Card, { type CardItem } from "@site/src/components/Card";

const CardList: CardItem[] = [
  {
    title: "🏁 Get started building a dapp",
    link: "/wallet/how-to/get-started-building",
    description: (<>
      If you&apos;re new to dapp development, you can get started building a new dapp from scratch to integrate with MetaMask.
    </>),
  },
  {
    title: "↔️ Connect your dapp to MetaMask",
    link: "/wallet/how-to/connect",
    description: (<>
      If you have a dapp you want connect to MetaMask, you can set up MetaMask SDK and access users&apos; Ethereum accounts.
    </>),
  },
  {
    title: "🛠️ Use advanced MetaMask features",
    link: "/wallet/how-to",
    description: (<>
      If you want to optimize your dapp for MetaMask, you can use MetaMask-specific functions, such as signing typed data.
    </>),
  },
];

export default function WalletSection(): JSX.Element {
  return (
    <section className="container margin-top--md">
      <h1>Integrate your dapp with the MetaMask wallet</h1>
      <p>
        Your dapp can use MetaMask SDK and the MetaMask APIs to request users&apos; Ethereum accounts, read data from
        connected blockchains, suggest that the user sign messages and transactions,
        and perform other functions on MetaMask from multiple dapp platforms.
      </p>
      <div className="row">
        {CardList.map((props, idx) => (<Card key={idx} {...props} />))}
      </div>
    </section>
  );
}
