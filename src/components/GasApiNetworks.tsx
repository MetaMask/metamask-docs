import React, { useEffect, useState } from 'react';

interface NetworkData {
  [chainId: string]: string;
}

const GasApiNetworks = () => {
  const [networks, setNetworks] = useState<NetworkData>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://gas.api.cx.metamask.io/v1/supportedChainNames');
        const data: NetworkData = await response.json();
        setNetworks(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Convert the networks object into an array of [chainId, networkName] pairs
  const networksArray = Object.entries(networks);

  return (
    <table>
      <thead>
        <tr>
          <th>Network</th>
          <th>Chain ID</th>
        </tr>
      </thead>
      <tbody>
        {networksArray.map(([chainId, networkName]) => (
          <tr key={chainId}>
            <td>{networkName}</td>
            <td>{chainId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GasApiNetworks;