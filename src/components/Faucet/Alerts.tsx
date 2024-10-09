import React from "react";
import { AlertTitle, AlertText } from "@site/src/components/Alert";
import { trackClickForSegment } from "@site/src/lib/segmentAnalytics";

const handleClickCommonIssue = () => {
  trackClickForSegment({
    eventName: "Contact us",
    clickType: `Common Issue Alert`,
    userExperience: "B",
    responseStatus: null,
    responseMsg: null,
    timestamp: Date.now(),
  });
};

const handleClickBalanceLow = () => {
  trackClickForSegment({
    eventName: "Add funds using MetaMask",
    clickType: `Low Balance Alert`,
    userExperience: "B",
    responseStatus: null,
    responseMsg: null,
    timestamp: Date.now(),
  });
};

const handleClickCooldown = () => {
  trackClickForSegment({
    eventName: "Contact us",
    clickType: `Cooldown Alert`,
    userExperience: "B",
    responseStatus: null,
    responseMsg: null,
    timestamp: Date.now(),
  });
};

const handleClickViewTransaction = () => {
  trackClickForSegment({
    eventName: "View on Etherscan",
    clickType: `Success Alert`,
    userExperience: "B",
    responseStatus: null,
    responseMsg: null,
    timestamp: Date.now(),
  });
};

export const AlertCommonIssue = () => (
  <div>
    <AlertTitle>Issue starting transaction</AlertTitle>
    <AlertText>
      <span>
        There was an issue starting your transaction. Try again in a few
        minutes. If the problem persists please{" "}
        <a
          data-testid="alert-common-contact-us"
          onClick={handleClickCommonIssue}
          target="_blank"
          href="https://support.metamask.io/"
        >
          contact support
        </a>
        .
      </span>
    </AlertText>
  </div>
);

export const AlertPastActivity = () => (
  <div>
    <AlertTitle>No past activity</AlertTitle>
    <AlertText>
      The address used hasn't been active on Ethereum Mainnet yet. To proceed,
      please use an address that has activity on Ethereum Mainnet. For more
      details, refer to the following FAQ.
    </AlertText>
  </div>
);

export const AlertBalanceTooLow = () => (
  <div>
    <AlertTitle>Balance too low</AlertTitle>
    <AlertText>
      <span>
        Your current Ethereum address does not contain enough ETH on
        Ethereum Mainnet. You can add funds to your address using{" "}
        <a
          data-testid="alert-balance-add-funds"
          onClick={handleClickBalanceLow}
          className="underline"
          href="https://metamask.io/buy-crypto/"
        >
          MetaMask
        </a>
        .
      </span>
    </AlertText>
  </div>
);

export const AlertCooldown = () => (
  <div>
    <AlertTitle>Cooldown period</AlertTitle>
    <AlertText>
      <span>
        You already got ETH from the faucet today. Try again in 24 hours.{" "}
        <a
          data-testid="alert-cooldown-contact-us"
          onClick={handleClickCooldown}
          target="_blank"
          href="https://support.metamask.io/"
        >
          Contact us
        </a>
        .
      </span>
    </AlertText>
  </div>
);

export const AlertSuccess = ({ url }: { url: string }) => (
  <div>
    <AlertTitle>Transaction successfull!</AlertTitle>
    <AlertText>
      <span>
        Your transaction has been sent to the Ethereum/Sepolia network. You
        will receive your ETH shortly.{" "}
        <a
          data-testid="alert-success-etherscan"
          onClick={handleClickViewTransaction}
          target="_blank"
          href={url}
        >
          View on Etherscan
        </a>
        .
      </span>
    </AlertText>
  </div>
);
