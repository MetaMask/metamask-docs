// src/components/CreditCost.js

import React from 'react'
import { API_COSTS } from '@site/src/lib/data'
import Link from '@docusaurus/Link'

const CreditCost = ({ network, method }) => {
  // Get the credit cost for the given network and method, defaulting to 80 if not found
  const cost =
    API_COSTS[network] && API_COSTS[network][method] !== undefined ? API_COSTS[network][method] : 80 // Default to 80 if no cost is found

  return (
    <span>
      This method uses <Link to="/services/get-started/pricing/">{cost} credits</Link> from your
      daily balance.
    </span>
  )
}

export default CreditCost
