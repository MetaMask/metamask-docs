import React, { useContext, useEffect, useState } from 'react'
import Layout from '@theme/Layout'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import ldClient from 'launchdarkly'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import {
  Faq,
  AlertCommonIssue,
  AlertCooldown,
  AlertSuccess,
  TransactionTable,
  Hero,
  AlertPastActivity,
  AlertFailedPoh,
} from '@site/src/components/Faucet'
import { useAlert } from 'react-alert'
import { MetamaskProviderContext } from '@site/src/theme/Root'
import styles from './faucet.module.scss'
import { REQUEST_PARAMS } from '@site/src/lib/constants'
import { AlertBalanceTooLow } from '@site/src/components/Faucet/Alerts'

const lineaMaintenanceFlag = 'linea-maintenance-mode'
const sepoliaMaintenanceFlag = 'sepolia-maintenance-mode'
const faucetBypassDomainFlag = 'faucet-bypass-domains'
const DEFAULT_TRANSACTIONS_LIST = { linea: [], sepolia: [] }

export const SEPOLIA_URL = 'https://sepolia.etherscan.io/tx/'
export const LINEA_URL = 'https://sepolia.lineascan.build/tx/'

export default function Faucet() {
  const { siteConfig } = useDocusaurusContext()
  const { userId, token, uksTier, metaMaskAccount, metaMaskAccountEns } =
    useContext(MetamaskProviderContext)
  const alert = useAlert()
  const [transactions, setTransactions] = useState(DEFAULT_TRANSACTIONS_LIST)
  const [isLoading, setIsLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [ldReady, setLdReady] = useState(false)
  const [isLineaMaintenance, setIsLineaMaintenance] = useState(false)
  const [isSepoliaMaintenance, setIsSepoliaMaintenance] = useState(false)
  const [faucetBypassDomain, setFaucetBypassDomain] = useState(false)
  const { DASHBOARD_URL } = siteConfig?.customFields || {}

  const isLimitedUserPlan = uksTier === 'core' && !faucetBypassDomain

  const setTransactionsForNetwork = (network: 'linea' | 'sepolia', data) => {
    setTransactions(transactions => ({ ...transactions, [network]: data }))
  }

  const mutateTransactionsForNetwork = (network: 'linea' | 'sepolia', data) => {
    setTransactions(transactions => ({
      ...transactions,
      [network]: [data, ...transactions[network]],
    }))
  }

  const getTransactions = async () => {
    const sepolia = await fetch(`${DASHBOARD_URL}/api/faucets/sepolia/transactions`, {
      ...REQUEST_PARAMS('GET', { Authorization: `Bearer ${token}` }),
    })
    const { data: sepoliaData } = await sepolia.json()
    setTransactionsForNetwork('sepolia', sepoliaData)

    const linea = await fetch(`${DASHBOARD_URL}/api/faucets/linea/transactions`, {
      ...REQUEST_PARAMS('GET', { Authorization: `Bearer ${token}` }),
    })
    const { data: lineaData } = await linea.json()
    setTransactionsForNetwork('linea', lineaData)
  }

  const handleRequest = (network: 'linea' | 'sepolia') => async () => {
    setIsLoading(true)
    const address = walletAddress.trim()
    try {
      const faucetRawResponse = await fetch(
        `${DASHBOARD_URL}/api/faucets/${network}?address=${address}`,
        {
          ...REQUEST_PARAMS('POST', { Authorization: `Bearer ${token}` }),
          body: JSON.stringify({ dstAddress: address }),
        }
      )

      const faucetResponse = await faucetRawResponse.json()
      const error = faucetResponse.error

      if (error) {
        if (error.code === 'failed_poh') {
          alert.error(<AlertFailedPoh />)
        } else if (error.code === 'balance_too_low') {
          alert.error(<AlertBalanceTooLow />)
        } else if (error.code === 'transaction_count_too_low') {
          alert.error(<AlertPastActivity />)
        } else if (error.name === 'COOLDOWN PERIOD') {
          alert.info(<AlertCooldown />)
        } else {
          alert.error(<AlertCommonIssue />)
        }
      } else {
        mutateTransactionsForNetwork(network, faucetResponse)
        alert.success(
          <AlertSuccess
            url={`${network === 'linea' ? LINEA_URL : SEPOLIA_URL}/${faucetResponse.txnHash}`}
          />
        )
      }
    } catch (e) {
      alert.error(<AlertCommonIssue />)
    }
    setWalletAddress('')
    setIsLoading(false)
  }

  const handleOnInputChange = value => {
    setWalletAddress(value)
  }

  useEffect(() => {
    ldClient.waitUntilReady().then(() => {
      setIsLineaMaintenance(ldClient.variation(lineaMaintenanceFlag, false))
      setIsSepoliaMaintenance(ldClient.variation(sepoliaMaintenanceFlag, false))
      setFaucetBypassDomain(ldClient.variation(faucetBypassDomainFlag, false))
      setLdReady(true)
    })
    const handleChangeLinea = current => {
      setIsLineaMaintenance(current)
    }
    const handleChangeSepolia = current => {
      setIsSepoliaMaintenance(current)
    }
    const handleFaucetBypassDomain = current => {
      setFaucetBypassDomain(current)
    }
    ldClient.on(`change:${lineaMaintenanceFlag}`, handleChangeLinea)
    ldClient.on(`change:${sepoliaMaintenanceFlag}`, handleChangeSepolia)
    ldClient.on(`change:${faucetBypassDomainFlag}`, handleFaucetBypassDomain)

    return () => {
      ldClient.off(`change:${lineaMaintenanceFlag}`, handleChangeLinea)
      ldClient.off(`change:${sepoliaMaintenanceFlag}`, handleChangeSepolia)
      ldClient.off(`change:${faucetBypassDomainFlag}`, handleFaucetBypassDomain)
    }
  }, [])

  useEffect(() => {
    if (userId && token) {
      getTransactions()
    } else {
      setTransactions(DEFAULT_TRANSACTIONS_LIST)
    }
  }, [userId, token])

  useEffect(() => {
    if (metaMaskAccountEns) {
      setWalletAddress(metaMaskAccountEns)
    } else if (metaMaskAccount) {
      setWalletAddress(metaMaskAccount)
    }
  }, [metaMaskAccount, metaMaskAccountEns])

  const tabItemContent = (network: 'linea' | 'sepolia', isMaintenance: boolean) => {
    return (
      <>
        <div className={styles.topContent}>
          <Hero
            network={network}
            className={styles.hero}
            handleRequest={handleRequest(network)}
            handleOnInputChange={handleOnInputChange}
            inputValue={walletAddress}
            isLoading={isLoading}
            isLimitedUserPlan={isLimitedUserPlan}
            isMaintenance={isMaintenance}
          />
          {transactions && (
            <TransactionTable
              data={network === 'linea' ? transactions.linea : transactions.sepolia}
              network={network}
              classNameHeading={styles.sectionHeading}
            />
          )}
        </div>
        <div className={styles.bottomContent}>
          <Faq
            network={network}
            className={styles.faq}
            classNameHeading={styles.sectionHeading}
            isLimitedUserPlan={isLimitedUserPlan}></Faq>
        </div>
      </>
    )
  }

  return (
    <Layout title="Faucet" description="Faucet">
      <div className={styles.tabs}>
        <Tabs className={styles.header}>
          <TabItem className={styles.content} value="sepolia" label="Ethereum Sepolia" default>
            {ldReady ? tabItemContent('sepolia', isSepoliaMaintenance) : null}
          </TabItem>
          <TabItem className={styles.content} value="linea" label="Linea Sepolia">
            {ldReady ? tabItemContent('linea', isLineaMaintenance) : null}
          </TabItem>
        </Tabs>
      </div>
    </Layout>
  )
}
