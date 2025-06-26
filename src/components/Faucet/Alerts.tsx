import React from 'react'
import { AlertTitle, AlertText } from '@site/src/components/Alert'

export const AlertCommonIssue = () => (
  <div>
    <AlertTitle>Issue starting transaction</AlertTitle>
    <AlertText>
      <span>
        There was an issue starting your transaction. Try again in a few minutes. If the problem
        persists please{' '}
        <a
          data-testid="alert-common-contact-us"
          target="_blank"
          href="https://support.metamask.io/">
          contact support
        </a>
        .
      </span>
    </AlertText>
  </div>
)

export const AlertFailedPoh = () => (
  <div>
    <AlertTitle>Please complete Linea Proof of Humanity</AlertTitle>
    <AlertText>
      <span>
        Free users are required to complete Proof of Humanity to access the faucet. Learn more{' '}
        <a
          data-testid="alert-poh"
          target="_blank"
          href="https://poh.linea.build/">
          here
        </a>
        .
      </span>
    </AlertText>
  </div>
)

export const AlertPastActivity = () => (
  <div>
    <AlertTitle>No past activity</AlertTitle>
    <AlertText>
      The address provided does not have sufficient historical activity or balance on the Ethereum
      Mainnet. Please use a different address to proceed. Read the FAQ below for more information.
    </AlertText>
  </div>
)

export const AlertBalanceTooLow = () => (
  <div>
    <AlertTitle>Balance too low</AlertTitle>
    <AlertText>
      <span>
        Your current Ethereum address does not contain enough ETH on Ethereum Mainnet. You can add
        funds to your address using{' '}
        <a
          data-testid="alert-balance-add-funds"
          className="underline"
          href="https://metamask.io/buy-crypto/">
          MetaMask
        </a>
        .
      </span>
    </AlertText>
  </div>
)

export const AlertCooldown = () => (
  <div>
    <AlertTitle>Cooldown period</AlertTitle>
    <AlertText>
      <span>
        You already got ETH from the faucet today. Try again in 24 hours.{' '}
        <a
          data-testid="alert-cooldown-contact-us"
          target="_blank"
          href="https://support.metamask.io/">
          Contact us
        </a>
        .
      </span>
    </AlertText>
  </div>
)

export const AlertSuccess = ({ url }: { url: string }) => (
  <div>
    <AlertTitle>Transaction successful!</AlertTitle>
    <AlertText>
      <span>
        Your transaction has been sent to the Ethereum/Sepolia network. You will receive your ETH
        shortly.{' '}
        <a
          data-testid="alert-success-etherscan"
          target="_blank"
          href={url}>
          View on Etherscan
        </a>
        .
      </span>
    </AlertText>
  </div>
)
