import React, {type ReactNode, useEffect, useState} from 'react';
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
    description: 'Seamlessly connect to the MetaMask extension and mobile app.',
  },
  '/wallet/': {
    name: 'Wallet API documentation',
    description: 'Directly integrate your dapp with the MetaMask extension.',
  },
  '/delegation-toolkit/': {
    name: 'Delegation Toolkit documentation',
    description: 'Embed MetaMask smart accounts into your dapp, enabling new user experiences.',
  },
  '/snaps/': {
    name: 'Snaps documentation',
    description: 'Create a custom mini app that runs inside the MetaMask extension.',
  },
  '/services/': {
    name: 'Services documentation',
    description: 'Use high performance APIs provided by Infura to scale your dapp or Snap.',
  },
  '/developer-tools/dashboard/': {
    name: 'Developer dashboard documentation',
    description: 'Manage Infura API keys, monitor usage, and access account details.',
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
  const [isNavbarPresent, setIsNavbarPresent] = useState(true);

  useEffect(() => {
    if (!navbar.hideOnScroll) return;

    const checkNavbarPresence = () => {
      const navbarElement = document.querySelector('.navbar');
      setIsNavbarPresent(!!navbarElement);
    };

    checkNavbarPresence();
    const intervalId = setInterval(checkNavbarPresence, 100);

    return () => clearInterval(intervalId);
  }, [navbar.hideOnScroll]);


  if (!productConfig) {
    return null;
  }

  return (
    <div 
      className={clsx(
        styles.productBanner,
        !isNavbarPresent && styles.productBannerNoNavbar
      )}
    >
      <div className={styles.productBannerContent}>
        <h2 className={styles.productName}>{productConfig.name}</h2>
        <p className={styles.productDescription}>{productConfig.description}</p>
      </div>
    </div>
  );
}