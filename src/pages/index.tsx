import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import WalletSection from "@site/src/components/WalletSection";
import SnapsSection from "@site/src/components/SnapsSection";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.introductionBlock, "margin-bottom--lg")}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.title, styles.forceColor)}>
          {siteConfig.title}
        </h1>
        <p className={clsx("hero__subtitle", styles.subtitle, styles.forceColor)}>
          Integrate with and extend upon the world&apos;s leading self-custodial crypto wallet.
        </p>
        <Link className={clsx(styles.homepageButton, "button button--lg")} to="/wallet">
          Get started
        </Link>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title={"Home"}>
      <HomepageHeader />
      <main>
        <WalletSection />
        <SnapsSection />
      </main>
    </Layout>
  );
}
