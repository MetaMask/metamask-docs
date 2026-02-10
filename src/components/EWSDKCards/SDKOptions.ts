export const reactJS = 'React'
export const angular = 'Angular'
export const vue = 'Vue'
export const nextjs = 'Next JS'
export const web = 'Web'
export const mobile = 'Mobile'
export const gaming = 'Gaming'
export const enterprise = 'Enterprise'
export const backend = 'Backend'
export const android = 'Android'
export const ios = 'iOS'
export const js = 'Javascript'
export const macOS = 'macOS'
export const reactnative = 'React Native'
export const rnbare = 'React Native Bare'
export const rnexpo = 'React Native Expo'
export const rnlist = [rnbare, rnexpo]
export const flutter = 'Flutter'
export const unity = 'Unity'
export const unreal = 'Unreal Engine'
export const nodejs = 'Node.js'
export const weblist = [reactJS, angular, vue, nextjs]

export const pnp = 'Plug and Play'
export const sfa = 'Single Factor Auth'
export const pnpwebmodal = 'Plug and Play Web Modal'
export const pnpwebnomodal = 'Plug and Play Web No Modal'
export const pnpandroid = 'Plug and Play Android'
export const pnpios = 'Plug and Play iOS'
export const pnprn = 'Plug and Play React Native'
export const pnpflutter = 'Plug and Play Flutter'
export const pnpunity = 'Plug and Play Unity'
export const pnpunreal = 'Plug and Play Unreal'
export const pnplist = [
  { label: 'Web - Modal', value: pnpwebmodal, platforms: [...weblist] },
  { label: 'Web - No Modal', value: pnpwebnomodal, platforms: [...weblist] },
  { label: 'Android', value: pnpandroid, platforms: [android] },
  { label: 'iOS', value: pnpios, platforms: [ios] },
  { label: 'React Native', value: pnprn, platforms: [...rnlist] },
  { label: 'Flutter', value: pnpflutter, platforms: [flutter] },
  { label: 'Unity', value: pnpunity, platforms: [unity] },
  { label: 'Unreal', value: pnpunreal, platforms: [unreal] },
]

export const mpccorekit = 'MPC Core Kit'
export const singlefactorauth = 'Single Factor Auth'
export const singlefactorauthjs = 'SFA JS'
export const singlefactorauthandroid = 'SFA Android'
export const singlefactorauthios = 'SFA Swift'
export const singlefactorauthflutter = 'SFA Flutter'
export const mpccorekitjs = 'MPC Core Kit JS'
export const mpccorekitreactnative = 'MPC Core Kit React Native'

export const sfalist = [
  { label: 'SFA JS', value: singlefactorauthjs, platforms: [...weblist, reactnative, nodejs] },
  { label: 'SFA Android', value: singlefactorauthandroid, platforms: [android] },
  { label: 'SFA Swift', value: singlefactorauthios, platforms: [ios, macOS] },
  { label: 'SFA Flutter', value: singlefactorauthflutter, platforms: [flutter] },
]

export const mpccorekitlist = [
  { label: 'MPC Core Kit JS', value: mpccorekitjs, platforms: [...weblist, reactnative, nodejs] },
  { label: 'MPC Core Kit React Native', value: mpccorekitreactnative, platforms: [reactnative] },
]

const getWindowLocation = () => {
  if (typeof window !== 'undefined') return window.location.href
  return 'http://localhost'
}

export const getOptionsfromURL = (): Record<string, string> => {
  const url = new URL(getWindowLocation())

  const urlOpts = {}
  url.searchParams.forEach((value, key) => {
    urlOpts[key] = value
  })

  return { ...urlOpts }
}

export const setURLfromOptions = (opts: Record<string, string>): string => {
  const url = new URL(getWindowLocation())

  url.search = ''
  for (const [key, value] of Object.entries(opts)) url.searchParams.append(key, value)
  return url.toString()
}
