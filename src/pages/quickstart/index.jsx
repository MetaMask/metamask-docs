/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
import { MDXProvider } from '@mdx-js/react'
import Layout from '@theme/Layout'
import MDXComponents from '@theme/MDXComponents'
import classNames from 'classnames'
import copyToClipboard from 'copy-to-clipboard'
import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import MoonLoader from 'react-spinners/BeatLoader'
import React from 'react'

import SEO from '../../components/SEO'
import IntegrationBuilderCodeView from '../../theme/IntegrationBuilderCodeView'
import builder from './builder'
import styles from './styles.module.css'
import { getWindowLocation } from '../../theme/URLParams'
import { METAMASK_SDK, EMBEDDED_WALLETS, YES, NO } from './builder/choices'
import NavigationOverlay from './NavigationOverlay'
import MediaStep from './MediaStep'

const hasRelevantURLParams = () => {
  const url = new URL(getWindowLocation())
  const relevantParams = ['product', 'framework', 'walletAggregatorOnly']
  return relevantParams.some(param => url.searchParams.has(param))
}

const validateURLParams = () => {
  const url = new URL(getWindowLocation())
  const product = url.searchParams.get('product')
  const framework = url.searchParams.get('framework')
  const walletAggregatorOnly = url.searchParams.get('walletAggregatorOnly')

  // Must have at least a product parameter to be valid
  if (!product) return false

  // Validate product parameter
  const validProducts = [METAMASK_SDK, EMBEDDED_WALLETS]
  if (!validProducts.includes(product)) return false

  // If we have walletAggregatorOnly, validate its value
  if (walletAggregatorOnly && ![YES, NO].includes(walletAggregatorOnly)) return false

  return true
}

const getDefaultBuilderOptions = () => {
  const defaultOpts = Object.fromEntries(
    Object.entries(builder.options).map(([key, option]) => [key, option.default])
  )
  const url = new URL(getWindowLocation())

  const urlOpts = {}
  url.searchParams.forEach((value, key) => {
    urlOpts[key] = value
  })

  return { ...defaultOpts, ...urlOpts }
}
const getURLFromBuilderOptions = (opts, stepIndex) => {
  const url = new URL(getWindowLocation())
  // Clear all existing parameters
  url.search = ''
  // Add all builder options except stepIndex (if it somehow exists in opts)
  for (const [key, value] of Object.entries(opts)) {
    if (key !== 'stepIndex') {
      url.searchParams.append(key, value)
    }
  }
  // Add stepIndex separately to ensure only one exists
  url.searchParams.append('stepIndex', stepIndex.toString())
  return url.toString()
}

// Add new component for step navigation menu
const StepNavigationMenu = ({ steps, currentStepIndex, onStepChange, scrollToStep }) => {
  return (
    <div className={styles.stepNavigationMenu}>
      <div className={styles.stepMenuList}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={classNames(styles.stepMenuItem, {
              [styles.stepMenuItemActive]: index === currentStepIndex,
              [styles.stepMenuItemCompleted]: index < currentStepIndex,
            })}
            onClick={() => onStepChange(index)}>
            <div className={styles.stepMenuNumber}>
              {index < currentStepIndex ? '✓' : index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Fallback: Import files directly from build output if props don't contain them
async function loadFilesDirectly() {
  try {
    // Use dynamic import to load build-time generated files
    const filesModule = await import(
      '../../../.docusaurus/docusaurus-plugin-virtual-files/default/files.json'
    )
    return filesModule.default || filesModule
  } catch (e) {
    console.error('Could not load files directly:', e)
    return {}
  }
}

export default function IntegrationBuilderPage(props) {
  // Try different ways to access files from component props
  let files = {}

  // Method 1: Direct props.files
  if (props.files) {
    files = props.files
  }
  // Method 2: From route modules (for Docusaurus plugin data)
  else if (props.route?.modules?.files) {
    const filesData = props.route.modules.files
    if (typeof filesData === 'string') {
      try {
        files = JSON.parse(filesData)
      } catch (e) {
        console.error('Failed to parse files JSON:', e)
      }
    } else {
      files = filesData
    }
  }
  // Method 3: Check if files are in route.modules directly
  else if (props.route?.modules && typeof props.route.modules === 'object') {
    // Sometimes Docusaurus puts the data directly in modules
    const moduleKeys = Object.keys(props.route.modules)
    for (const key of moduleKeys) {
      if (key.includes('files') || key.includes('Files')) {
        const moduleData = props.route.modules[key]
        if (typeof moduleData === 'string') {
          try {
            files = JSON.parse(moduleData)
            break
          } catch (e) {
            console.error(`Failed to parse ${key}:`, e)
          }
        } else if (typeof moduleData === 'object') {
          files = moduleData
          break
        }
      }
    }
  }

  // Method 4: If still no files, try to load them directly (fallback)
  const [fallbackFiles, setFallbackFiles] = useState({})
  useEffect(() => {
    if (Object.keys(files).length === 0 && Object.keys(fallbackFiles).length === 0) {
      loadFilesDirectly()
        .then(loadedFiles => {
          setFallbackFiles(loadedFiles)
        })
        .catch(err => {
          console.error('Failed to load fallback files:', err)
        })
    }
  }, [files, fallbackFiles])

  // Use fallback files if main files are empty
  const finalFiles = Object.keys(files).length > 0 ? files : fallbackFiles

  // Always check URL params dynamically instead of caching at init
  const [showNavigationOverlay, setShowNavigationOverlay] = useState(false)
  const [builderOptions, setBuilderOptions] = useState({})
  const [isLinkCopied, setLinkCopied] = useState(false)
  const [IBCountdown, setIBCountdown] = useState(10)
  const [builderView, setBuilderView] = useState(true)
  const [abortCountdown, setAbortCountdown] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const url = new URL(getWindowLocation())
  const [stepIndex, setStepIndex] = useState(
    // Always start at step 0 when showing navigation overlay
    hasRelevantURLParams() ? parseInt(url.searchParams.get('stepIndex') || '0', 10) : 0
  )
  const [loading, setLoading] = useState(false)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [isManualNavigation, setIsManualNavigation] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)

  // Check URL params and set initial state
  useEffect(() => {
    const hasParams = hasRelevantURLParams()
    const isValid = validateURLParams()

    if (!hasParams || !isValid) {
      setShowNavigationOverlay(true)
      // Still set default builder options so builder renders underneath
      setBuilderOptions(getDefaultBuilderOptions())
      setStepIndex(0)

      // Clean URL by removing any invalid params
      if (!isValid && hasParams) {
        const currentUrl = new URL(getWindowLocation())
        currentUrl.search = '' // Clear all parameters if invalid
        // eslint-disable-next-line no-restricted-globals
        history.replaceState({}, '', currentUrl.toString())
      }
    } else {
      setShowNavigationOverlay(false)
      setBuilderOptions(getDefaultBuilderOptions())
      // Preserve stepIndex from URL if provided
      const urlStepIndex = url.searchParams.get('stepIndex')
      if (urlStepIndex) {
        setStepIndex(parseInt(urlStepIndex, 10))
      }
    }

    // Mark initialization complete after a short delay
    setTimeout(() => {
      setIsInitializing(false)
    }, 100)
  }, []) // Run once on mount

  // Monitor URL changes and reset to overlay if params are removed
  useEffect(() => {
    const checkURLAndResetIfNeeded = () => {
      const hasParams = hasRelevantURLParams()
      const isValid = validateURLParams()

      if (!hasParams || !isValid) {
        setShowNavigationOverlay(true)
        setBuilderOptions({})
        setStepIndex(0)
      }
    }

    // Check on popstate (back/forward navigation)
    const handlePopState = () => {
      // Always clear URL params and show overlay on back button
      const currentUrl = new URL(getWindowLocation())
      currentUrl.search = '' // Clear all parameters
      // eslint-disable-next-line no-restricted-globals
      history.replaceState({}, '', currentUrl.toString())

      // Reset to overlay state
      setShowNavigationOverlay(true)
      setBuilderOptions({})
      setStepIndex(0)
    }

    // Check on pushstate/replacestate (programmatic navigation)
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = function (...args) {
      originalPushState.apply(history, args)
      setTimeout(checkURLAndResetIfNeeded, 0)
    }

    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args)
      setTimeout(checkURLAndResetIfNeeded, 0)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [])

  // Simplified URL change detection - only when actually needed
  useEffect(() => {
    // Only check if we're showing builder (not overlay) and detect if params disappear or become invalid
    if (!showNavigationOverlay) {
      const hasParams = hasRelevantURLParams()
      const isValid = validateURLParams()
      if (!hasParams || !isValid) {
        setShowNavigationOverlay(true)
        setBuilderOptions(getDefaultBuilderOptions())
        setStepIndex(0)
      }
    }
  }, [showNavigationOverlay]) // Only when overlay state changes

  // Handle body scroll prevention when overlay is open
  useEffect(() => {
    if (showNavigationOverlay) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showNavigationOverlay])

  // Handle navigation overlay selection
  const handleNavigationSelect = options => {
    const newBuilderOptions = {
      product: options.product,
    }

    // Add walletAggregatorOnly if specified
    if (options.walletAggregatorOnly !== undefined) {
      newBuilderOptions.walletAggregatorOnly = options.walletAggregatorOnly
    }

    setBuilderOptions(newBuilderOptions)
    setShowNavigationOverlay(false)
    setStepIndex(0) // Always start at step 0 when selecting from overlay

    // Update URL with selected options and reset to step 0
    // eslint-disable-next-line no-restricted-globals
    history.pushState({}, '', getURLFromBuilderOptions(newBuilderOptions, 0))
  }

  const handleCloseOverlay = () => {
    // User chose to manually explore - set default options
    const defaultOptions = getDefaultBuilderOptions()
    setBuilderOptions(defaultOptions)
    setShowNavigationOverlay(false)
    setStepIndex(0) // Always start at step 0 when closing overlay

    // Update URL with default options and reset to step 0
    // eslint-disable-next-line no-restricted-globals
    history.pushState({}, '', getURLFromBuilderOptions(defaultOptions, 0))
  }

  const integration = useMemo(() => {
    // Always build integration - even when overlay is showing
    if (Object.keys(builderOptions).length === 0) {
      return {
        filenames: [],
        files: {},
        steps: [],
        stepIndex: 0,
        embedLink: '',
        sourceCodeLink: '',
      }
    }
    const result = builder.build(builderOptions, finalFiles || {}, stepIndex)
    return result
  }, [builderOptions, finalFiles, stepIndex])
  const [selectedFilename, setSelectedFilename] = useState(integration.filenames[0] || '')
  const [activeTab, setActiveTab] = useState('media')

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  const ref = useRef(null)

  const onClickCopyLink = async () => {
    if (isLinkCopied) return

    copyToClipboard(getWindowLocation())
    setLinkCopied(true)
    await delay(500)
    setLinkCopied(false)
  }

  const { steps } = integration

  // Reset to media tab when step changes for hybrid content
  useEffect(() => {
    if (steps[stepIndex]?.contentType === 'hybrid') {
      setActiveTab('media')
    }
  }, [stepIndex, steps])

  // Navigation handlers with smooth scrolling to exact top
  const scrollToStep = useCallback(stepElementId => {
    const stepsContainer = document.getElementById('steps-container')
    const targetStepElement = document.getElementById(stepElementId)

    if (stepsContainer && targetStepElement) {
      const containerRect = stepsContainer.getBoundingClientRect()
      const stepRect = targetStepElement.getBoundingClientRect()
      const scrollOffset = stepRect.top - containerRect.top + stepsContainer.scrollTop

      // Use same custom easing for manual navigation
      const startPosition = stepsContainer.scrollTop
      const distance = scrollOffset - startPosition
      const duration = Math.min(400, Math.abs(distance) * 0.5) // Quick, responsive timing
      const startTime = performance.now()

      const easeOutCubic = t => {
        return 1 - Math.pow(1 - t, 3)
      }

      const animateScroll = currentTime => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutCubic(progress)

        stepsContainer.scrollTop = startPosition + distance * easedProgress

        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        }
      }

      requestAnimationFrame(animateScroll)
    }
  }, [])

  const onChangeStep = useCallback(
    index => {
      if (index >= steps.length) {
        // eslint-disable-next-line no-param-reassign
        index = steps.length - 1
      }
      if (index < 0) {
        // eslint-disable-next-line no-param-reassign
        index = 0
      }
      if (steps[index] && steps[index].pointer && steps[index].pointer.filename) {
        setSelectedFilename(steps[index].pointer.filename)
      }
      setStepIndex(index)
      setIsManualNavigation(true)

      // Update URL with new step index
      const url = new URL(getWindowLocation())
      url.searchParams.set('stepIndex', index.toString())
      // eslint-disable-next-line no-restricted-globals
      history.pushState({}, '', url.toString())

      // Scroll to the step to ensure it's visible
      setTimeout(() => {
        scrollToStep(`step-${index}`)
        // Reset manual navigation flag very quickly to not interfere with user scrolling
        setTimeout(() => {
          setIsManualNavigation(false)
        }, 50) // Very short delay to only block during initial animation
      }, 10) // Minimal delay to ensure state update is complete
    },
    [steps, scrollToStep]
  )

  const handlePreviousStep = useCallback(() => {
    if (stepIndex > 0) {
      scrollToStep(`step-${stepIndex - 1}`)
    }
  }, [stepIndex, scrollToStep])

  const handleNextStep = useCallback(() => {
    if (stepIndex < steps.length - 1) {
      scrollToStep(`step-${stepIndex + 1}`)
    }
  }, [stepIndex, steps.length, scrollToStep])

  // Natural scroll-spy navigation with gentle snapping
  useEffect(() => {
    const stepsContainer = document.getElementById('steps-container')
    if (!stepsContainer || steps.length === 0) return

    const handleScroll = () => {
      if (isManualNavigation) return

      // Check if scrolled to top first
      const isAtTop = stepsContainer.scrollTop <= 10

      if (isAtTop) {
        // Force first step when at top
        if (stepIndex !== 0) {
          setStepIndex(0)
        }
        return
      }

      // Check if scrolled to bottom
      const isAtBottom =
        stepsContainer.scrollTop + stepsContainer.clientHeight >= stepsContainer.scrollHeight - 10

      if (isAtBottom) {
        // Force last step when at bottom
        const lastStepIndex = steps.length - 1
        if (stepIndex !== lastStepIndex) {
          setStepIndex(lastStepIndex)
        }
        return
      }

      // Simple scroll-spy: find which step is most visible
      const containerRect = stepsContainer.getBoundingClientRect()
      const containerTop = containerRect.top
      const containerBottom = containerRect.bottom

      let bestStepIndex = stepIndex
      let maxVisibleArea = 0

      steps.forEach((_, index) => {
        const stepElement = document.getElementById(`step-${index}`)
        if (stepElement) {
          const stepRect = stepElement.getBoundingClientRect()

          // Calculate visible area of this step
          const visibleTop = Math.max(stepRect.top, containerTop)
          const visibleBottom = Math.min(stepRect.bottom, containerBottom)
          const visibleArea = Math.max(0, visibleBottom - visibleTop)

          if (visibleArea > maxVisibleArea) {
            maxVisibleArea = visibleArea
            bestStepIndex = index
          }
        }
      })

      // Update step if it changed
      if (bestStepIndex !== stepIndex) {
        setStepIndex(bestStepIndex)
      }
    }

    const handleKeyDown = event => {
      // Only handle keyboard navigation when not in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          handlePreviousStep()
          break
        case 'ArrowRight':
          event.preventDefault()
          handleNextStep()
          break
        case 'ArrowUp':
          event.preventDefault()
          handlePreviousStep()
          break
        case 'ArrowDown':
          event.preventDefault()
          handleNextStep()
          break
        default:
          break
      }
    }

    stepsContainer.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      stepsContainer.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [stepIndex, steps.length, onChangeStep, handlePreviousStep, handleNextStep])

  const onScrollLeft = e => {
    if (!initialLoadComplete) return

    const el = e.target
    const stepEls = el.getElementsByClassName(styles.stepContainer)
    const containerHeight = el.clientHeight
    const scrollTop = el.scrollTop
    const scrollHeight = el.scrollHeight
    const viewportCenter = scrollTop + containerHeight / 2

    // Check if we're at the bottom of the scroll container
    const isAtBottom = scrollTop + containerHeight >= scrollHeight - 5 // 5px tolerance

    let closestIndex = 0
    let closestDistance = Infinity

    // If we're at the bottom, automatically select the last element
    if (isAtBottom && stepEls.length > 0) {
      closestIndex = stepEls.length - 1
    } else {
      // Otherwise, find the element closest to center
      for (let i = 0; i < stepEls.length; i += 1) {
        const stepEl = stepEls.item(i)
        const elementCenter = stepEl.offsetTop + stepEl.offsetHeight / 2
        const distance = Math.abs(viewportCenter - elementCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = i
        }
      }
    }

    // Only update if the closest step is different from current
    if (closestIndex !== stepIndex) {
      onChangeStep(closestIndex)
    }
  }

  // const onChangeOptionValue = (optionKey, event) => {
  //   const el = event.target;
  //   const finalOptionValue = el.checked ? YES : NO;

  //   setBuilderOptions({
  //     ...builderOptions,
  //     [optionKey]: finalOptionValue,
  //   });
  // };

  const onChangeDropdown = (optionKey, optionValue) => {
    setBuilderOptions({
      ...builderOptions,
      [optionKey]: optionValue,
    })
    setAbortCountdown(true)
  }

  const toggleBuilderView = async () => {
    if (builderView) {
      setBuilderView(false)
      const element = ref.current
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      setBuilderView(true)
    }
  }

  const togglePreviewModal = link => {
    if (showPreviewModal) {
      setShowPreviewModal(false)
    } else {
      setLoading(true)
      setShowPreviewModal(true)
    }
  }

  useEffect(() => {
    // Don't update anything if overlay is showing
    if (showNavigationOverlay) return

    setStepIndex(integration.stepIndex)
    // Update selected file when either integration changed
    if (
      integration.steps &&
      integration.steps[integration.stepIndex] &&
      integration.steps[integration.stepIndex].pointer
    ) {
      setSelectedFilename(integration.steps[integration.stepIndex].pointer.filename)
    } else if (integration.filenames && integration.filenames.length > 0) {
      setSelectedFilename(integration.filenames[0])
    }

    for (const optionKey in builderOptions) {
      if (builder.options[optionKey]) {
        const check = builder.options[optionKey].choices.flatMap(choice => choice.key)
        if (!check.includes(builderOptions[optionKey])) {
          const option = Object.fromEntries(
            Object.entries(builder.options).map(([key, optioning]) => [key, optioning.default])
          )
          onChangeDropdown(optionKey, option[optionKey])
        }
      }
    }
    // Update query params only if we have valid options and we're not initializing
    if (Object.keys(builderOptions).length > 0 && !isInitializing) {
      // eslint-disable-next-line no-restricted-globals
      history.pushState({}, '', getURLFromBuilderOptions(builderOptions, stepIndex))
    }
  }, [builderOptions, integration, stepIndex, isLinkCopied, showNavigationOverlay, isInitializing])

  // Update the useEffect for initial navigation
  useEffect(() => {
    // Initialize to the step index from URL
    if (stepIndex > 0 && steps && steps[stepIndex]) {
      const stepElements = document.getElementsByClassName(styles.stepContainer)
      if (stepElements && stepElements.length > stepIndex) {
        const element = stepElements[stepIndex]
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })

          // Set initialLoadComplete after a delay to allow scrolling to complete
          setTimeout(() => {
            setInitialLoadComplete(true)
          }, 1000)
        }
      }
    } else {
      setInitialLoadComplete(true)
    }
  }, [])

  useEffect(() => {
    if (IBCountdown > 0) {
      setTimeout(() => setIBCountdown(IBCountdown - 1), 1000)
    }
    if (IBCountdown === 0 && builderView && !abortCountdown) {
      toggleBuilderView()
    }
  }, [IBCountdown])

  const optionRender = (key, option) => {
    switch (option.type) {
      case 'dropdown':
        return (
          <div key={key} className={styles.list}>
            <select
              value={builderOptions[key]}
              onChange={event => onChangeDropdown(key, event.target.value)}>
              {option.choices.map(value => (
                <option value={value.key} key={value.key}>
                  {value.displayName}
                </option>
              ))}
            </select>
          </div>
        )

      case 'product_selection':
        return (
          <div key={key} className={styles.list}>
            <div className={styles.cardContainer}>
              {option.choices.map(value => (
                <React.Fragment key={value.key}>
                  {value.key === METAMASK_SDK && (
                    <div
                      className={
                        builderOptions[key] === METAMASK_SDK ? styles.selectedCard : styles.card
                      }
                      onClick={() => onChangeDropdown(key, value.key)}>
                      <h5 className={classNames(styles.cardTitle)}>{value.displayName}</h5>
                    </div>
                  )}
                  {value.key === EMBEDDED_WALLETS && (
                    <div
                      className={
                        builderOptions[key] === EMBEDDED_WALLETS ? styles.selectedCard : styles.card
                      }
                      onClick={() => onChangeDropdown(key, value.key)}>
                      <h5 className={classNames(styles.cardTitle)}>{value.displayName}</h5>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )

      default:
        return <div />
    }
  }

  const handleModalClick = event => {
    event.stopPropagation() // Prevents the click from propagating to the background
  }

  return (
    <Layout
      title="Integration Builder"
      description="Web3Auth is simple, non-custodial auth infrastructure that enables Web3 wallets and applications to provide seamless user logins for both mainstream and native Web3 users.">
      <SEO
        title="Integration Builder"
        description="Web3Auth Integration Builder for easy quick start. Web3Auth is simple, non-custodial auth infrastructure that enables Web3 wallets and applications to provide seamless user logins for both mainstream and native Web3 users."
        image="https://docs.metamask.io/img/quickstartog.jpg"
        url="https://docs.metamask.io/quickstart"
      />
      <div className={styles.container} style={{ position: 'relative' }}>
        {/* Top Control Pane */}
        <div className={styles.topControlPane}>
          <div className={styles.topControlContainer}>
            {/* Product Selection */}
            {Object.entries(builder.options).map(([key, option]) =>
              option.type === 'product_selection' ? optionRender(key, option) : null
            )}

            {/* Dropdown and Actions */}
            <div className={styles.controlActions}>
              {/* Wallet Aggregator Toggle (show first) */}
              {Object.entries(builder.options).map(([key, option]) =>
                key === 'walletAggregatorOnly' && option.type === 'dropdown'
                  ? optionRender(key, option)
                  : null
              )}

              {/* Other dropdowns (platform selection, etc.) */}
              {Object.entries(builder.options).map(([key, option]) =>
                key !== 'walletAggregatorOnly' && option.type === 'dropdown'
                  ? optionRender(key, option)
                  : null
              )}

              <button
                className={styles.copyButton2}
                onClick={() => window.open(integration.sourceCodeLink, '_blank')}
                type="button">
                Source Code
              </button>
              {integration.embedLink && (
                <button
                  className={styles.previewButton2}
                  onClick={() => togglePreviewModal(integration.embedLink)}
                  type="button">
                  Preview
                </button>
              )}
            </div>
          </div>
        </div>

        {showPreviewModal && (
          <div className={styles.previewModalContainer} onClick={() => togglePreviewModal()}>
            <div className={styles.previewModal} onClick={handleModalClick}>
              <div className={styles.optionsHeader}>
                <h2 className={styles.optionsHeaderText}>Preview</h2>
                <button
                  className={styles.closeButton}
                  onClick={() => togglePreviewModal()}
                  type="button">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
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
                    {' '}
                    <MoonLoader
                      loading={loading}
                      size={20}
                      color={getComputedStyle(document.body).getPropertyValue(
                        '--ifm-color-primary'
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

        <div className={styles.cols} ref={ref}>
          <div className={styles.leftCol} id="steps-container">
            <MDXProvider components={MDXComponents}>
              {steps && steps.length > 0 ? (
                <div className={styles.stepsScrollContainer}>
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={classNames(styles.stepSection, {
                        [styles.activeStep]: index === stepIndex,
                        [styles.previousStep]: index < stepIndex,
                        [styles.upcomingStep]: index > stepIndex,
                        [styles.nextStep]: index === stepIndex + 1,
                      })}
                      id={`step-${index}`}
                      data-step-index={index}
                      onClick={() => {
                        if (index !== stepIndex) {
                          onChangeStep(index)
                        }
                      }}
                      style={{
                        cursor: index !== stepIndex ? 'pointer' : 'default',
                      }}>
                      <div className={styles.stepContainer}>
                        <div className={styles.stepProgressIndicator}>
                          Step {index + 1} of {steps.length}
                        </div>
                        <p className={styles.stepHeader}>{step.title}</p>
                        <div className={styles.stepBody}>{step.content}</div>
                      </div>

                      {/* Simple separator between steps */}
                      {index < steps.length - 1 && (
                        <div className={styles.stepSeparator}>
                          <div className={styles.separatorLine}></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.stepContainer}>
                  <p className={styles.stepHeader}>Loading...</p>
                  <div className={styles.stepBody}>
                    Please wait while we load the integration steps.
                  </div>
                </div>
              )}
            </MDXProvider>
          </div>
          <div className={styles.rightCol}>
            {/* Conditionally render media or code based on step content type */}
            {steps[stepIndex]?.contentType === 'media' ? (
              <MediaStep
                step={steps[stepIndex]}
                className={styles.mediaStepContainer}
                isVisible={true} // Always visible when it's the active step
              />
            ) : steps[stepIndex]?.contentType === 'hybrid' ? (
              <div className={styles.hybridTabContainer}>
                {/* Tab Navigation */}
                <div className={styles.tabNavigation}>
                  <button
                    className={classNames(styles.tabButton, {
                      [styles.tabButtonActive]: activeTab === 'media',
                    })}
                    onClick={() => setActiveTab('media')}>
                    Media
                  </button>
                  <button
                    className={classNames(styles.tabButton, {
                      [styles.tabButtonActive]: activeTab === 'code',
                    })}
                    onClick={() => setActiveTab('code')}>
                    Code
                  </button>
                </div>

                {/* Tab Content */}
                <div className={styles.tabContent}>
                  {activeTab === 'media' ? (
                    <MediaStep
                      step={steps[stepIndex]}
                      className={styles.hybridMediaStep}
                      isVisible={true} // Always visible when it's the active step
                    />
                  ) : (
                    <div className={styles.hybridCodeView}>
                      <IntegrationBuilderCodeView
                        filenames={integration.filenames}
                        fileContents={integration.files}
                        highlight={
                          steps[stepIndex]?.pointer?.filename === selectedFilename
                            ? steps[stepIndex]?.pointer?.range
                            : undefined
                        }
                        selectedFilename={selectedFilename}
                        onClickFilename={filename => setSelectedFilename(filename)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Default: show code view for 'text' content type or undefined
              <IntegrationBuilderCodeView
                filenames={integration.filenames}
                fileContents={integration.files}
                highlight={
                  steps[stepIndex]?.pointer?.filename === selectedFilename
                    ? steps[stepIndex]?.pointer?.range
                    : undefined
                }
                selectedFilename={selectedFilename}
                onClickFilename={filename => setSelectedFilename(filename)}
              />
            )}
          </div>

          {/* Step Navigation Menu */}
          {steps && steps.length > 0 && (
            <StepNavigationMenu
              steps={steps}
              currentStepIndex={stepIndex}
              onStepChange={onChangeStep}
              scrollToStep={scrollToStep}
            />
          )}
        </div>

        {showNavigationOverlay && (
          <NavigationOverlay onClose={handleCloseOverlay} onSelect={handleNavigationSelect} />
        )}
      </div>
    </Layout>
  )
}
