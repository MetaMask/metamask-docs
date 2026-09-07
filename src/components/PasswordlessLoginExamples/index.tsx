import CodeBlock from '@theme/CodeBlock'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'
import type { ReactNode } from 'react'

type Method = 'email' | 'sms'

type Platform =
  'react' | 'vue' | 'javascript' | 'react-native' | 'android' | 'ios' | 'flutter' | 'unity'

const LABELS: Record<Platform, string> = {
  react: 'React',
  vue: 'Vue',
  javascript: 'JavaScript',
  'react-native': 'React Native',
  android: 'Android',
  ios: 'iOS',
  flutter: 'Flutter',
  unity: 'Unity',
}

const CONNECT_PLATFORMS: Platform[] = [
  'react',
  'vue',
  'javascript',
  'react-native',
  'android',
  'ios',
  'flutter',
  'unity',
]

const MODAL_PLATFORMS: Platform[] = ['react', 'vue', 'javascript']

function config(method: Method) {
  if (method === 'email') {
    return {
      authConnection: 'EMAIL_PASSWORDLESS',
      loginMethod: 'email_passwordless',
      flutterProvider: 'email_passwordless',
      unityProvider: 'EMAIL_PASSWORDLESS',
      hint: 'user@example.com',
      loginMethodsName: 'email passwordless login',
    }
  }
  return {
    authConnection: 'SMS_PASSWORDLESS',
    loginMethod: 'sms_passwordless',
    flutterProvider: 'sms_passwordless',
    unityProvider: 'SMS_PASSWORDLESS',
    hint: '+1-555-555-0100',
    loginMethodsName: 'SMS passwordless login',
  }
}

function PlatformTabs({
  platforms,
  children,
}: {
  platforms: Platform[]
  children: (platform: Platform) => ReactNode
}) {
  return (
    <Tabs groupId="platform">
      {platforms.map(platform => (
        <TabItem key={platform} value={platform} label={LABELS[platform]}>
          {children(platform)}
        </TabItem>
      ))}
    </Tabs>
  )
}

function connectTo(platform: Platform, method: Method, custom: boolean) {
  const c = config(method)
  const customField = custom ? `\n  authConnectionId: '<AUTH_CONNECTION_ID>',` : ''
  const extra = `extraLoginOptions: {
    login_hint: '${c.hint}',
  },`

  switch (platform) {
    case 'react':
      return (
        <CodeBlock language="tsx">{`import { AUTH_CONNECTION, WALLET_CONNECTORS } from '@web3auth/modal'
import { useWeb3AuthConnect } from '@web3auth/modal/react'

const { connectTo } = useWeb3AuthConnect()

await connectTo(WALLET_CONNECTORS.AUTH, {
  authConnection: AUTH_CONNECTION.${c.authConnection},${customField}
  ${extra}
})`}</CodeBlock>
      )
    case 'vue':
      return (
        <CodeBlock language="ts">{`import { AUTH_CONNECTION, WALLET_CONNECTORS } from '@web3auth/modal'
import { useWeb3AuthConnect } from '@web3auth/modal/vue'

const { connectTo } = useWeb3AuthConnect()

await connectTo(WALLET_CONNECTORS.AUTH, {
  authConnection: AUTH_CONNECTION.${c.authConnection},${customField}
  ${extra}
})`}</CodeBlock>
      )
    case 'javascript':
      return (
        <CodeBlock language="ts">{`import { AUTH_CONNECTION, WALLET_CONNECTORS } from '@web3auth/modal'

await web3auth.connectTo(WALLET_CONNECTORS.AUTH, {
  authConnection: AUTH_CONNECTION.${c.authConnection},${customField}
  ${extra}
})`}</CodeBlock>
      )
    case 'react-native':
      return (
        <CodeBlock language="tsx">{`import { AUTH_CONNECTION, useWeb3AuthConnect } from '@web3auth/react-native-sdk'

const { connectTo } = useWeb3AuthConnect()

await connectTo({
  authConnection: AUTH_CONNECTION.${c.authConnection},${customField}
  ${extra}
})`}</CodeBlock>
      )
    case 'android': {
      const idLine = custom ? ',\n        authConnectionId = "<AUTH_CONNECTION_ID>"' : ''
      return (
        <CodeBlock language="kotlin">{`val response = web3Auth.connectTo(
    LoginParams(
        AuthConnection.${c.authConnection},
        loginHint = "${c.hint}"${idLine}
    )
)`}</CodeBlock>
      )
    }
    case 'ios': {
      const idLine = custom ? ',\n        authConnectionId: "<AUTH_CONNECTION_ID>"' : ''
      return (
        <CodeBlock language="swift">{`let response = try await web3Auth.connectTo(
    loginParams: LoginParams(
        authConnection: .${c.authConnection},
        loginHint: "${c.hint}"${idLine}
    )
)`}</CodeBlock>
      )
    }
    case 'flutter': {
      const idNote = custom
        ? `\n    // Configure loginConfig with your Auth Connection ID during initialization.`
        : ''
      return (
        <CodeBlock language="dart">{`final response = await Web3AuthFlutter.login(
  LoginParams(
    loginProvider: Provider.${c.flutterProvider},${idNote}
    extraLoginOptions: ExtraLoginOptions(
      login_hint: '${c.hint}',
    ),
  ),
);`}</CodeBlock>
      )
    }
    case 'unity':
      return (
        <CodeBlock language="csharp">{`var options = new LoginParams
{
    loginProvider = Provider.${c.unityProvider},
    extraLoginOptions = new ExtraLoginOptions
    {
        login_hint = "${c.hint}"
    }
};

web3Auth.login(options);`}</CodeBlock>
      )
    default:
      return null
  }
}

function modalConfig(platform: Platform, method: Method) {
  const c = config(method)
  const loginMethods = `${c.loginMethod}: {
              name: '${c.loginMethodsName}',
              authConnectionId: '<AUTH_CONNECTION_ID>',
            },`

  if (platform === 'react') {
    return (
      <CodeBlock language="tsx">{`import { WALLET_CONNECTORS, WEB3AUTH_NETWORK } from '@web3auth/modal'
import { type Web3AuthContextConfig } from '@web3auth/modal/react'

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId: 'YOUR_WEB3AUTH_CLIENT_ID',
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    modalConfig: {
      connectors: {
        [WALLET_CONNECTORS.AUTH]: {
          label: 'auth',
          loginMethods: {
            ${loginMethods}
          },
        },
      },
    },
  },
}`}</CodeBlock>
    )
  }
  if (platform === 'vue') {
    return (
      <CodeBlock language="ts">{`import { WALLET_CONNECTORS, WEB3AUTH_NETWORK } from '@web3auth/modal'
import { type Web3AuthContextConfig } from '@web3auth/modal/vue'

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId: 'YOUR_WEB3AUTH_CLIENT_ID',
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    modalConfig: {
      connectors: {
        [WALLET_CONNECTORS.AUTH]: {
          label: 'auth',
          loginMethods: {
            ${loginMethods}
          },
        },
      },
    },
  },
}`}</CodeBlock>
    )
  }
  return (
    <CodeBlock language="ts">{`import { Web3Auth, WALLET_CONNECTORS, WEB3AUTH_NETWORK } from '@web3auth/modal'

const web3auth = new Web3Auth({
  clientId: 'YOUR_WEB3AUTH_CLIENT_ID',
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  modalConfig: {
    connectors: {
      [WALLET_CONNECTORS.AUTH]: {
        label: 'auth',
        loginMethods: {
          ${loginMethods}
        },
      },
    },
  },
})`}</CodeBlock>
  )
}

export default function PasswordlessLoginExamples({
  method,
  platforms,
}: {
  method: Method
  platforms?: Platform[]
}) {
  const label = method === 'email' ? 'email address' : 'phone number'
  const connectPlatforms = platforms ?? CONNECT_PLATFORMS

  return (
    <>
      <h3>Default implicit flow</h3>
      <p>
        Pass the user's {label} as <code>login_hint</code>. The default connection opens a popup for
        the OTP step.
      </p>
      <PlatformTabs platforms={connectPlatforms}>
        {platform => connectTo(platform, method, false)}
      </PlatformTabs>

      <h3>Custom connection in the modal</h3>
      <p>
        Add the Auth Connection ID from the dashboard to <code>loginMethods</code>. The email or
        phone field and OTP stay inside the modal instead of a popup.
      </p>
      <PlatformTabs platforms={MODAL_PLATFORMS}>
        {platform => modalConfig(platform, method)}
      </PlatformTabs>

      <h3>Custom implicit flow</h3>
      <p>
        When you bypass the modal, pass the same Auth Connection ID together with{' '}
        <code>login_hint</code>.
      </p>
      <PlatformTabs platforms={connectPlatforms}>
        {platform => connectTo(platform, method, true)}
      </PlatformTabs>
    </>
  )
}
