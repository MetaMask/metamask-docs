/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
import { MDXProvider } from "@mdx-js/react";
import Layout from "@theme/Layout";
import MDXComponents from "@theme/MDXComponents";
import classNames from "classnames";
import copyToClipboard from "copy-to-clipboard";
import { UIEvent, useEffect, useMemo, useState, useRef } from "react";
import MoonLoader from "react-spinners/BeatLoader";
import React from "react";

import SEO from "../../components/SEO";
import IntegrationBuilderCodeView from "../../theme/IntegrationBuilderCodeView";
import builder from "./builder";
import styles from "./styles.module.css";
import { getWindowLocation } from "../../theme/URLParams";
import { METAMASK_SDK, EMBEDDED_WALLETS, DELEGATION_TOOLKIT } from "./builder/choices";

const getDefaultBuilderOptions = () => {
  const defaultOpts = Object.fromEntries(
    Object.entries(builder.options).map(([key, option]) => [key, option.default]),
  );
  const url = new URL(getWindowLocation());

  const urlOpts = {};
  url.searchParams.forEach((value, key) => {
    urlOpts[key] = value;
  });

  return { ...defaultOpts, ...urlOpts };
};
const getURLFromBuilderOptions = (opts: Record<string, string>, stepIndex): string => {
  const url = new URL(getWindowLocation());
  // Clear all existing parameters
  url.search = "";
  // Add all builder options except stepIndex (if it somehow exists in opts)
  for (const [key, value] of Object.entries(opts)) {
    if (key !== "stepIndex") {
      url.searchParams.append(key, value);
    }
  }
  // Add stepIndex separately to ensure only one exists
  url.searchParams.append("stepIndex", stepIndex.toString());
  return url.toString();
};

export default function IntegrationBuilderPage(props: any) {
  // Try different ways to access files
  const files = props.files || (props.route?.modules?.files ? JSON.parse(props.route.modules.files) : {});

  const [builderOptions, setBuilderOptions] = useState<Record<string, string>>(
    getDefaultBuilderOptions(),
  );
  const [isLinkCopied, setLinkCopied] = useState<boolean>(false);
  const [IBCountdown, setIBCountdown] = useState<number>(10);
  const [builderView, setBuilderView] = useState<boolean>(true);
  const [abortCountdown, setAbortCountdown] = useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const url = new URL(getWindowLocation());
  const [stepIndex, setStepIndex] = useState(
    parseInt(url.searchParams.get("stepIndex") || "0", 10),
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);
  const integration = useMemo(() => {
    const result = builder.build(builderOptions, files || {}, stepIndex);
    return result;
  }, [builderOptions, files, stepIndex]);
  const [selectedFilename, setSelectedFilename] = useState(integration.filenames[0] || "");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const ref = useRef(null);

  const onClickCopyLink = async () => {
    if (isLinkCopied) return;

    copyToClipboard(getWindowLocation());
    setLinkCopied(true);
    await delay(500);
    setLinkCopied(false);
  };

  const { steps } = integration;

  const onChangeStep = (index: number) => {
    if (index >= steps.length) {
      // eslint-disable-next-line no-param-reassign
      index = steps.length - 1;
    }
    if (steps[index] && steps[index].pointer && steps[index].pointer.filename) {
      setSelectedFilename(steps[index].pointer.filename);
    }
    setStepIndex(index);
  };

  const onScrollLeft = (e: UIEvent<HTMLDivElement>) => {
    if (!initialLoadComplete) return;

    const el = e.target as HTMLDivElement;
    const stepEls = el.getElementsByClassName(styles.stepContainer);
    const containerHeight = el.clientHeight;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight;
    const viewportCenter = scrollTop + containerHeight / 2;

    // Check if we're at the bottom of the scroll container
    const isAtBottom = scrollTop + containerHeight >= scrollHeight - 5; // 5px tolerance

    let closestIndex = 0;
    let closestDistance = Infinity;

    // If we're at the bottom, automatically select the last element
    if (isAtBottom && stepEls.length > 0) {
      closestIndex = stepEls.length - 1;
    } else {
      // Otherwise, find the element closest to center
      for (let i = 0; i < stepEls.length; i += 1) {
        const stepEl = stepEls.item(i) as HTMLDivElement;
        const elementCenter = stepEl.offsetTop + stepEl.offsetHeight / 2;
        const distance = Math.abs(viewportCenter - elementCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }
    }

    // Only update if the closest step is different from current
    if (closestIndex !== stepIndex) {
      onChangeStep(closestIndex);
    }
  };

  // const onChangeOptionValue = (optionKey: string, event: ChangeEvent<HTMLInputElement>) => {
  //   const el = event.target as HTMLInputElement;
  //   const finalOptionValue = el.checked ? YES : NO;

  //   setBuilderOptions({
  //     ...builderOptions,
  //     [optionKey]: finalOptionValue,
  //   });
  // };

  const onChangeDropdown = (optionKey: string, optionValue: string) => {
    setBuilderOptions({
      ...builderOptions,
      [optionKey]: optionValue,
    });
    setAbortCountdown(true);
  };

  const toggleBuilderView = async () => {
    if (builderView) {
      setBuilderView(false);
      const element = ref.current as HTMLElement | null;
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setBuilderView(true);
    }
  };

  const togglePreviewModal = (link?: string) => {
    if (showPreviewModal) {
      setShowPreviewModal(false);
    } else {
      setLoading(true);
      setShowPreviewModal(true);
    }
  };

  useEffect(() => {
    setStepIndex(integration.stepIndex);
    // Update selected file when either integration changed
    if (integration.steps && integration.steps[integration.stepIndex] && integration.steps[integration.stepIndex].pointer) {
      setSelectedFilename(integration.steps[integration.stepIndex].pointer.filename);
    } else if (integration.filenames && integration.filenames.length > 0) {
      setSelectedFilename(integration.filenames[0]);
    }

    for (const optionKey in builderOptions) {
      if (builder.options[optionKey]) {
        const check = builder.options[optionKey].choices.flatMap((choice) => choice.key);
        if (!check.includes(builderOptions[optionKey])) {
          const option = Object.fromEntries(
            Object.entries(builder.options).map(([key, optioning]) => [key, optioning.default]),
          );
          onChangeDropdown(optionKey, option[optionKey]);
        }
      }
    }
    // Update query params
    // eslint-disable-next-line no-restricted-globals
    history.pushState({}, "", getURLFromBuilderOptions(builderOptions, stepIndex));
  }, [builderOptions, integration, stepIndex, isLinkCopied]);

  // Update the useEffect for initial navigation
  useEffect(() => {
    // Initialize to the step index from URL
    if (stepIndex > 0 && steps && steps[stepIndex]) {
      const stepElements = document.getElementsByClassName(styles.stepContainer);
      if (stepElements && stepElements.length > stepIndex) {
        const element = stepElements[stepIndex] as HTMLElement;
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });

          // Set initialLoadComplete after a delay to allow scrolling to complete
          setTimeout(() => {
            setInitialLoadComplete(true);
          }, 1000);
        }
      }
    } else {
      setInitialLoadComplete(true);
    }
  }, []);

  useEffect(() => {
    if (IBCountdown > 0) {
      setTimeout(() => setIBCountdown(IBCountdown - 1), 1000);
    }
    if (IBCountdown === 0 && builderView && !abortCountdown) {
      toggleBuilderView();
    }
  }, [IBCountdown]);

  const optionRender = (key, option) => {
    switch (option.type) {
      case "dropdown":
        return (
          <div key={key} className={styles.list}>
            <select
              value={builderOptions[key]}
              onChange={(event) => onChangeDropdown(key, event.target.value)}
            >
              {option.choices.map((value) => (
                <option value={value.key} key={value.key}>
                  {value.displayName}
                </option>
              ))}
            </select>
          </div>
        );

      case "product_selection":
        return (
          <div key={key} className={styles.list}>
            <h3>{option.displayName}</h3>
            <div className={styles.cardContainer}>
              {option.choices.map((value) => (
                <>
                  {value.key === METAMASK_SDK && (
                    <div
                      className={builderOptions[key] === METAMASK_SDK ? styles.selectedCard : styles.card}
                      onClick={() => onChangeDropdown(key, value.key)}
                    >
                      <h5 className={classNames(styles.cardTitle)}>
                        {value.displayName}
                      </h5>
                    </div>
                  )}
                  {value.key === EMBEDDED_WALLETS && (
                    <div
                      className={builderOptions[key] === EMBEDDED_WALLETS ? styles.selectedCard : styles.card}
                      onClick={() => onChangeDropdown(key, value.key)}
                    >
                      <h5 className={classNames(styles.cardTitle)}>
                        {value.displayName}
                      </h5>
                    </div>
                  )}
                  {value.key === DELEGATION_TOOLKIT && (
                    <div
                      className={
                        builderOptions[key] === DELEGATION_TOOLKIT ? styles.selectedCard : styles.card
                      }
                      onClick={() => onChangeDropdown(key, value.key)}
                    >
                      <h5 className={classNames(styles.cardTitle)}>
                        {value.displayName}
                      </h5>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        );

      default:
        return <div />;
    }
  };

  const handleModalClick = (event) => {
    event.stopPropagation(); // Prevents the click from propagating to the background
  };

  return (
    <Layout
      title="Integration Builder"
      description="Web3Auth is simple, non-custodial auth infrastructure that enables Web3 wallets and applications to provide seamless user logins for both mainstream and native Web3 users."
    >
      <SEO
        title="Integration Builder"
        description="Web3Auth Integration Builder for easy quick start. Web3Auth is simple, non-custodial auth infrastructure that enables Web3 wallets and applications to provide seamless user logins for both mainstream and native Web3 users."
        image="https://web3auth.io/docs/images/docs-meta-cards/integration-builder-card.png"
        url="https://web3auth.io/docs/quick-start"
      />
      <div className={styles.container}>
        {showPreviewModal && (
          <div className={styles.previewModalContainer} onClick={() => togglePreviewModal()}>
            <div className={styles.previewModal} onClick={handleModalClick}>
              <div className={styles.optionsHeader}>
                <h2 className={styles.optionsHeaderText}>Preview</h2>
                <button
                  className={styles.closeButton}
                  onClick={() => togglePreviewModal()}
                  type="button"
                >
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.29303 4.79296C4.48056 4.60549 4.73487 4.50017 5.00003 4.50017C5.26519 4.50017 5.5195 4.60549 5.70703 4.79296L10 9.08596L14.293 4.79296C14.3853 4.69745 14.4956 4.62127 14.6176 4.56886C14.7396 4.51645 14.8709 4.48886 15.0036 4.48771C15.1364 4.48655 15.2681 4.51186 15.391 4.56214C15.5139 4.61242 15.6255 4.68667 15.7194 4.78056C15.8133 4.87446 15.8876 4.98611 15.9379 5.10901C15.9881 5.2319 16.0134 5.36358 16.0123 5.49636C16.0111 5.62914 15.9835 5.76036 15.9311 5.88236C15.8787 6.00437 15.8025 6.11471 15.707 6.20696L11.414 10.5L15.707 14.793C15.8892 14.9816 15.99 15.2342 15.9877 15.4964C15.9854 15.7586 15.8803 16.0094 15.6948 16.1948C15.5094 16.3802 15.2586 16.4854 14.9964 16.4876C14.7342 16.4899 14.4816 16.3891 14.293 16.207L10 11.914L5.70703 16.207C5.51843 16.3891 5.26583 16.4899 5.00363 16.4876C4.74143 16.4854 4.49062 16.3802 4.30521 16.1948C4.1198 16.0094 4.01463 15.7586 4.01236 15.4964C4.01008 15.2342 4.11087 14.9816 4.29303 14.793L8.58603 10.5L4.29303 6.20696C4.10556 6.01943 4.00024 5.76512 4.00024 5.49996C4.00024 5.23479 4.10556 4.98049 4.29303 4.79296Z"
                      fill="#374151"
                    />
                  </svg>
                </button>
              </div>
              <div className={styles.iframeContainer}>
                {loading && (
                  <div className={styles.loadingContainer}>
                    {" "}
                    <MoonLoader
                      loading={loading}
                      size={20}
                      color={getComputedStyle(document.body).getPropertyValue(
                        "--ifm-color-primary",
                      )}
                      aria-label="Loading"
                      speedMultiplier={0.85}
                    />
                  </div>
                )}
                <iframe
                  src={integration.embedLink}
                  height="100%"
                  width="100%"
                  title="Quick Start Preview"
                  loading="eager"
                  seamless={true}
                  onLoad={() => setLoading(false)}
                />
              </div>
            </div>
          </div>
        )}
        <div className={styles.optionsPane}>
          <div className={styles.optionsContainer}>
            <div className={styles.utilityButtonsContainer}>
              {Object.entries(builder.options).map(([key, option]) => optionRender(key, option))}

              <button
                className={styles.copyButton2}
                onClick={() => window.open(integration.sourceCodeLink, "_blank")}
                type="button"
              >
                Source Code
              </button>
              {integration.embedLink && (
                <button
                  className={styles.previewButton2}
                  onClick={() => togglePreviewModal(integration.embedLink)}
                  type="button"
                >
                  Preview
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.cols} ref={ref}>
          <div className={styles.leftCol} onScroll={onScrollLeft}>
            <MDXProvider components={MDXComponents}>
              {steps && steps.length > 0 ? steps.map((step, index) => (
                <div
                  key={step.title}
                  className={classNames(styles.stepContainer, {
                    [styles.stepSelected]: index === stepIndex,
                  })}
                  onClick={onChangeStep.bind(this, index)}
                  onKeyDown={onChangeStep.bind(this, index)}
                  role="tab"
                  tabIndex={index}
                  id={`step-${index}`}
                >
                  <p className={styles.stepHeader}>{step.title}</p>
                  <div className={styles.stepBody}>{step.content}</div>
                </div>
              )) : (
                <div className={styles.stepContainer}>
                  <p className={styles.stepHeader}>Loading...</p>
                  <div className={styles.stepBody}>Please wait while we load the integration steps.</div>
                </div>
              )}
            </MDXProvider>
          </div>
          <div className={styles.rightCol}>
            <IntegrationBuilderCodeView
              filenames={integration.filenames}
              fileContents={integration.files}
              highlight={
                steps[stepIndex]?.pointer?.filename === selectedFilename
                  ? steps[stepIndex]?.pointer?.range
                  : undefined
              }
              selectedFilename={selectedFilename}
              onClickFilename={(filename: string) => setSelectedFilename(filename)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
