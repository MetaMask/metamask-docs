import React from "react";
import { AlertTitle, AlertText } from "@site/src/components/Alert";

export const AlertCommonIssue = () => (
  <div>
    <AlertTitle>Issue starting transaction</AlertTitle>
    <AlertText>
      There was an issue starting your transaction. Try again in a few minutes.
      If the problem persists please{" "}
      <a target="_blank" href="https://www.infura.io/contact">
        contact us
      </a>
      .
    </AlertText>
  </div>
);

export const AlertPastActivity = () => (
  <div>
    <AlertTitle>No past activity</AlertTitle>
    <AlertText>
      The address used hasn’t been active on Ethereum Mainnet yet. To proceed,
      please use an address that has activity on Ethereum Mainnet. For further
      details, refer to our FAQ below.
    </AlertText>
  </div>
);

export const AlertCooldown = () => (
  <div>
    <AlertTitle>Cooldown period</AlertTitle>
    <AlertText>
      You already got ETH from the faucet today. Try again in 24 hours.{" "}
      <a target="_blank" href="https://www.infura.io/contact">
        Contact us
      </a>
      .
    </AlertText>
  </div>
);

export const AlertSuccess = ({ url }: { url: string }) => (
  <div>
    <AlertTitle>Transaction successfull!</AlertTitle>
    <AlertText>
      Your transaction has been sent to the Ethereum/Sepolia network. You should
      be receiving your ETH shortly.{" "}
      <a target="_blank" href={url}>
        View on Etherscan
      </a>
      .
    </AlertText>
  </div>
);
