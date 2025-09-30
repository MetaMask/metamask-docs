/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'

import { web, mobile, gaming, enterprise } from './SDKOptions'
import { webIcons, mobileIcons, gamingIcons } from './icons'
import styles from './styles.module.css'

const chevron = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 3.33301L10.6667 7.99967L6 12.6663"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const pnpweb = (
  <div className={styles.card}>
    <div className={styles.cardContainerIntro}>
      <h3>Embedded Wallets Web SDK</h3>
      <p>
        Integrate MetaMask Embedded Wallets (Web3Auth) with just 4 lines of code. <br />
        <br />
        Designed to provide seamless and straightforward integration for web applications across all
        major browsers and javascript frameworks.
      </p>
      {webIcons}
    </div>
    <ul className={styles.cardContainer}>
      <div className={styles.cardContent}>
        <div className={styles.sdkIconContainer}>
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={styles.sdkIcon}>
            <path
              d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className={styles.cardContentText}>
          <h3>React SDK</h3>
          <div className={styles.links}>
            <a href={`/quickstart/?product=EMBEDDED_WALLETS&framework=REACT&stepIndex=0`}>
              Quick Start{chevron}
            </a>
            <a href={`/embedded-wallets/sdk/react`}>SDK Reference{chevron}</a>
            <a href={`/embedded-wallets/sdk/react/examples`}>Examples{chevron}</a>
          </div>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.sdkIconContainer}>
          <svg
            fill="none"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.sdkIcon}>
            <polygon
              points="256 144.03 200.51 47.92 121.08 47.92 256 281.61 390.92 47.92 311.49 47.92 256 144.03"
              fill="currentColor"
            />
            <polygon
              points="409.4 47.92 256 313.61 102.6 47.92 15.74 47.92 256 464.08 496.26 47.92 409.4 47.92"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className={styles.cardContentText}>
          <h3>Vue SDK</h3>
          <div className={styles.links}>
            <a href={`/quickstart/?product=EMBEDDED_WALLETS&framework=VUE&stepIndex=0`}>
              Quick Start{chevron}
            </a>
            <a href={`/embedded-wallets/sdk/vue`}>SDK Reference{chevron}</a>
            <a href={`/embedded-wallets/sdk/vue/examples`}>Examples{chevron}</a>
          </div>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.sdkIconContainer}>
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className={styles.sdkIcon}>
            <path
              d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM243.8 381.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className={styles.cardContentText}>
          <h3>Javascript SDK</h3>
          <div className={styles.links}>
            <a href={`/quickstart/?product=EMBEDDED_WALLETS&framework=ANGULAR&stepIndex=0`}>
              Quick Start{chevron}
            </a>
            <a href={`/embedded-wallets/sdk/js`}>SDK Reference{chevron}</a>
            <a href={`/embedded-wallets/sdk/js/examples`}>Examples{chevron}</a>
          </div>
        </div>
      </div>
    </ul>
  </div>
)

export const pnpmobile = (
  <div className={styles.card}>
    <div className={styles.cardContainerIntro}>
      <h3>Embedded Wallets Mobile SDKs</h3>
      <p>
        Integrate MetaMask Embedded Wallets (Web3Auth) with just 4 lines of code. <br />
        <br />
        Designed for mobile developers, these SDKs ensure a secure wallet integration experience
        across various mobile platforms, enhancing user engagement and security.
      </p>
      {mobileIcons}
    </div>
    <ul className={styles.cardContainer}>
      <div className={styles.cardContent}>
        <div className={styles.sdkIconContainer}>
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className={styles.sdkIcon}>
            <path
              d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className={styles.cardContentText}>
          <h3>Android SDK</h3>
          <div className={styles.links}>
            <a href={`/quickstart/?product=EMBEDDED_WALLETS&framework=ANDROID&stepIndex=0`}>
              Quick Start{chevron}
            </a>
            <a href={`/embedded-wallets/sdk/android`}>SDK Reference{chevron}</a>
            <a href={`/embedded-wallets/sdk/android/examples`}>Examples{chevron}</a>
          </div>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.sdkIconContainer}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.sdkIcon}>
            <path
              d="M20.4933 17.5861C20.1908 18.2848 19.8328 18.928 19.418 19.5193C18.8526 20.3255 18.3897 20.8835 18.0329 21.1934C17.4798 21.702 16.8872 21.9625 16.2527 21.9773C15.7972 21.9773 15.2478 21.8477 14.6083 21.5847C13.9667 21.323 13.3771 21.1934 12.838 21.1934C12.2726 21.1934 11.6662 21.323 11.0176 21.5847C10.3679 21.8477 9.84463 21.9847 9.44452 21.9983C8.83602 22.0242 8.22949 21.7563 7.62408 21.1934C7.23767 20.8563 6.75436 20.2786 6.17536 19.4601C5.55415 18.586 5.04342 17.5725 4.64331 16.417C4.21481 15.1689 4 13.9603 4 12.7902C4 11.4498 4.28962 10.2938 4.86973 9.32509C5.32564 8.54696 5.93216 7.93316 6.69127 7.48255C7.45038 7.03195 8.2706 6.80233 9.15391 6.78763C9.63723 6.78763 10.271 6.93714 11.0587 7.23096C11.8441 7.52576 12.3484 7.67526 12.5695 7.67526C12.7348 7.67526 13.295 7.50045 14.2447 7.15195C15.1429 6.82874 15.9009 6.69492 16.5218 6.74764C18.2045 6.88343 19.4686 7.54675 20.3094 8.74177C18.8045 9.6536 18.06 10.9307 18.0749 12.5691C18.0884 13.8452 18.5514 14.9071 19.4612 15.7503C19.8736 16.1417 20.334 16.4441 20.8464 16.6589C20.7353 16.9812 20.618 17.2898 20.4933 17.5861ZM16.6342 2.40011C16.6342 3.40034 16.2687 4.33425 15.5404 5.19867C14.6614 6.22629 13.5982 6.8201 12.4453 6.7264C12.4306 6.60641 12.4221 6.48011 12.4221 6.3474C12.4221 5.38718 12.8401 4.35956 13.5824 3.51934C13.953 3.09392 14.4244 2.74019 14.9959 2.45801C15.5663 2.18005 16.1058 2.02632 16.6132 2C16.628 2.13371 16.6342 2.26744 16.6342 2.4001V2.40011Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className={styles.cardContentText}>
          <h3>iOS SDK</h3>
          <div className={styles.links}>
            <a href={`/quickstart/?product=EMBEDDED_WALLETS&framework=IOS&stepIndex=0`}>
              Quick Start{chevron}
            </a>
            <a href={`/embedded-wallets/sdk/ios`}>SDK Reference{chevron}</a>
            <a href={`/embedded-wallets/sdk/ios/examples`}>Examples{chevron}</a>
          </div>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.sdkIconContainer}>
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={styles.sdkIcon}>
            <path
              d="M3.5 12.5L6.5 15.5 19 3 13 3zM19 12L13 12 8 17 13 22 19 22 14 17z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className={styles.cardContentText}>
          <h3>Flutter SDK</h3>
          <div className={styles.links}>
            <a href={`/quickstart/?product=EMBEDDED_WALLETS&framework=FLUTTER&stepIndex=0`}>
              Quick Start{chevron}
            </a>
            <a href={`/embedded-wallets/sdk/flutter`}>SDK Reference{chevron}</a>
            <a href={`/embedded-wallets/sdk/flutter/examples`}>Examples{chevron}</a>
          </div>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.sdkIconContainer}>
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={styles.sdkIcon}>
            <path
              d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className={styles.cardContentText}>
          <h3>React Native SDK</h3>
          <div className={styles.links}>
            <a href={`/quickstart/?product=EMBEDDED_WALLETS&framework=REACT_NATIVE&stepIndex=0`}>
              Quick Start{chevron}
            </a>
            <a href={`/embedded-wallets/sdk/react-native`}>SDK Reference{chevron}</a>
            <a href={`/embedded-wallets/sdk/react-native/examples`}>Examples{chevron}</a>
          </div>
        </div>
      </div>
    </ul>
  </div>
)

export const pnpgaming = (
  <div className={styles.card}>
    <div className={styles.cardContainerIntro}>
      <div className={styles.cardTitleContainer}>
        <h3>Embedded Wallets Gaming SDKs</h3>
        {/* <div className={styles.pillContainer}>
          <div className={styles.pill}>{pnp} Only</div>
        </div> */}
      </div>

      <p>
        Integrate MetaMask Embedded Wallets (Web3Auth) with just 4 lines of code. <br />
        <br />
        Seamlessly authenticate users into your Web3 games with their socials using Web3Auth Gaming
        SDKs.
      </p>
      {gamingIcons}
    </div>
    <ul className={styles.cardContainer}>
      <div className={styles.cardContent}>
        <div className={styles.sdkIconContainer}>
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className={styles.sdkIcon}>
            <path
              d="M243.583 91.6027L323.695 138.384C326.575 140.026 326.68 144.583 323.695 146.225L228.503 201.854C225.623 203.55 222.22 203.444 219.549 201.854L124.357 146.225C121.425 144.636 121.373 139.973 124.357 138.384L204.417 91.6027V0L0 119.417V358.252L78.3843 312.477V218.914C78.3319 215.576 82.2066 213.192 85.0865 214.993L180.279 270.622C183.159 272.318 184.782 275.338 184.782 278.464V389.669C184.834 393.007 180.959 395.391 178.079 393.589L97.9673 346.808L19.583 392.583L224 512L428.417 392.583L350.033 346.808L269.921 393.589C267.093 395.338 263.114 393.06 263.218 389.669V278.464C263.218 275.126 265.051 272.159 267.721 270.622L362.914 214.993C365.741 213.245 369.72 215.47 369.616 218.914V312.477L448 358.252V119.417L243.583 0V91.6027Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className={styles.cardContentText}>
          <h3>Unity SDK</h3>
          <div className={styles.links}>
            <a href={`/embedded-wallets/sdk/unity`}>SDK Reference{chevron}</a>
            <a href={`/embedded-wallets/sdk/unity/examples`}>Examples{chevron}</a>
          </div>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.sdkIconContainer}>
          <svg
            fill="none"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.sdkIcon}>
            <path
              d="M16 0c-8.766 0-15.865 7.161-15.865 16s7.099 16 15.865 16c8.76 0 15.865-7.161 15.865-16s-7.104-16-15.87-16zM16 0.703c4.047 0 7.859 1.594 10.724 4.479 2.859 2.875 4.453 6.766 4.443 10.818 0 4.083-1.578 7.927-4.443 10.818-2.828 2.87-6.693 4.484-10.724 4.479-4.031 0.005-7.896-1.609-10.724-4.479-2.859-2.875-4.458-6.766-4.448-10.818 0-4.083 1.583-7.927 4.443-10.818 2.828-2.875 6.698-4.49 10.729-4.479zM15.203 6.333c-2.583 0.693-4.974 2.021-8.161 5.677s-2.583 6.677-2.583 6.677c0 0 0.88-2.078 2.995-4.266 1.005-1.036 1.75-1.385 2.266-1.385 0.458-0.026 0.844 0.344 0.844 0.802v7.422c0 0.734-0.474 0.896-0.911 0.885-0.37-0.005-0.714-0.135-0.714-0.135 2.172 3.156 7.37 3.599 7.37 3.599l2.281-2.438 0.052 0.047 2.089 1.781c3.823-2.271 5.667-6.479 5.667-6.479-1.708 1.802-2.792 2.224-3.438 2.224-0.573-0.005-0.797-0.339-0.797-0.339-0.031-0.156-0.083-2.417-0.104-4.677-0.021-2.339 0-4.682 0.115-4.688 0.661-1.24 2.766-3.74 2.766-3.74-3.932 0.776-6.073 3.354-6.073 3.354-0.635-0.5-1.927-0.417-1.927-0.417 0.604 0.333 1.208 1.302 1.208 2.104v7.896c0 0-1.318 1.161-2.333 1.161-0.604 0-0.974-0.328-1.177-0.599-0.078-0.104-0.146-0.219-0.198-0.344v-9.75c-0.141 0.104-0.313 0.161-0.484 0.167-0.219 0-0.443-0.109-0.594-0.427-0.115-0.24-0.188-0.599-0.188-1.125 0-1.797 2.031-2.99 2.031-2.99z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className={styles.cardContentText}>
          <div className={styles.cardTitleContainer}>
            <h3>Unreal SDK</h3>
          </div>
          <div className={styles.links}>
            <a href={`/embedded-wallets/sdk/unreal`}>SDK Reference{chevron}</a>
            <a href={`/embedded-wallets/sdk/unreal/examples`}>Examples{chevron}</a>
          </div>
        </div>
      </div>
    </ul>
  </div>
)

// export const mpccorekit = (
//   <div className={styles.card}>
//     <div className={styles.cardContainerIntro}>
//       <h3>MPC Core Kit SDKs</h3>
//       <p>
//         Designed for projects that require a tailored approach to authentication, providing the
//         tools and flexibility necessary to build advanced, secure, and integrated authentication
//         systems. <br />
//         <br />
//         Works for Web, React Native & NodeJS environments.
//       </p>
//       {webIcons}
//     </div>
//     <ul className={styles.cardContainer}>
//       <div className={styles.cardContent}>
//         <div className={styles.sdkIconContainer}>
//           <svg
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             className={styles.sdkIcon}
//           >
//             <path
//               fillRule="evenodd"
//               clipRule="evenodd"
//               d="M4.083 9H6.029C6.118 7.454 6.412 6.03 6.866 4.882C6.13501 5.32992 5.50842 5.92919 5.02838 6.6395C4.54834 7.34982 4.22598 8.1547 4.083 9ZM10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2ZM10 4C9.924 4 9.768 4.032 9.535 4.262C9.297 4.496 9.038 4.885 8.798 5.444C8.409 6.351 8.125 7.586 8.032 9H11.968C11.875 7.586 11.591 6.351 11.202 5.444C10.962 4.884 10.702 4.496 10.465 4.262C10.232 4.032 10.076 4 10 4ZM13.971 9C13.882 7.454 13.588 6.03 13.134 4.882C13.865 5.32992 14.4916 5.92919 14.9716 6.6395C15.4517 7.34982 15.774 8.1547 15.917 9H13.971ZM11.968 11H8.032C8.125 12.414 8.409 13.649 8.798 14.556C9.038 15.116 9.298 15.504 9.535 15.738C9.768 15.968 9.924 16 10 16C10.076 16 10.232 15.968 10.465 15.738C10.703 15.504 10.963 15.115 11.202 14.556C11.591 13.649 11.875 12.414 11.968 11ZM13.134 15.118C13.588 13.971 13.882 12.546 13.971 11H15.917C15.774 11.8453 15.4517 12.6502 14.9716 13.3605C14.4916 14.0708 13.865 14.6701 13.134 15.118ZM6.866 15.118C6.412 13.97 6.118 12.546 6.03 11H4.083C4.22598 11.8453 4.54834 12.6502 5.02838 13.3605C5.50842 14.0708 6.13501 14.6701 6.866 15.118Z"
//               fill="currentColor"
//             />
//           </svg>
//         </div>
//         <div className={styles.cardContentText}>
//           <h3>MPC Core Kit JS SDK</h3>
//           <div className={styles.links}>
//             <a href={`/sdk/mpc-core-kit/mpc-core-kit-js`}>SDK Reference{chevron}</a>
//             <a href={`/sdk/mpc-core-kit/mpc-core-kit-js/examples`}>Examples{chevron}</a>
//           </div>
//         </div>
//       </div>
//       <div className={styles.cardContent}>
//         <div className={styles.sdkIconContainer}>
//           <svg
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             className={styles.sdkIcon}
//           >
//             <path
//               fillRule="evenodd"
//               clipRule="evenodd"
//               d="M4.083 9H6.029C6.118 7.454 6.412 6.03 6.866 4.882C6.13501 5.32992 5.50842 5.92919 5.02838 6.6395C4.54834 7.34982 4.22598 8.1547 4.083 9ZM10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2ZM10 4C9.924 4 9.768 4.032 9.535 4.262C9.297 4.496 9.038 4.885 8.798 5.444C8.409 6.351 8.125 7.586 8.032 9H11.968C11.875 7.586 11.591 6.351 11.202 5.444C10.962 4.884 10.702 4.496 10.465 4.262C10.232 4.032 10.076 4 10 4ZM13.971 9C13.882 7.454 13.588 6.03 13.134 4.882C13.865 5.32992 14.4916 5.92919 14.9716 6.6395C15.4517 7.34982 15.774 8.1547 15.917 9H13.971ZM11.968 11H8.032C8.125 12.414 8.409 13.649 8.798 14.556C9.038 15.116 9.298 15.504 9.535 15.738C9.768 15.968 9.924 16 10 16C10.076 16 10.232 15.968 10.465 15.738C10.703 15.504 10.963 15.115 11.202 14.556C11.591 13.649 11.875 12.414 11.968 11ZM13.134 15.118C13.588 13.971 13.882 12.546 13.971 11H15.917C15.774 11.8453 15.4517 12.6502 14.9716 13.3605C14.4916 14.0708 13.865 14.6701 13.134 15.118ZM6.866 15.118C6.412 13.97 6.118 12.546 6.03 11H4.083C4.22598 11.8453 4.54834 12.6502 5.02838 13.3605C5.50842 14.0708 6.13501 14.6701 6.866 15.118Z"
//               fill="currentColor"
//             />
//           </svg>
//         </div>
//         <div className={styles.cardContentText}>
//           <h3>MPC Core Kit React Native SDK</h3>
//           <div className={styles.links}>
//             <a href={`/sdk/mpc-core-kit/mpc-core-kit-react-native`}>
//               SDK Reference{chevron}
//             </a>
//             <a href={`/sdk/mpc-core-kit/mpc-core-kit-react-native/examples`}>
//               Examples{chevron}
//             </a>
//           </div>
//         </div>
//       </div>
//     </ul>
//   </div>
// );

export default function QuickNavigation() {
  const [platform, setPlatform] = useState<string>(web)

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div className={styles.tabContainer}>
          <div
            className={platform === web ? styles.selectedTab : styles.tab}
            onClick={() => setPlatform(web)}>
            {web}
          </div>
          <div
            className={platform === mobile ? styles.selectedTab : styles.tab}
            onClick={() => setPlatform(mobile)}>
            {mobile}
          </div>
          <div
            className={platform === gaming ? styles.selectedTab : styles.tab}
            onClick={() => setPlatform(gaming)}>
            {gaming}
          </div>
          {/* <div
            className={platform === enterprise ? styles.selectedTab : styles.tab}
            onClick={() => setPlatform(enterprise)}
          >
            {enterprise}
          </div> */}
        </div>
      </div>
      {platform === web && pnpweb}
      {platform === mobile && pnpmobile}
      {platform === gaming && pnpgaming}
      {/* {platform === enterprise && mpccorekit} */}
    </div>
  )
}
