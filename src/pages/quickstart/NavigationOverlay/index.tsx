import React, { useState } from 'react'
import styles from './NavigationOverlay.module.css'
import NavigationFlow from './NavigationFlow'
import { getWindowLocation } from '../../../theme/URLParams'
import { METAMASK_SDK, EMBEDDED_WALLETS, YES, NO } from '../builder/choices'

interface NavigationOverlayProps {
  onClose: () => void
  onSelect: (options: { product: string; walletAggregatorOnly?: string }) => void
}

// Check if there are relevant URL params (for close button visibility)
const hasRelevantURLParams = () => {
  const url = new URL(getWindowLocation())
  const relevantParams = ['product', 'framework', 'walletAggregatorOnly']
  return relevantParams.some(param => url.searchParams.has(param))
}

const validateURLParams = () => {
  const url = new URL(getWindowLocation())
  const product = url.searchParams.get('product')
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

const NavigationOverlay: React.FC<NavigationOverlayProps> = ({ onClose, onSelect }) => {
  const canClose = hasRelevantURLParams() && validateURLParams()

  return (
    <div className={styles.overlayContainer}>
      <div className={styles.overlayContent}>
        {canClose && (
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        )}
        <NavigationFlow onSelect={onSelect} />
      </div>
    </div>
  )
}

export default NavigationOverlay
