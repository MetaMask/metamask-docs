import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "@site/src/components/PregenerateWallet/styles.module.css";

export default function LookupSCWAPIPage() {
  const networkOptions = ["sapphire_mainnet", "sapphire_devnet"];
  const smartAccountTypeOptions = ["metamask"];
  const entryPointVersionOptions = ["0.7"];
  const constructURL = () => {
    const baseUrl = "https://lookup.web3auth.io/lookup/scw";
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== ""),
    );
    const queryParams = new URLSearchParams(filteredFormData);

    const readableParams: React.ReactNode[] = [];
    queryParams.forEach((value, key) => {
      readableParams.push(
        <span key={key}>
          <span className={styles.parameterKey}>{key}</span>=
          <span className={styles.parameterValue}>{value}</span>&
        </span>,
      );
    });

    return (
      <div className={styles.urlDisplay}>
        <span className={styles.getMethod}>GET</span> {baseUrl}?{readableParams}
      </div>
    );
  };

  const [formData, setFormData] = useState({
    verifier: "w3a-google-demo",
    verifierId: "devrel@web3auth.io",
    web3AuthNetwork: "sapphire_mainnet",
    clientId:
      "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ",
    chainId: "0x1",
    smartAccountType: "metamask",
    smartAccountVersion: "",
    nonceKey: "",
    saltNonce: "",
    factoryAddress: "",
    entryPointVersion: "0.7",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);
    setError("");

    try {
      const filteredFormData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== ""),
      );
      const res = await axios.get(`https://lookup.web3auth.io/lookup/scw`, {
        params: filteredFormData,
      });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const filteredFormData = Object.fromEntries(
          Object.entries(formData).filter(([_, value]) => value !== ""),
        );
        const res = await axios.get(`https://lookup.web3auth.io/lookup/scw`, {
          params: filteredFormData,
        });
        setResponse(JSON.stringify(res.data, null, 2));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <>
      <h3>HTTP Request</h3>
      {constructURL()}

      <form onSubmit={handleSubmit}>
        <table className={styles.formTable}>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Description</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>verifier</code>
              </td>
              <td>
                The verifier name can be found on your Web3Auth dashboard. To learn more about
                verifiers, click{" "}
                <a href="/docs/authentication" target="_blank" rel="noopener noreferrer">
                  here
                </a>
                .
              </td>
              <td>
                <input
                  type="text"
                  name="verifier"
                  value={formData.verifier}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <code>verifierId</code>
              </td>
              <td>
                The verifier ID value. One of the ways to get it is via the response to the{" "}
                <code>getUserInfo()</code> method.
              </td>
              <td>
                <input
                  type="text"
                  name="verifierId"
                  value={formData.verifierId}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <code>web3AuthNetwork</code>
              </td>
              <td>Name of the Web3Auth Network your project is deployed on.</td>
              <td>
                <select
                  name="web3AuthNetwork"
                  value={formData.web3AuthNetwork}
                  onChange={handleChange}
                  required
                >
                  {networkOptions.map((network) => (
                    <option key={network} value={network}>
                      {network}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <code>clientId</code>
              </td>
              <td>
                The client ID for your project. This can also be found on the Web3Auth dashboard.
              </td>
              <td>
                <input
                  type="text"
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <code>chainId</code>
              </td>
              <td>
                Chain Id for the chain you want to pre-generate Smart account. The `chainId` should
                be hex value.
              </td>
              <td>
                <input
                  type="text"
                  name="chainId"
                  value={formData.chainId}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <code>smartAccountType</code>
              </td>
              <td>The Smart Account provider you want to use.</td>
              <td>
                <select
                  name="smartAccountType"
                  value={formData.smartAccountType}
                  onChange={handleChange}
                  required
                >
                  {smartAccountTypeOptions.map((smartAccountType) => (
                    <option key={smartAccountType} value={smartAccountType}>
                      {smartAccountType}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <code>entryPointVersion</code>
              </td>
              <td>
                The entry point version for the Smart Account. Please note, some SCW currently only
                work with specific entry point version (biconomy - 0.6, nexus - 0.7, trust - 0.6) so
                setting entryPointVersion for those SCW will have no effect.
              </td>
              <td>
                <select
                  name="entryPointVersion"
                  value={formData.entryPointVersion}
                  onChange={handleChange}
                >
                  {entryPointVersionOptions.map((entryPointVersion) => (
                    <option key={entryPointVersion} value={entryPointVersion}>
                      {entryPointVersion}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <code>smartAccountVersion?</code>
              </td>
              <td>
                Smart Account version for the Smart Account Provider contract. This parameter is
                optional.
              </td>
              <td>
                <input
                  type="text"
                  name="smartAccountVersion"
                  value={formData.smartAccountVersion}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <code>saltNonce?</code>
              </td>
              <td>
                Salt nonce for the Smart Account to add randomness or predictability when the
                address is generated. This parameter is optional.
              </td>
              <td>
                <input
                  type="text"
                  name="saltNonce"
                  value={formData.saltNonce}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <code>factoryAddress?</code>
              </td>
              <td>
                Specifies the address of the Factory Contract. While providers typically deploy the
                factory contract on popular chains, you have the option to deploy your own factory
                contract on any chain and pass its address. This parameter is optional.
              </td>
              <td>
                <input
                  type="text"
                  name="factoryAddress"
                  value={formData.factoryAddress}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.instructionTextContainer}>
          <p>Edit parameters and click submit to see the response in the terminal.</p>
        </div>
        <div className={styles.submitButtonContainer}>
          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? <div className={styles.loader}></div> : "Submit"}
          </button>
        </div>
      </form>

      <h3>Response</h3>
      <div className={styles.responseTerminal}>
        {isLoading && <p>Request sent...</p>}
        {response && <pre>{response}</pre>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </>
  );
}
