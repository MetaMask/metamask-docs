import CodeBlock from '@theme/CodeBlock'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'
import type { ReactNode } from 'react'

export type SocialLoginPlatform =
  | 'react'
  | 'vue'
  | 'javascript'
  | 'react-native'
  | 'android'
  | 'ios'
  | 'flutter'
  | 'unity'
  | 'unreal'
  | 'node'

const DEFAULT_IMPLICIT_PLATFORMS: SocialLoginPlatform[] = [
  'react',
  'vue',
  'javascript',
  'react-native',
  'android',
  'ios',
  'flutter',
  'unity',
  'unreal',
]

const JWT_PLATFORMS: SocialLoginPlatform[] = [...DEFAULT_IMPLICIT_PLATFORMS, 'node']

const LABELS: Record<SocialLoginPlatform, string> = {
  react: 'React',
  vue: 'Vue',
  javascript: 'JavaScript',
  'react-native': 'React Native',
  android: 'Android',
  ios: 'iOS',
  flutter: 'Flutter',
  unity: 'Unity',
  unreal: 'Unreal Engine',
  node: 'Node.js',
}

type Props = {
  authConnection: string
  flutterProvider: string
  unityProvider?: string
  unrealProvider?: string
  auth0Connection?: string
  nativeCustom?: boolean
  showJwt?: boolean
  platforms?: SocialLoginPlatform[]
  jwtPlatforms?: SocialLoginPlatform[]
}

function PlatformTabs({
  platforms,
  children,
}: {
  platforms: SocialLoginPlatform[]
  children: (platform: SocialLoginPlatform) => ReactNode
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

function defaultImplicit(platform: SocialLoginPlatform, props: Props) {
  const { authConnection, flutterProvider, unityProvider, unrealProvider } = props
  switch (platform) {
    case 'react':
      return (
        <CodeBlock language="tsx">{`import { AUTH_CONNECTION, WALLET_CONNECTORS } from '@web3auth/modal'
import { useWeb3AuthConnect } from '@web3auth/modal/react'

const { connectTo } = useWeb3AuthConnect()

await connectTo(WALLET_CONNECTORS.AUTH, {
  authConnection: AUTH_CONNECTION.${authConnection},
})`}</CodeBlock>
      )
    case 'vue':
      return (
        <CodeBlock language="ts">{`import { AUTH_CONNECTION, WALLET_CONNECTORS } from '@web3auth/modal'
import { useWeb3AuthConnect } from '@web3auth/modal/vue'

const { connectTo } = useWeb3AuthConnect()

await connectTo(WALLET_CONNECTORS.AUTH, {
  authConnection: AUTH_CONNECTION.${authConnection},
})`}</CodeBlock>
      )
    case 'javascript':
      return (
        <CodeBlock language="ts">{`import { AUTH_CONNECTION, WALLET_CONNECTORS } from '@web3auth/modal'

await web3auth.connectTo(WALLET_CONNECTORS.AUTH, {
  authConnection: AUTH_CONNECTION.${authConnection},
})`}</CodeBlock>
      )
    case 'react-native':
      return (
        <CodeBlock language="tsx">{`import { AUTH_CONNECTION, useWeb3AuthConnect } from '@web3auth/react-native-sdk'

const { connectTo } = useWeb3AuthConnect()

await connectTo({
  authConnection: AUTH_CONNECTION.${authConnection},
})`}</CodeBlock>
      )
    case 'android':
      return (
        <CodeBlock language="kotlin">{`val response = web3Auth.connectTo(
  LoginParams(AuthConnection.${authConnection})
)`}</CodeBlock>
      )
    case 'ios':
      return (
        <CodeBlock language="swift">{`let response = try await web3Auth.connectTo(
    loginParams: LoginParams(authConnection: .${authConnection})
)`}</CodeBlock>
      )
    case 'flutter':
      return (
        <CodeBlock language="dart">{`final response = await Web3AuthFlutter.login(
  LoginParams(loginProvider: Provider.${flutterProvider}),
);`}</CodeBlock>
      )
    case 'unity':
      return (
        <CodeBlock language="csharp">{`var options = new LoginParams
{
    loginProvider = Provider.${unityProvider ?? authConnection}
};

web3Auth.login(options);`}</CodeBlock>
      )
    case 'unreal':
      return (
        <CodeBlock language="cpp">{`FWeb3AuthLoginParams LoginParams;
LoginParams.LoginProvider = TEXT("${unrealProvider ?? flutterProvider}");

UWeb3AuthSDK::GetInstance()->Login(LoginParams);`}</CodeBlock>
      )
    default:
      return null
  }
}

function nativeCustomImplicit(platform: SocialLoginPlatform, props: Props) {
  const { authConnection } = props
  switch (platform) {
    case 'react':
    case 'vue':
      return (
        <CodeBlock
          language={platform === 'react' ? 'tsx' : 'ts'}>{`await connectTo(WALLET_CONNECTORS.AUTH, {
  authConnection: AUTH_CONNECTION.${authConnection},
  authConnectionId: '<AUTH_CONNECTION_ID>',
})`}</CodeBlock>
      )
    case 'javascript':
      return (
        <CodeBlock language="ts">{`await web3auth.connectTo(WALLET_CONNECTORS.AUTH, {
  authConnection: AUTH_CONNECTION.${authConnection},
  authConnectionId: '<AUTH_CONNECTION_ID>',
})`}</CodeBlock>
      )
    case 'react-native':
      return (
        <CodeBlock language="tsx">{`await connectTo({
  authConnection: AUTH_CONNECTION.${authConnection},
  authConnectionId: '<AUTH_CONNECTION_ID>',
})`}</CodeBlock>
      )
    case 'android':
      return (
        <CodeBlock language="kotlin">{`val response = web3Auth.connectTo(
  LoginParams(
    authConnection = AuthConnection.${authConnection},
    authConnectionId = "<AUTH_CONNECTION_ID>"
  )
)`}</CodeBlock>
      )
    case 'ios':
      return (
        <CodeBlock language="swift">{`let response = try await web3Auth.connectTo(
    loginParams: LoginParams(
        authConnection: .${authConnection},
        authConnectionId: "<AUTH_CONNECTION_ID>"
    )
)`}</CodeBlock>
      )
    case 'flutter':
      return (
        <CodeBlock language="dart">{`final response = await Web3AuthFlutter.login(
  LoginParams(loginProvider: Provider.${props.flutterProvider}),
);`}</CodeBlock>
      )
    case 'unity':
      return (
        <CodeBlock language="csharp">{`var options = new LoginParams
{
    loginProvider = Provider.${props.unityProvider}
};

web3Auth.login(options);`}</CodeBlock>
      )
    case 'unreal':
      return (
        <p>
          Configure the custom social connection in Blueprint by following the{' '}
          <a href="/embedded-wallets/sdk/unreal/advanced/custom-authentication">
            Unreal Engine custom authentication guide
          </a>
          .
        </p>
      )
    default:
      return null
  }
}

function auth0Implicit(platform: SocialLoginPlatform, auth0Connection: string) {
  switch (platform) {
    case 'react':
    case 'vue':
      return (
        <CodeBlock
          language={platform === 'react' ? 'tsx' : 'ts'}>{`await connectTo(WALLET_CONNECTORS.AUTH, {
  authConnection: AUTH_CONNECTION.CUSTOM,
  authConnectionId: '<AUTH0_CONNECTION_ID>',
  extraLoginOptions: {
    connection: '${auth0Connection}',
  },
})`}</CodeBlock>
      )
    case 'javascript':
      return (
        <CodeBlock language="ts">{`await web3auth.connectTo(WALLET_CONNECTORS.AUTH, {
  authConnection: AUTH_CONNECTION.CUSTOM,
  authConnectionId: '<AUTH0_CONNECTION_ID>',
  extraLoginOptions: {
    connection: '${auth0Connection}',
  },
})`}</CodeBlock>
      )
    case 'react-native':
      return (
        <CodeBlock language="tsx">{`await connectTo({
  authConnection: AUTH_CONNECTION.CUSTOM,
  authConnectionId: '<AUTH0_CONNECTION_ID>',
  extraLoginOptions: {
    connection: '${auth0Connection}',
  },
})`}</CodeBlock>
      )
    case 'android':
      return (
        <CodeBlock language="kotlin">{`val response = web3Auth.connectTo(
  LoginParams(
    authConnection = AuthConnection.CUSTOM,
    authConnectionId = "<AUTH0_CONNECTION_ID>",
    extraLoginOptions = ExtraLoginOptions(
      domain = "https://<AUTH0_DOMAIN>",
      connection = "${auth0Connection}"
    )
  )
)`}</CodeBlock>
      )
    case 'ios':
      return (
        <CodeBlock language="swift">{`let response = try await web3Auth.connectTo(
    loginParams: LoginParams(
        authConnection: .CUSTOM,
        authConnectionId: "<AUTH0_CONNECTION_ID>",
        extraLoginOptions: ExtraLoginOptions(
            domain: "https://<AUTH0_DOMAIN>",
            connection: "${auth0Connection}"
        )
    )
)`}</CodeBlock>
      )
    case 'flutter':
      return (
        <CodeBlock language="dart">{`final response = await Web3AuthFlutter.login(
  LoginParams(
    loginProvider: Provider.jwt,
    extraLoginOptions: ExtraLoginOptions(
      domain: 'https://<AUTH0_DOMAIN>',
      verifierIdField: 'sub',
      connection: '${auth0Connection}',
    ),
  ),
);`}</CodeBlock>
      )
    case 'unity':
      return (
        <CodeBlock language="csharp">{`var options = new LoginParams
{
    loginProvider = Provider.JWT,
    extraLoginOptions = new ExtraLoginOptions
    {
        domain = "https://<AUTH0_DOMAIN>",
        verifierIdField = "sub",
        connection = "${auth0Connection}"
    }
};

web3Auth.login(options);`}</CodeBlock>
      )
    case 'unreal':
      return (
        <p>
          The current Unreal Engine SDK documentation provides this flow through Blueprint
          configuration, not a verified C++ example. Configure the Auth0 connection by following the{' '}
          <a href="/embedded-wallets/sdk/unreal/advanced/custom-authentication">
            Unreal Engine custom authentication guide
          </a>
          .
        </p>
      )
    default:
      return null
  }
}

function jwtFlow(platform: SocialLoginPlatform) {
  switch (platform) {
    case 'react':
    case 'vue':
      return (
        <CodeBlock
          language={platform === 'react' ? 'tsx' : 'ts'}>{`const idToken = await getIdToken()

await connectTo(WALLET_CONNECTORS.AUTH, {
  authConnection: AUTH_CONNECTION.CUSTOM,
  authConnectionId: '<CUSTOM_CONNECTION_ID>',
  idToken,
})`}</CodeBlock>
      )
    case 'javascript':
      return (
        <CodeBlock language="ts">{`const idToken = await getIdToken()

await web3auth.connectTo(WALLET_CONNECTORS.AUTH, {
  authConnection: AUTH_CONNECTION.CUSTOM,
  authConnectionId: '<CUSTOM_CONNECTION_ID>',
  idToken,
})`}</CodeBlock>
      )
    case 'react-native':
      return (
        <CodeBlock language="tsx">{`const idToken = await getIdToken()

await connectTo({
  authConnection: AUTH_CONNECTION.CUSTOM,
  authConnectionId: '<CUSTOM_CONNECTION_ID>',
  idToken,
})`}</CodeBlock>
      )
    case 'android':
      return (
        <CodeBlock language="kotlin">{`val response = web3Auth.connectTo(
  LoginParams(
    authConnection = AuthConnection.CUSTOM,
    authConnectionId = "<CUSTOM_CONNECTION_ID>",
    idToken = idToken
  )
)`}</CodeBlock>
      )
    case 'ios':
      return (
        <CodeBlock language="swift">{`let response = try await web3Auth.connectTo(
    loginParams: LoginParams(
        authConnection: .CUSTOM,
        authConnectionId: "<CUSTOM_CONNECTION_ID>",
        idToken: idToken
    )
)`}</CodeBlock>
      )
    case 'flutter':
      return (
        <CodeBlock language="dart">{`final response = await Web3AuthFlutter.login(
  LoginParams(
    loginProvider: Provider.jwt,
    extraLoginOptions: ExtraLoginOptions(
      id_token: idToken,
    ),
  ),
);`}</CodeBlock>
      )
    case 'unity':
      return (
        <CodeBlock language="csharp">{`var options = new LoginParams
{
    loginProvider = Provider.JWT,
    extraLoginOptions = new ExtraLoginOptions
    {
        id_token = idToken
    }
};

web3Auth.login(options);`}</CodeBlock>
      )
    case 'unreal':
      return (
        <p>
          The current Unreal Engine SDK documentation doesn't provide a verified C++ JWT example.
          Configure the JWT connection and login in Blueprint by following the{' '}
          <a href="/embedded-wallets/sdk/unreal/advanced/custom-authentication">
            Unreal Engine custom authentication guide
          </a>
          .
        </p>
      )
    case 'node':
      return (
        <CodeBlock language="ts">{`const result = await web3auth.connect({
  authConnectionId: '<CUSTOM_CONNECTION_ID>',
  idToken,
})`}</CodeBlock>
      )
    default:
      return null
  }
}

export default function SocialLoginExamples(props: Props) {
  const implicitPlatforms = props.platforms ?? DEFAULT_IMPLICIT_PLATFORMS
  const jwtPlatforms =
    props.jwtPlatforms ?? JWT_PLATFORMS.filter(p => p === 'node' || implicitPlatforms.includes(p))

  return (
    <>
      <h3>Default implicit flow</h3>
      <PlatformTabs platforms={implicitPlatforms}>
        {platform => defaultImplicit(platform, props)}
      </PlatformTabs>

      {props.nativeCustom && (
        <>
          <h3>Native custom implicit flow</h3>
          <p>
            Use these examples after you add your own client ID on the social connection in the
            dashboard. For Android and iOS, add the connection to <code>authConnectionConfig</code>{' '}
            during initialization. Flutter, Unity, and Unreal Engine currently use their platform's{' '}
            <code>loginConfig</code>; configure it by following the custom authentication guide for{' '}
            <a href="/embedded-wallets/sdk/flutter/advanced/custom-authentication">Flutter</a>,{' '}
            <a href="/embedded-wallets/sdk/unity/advanced/custom-authentication">Unity</a>, or{' '}
            <a href="/embedded-wallets/sdk/unreal/advanced/custom-authentication">Unreal Engine</a>.
          </p>
          <PlatformTabs platforms={implicitPlatforms}>
            {platform => nativeCustomImplicit(platform, props)}
          </PlatformTabs>
        </>
      )}

      {props.auth0Connection && (
        <>
          <h3>Auth0 implicit flow</h3>
          <p>
            These examples use the Auth0 custom connection configured for your SDK. Replace the
            connection ID and domain with your Auth0 values. For Android and iOS, add the connection
            to <code>authConnectionConfig</code> during initialization. Flutter, Unity, and Unreal
            Engine currently use their platform's <code>loginConfig</code>; configure it by
            following the custom authentication guide for{' '}
            <a href="/embedded-wallets/sdk/flutter/advanced/custom-authentication">Flutter</a>,{' '}
            <a href="/embedded-wallets/sdk/unity/advanced/custom-authentication">Unity</a>, or{' '}
            <a href="/embedded-wallets/sdk/unreal/advanced/custom-authentication">Unreal Engine</a>.
          </p>
          <PlatformTabs platforms={implicitPlatforms}>
            {platform => auth0Implicit(platform, props.auth0Connection as string)}
          </PlatformTabs>
        </>
      )}

      {props.showJwt !== false && (
        <>
          <h3>JWT flow</h3>
          <p>
            Obtain a fresh ID token from your identity aggregator or backend before calling Embedded
            Wallets. The token issuer and claims must match the custom connection in the dashboard.
          </p>
          <PlatformTabs platforms={jwtPlatforms}>{platform => jwtFlow(platform)}</PlatformTabs>
        </>
      )}
    </>
  )
}
