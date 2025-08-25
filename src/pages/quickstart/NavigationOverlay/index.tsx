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
        <NavigationFlow onSelect={onSelect} />
      </div>
    </div>
  );
};

export default NavigationOverlay; 