import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import Link from '@docusaurus/Link';
import GithubSlugger from 'github-slugger';
import glossaryData from '@site/src/lib/glossary.json';
import styles from './styles.module.css';

export default function GlossaryTerm({
  term,
  definition,
  routePath = '/smart-accounts-kit/development/reference/glossary',
  children,
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState(null);
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);

  const updatePosition = useCallback(() => {
    if (!wrapperRef.current || !tooltipRef.current) return;
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const preferredGap = 8; // px

    // Decide top vs bottom based on available space
    const hasSpaceAbove = wrapperRect.top >= tooltipRect.height + preferredGap;
    const hasSpaceBelow = viewportHeight - wrapperRect.bottom >= tooltipRect.height + preferredGap;
    const placeAbove = hasSpaceAbove || !hasSpaceBelow;

    let top;
    if (placeAbove) {
      top = wrapperRect.top - tooltipRect.height - preferredGap;
    } else {
      top = wrapperRect.bottom + preferredGap;
    }

    // Center horizontally on the wrapper, then clamp within viewport with margin
    const horizontalMargin = 8;
    let left = wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2;
    left = Math.max(
      horizontalMargin,
      Math.min(left, viewportWidth - tooltipRect.width - horizontalMargin)
    );

    setTooltipStyle({ top: Math.max(4, top), left });
  }, []);

  useEffect(() => {
    if (!showTooltip) return;

    // Use double requestAnimationFrame to ensure DOM is fully rendered and layout is complete
    // This ensures tooltipRef.current is available and has proper dimensions
    let rafId2;
    const rafId1 = requestAnimationFrame(() => {
      rafId2 = requestAnimationFrame(() => {
        updatePosition();
      });
    });

    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(rafId1);
      if (rafId2) cancelAnimationFrame(rafId2);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
    };
  }, [showTooltip, updatePosition]);

  // Pull definition from local glossary data if not provided
  const effectiveDefinition = useMemo(() => {
    if (definition && typeof definition === 'string' && definition.length > 0) {
      return definition;
    }
    const terms = (glossaryData && glossaryData.terms) || [];
    const found = terms.find(
      t => typeof t.term === 'string' && t.term.toLowerCase() === String(term).toLowerCase()
    );
    return found && found.definition ? found.definition : undefined;
  }, [definition, term]);

  const effectiveRoutePath = useMemo(() => {
    if (routePath && typeof routePath === 'string' && routePath.length > 0) return routePath;
    return '/smart-accounts-kit/development/reference/glossary';
  }, [routePath]);

  const displayText = children || term;
  const termId = useMemo(() => {
    const slugger = new GithubSlugger();
    return slugger.slug(String(term || ''));
  }, [term]);

  return (
    <span ref={wrapperRef} className={styles.glossaryTermWrapper}>
      <a
        href={`${effectiveRoutePath}#${termId}`}
        className={styles.glossaryTerm}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-describedby={`tooltip-${termId}`}
      >
        {displayText}
      </a>
      {effectiveDefinition && (
        <span
          ref={tooltipRef}
          id={`tooltip-${termId}`}
          className={`${styles.tooltip} ${showTooltip ? styles.tooltipVisible : ''} ${styles.tooltipFloating}`}
          role="tooltip"
          style={
            showTooltip && tooltipStyle
              ? { top: `${tooltipStyle.top}px`, left: `${tooltipStyle.left}px` }
              : undefined
          }
        >
          <strong>{term}</strong> {effectiveDefinition}
        </span>
      )}
    </span>
  );
}
