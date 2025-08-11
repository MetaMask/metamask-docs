import Head from "@docusaurus/Head";

export default function SEO(props) {
  // eslint-disable-next-line react/prop-types
  const { title, description, image, slug, keywords } = props;

  return (
    <Head>
      {title ? <title>{title} | Web3Auth </title> : <title>Documentation | Web3Auth</title>}
      {description ? (
        <meta name="description" content={description} />
      ) : (
        <meta
          name="description"
          content="Web3Auth is simple, non-custodial auth infrastructure that enables Web3 wallets and applications to provide seamless user logins for both mainstream and native Web3 users."
        />
      )}

      {/* Add keywords to meta from an array of keywords */}
      {keywords ? (
        keywords.length > 0 && (
          <meta name="keywords" content={`web3auth, blockchain, solana, ethereum, multi party computation, ${keywords.join(", ")}`} />
        )
      ) : (
        <meta
          name="keywords"
          content="web3auth, blockchain, web3, web3.js, ethers.js, solana, ethereum, passwordless, passwordless magic link, multi party computation, tkey, torus, web3 auth, auth"
        />
      )}

      {/* Open Graph Meta Tags  */}
      <meta property="og:site_name" content="Web3Auth" />
      <meta property="og:type" content="website" />
      {title ? <meta property="og:title" content={title} /> : <meta property="og:title" content="Documentation | Web3Auth" />}
      {description ? (
        <meta property="og:description" content={description} />
      ) : (
        <meta
          property="og:description"
          content="Web3Auth is simple, non-custodial auth infrastructure that enables Web3 wallets and applications to provide seamless user logins for both mainstream and native Web3 users."
        />
      )}
      {slug ? <meta property="og:url" content={`https://web3auth.io/docs${slug}`} /> : <meta property="og:url" content="https://web3auth.io/docs" />}

      {image ? (
        <meta property="og:image" content={image} />
      ) : (
        <meta property="og:image" content="http://web3auth.io/docs/images/docs-meta-cards/documentation-card.png" />
      )}

      {/* Twitter Meta Tags */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Web3Auth" />
      <meta name="twitter:creator" content="@Web3Auth" />
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
        <meta name="twitter:image" content="http://web3auth.io/docs/images/docs-meta-cards/documentation-card.png" />
      )}

      {/* Google / Search Engine Tags */}
      {title ? <meta itemProp="name" content={title} /> : <meta itemProp="name" content="Documentation | Web3Auth" />}
      {description ? (
        <meta itemProp="description" content={description} />
      ) : (
        <meta
          itemProp="description"
          content="Web3Auth is simple, non-custodial auth infrastructure that enables Web3 wallets and applications to provide seamless user logins for both mainstream and native Web3 users."
        />
      )}
      {image ? (
        <meta itemProp="image" content={image} />
      ) : (
        <meta itemProp="image" content="http://web3auth.io/docs/images/docs-meta-cards/documentation-card.png" />
      )}

      <meta name="author" content="Web3Auth" />
    </Head>
  );
}
