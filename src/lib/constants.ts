export const PROD_APP_URL = "https://app.infura.io";
export const STAGE_APP_URL = "https://infura-app-staging.vercel.app";
export const DEV_APP_URL = "http://localhost:3000";

export const DASHBOARD_URL = (DASHBOARD_PREVIEW_URL, VERCEL_ENV) =>
  DASHBOARD_PREVIEW_URL
    ? DASHBOARD_PREVIEW_URL
    : VERCEL_ENV === "production"
      ? PROD_APP_URL
      : STAGE_APP_URL;

export const REF_PATH = "/wallet/reference/new-reference";

const TEST_TRANSACTIONS = {
  mainnet: {
    tx: "0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0",
    addParam: "0xc94770007dda54cF92009BFF0dE90c06F603a09f",
  },
  sepolia: {
    tx: "0x353e7c277baa3538651fd7f64c8630598c446a4b663034cdca5b18027d3cdb5a",
    addParam: "0x1fc35B79FB11Ea7D4532dA128DfA9Db573C51b09",
  },
  testnet: {
    tx: "0x005c8a894c0bb9f56c40dd257eaf84f2e7a14f7054f85fb323f34e690669f150",
    addParam: "0xc94770007dda54cF92009BFF0dE90c06F603a09f",
  },
  fuji: {
    tx: "0xd95cc407bb84eed2625a7bede344c7cf11e68786758dc02c0f79af4111a594c8",
    addParam: "0x5fbe8dca1c3ee9efddeccb86ba455f02cef6466b",
  },
  alfajores: {
    tx: "0x210bdc45a5af5b33e82710b855aad75c1fbb903eaaf8f0c8b664e6709d216ed2",
    addParam: "0xc94770007dda54cF92009BFF0dE90c06F603a09f",
  },
};

const NETWORK_URL = {
  infura: "infura.io",
  dev: "dev.infura.org",
  expansion: "infura.io",
};

export const MSG_TYPES = {
  INFO: "info",
  ERROR: "error",
  SUCCESS: "success",
};

export const NETWORKS_TYPES = {
  mainnet: {
    label: "mainnet",
    value: "mainnet",
    urlType: NETWORK_URL.infura,
  },
  mainnetDev: {
    label: "mainnet",
    value: "mainnet",
    urlType: NETWORK_URL.dev,
  },
  testnet: {
    label: "testnet",
    value: "testnet",
    urlType: NETWORK_URL.infura,
  },
  sepolia: {
    label: "sepolia",
    value: "sepolia",
    urlType: NETWORK_URL.infura,
  },
  fuji: {
    label: "fuji",
    value: "fuji",
    urlType: NETWORK_URL.dev,
  },
  alfajores: {
    label: "alfajores",
    value: "alfajores",
    urlType: NETWORK_URL.dev,
  },
  mumbai: {
    label: "mumbai",
    value: "mumbai",
    urlType: NETWORK_URL.infura,
  },
  gasEthereum: {
    label: "ethereum",
    value: "1",
    urlType: NETWORK_URL.expansion,
  },
  gasPolygon: {
    label: "polygon",
    value: "137",
    urlType: NETWORK_URL.expansion,
  },
  gasFilecoinMainnet: {
    label: "FilecoinMainnet",
    value: "314",
    urlType: NETWORK_URL.expansion,
  },
  gasMumbai: {
    label: "mumbai",
    value: "80001",
    urlType: NETWORK_URL.expansion,
  },
  gasAvalanche: {
    label: "avalanche",
    value: "43114",
    urlType: NETWORK_URL.expansion,
  },
  gasFantom: {
    label: "fantom",
    value: "250",
    urlType: NETWORK_URL.expansion,
  },
  gasCronos: {
    label: "cronos",
    value: "25",
    urlType: NETWORK_URL.expansion,
  },
  gasArbitrumOne: {
    label: "ArbitrumOne",
    value: "42161",
    urlType: NETWORK_URL.expansion,
  },
  gasArbitrumNova: {
    label: "ArbitrumNova",
    value: "42170",
    urlType: NETWORK_URL.expansion,
  },
};

export const NETWORKS_METHODS = {
  L1: {
    methods: [
      {
        label: "eth_blockNumber",
        value: "eth_blockNumber",
        params: {
          sepolia: [],
          fuji: [],
          alfajores: [],
          testnet: [],
          mainnet: [],
        },
      },
      {
        label: "eth_chainId",
        value: "eth_chainId",
        params: {
          sepolia: [],
          fuji: [],
          alfajores: [],
          testnet: [],
          mainnet: [],
        },
      },
      {
        label: "eth_gasPrice",
        value: "eth_gasPrice",
        params: {
          sepolia: [],
          fuji: [],
          alfajores: [],
          testnet: [],
          mainnet: [],
        },
      },
      {
        label: "eth_getBalance",
        value: "eth_getBalance",
        params: {
          sepolia: [TEST_TRANSACTIONS.sepolia.addParam, "latest"],
          fuji: [TEST_TRANSACTIONS.fuji.addParam, "latest"],
          alfajores: [TEST_TRANSACTIONS.alfajores.addParam, "latest"],
          testnet: [TEST_TRANSACTIONS.testnet.addParam, "latest"],
          mainnet: [TEST_TRANSACTIONS.mainnet.addParam, "latest"],
        },
      },
      {
        label: "eth_getBlockByNumber",
        value: "eth_getBlockByNumber",
        params: {
          sepolia: ["latest", false],
          fuji: ["latest", false],
          alfajores: ["latest", false],
          testnet: ["latest", false],
          mainnet: ["latest", false],
        },
      },
      {
        label: "eth_getBlockTransactionCountByHash",
        value: "eth_getBlockTransactionCountByHash",
        params: {
          sepolia: [TEST_TRANSACTIONS.sepolia.tx],
          fuji: [TEST_TRANSACTIONS.fuji.tx],
          alfajores: [TEST_TRANSACTIONS.alfajores.tx],
          testnet: [TEST_TRANSACTIONS.testnet.tx],
          mainnet: [TEST_TRANSACTIONS.mainnet.tx],
        },
      },
      {
        label: "eth_getBlockTransactionCountByNumber",
        value: "eth_getBlockTransactionCountByNumber",
        params: {
          sepolia: ["latest"],
          fuji: ["latest"],
          alfajores: ["latest"],
          testnet: ["latest"],
          mainnet: ["latest"],
        },
      },
      {
        label: "eth_getCode",
        value: "eth_getCode",
        params: {
          sepolia: [TEST_TRANSACTIONS.sepolia.addParam, "latest"],
          fuji: [TEST_TRANSACTIONS.fuji.addParam, "latest"],
          alfajores: [TEST_TRANSACTIONS.alfajores.addParam, "latest"],
          testnet: [TEST_TRANSACTIONS.testnet.addParam, "latest"],
          mainnet: [TEST_TRANSACTIONS.mainnet.addParam, "latest"],
        },
      },
      {
        label: "eth_getTransactionByBlockHashAndIndex",
        value: "eth_getTransactionByBlockHashAndIndex",
        params: {
          sepolia: [TEST_TRANSACTIONS.sepolia.addParam, "0x0"],
          fuji: [TEST_TRANSACTIONS.fuji.addParam, "0x0"],
          alfajores: [TEST_TRANSACTIONS.alfajores.addParam, "0x0"],
          testnet: [TEST_TRANSACTIONS.testnet.addParam, "0x0"],
          mainnet: [TEST_TRANSACTIONS.mainnet.addParam, "0x0"],
        },
      },
      {
        label: "eth_getTransactionByHash",
        value: "eth_getTransactionByHash",
        params: {
          sepolia: [TEST_TRANSACTIONS.sepolia.tx],
          fuji: [TEST_TRANSACTIONS.fuji.tx],
          alfajores: [TEST_TRANSACTIONS.alfajores.tx],
          testnet: [TEST_TRANSACTIONS.testnet.tx],
          mainnet: [TEST_TRANSACTIONS.mainnet.tx],
        },
      },
      {
        label: "eth_getTransactionCount",
        value: "eth_getTransactionCount",
        params: {
          sepolia: [TEST_TRANSACTIONS.sepolia.addParam, "latest"],
          fuji: [TEST_TRANSACTIONS.fuji.addParam, "latest"],
          alfajores: [TEST_TRANSACTIONS.alfajores.addParam, "latest"],
          testnet: [TEST_TRANSACTIONS.testnet.addParam, "latest"],
          mainnet: [TEST_TRANSACTIONS.mainnet.addParam, "latest"],
        },
      },
      {
        label: "eth_maxPriorityFeePerGas",
        value: "eth_maxPriorityFeePerGas",
        params: {
          sepolia: [],
          fuji: [],
          alfajores: [],
          testnet: [],
          mainnet: [],
        },
      },
      {
        label: "eth_getTransactionReceipt",
        value: "eth_getTransactionReceipt",
        params: {
          sepolia: [TEST_TRANSACTIONS.sepolia.tx],
          fuji: [TEST_TRANSACTIONS.fuji.tx],
          alfajores: [TEST_TRANSACTIONS.alfajores.tx],
          testnet: [TEST_TRANSACTIONS.testnet.tx],
          mainnet: [TEST_TRANSACTIONS.mainnet.tx],
        },
      },
      {
        label: "eth_getUncleByBlockHashAndIndex",
        value: "eth_getUncleByBlockHashAndIndex",
        params: {
          sepolia: [TEST_TRANSACTIONS.sepolia.tx, "0x0"],
          fuji: [TEST_TRANSACTIONS.fuji.tx, "0x0"],
          alfajores: [TEST_TRANSACTIONS.alfajores.tx, "0x0"],
          testnet: [TEST_TRANSACTIONS.testnet.tx, "0x0"],
          mainnet: [TEST_TRANSACTIONS.mainnet.tx, "0x0"],
        },
      },
      {
        label: "eth_getUncleCountByBlockHash",
        value: "eth_getUncleCountByBlockHash",
        params: {
          sepolia: [TEST_TRANSACTIONS.sepolia.tx],
          fuji: [TEST_TRANSACTIONS.fuji.tx],
          alfajores: [TEST_TRANSACTIONS.alfajores.tx],
          testnet: [TEST_TRANSACTIONS.testnet.tx],
          mainnet: [TEST_TRANSACTIONS.mainnet.tx],
        },
      },
      {
        label: "eth_getUncleCountByBlockNumber",
        value: "eth_getUncleCountByBlockNumber",
        params: {
          sepolia: ["earliest"],
          fuji: ["earliest"],
          alfajores: ["earliest"],
          testnet: ["earliest"],
          mainnet: ["earliest"],
        },
      },
      {
        label: "eth_syncing",
        value: "eth_syncing",
        params: {
          sepolia: [],
          fuji: [],
          alfajores: [],
          testnet: [],
          mainnet: [],
        },
      },
    ],
  },
  L2: {
    methods: [
      {
        label: "get_suggested_gas_prices",
        value: "suggestedGasFees",
        params: {},
      },
      {
        label: "get_base_fee_percentile",
        value: "baseFeePercentile",
        params: {},
      },
      {
        label: "get_busy_threshold",
        value: "busyThreshold",
        params: {},
      },
      {
        label: "get_base_fee_history",
        value: "baseFeeHistory",
        params: {},
      },
    ],
  },
};

export const NETWORKS = {
  ARBITRUM: "arbitrum",
  AURORA: "aurora",
  ETHEREUM: "ethereum",
  LINEA: "linea",
  PALM: "palm",
  POLYGON: "polygon",
  OPTIMISM: "optimism",
  GAS_API: "gas.api",
};

export const NETWORKS_NAMES = [
  {
    label: "Ethereum",
    value: NETWORKS.ETHEREUM,
    complexEndpoint: false,
    networksTypes: [NETWORKS_TYPES.mainnet, NETWORKS_TYPES.sepolia],
  },
  {
    label: "Linea",
    value: NETWORKS.LINEA,
    complexEndpoint: true,
    networksTypes: [NETWORKS_TYPES.mainnet],
  },
  {
    label: "Palm",
    value: NETWORKS.PALM,
    complexEndpoint: true,
    networksTypes: [NETWORKS_TYPES.mainnet, NETWORKS_TYPES.testnet],
  },
  {
    label: "Polygon",
    value: NETWORKS.POLYGON,
    complexEndpoint: true,
    networksTypes: [NETWORKS_TYPES.mainnet, NETWORKS_TYPES.mumbai],
  },
  {
    label: "Gas API",
    value: NETWORKS.GAS_API,
    disabled: false,
    complexEndpoint: false,
    isExpansion: true,
    networksTypes: [
      NETWORKS_TYPES.gasEthereum,
      NETWORKS_TYPES.gasPolygon,
      NETWORKS_TYPES.gasFilecoinMainnet,
      NETWORKS_TYPES.gasMumbai,
      NETWORKS_TYPES.gasAvalanche,
      NETWORKS_TYPES.gasFantom,
      NETWORKS_TYPES.gasCronos,
      NETWORKS_TYPES.gasArbitrumOne,
      NETWORKS_TYPES.gasArbitrumNova,
    ],
  },
  {
    label: "Aurora",
    value: NETWORKS.AURORA,
    complexEndpoint: true,
    networksTypes: [NETWORKS_TYPES.mainnet, NETWORKS_TYPES.testnet],
  },
  {
    label: "Arbitrum",
    value: NETWORKS.ARBITRUM,
    complexEndpoint: true,
    networksTypes: [NETWORKS_TYPES.mainnet],
  },
  {
    label: "Optimism",
    value: NETWORKS.OPTIMISM,
    complexEndpoint: true,
    networksTypes: [NETWORKS_TYPES.mainnet],
  },
];

export const INIT_REQ_SET = {
  netName: NETWORKS_NAMES[0],
  netType: NETWORKS_NAMES[0].networksTypes[0],
  netMethod: NETWORKS_METHODS.L1.methods[0],
  apiKey: { label: "", value: "ID", private: "" },
};

const renderHeaders = () => {
  let headers = new Headers();
  headers.append("pragma", "no-cache");
  headers.append("cache-control", "no-cache");
  return headers;
};

export const NO_CACHE = renderHeaders();

export const FEATURE_FLAGS = {
  DOCS_TERMINAL_VISIBLE: "docs-code-terminal-visibility",
  GAS_API_ENABLED: "gas-api-enabled",
};

export const NO_FOUND_PAGE = "/no-found";

export const AUTH_ROUTES = {
  GAS_API: "/infura-expansion-apis/gas-api",
};

export const GET_OPTIONS = {
  credentials: "include",
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  headers: NO_CACHE,
};

export const REF_SERVICES_PATH = "/services/reference/";
export const REF_WALLET_PATH = "/wallet/reference/";

export const REF_ALLOW_LOGIN_PATH = [REF_SERVICES_PATH, REF_WALLET_PATH];

export const REQUEST_PARAMS = (method = "POST") => ({
  method,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

export const AUTH_WALLET_SESSION_NAME = "auth.wallet.session";
export const AUTH_WALLET_TOKEN = "auth.wallet.token";
export const AUTH_WALLET_PROJECTS = "auth.wallet.projects";
export const LINEA_DEV_URL = "https://linea-mainnet.dev.infura.org";
export const LINEA_PROD_URL = "https://linea-mainnet.infura.io";
export const LINEA_REQUEST_URL = process.env.VERCEL_ENV === "production"
    ? LINEA_PROD_URL
    : LINEA_DEV_URL;

export const RPC_NETWORK_URL = "https://sot-network-methods.vercel.app/specs";

export enum NETWORK_NAMES {
  linea = "linea",
  metamask = "metamask",
}

export const lineaSidebarNames = [
  {
    old: "get-started",
    new: "Get started"
  },
  {
    old: "how-to",
    new: "How to"
  },
  {
    old: "use-ipfs",
    new: "Use IPFS"
  },
  {
    old: "access-ipfs-content",
    new: "Access IPFS content"
  },
  {
    old: "send-a-transaction",
    new: "Send transactions"
  },
  {
    old: "use-infura-as-a-reverse-proxy",
    new: "Use Infura as a reverse proxy"
  },
  {
    old: "layer-2-networks",
    new: "Layer 2 networks"
  },
  {
    old: "json-rpc-methods",
    new: "JSON-RPC methods"
  },
  {
    old: "avalanche-c-chain",
    new: "Avalanche (C-Chain)"
  },
  {
    old: "bnb-smart-chain",
    new: "BNB Smart Chain"
  },
  {
    old: "gas-api",
    new: "Gas API"
  },
  {
    old: "ipfs",
    new: "IPFS"
  },
  {
    old: "opbnb",
    new: "opBNB"
  },
  {
    old: "polygon-pos",
    new: "Polygon PoS"
  },
  {
    old: "zksync",
    new: "ZKsync Era"
  },
  {
    old: "http-api-methods",
    new: "HTTP API methods"
  },
  {
    old: "api-reference",
    new: "API reference"
  },
  {
    old: "subscription-methods",
    new: "Subscription methods"
  },
  {
    old: "trace-methods",
    new: "Trace methods"
  },
];

export const JSON_RPC_METHODS_LABEL = "JSON-RPC methods";
