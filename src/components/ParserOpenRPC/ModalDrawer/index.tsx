import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import * as debounce from "lodash.debounce";

interface ModalDrawerProps {
  title: string | React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isContentFixed?: boolean;
  headerLabel?: string | null;
}

export const ModalDrawer = ({
  title,
  isOpen,
  onClose,
  children,
  isContentFixed = false,
  headerLabel,
}: ModalDrawerProps) => {
  const [showModal, setShowModal] = useState(isOpen);
  const [leftOffset, setLeftOffset] = useState(360);
  const [width, setWidth] = useState(972);
  const contentRef = useRef(null);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isContentFixed && contentRef?.current) {
      contentRef?.current?.scrollTo(0, 0);
    }
  }, [isContentFixed]);

  useEffect(() => {
    const setDrawerSizeAndPosition = () => {
      const pageContent = document.getElementById("centerContent");
      if (pageContent) {
        const contentLeftOffset = pageContent.getBoundingClientRect().x;
        const contentComputedStyles = window.getComputedStyle(pageContent);
        const contentLeftPadding = parseInt(contentComputedStyles.paddingLeft);
        const contentRightPadding = parseInt(contentComputedStyles.paddingRight);
        const contentWidth = parseInt(contentComputedStyles.width);
        setLeftOffset((contentLeftOffset + Number(contentLeftPadding)));
        setWidth(contentWidth - contentLeftPadding - contentRightPadding);
      }
    }
    if (window) {
      setDrawerSizeAndPosition();
      const handleResize = debounce(setDrawerSizeAndPosition, 10);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }
  }, [])

  return (
    <div
      className={clsx(
        styles.modalContainer,
        showModal && styles.modalContainerOpen
      )}
      style={{ left: leftOffset, width }}
    >
      <div className={styles.modalHeader}>
        <div className={styles.modalHeaderLabels}>
          <span className={styles.modalTitle}>{title}</span>
          {headerLabel ? (
            <span className={styles.modalHeaderLabel}>{headerLabel}</span>
          ) : null}
        </div>
        <button className={styles.modalCloseBtn} onClick={onClose}>
          &times;
        </button>
      </div>
      <div
        className={clsx(
          styles.modalContent,
          isContentFixed
            ? styles.modalContentFixed
            : styles.modalContentScrolled
        )}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
};
