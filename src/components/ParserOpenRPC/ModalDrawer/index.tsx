import React, {useState, useEffect, useRef} from "react";
import clsx from "clsx";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

interface ModalDrawerProps {
  title: string | React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isContentFixed?: boolean;
  headerLabel?: string | null;
}

export const ModalDrawer = ({ title, isOpen, onClose, children, isContentFixed = false, headerLabel }: ModalDrawerProps) => {
  const [showModal, setShowModal] = useState(isOpen);
  const contentRef = useRef(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isContentFixed && contentRef?.current) {
      contentRef?.current?.scrollTo(0, 0);
    }
  }, [isContentFixed]);

  return (
    <div className={clsx(styles.modalContainer, showModal && styles.modalContainerOpen)}>
      <div className={clsx(styles.modalHeader, colorMode === "light" && styles.modalHeaderLight)}>
        <div className={styles.modalHeaderLabels}>
          <span className={styles.modalTitle}>{title}</span>
          {headerLabel ? <span className={styles.modalHeaderLabel}>{headerLabel}</span> : null}
        </div>
        <button className={styles.modalCloseBtn} onClick={onClose}>&times;</button>
      </div>
      <div
        className={clsx(styles.modalContent, isContentFixed ? styles.modalContentFixed : styles.modalContentScrolled)}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
};
