import React from 'react'
import Layout from '@theme/Layout'
import ParserOpenRPC from '@site/src/components/ParserOpenRPC'
import DocSidebar from '@theme/DocSidebar'
import { useLocation } from '@docusaurus/router'
import { prepareLinkItems, MM_REF_PATH } from '@site/src/plugins/plugin-json-rpc'
import styles from './styles.module.css'
const sidebar = require('../../../sdk-sidebar.js')

function transformItems(items, dynamicItems) {
  return items.map(item => {
    let newItem = { ...item }
    if (newItem.type === 'doc') {
      newItem.type = 'link'
      newItem.href = newItem.id
      delete newItem.id
    }
    if (newItem.type === 'category') {
      if (newItem.label === 'JSON-RPC API') {
        newItem.items = dynamicItems
        newItem.collapsed = false
      }
      if (newItem.link) {
        newItem.href = newItem.link.id || newItem.link.slug
        delete newItem.link
      }
      if (newItem.items && Array.isArray(newItem.items)) {
        newItem.items = transformItems(newItem.items, dynamicItems)
      }
    }
    if (newItem.href) {
      if (!newItem.href.startsWith('/')) {
        newItem.href = `/${newItem.href}`
      }
      if (newItem.href.endsWith('/index')) {
        newItem.href = newItem.href.slice(0, -5)
      }
      if (!newItem.href.startsWith('/sdk')) {
        if (newItem.href === '/') {
          newItem.href = '/sdk/'
        } else {
          newItem.href = `/sdk${newItem.href}`
        }
      }
    }
    return newItem
  })
}

const CustomReferencePage = props => {
  const customData = props.route.customData
  const { pathname } = useLocation()
  const refItems = prepareLinkItems(props.methodsData, MM_REF_PATH).map(item => ({
    ...item,
    href: item.href.replace('/sdk', ''),
  }))
  const updatedSidebar = transformItems(sidebar.sdkSidebar, refItems)
  return (
    <Layout>
      <div className={styles.pageWrapper}>
        <aside>
          <div className={styles.sidebarViewport}>
            <div className={styles.sidebar}>
              <DocSidebar
                sidebar={updatedSidebar}
                path={pathname}
                onCollapse={() => {}}
                isHidden={false}
              />
            </div>
          </div>
        </aside>
        <div className={styles.mainContainer}>
          <div className={styles.contentWrapper}>
            <ParserOpenRPC network={customData.networkName} method={customData.name} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CustomReferencePage
