import React from "react";
import Accordion from "@site/src/components/Accordion";
import Text from "@site/src/components/Text";
import styles from "./faq.module.scss";

interface IFaq {
  network: "linea" | "sepolia";
  className: string;
  classNameHeading: string;
  isLimitedUserPlan?: boolean;
}

export default function Faq({
  network,
  className,
  classNameHeading,
  isLimitedUserPlan,
}: IFaq) {
  switch (network) {
    case "linea":
      return (
        <div className={className}>
          <div className={classNameHeading}>
            <Text as="h2">Frequently Asked Questions</Text>
            <Text as="p">
              Answers to commonly asked questions about our faucet.
            </Text>
          </div>
          {isLimitedUserPlan && (
            <Accordion>
              <Text as="h3" className={styles.accordionHeader}>
                Why must my address have Ethereum Mainnet activity to claim
                Linea ETH?x
              </Text>
              <Text as="p" className={styles.accordionContainer}>
                We require an address with Ethereum Mainnet activity to
                safeguard the faucet from automated bots, ensuring equitable
                Linea ETH distribution. The amount of Linea ETH you can receive
                ranges from 0 to 0.5, depending on your address’s level of
                activity. No activity results in no Linea ETH. while a higher
                number of transactions can earn you up to 0.5. We maintain
                confidentiality over the exact criteria used to determine the
                amount issued to prevent any exploitation of the system, aiming
                to distribute testnet ETH fairly among genuine, active users.
              </Text>
            </Accordion>
          )}
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              I’m new to Web3. What is a faucet?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              A faucet is a platform that gives you test tokens to use when
              testing your smart contracts. In this case, our faucet is giving
              you Sepolia ETH to test deploying smart contracts and sending
              transactions before deploying your dapp in production on Mainnet.
            </Text>
          </Accordion>
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              What is Linea?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              <span>
                <a target="_blank" href="https://linea.build">
                  Linea
                </a>{" "}
                is a type 2 zero knowledge Ethereum Virtual Machine (zkEVM). A
                zkEVM replicates the Ethereum environment as a rollup and allows
                developers to build on it as they would on Ethereum mainnet.
                Linea allows you to deploy any smart contract, use any tool, and
                develop as if you’re building on Ethereum. For users, this
                enables experience and security guarantees of Ethereum, but with
                lower transaction costs and at greater speed.
              </span>
            </Text>
          </Accordion>
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              How can I get help with using this faucet?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              <span>
                <a target="_blank" href="https://support.metamask.io/">
                  Contact us
                </a>{" "}
                with any issues or questions you have relating the faucet.
              </span>
            </Text>
          </Accordion>
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              How can I help make this faucet better?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              <span>
                Have ideas on how to improve the faucet? Awesome! We’d love to
                hear them. Submit them{" "}
                <a target="_blank" href="https://discord.com/invite/consensys">
                  here.
                </a>
              </span>
            </Text>
          </Accordion>
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              Where does Linea ETH come from?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              <span>
                Linea ETH were intially Goerli ETH that were bridged to Linea
                using the canonical{" "}
                <a
                  target="_blank"
                  href="https://docs.linea.build/use-linea/bridge-funds"
                >
                  bridge.
                </a>
              </span>
            </Text>
          </Accordion>
        </div>
      );
    case "sepolia":
      return (
        <div className={className}>
          <div className={classNameHeading}>
            <Text as="h2">Frequently Asked Questions</Text>
            <Text as="p">
              Answers to commonly asked questions about our faucet.
            </Text>
          </div>
          {isLimitedUserPlan && (
            <Accordion>
              <Text as="h3" className={styles.accordionHeader}>
                Why must my address have Ethereum Mainnet activity to claim
                Sepolia ETH?
              </Text>
              <Text as="p" className={styles.accordionContainer}>
                We require an address with Ethereum Mainnet activity to
                safeguard the faucet from automated bots, ensuring equitable
                Sepolia ETH distribution. The amount of Sepolia ETH you can
                receive ranges from 0 to 0.5, depending on your address’s level
                of activity. No activity results in no Sepolia ETH. while a
                higher number of transactions can earn you up to 0.5. We
                maintain confidentiality over the exact criteria used to
                determine the amount issued to prevent any exploitation of the
                system, aiming to distribute testnet ETH fairly among genuine,
                active users.
              </Text>
            </Accordion>
          )}
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              I’m new to Web3. What is a faucet?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              A faucet is a platform that gives you test tokens to use when
              testing your smart contracts. In this case, our faucet is giving
              you Sepolia ETH to test deploying smart contracts and sending
              transactions before deploying your dapp in production on Mainnet.
            </Text>
          </Accordion>
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              How can I get help with using this faucet?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              <span>
                <a target="_blank" href="https://support.metamask.io/">
                  Contact us
                </a>{" "}
                with any issues or questions you have relating the faucet.
              </span>
            </Text>
          </Accordion>
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              How can I help make this faucet better?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              <span>
                Have ideas on how to improve the faucet? Awesome! We’d love to
                hear them. Submit them{" "}
                <a target="_blank" href="https://discord.com/invite/consensys">
                  here.
                </a>
              </span>
            </Text>
          </Accordion>
          <Accordion>
            <Text as="h3" className={styles.accordionHeader}>
              Where does Sepolia ETH come from?
            </Text>
            <Text as="p" className={styles.accordionContainer}>
              The Sepolia ETH comes from our partnership with the Ethereum
              Foundation. We collaborate with them to support the development
              community by maintaining an always on and reliable faucet
              enviroment for the community.
            </Text>
          </Accordion>
        </div>
      );
  }
}
