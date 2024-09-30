import Layout from "@theme/Layout";
import ParserOpenRPC from "@site/src/components/ParserOpenRPC";
import React, { useEffect, useState } from "react";
import DocSidebar from '@theme/DocSidebar';
import styles from "@site/src/theme/Layout/styles.module.css"
import customStyles from "./styles.module.css"
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import upperFirst  from "lodash.upperfirst"
import { JSON_RPC_METHODS_LABEL, lineaSidebarNames, NETWORK_NAMES } from "@site/src/lib/constants";
import { useLocation } from "@docusaurus/router";

const formatMenuLabel = (label) => {
  const menuItem = lineaSidebarNames.find(name => name.old === label);
  if (menuItem) {
    return menuItem.new;
  }
  return label;
}

function generateSidebarItems(docs) {
  const categories = {};

  docs.forEach((doc) => {
    if (doc.id === 'index') {
      categories['Introduction'] = {
        type: 'link',
        href: '/services',
        label: upperFirst(doc.frontMatter?.sidebar_label || doc.title),
      };
      return;
    }

    const pathParts = doc.sourceDirName.split('/');
    let currentCategory = categories;
    let isIndexPage = doc.id.endsWith('/index');
    pathParts.map(pathPart => formatMenuLabel(pathPart)).forEach((part, index) => {
      if (!currentCategory[part]) {
        if (isIndexPage && index === pathParts.length - 2) {
          currentCategory[part] = {
            type: 'category',
            label: upperFirst(doc.frontMatter?.sidebar_label || doc.frontMatter?.title || part),
            collapsed: false,
            collapsible: true,
            href: `/services/reference`,
            items: []
          };
        } else {
          currentCategory[part] = {
            type: 'category',
            label: upperFirst(part),
            href: `/services/${doc.sourceDirName}`,
            collapsed: part !== "Get started",
            collapsible: true,
            items: []
          };
        }
      }

      if (index === pathParts.length - 1 && !isIndexPage) {
        currentCategory[part].items.push({
          type: 'link',
          label: doc.frontMatter?.title || doc.title,
          href: `/services/${doc.id.replace(/\/index$/, '')}`,
          sidebar_position: doc.frontMatter?.sidebar_position || Number.MAX_SAFE_INTEGER
        });
      }
      currentCategory = currentCategory[part].items;
    });
  });

  const convertToArray = (categoryObj) => {
    return Object.values(categoryObj).map((category) => {
      if (category.items && typeof category.items === 'object') {
        category.items = convertToArray(category.items);
        if (category.items.every(item => item.sidebar_position !== undefined)) {
          category.items.sort((a, b) => (a.sidebar_position || Number.MAX_SAFE_INTEGER) - (b.sidebar_position || Number.MAX_SAFE_INTEGER));
        }
      }
      return category;
    });
  };
  return convertToArray(categories);
}

const sidebar_wrapper_classes = "theme-doc-sidebar-container docSidebarContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocRoot-Layout-Sidebar-styles-module"

const CustomReferencePage = (props) => {
  const customData = props.route.customData;
  const { siteConfig } = useDocusaurusContext();
  const [formattedData, setFormattedData] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    setFormattedData(generateSidebarItems(siteConfig.customFields.sidebarData.docs).map(item => {
      if (item?.label === "Reference" && item?.items) {
        return {
          ...item,
          items: item.items.map(referenceItem => {
            if (referenceItem?.label === upperFirst(NETWORK_NAMES.linea) && referenceItem?.items) {
              return { 
                ...referenceItem,
                items: [
                  ...referenceItem.items.filter(({ label }) => label !== JSON_RPC_METHODS_LABEL),
                  ...siteConfig.customFields.dynamicData.map(dynamicItem => {
                    const jsonRpcCategory = referenceItem.items.find(({ label }) => label === JSON_RPC_METHODS_LABEL);
                    if (jsonRpcCategory) {
                      return {
                        ...dynamicItem,
                        ...{ href: "/services/reference/linea/json-rpc-methods/" },
                        ...{ items: [...dynamicItem.items, ...jsonRpcCategory.items.filter(refItem => refItem.type === "category")] }
                      };
                    }
                    return dynamicItem;
                  })
                ] 
              };
            }
            return referenceItem;
          })
        }
      }
      return item;
    }));
  }, []);

  return formattedData ? (
    <Layout>
      <div className={styles.pageWrapper}>
        <aside className={sidebar_wrapper_classes}>
          <div className={customStyles.sidebarViewport}>
            <div className={ customStyles.sidebar}>
              <DocSidebar sidebar={formattedData} path={pathname} onCollapse={() => {}} isHidden={false} />
            </div>
          </div>
        </aside>
        <div className={styles.mainContainer}>
          <div className={styles.contentWrapper}>
            <ParserOpenRPC
              network={NETWORK_NAMES.linea}
              method={customData.name}
            />
          </div>
        </div>
      </div>
    </Layout>
  ) : null;
};

export default CustomReferencePage;
