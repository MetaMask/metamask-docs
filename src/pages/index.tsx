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
          "Integrate with and extend upon the world's leading self-custodial crypto wallet."
        }
        button={{
          label: 'Get Started',
          href: '/wallet',
          icon: 'arrow-right',
        }}
      />
      <CardSection
        items={[
          {
            colorPalette: 'purple',
            title: 'Integrate your dapp with the MetaMask wallet',
            description:
              "Your dapp can use the Wallet API and MetaMask SDK to request users' Ethereum accounts, read data from connected blockchains, suggest that the user sign messages and transactions, and perform other functions on MetaMask from multiple dapp platforms.",
            cards: [
              {
                title: 'Wallet quickstart',
                description:
                  'Get started quickly by integrating your existing JavaScript or React dapp with the MetaMask wallet.',
                href: '/wallet',
                theme: '',
              },
              {
                title: 'Wallet tutorials',
                description:
                  'Follow the step-by-step tutorials to create a simple React dapp and integrate it with MetaMask.',
                href: '/wallet',
                theme: '',
              },
              {
                title: 'Wallet API',
                description:
                  "Use the JSON-RPC methods of MetaMask's Wallet API to interact with your users' Ethereum accounts.",
                href: '/wallet',
                theme: '',
              },
            ],
          },
          {
            colorPalette: 'green',
            title: 'Extend the functionality of MetaMask using Snaps',
            description:
              'A Snap is a JavaScript program run in an isolated environment that customizes the MetaMask wallet experience. You can create a Snap that adds new API methods, adds support for different blockchain protocols, or modifies existing functionalities.',
            cards: [
              {
                title: 'Snaps quickstart',
                description:
                  'Get started quickly by integrating your existing JavaScript or React dapp with the MetaMask wallet.',
                href: '/snaps',
                theme: '',
              },
              {
                title: 'Snaps tutorials',
                description:
                  'Follow the step-by-step tutorials to create Snaps that estimate gas fees, provide transaction insights with custom UI, and more.',
                href: '/snaps',
                theme: '',
              },
              {
                title: 'Snaps API',
                description:
                  'Use the Snaps API to modify the functionality of MetaMask and communicate between dapps and Snaps.',
                href: '/snaps',
                theme: '',
              },
            ],
          },
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
