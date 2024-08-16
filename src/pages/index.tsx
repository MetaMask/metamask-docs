import Layout from '@theme/Layout'
import CardSection from '@site/src/components/CardSection'
import Hero from '@site/src/components/Hero/Hero'
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
      <CardSection />
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
