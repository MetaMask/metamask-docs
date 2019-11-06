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
    "revision": "06c8e7fd7dd371aab72b748786f941cd"
  },
  {
    "url": "api/cli.html",
    "revision": "e98779ef226b98038bde48ac429cd258"
  },
  {
    "url": "api/node.html",
    "revision": "fa9cd5f3353665e54995e887d4c41f68"
  },
  {
    "url": "architecture.png",
    "revision": "9a93cf6cea38878e19c5816d1af28b17"
  },
  {
    "url": "assets/css/0.styles.9684f4d4.css",
    "revision": "d680438c3dc9e58c104c06d5dd47b115"
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
    "url": "assets/js/16.636957cf.js",
    "revision": "60edfe22eaa2e29c5186858b268145cd"
  },
  {
    "url": "assets/js/17.5db1c9da.js",
    "revision": "3da43c312e75b4f2ef03c9295b559d76"
  },
  {
    "url": "assets/js/18.059e43de.js",
    "revision": "031f97a9d6cceafeea9d8f93874f41b4"
  },
  {
    "url": "assets/js/19.c620ea0a.js",
    "revision": "9074bac195f96a148038fab106cd6e40"
  },
  {
    "url": "assets/js/20.34306a8a.js",
    "revision": "67bb92ebf57147b7bae31c34f2f76a51"
  },
  {
    "url": "assets/js/21.be9cd63f.js",
    "revision": "174055b81f13c3daefbd2c4f248bb220"
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
    "url": "assets/js/24.c4b63162.js",
    "revision": "f43442052e4d3f565fc9e0cd3f9fd165"
  },
  {
    "url": "assets/js/25.20bdae25.js",
    "revision": "d4f17c68c3d7c33c69cafa99948c7e3e"
  },
  {
    "url": "assets/js/26.8e33defd.js",
    "revision": "bbc54c737c3ad9811924a4bbda5c3dfa"
  },
  {
    "url": "assets/js/27.cfac7abe.js",
    "revision": "72af19f03b101b6bc0e2254df9651d60"
  },
  {
    "url": "assets/js/28.29c58a59.js",
    "revision": "6174e9c0770586567b2029b11036e3cd"
  },
  {
    "url": "assets/js/29.f1c3ff60.js",
    "revision": "5e1fb377f0015be04e3208ca6c703814"
  },
  {
    "url": "assets/js/3.7d449caf.js",
    "revision": "83aa9f244cc1c8fb18dead6001363dde"
  },
  {
    "url": "assets/js/30.bc66c003.js",
    "revision": "432853e6b01c0bd5913f49d6a14170bd"
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
    "url": "assets/js/34.aae3e4cd.js",
    "revision": "fc7e5a0014337df90c980580756d5bb3"
  },
  {
    "url": "assets/js/35.21e4b3ed.js",
    "revision": "99a9a8c8981d5765130bce10c6acb256"
  },
  {
    "url": "assets/js/36.75ddc138.js",
    "revision": "8ba1288cee922fdae5865c599f118d8a"
  },
  {
    "url": "assets/js/37.070ea08c.js",
    "revision": "faebeb4cef9cc9a239efe94ce53ce9aa"
  },
  {
    "url": "assets/js/38.ac87b203.js",
    "revision": "c4202b01aa65f4a53b6713ed8896d06e"
  },
  {
    "url": "assets/js/39.0ca10ab0.js",
    "revision": "89ab062fe0db4f8377c8adda9bdfd1f8"
  },
  {
    "url": "assets/js/4.af9afaa8.js",
    "revision": "5ae2a2e2af31f7ff4b299c582d57f8e2"
  },
  {
    "url": "assets/js/40.a7132b66.js",
    "revision": "07f3ff8c336a30c2c4415a5f6607ebf8"
  },
  {
    "url": "assets/js/41.3cdaec3b.js",
    "revision": "21bb0f48d8ea7995ac7f8b6759f9a215"
  },
  {
    "url": "assets/js/42.c112e013.js",
    "revision": "ceb38d19fc16d4d519b3ec2388e6e8cb"
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
    "url": "assets/js/5.72d3ff3f.js",
    "revision": "b80931fd7a8f736d68b3ee16b2f7147f"
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
    "url": "assets/js/52.1a846b06.js",
    "revision": "669f67d2a4c9d974a24c380feb2e7ac2"
  },
  {
    "url": "assets/js/53.b7c91420.js",
    "revision": "809c855127897c442df4a15cf2f6edf8"
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
    "url": "assets/js/56.efe21459.js",
    "revision": "0283fa2edfdef1470f26d2b8c58749bf"
  },
  {
    "url": "assets/js/57.b965d37f.js",
    "revision": "604f67aed5eebf56da9509d9ffc86f0b"
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
    "url": "assets/js/60.f544a08f.js",
    "revision": "2299ff2bc53e83a4045e002f57efd4b9"
  },
  {
    "url": "assets/js/61.bfe140fb.js",
    "revision": "5d3ba9668371fb4c58edf8080b5f09a8"
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
    "url": "assets/js/64.b5dc54c3.js",
    "revision": "c03eb1ceeb7272076c1aecdc4a15636b"
  },
  {
    "url": "assets/js/65.8b949139.js",
    "revision": "3add49fd713507af57a60ee6cac03139"
  },
  {
    "url": "assets/js/66.f9a17f21.js",
    "revision": "e2ee4b276c3d13d222a6c22bf2e705b7"
  },
  {
    "url": "assets/js/67.60faa6ad.js",
    "revision": "93216fc87795e33b59b2551d4e19b10b"
  },
  {
    "url": "assets/js/68.51c9004e.js",
    "revision": "841ffa84bbc714f316f22a808908659e"
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
    "url": "assets/js/72.a4cc399c.js",
    "revision": "01789f499d38109cacfafc94e47c3680"
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
    "url": "assets/js/77.75bb666a.js",
    "revision": "8583f3000b3f15eb144b42740f963655"
  },
  {
    "url": "assets/js/78.90025820.js",
    "revision": "7b229fbd341ff8688a6cdc3f5f03928a"
  },
  {
    "url": "assets/js/79.8c959b32.js",
    "revision": "606c0e0180e4f919020331f310c328be"
  },
  {
    "url": "assets/js/8.6210f377.js",
    "revision": "800fb39b7aed379265ec33af89e01212"
  },
  {
    "url": "assets/js/80.63dcfb58.js",
    "revision": "c8f63f4188c74eb2cd1be2e7f88a9037"
  },
  {
    "url": "assets/js/81.a3532808.js",
    "revision": "c244af5144592e094edeadc8c01fbc43"
  },
  {
    "url": "assets/js/82.bf9a7603.js",
    "revision": "749873fbd0c1303776b654cb907a8291"
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
    "url": "assets/js/85.a01bec10.js",
    "revision": "b0b9c6bf30fc1c431be7e897b611bb8d"
  },
  {
    "url": "assets/js/86.c40f3660.js",
    "revision": "5a1dbe2c9c97441722b6f83a1845a7e9"
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
    "url": "assets/js/97.e4e29a8b.js",
    "revision": "9bd55bc85d419cafa29506ecb2932cc6"
  },
  {
    "url": "assets/js/98.5e105aac.js",
    "revision": "ac688529f93175a84f80eb21d47b60b5"
  },
  {
    "url": "assets/js/99.9bb4e16b.js",
    "revision": "e1e658c5cf6f88674e22056de9ce71b6"
  },
  {
    "url": "assets/js/app.105d2dda.js",
    "revision": "bac402ddecddbb635fe980b55dfd165e"
  },
  {
    "url": "assets/js/vendors~notification.9e32ed3d.js",
    "revision": "9e4fe116cdce75067138e88e792bd3fe"
  },
  {
    "url": "config/index.html",
    "revision": "48274769d3572c14693dfaa7264c5535"
  },
  {
    "url": "ethereum-metamask-chrome.png",
    "revision": "79226bac078ce93a58b74aff1a8a6aa3"
  },
  {
    "url": "faq/index.html",
    "revision": "15b602115d94fc100283bb84227137ea"
  },
  {
    "url": "guide/accessing-accounts.html",
    "revision": "e08ffc20c48df84dad6f32763ed5a7df"
  },
  {
    "url": "guide/assets.html",
    "revision": "702ad4c008b1ac8ade25891041032ea0"
  },
  {
    "url": "guide/common-terms.html",
    "revision": "b056e224172c8953f9c4f652418b8e8a"
  },
  {
    "url": "guide/defining-your-icon.html",
    "revision": "4c869c9535d7b610d01eee9af786ac97"
  },
  {
    "url": "guide/deploy.html",
    "revision": "0572db65e6fcf1e20fbec0f069be9af2"
  },
  {
    "url": "guide/ethereum-provider.html",
    "revision": "301799be7845b2d82068da182d98e5e2"
  },
  {
    "url": "guide/experimental-apis.html",
    "revision": "626184b519620a845d3c474455c16180"
  },
  {
    "url": "guide/frontmatter.html",
    "revision": "c843a9ffaa5ca618a26d0837ecc42259"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "e5ea347a487515da3332802374e48712"
  },
  {
    "url": "guide/index.html",
    "revision": "47d2b2189306410069a4a920b7529bed"
  },
  {
    "url": "guide/initializing-dapps.html",
    "revision": "d8a8b1761f594b064de5dc5410e35fc5"
  },
  {
    "url": "guide/json-rpc-api.html",
    "revision": "65f68d9af1d160f9ceb9fd59abd60bf9"
  },
  {
    "url": "guide/registering-function-names.html",
    "revision": "9b91ea4eb90eb532eec6a24d7d5e1c99"
  },
  {
    "url": "guide/registering-your-token.html",
    "revision": "f118c9d95345286c99115f27ead02f87"
  },
  {
    "url": "guide/sending-transactions.html",
    "revision": "4fe72876367b5e8324382f22646a7466"
  },
  {
    "url": "guide/signing-data.html",
    "revision": "0f9061f33fc5b168908bb54eab90cddb"
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
    "revision": "1e423650355250cbc1808a617323af69"
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
    "revision": "855883689ead0c4fc56914a3b3b0daee"
  },
  {
    "url": "miscellaneous/glossary.html",
    "revision": "e4765cb9ada98c88167a24fee619a684"
  },
  {
    "url": "miscellaneous/migration-guide.html",
    "revision": "27fe94038873d5c907fc84fde6d57538"
  },
  {
    "url": "plugin.png",
    "revision": "3e325210d3e3752e32818385fc4afbc9"
  },
  {
    "url": "plugin/context-api.html",
    "revision": "800fc03cc306abef9e183d1f612340aa"
  },
  {
    "url": "plugin/index.html",
    "revision": "3e2abc2ecc85df53355c58d70d6bc7eb"
  },
  {
    "url": "plugin/life-cycle.html",
    "revision": "b6d8a396b3130d4eb9f782544208d892"
  },
  {
    "url": "plugin/official/plugin-active-header-links.html",
    "revision": "1ffd539f47ef783d80fe443a335693cc"
  },
  {
    "url": "plugin/official/plugin-back-to-top.html",
    "revision": "993c47e85b357404d8b4b5f5b6a90154"
  },
  {
    "url": "plugin/official/plugin-google-analytics.html",
    "revision": "a65b775d24fcd16fed7e35278579c4ff"
  },
  {
    "url": "plugin/official/plugin-last-updated.html",
    "revision": "4cc5106d9f077747eb53ce895f42547e"
  },
  {
    "url": "plugin/official/plugin-medium-zoom.html",
    "revision": "806cb4051f8c7332a0826e9d077d513d"
  },
  {
    "url": "plugin/official/plugin-nprogress.html",
    "revision": "7d7d150a614d56de80e2fd5c1451fa57"
  },
  {
    "url": "plugin/official/plugin-pwa.html",
    "revision": "52d4b2cfd69fad6b77eb35f74a788fad"
  },
  {
    "url": "plugin/official/plugin-register-components.html",
    "revision": "83a6cd4deaa203249691e8d4e204476c"
  },
  {
    "url": "plugin/official/plugin-search.html",
    "revision": "f33b12085e33b160641f62c48884af60"
  },
  {
    "url": "plugin/option-api.html",
    "revision": "d4d7cd9d0a8e714e2a803b575aa943ae"
  },
  {
    "url": "plugin/using-a-plugin.html",
    "revision": "38a4c81c5967a3ac723f949d2d7083f2"
  },
  {
    "url": "plugin/writing-a-plugin.html",
    "revision": "46909a6f40e0dc9f074138d5d1d16823"
  },
  {
    "url": "theme/default-theme-config.html",
    "revision": "f5015f87f749a040309b3b0d3c9908f4"
  },
  {
    "url": "theme/index.html",
    "revision": "518b1b21986aec4c0d4ecf1fe5ccc863"
  },
  {
    "url": "theme/inheritance.html",
    "revision": "f68bf439322ba8a4ebbbb43ef6124066"
  },
  {
    "url": "theme/option-api.html",
    "revision": "b54f350b5e2544daa403b64f041b09ad"
  },
  {
    "url": "theme/using-a-theme.html",
    "revision": "646f2f346284c8baac3ea0b7a953837b"
  },
  {
    "url": "theme/writing-a-theme.html",
    "revision": "3a55d0980ecc08de26b01c5ca8815aa0"
  },
  {
    "url": "zh/api/cli.html",
    "revision": "ae24dfeb6d1e4c304290c3415114350c"
  },
  {
    "url": "zh/api/node.html",
    "revision": "85cb024a10f6dac6880c38929490c5a9"
  },
  {
    "url": "zh/config/index.html",
    "revision": "bf5f0e3150d150ae9b045555bc48428c"
  },
  {
    "url": "zh/faq/index.html",
    "revision": "2a41366d745d82298395a90a9855231c"
  },
  {
    "url": "zh/guide/assets.html",
    "revision": "236f63a2beac9175ff6f3e04e8a1cee9"
  },
  {
    "url": "zh/guide/basic-config.html",
    "revision": "78f60f790a9552ec4812a1254a09d289"
  },
  {
    "url": "zh/guide/deploy.html",
    "revision": "430d8d20b3d27f4095a7ab6641546df4"
  },
  {
    "url": "zh/guide/directory-structure.html",
    "revision": "c43806f49d7e0bf19f5327b9488e5f4d"
  },
  {
    "url": "zh/guide/frontmatter.html",
    "revision": "87ee91b577e013512f3847e8d759630e"
  },
  {
    "url": "zh/guide/getting-started.html",
    "revision": "ae31143cdf2ec77061bc9f1833af0602"
  },
  {
    "url": "zh/guide/global-computed.html",
    "revision": "9bee63dbfe3e524453cfe729501304d5"
  },
  {
    "url": "zh/guide/i18n.html",
    "revision": "dd3c59f998bb0da591c2dcfb104a7730"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "98057b0ae0a4f4a352e068561e3dc6eb"
  },
  {
    "url": "zh/guide/markdown-slot.html",
    "revision": "a5dc0fc4d146265a2576cecb4380cd41"
  },
  {
    "url": "zh/guide/markdown.html",
    "revision": "a486f47c771568f80d96d1d83b362c81"
  },
  {
    "url": "zh/guide/permalinks.html",
    "revision": "e8eb40be6ba4c30921a163054566347a"
  },
  {
    "url": "zh/guide/using-vue.html",
    "revision": "14ba0d7804cae4418c5f885a25c06510"
  },
  {
    "url": "zh/index.html",
    "revision": "97f4df8437e32aa9004092cd55622003"
  },
  {
    "url": "zh/miscellaneous/design-concepts.html",
    "revision": "6073cccc3fe10daaba7f5598760a7658"
  },
  {
    "url": "zh/miscellaneous/glossary.html",
    "revision": "4595384ffb3d888cd06e0b2db9a6be2a"
  },
  {
    "url": "zh/miscellaneous/migration-guide.html",
    "revision": "60a0a2370764dd2ab74a3bee31a7298b"
  },
  {
    "url": "zh/plugin/context-api.html",
    "revision": "db7e3246f9b7969420704f70e3fc324b"
  },
  {
    "url": "zh/plugin/index.html",
    "revision": "2750902b33276e844d304ea5e45994c2"
  },
  {
    "url": "zh/plugin/life-cycle.html",
    "revision": "b8da36c77189ccf9d4ac254aeaa0cb55"
  },
  {
    "url": "zh/plugin/official/plugin-active-header-links.html",
    "revision": "99b9fd3b652088c85f163f70c1afcb34"
  },
  {
    "url": "zh/plugin/official/plugin-back-to-top.html",
    "revision": "ea8437f817ed918027ef1741633998a5"
  },
  {
    "url": "zh/plugin/official/plugin-google-analytics.html",
    "revision": "b0ca60ebe3d079b83942fe9c8e223278"
  },
  {
    "url": "zh/plugin/official/plugin-last-updated.html",
    "revision": "288d847c831e2c95e54c097575ee6331"
  },
  {
    "url": "zh/plugin/official/plugin-medium-zoom.html",
    "revision": "b077d0f26677aea246de239f64db4f14"
  },
  {
    "url": "zh/plugin/official/plugin-nprogress.html",
    "revision": "9896420ae9bf79f3caceee0341a3bd48"
  },
  {
    "url": "zh/plugin/official/plugin-pwa.html",
    "revision": "0776b7df41316e754fbd89449270d32d"
  },
  {
    "url": "zh/plugin/official/plugin-register-components.html",
    "revision": "5645489637d6a80c7bfbd2da21e27270"
  },
  {
    "url": "zh/plugin/official/plugin-search.html",
    "revision": "b6f20a168ccb3817b1c2ada2f9611e25"
  },
  {
    "url": "zh/plugin/option-api.html",
    "revision": "b8f9c16763ea4d2ac37fb982415e2cf4"
  },
  {
    "url": "zh/plugin/using-a-plugin.html",
    "revision": "4387c116059a8f0611c060a3b6d7d8c5"
  },
  {
    "url": "zh/plugin/writing-a-plugin.html",
    "revision": "1c2725426b94ca21f9d20aa24f39f2a9"
  },
  {
    "url": "zh/theme/default-theme-config.html",
    "revision": "bb35ba8760314362a8b10c9834f24dae"
  },
  {
    "url": "zh/theme/index.html",
    "revision": "59b4e1606522ca4a4254cdd2fd61cae0"
  },
  {
    "url": "zh/theme/inheritance.html",
    "revision": "3220128f465e73b438cceb2d2ddcb8ac"
  },
  {
    "url": "zh/theme/option-api.html",
    "revision": "b3e3503e431389d0f4e9698183370591"
  },
  {
    "url": "zh/theme/using-a-theme.html",
    "revision": "6f576bde941f7337a971404aa4a110a2"
  },
  {
    "url": "zh/theme/writing-a-theme.html",
    "revision": "8b7fb9fb5db2781ede81f6af2482f972"
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
