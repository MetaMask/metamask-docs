import React from "react";
import Content from "@theme-original/Navbar/Content";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Button from "../../../components/Login/Button";

export default function ContentWrapper(props) {

  return (
    <>
      <Content {...props} />
      <BrowserOnly>{() => <Button />}</BrowserOnly>
    </>
  );
}