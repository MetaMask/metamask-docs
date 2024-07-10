import React from "react"
import clsx from "clsx"
import { ThemeClassNames } from "@docusaurus/theme-common"
import { useDoc } from "@docusaurus/theme-common/internal"
import LastUpdated from "@theme/LastUpdated"
import EditThisPage from "@theme/EditThisPage"
import styles from "./styles.module.css"

function EditMetaRow({
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
  formattedLastUpdatedAt,
}) {
  return (
    <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow, "row")}>
      <div className="col">{editUrl && <EditThisPage editUrl={editUrl} />}</div>

      <div className={clsx("col", styles.lastUpdated)}>
        {(lastUpdatedAt || lastUpdatedBy) && (
          <LastUpdated
            lastUpdatedAt={lastUpdatedAt}
            formattedLastUpdatedAt={formattedLastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </div>
    </div>
  )
}
export default function DocItemFooter() {
  const { metadata } = useDoc()
  const { editUrl, lastUpdatedAt, formattedLastUpdatedAt, lastUpdatedBy } =
    metadata
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy)
  if (!canDisplayEditMetaRow) {
    return null
  }
  return (
    <footer
      className={clsx(ThemeClassNames.docs.docFooter, "docusaurus-mt-lg")}
    >
      {canDisplayEditMetaRow && (
        <EditMetaRow
          editUrl={editUrl}
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
          formattedLastUpdatedAt={formattedLastUpdatedAt}
        />
      )}
    </footer>
  )
}
