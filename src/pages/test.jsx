import Layout from '@theme/Layout'
import Heading from '@theme/Heading'
import Pill from '@site/src/components/Pill'
import YoutubeEmbed from '@site/src/components/YoutubeEmbed'
import SectionAPIs from '@site/src/components/Sections/SectionAPIs'
import SectionNetworks from '@site/src/components/Sections/SectionNetworks'
import CodeTerminal from '@site/src/components/CodeTerminal/CodeTerminal'

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

        <YoutubeEmbed url="https://www.youtube.com/embed/qZRAryYwgdg?si=CeImIULgH3iD-FF0" />

        <SectionAPIs />
        <SectionNetworks />

        <CodeTerminal />
      </div>
    </Layout>
  )
}
