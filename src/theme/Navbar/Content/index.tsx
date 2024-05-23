import React from "react";
import Content from "@theme-original/Navbar/Content";
import Button from "../../../components/Login/Button";

export default function ContentWrapper(props) {

  return (
    <>
      <Content {...props} />
      <div style={{ marginLeft: "20px" }}>
        <Button />
      </div>
    </>
  );
}