import React from "react";
import Link from "@docusaurus/Link";

type CardItem = {
  title: string;
  link: string;
  description: JSX.Element;
};

const CardList: CardItem[] = [
  {
    title: "🏁 Snaps quickstart",
    link: "/snaps/get-started/quickstart",
    description: (<>
      Get started quickly by creating and customizing a simple snap, using the Snaps template built
      with React and TypeScript.
    </>),
  },
  {
    title: "⚙️⛽ Snaps tutorials",
    link: "/snaps/category/tutorials",
    description: (<>
      Follow the step-by-step tutorials to create snaps that estimate gas fees and provide
      transaction insights with custom UI.
    </>),
  },
  {
    title: "🌐 Snaps JSON-RPC API",
    link: "/snaps/reference/rpc-api",
    description: (<>
      Use the Snaps JSON-RPC API to modify the functionality of MetaMask and communicate between dapps and snaps.
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

export default function SnapsSection(): JSX.Element {
  return (
    <section className="container margin-top--lg margin-bottom--xl">
      <h1 className="header-item margin-right--md">Extend the functionality of MetaMask using Snaps</h1>
      <Link className="button button--outline button--primary header-button header-item" to="/snaps">
        Get started →
      </Link>
      <p>
        A snap is a JavaScript program run in an isolated environment that customizes the MetaMask
        wallet experience. You can create a snap that adds new API methods, adds support for
        different blockchain protocols, or modifies existing functionalities.
      </p>
      <div className="row">
        {CardList.map((props, idx) => (<Card key={idx} {...props} />))}
      </div>
    </section>
  );
}
