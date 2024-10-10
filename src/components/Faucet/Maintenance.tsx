import MaintenanceIco from "./maintenance.svg";
import Text from "@site/src/components/Text";
import Button from "@site/src/components/Button";

import styles from "./maintenance.module.scss";
import React from "react";
import { trackClickForSegment } from "@site/src/lib/segmentAnalytics";

const Maintenance = ({ network }: { network: "linea" | "sepolia" }) => {
  const SEPOLIA_URL = "https://faucetlink.to/sepolia";
  const LINEA_URL =
    "https://docs.linea.build/build-on-linea/use-linea-testnet/fund";

  const handleOnClick = () => {
    trackClickForSegment({
      eventName: "Explore Alternative Faucets",
      clickType: `Maintenance ${network}`,
      userExperience: "B",
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    });
  };

  return (
    <div className={styles.maintenance}>
      <div className={styles.modal}>
        <MaintenanceIco />
        <Text as="h3">The faucet is at full capacity due to high demand.</Text>
        <Text as="p">
          Try
          checking back later. Thank you for your patience. Need ETH urgently?
        </Text>
        <Button
          testId="maintenance-cta-alternative"
          onClick={handleOnClick}
          className={styles.button}
          href={network === "sepolia" ? SEPOLIA_URL : LINEA_URL}
        >
          Explore Alternative Faucets
        </Button>
      </div>
    </div>
  );
};

export default Maintenance;
