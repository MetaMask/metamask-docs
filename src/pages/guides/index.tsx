/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { GuidesInterface, platformMap, productMap } from "../../utils/guides-map";

import Select, { StylesConfig } from "react-select";
import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import styles from "./styles.module.css";

export default function Guides({ content }: GuidesInterface) {
  const completeGuides = Object.entries(content)
    .map(([key, value]) => {
      if (value.type === "guide") return { ...value, link: `/guides/${key}` };
      return {};
    })
    .sort((a: any, b: any) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return +bDate - +aDate;
    });

  const [searchInput, setSearchInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [productFilter, setProductFilter] = useState<string[]>([]);
  const [platformFilter, setPlatformFilter] = useState<string[]>([]);
  const [filteredGuides, setFilteredGuides] = useState(completeGuides);
  const { siteConfig } = useDocusaurusContext();
  const { baseUrl } = siteConfig;

  // Apply tag filters first
  useEffect(() => {
    let filtered = completeGuides;

    if (productFilter.length > 0 || platformFilter.length > 0) {
      filtered = completeGuides.filter((item) => {
        const prodFil =
          productFilter.length === 0 || productFilter.some((tag) => item.tags.includes(tag));
        const platFil =
          platformFilter.length === 0 || platformFilter.some((tag) => item.tags.includes(tag));

        return prodFil && platFil;
      });
    }

    // Reset search when filters change
    setSearchInput("");
    setFilteredGuides(filtered);
  }, [productFilter, platformFilter]);

  const onChangeProduct = (e) => {
    const filterValue = e.map((item) => item.value);
    setProductFilter(filterValue);
    setTags([...platformFilter, ...filterValue]);
  };

  const onChangePlatform = (e) => {
    const filterValue = e.map((item) => item.value);
    setPlatformFilter(filterValue);
    setTags([...productFilter, ...filterValue]);
  };

  function highlightSearchText(text) {
    if (!searchInput.trim()) {
      return text;
    }
    const searchTerms = searchInput.trim().split(/\s+/);
    const regex = new RegExp(`(${searchTerms.join("|")})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, i) => {
          return regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>;
        })}
      </span>
    );
  }

  function onChangeSearch(input) {
    setSearchInput(input);
  }

  // Filter the already filtered guides based on search
  const displayedGuides = filteredGuides.filter((item) => {
    if (!searchInput.trim()) return true;

    const searchTerms = searchInput.toLowerCase().trim().split(/\s+/);
    return searchTerms.every(
      (term) =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.tags.some((tag) => tag.toLowerCase().includes(term)),
    );
  });

  function renderArticle(article) {
    return (
      <div key={article.link} className={styles.article}>
        <Link to={article.link} className={styles.articleContent}>
          <img src={baseUrl + article.image} alt="Banner" />
          <div className={styles.contentContainer}>
            <div className={styles.pillContainer}>
              <div className={styles.pill}>{article.type}</div>
            </div>
            <h3>{highlightSearchText(article.title)}</h3>
            <p>{highlightSearchText(article.description)}</p>
          </div>
        </Link>
        <div className={styles.tagContainer}>
          {article.tags &&
            article.tags.map((tag) => {
              if (tags.includes(tag) || searchInput.split(" ").includes(tag)) {
                return (
                  <div key={tag} className={styles.tagActive}>
                    {tag}
                  </div>
                );
              }
              return null;
            })}
          {article.tags &&
            article.tags.map((tag) => {
              if (!(tags.includes(tag) || searchInput.split(" ").includes(tag))) {
                return (
                  <div key={tag} className={styles.tag}>
                    {tag}
                  </div>
                );
              }
              return null;
            })}
        </div>
        <span className={styles.date}>
          {article.author} | {article.date}
        </span>
      </div>
    );
  }

  return (
    <Layout title="Guides">
      <SEO
        title="Guides"
        description="Guides | Web3Auth is simple, non-custodial auth infrastructure that enables Web3 wallets and applications to provide seamless user logins for both mainstream and native Web3 users."
        image={`${baseUrl}images/docs-meta-cards/guides-card.png`}
        slug="/guides"
      />

      <header className={styles.header}>
        <h1>Guides</h1>
        <p>
          Your centralized hub for comprehensive articles covering integration, SDK usage,
          customization, troubleshooting, and advanced features.
        </p>
        <div className={styles.headerInteractionArea}>
          <div className={styles.searchArea}>
            <div className={styles.searchBox}>
              <div className={styles.searchIcon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.8534 20.8006L16.8119 15.7689C16.7338 15.6909 16.6165 15.6519 16.4993 15.6519H16.0694C17.4372 14.1697 18.2579 12.2584 18.2579 10.1131C18.2579 5.6665 14.5843 2 10.129 2C5.63459 2 2 5.6665 2 10.1131C2 14.5987 5.63459 18.2262 10.129 18.2262C12.2394 18.2262 14.1935 17.4071 15.6395 16.0809V16.471C15.6395 16.627 15.6786 16.744 15.7567 16.822L20.7982 21.8537C20.9936 22.0488 21.2672 22.0488 21.4626 21.8537L21.8534 21.4637C22.0489 21.2686 22.0489 20.9956 21.8534 20.8006ZM10.129 16.9781C6.29897 16.9781 3.25061 13.9356 3.25061 10.1131C3.25061 6.3296 6.29897 3.24817 10.129 3.24817C13.9199 3.24817 17.0073 6.3296 17.0073 10.1131C17.0073 13.9356 13.9199 16.9781 10.129 16.9781Z"
                    fill="currentColor"
                    fillOpacity="1"
                  />
                </svg>
              </div>
              <input
                placeholder="Quick search for anything"
                value={searchInput}
                onChange={(event) => onChangeSearch(event.target.value)}
                type="text"
                className={styles.searchTerm}
              />
              {(searchInput && (
                <button
                  onClick={() => onChangeSearch("")}
                  className={styles.searchClearButton}
                  type="button"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.8702 6.54951L13.3932 11.9734L19.9528 18.5331C20.0032 18.5835 20.032 18.7 19.9398 18.832L18.8318 19.94C18.6997 20.0323 18.5832 20.0035 18.5328 19.9531L17.4502 18.8705L12.0263 13.3934L5.46663 19.9531C5.41628 20.0035 5.29978 20.0323 5.16769 19.94L4.05969 18.832C3.96743 18.7 3.99626 18.5835 4.04662 18.5331L10.6062 11.9736L4.04637 5.46666C3.99617 5.41617 3.96758 5.29984 4.05969 5.16797L5.16769 4.05997C5.29978 3.9677 5.41628 3.99654 5.46663 4.04689L12.0262 10.6064L18.5331 4.04666C18.5836 3.99645 18.6999 3.96785 18.8318 4.05997L19.9398 5.16797C20.032 5.30006 20.0032 5.41655 19.9528 5.46691L18.8702 6.54951Z"
                      fill="var(--ifm-color-primary)"
                      fillOpacity="1"
                    />
                  </svg>
                </button>
              )) || <div className={styles.searchClearButton} />}
            </div>
            <Select
              options={productMap}
              isMulti
              styles={customSelectButtonStyles}
              onChange={onChangeProduct}
              placeholder="Select Product"
            />
            <Select
              options={platformMap}
              isMulti
              styles={customSelectButtonStyles}
              onChange={onChangePlatform}
              placeholder="Select Platform"
            />
          </div>
        </div>
      </header>

      <div className={styles.container}>
        {displayedGuides.map((item) => renderArticle(item))}
        {displayedGuides.length === 0 && (
          <div className={styles.noResults}>
            <p>No result</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

const customSelectButtonStyles: StylesConfig<true> = {
  container: (provided) => ({
    ...provided,
    width: "max-content",
    minHeight: "42px",
    maxWidth: "275px",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "125%",
  }),
  control: (provided) => ({
    ...provided,
    background: "var(--ifm-background-surface-color);",
    color: "var(--w3a-color-icon-gray)",
    border: "1px solid var(--ifm-color-emphasis-300)",
    borderRadius: "8px",
    minHeight: "42px",
  }),
  menu: (provided) => ({
    ...provided,
    background: "var(--ifm-background-surface-color);",
    border: "1px solid var(--ifm-color-emphasis-300)",
    borderRadius: "8px",
  }),
  option: (provided, { isDisabled, isFocused, isSelected }) => ({
    ...provided,
    backgroundColor: isDisabled
      ? undefined
      : isSelected
        ? "var(--ifm-color-emphasis-300)"
        : isFocused
          ? "var(--ifm-color-primary-lightest)"
          : undefined,
    cursor: isDisabled ? "not-allowed" : "default",
  }),
  multiValue: (styles, { data }) => ({
    ...styles,
    color: "var(--ifm-color-primary)",
    backgroundColor: "var(--ifm-color-primary-lightest)",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "125%",
    borderWidth: "0",
    borderRadius: "8px",
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "var(--ifm-color-primary)",
    backgroundColor: "var(--ifm-color-primary-lightest)",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "125%",
    borderWidth: "0",
    borderRadius: "8px",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "var(--ifm-color-primary)",
    backgroundColor: "var(--ifm-color-primary-lightest)",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "125%",
    borderWidth: "0",
    borderRadius: "8px",
  }),
};
