import React, { useMemo } from "react";
import Link from "@docusaurus/Link";
import Badge from "@site/src/components/Badge";
import Table from "@site/src/components/Table";

const TABLE_DATA = [
  {
    id: "01",
    createdAt: "2024-06-05T13:24:49.207Z",
    txnHash: "0x38412083eb28fdf332d4ca7e1955cbb40a94adfae14ef7a3e9856f95c32b2ef2",
    value: "0.0001",
    status: "success",
  },
  {
    id: "02",
    createdAt: "2024-05-05T13:24:49.207Z",
    txnHash: "0x48412083eb28fdf332d4ca7e1955cbb40a94adfae14ef7a3e9856f95c32b2ef2",
    value: "0.0002",
    status: "failed",
  },
  {
    id: "03",
    createdAt: "2024-07-05T13:24:49.207Z",
    txnHash: "0x58412083eb28fdf332d4ca7e1955cbb40a94adfae14ef7a3e9856f95c32b2ef2",
    value: "0.0003",
    status: "pending",
  },
];

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
  if (deltaTimeInHours < 1) return transformWordEnding(deltaTimeInMin, "minute");
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
      return "pending";
  }
};

export default function TransactionTable() {
  const dataRows = useMemo(() => {
    return TABLE_DATA.map((item) => ({
      cells: [
        hideCenterLetters(item.txnHash),
        getDiffTime(item.createdAt),
        `${item.value} ETH`,
        <Badge key={item.id} label={item.status} variant={renderStatus(item.status)} />,
        <Link key={`link-${item.id}`} to="/" target="_blank" rel="noopener noreferrer">
          View on Etherscan
        </Link>,
      ],
    }));
  }, []);

  return <Table thCells={["Your Transactions", "Age", "Value", "Status", ""]} trRows={dataRows} />;
}
