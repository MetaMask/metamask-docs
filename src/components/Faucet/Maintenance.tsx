import MaintenanceIco from "./maintenance.svg";
import Text from "@site/src/components/Text";
import Button from "@site/src/components/Button";

import styles from "./maintenance.module.scss";
import React from "react";

const Maintenance = ({ network }: { network: "linea" | "sepolia" }) => {
  const SEPOLIA_URL = "https://faucetlink.to/sepolia";
  const LINEA_URL =
    "https://docs.linea.build/build-on-linea/use-linea-testnet/fund";

  return (
    <div className={styles.maintenance}>
      <div className={styles.modal}>
        <MaintenanceIco />
        <Text as="h3">Our faucet is at full capacity due to high demand</Text>
        <Text as="p">
          We’re thrilled by the enthusiasm and are working hard to scale up. Try
          checking back later. Thanks for your patience. Need ETH urgently?
        </Text>
        <Button className={styles.button} href={network === "sepolia" ? SEPOLIA_URL : LINEA_URL}>
          Explore Alternative Faucets
        </Button>
      </div>
    </div>
  );
};

export default Maintenance;
