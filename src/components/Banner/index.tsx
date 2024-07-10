import React from "react"
import Link from "@docusaurus/Link"
import styles from "./banner.module.css"

interface BannerProps {
  children: React.ReactNode
}

const Banner: React.FC<BannerProps> = ({ children }) => {
  return (
    <div className={styles.banner}>
      {children}
      <Link
        to="https://app.infura.io/register"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={`${styles.button} margin-top--xs`}>
          Sign up&nbsp;
          <svg
            width="13.5"
            height="13.5"
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"
          >
            <path
              fill="currentColor"
              d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
            />
          </svg>
        </div>
      </Link>
    </div>
  )
}

export default Banner
