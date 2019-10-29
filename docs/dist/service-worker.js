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
    "revision": "f3767f14486f522d91deb88fa676978b"
  },
  {
    "url": "api/cli.html",
    "revision": "1e681ef9962fab91a92e66e46848ff77"
  },
  {
    "url": "api/node.html",
    "revision": "55f128d17715bdaa4afa2bf6ab777f13"
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
    "url": "assets/js/10.6572b391.js",
    "revision": "753f4dc66708517733bb4f7a198ac34f"
  },
  {
    "url": "assets/js/100.640c886c.js",
    "revision": "c06b57326575a206b15e29c12060c4fa"
  },
  {
    "url": "assets/js/11.e0970817.js",
    "revision": "9bbdcc601166f53a0879efbaf9dcb970"
  },
  {
    "url": "assets/js/12.e9eae479.js",
    "revision": "94900d8316b6bf1d0e13322bc9d52e11"
  },
  {
    "url": "assets/js/13.32bd247b.js",
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
    "url": "assets/js/18.ec6e6468.js",
    "revision": "eb97b5d798ba02ca3fcecd48b8606a8d"
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
    "url": "assets/js/23.a398817c.js",
    "revision": "933ef34626f628f64dae4b1ece766241"
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
    "url": "assets/js/27.72ad241e.js",
    "revision": "9e5de920524f2a759db7aa051b876f56"
  },
  {
    "url": "assets/js/28.9f3895bd.js",
    "revision": "b2e029a908370a7d0e5edad3fe0fddc3"
  },
  {
    "url": "assets/js/29.12fe3de8.js",
    "revision": "85a76a09d0b8097ddab7fa0a498afec1"
  },
  {
    "url": "assets/js/3.5f5a8d80.js",
    "revision": "83aa9f244cc1c8fb18dead6001363dde"
  },
  {
    "url": "assets/js/30.a5aba0da.js",
    "revision": "d09ccdd1e4f3f72f653db5c7f6464b28"
  },
  {
    "url": "assets/js/31.75e62942.js",
    "revision": "a118023d3ef3fc2f5c2e382000463c77"
  },
  {
    "url": "assets/js/32.1a1770c0.js",
    "revision": "f7052dfdc5f9c03342c9a7599e711e5d"
  },
  {
    "url": "assets/js/33.0293e48c.js",
    "revision": "1666439a55ba07b5b95283c346b9f954"
  },
  {
    "url": "assets/js/34.6978cc41.js",
    "revision": "4b239088be3ba7082dfc121e935e142f"
  },
  {
    "url": "assets/js/35.d3425b9f.js",
    "revision": "ee79096c92c633b05036980aa8fcc6d5"
  },
  {
    "url": "assets/js/36.b59005db.js",
    "revision": "2dd8a18e59fa8ec9b07dc49b9bd302bb"
  },
  {
    "url": "assets/js/37.80e7bb0e.js",
    "revision": "79e5a60cd61a13f4d37b0948723d61a2"
  },
  {
    "url": "assets/js/38.4ea6237b.js",
    "revision": "7af4439bf1bd14485356751932980f80"
  },
  {
    "url": "assets/js/39.d5ddaaf7.js",
    "revision": "ae0a4b00eafc2a80ff5557d60a7e8643"
  },
  {
    "url": "assets/js/4.af9afaa8.js",
    "revision": "5ae2a2e2af31f7ff4b299c582d57f8e2"
  },
  {
    "url": "assets/js/40.b570f698.js",
    "revision": "3045b3bf30b29fed3e36406123357219"
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
    "url": "assets/js/43.a11eea08.js",
    "revision": "a1dac4dcea8c4f4100a048a6e45d119d"
  },
  {
    "url": "assets/js/44.748b3d88.js",
    "revision": "ea642c5e2dd1374f34c8c011795e7d63"
  },
  {
    "url": "assets/js/45.e499d03a.js",
    "revision": "ad9e705952f83b4c82311f14c6cc65e1"
  },
  {
    "url": "assets/js/46.973860a8.js",
    "revision": "b5081ce095cbce747be363f39b50a7e8"
  },
  {
    "url": "assets/js/47.85f59455.js",
    "revision": "006b6f884c46f148984d23eeaa4e3c1c"
  },
  {
    "url": "assets/js/48.18c2b0ff.js",
    "revision": "a80dbf48f28c470048281f439d61d8e1"
  },
  {
    "url": "assets/js/49.acab0ca3.js",
    "revision": "920cf781af99b006edf2277613c13b59"
  },
  {
    "url": "assets/js/5.1a80a266.js",
    "revision": "b80931fd7a8f736d68b3ee16b2f7147f"
  },
  {
    "url": "assets/js/50.5af6957e.js",
    "revision": "d373a9214e4724c433959c51e885bc35"
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
    "url": "assets/js/53.19566001.js",
    "revision": "b21972048199bcdece80ae3d4be74e4d"
  },
  {
    "url": "assets/js/54.c97cdaf0.js",
    "revision": "c527b05c18b9b8a8d804386b0f38933f"
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
    "url": "assets/js/57.f2dcc77b.js",
    "revision": "81a8ecbdbdc89110d65b737a03ddcc0c"
  },
  {
    "url": "assets/js/58.142f992a.js",
    "revision": "7cd0a61c3960965a43aa95b7890e52eb"
  },
  {
    "url": "assets/js/59.3790f4ba.js",
    "revision": "cd4aa792a6a6c26dc798c7a8fe4ae996"
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
    "url": "assets/js/61.e76909b2.js",
    "revision": "80cb1e3b206926b408ed79caed423671"
  },
  {
    "url": "assets/js/62.e024c0fb.js",
    "revision": "fc9de213e7675bb7bacc1a4e3caf7487"
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
    "url": "assets/js/65.35b88614.js",
    "revision": "aa4e1050ccc44b79b5d97b35dcc7f02f"
  },
  {
    "url": "assets/js/66.f9a17f21.js",
    "revision": "e2ee4b276c3d13d222a6c22bf2e705b7"
  },
  {
    "url": "assets/js/67.2c50961c.js",
    "revision": "2357ee7206c0e0b73d4e5737c9afaceb"
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
    "url": "assets/js/72.a4cc399c.js",
    "revision": "01789f499d38109cacfafc94e47c3680"
  },
  {
    "url": "assets/js/73.b19db593.js",
    "revision": "315e79e263b950c98ab9fec6d18c9cbe"
  },
  {
    "url": "assets/js/74.eab2ddfe.js",
    "revision": "d108973ee4c89315ac408379b105623a"
  },
  {
    "url": "assets/js/75.d8d7bbfa.js",
    "revision": "b4235036ce396e383998d1dfba66d4b7"
  },
  {
    "url": "assets/js/76.402960c6.js",
    "revision": "fcce2936440499f268f740e2e4fc1fd1"
  },
  {
    "url": "assets/js/77.75bb666a.js",
    "revision": "8583f3000b3f15eb144b42740f963655"
  },
  {
    "url": "assets/js/78.245c50e1.js",
    "revision": "ff756d59a2f5d084d8e7e18e626aaa4d"
  },
  {
    "url": "assets/js/79.9075a405.js",
    "revision": "92ac11e1cda357006a52f9b040b07eab"
  },
  {
    "url": "assets/js/8.facb2d38.js",
    "revision": "4cfcca587a7cb88e87b0fcb9377f66cb"
  },
  {
    "url": "assets/js/80.d801c0ee.js",
    "revision": "ece9973f1afd4a3446784c57926ae8ee"
  },
  {
    "url": "assets/js/81.3f0c13f5.js",
    "revision": "df3952149caacbd1b5c573f53ba2af08"
  },
  {
    "url": "assets/js/82.45d71eb1.js",
    "revision": "2c79f6b0f5019cc5a7ca7c726cbd8221"
  },
  {
    "url": "assets/js/83.4fcc1a00.js",
    "revision": "407c0e9316186e94145c80d731b9af2a"
  },
  {
    "url": "assets/js/84.c78748ae.js",
    "revision": "7afc12008cfe41abb450ce7a2a4da90e"
  },
  {
    "url": "assets/js/85.a0526685.js",
    "revision": "cc3d26f9effd82dcbd7d912128b1a64c"
  },
  {
    "url": "assets/js/86.4114a4b7.js",
    "revision": "d4e3cf66e4ff9d1b67e271c663d1ddd7"
  },
  {
    "url": "assets/js/87.aeec385a.js",
    "revision": "829629016682e79bca357e0df4d7a31f"
  },
  {
    "url": "assets/js/88.1ca147d9.js",
    "revision": "48e3424cc08c2d590b691f35cd0b5839"
  },
  {
    "url": "assets/js/89.68557d43.js",
    "revision": "7fb96d3ae40c3b31e93b4bebd4ab04da"
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
    "url": "assets/js/92.ed9b40e7.js",
    "revision": "3c41f996b4289ccaff0b9db1f0473a2d"
  },
  {
    "url": "assets/js/93.e7d60562.js",
    "revision": "402b06d79eb7400b03c877f9f9a32feb"
  },
  {
    "url": "assets/js/94.8cae51f0.js",
    "revision": "66482f0f77f1edfd776ee8191976f02d"
  },
  {
    "url": "assets/js/95.6caf55de.js",
    "revision": "20ed97703038fb192931b4a3c7e8f15b"
  },
  {
    "url": "assets/js/96.43267206.js",
    "revision": "333440311a34f771e1edb0195fd81bed"
  },
  {
    "url": "assets/js/97.b589e90e.js",
    "revision": "cb62fa2147e3601d435962c3dca35a8e"
  },
  {
    "url": "assets/js/98.2dac4c05.js",
    "revision": "bc907b693b1b64b3b49d6b575e16880d"
  },
  {
    "url": "assets/js/99.2bc7a630.js",
    "revision": "e6bace2a4a7527a2493f77f0466648e5"
  },
  {
    "url": "assets/js/app.7b355036.js",
    "revision": "9396696ea62c3a4464521a30af621220"
  },
  {
    "url": "assets/js/vendors~notification.9e32ed3d.js",
    "revision": "9e4fe116cdce75067138e88e792bd3fe"
  },
  {
    "url": "config/index.html",
    "revision": "859c4946075ccbbb72468f471dd37c2b"
  },
  {
    "url": "ethereum-metamask-chrome.png",
    "revision": "79226bac078ce93a58b74aff1a8a6aa3"
  },
  {
    "url": "faq/index.html",
    "revision": "dc0096cc5c28344ed8b120417b5180a4"
  },
  {
    "url": "guide/accessing-accounts.html",
    "revision": "c414ed77657fe7222018fd49c0c8d41a"
  },
  {
    "url": "guide/assets.html",
    "revision": "560856311bfd65eaeec12d6203e6ad62"
  },
  {
    "url": "guide/common-terms.html",
    "revision": "34db9c62bae2abe421a25346b434f724"
  },
  {
    "url": "guide/defining-your-icon.html",
    "revision": "a33c17099e8b27752fda6fcf3df3a287"
  },
  {
    "url": "guide/deploy.html",
    "revision": "06ee84c7d744f6e3e39fb4d44004d4c1"
  },
  {
    "url": "guide/ethereum-provider.html",
    "revision": "bf9006e2dab4e398ac070cb002f064ec"
  },
  {
    "url": "guide/experimental-apis.html",
    "revision": "43384cae6d2c6c70032128c37cc8c607"
  },
  {
    "url": "guide/frontmatter.html",
    "revision": "370c4ff7f02f1c5bc6ceba2f721f4202"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "dbb65b6d95d6d86dff6edae7b7144013"
  },
  {
    "url": "guide/index.html",
    "revision": "9ef8a292e9e6699f998823440395275c"
  },
  {
    "url": "guide/initializing-dapps.html",
    "revision": "6e1d9e3a495a5d806409da9637d42b33"
  },
  {
    "url": "guide/json-rpc-api.html",
    "revision": "b4ff21d916072b9627622dfe31976407"
  },
  {
    "url": "guide/registering-function-names.html",
    "revision": "ba7c25838fcd30e793a73fd8af345490"
  },
  {
    "url": "guide/registering-your-token.html",
    "revision": "e7d33de15fc5919fbf62fd2c188f324c"
  },
  {
    "url": "guide/sending-transactions.html",
    "revision": "a4c7f5787b9365a2cb97ba55567152a4"
  },
  {
    "url": "guide/signing-data.html",
    "revision": "a567eef620484235927687d682e8e6ea"
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
    "revision": "f22d501a35a87d9f21701cb031f6ea17"
  },
  {
    "url": "index.html",
    "revision": "9bfd188c12a9eb2036e85081c25043ad"
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
    "revision": "b10e42b759a6ec5d5627077a74dfd64a"
  },
  {
    "url": "miscellaneous/glossary.html",
    "revision": "947e734fa6124812c631f89fcbd3bf51"
  },
  {
    "url": "miscellaneous/migration-guide.html",
    "revision": "e1dea6218b3704edf529f36091a186c5"
  },
  {
    "url": "plugin.png",
    "revision": "3e325210d3e3752e32818385fc4afbc9"
  },
  {
    "url": "plugin/context-api.html",
    "revision": "a451e2dcf3e49b246e0b99ffceeadb70"
  },
  {
    "url": "plugin/index.html",
    "revision": "7fc731faed043b10a05407a057ff5317"
  },
  {
    "url": "plugin/life-cycle.html",
    "revision": "898f4665d581bc582fb9f9b210041ab9"
  },
  {
    "url": "plugin/official/plugin-active-header-links.html",
    "revision": "e42d362d22c8e8f13d975868805ead09"
  },
  {
    "url": "plugin/official/plugin-back-to-top.html",
    "revision": "38965eae75899f6418072fb30f308bbf"
  },
  {
    "url": "plugin/official/plugin-google-analytics.html",
    "revision": "64bf22a531d43668e0e0dff6e2d0f7d1"
  },
  {
    "url": "plugin/official/plugin-last-updated.html",
    "revision": "d9e24af61894041b27a766bbf9d59b85"
  },
  {
    "url": "plugin/official/plugin-medium-zoom.html",
    "revision": "e09fdb4ebaf9568d9cae3ba37449f941"
  },
  {
    "url": "plugin/official/plugin-nprogress.html",
    "revision": "dd845ec0997a6c99cc7279862205d056"
  },
  {
    "url": "plugin/official/plugin-pwa.html",
    "revision": "a6b02b108171654458e9593b7c314809"
  },
  {
    "url": "plugin/official/plugin-register-components.html",
    "revision": "32a6f2a9d7303d8043c3e3b59011d428"
  },
  {
    "url": "plugin/official/plugin-search.html",
    "revision": "d05db2cf947c63d116af2206258cd47f"
  },
  {
    "url": "plugin/option-api.html",
    "revision": "18713d39221f25c05049b07e93e150b5"
  },
  {
    "url": "plugin/using-a-plugin.html",
    "revision": "a58d38789a6ed692f7bb67c359da42f7"
  },
  {
    "url": "plugin/writing-a-plugin.html",
    "revision": "d5e5969476a1aaa7ff279ab548f9b1bb"
  },
  {
    "url": "theme/default-theme-config.html",
    "revision": "f208a8bfca0101cbc182e7df7d6c80f5"
  },
  {
    "url": "theme/index.html",
    "revision": "1c70492dc0fe326a62d1cc6cbafd8ff2"
  },
  {
    "url": "theme/inheritance.html",
    "revision": "a4800de768d8656fa038df9fd5b5f713"
  },
  {
    "url": "theme/option-api.html",
    "revision": "f2d5ee99852c149c2cd348b447e3a29c"
  },
  {
    "url": "theme/using-a-theme.html",
    "revision": "372153f4f7f937aacd0f69385812b23e"
  },
  {
    "url": "theme/writing-a-theme.html",
    "revision": "21829fd40472176af997b14626db85f0"
  },
  {
    "url": "zh/api/cli.html",
    "revision": "e6a42184f6abd8e837f0cb73543843d5"
  },
  {
    "url": "zh/api/node.html",
    "revision": "1286d13fa6d4b042a5f9ee9efd817526"
  },
  {
    "url": "zh/config/index.html",
    "revision": "eba889dd680366f5318e752861e4ef43"
  },
  {
    "url": "zh/faq/index.html",
    "revision": "126d539b29570f3ccd1928dde9d3a895"
  },
  {
    "url": "zh/guide/assets.html",
    "revision": "e8a3bfb0b3626b74b2dfc68106d5042e"
  },
  {
    "url": "zh/guide/basic-config.html",
    "revision": "08a5e682cc0558785f3b7441a127b3d3"
  },
  {
    "url": "zh/guide/deploy.html",
    "revision": "9cbcb1f5d32f882c6be366eaf762aed3"
  },
  {
    "url": "zh/guide/directory-structure.html",
    "revision": "66d249a0e0c8eec9d9f107cfd98e2c96"
  },
  {
    "url": "zh/guide/frontmatter.html",
    "revision": "83d66e297f1a1d1a3b8c2b676295acaf"
  },
  {
    "url": "zh/guide/getting-started.html",
    "revision": "1dcdc3992b2b17fda3b70f62adfc63e9"
  },
  {
    "url": "zh/guide/global-computed.html",
    "revision": "5f0c6e879196d05fa08b37f207c3fe72"
  },
  {
    "url": "zh/guide/i18n.html",
    "revision": "40627990b0cfbb3c3b6e6afea4d2ad36"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "d8ee6c27dd85b8384aab551f3a68ee84"
  },
  {
    "url": "zh/guide/markdown-slot.html",
    "revision": "081b0e952d6407f23a2cedc839da8497"
  },
  {
    "url": "zh/guide/markdown.html",
    "revision": "fd1ab9ac4981d938ee5a94dfbdab05eb"
  },
  {
    "url": "zh/guide/permalinks.html",
    "revision": "81a032f69d99be328440e1d1ba9acb83"
  },
  {
    "url": "zh/guide/using-vue.html",
    "revision": "8368cf70d00c633f7f64b4524594684a"
  },
  {
    "url": "zh/index.html",
    "revision": "9963854963d67b88a82188f48dbeffa1"
  },
  {
    "url": "zh/miscellaneous/design-concepts.html",
    "revision": "3e6a3138e1dce736cd122df2f019c906"
  },
  {
    "url": "zh/miscellaneous/glossary.html",
    "revision": "e8482e2a718d2deaa134a6c94a8bcb8b"
  },
  {
    "url": "zh/miscellaneous/migration-guide.html",
    "revision": "0ab2e6a46c927a8e9ae395e89a45c601"
  },
  {
    "url": "zh/plugin/context-api.html",
    "revision": "c60cd21483431fbb1a40c61426fd2519"
  },
  {
    "url": "zh/plugin/index.html",
    "revision": "e4326a6a6255f38a9b5c5e1306c05261"
  },
  {
    "url": "zh/plugin/life-cycle.html",
    "revision": "ba0cd5d069eabdfc0d09201adc19841a"
  },
  {
    "url": "zh/plugin/official/plugin-active-header-links.html",
    "revision": "a8c64fe42726e23f4a1003658500ee99"
  },
  {
    "url": "zh/plugin/official/plugin-back-to-top.html",
    "revision": "641f462b7cbdf61e67c290bed9ec9635"
  },
  {
    "url": "zh/plugin/official/plugin-google-analytics.html",
    "revision": "188451859d9bb645e2d3473b6cddf96c"
  },
  {
    "url": "zh/plugin/official/plugin-last-updated.html",
    "revision": "87ae80829906fe81eba009e5b4e48494"
  },
  {
    "url": "zh/plugin/official/plugin-medium-zoom.html",
    "revision": "66dfa31dea6cb39aabb824017df25ba0"
  },
  {
    "url": "zh/plugin/official/plugin-nprogress.html",
    "revision": "a93f6eabbb7915b2541724a58e663d37"
  },
  {
    "url": "zh/plugin/official/plugin-pwa.html",
    "revision": "6f6ab9cb89534f6a40ba442d0d417629"
  },
  {
    "url": "zh/plugin/official/plugin-register-components.html",
    "revision": "41c26539621e39c67a574521970782c2"
  },
  {
    "url": "zh/plugin/official/plugin-search.html",
    "revision": "7366b89623300f9e02528d07acbfb90d"
  },
  {
    "url": "zh/plugin/option-api.html",
    "revision": "716ccdb8f77327af13267fd8a430309f"
  },
  {
    "url": "zh/plugin/using-a-plugin.html",
    "revision": "67dbe05960a228e0702c8059a43babca"
  },
  {
    "url": "zh/plugin/writing-a-plugin.html",
    "revision": "5fc816d1dfd62b39a569ff0591915cbd"
  },
  {
    "url": "zh/theme/default-theme-config.html",
    "revision": "055f54619f15d11c91ffb69b7171e71d"
  },
  {
    "url": "zh/theme/index.html",
    "revision": "9d838d2645b39ed690dafa9bcf8dde36"
  },
  {
    "url": "zh/theme/inheritance.html",
    "revision": "8e589f6c27aa49632e10aff1f431a33a"
  },
  {
    "url": "zh/theme/option-api.html",
    "revision": "2c8391ad2b34bec606dcadf1ba38e2a5"
  },
  {
    "url": "zh/theme/using-a-theme.html",
    "revision": "59a8a161fb4206d17bd5c9629055aea1"
  },
  {
    "url": "zh/theme/writing-a-theme.html",
    "revision": "6b664fd4fd6115b6f9a1b444c5f4ba07"
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
