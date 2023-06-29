import React from "react";
import Card, { type CardItem } from "@site/src/components/Card";

const CardList: CardItem[] = [
  {
    title: "💻📱 MetaMask SDK",
    link: "/wallet/how-to/set-up-sdk",
    description: (<>
      Enable your users to easily connect to a MetaMask wallet client from multiple dapp platforms using MetaMask SDK.
    </>),
  },
  {
    title: "⚙️👨‍💻 Dapp tutorials",
    link: "/wallet/tutorials",
    description: (<>
      Follow the step-by-step tutorials to create dapps, using Vite with React and TypeScript, to integrate with MetaMask.
    </>),
  },
  {
    title: "🌐 MetaMask APIs",
    link: "/wallet/reference/provider-api",
    description: (<>
      Interact with the MetaMask wallet using the MetaMask Ethereum provider API and the MetaMask JSON-RPC API.
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
