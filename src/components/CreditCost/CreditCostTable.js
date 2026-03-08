import React from 'react'
import { API_COSTS } from '@site/src/lib/data'

// Function to render the tables
const renderTable = (methods, categoryName, header) => {
  if (!methods || Object.keys(methods).length === 0) return null

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>{header}</th> {/* Use dynamic header */}
            <th>Credit cost</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(methods).map(method => (
            <tr key={method}>
              <td>
                <code>{method}</code>
              </td>
              <td>{methods[method]} credits</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const CreditCostTable = ({ methods }) => {
  // Map methods prop to the corresponding category in API_COSTS
  const methodCategory = API_COSTS[methods]

  if (!methodCategory) {
    return <p>No data available for the specified method category.</p>
  }

  // Set header dynamically based on the category
  let header = 'RPC method'
  if (methods === 'gasApi') {
    header = 'API endpoint' // Change header for 'gasApi'
  } else if (methods === 'evm_subscription') {
    header = 'Subscription events' // Change header for 'evm_subscription'
  }

  return renderTable(methodCategory, methods, header)
}

export default CreditCostTable
