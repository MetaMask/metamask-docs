import React from "react";
import Footer from "@theme-original/DocItem/Footer";
import GetFeedback from "./GetFeedback.jsx";

export default function FooterWrapper(props) {
  return (
    <>
      <GetFeedback />
      <Footer {...props} />
    </>
  );
}
