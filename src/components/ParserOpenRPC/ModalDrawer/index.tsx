import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

interface ModalDrawerProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalDrawer = ({ title, isOpen, onClose, children }: ModalDrawerProps) => {
  const [showModal, setShowModal] = useState(isOpen);
  const { colorMode } = useColorMode();

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return (
    <div className={clsx(styles.modalContainer, showModal && styles.modalContainerOpen)}>
      <div className={clsx(styles.modalHeader, colorMode === "light" && styles.modalHeaderLight)}>
        <span className={styles.modalTitle}>{title}</span>
        <button className={styles.modalCloseBtn} onClick={onClose}>&times;</button>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};
