import React, { useState } from 'react';
import styles from './NavigationOverlay.module.css';
import NavigationFlow from './NavigationFlow';

interface NavigationOverlayProps {
  onClose: () => void;
  onSelect: (product: string, platform: string) => void;
}

const NavigationOverlay: React.FC<NavigationOverlayProps> = ({ onClose, onSelect }) => {
  return (
    <div className={styles.overlayContainer}>
      <div className={styles.overlayContent}>
        <div className={styles.header}>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            Close
          </button>
        </div>

        <NavigationFlow onSelect={onSelect} />
      </div>
    </div>
  );
};

export default NavigationOverlay; 