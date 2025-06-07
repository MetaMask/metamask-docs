import React, {type ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';
import {useThemeConfig} from '@docusaurus/theme-common';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface ProductConfig {
  name: string;
  description: string;
}

const PRODUCT_CONFIGS: Record<string, ProductConfig> = {
  '/sdk/': {
    name: 'MetaMask SDK documentation',
    description: 'Seamlessly connect to the MetaMask extension and MetaMask Mobile using the SDK.',
  },
  '/wallet/': {
    name: 'Wallet API documentation',
    description: 'Directly integrate your dapp with the MetaMask extension using the Wallet API.',
  },
  '/delegation-toolkit/': {
    name: 'MetaMask Delegation Toolkit documentation',
    description: 'Embed MetaMask smart accounts with new web3 experiences into your dapp.',
  },
  '/snaps/': {
    name: 'Snaps documentation',
    description: 'Create a custom Snap to extend the functionality of MetaMask.',
  },
  '/services/': {
    name: 'Services documentation',
    description: 'Use services provided by MetaMask and Infura to optimize essential development tasks and scale your dapp or Snap.',
  },
  '/developer-tools/dashboard/': {
    name: 'Developer dashboard documentation',
    description: 'Manage Infura API keys, monitor usage, and access account details in the developer dashboard.',
  },
};

function getProductConfig(pathname: string): ProductConfig | null {
  for (const [path, config] of Object.entries(PRODUCT_CONFIGS)) {
    if (pathname.startsWith(path)) {
      return config;
    }
  }
  return null;
}

export default function ProductBanner(): ReactNode | null {
  const location = useLocation();
  const productConfig = getProductConfig(location.pathname);
  const {navbar} = useThemeConfig();

  if (!productConfig) {
    return null;
  }

  return (
    <div className={clsx(styles.productBanner)}>
      <div className={styles.productBannerContent}>
        <h2 className={styles.productName}>{productConfig.name}</h2>
        <p className={styles.productDescription}>{productConfig.description}</p>
      </div>
    </div>
  );
}