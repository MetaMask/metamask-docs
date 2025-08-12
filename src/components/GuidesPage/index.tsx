/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { GuidesInterface, platformMap, productMap } from "../../utils/guides-map";


import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import Hero from "@site/src/components/Hero/Hero";
import Input from "@site/src/components/Input";
import GuideCard from "./GuideCard";
import CustomSelect, { OptionType } from "./CustomSelect";
import styles from "./styles.module.css";

export default function Guides({ content = {} }: GuidesInterface) {
  const safeContent = content || {};

  const completeGuides = Object.entries(safeContent)
    .map(([key, value]) => {
      if (value && value.type === "guide") return { ...value, link: `/guides/${key}` };
      return null;
    })
    .filter(Boolean)
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
  const [selectedProducts, setSelectedProducts] = useState<OptionType[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<OptionType[]>([]);
  const [filteredGuides, setFilteredGuides] = useState(completeGuides);
  const { siteConfig } = useDocusaurusContext();
  const { baseUrl } = siteConfig;

  // Apply tag filters first
  useEffect(() => {
    let filtered = completeGuides;

    if (productFilter.length > 0 || platformFilter.length > 0) {
      filtered = completeGuides.filter((item) => {
        if (!item || !item.tags || !Array.isArray(item.tags)) return false;

        const prodFil =
          productFilter.length === 0 || productFilter.some((tag) => item.tags.includes(tag));
        const platFil =
          platformFilter.length === 0 || platformFilter.some((tag) => item.tags.includes(tag));

        return prodFil && platFil;
      });
    }

    setFilteredGuides(filtered);
  }, [productFilter, platformFilter, completeGuides]);

  const onChangeProduct = (selectedOptions: OptionType[]) => {
    const filterValue = selectedOptions ? selectedOptions.map((item) => item.value) : [];
    setSelectedProducts(selectedOptions);
    setProductFilter(filterValue);
    setTags([...platformFilter, ...filterValue]);
  };

  const onChangePlatform = (selectedOptions: OptionType[]) => {
    const filterValue = selectedOptions ? selectedOptions.map((item) => item.value) : [];
    setSelectedPlatforms(selectedOptions);
    setPlatformFilter(filterValue);
    setTags([...productFilter, ...filterValue]);
  };

  function highlightSearchText(text) {
    if (!searchInput.trim()) {
      return text;
    }

    const searchTerms = searchInput.trim().split(/\s+/);
    const regex = new RegExp(`(${searchTerms.join("|")})`, "gi");

    // Use replace to find matches and build result
    let lastIndex = 0;
    const elements = [];
    let match;

    // Reset regex lastIndex to avoid stateful issues
    regex.lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        elements.push(text.slice(lastIndex, match.index));
      }

      // Add the highlighted match
      elements.push(<mark key={match.index}>{match[0]}</mark>);

      lastIndex = match.index + match[0].length;

      // Prevent infinite loop with zero-length matches
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }
    }

    // Add remaining text after last match
    if (lastIndex < text.length) {
      elements.push(text.slice(lastIndex));
    }

    return <span>{elements}</span>;
  }

  function onChangeSearch(input) {
    setSearchInput(input);
  }

  // Filter the already filtered guides based on search
  const displayedGuides = filteredGuides.filter((item) => {
    if (!item) return false; // Skip null items
    if (!searchInput.trim()) return true;

    const searchTerms = searchInput.toLowerCase().trim().split(/\s+/);
    return searchTerms.every(
      (term) =>
        (item.title && item.title.toLowerCase().includes(term)) ||
        (item.description && item.description.toLowerCase().includes(term)) ||
        (item.tags && Array.isArray(item.tags) && item.tags.some((tag) => tag.toLowerCase().includes(term))),
    );
  });

  // No transformation needed - we'll render GuideCard directly

  return (
    <Layout title="Guides">
      <SEO
        title="Guides"
        description="MetaMask developer guides to integrate, customize, and build with our SDKs and services."
        image={`${baseUrl}images/docs-meta-cards/guides-card.png`}
        slug="/guides"
      />

      <Hero
        title="Guides"
        description="Your hub for integration walkthroughs, SDK usage, customization, troubleshooting, and advanced features."
      />

      <section className="container">
        <div className={styles.headerInteractionArea}>
          <div className={styles.searchArea}>
            <Input
              placeholder="Search guides"
              value={searchInput}
              onChange={onChangeSearch}
              className={styles.searchInput}
            />
            <div className={styles.customSelect}>
              <CustomSelect
                options={productMap}
                value={selectedProducts}
                onChange={onChangeProduct}
                placeholder="Select product"
              />
            </div>
            <div className={styles.customSelect}>
              <CustomSelect
                options={platformMap}
                value={selectedPlatforms}
                onChange={onChangePlatform}
                placeholder="Select platform"
              />
            </div>
          </div>
        </div>

        {displayedGuides.length > 0 ? (
          <div className={styles.cardsGrid}>
            {displayedGuides.map((item: any) => (
              <GuideCard
                key={item.link}
                title={item.title}
                description={item.description || ""}
                link={item.link}
                image={item.image}
                tags={item.tags || []}
                author={item.author}
                date={item.date}
                type={item.type}
                searchInput={searchInput}
                activeTags={tags}
              />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <p>No results found</p>
          </div>
        )}
      </section>
    </Layout>
  );
}


