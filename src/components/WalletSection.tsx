import React from "react";
import Card, { type CardItem } from "@site/src/components/Card";

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

export default function WalletSection(): JSX.Element {
  return (
    <section className="container margin-top--md">
      <h1>Integrate your dapp with the MetaMask wallet</h1>
      <p>
        Your dapp can use the MetaMask APIs to request users&apos; Ethereum accounts, read data from
        blockchains the user is connected to, suggest that the user sign messages and transactions,
        and perform other advanced functions.
      </p>
      <div className="row">
        {CardList.map((props, idx) => (<Card key={idx} {...props} />))}
      </div>
    </section>
  );
}
