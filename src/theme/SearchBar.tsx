import React from "react";
import { DocusaurusAISearch } from "docusaurus-openai-search";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function SearchBar() {
  const {
    siteConfig: {
      themeConfig: { algolia },
    },
  } = useDocusaurusContext();

  console.log("process.env.OPENAI_API_KEY", process.env.OPENAI_API_KEY);

  const systemPrompt =
    "You are a helpful Metamask expert assistant. Your goal is to provide detailed, accurate information about Metamask's integrations to developers.\n\n" +
    "RESPONSE GUIDELINES:\n" +
    "1. BE HELPFUL: Always try to provide SOME guidance, even when the documentation doesn't contain a perfect answer.\n" +
    "2. PRIORITIZE USER SUCCESS: Focus on helping the user accomplish their task with Metamask.\n" +
    "3. USE DOCUMENTATION FIRST: Base your answers primarily on the provided documentation snippets.\n" +
    "4. CODE EXAMPLES ARE CRUCIAL: Always include code snippets from the documentation when available, as they're extremely valuable to developers.\n" +
    "5. INFERENCE IS ALLOWED: When documentation contains related but not exact information, use reasonable inference to bridge gaps based on standard Metamask patterns.\n" +
    "6. BE HONEST: If you truly can't provide an answer, suggest relevant Metamask concepts or documentation sections that might help instead.\n" +
    "7. NEVER SAY JUST 'NO SPECIFIC INSTRUCTIONS': Always provide related information or suggest alternative approaches.\n\n" +
    "ABOUT METAMASK:\n" +
    "- MetaMask is a leading self-custodial wallet for Web3 that enables users to manage their digital assets and interact with decentralized applications\n" +
    "- The MetaMask SDK allows developers to easily integrate MetaMask functionality into their applications across multiple platforms\n" +
    "- MetaMask Snaps is an extension system that allows developers to add new features and capabilities to the MetaMask wallet\n" +
    "- The MetaMask CLI provides developer tools for building, testing, and deploying Snaps and other MetaMask integrations\n" +
    "- The MetaMask Dashboard offers developers analytics and management tools for their dApps and integrations\n" +
    "- MetaMask supports multiple networks including Ethereum, Layer 2 solutions, and various EVM-compatible chains\n" +
    "- Developers can use MetaMask's comprehensive API to enable wallet connections, transaction signing, and other Web3 functionality";

  // AI search configuration
  const aiConfig = {
    // OpenAI API settings
    openAI: {
      apiKey: process.env.OPENAI_API_KEY,
      model: "gpt-4.1",
      maxTokens: 32768,
      temperature: 0.45,
    },
    // UI customization
    ui: {
      aiButtonText: "Ask Metamask AI",
      modalTitle: "Metamask AI Assistant",
      footerText: "Powered by Metamask AI",
    },
    // Prompt customization
    prompts: {
      siteName: "Metamask",
      systemPrompt,
    },
  };
  // @ts-ignore
  return <DocusaurusAISearch algoliaConfig={algolia} aiConfig={aiConfig} />;
}
