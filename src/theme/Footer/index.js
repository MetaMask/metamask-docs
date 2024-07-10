import React, { useEffect } from "react"
import Footer from "@theme-original/Footer"

export default function FooterWrapper(props) {
  useEffect(() => {
    const handleManageCookie = () => {
      window.Osano.cm.showDrawer("osano-cm-dom-info-dialog-open")
    }
    const cookieBtn = document.getElementById("manage-cookie-btn")
    if (!cookieBtn) return
    cookieBtn.addEventListener("click", handleManageCookie)

    return () => {
      cookieBtn.removeEventListener("click", handleManageCookie)
    }
  }, [])
  return (
    <>
      <Footer {...props} />
    </>
  )
}
