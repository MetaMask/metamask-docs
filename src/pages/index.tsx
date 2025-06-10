import Layout from '@theme/Layout'
import Hero from '@site/src/components/Hero/Hero'
import CardSection from '@site/src/components/CardSection'
import CallToAction from '@site/src/components/CallToAction/CallToAction'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={'Home'}>
      <Hero
        title={siteConfig.title}
        description={"Build with the world's leading self-custodial crypto wallet."}
        button={{
          label: 'Get Started',
          href: '/sdk',
          icon: 'arrow-right',
        }}
      />
      <CardSection
        colorPalette="purple"
        cards={[
          {
            title: 'MetaMask SDK',
            description:
              'Use MetaMask SDK to provide your users a fast, reliable, and seamless connection to the MetaMask extension and MetaMask Mobile.',
            href: '/sdk',
            theme: '',
          },
          {
            title: 'Wallet API',
            description:
              "Use the Wallet API to directly integrate your dapp with the MetaMask browser extension, and interact with your users' accounts.",
            href: '/wallet',
            theme: '',
          },
          {
            title: 'Delegation Toolkit',
            description:
              'Integrate MetaMask smart accounts into your dapp. Create embedded wallets that support delegated permissions, gas abstraction, and secure execution.',
            href: '/delegation-toolkit',
          },
          {
            title: 'Embedded Wallets SDK',
            description:
              'Use the Embedded Wallets SDK (Web3Auth) to onboard power users and first-time users in seconds via social logins, passkeys, or by integrating your own authentication providers.',
            href: 'https://web3auth.io/docs',
          },
          {
            title: 'Snaps',
            description:
              'Create a custom Snap to extend the functionality of MetaMask. Add support for custom networks, accounts types, and APIs.',
            href: '/snaps',
            theme: '',
          },
          {
            title: 'Services',
            description:
              'Use services provided by MetaMask and Infura to optimize essential development tasks and scale your dapp or Snap.',
            href: '/services',
            theme: '',
          },
        ]}
      />
      <CallToAction
        title={'Contribute to MetaMask on GitHub'}
        description={
          'Join the MetaMask developer community and learn how to contribute to the MetaMask project itself.'
        }
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
