import React, { useState, useEffect } from "react";
import { Connector, useAccount, useConnect, useDisconnect } from "wagmi";
import { Env, STORAGE_URL } from "@metamask/profile-sync-controller";
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
      const { accessToken, userProfile, identifier } = await authenticateAndAuthorize();
      console.log({ userProfile, identifier });
      const res = await fetch(STORAGE_URL(Env.DEV, "account", "user"), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(await res.json());
    };
    if (isConnected) {
      initAuth();
    }
  }, [connector]);

  return (
    <>
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
    </>
  );
};

export default Button;