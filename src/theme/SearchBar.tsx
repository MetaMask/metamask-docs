import React from "react";
import { DocusaurusAISearch } from "docusaurus-openai-search";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function SearchBar() {
  const {
    siteConfig: {
      themeConfig,
    },
  } = useDocusaurusContext();

  // AI search configuration
  const aiConfig = {
    backend: {
      url: "https://docusaurus-openai-search-backend.vercel.app",
    },
    context: {
      siteName: "Metamask Documentation",
      systemContext:
        "ABOUT METAMASK:\n" +
        "- MetaMask is a leading self-custodial wallet for Web3 that enables users to manage their digital assets and interact with decentralized applications\n" +
        "- The MetaMask SDK allows developers to easily integrate MetaMask functionality into their applications across multiple platforms\n" +
        "- MetaMask Snaps is an extension system that allows developers to add new features and capabilities to the MetaMask wallet\n" +
        "- The MetaMask CLI provides developer tools for building, testing, and deploying Snaps and other MetaMask integrations\n" +
        "- The MetaMask Dashboard offers developers analytics and management tools for their dApps and integrations\n" +
        "- MetaMask supports multiple networks including Ethereum, Layer 2 solutions, and various EVM-compatible chains\n" +
        "- Developers can use MetaMask's comprehensive API to enable wallet connections, transaction signing, and other Web3 functionality",
    },
    ui: {
      aiButtonText: "Ask Metamask AI",
      modalTitle: "Metamask AI Assistant",
      footerText: "Powered by Metamask AI",
      searchButtonText: "Search with AI",
      searchButtonAriaLabel: "Search with Metamask AI",
      showSearchButtonShortcut: false,
      useCustomSearchButton: true,
    },
    enableLogging: true,
    enableCaching: true,
    recaptcha: {
      siteKey: "6LeotlkrAAAAAEREf2umQgDoO2l3zfqUdJR599LV",
    },
  };
  // @ts-ignore
  return <DocusaurusAISearch themeConfig={themeConfig} aiConfig={aiConfig} />;
}
