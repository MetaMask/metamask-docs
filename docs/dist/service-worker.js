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
    "revision": "17ff0f990d7d7cac152650ebf7c538b4"
  },
  {
    "url": "architecture.png",
    "revision": "9a93cf6cea38878e19c5816d1af28b17"
  },
  {
    "url": "assets/css/0.styles.50e4da95.css",
    "revision": "996cd4b96f9edff7455a22a84d24b326"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.0fb4d46b.js",
    "revision": "7e077b329a8e461354760c423d65eb40"
  },
  {
    "url": "assets/js/11.02e8ff2e.js",
    "revision": "3d3f3f897d816e019dcb3bc284d78331"
  },
  {
    "url": "assets/js/12.fb15008c.js",
    "revision": "84b9e6e3084106891d0a127d266f3b23"
  },
  {
    "url": "assets/js/13.5a3d53f5.js",
    "revision": "185ecdec655533df51706fa9890d6936"
  },
  {
    "url": "assets/js/14.b12308cf.js",
    "revision": "df71ff0fb0ff904b4fb06404d494dfb3"
  },
  {
    "url": "assets/js/15.26c7ec26.js",
    "revision": "556aa694016543826e29806431e63cb1"
  },
  {
    "url": "assets/js/16.62d8821d.js",
    "revision": "0f0fbefc78fef29713757f069de662ab"
  },
  {
    "url": "assets/js/17.f6bf7347.js",
    "revision": "8a73f550a7e1f19b7692832155a7075f"
  },
  {
    "url": "assets/js/18.b2990bc3.js",
    "revision": "f9e02e3cd6ef59a64d74e01fa211ed6c"
  },
  {
    "url": "assets/js/19.31a144e0.js",
    "revision": "f0aab67ca91a09df559b6c95090a49a7"
  },
  {
    "url": "assets/js/20.ffd2716a.js",
    "revision": "f0204fcc7c41e59f3184f260f28b0623"
  },
  {
    "url": "assets/js/21.2ddd10d4.js",
    "revision": "4ea793b1dd7b170b08f143adfbde6680"
  },
  {
    "url": "assets/js/22.c246e7af.js",
    "revision": "6a30eb4a402c40eb20026c54bda6b33a"
  },
  {
    "url": "assets/js/23.2276a54c.js",
    "revision": "c8f79d588a162c3def9a0b01b8d20fa0"
  },
  {
    "url": "assets/js/24.b82c26ff.js",
    "revision": "00d5b758992b677c6186bd45c2b8b97d"
  },
  {
    "url": "assets/js/25.cd36409a.js",
    "revision": "bb32d259f1422f3bea6bc1358e279077"
  },
  {
    "url": "assets/js/26.92387ea3.js",
    "revision": "59044486043ad718f26a79072e5fc853"
  },
  {
    "url": "assets/js/27.228a08eb.js",
    "revision": "efa7e200e2ef8acc612f1df27eeb5c59"
  },
  {
    "url": "assets/js/28.460bccc4.js",
    "revision": "f79a40afd276560815f3c6940d0b8179"
  },
  {
    "url": "assets/js/29.1ecc947b.js",
    "revision": "17c564b838624361213293e47c919c38"
  },
  {
    "url": "assets/js/3.d1185c6c.js",
    "revision": "d5cc117bdad6d42cd004e9de460df875"
  },
  {
    "url": "assets/js/30.66a6d6f8.js",
    "revision": "4919faca63119d2ef79cc22490079241"
  },
  {
    "url": "assets/js/31.198cd22f.js",
    "revision": "a951ded29f7f6d2373a27c9ab8ec1bcf"
  },
  {
    "url": "assets/js/32.3182e34f.js",
    "revision": "6868d93cbdb3a57d162d06b561430432"
  },
  {
    "url": "assets/js/33.2ecab3c7.js",
    "revision": "b3ad5c0d0f160b63d360f453f0fe58ac"
  },
  {
    "url": "assets/js/34.19df02dc.js",
    "revision": "ede3c3edf552a09bda898cbd85cc4fa3"
  },
  {
    "url": "assets/js/35.30bb7900.js",
    "revision": "e945df37db18e1e94362d5eb08e76249"
  },
  {
    "url": "assets/js/36.d931a2ea.js",
    "revision": "36f4917157f8e185ff56274315672847"
  },
  {
    "url": "assets/js/37.6ae22635.js",
    "revision": "1591e5e02d40114f0857a0251de82602"
  },
  {
    "url": "assets/js/38.0dcbfea0.js",
    "revision": "3c761e7d3d6e001c5ae184f39c8708fb"
  },
  {
    "url": "assets/js/39.551f91aa.js",
    "revision": "01676df4dbd2ee9b843ed7f86ebaee54"
  },
  {
    "url": "assets/js/4.12de5278.js",
    "revision": "e9361e444af2285d91408d9791b97e1e"
  },
  {
    "url": "assets/js/40.e089ecbc.js",
    "revision": "e9ee625f97ff3c91a4a6caf02bd64ade"
  },
  {
    "url": "assets/js/41.8154deb6.js",
    "revision": "336011f95455478cac0b6dc748848dbc"
  },
  {
    "url": "assets/js/42.f2362013.js",
    "revision": "b1cbdd16f1e810328eed5169321c18b5"
  },
  {
    "url": "assets/js/43.25d7de83.js",
    "revision": "e50ad287114a7874a3001d3aaa19009d"
  },
  {
    "url": "assets/js/44.146f8f31.js",
    "revision": "adfb4f9fa208c7c50890d2c7e5a93d94"
  },
  {
    "url": "assets/js/45.f28100d9.js",
    "revision": "9965b6d4412559f81bb1f8e11169acd9"
  },
  {
    "url": "assets/js/46.a51e20c5.js",
    "revision": "5f307714ac99d9ebc0d7e286f7d86724"
  },
  {
    "url": "assets/js/47.79eff5d5.js",
    "revision": "26997d59bf6ede67c83aab8a4c13e8a9"
  },
  {
    "url": "assets/js/48.36a0edb1.js",
    "revision": "1550b911414a3bb96219b2e6bc4644a0"
  },
  {
    "url": "assets/js/49.108c6e33.js",
    "revision": "5db11a9ccd71daedd5e08c146fee9605"
  },
  {
    "url": "assets/js/5.04a5e967.js",
    "revision": "6ffdbb02a41c3a7f27928d2844c34cc8"
  },
  {
    "url": "assets/js/50.606fcd9e.js",
    "revision": "525b9f0ed2dfafbef8e90ed4f19feca5"
  },
  {
    "url": "assets/js/51.3820766b.js",
    "revision": "e96afa76ff57333c28697057bb0801e1"
  },
  {
    "url": "assets/js/52.bd319b56.js",
    "revision": "d42936bafe6eb21a979da5bac4be3f2d"
  },
  {
    "url": "assets/js/53.37e101cc.js",
    "revision": "9f4c519e384b20bf50cb2fec73d2112b"
  },
  {
    "url": "assets/js/54.aef3a379.js",
    "revision": "a4c0e751bab08be2ae479dc2c8c09de2"
  },
  {
    "url": "assets/js/55.373e6be5.js",
    "revision": "3b5d89ca2ee156be2e5a92ce0729d89b"
  },
  {
    "url": "assets/js/56.9cb31019.js",
    "revision": "478d09eefdca9709ff003ab7742938fc"
  },
  {
    "url": "assets/js/6.397b307b.js",
    "revision": "845d27d395a8ce94f6bf3836c448c6ef"
  },
  {
    "url": "assets/js/7.6d3dbc1a.js",
    "revision": "392c84821a24d1d794d6e94c16b82bf3"
  },
  {
    "url": "assets/js/8.361247f3.js",
    "revision": "6ad57259f39101a4d5f6a2e21b128598"
  },
  {
    "url": "assets/js/9.f492cf5a.js",
    "revision": "29af9b0a2b37352d28c2dc59993910f2"
  },
  {
    "url": "assets/js/app.2fc73ef3.js",
    "revision": "3fafe1a44b4b12624cee43984a387b36"
  },
  {
    "url": "assets/js/vendors~notification.3d0fb8da.js",
    "revision": "e03a873b6c02acb756760f161a166d8d"
  },
  {
    "url": "config/index.html",
    "revision": "0bfad08d44e4c6d0f3b83e3b98ec0419"
  },
  {
    "url": "ethereum-metamask-chrome.png",
    "revision": "79226bac078ce93a58b74aff1a8a6aa3"
  },
  {
    "url": "faq/index.html",
    "revision": "f985f17af1f269b4be24477548e6c2ad"
  },
  {
    "url": "guide/accessing-accounts.html",
    "revision": "27032dcb363c5c935aaa6c25ccf556b0"
  },
  {
    "url": "guide/assets.html",
    "revision": "48b7d0a86c9809454fe2d983cc3225b0"
  },
  {
    "url": "guide/common-terms.html",
    "revision": "ae368ee95d80455ee60bc726585154b0"
  },
  {
    "url": "guide/defining-your-icon.html",
    "revision": "b51fe9f720de0cc0dba7b48e19c303f8"
  },
  {
    "url": "guide/deploy.html",
    "revision": "2427c6c3eeac43e55d1a9dd70c28cf33"
  },
  {
    "url": "guide/ethereum-provider.html",
    "revision": "57e5a64eca94cedcf00007b75210c68a"
  },
  {
    "url": "guide/experimental-apis.html",
    "revision": "ef03f714a511809744294bafb9f027d6"
  },
  {
    "url": "guide/frontmatter.html",
    "revision": "c1c9bd3224464df9265dbd267f7d734c"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "f607f29d95e15a42db4a7de285e71f48"
  },
  {
    "url": "guide/index.html",
    "revision": "acff571a858a46b2a10732d1efc00695"
  },
  {
    "url": "guide/initializing-dapps.html",
    "revision": "aca3be1b896079759d05a27e5cf6c5f8"
  },
  {
    "url": "guide/json-rpc-api.html",
    "revision": "080affad6e281eb822811b4e675f4cd7"
  },
  {
    "url": "guide/registering-function-names.html",
    "revision": "f047f6321a8ba2562dcf7244d6f415b6"
  },
  {
    "url": "guide/registering-your-token.html",
    "revision": "44f4dcbd255b25971f4aa4bd1e3b2a56"
  },
  {
    "url": "guide/sending-transactions.html",
    "revision": "b1702cfb41186689063b918b565ec9a1"
  },
  {
    "url": "guide/signing-data.html",
    "revision": "8762680d36ae9a1abc06a78143a2c985"
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
    "revision": "22dee25cbf57ea262fb97b3c10e41788"
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
    "revision": "fcc7987d6dd6b6c0e0a03addacf69da6"
  },
  {
    "url": "miscellaneous/glossary.html",
    "revision": "ea8e2b8a59667b810bdd3162ed83e012"
  },
  {
    "url": "miscellaneous/migration-guide.html",
    "revision": "b86c44fc30da6420ea3c0dc2de7d0365"
  },
  {
    "url": "plugin.png",
    "revision": "3e325210d3e3752e32818385fc4afbc9"
  },
  {
    "url": "plugin/context-api.html",
    "revision": "58a6d7f9aae0cfb6bccc2bf7456d6725"
  },
  {
    "url": "plugin/index.html",
    "revision": "50d686409dae3b57776c9de7fa36e27b"
  },
  {
    "url": "plugin/life-cycle.html",
    "revision": "2cd489dd02201133bc0b80a6df192ded"
  },
  {
    "url": "plugin/official/plugin-active-header-links.html",
    "revision": "1c5c66b99d39461aa7dbd901fd757651"
  },
  {
    "url": "plugin/official/plugin-back-to-top.html",
    "revision": "14eec8c9e17ff564e262e8a0ea28a34a"
  },
  {
    "url": "plugin/official/plugin-google-analytics.html",
    "revision": "6a500951956f3ec8f9ee565bcde63659"
  },
  {
    "url": "plugin/official/plugin-last-updated.html",
    "revision": "675ed9d9884f0946bcfef8b7ad5d6ee7"
  },
  {
    "url": "plugin/official/plugin-medium-zoom.html",
    "revision": "9cbcea90634fb5fb2aea4e1520cfd524"
  },
  {
    "url": "plugin/official/plugin-nprogress.html",
    "revision": "9699b14ee379372ef8a2111c8a5d8bfc"
  },
  {
    "url": "plugin/official/plugin-pwa.html",
    "revision": "6c78248db4add1ab82f715a0d3de1306"
  },
  {
    "url": "plugin/official/plugin-register-components.html",
    "revision": "5496e339e66b2c5ea1f1d267dee05e61"
  },
  {
    "url": "plugin/official/plugin-search.html",
    "revision": "32a3435048d95c2627334855d8faf7b4"
  },
  {
    "url": "plugin/option-api.html",
    "revision": "c80f4df5cc626cf9166cbeca727d7915"
  },
  {
    "url": "plugin/using-a-plugin.html",
    "revision": "0b78b57ee0e83c83ac2170f3d92e9141"
  },
  {
    "url": "plugin/writing-a-plugin.html",
    "revision": "a3e69313a274d29fcd4be6907d3eb6d5"
  },
  {
    "url": "theme/default-theme-config.html",
    "revision": "0c5980b6abef90ef0e9fc1fe53015d2b"
  },
  {
    "url": "theme/index.html",
    "revision": "4dedfbf5f70fa01ebb6eb2d4fd20a4e3"
  },
  {
    "url": "theme/inheritance.html",
    "revision": "abf443edc20f1da070a0d024f52b2f65"
  },
  {
    "url": "theme/option-api.html",
    "revision": "8ce42f78c7d28155667d0f2007bab67f"
  },
  {
    "url": "theme/using-a-theme.html",
    "revision": "9043a9b4fe5318ac34f6754c60571383"
  },
  {
    "url": "theme/writing-a-theme.html",
    "revision": "66b4d8becb9802f81d7bf9e68ff7759e"
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
