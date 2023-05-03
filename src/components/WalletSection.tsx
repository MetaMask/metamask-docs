import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

type CardItem = {
  title: string;
  link: string;
  description: JSX.Element;
};

const CardList: CardItem[] = [
  {
    title: "👨‍💻 Create a simple React dapp",
    link: "/wallet/tutorials/simple-react-dapp",
    description: (<>
      Get started quickly by creating a simple dapp, using Vite with React and TypeScript, to integrate with MetaMask.
    </>),
  },
  {
    title: "💻📱 MetaMask SDK",
    link: "/wallet/how-to/use-sdk",
    description: (<>
      Enable your users to easily connect to a MetaMask wallet client from any platform using MetaMask SDK.
    </>),
  },
  {
    title: "🌐 MetaMask APIs",
    link: "/wallet/reference/rpc-api",
    description: (<>
      Interact with the MetaMask wallet using the MetaMask Ethereum provider API and the MetaMask JSON-RPC API.
    </>),
  },
];

function Card({ title, link, description }: CardItem) {
  return (
    <div className="col col--4 margin-top--sm">
      <Link className="card homepage-card padding--sm" href={link}>
        <div className="card__header"><h3>{title}</h3></div>
        <div className="card__body">{description}</div>
      </Link>
    </div>
  );
}

export default function WalletSection(): JSX.Element {
  return (
    <section className="container margin-top--lg margin-bottom--xl">
      <h1 className="header-item margin-right--md">Integrate your dapp with the MetaMask wallet</h1>
      <Link className="button button--outline button--primary header-button header-item" to="/wallet">
        Get started →
      </Link>
      <p>
        Your dapp can use the MetaMask APIs to request users' Ethereum accounts, read data from
        blockchains the user is connected to, suggest that the user sign messages and transactions,
        and perform other advanced functions.
      </p>
      <div className="row">
        {CardList.map((props, idx) => (<Card key={idx} {...props} />))}
      </div>
    </section>
  );
}
