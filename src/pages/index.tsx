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
        description={
          "Build with the world's leading self-custodial crypto wallet."
        }
      />
      <CardSection
        colorPalette='purple'
        cards={[
          {
            title: 'SDK',
            description:
              'Use MetaMask SDK to build onchain dapps. Authenticate users, handle transactions, and interact with contracts across the MetaMask extension and MetaMask Mobile.',
            href: '/wallet',
            theme: '',
          },
          {
            title: 'Wallet API',
            description:
              "Use the Wallet API to integrate your dapp with MetaMask. Connect to the MetaMask browser extension and interact with your users' accounts.",
            href: '/wallet',
            theme: '',
          },
          {
            title: 'Snaps',
            description:
              "Create a custom Snap to extend the functionality of MetaMask. Add support for custom networks, accounts types, and APIs.",
            href: '/wallet',
            theme: '',
          },
          {
            title: 'Services',
            description:
              "Use services provided by MetaMask and Infura to optimize essential development tasks and scale your dapp or Snap.",
            href: '/wallet',
            theme: '',
          }
        ]}
      />
      <CallToAction
        title={'Contribute to MetaMask on Github'}
        description={
          'Join the MetaMask developer community and learn how to contribute to the MetaMask project itself.'
        }
        button={{
          label: 'Contribute',
          href: 'https://github.com',
          icon: 'github',
          external: true,
        }}
      />
    </Layout>
  )
}
