import clsx from 'clsx'
import { useMemo, useState, useEffect } from 'react'
import Select from 'react-dropdown-select'
import Icon from '@site/src/components/Icon/Icon'
import { NETWORKS_NAMES, NETWORKS_METHODS, NETWORKS } from '@site/src/lib/constants'

import styles from './ControlPanel.module.scss'

const ControlPanel = ({ keysOptions = [], initValues, onChange }) => {
  const selectChangeHandler = (value, param) => {
    onChange(value, param)
  }

  const typesOptions = useMemo(() => {
    const initMethods = [...NETWORKS_METHODS.L1.methods]
    const initL2Methods = [...NETWORKS_METHODS.L2.methods]
    let updatedOptions = {
      types: [],
      methods: initMethods,
    }
    if (initValues?.netName?.networksTypes) {
      updatedOptions.types = initValues.netName.networksTypes
    }
    if (initValues?.netName?.value === NETWORKS.PALM) {
      const noEthMethods = initMethods.filter(method => method.value !== 'eth_maxPriorityFeePerGas')
      updatedOptions.methods = [...noEthMethods]
    }
    if (initValues?.netName?.value === NETWORKS.GAS_API) {
      updatedOptions.methods = [...initL2Methods]
    }
    return updatedOptions
  }, [initValues.netName])

  const [methodValue, setMethodValue] = useState([typesOptions.methods[0]])
  useEffect(() => {
    const upMethod = methodValue.length > 0 ? methodValue[0] : typesOptions.methods[0]
    selectChangeHandler(upMethod, 'netMethod')
  }, [methodValue, typesOptions])

  return (
    <ul className={styles['holder']}>
      <li className={styles['item']}>
        <Icon name="key" />
        <Select
          className={styles['custom-select']}
          placeholder="Key name"
          values={[initValues.apiKey]}
          searchable={false}
          options={keysOptions}
          onChange={values => selectChangeHandler(values[0], 'apiKey')}
        />
      </li>
      <li className={styles['item']}>
        <Icon name="network" />
        <Select
          className={styles['custom-select']}
          placeholder="Select network"
          values={[initValues.netName]}
          searchable={false}
          options={NETWORKS_NAMES}
          onChange={values => {
            const netName = values[0]
            selectChangeHandler(netName, 'netName')
            selectChangeHandler(netName.networksTypes[0], 'netType')
            if (netName.value === NETWORKS.GAS_API) {
              setMethodValue([NETWORKS_METHODS.L2.methods[0]])
            } else {
              setMethodValue([NETWORKS_METHODS.L1.methods[0]])
            }
          }}
        />
      </li>
      <li className={styles['item']}>
        <Icon name="type" />
        <Select
          className={styles['custom-select']}
          placeholder="Select type"
          values={[initValues.netType]}
          searchable={false}
          options={typesOptions.types}
          onChange={values => selectChangeHandler(values[0], 'netType')}
        />
      </li>
      <li className={styles['item']}>
        <Icon name="method" />
        <Select
          className={styles['custom-select']}
          placeholder="Select method"
          values={methodValue}
          options={typesOptions.methods}
          onChange={values => {
            setMethodValue(values)
          }}
          onDropdownClose={() => {
            if (methodValue.length === 0) {
              setMethodValue([typesOptions.methods[0]])
            }
          }}
        />
      </li>
    </ul>
  )
}

export default ControlPanel
