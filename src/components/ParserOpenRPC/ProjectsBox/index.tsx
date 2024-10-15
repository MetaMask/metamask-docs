import React, { useContext, useEffect, useState } from "react";
import ldClient from "launchdarkly";
import { MetamaskProviderContext } from "@site/src/theme/Root";
import Select from "react-dropdown-select";
import Button from "@site/src/components/Button";
import styles from "./styles.module.scss";
import { WALLET_LINK_TYPE } from "@site/src/components/AuthLogin/AuthModal";

const LOGIN_FF = "mm-unified-login";

const ProjectsBox = () => {
  const {
    projects,
    metaMaskAccount,
    walletLinked,
    metaMaskWalletIdConnectHandler,
    walletLinkUrl,
    setUserAPIKey,
  } = useContext(MetamaskProviderContext);
  const options = Object.keys(projects).map((v) => ({
    value: v,
    label: projects[v].name,
  }));
  const [currentProject, setCurrentProject] = useState(
    [options[0]].filter(Boolean)
  );
  const [ldReady, setLdReady] = useState(false);
  const [loginEnabled, setLoginEnabled] = useState(false);
  const [isWalletLinking, setIsWalletLinking] = useState(false);

  const metaMaskWalletConnectionHandler = () => {
    setIsWalletLinking(true);
    metaMaskWalletIdConnectHandler();
  }

  useEffect(() => {
    ldClient.waitUntilReady().then(() => {
      setLoginEnabled(ldClient.variation(LOGIN_FF, false));
      setLdReady(true);
    });
    const handleChange = (current) => {
      setLoginEnabled(current);
    };
    ldClient.on(`change:${LOGIN_FF}`, handleChange);
    return () => {
      ldClient.off(`change:${LOGIN_FF}`, handleChange);
    };
  }, []);

  useEffect(() => {
    if (!currentProject.length && options[0]) {
      setCurrentProject([options[0]]);
      setUserAPIKey(options[0].value);
    }
  }, [projects]);

  useEffect(() => {
    if (options?.length > 0) {
      setUserAPIKey(options[0].value);
    }
  }, [options.length]);

  useEffect(() => {
    if (walletLinked) {
      setIsWalletLinking(false);
    }
  }, [walletLinked])

  return (
    ldReady &&
    loginEnabled && (
      <div className={styles.selectWrapper}>
        <div className={styles.selectTitle}>Infura API Key</div>
        {metaMaskAccount && !!Object.keys(projects).length ? (
          <Select
            className={styles.selectProjects}
            multi={false}
            placeholder="Key name"
            searchable={false}
            options={options}
            values={currentProject}
            onChange={(value) => {
              setCurrentProject(value);
              setUserAPIKey(value[0].value);
            }}
            contentRenderer={({ state }) => {
              return (
                <div>
                  {state.values.map((item) => (
                    <div key={item.value}>
                      <div className={styles.selectDropdownLabel}>{item.label}</div>
                      <div className={styles.selectDropdownValue}>{item.value}</div>
                    </div>
                  ))}
                </div>
              );
            }}
            dropdownRenderer={({ methods }) => {
              return (
                <div className={styles.selectDropdown}>
                  {options.map((option) => (
                    <div
                      className={styles.selectDropdownOption}
                      key={option.value}
                      onClick={() => methods.addItem(option)}
                    >
                      <div className={styles.selectDropdownLabel}>{option.label}</div>
                      <div className={styles.selectDropdownValue}>{option.value}</div>
                    </div>
                  ))}
                </div>
              );
            }}
          />
        ) : (
          <div className={styles.selectProjects}>
            {walletLinked === undefined && (
              <>
                <div>
                  {isWalletLinking ?
                    "Don’t close or exit this page. Please continue connecting on your extension." :
                    "Connect your MetaMask wallet to start sending requests to your Infura API keys."
                  }
                </div>
                <Button
                  thin
                  className={styles.connectButton}
                  onClick={metaMaskWalletConnectionHandler}
                  isLoading={isWalletLinking}
                >
                  Connect MetaMask
                </Button>
              </>
            )}
            {walletLinked === WALLET_LINK_TYPE.NO && (
              <>
                <div>
                  Link your Infura account to send requests to your Infura API
                  keys.
                </div>
                <Button
                  thin
                  variant="secondary"
                  wrapText={false}
                  onClick={() => (window.location.href = walletLinkUrl)}
                >
                  Link Infura Account
                </Button>
              </>
            )}
            {walletLinked === WALLET_LINK_TYPE.MULTIPLE && (
              <>
                <div>
                  Select Infura account linked with your current wallet.
                </div>
                <Button
                  thin
                  className={styles.connectButton}
                  onClick={() => (window.location.href = walletLinkUrl)}
                >
                  Select Infura Account
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    )
  );
};

export default ProjectsBox;
