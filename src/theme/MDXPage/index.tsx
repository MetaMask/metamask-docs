import * as React from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'
import Link from '@docusaurus/Link'
import { MDXProvider } from '@mdx-js/react'
import Layout from '@theme/Layout'
import MDXComponents from '@theme/MDXComponents'
import TOC from '@theme/TOC'
import OriginalMDXPage from '@theme-original/MDXPage'
import { ComponentProps, useState } from 'react'
import Bookmark from 'react-bookmark'

import DiscourseComment from '../../components/DiscourseComment'
import styles from './styles.module.css'

export default function MDXPage(props: ComponentProps<typeof OriginalMDXPage>) {
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy')

  const { content: MDXPageContent } = props
  const { frontMatter, metadata } = MDXPageContent
  const { permalink } = metadata

  if (!permalink.includes(`/tutorials/`)) {
    return <OriginalMDXPage {...props} />
  }

  // if (!permalink.includes(`/blog/`)) {
  //   return <OriginalMDXPage {...props} />;
  // }

  const {
    title,
    image,
    description,
    type,
    tags,
    author,
    date,
    wrapperClassName,
    communityPortalTopicId,
  } = frontMatter
  const url = `https://web3auth.io${permalink}`
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?${url}`
  const twitterLink = `http://twitter.com/share?text=Checkout ${title} published by @Web3Auth&url=${url}`

  const handleClick = () => {
    navigator.clipboard.writeText(url)
    setCopyButtonText('Copied!')

    setTimeout(() => {
      setCopyButtonText('Copy')
    }, 500)
  }

  return (
    <Layout title={title} description={description} wrapperClassName={wrapperClassName}>
      <main>
        <div className="container">
          <div className="margin-vert--lg padding-vert--lg">
            <div className="row">
              <div className="col col--8 col--offset-1">
                <div className={styles.titleContainer}>
                  {/* <img className={styles.cover} src={baseUrl + image} alt="Cover" /> */}
                  <div className={styles.titleContainer}>
                    <h1 className={styles.title}>{title}</h1>
                    <div className={styles.topMenu}>
                      <span className={styles.tagsContainer}>
                        {tags &&
                          tags.map(item => {
                            return (
                              <code key={item} className={styles.tag}>
                                {item}
                              </code>
                            )
                          })}
                      </span>
                      <span className={styles.date}>
                        {author} | {date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="markdown">
                  <MDXProvider components={MDXComponents}>
                    <MDXPageContent />
                  </MDXProvider>
                </div>
                <div className={styles.bottomMenu}>
                  <div className={styles.socialButtonContainer}>
                    <Link to={facebookLink}>
                      <button type="button" className={styles.socialButton}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_1_9)">
                            <path
                              d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 11.993 2.92547 15.3027 6.75 15.9028V10.3125H4.71875V8H6.75V6.2375C6.75 4.2325 7.94438 3.125 9.77172 3.125C10.6467 3.125 11.5625 3.28125 11.5625 3.28125V5.25H10.5538C9.56 5.25 9.25 5.86672 9.25 6.5V8H11.4688L11.1141 10.3125H9.25V15.9028C13.0745 15.3027 16 11.993 16 8Z"
                              fill="currentColor"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_9">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Share
                      </button>
                    </Link>
                    <Link to={twitterLink}>
                      <button type="button" className={styles.socialButton}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5.03168 14.5003C11.0694 14.5003 14.3718 9.4981 14.3718 5.16018C14.3718 5.0181 14.3718 4.87666 14.3622 4.73586C15.0047 4.27117 15.5593 3.69579 16 3.03666C15.4009 3.30227 14.7654 3.47637 14.1146 3.55314C14.7999 3.14294 15.3128 2.49767 15.5578 1.73746C14.9134 2.11987 14.2084 2.38935 13.4733 2.53426C12.9783 2.00798 12.3237 1.65949 11.6108 1.54272C10.8978 1.42595 10.1663 1.54741 9.52931 1.8883C8.89234 2.22919 8.38548 2.77051 8.08716 3.4285C7.78884 4.08648 7.71569 4.82444 7.87904 5.52818C6.57393 5.46272 5.29717 5.12354 4.13164 4.53267C2.9661 3.9418 1.93784 3.11244 1.1136 2.09842C0.693819 2.82109 0.565248 3.67658 0.754066 4.49071C0.942885 5.30484 1.43489 6.01639 2.12992 6.4805C1.60749 6.4652 1.09643 6.32426 0.64 6.06962V6.11122C0.640207 6.86912 0.902567 7.60362 1.38258 8.19014C1.86259 8.77665 2.53071 9.17907 3.2736 9.32914C2.79032 9.46097 2.28325 9.48024 1.79136 9.38546C2.00121 10.0377 2.40962 10.608 2.95949 11.0168C3.50937 11.4255 4.17322 11.6522 4.85824 11.6651C4.17763 12.2001 3.39821 12.5957 2.56458 12.8291C1.73096 13.0626 0.859476 13.1294 0 13.0258C1.50122 13.9891 3.24795 14.5001 5.03168 14.4978"
                            fill="currentColor"
                          />
                        </svg>
                        Tweet
                      </button>
                    </Link>
                    <button type="button" className={styles.socialButton} onClick={handleClick}>
                      <svg
                        width="13"
                        height="14"
                        viewBox="0 0 13 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.56879 2.66888C8.71639 2.51607 8.89294 2.39417 9.08814 2.31032C9.28335 2.22647 9.4933 2.18233 9.70575 2.18048C9.9182 2.17864 10.1289 2.21912 10.3255 2.29957C10.5222 2.38002 10.7008 2.49882 10.851 2.64905C11.0013 2.79928 11.1201 2.97792 11.2005 3.17456C11.281 3.37119 11.3214 3.58188 11.3196 3.79432C11.3177 4.00677 11.2736 4.21672 11.1898 4.41193C11.1059 4.60714 10.984 4.78369 10.8312 4.93128L8.43119 7.33128C8.13115 7.63124 7.72425 7.79974 7.29999 7.79974C6.87573 7.79974 6.46884 7.63124 6.16879 7.33128C6.01791 7.18556 5.81583 7.10492 5.60607 7.10674C5.39631 7.10857 5.19566 7.1927 5.04734 7.34103C4.89901 7.48935 4.81487 7.69 4.81305 7.89976C4.81123 8.10952 4.89186 8.3116 5.03759 8.46248C5.63768 9.06239 6.45147 9.3994 7.29999 9.3994C8.14852 9.3994 8.9623 9.06239 9.56239 8.46248L11.9624 6.06248C12.5453 5.45896 12.8678 4.65063 12.8605 3.8116C12.8533 2.97257 12.5167 2.16997 11.9234 1.57666C11.3301 0.983357 10.5275 0.646816 9.68848 0.639525C8.84945 0.632234 8.04112 0.954776 7.43759 1.53768L6.23759 2.73768C6.16118 2.81148 6.10024 2.89976 6.05831 2.99736C6.01638 3.09496 5.99431 3.19994 5.99339 3.30616C5.99247 3.41238 6.01271 3.51773 6.05293 3.61605C6.09316 3.71436 6.15256 3.80368 6.22768 3.8788C6.30279 3.95391 6.39211 4.01332 6.49043 4.05354C6.58874 4.09376 6.69409 4.11401 6.80031 4.11308C6.90654 4.11216 7.01151 4.09009 7.10911 4.04816C7.20672 4.00624 7.29499 3.94529 7.36879 3.86888L8.56879 2.66888V2.66888ZM4.56879 6.66888C4.86884 6.36893 5.27573 6.20042 5.69999 6.20042C6.12425 6.20042 6.53115 6.36893 6.83119 6.66888C6.90499 6.74529 6.99326 6.80624 7.09087 6.84816C7.18847 6.89009 7.29345 6.91216 7.39967 6.91308C7.50589 6.91401 7.61124 6.89376 7.70955 6.85354C7.80787 6.81332 7.89719 6.75391 7.97231 6.6788C8.04742 6.60368 8.10682 6.51436 8.14705 6.41605C8.18727 6.31773 8.20751 6.21239 8.20659 6.10616C8.20567 5.99994 8.1836 5.89496 8.14167 5.79736C8.09974 5.69976 8.0388 5.61148 7.96239 5.53768C7.3623 4.93778 6.54852 4.60077 5.69999 4.60077C4.85147 4.60077 4.03768 4.93778 3.43759 5.53768L1.03759 7.93768C0.731959 8.23287 0.488176 8.58598 0.320467 8.97639C0.152758 9.3668 0.064482 9.7867 0.0607898 10.2116C0.0570976 10.6365 0.138063 11.0579 0.298962 11.4511C0.459861 11.8444 0.697471 12.2017 0.997927 12.5021C1.29838 12.8026 1.65567 13.0402 2.04894 13.2011C2.44221 13.362 2.86358 13.443 3.28848 13.4393C3.71337 13.4356 4.13327 13.3473 4.52369 13.1796C4.9141 13.0119 5.2672 12.7681 5.56239 12.4625L6.76239 11.2625C6.8388 11.1887 6.89974 11.1004 6.94167 11.0028C6.9836 10.9052 7.00567 10.8002 7.00659 10.694C7.00751 10.5878 6.98727 10.4824 6.94705 10.3841C6.90682 10.2858 6.84742 10.1965 6.77231 10.1214C6.69719 10.0463 6.60787 9.98685 6.50955 9.94662C6.41124 9.9064 6.30589 9.88616 6.19967 9.88708C6.09345 9.88801 5.98847 9.91007 5.89087 9.952C5.79326 9.99393 5.70499 10.0549 5.63119 10.1313L4.43119 11.3313C4.2836 11.4841 4.10704 11.606 3.91184 11.6898C3.71663 11.7737 3.50668 11.8178 3.29423 11.8197C3.08179 11.8215 2.8711 11.781 2.67446 11.7006C2.47783 11.6201 2.29919 11.5013 2.14896 11.3511C1.99873 11.2009 1.87993 11.0222 1.79948 10.8256C1.71903 10.629 1.67854 10.4183 1.68039 10.2058C1.68224 9.99339 1.72637 9.78344 1.81023 9.58824C1.89408 9.39303 2.01597 9.21648 2.16879 9.06888L4.56879 6.66888Z"
                          fill="currentColor"
                        />
                      </svg>
                      {copyButtonText}
                    </button>
                  </div>
                  <BrowserOnly>
                    {() => (
                      <Bookmark className={styles.bookmarkButton} href={url} title={title}>
                        <svg
                          width="16"
                          height="20"
                          viewBox="0 0 16 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V19L8 15.5L15 19V3C15 2.46957 14.7893 1.96086 14.4142 1.58579C14.0391 1.21071 13.5304 1 13 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Bookmark>
                    )}
                  </BrowserOnly>
                </div>
                <DiscourseComment postUrl={url} />
              </div>
              {MDXPageContent.toc && (
                <div className="col col--3" style={{ paddingRight: '30px' }}>
                  <TOC toc={MDXPageContent.toc} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
