import Head from '@docusaurus/Head'
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
      <Head>
        <title>Home | MetaMask</title>
        <meta
          name="description"
          content="Build with the world's leading self-custodial crypto wallet. MetaMask developer documentation."
        />
        <meta
          name="keywords"
          content="metamask, wallet, blockchain, web3, web3.js, ethers.js, ethereum, evm-compatible chains, bitcoin, solana, ethereum, crypto, sdk, snaps, dapp"
        />
        <meta property="og:site_name" content="MetaMask" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Home" />
        <meta
          property="og:description"
          content="Build with the world's leading self-custodial crypto wallet. MetaMask developer documentation."
        />
        <meta property="og:url" content="https://docs.metamask.io/" />
        <meta property="og:image" content="https://docs.metamask.io/img/metamaskog.jpg" />
        <meta property="og:image:secure_url" content="https://docs.metamask.io/img/metamaskog.jpg" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="MetaMask" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MetaMask" />
        <meta name="twitter:creator" content="@MetaMask" />
        <meta name="twitter:title" content="Home" />
        <meta
          name="twitter:description"
          content="Build with the world's leading self-custodial crypto wallet. MetaMask developer documentation."
        />
        <meta name="twitter:image" content="https://docs.metamask.io/img/metamaskog.jpg" />
        <meta itemProp="name" content="Home" />
        <meta
          itemProp="description"
          content="Build with the world's leading self-custodial crypto wallet. MetaMask developer documentation."
        />
        <meta itemProp="image" content="https://docs.metamask.io/img/metamaskog.jpg" />
        <meta name="author" content="MetaMask" />
      </Head>
      <Hero
        title={siteConfig.title}
        description="Build with the world's leading self-custodial crypto wallet."
        buttons={[
          {
            label: 'Quickstart',
            href: '/quickstart',
            icon: 'arrow-right'
          },
          {
            label: 'Tutorials',
            href: '/tutorials/',
            icon: 'arrow-right'
          }
        ]}
      />

      <SectionIntro description="What do you want to do with MetaMask?" />

      <CardSection
        colorPalette="purple"
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
              'Onboard power users and first-time users in seconds via social logins, or by integrating your own authentication providers.',
            href: '/embedded-wallets',
            buttonIcon: 'arrow-right',
          },
          {
            title: 'Create smart accounts',
            description:
              'Create and interact with MetaMask Smart Accounts, unlocking new programmable account behaviors and granular permission sharing.',
            href: '/smart-accounts-kit',
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
