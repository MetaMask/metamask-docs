import React, { useMemo } from "react";
import Link from "@docusaurus/Link";
import Badge from "@site/src/components/Badge";
import Table from "@site/src/components/Table";
import Text from "@site/src/components/Text";
import { LINEA_URL, SEPOLIA_URL } from "@site/src/pages/developer-tools/faucet";
import { trackClickForSegment } from "@site/src/lib/segmentAnalytics";

const hideCenterLetters = (word) => {
  if (word.length < 10) return word;
  return `${word.substring(0, 5)}...${word.substring(word.length - 4)}`;
};

const transformWordEnding = (value, end) => {
  const upValue = Math.floor(value);
  return `${upValue} ${end}${upValue === 1 ? "" : "s"} ago`;
};

const getDiffTime = (time) => {
  if (!time) return "unknown";
  const currentTime = Date.now();
  const startTime = new Date(time).getTime();
  const deltaTimeInSec = (currentTime - startTime) / 1000;
  const deltaTimeInMin = deltaTimeInSec / 60;
  const deltaTimeInHours = deltaTimeInMin / 60;
  const deltaTimeInDays = deltaTimeInHours / 24;

  if (deltaTimeInMin < 1) return transformWordEnding(deltaTimeInSec, "second");
  if (deltaTimeInHours < 1)
    return transformWordEnding(deltaTimeInMin, "minute");
  if (deltaTimeInDays < 1) return transformWordEnding(deltaTimeInHours, "hour");
  return transformWordEnding(deltaTimeInDays, "day");
};

const renderStatus = (status) => {
  switch (status) {
    case "success":
      return "success";
    case "failed":
      return "error";
    default:
      return "default";
  }
};

const renderValue = (status) => {
  switch (status) {
    case "success":
      return "successful";
    case "failed":
      return "failed";
    default:
      return "pending";
  }
};

interface ITransactionTable {
  className?: string;
  classNameHeading?: string;
  data: {
    id: string;
    createdAt: string;
    txnHash: string;
    value: string;
    status: "pending" | "success" | "failure";
    hash: string;
  }[];
  network: "sepolia" | "linea";
}

export default function TransactionTable({
  className,
  classNameHeading,
  data = [],
  network,
}: ITransactionTable) {
  if (data?.length === 0) return null;

  const handleClickViewTransaction = () => {
    trackClickForSegment({
      eventName: "View on Etherscan",
      clickType: `Transactions Table`,
      userExperience: "B",
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    });
  };

  const dataRows = useMemo(() => {
    return data.map((item) => ({
      cells: [
        hideCenterLetters(item.txnHash),
        getDiffTime(item.createdAt),
        `${item.value} ETH`,
        <Badge
          key={item.id}
          label={renderValue(item.status)}
          variant={renderStatus(item.status)}
        />,
        <Link
          data-testid={`table-transactions-${network}-etherscan`}
          onClick={handleClickViewTransaction}
          key={`link-${item.id}`}
          to={`${network === "linea" ? LINEA_URL : SEPOLIA_URL}/${item.txnHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Etherscan
        </Link>,
      ],
    }));
  }, [data]);

  return (
    <div className={className}>
      <div className={classNameHeading}>
        <Text as="h2">Transaction History</Text>
        <Text as="p">
          Here is a list of your requests from the MetaMask faucet. View your transaction on Etherscan for more information.
        </Text>
      </div>
      <Table
        thCells={["Your Transactions", "Age", "Value", "Status", ""]}
        trRows={dataRows}
      />
    </div>
  );
}
