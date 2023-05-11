import React from "react";
import SearchBar from "@theme-original/SearchBar";
import { MetamaskBot } from "../components/MetamaskBot/MetamaskBot";

export default function SearchBarWrapper(props) {
  return (
    <>
      <SearchBar {...props} />
      <MetamaskBot />
    </>
  );
}
