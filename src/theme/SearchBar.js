import React from "react";
import SearchBar from "@theme-original/SearchBar";
import { MetaMaskBot } from "../components/MetaMaskBot/MetaMaskBot";

export default function SearchBarWrapper(props) {
  return (
    <>
      <SearchBar {...props} />
      <MetaMaskBot />
    </>
  );
}
