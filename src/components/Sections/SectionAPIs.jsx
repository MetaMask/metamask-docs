import React from "react";
import { API_LINKS } from "@site/src/lib/data";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";

const SectionAPIs = () => {
  return (
    <section className="flex-row items-align-start">
      <div className="flex-col w-lg-50">
        <Heading as="h2" className="heading-md">
          Blockchain APIs
        </Heading>
        <ul className="links-list">
          {API_LINKS.blockchain.map((item) => (
            <li key={item.name}>
              <Link to={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-col w-lg-50">
        <Heading as="h2" className="heading-md">
          Decentralize storage APIs
        </Heading>
        <ul className="links-list">
          {API_LINKS.storage.map((item) => (
            <li key={item.name}>
              <Link to={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SectionAPIs;
