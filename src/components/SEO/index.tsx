import Head from '@docusaurus/Head'

export default function SEO(props) {
  // eslint-disable-next-line react/prop-types
  const { title, description, image, slug, keywords } = props

  return (
    <Head>
      {title ? <title>{title} | MetaMask </title> : <title>Documentation | MetaMask</title>}
      {description ? (
        <meta name="description" content={description} />
      ) : (
        <meta
          name="description"
          content="MetaMask is the leading self-custodial wallet. Build with the world's leading self-custodial crypto wallet through MetaMask developer documentation."
        />
      )}

      {/* Add keywords to meta from an array of keywords */}
      {keywords ? (
        keywords.length > 0 && (
          <meta
            name="keywords"
            content={`metamask, wallet, blockchain, solana, ethereum, crypto, sdk, ${keywords.join(', ')}`}
          />
        )
      ) : (
        <meta
          name="keywords"
          content="metamask, wallet, blockchain, web3, web3.js, ethers.js, solana, ethereum, crypto, sdk, snaps, dapp"
        />
      )}

      {/* Open Graph Meta Tags  */}
      <meta property="og:site_name" content="MetaMask" />
      <meta property="og:type" content="website" />
      {title ? (
        <meta property="og:title" content={title} />
      ) : (
        <meta property="og:title" content="Documentation | MetaMask" />
      )}
      {description ? (
        <meta property="og:description" content={description} />
      ) : (
        <meta
          property="og:description"
          content="MetaMask is the leading self-custodial wallet. Build with the world's leading self-custodial crypto wallet through MetaMask developer documentation."
        />
      )}
      {slug ? (
        <meta property="og:url" content={`https://docs.metamask.io${slug}`} />
      ) : (
        <meta property="og:url" content="https://docs.metamask.io" />
      )}

      {image ? (
        <meta property="og:image" content={image} />
      ) : (
        <meta
          property="og:image"
          content="https://docs.metamask.io/img/metamaskog.jpg"
        />
      )}

      {/* Twitter Meta Tags */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@MetaMask" />
      <meta name="twitter:creator" content="@MetaMask" />
      {/* {title ? <meta name="twitter:title" content={title} /> : <meta name="twitter:title" content="Documentation | Web3Auth" />}
      {description ? (
        <meta name="twitter:description" content={description} />
      ) : (
        <meta
          name="twitter:description"
          content="Web3Auth is simple, non-custodial auth infrastructure that enables Web3 wallets and applications to provide seamless user logins for both mainstream and native Web3 users."
        />
      )} */}
      {image ? (
        <meta name="twitter:image" content={image} />
      ) : (
        <meta
          name="twitter:image"
          content="https://docs.metamask.io/img/metamaskog.jpg"
        />
      )}

      {/* Google / Search Engine Tags */}
      {title ? (
        <meta itemProp="name" content={title} />
      ) : (
        <meta itemProp="name" content="Documentation | MetaMask" />
      )}
      {description ? (
        <meta itemProp="description" content={description} />
      ) : (
        <meta
          itemProp="description"
          content="MetaMask is the leading self-custodial wallet. Build with the world's leading self-custodial crypto wallet through MetaMask developer documentation."
        />
      )}
      {image ? (
        <meta itemProp="image" content={image} />
      ) : (
        <meta
          itemProp="image"
          content="https://docs.metamask.io/img/metamaskog.jpg"
        />
      )}

      <meta name="author" content="MetaMask" />
    </Head>
  )
}
