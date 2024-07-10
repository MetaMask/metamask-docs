import React from "react"
import Card, { type CardItem } from "@site/src/components/Card"

const CardList: CardItem[] = [
  {
    title: "🏁 Wallet quickstart",
    link: "/wallet/how-to/connect",
    description: (
      <>
        Get started quickly by connecting your React dapp to MetaMask and other
        wallets in your users&apos; browsers.
      </>
    ),
  },
  {
    title: "⚙️ Wallet tutorials",
    link: "/wallet/tutorials",
    description: (
      <>
        Follow the step-by-step tutorials to create a simple React dapp and
        integrate it with MetaMask.
      </>
    ),
  },
  {
    title: "🌐 Wallet API",
    link: "/wallet/reference/json-rpc-api",
    description: (
      <>
        Use the JSON-RPC methods of MetaMask&apos;s Wallet API to interact with
        your users&apos; Ethereum accounts.
      </>
    ),
  },
]

export default function WalletSection(): JSX.Element {
  return (
    <section className="container margin-top--md">
      <h1>Integrate your dapp with the MetaMask wallet</h1>
      <p>
        Your dapp can use the Wallet API to request users&apos; Ethereum
        accounts, read data from connected blockchains, suggest that the user
        sign messages and transactions, and perform other functions on MetaMask
        from multiple dapp platforms.
      </p>
      <div className="row">
        {CardList.map((props, idx) => (
          <Card key={idx} {...props} />
        ))}
      </div>
    </section>
  )
}
