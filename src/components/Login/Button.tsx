import React, { useState, useEffect } from "react";
import { Connector, useAccount, useConnect, useDisconnect } from "wagmi";
import { authenticateAndAuthorize } from "../../lib/auth";

const Button = () => {
  const [metaMaskConnector, setMetaMaskConnector] = useState<Connector>();
  const { isConnected, connector } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const connector = connectors.find((c) =>
      ["MetaMask Flask", "MetaMask"].includes(c.name),
    );
    if (connector) {
      setMetaMaskConnector(connector);
    }
  }, [connectors]);

  useEffect(() => {
    const initAuth = async () => {
      const { userProfile } = await authenticateAndAuthorize();
      alert(
        JSON.stringify(
          {
            profileId: userProfile.profileId,
          },
          null,
          2,
        ),
      );
      console.log(userProfile.profileId);
    };
    if (isConnected) {
      initAuth();
    }
  }, [connector]);

  return (
    <div style={{ marginLeft: "20px" }}>
      {!metaMaskConnector ? (
        <button>Install MetaMask</button>
      ) : !isConnected ? (
        <button style={{
          cursor: "pointer",
          position: "relative",
          top: "6px",
          padding: "10px",
          borderRadius: "3px",
          fontWeight: "bold",
          backgroundColor: "#222",
          color: "#fff",
          textWrap: "nowrap",
          border: 0 }}
        onClick={() => connect({ connector: metaMaskConnector })}>
          Log in
        </button>
      ) : (
        isConnected && (
          <div>
            <button style={{
              cursor: "pointer",
              position: "relative",
              top: "6px",
              padding: "10px",
              borderRadius: "3px",
              fontWeight: "bold",
              backgroundColor: "#222",
              color: "#eb693f",
              textWrap: "nowrap",
              border: 0 }}
            onClick={() => disconnect()}>Log out</button>
          </div>
        )
      )}
    </div>
  );
};

export default Button;