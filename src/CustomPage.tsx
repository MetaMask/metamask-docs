import Layout from "@theme/Layout";
import { NETWORK_NAMES } from "@site/src/plugins/plugin-json-rpc";
import ParserOpenRPC from "@site/src/components/ParserOpenRPC";
import React from "react";


const CustomPage = (props) => {
  const customData = props.route.customData;
  return (
    <Layout>

      <ParserOpenRPC
        network={NETWORK_NAMES.linea}
        method={customData.name}
      />
    </Layout>
  );
};

export default CustomPage;