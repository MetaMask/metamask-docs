import Layout from '@theme/Layout'
import CardSection from '@site/src/components/CardSection'
import Hero from '@site/src/components/elements/hero'
import CallToAction from '@site/src/components/elements/call-to-action'
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
        link={{
          to: '/wallet',
          label: 'Get Started',
        }}
      />
      <CardSection />
      <CallToAction
        title={'Contribute to MetaMask on Github'}
        description={
          'Join the MetaMask developer community and learn how to contribute to the MetaMask project itself.'
        }
        link={{
          to: '/wallet',
          label: 'Contribute',
        }}
      />
    </Layout>
  )
}
