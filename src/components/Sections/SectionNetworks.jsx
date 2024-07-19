import React, { useEffect, useState } from "react";
import Icon from "@site/src/components/Icon/Icon";
import { NETWORK_LINKS } from "@site/src/lib/data";
import Link from "@docusaurus/Link";

const SectionNetworks = () => {
  const [isNetworksListCollapsed, setIsNetworksListToggledCollapsed] =
    useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const handleShowMoreLessClick = () => {
    setIsNetworksListToggledCollapsed(!isNetworksListCollapsed);
  };
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    if (window) {
      setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize, false);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const renderNetworkCard = ({ name, href, logo }, index) => (
    <Link
      className={`api-card transition-300 ${
        isNetworksListCollapsed && isMobile
          ? index === 4
            ? "opacity-30"
            : index === 3
            ? "opacity-60"
            : ""
          : ""
      }`}
      key={name}
      to={href}>
      <div className="logo-wrap">
        <img src={logo} alt={`${name} logo`} />
      </div>
      {name}
      <span className="icon-wrap">
        <Icon name="angle-right" classes="static-icon" />
        <Icon name="angle-line-right" classes="hover-icon" />
      </span>
    </Link>
  );

  return (
    <section className="networks-section">
      <div className="grid-row-wrap">
        {NETWORK_LINKS.map((item, index) =>
          isMobile
            ? index <= 4 || !isNetworksListCollapsed
              ? renderNetworkCard(item, index)
              : null
            : renderNetworkCard(item, index),
        )}
      </div>
      {isMobile && (
        <div className="show-more-less" onClick={handleShowMoreLessClick}>
          <span className="show-more-less-icon">
            {isNetworksListCollapsed ? "+" : "–"}
          </span>
          show {isNetworksListCollapsed ? "more" : "less"} networks
        </div>
      )}
    </section>
  );
};

export default SectionNetworks;