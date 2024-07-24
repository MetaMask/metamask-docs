import React, { useEffect } from "react";
import Footer from "@theme-original/Footer";
import { Intercom } from "@intercom/messenger-js-sdk";
import useIsBrowser from "@docusaurus/useIsBrowser";

export default function FooterWrapper(props) {
  useEffect(() => {
    const handleManageCookie = () => {
      window.Osano.cm.showDrawer("osano-cm-dom-info-dialog-open");
    };
    const cookieBtn = document.getElementById("manage-cookie-btn");
    if (!cookieBtn) return;
    cookieBtn.addEventListener("click", handleManageCookie);

    return () => {
      cookieBtn.removeEventListener("click", handleManageCookie);
    };
  }, []);

  const isBrowser = useIsBrowser();
  if (isBrowser) {
    Intercom({
      app_id: 'txttgas6'
    });
  }

  return (
    <>
      <Footer {...props} />
    </>
  );
}
