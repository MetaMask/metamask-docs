/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "cbaf34eece5c3a1d90533ee90820544b"
  },
  {
    "url": "api/cli.html",
    "revision": "9f1dc17e58468c9b5fda61a3ec03dd86"
  },
  {
    "url": "api/node.html",
    "revision": "d3060c9007005a308d93b9eb60cbbc40"
  },
  {
    "url": "architecture.png",
    "revision": "9a93cf6cea38878e19c5816d1af28b17"
  },
  {
    "url": "assets/css/0.styles.2080423f.css",
    "revision": "638deaf226d0623126022b8dfabd88aa"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.7ad5f15d.js",
    "revision": "753f4dc66708517733bb4f7a198ac34f"
  },
  {
    "url": "assets/js/100.640c886c.js",
    "revision": "c06b57326575a206b15e29c12060c4fa"
  },
  {
    "url": "assets/js/11.ce10a934.js",
    "revision": "9bbdcc601166f53a0879efbaf9dcb970"
  },
  {
    "url": "assets/js/12.9ead5e4e.js",
    "revision": "94900d8316b6bf1d0e13322bc9d52e11"
  },
  {
    "url": "assets/js/13.304381a9.js",
    "revision": "caa384fcd8283096bd98182b94109f6c"
  },
  {
    "url": "assets/js/14.34d23a0f.js",
    "revision": "031e669c10770e17c6603c7d55f3062d"
  },
  {
    "url": "assets/js/15.31c9f668.js",
    "revision": "560d7b83b8a513bb1970e4dc7869b2b1"
  },
  {
    "url": "assets/js/16.9e228efb.js",
    "revision": "8fde93ed0622ebbeedeb6cbd88cbec0b"
  },
  {
    "url": "assets/js/17.ee30be1b.js",
    "revision": "e5461aa10dcf8562a567d4cc3b1cbcbd"
  },
  {
    "url": "assets/js/18.059e43de.js",
    "revision": "031f97a9d6cceafeea9d8f93874f41b4"
  },
  {
    "url": "assets/js/19.a7330617.js",
    "revision": "cd0be5308dca58b97efa93a3916f7a1b"
  },
  {
    "url": "assets/js/20.34306a8a.js",
    "revision": "67bb92ebf57147b7bae31c34f2f76a51"
  },
  {
    "url": "assets/js/21.5428b2e9.js",
    "revision": "8784638fc9af6ac3551eaef18004391b"
  },
  {
    "url": "assets/js/22.1ce20f84.js",
    "revision": "df94a8f5b6d916c526ac066b4cfd1ac7"
  },
  {
    "url": "assets/js/23.ba14c645.js",
    "revision": "87884ca1421b0a11e2f32e84315a1f71"
  },
  {
    "url": "assets/js/24.ae62da12.js",
    "revision": "c5ee5495f78d7af60e54e2815d4e028d"
  },
  {
    "url": "assets/js/25.9f30cf35.js",
    "revision": "bb3f371053000107f78247cc56146c00"
  },
  {
    "url": "assets/js/26.791257ea.js",
    "revision": "357ec8e39511d3519b84b9acd64a224e"
  },
  {
    "url": "assets/js/27.11cf48bc.js",
    "revision": "6f6a8b8873b2969bf0ed0e72b0174228"
  },
  {
    "url": "assets/js/28.15c385cb.js",
    "revision": "53a15e8cf662ff6b17a77e8094498ac8"
  },
  {
    "url": "assets/js/29.83aa52c3.js",
    "revision": "af663ef4eb88dc09a2c0b63df9af942f"
  },
  {
    "url": "assets/js/3.7d449caf.js",
    "revision": "83aa9f244cc1c8fb18dead6001363dde"
  },
  {
    "url": "assets/js/30.77cf4566.js",
    "revision": "52ac5788a0e566fd66d0ace7957db5e8"
  },
  {
    "url": "assets/js/31.22349c62.js",
    "revision": "773aecac4f3ead22a709eb7acafe66a4"
  },
  {
    "url": "assets/js/32.db99b6c6.js",
    "revision": "7ce15e24673c6b56692801ac28d73624"
  },
  {
    "url": "assets/js/33.ced3972a.js",
    "revision": "e2ca4a043439f8a9dc88f6ccb600960b"
  },
  {
    "url": "assets/js/34.1dfc8789.js",
    "revision": "3ca14498e809ca26b94a1afddbb53bec"
  },
  {
    "url": "assets/js/35.8f594d08.js",
    "revision": "347b198bd886f9bf705879dea05952d8"
  },
  {
    "url": "assets/js/36.4291cafa.js",
    "revision": "e51b6c87493c9b9e7b2c32048d0bc7d5"
  },
  {
    "url": "assets/js/37.910d2486.js",
    "revision": "bba94042b7a2e7e5d4a2bb1303618c2d"
  },
  {
    "url": "assets/js/38.a9ce4078.js",
    "revision": "141cc49333e4484982ddb3df203ee281"
  },
  {
    "url": "assets/js/39.5c8151ff.js",
    "revision": "c6e3a7845ac7604e16c142d246cbe7d3"
  },
  {
    "url": "assets/js/4.61825a8d.js",
    "revision": "d03e5f72658edfce737119bf2f5a5c30"
  },
  {
    "url": "assets/js/40.ec5e0081.js",
    "revision": "e3ac697971a2562e19a1004562e87e3a"
  },
  {
    "url": "assets/js/41.3cdaec3b.js",
    "revision": "21bb0f48d8ea7995ac7f8b6759f9a215"
  },
  {
    "url": "assets/js/42.578fa7a7.js",
    "revision": "dd406a7524e9a2fa6809404a424e67b0"
  },
  {
    "url": "assets/js/43.01a9474e.js",
    "revision": "1a9ce1ad21f2c01f342a928b48b9d8af"
  },
  {
    "url": "assets/js/44.69cb4ffb.js",
    "revision": "71558e8832a83419a9e5f45cea9c8f6e"
  },
  {
    "url": "assets/js/45.c8ca8a54.js",
    "revision": "f2c7ea0dc7de4d6bd3417fb70805f7de"
  },
  {
    "url": "assets/js/46.fa0e42b0.js",
    "revision": "fb6dc227dd17af626a5c1a4b8f59d2fd"
  },
  {
    "url": "assets/js/47.1719b087.js",
    "revision": "b01bb84e804feaaf3d6c7b5668d1ce27"
  },
  {
    "url": "assets/js/48.81611823.js",
    "revision": "d2cb35059e58fc3bb4f3ea1fb1df5195"
  },
  {
    "url": "assets/js/49.ff5557bd.js",
    "revision": "4c0ae8fa7a4eb9b358974cd286a70632"
  },
  {
    "url": "assets/js/5.236a16fa.js",
    "revision": "390fd0e6266ac81013b6d2ddaa4bb456"
  },
  {
    "url": "assets/js/50.c7be4a15.js",
    "revision": "c26c6f4ad4338106c002c8d61cffbf4c"
  },
  {
    "url": "assets/js/51.f77f5871.js",
    "revision": "ad8b0c9b37ffddcf4f3b664c5592bf1b"
  },
  {
    "url": "assets/js/52.c9def533.js",
    "revision": "dc3d35c7d29eac8ac82875618b59f3e2"
  },
  {
    "url": "assets/js/53.6dce2cb1.js",
    "revision": "6ab6eff543f2213e51dd6627b310e5ff"
  },
  {
    "url": "assets/js/54.9fb76124.js",
    "revision": "d4c6f330badea612c0c1a591763c69d8"
  },
  {
    "url": "assets/js/55.3fd2bd40.js",
    "revision": "91f08684c00c1e6e037310b82db004df"
  },
  {
    "url": "assets/js/56.fb764b32.js",
    "revision": "7b9b6f35edef03090690f1358bc537e6"
  },
  {
    "url": "assets/js/57.9ee52f4c.js",
    "revision": "e78e4e5d919034d61fae9b1ab26f3a4e"
  },
  {
    "url": "assets/js/58.b6f4d561.js",
    "revision": "a8f30d32b7cc8a3a8ac7563732e7396f"
  },
  {
    "url": "assets/js/59.175704b8.js",
    "revision": "0ebbe1b78b9105d2e6a92ecf02448957"
  },
  {
    "url": "assets/js/6.55e18c84.js",
    "revision": "38a468d3f4033c053ac5a514277805a9"
  },
  {
    "url": "assets/js/60.8b8bd743.js",
    "revision": "dba468d83772537a4b939ae6312fc0c6"
  },
  {
    "url": "assets/js/61.8d3b4e2c.js",
    "revision": "ac850feb96f89d5788cd922f3cb5befc"
  },
  {
    "url": "assets/js/62.92792b87.js",
    "revision": "7df6ec64fdec5b03dc25e44faf7af73e"
  },
  {
    "url": "assets/js/63.6973c4d9.js",
    "revision": "15a6d6142381d5fd08f11771f6beb417"
  },
  {
    "url": "assets/js/64.c240f8aa.js",
    "revision": "42f1ccd7a03e511c931919ab5a018ac1"
  },
  {
    "url": "assets/js/65.2e596859.js",
    "revision": "355944713c3f901820f660c680200b23"
  },
  {
    "url": "assets/js/66.f9a17f21.js",
    "revision": "e2ee4b276c3d13d222a6c22bf2e705b7"
  },
  {
    "url": "assets/js/67.8264ed39.js",
    "revision": "19f5d392bd44bb38ad69e1c193614cc0"
  },
  {
    "url": "assets/js/68.90e9dae4.js",
    "revision": "87fc4e9918b9e6244f1e4320d94a36a3"
  },
  {
    "url": "assets/js/69.47ec6641.js",
    "revision": "16d3dea11d89ef5e6a193924705a6385"
  },
  {
    "url": "assets/js/7.cd2cb73c.js",
    "revision": "17fb5a2ec265d3fa65d6ef0cd01594e3"
  },
  {
    "url": "assets/js/70.333a7f80.js",
    "revision": "b5cbcdfaad57480357a6770686fbbfb9"
  },
  {
    "url": "assets/js/71.99735c9f.js",
    "revision": "7387963f9880c79ddf03b4f15f908b92"
  },
  {
    "url": "assets/js/72.4652cf1c.js",
    "revision": "ba9d83f4c43ca954965c8cb3831a0414"
  },
  {
    "url": "assets/js/73.b19db593.js",
    "revision": "315e79e263b950c98ab9fec6d18c9cbe"
  },
  {
    "url": "assets/js/74.65b840bf.js",
    "revision": "01c6758bae6f03a55a39077f06347453"
  },
  {
    "url": "assets/js/75.3d28dc2b.js",
    "revision": "07bd65362714b1ce843e24aeb5e2fffb"
  },
  {
    "url": "assets/js/76.b4300df9.js",
    "revision": "c19e4befba298b655ff7c2e6315c6621"
  },
  {
    "url": "assets/js/77.6eb9a9ca.js",
    "revision": "1262bec93e91d0c34980581e65d0c8db"
  },
  {
    "url": "assets/js/78.47d6692c.js",
    "revision": "18579b6d7136e83eb6842c2462045362"
  },
  {
    "url": "assets/js/79.8c959b32.js",
    "revision": "606c0e0180e4f919020331f310c328be"
  },
  {
    "url": "assets/js/8.9b560a00.js",
    "revision": "c0c47efb900df43bc6765cb7bcbabc5c"
  },
  {
    "url": "assets/js/80.63dcfb58.js",
    "revision": "c8f63f4188c74eb2cd1be2e7f88a9037"
  },
  {
    "url": "assets/js/81.3f0c13f5.js",
    "revision": "df3952149caacbd1b5c573f53ba2af08"
  },
  {
    "url": "assets/js/82.ed704b90.js",
    "revision": "e47aedc716a688adbdf875fe2ce4d326"
  },
  {
    "url": "assets/js/83.9489ece7.js",
    "revision": "fe9d3b1ad4ab239c08245d971d59569b"
  },
  {
    "url": "assets/js/84.a72af7c6.js",
    "revision": "a79084e5264ed464b27d0ab7d38c5624"
  },
  {
    "url": "assets/js/85.a0526685.js",
    "revision": "cc3d26f9effd82dcbd7d912128b1a64c"
  },
  {
    "url": "assets/js/86.c362814c.js",
    "revision": "63cf8f62c622cf34b9ca8cc1f8a45ae2"
  },
  {
    "url": "assets/js/87.34e3e960.js",
    "revision": "d4ebf7f38d5ad378d7b8cfaaead4ecc1"
  },
  {
    "url": "assets/js/88.f4b85284.js",
    "revision": "0ffae702ca3258cc5f9bde2dadec29a6"
  },
  {
    "url": "assets/js/89.ca484430.js",
    "revision": "8b8b1def4393815bb8f16f97389d55b6"
  },
  {
    "url": "assets/js/9.04955c94.js",
    "revision": "8948b362dadd7c6cfbb467654e483a16"
  },
  {
    "url": "assets/js/90.017336d0.js",
    "revision": "e7544d4bcd9ff468e42b082cf23a41ab"
  },
  {
    "url": "assets/js/91.7197c9d3.js",
    "revision": "fe29e7490a97fb859e7c03457e6ee0c5"
  },
  {
    "url": "assets/js/92.136f1727.js",
    "revision": "0b53cd80545e2dfd38abf1226adf20a3"
  },
  {
    "url": "assets/js/93.541af6d9.js",
    "revision": "6cd2cdace077200bb2812e0801265ea9"
  },
  {
    "url": "assets/js/94.3bf916cc.js",
    "revision": "22d85d68790755b883110824383f19a3"
  },
  {
    "url": "assets/js/95.8e044273.js",
    "revision": "86f55a41fa9405fc1ef9f5ea34c9407e"
  },
  {
    "url": "assets/js/96.e1d3c4dd.js",
    "revision": "f360a3382a6907f66f481a6ee1f5ba44"
  },
  {
    "url": "assets/js/97.84ec3460.js",
    "revision": "bc78c5fa6704101120b4035a924b7b0a"
  },
  {
    "url": "assets/js/98.021adb88.js",
    "revision": "fa14c23c5459e666112be26044f96b06"
  },
  {
    "url": "assets/js/99.c263a934.js",
    "revision": "60e26fbc70e7016088d730914127cc69"
  },
  {
    "url": "assets/js/app.e3fe4142.js",
    "revision": "f4e757305f692dae1f334833939eb3aa"
  },
  {
    "url": "assets/js/vendors~notification.9e32ed3d.js",
    "revision": "9e4fe116cdce75067138e88e792bd3fe"
  },
  {
    "url": "config/index.html",
    "revision": "91f1219a53f521c4f61de51b540583a7"
  },
  {
    "url": "ethereum-metamask-chrome.png",
    "revision": "79226bac078ce93a58b74aff1a8a6aa3"
  },
  {
    "url": "faq/index.html",
    "revision": "6e5a4bc5d8c436454db0796dd8c94c71"
  },
  {
    "url": "guide/accessing-accounts.html",
    "revision": "08025a21dc0c3485082a654483831870"
  },
  {
    "url": "guide/assets.html",
    "revision": "62588d3ca426bee5082dfe619fb0e328"
  },
  {
    "url": "guide/common-terms.html",
    "revision": "bee2ecfe9ab6bffbcc27f5991269b4d3"
  },
  {
    "url": "guide/defining-your-icon.html",
    "revision": "b8c35825f246171736647892076204d4"
  },
  {
    "url": "guide/deploy.html",
    "revision": "1784d7e54f0fd9d53f2b04b4548cfb61"
  },
  {
    "url": "guide/ethereum-provider.html",
    "revision": "d6f600a3ac919d3e7a8ad3b8a7074379"
  },
  {
    "url": "guide/experimental-apis.html",
    "revision": "24dd26461d10322ded30375157dc69a8"
  },
  {
    "url": "guide/frontmatter.html",
    "revision": "8864bad4c28ba81d7a9b9efc3d926ecf"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "6a95a00191f4f038b2dd7a4cbb674e17"
  },
  {
    "url": "guide/index.html",
    "revision": "1770a4290ee05cc93086153f772f7a6a"
  },
  {
    "url": "guide/initializing-dapps.html",
    "revision": "85e1c0ed598052714c54483c334240a1"
  },
  {
    "url": "guide/json-rpc-api.html",
    "revision": "a2f435000f38dbf084119fc87f418faf"
  },
  {
    "url": "guide/registering-function-names.html",
    "revision": "ddbdf67a923a5900c61c4f074eb7f56a"
  },
  {
    "url": "guide/registering-your-token.html",
    "revision": "d5580d250cf95fa94012dc860e8a37f6"
  },
  {
    "url": "guide/sending-transactions.html",
    "revision": "8c515f7bd7a48e1f2ae711d014c0d8bd"
  },
  {
    "url": "guide/signing-data.html",
    "revision": "0b95a090a218b1e6cd219c71c9c95e31"
  },
  {
    "url": "hero.png",
    "revision": "d1fed5cb9d0a4c4269c3bcc4d74d9e64"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "f130a0b70e386170cf6f011c0ca8c4f4"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "0ff1bc4d14e5c9abcacba7c600d97814"
  },
  {
    "url": "icons/apple-touch-icon-120x120.png",
    "revision": "936d6e411cabd71f0e627011c3f18fe2"
  },
  {
    "url": "icons/apple-touch-icon-152x152.png",
    "revision": "1a034e64d80905128113e5272a5ab95e"
  },
  {
    "url": "icons/apple-touch-icon-180x180.png",
    "revision": "c43cd371a49ee4ca17ab3a60e72bdd51"
  },
  {
    "url": "icons/apple-touch-icon-60x60.png",
    "revision": "9a2b5c0f19de617685b7b5b42464e7db"
  },
  {
    "url": "icons/apple-touch-icon-76x76.png",
    "revision": "af28d69d59284dd202aa55e57227b11b"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "66830ea6be8e7e94fb55df9f7b778f2e"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "4bb1a55479d61843b89a2fdafa7849b3"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "98b614336d9a12cb3f7bedb001da6fca"
  },
  {
    "url": "icons/msapplication-icon-144x144.png",
    "revision": "b89032a4a5a1879f30ba05a13947f26f"
  },
  {
    "url": "icons/mstile-150x150.png",
    "revision": "058a3335d15a3eb84e7ae3707ba09620"
  },
  {
    "url": "icons/safari-pinned-tab.svg",
    "revision": "f78c0251d6ddd56ee219a1830ded71b4"
  },
  {
    "url": "index.html",
    "revision": "abcef30a3f04edc731c72da16ed76d73"
  },
  {
    "url": "line-numbers-desktop.png",
    "revision": "7c8ccab7c4953ac2fb9e4bc93ecd25ac"
  },
  {
    "url": "line-numbers-mobile.gif",
    "revision": "580b860f45436c9a15a9f3bd036edd97"
  },
  {
    "url": "logo.png",
    "revision": "cf23526f451784ff137f161b8fe18d5a"
  },
  {
    "url": "miscellaneous/design-concepts.html",
    "revision": "8df64088839a235688fe564a71f19858"
  },
  {
    "url": "miscellaneous/glossary.html",
    "revision": "199b91ee3d312a6fc920aa50d7a12f0e"
  },
  {
    "url": "miscellaneous/migration-guide.html",
    "revision": "3633341d2973ec0e1142a9dd7f7e053b"
  },
  {
    "url": "plugin.png",
    "revision": "3e325210d3e3752e32818385fc4afbc9"
  },
  {
    "url": "plugin/context-api.html",
    "revision": "d2d696fabee2342e6d13161b9d64e09a"
  },
  {
    "url": "plugin/index.html",
    "revision": "ed38475bc14aeaad466e331c11c463d9"
  },
  {
    "url": "plugin/life-cycle.html",
    "revision": "89307b171c1e77fce43b2b0631eb7b95"
  },
  {
    "url": "plugin/official/plugin-active-header-links.html",
    "revision": "d3840d80180bd9d4191a810d7670a78a"
  },
  {
    "url": "plugin/official/plugin-back-to-top.html",
    "revision": "0308bb568c7a184cfde6773b36be3ba5"
  },
  {
    "url": "plugin/official/plugin-google-analytics.html",
    "revision": "5260715625eda7d818d190b4b2ec2272"
  },
  {
    "url": "plugin/official/plugin-last-updated.html",
    "revision": "f1f22cd4dcb2c8d4e910c4d110cb5010"
  },
  {
    "url": "plugin/official/plugin-medium-zoom.html",
    "revision": "663c8120557b9da0296af0c37b3c886a"
  },
  {
    "url": "plugin/official/plugin-nprogress.html",
    "revision": "9310aec4cf3d8e4907630928aba89d2e"
  },
  {
    "url": "plugin/official/plugin-pwa.html",
    "revision": "8b16430c7de4a533b3c749c52417a33f"
  },
  {
    "url": "plugin/official/plugin-register-components.html",
    "revision": "bfb8c5da559a24e09100f551a72468fa"
  },
  {
    "url": "plugin/official/plugin-search.html",
    "revision": "7f7678959b9254c5032047eeb19960cc"
  },
  {
    "url": "plugin/option-api.html",
    "revision": "7d546ea9abb985d2996de0863fafd8dc"
  },
  {
    "url": "plugin/using-a-plugin.html",
    "revision": "884477987556bb5573ec6350c3a970fb"
  },
  {
    "url": "plugin/writing-a-plugin.html",
    "revision": "79029c14aefc1027dab1f72c5c1b0f14"
  },
  {
    "url": "theme/default-theme-config.html",
    "revision": "213cc0ee38cb380967759e5c91075c21"
  },
  {
    "url": "theme/index.html",
    "revision": "5b31a91bdde0073d232a67f1ff727e02"
  },
  {
    "url": "theme/inheritance.html",
    "revision": "2ad23942f581c39ca7545ccacc2ddbfe"
  },
  {
    "url": "theme/option-api.html",
    "revision": "919d462e30c01c47071b96f70656ca66"
  },
  {
    "url": "theme/using-a-theme.html",
    "revision": "468e70276790a88c7fee239b2bc45c76"
  },
  {
    "url": "theme/writing-a-theme.html",
    "revision": "25903102d139786bb67f3be6829285b9"
  },
  {
    "url": "zh/api/cli.html",
    "revision": "9fab1b575adde999afebe0ab5e1aa7b2"
  },
  {
    "url": "zh/api/node.html",
    "revision": "346f9ace159ae11c3e824cbfdd305700"
  },
  {
    "url": "zh/config/index.html",
    "revision": "b39cb2f1cd949be6d67c6722dda0e07c"
  },
  {
    "url": "zh/faq/index.html",
    "revision": "4ea8b1060931eb095a2b43e3faea24fd"
  },
  {
    "url": "zh/guide/assets.html",
    "revision": "ad2605616abd0cd4ed7afea76d1f8fdf"
  },
  {
    "url": "zh/guide/basic-config.html",
    "revision": "21a08ce78e0741471a12b92f88742e52"
  },
  {
    "url": "zh/guide/deploy.html",
    "revision": "49672b5b5dee7b07ccbfc59cca18e961"
  },
  {
    "url": "zh/guide/directory-structure.html",
    "revision": "7e4e5a61cb56381dcebcd8d99e6959a9"
  },
  {
    "url": "zh/guide/frontmatter.html",
    "revision": "2c4ea4c96d9f8caf0cbb7f23d8995afc"
  },
  {
    "url": "zh/guide/getting-started.html",
    "revision": "97d31f0dd4765b7467476ac5d5900b92"
  },
  {
    "url": "zh/guide/global-computed.html",
    "revision": "db243c6b3ae4c164a3133ed00a698768"
  },
  {
    "url": "zh/guide/i18n.html",
    "revision": "61d9519a3b7dd4af68337baa0a8a6d0b"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "5058a398ce1e6677864ef4abb7cf8eea"
  },
  {
    "url": "zh/guide/markdown-slot.html",
    "revision": "0822d7070ed0a801a85d0d1349c9a5f1"
  },
  {
    "url": "zh/guide/markdown.html",
    "revision": "d07c9efbea945e5d9f549152d6e6f230"
  },
  {
    "url": "zh/guide/permalinks.html",
    "revision": "1f0abd2d5d39b42ef6b0100a340b0d4b"
  },
  {
    "url": "zh/guide/using-vue.html",
    "revision": "d0791afb9c5f6346fcb0d27470dc4c8f"
  },
  {
    "url": "zh/index.html",
    "revision": "e4c379f73b279bd1bbbe312357a45e6a"
  },
  {
    "url": "zh/miscellaneous/design-concepts.html",
    "revision": "9a7a0e2c15a32239f0ca8d4d5bfebea8"
  },
  {
    "url": "zh/miscellaneous/glossary.html",
    "revision": "3bfb88e952f5df52c95ef6f91dae2992"
  },
  {
    "url": "zh/miscellaneous/migration-guide.html",
    "revision": "62338a43bc9e32af9cc4b6ffeca97d65"
  },
  {
    "url": "zh/plugin/context-api.html",
    "revision": "931884a89ba89f4308c70524078b7330"
  },
  {
    "url": "zh/plugin/index.html",
    "revision": "425e3137bd51848afd2867ba1cd38719"
  },
  {
    "url": "zh/plugin/life-cycle.html",
    "revision": "d6eb1f76428a4ae78fecb0cc3d993f97"
  },
  {
    "url": "zh/plugin/official/plugin-active-header-links.html",
    "revision": "39d48a96615bbb25f27e9afbe6a3e32f"
  },
  {
    "url": "zh/plugin/official/plugin-back-to-top.html",
    "revision": "6b47b1a4ab3b4f2ae2377255ab5ac314"
  },
  {
    "url": "zh/plugin/official/plugin-google-analytics.html",
    "revision": "2e5beb852b8b081414c8c81d374e4b3a"
  },
  {
    "url": "zh/plugin/official/plugin-last-updated.html",
    "revision": "68066aedc890769e8b7e7e89d9d560a8"
  },
  {
    "url": "zh/plugin/official/plugin-medium-zoom.html",
    "revision": "af9559ef22385eb1df9bf524e792f0b0"
  },
  {
    "url": "zh/plugin/official/plugin-nprogress.html",
    "revision": "793eecc8adb76bd62a6c2ab307c958fe"
  },
  {
    "url": "zh/plugin/official/plugin-pwa.html",
    "revision": "48ea2aea123c43c400ed3acde039ae38"
  },
  {
    "url": "zh/plugin/official/plugin-register-components.html",
    "revision": "9333f06bc18f6b6e38243ee2c61e14af"
  },
  {
    "url": "zh/plugin/official/plugin-search.html",
    "revision": "6513da78a6549c60dd309220beb5f95a"
  },
  {
    "url": "zh/plugin/option-api.html",
    "revision": "55c2d6f2ac50286a48b83c3c28c8a1f0"
  },
  {
    "url": "zh/plugin/using-a-plugin.html",
    "revision": "776efb93ce8b8b719a89ff7d61b5eb73"
  },
  {
    "url": "zh/plugin/writing-a-plugin.html",
    "revision": "45273e414aa1c64adca150e89e010e3b"
  },
  {
    "url": "zh/theme/default-theme-config.html",
    "revision": "6ac245ad9018fdab4b02ba68aada55d1"
  },
  {
    "url": "zh/theme/index.html",
    "revision": "825dc0535f72c4c0f57d3b0f3feae793"
  },
  {
    "url": "zh/theme/inheritance.html",
    "revision": "fad671d9983806a24a7c3ff2c2411f59"
  },
  {
    "url": "zh/theme/option-api.html",
    "revision": "cb57f3518ababd5802eb52bcf45cf068"
  },
  {
    "url": "zh/theme/using-a-theme.html",
    "revision": "5f45e62c7dc7f7d093ddb8415225a042"
  },
  {
    "url": "zh/theme/writing-a-theme.html",
    "revision": "2c7e657ddb4a0eb1b2af307e13b7e52e"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
