import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import CardSection from "@site/src/components/CardSection";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.introductionBlock, "margin-bottom--lg")}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.title, styles.forceColor)}>
          {siteConfig.title}
        </h1>
        <p
          className={clsx("hero__subtitle", styles.subtitle, styles.forceColor)}
        >
          Integrate with and extend upon the world&apos;s leading self-custodial
          crypto wallet.
        </p>
        <Link
          className={clsx(styles.homepageButton, "button button--lg")}
          to="/wallet"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}

function DevBanner() {
  return (
    <header className={clsx(styles.devBannerBlock)}>
      <div className="container">
        <h1
          className={clsx(
            "hero__title",
            styles.devBannerTitle,
            styles.devBannerForceColor
          )}
        >
          {"Contribute to MetaMask"}
        </h1>
        <p
          className={clsx(
            "hero__subtitle",
            styles.devBannerSubtitle,
            styles.devBannerForceColor
          )}
        >
          Join the MetaMask developer community and learn how to contribute to
          the MetaMask project itself.
        </p>
        <Link
          className={clsx(
            styles.devBannerButton,
            "button button--outline button--secondary button--md"
          )}
          href="https://github.com/MetaMask/metamask-extension/blob/develop/docs/README.md"
        >
          Contribute&nbsp;
          <svg
            width="13.5"
            height="13.5"
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"
          >
            <path
              fill="currentColor"
              d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
            ></path>
          </svg>
        </Link>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title={"Home"}>
      <HomepageHeader />
      <main>
        <CardSection />
        <DevBanner />
      </main>
    </Layout>
  );
}
