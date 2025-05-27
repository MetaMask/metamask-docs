import Layout from '@theme/Layout'
import Hero from '@site/src/components/Hero/Hero'
import CardSection from '@site/src/components/CardSection'
import CallToAction from '@site/src/components/CallToAction/CallToAction'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout title="Home">
      <Hero
        title={siteConfig.title}
        description="Build with the world's leading self-custodial crypto wallet."
      />

      <CardSection
        title="External wallet integration"
        description="Integrate your dapp with the MetaMask browser extension or mobile app. Ideal for users who want full control over their keys and transactions."
        colorPalette="purple"
        cards={[
          {
            title: 'SDK',
            description:
              'Use MetaMask SDK to build onchain dapps. Authenticate users, handle transactions, and interact with contracts across the MetaMask extension and MetaMask Mobile.',
            href: '/sdk',
          },
          {
            title: 'Wallet API',
            description:
              "Use the Wallet API to integrate your dapp with MetaMask. Connect to the MetaMask browser extension and interact with your users' accounts.",
            href: '/wallet',
          },
        ]}
      />

      <CardSection
        title="Embedded wallet integration"
        description="Enable embedded wallets and smart accounts directly within your dapp. Ideal for seamless onboarding, custom permission controls, and mobile-first, or first-time user experiences."
        colorPalette="purple"
        cards={[
          {
            title: 'Delegation Toolkit',
            description:
              'Integrate MetaMask smart accounts into your dapps. Delegate permissions such as spending limits or time-based access, to other accounts.',
            href: '/gator',
          },
          {
            title: 'Embedded Wallets SDK',
            description:
              'Use the Embedded Wallets SDK to onboard power users and first-time users in seconds via social logins, passkeys, or by integrating your own authentication providers.',
            href: 'https://web3auth.io/docs/',
          },
        ]}
      />

      <CardSection
        title="Infrastructure & extensibility"
        description="Build scalable dapps and extend MetaMask's capabilities with developer tools, hosted infrastructure, and customizable Snaps."
        colorPalette="purple"
        cards={[
          {
            title: 'Services',
            description:
              'Use services provided by MetaMask and Infura to optimize essential development tasks and scale your dapp or Snap.',
            href: '/services',
          },
          {
            title: 'Snaps',
            description:
              'Create a custom Snap to extend the functionality of MetaMask. Add support for custom networks, accounts types, and APIs.',
            href: '/snaps',
          },
        ]}
      />

      <CallToAction
        title="Contribute to MetaMask on GitHub"
        description="Join the MetaMask developer community and learn how to contribute to the MetaMask project itself."
        button={{
          label: 'Contribute',
          href: 'https://github.com/metamask',
          icon: 'github',
          external: true,
        }}
      />
    </Layout>
  )
}
