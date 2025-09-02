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
      />

      <SectionIntro description="Get started with the following resources:" />

      <CardSection
        colorPalette="purple"
        cards={[
          {
            title: 'Quickstart',
            description: 'Choose a quickstart guide that matches your project goals.',
            href: '/quickstart',
            buttonIcon: 'arrow-right',
          },
          {
            title: 'Tutorials',
            description:
              'Explore use cases and follow the hands-on tutorials to build end-to-end dapps.',
            href: '/tutorials/',
            buttonIcon: 'arrow-right',
          },
        ]}
      />

      <SectionIntro description="What do you want to do with MetaMask?" />

      <CardSection
        colorPalette="blue"
        cards={[
          {
            title: 'Connect to MetaMask',
            description:
              'Connect your dapp to the MetaMask browser extension and mobile app. Ideal for users who want full control over their keys and transactions.',
            href: '/sdk',
            buttonIcon: 'arrow-right',
          },
          {
            title: 'Create embedded wallets',
            description:
              'Onboard power users and first-time users in seconds via social logins, passkeys, or by integrating your own authentication providers.',
            href: '/embedded-wallets',
            buttonIcon: 'arrow-right',
          },
          {
            title: 'Create smart accounts',
            description:
              'Integrate MetaMask Smart Accounts into your dapp. Create smart wallets that support delegated permissions, gas abstraction, and secure execution.',
            href: '/delegation-toolkit',
            buttonIcon: 'arrow-right',
          },
          {
            title: 'Build and scale your dapp',
            description:
              'Use high performance APIs provided by MetaMask and Infura to build and scale your dapp or Snap.',
            href: '/services',
            buttonIcon: 'arrow-right',
          },
          {
            title: 'Extend MetaMask',
            description:
              'Create a custom mini app that runs inside the MetaMask extension. Add support for custom networks, accounts types, and APIs.',
            href: '/snaps',
            buttonIcon: 'arrow-right',
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
