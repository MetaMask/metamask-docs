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
export const pnpAndroidVersion = `10.0.x`
export const pnpIOSVersion = `11.1.0`
export const pnpRNVersion = `8.1.x`
export const pnpFlutterVersion = `6.1.2`
export const pnpUnityVersion = `7.0.x`
export const pnpUnrealVersion = `4.1.x`

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