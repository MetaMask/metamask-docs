import Layout from '@theme/Layout'
import Heading from '@theme/Heading'
import Pill from '@site/src/components/Pill'
import SnapsSection from '@site/src/components/SnapsSection'
import YoutubeEmbed from '@site/src/components/YoutubeEmbed'

export default function Test() {
  return (
    <Layout title={'Test'}>
      <div className="container">
        <Heading as="h4" className={'type-heading-xs'}>
          Pill Component
        </Heading>
        <br />
        <Pill color="green">
          MetaMask supports EIP-6963, which introduces an alternative discovery mechanism to the
           window.ethereum  injected provider. This alternative mechanism enables dapps to detect
          multiple wallets in the user's browser. We recommend detecting multiple wallets to improve
          the user experience.
        </Pill>
        <Pill color="orange">
          MetaMask supports EIP-6963, which introduces an alternative discovery mechanism to the
           window.ethereum  injected provider. This alternative mechanism enables dapps to detect
          multiple wallets in the user's browser. We recommend detecting multiple wallets to improve
          the user experience.
        </Pill>
        <Pill color="blue">
          MetaMask supports EIP-6963, which introduces an alternative discovery mechanism to the
           window.ethereum  injected provider. This alternative mechanism enables dapps to detect
          multiple wallets in the user's browser. We recommend detecting multiple wallets to improve
          the user experience.
        </Pill>
        <Pill color="red">
          MetaMask supports EIP-6963, which introduces an alternative discovery mechanism to the
           window.ethereum  injected provider. This alternative mechanism enables dapps to detect
          multiple wallets in the user's browser. We recommend detecting multiple wallets to improve
          the user experience.
        </Pill>
        <Pill color="grey">
          MetaMask supports EIP-6963, which introduces an alternative discovery mechanism to the
           window.ethereum  injected provider. This alternative mechanism enables dapps to detect
          multiple wallets in the user's browser. We recommend detecting multiple wallets to improve
          the user experience.
        </Pill>

        <SnapsSection
          items={[
            {
              colorPalette: 'purple',
              title: 'Extend the functionality of MetaMask using Snaps',
              description:
                'A Snap is a JavaScript program run in an isolated environment that customizes the MetaMask wallet experience. You can create a Snap that adds new API methods, adds support for different blockchain protocols, or modifies existing functionalities.',
              cards: [
                {
                  title: 'Snaps quickstart',
                  description:
                    'Get started quickly by creating and customizing a simple Snap, using the Snaps template built with React and TypeScript.',
                  href: '/snaps/get-started/quickstart',
                },
                {
                  title: 'Snaps tutorials',
                  description:
                    'Follow the step-by-step tutorials to create Snaps that estimate gas fees, provide transaction insights with custom UI, and more.',
                  href: '/snaps/learn/tutorials',
                },
                {
                  title: 'Snaps API',
                  description:
                    'Use the Snaps API to modify the functionality of MetaMask and communicate between dapps and Snaps.',
                  href: '/snaps/learn/tutorials',
                },
              ],
            },
          ]}
        />

        <YoutubeEmbed url="https://www.youtube.com/embed/qZRAryYwgdg?si=CeImIULgH3iD-FF0" />
      </div>
    </Layout>
  )
}
