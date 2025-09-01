export const reactJS = 'React'
export const angular = 'Angular'
export const js = 'Javascript'
export const nodejs = 'Node.js'
export const vue = 'Vue'
export const web = 'Web'

export const android = 'Android'
export const ios = 'iOS'
export const reactnative = 'React Native'
export const flutter = 'Flutter'

export const unity = 'Unity'
export const unreal = 'Unreal Engine'

export const pnpWebVersion = `10.0.x`
export const pnpAndroidVersion = `9.1.2`
export const pnpIOSVersion = `11.1.0`
export const pnpRNVersion = `8.1.x`
export const pnpFlutterVersion = `6.1.2`
export const pnpUnityVersion = `7.0.x`
export const pnpUnrealVersion = `4.1.x`

export const sfaWebVersion = `9.2.x`
export const sfaAndroidVersion = `4.0.1`
export const sfaIOSVersion = `9.1.0`
export const sfaRNVersion = `2.0.x`
export const sfaFlutterVersion = `6.0.0`
export const sfaNodeJSVersion = `7.4.x`
export const tkeyJSVersion = `15.x.x`
export const tkeyAndroidVersion = `0.0.5`
export const tkeyIOSVersion = `0.0.4`
export const mpcCoreKitJSVersion = `3.4.x`
export const mpcCoreKitReactNativeVersion = `1.0.0`

export function getPnPVersion(platform) {
  if (platform === web) {
    return pnpWebVersion
  }
  if (platform === android) {
    return pnpAndroidVersion
  }
  if (platform === ios) {
    return pnpIOSVersion
  }
  if (platform === reactnative) {
    return pnpRNVersion
  }
  if (platform === flutter) {
    return pnpFlutterVersion
  }
  if (platform === unity) {
    return pnpUnityVersion
  }
  if (platform === unreal) {
    return pnpUnrealVersion
  }
}

export function getSFAVersion(platform) {
  if (platform === reactnative) {
    return sfaRNVersion
  }
  if (platform === android) {
    return sfaAndroidVersion
  }
  if (platform === ios) {
    return sfaIOSVersion
  }
  if (platform === flutter) {
    return sfaFlutterVersion
  }
}

export function getMPCCoreKitVersion(platform) {
  if (platform === js) {
    return mpcCoreKitJSVersion
  }
  if (platform === reactnative) {
    return mpcCoreKitReactNativeVersion
  }
}
