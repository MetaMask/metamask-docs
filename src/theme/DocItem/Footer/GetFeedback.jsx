// cSpell:words usabilla, getfeedback
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";

const GetFeedback = (props) => {
  const feedbackContRef = useRef();
  const { colorMode } = useColorMode();
  const [theme, setTheme] = useState();

  useEffect(() => {
    setTheme(colorMode);
  }, [colorMode]);

  useEffect(() => {
    setTheme(window?.localStorage?.getItem("theme") || colorMode);
    window.usabilla.load("w.usabilla.com", "8485bdb0fb3c");
  }, []);

  return (
    <div className="getfeedback-container">
      {/*Light*/}
      <div
        ub-in-page="65299f6ab62d7120574ba82a"
        className={theme === "dark" ? "getfeedback-hidden" : undefined}
        ref={feedbackContRef}
      />
      {/*Dark*/}
      <div
        ub-in-page="6529a08f7a6d62001f19a79d"
        className={theme === "light" ? "getfeedback-hidden" : undefined}
        ref={feedbackContRef}
      />
    </div>
  );
};

export default GetFeedback;
