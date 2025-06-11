import Layout from '@theme/Layout'
import Hero from '@site/src/components/Hero/Hero'
import CardSection from '@site/src/components/CardSection'
import CallToAction from '@site/src/components/CallToAction/CallToAction'
import SectionIntro from '@site/src/components/SectionIntro/SectionIntro'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout title="Home">
      <Hero
        title={siteConfig.title}
        description="Build with the world's leading self-custodial crypto wallet."
        button={{
          label: 'Get Started',
          href: '/sdk',
          icon: 'arrow-right',
        }}
      />
      <SectionIntro description="What do you want to build with MetaMask? Whether you're integrating with the extension, embedding smart wallets, or scaling with powerful infrastructure—choose a path below to get started." />
      <CardSection
        title="Connect to MetaMask Extension and Mobile"
        description="Connect your dapp to the MetaMask browser extension and MetaMask Mobile. Ideal for users who want full control over their keys and transactions."
        colorPalette="purple"
        cards={[
          {
            title: 'MetaMask SDK',
            description:
              'Use MetaMask SDK to provide your users a fast, reliable, and seamless connection to the MetaMask extension and MetaMask Mobile.',
            href: '/sdk',
            buttonIcon: "arrow-right",
          },
          {
            title: 'Wallet API',
            description:
              "Use the Wallet API to directly integrate your dapp with the MetaMask browser extension, and interact with your users' accounts.",
            href: '/wallet',
            buttonIcon: "arrow-right",
          },
        ]}
      />

      <CardSection
        title="Add an embedded MetaMask wallet"
        description="Enable embedded wallets and smart accounts directly within your dapp. Ideal for seamless onboarding, custom permission controls, and mobile-first, or first-time user experiences."
        colorPalette="purple"
        cards={[
          {
            title: 'Delegation Toolkit',
            description:
              'Use the Delegation Toolkit to integrate MetaMask smart accounts into your dapp. Create embedded wallets that support delegated permissions, gas abstraction, and secure execution.',
            href: '/delegation-toolkit',
            buttonIcon: "arrow-right",
          },
          {
            title: 'Embedded Wallets SDK',
            description:
              'Use the Embedded Wallets SDK to onboard power users and first-time users in seconds via social logins, passkeys, or by integrating your own authentication providers.',
            href: 'https://web3auth.io/docs/',
            buttonIcon: "external-arrow",
          },
        ]}
      />

      <CardSection
        title="Extend MetaMask and scale your dapp"
        description="Extend MetaMask's capabilities and build scalable dapps with developer tools, hosted infrastructure, and customizable Snaps."
        colorPalette="purple"
        cards={[
          {
            title: 'Snaps',
            description:
              'Create a custom Snap to extend the functionality of MetaMask. Add support for custom networks, accounts types, and APIs.',
            href: '/snaps',
            buttonIcon: "arrow-right",
          },
          {
            title: 'Services',
            description:
              'Use services provided by MetaMask and Infura to optimize essential development tasks and scale your dapp or Snap.',
            href: '/services',
            buttonIcon: "arrow-right",
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
